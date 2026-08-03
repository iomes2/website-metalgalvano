import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";


/**
 * Recebe o aviso do Sanity quando o cliente publica, edita ou apaga uma obra,
 * e manda o Next buscar o conteúdo novo. Sem isso, o site só se atualizaria
 * quando o cache expirasse (1 hora — ver src/sanity/fetch.ts).
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

    // Invalida por caminho, não por tag. `revalidateTag` não regenera páginas
    // já pré-geradas nesta versão do Next — testado: publicar não refletia no
    // site. `revalidatePath` marca a rota para ser refeita na próxima visita.
    //
    // As três são invalidadas juntas de propósito: publicar uma obra pode mudar
    // a home (destaques), a listagem (ordem e contagem) e a página da obra.
    revalidatePath("/");
    revalidatePath("/obras");
    revalidatePath("/obras/[slug]", "page");

    console.log(
      `[revalidate] ok — ${body._type} ${body.slug?.current ?? ""}`.trim()
    );

    return Response.json({
      revalidated: true,
      paths: ["/", "/obras", "/obras/[slug]"],
      type: body._type,
    });
  } catch (error) {
    // Webhook quebrado em silêncio é o pior cenário: sempre logar.
    console.error("[revalidate] falhou:", error);
    return Response.json({ error: "Falha ao revalidar." }, { status: 500 });
  }
}
