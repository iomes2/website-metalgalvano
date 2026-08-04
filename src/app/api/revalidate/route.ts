import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { OBRAS_TAG } from "@/sanity/env";

/**
 * Recebe o aviso do Sanity quando o cliente publica, edita ou apaga uma obra,
 * e manda o Next refazer as páginas com o conteúdo novo. Sem isto, o site só
 * se atualizaria quando o cache expirasse (1 hora — ver src/sanity/fetch.ts).
 *
 * O Sanity assina cada chamada com SANITY_REVALIDATE_SECRET; `parseBody`
 * confere essa assinatura. Sem ela, qualquer um poderia derrubar nosso cache.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET não configurado.");
    return Response.json(
      { error: "Revalidação não configurada." },
      { status: 500 }
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<{
      _type?: string;
      slug?: { current?: string };
    }>(request, secret);

    if (!isValidSignature) {
      console.warn("[revalidate] Assinatura inválida — chamada recusada.");
      return Response.json({ error: "Assinatura inválida." }, { status: 401 });
    }

    if (!body?._type) {
      console.warn("[revalidate] Corpo sem _type:", body);
      return Response.json({ error: "Corpo inesperado." }, { status: 400 });
    }

    // As DUAS camadas de cache. Uma sem a outra não resolve:
    //
    // 1. Dados: descarta a resposta guardada do Sanity.
    revalidateTag(OBRAS_TAG, "max");

    // 2. Páginas prontas: sem isto, o visitante continua recebendo o HTML
    //    antigo. Home e listagem sempre, porque publicar uma obra muda os
    //    destaques, a ordem e a contagem.
    revalidatePath("/");
    revalidatePath("/obras");

    // A página da obra vai pelo endereço literal, montado com o slug que veio
    // no aviso. O padrão `revalidatePath("/obras/[slug]", "page")` foi testado
    // e NÃO funciona aqui — as páginas ficam com o conteúdo antigo, ao que tudo
    // indica por causa do route group `(site)` na estrutura de pastas.
    const slug = body.slug?.current;
    if (slug) {
      revalidatePath(`/obras/${slug}`);
    } else {
      console.warn("[revalidate] aviso sem slug — página da obra não refeita.");
    }

    console.log(
      `[revalidate] ok — ${body._type} ${body.slug?.current ?? ""}`.trim()
    );

    return Response.json({
      revalidated: true,
      paths: ["/", "/obras", body.slug?.current && `/obras/${body.slug.current}`]
        .filter(Boolean),
      type: body._type,
    });
  } catch (error) {
    // Webhook quebrado em silêncio é o pior cenário: sempre logar.
    console.error("[revalidate] falhou:", error);
    return Response.json({ error: "Falha ao revalidar." }, { status: 500 });
  }
}
