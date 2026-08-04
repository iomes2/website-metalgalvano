import { OBRAS_TAG, apiVersion, dataset, projectId } from "./env";

/**
 * Busca conteúdo no Sanity.
 *
 * ⚠️ Usa `api.sanity.io`, NÃO `apicdn.sanity.io`. Isto é essencial e custou
 * caro para descobrir: o CDN do Sanity guarda cada consulta por cerca de 30
 * segundos e não é purgado no instante da publicação. Como o webhook chega em
 * ~1 segundo, a página era regerada lendo ainda o conteúdo antigo — e então
 * ficava congelada com ele até o cache expirar. Foi por isso que as tentativas
 * anteriores de invalidação pareciam "não funcionar": o problema não estava no
 * Next, estava na origem dos dados.
 *
 * Ler sem CDN é barato aqui porque a página só é montada quando o conteúdo
 * muda (algumas vezes por mês), não a cada visita.
 *
 * São duas camadas de cache, e o webhook limpa as duas (ver /api/revalidate):
 *   1. os dados — marcados com `OBRAS_TAG`;
 *   2. a página pronta — regerada por `revalidatePath`.
 *
 * `revalidate: 3600` é a rede de segurança: se o webhook falhar, o conteúdo se
 * atualiza sozinho em até 1 hora em vez de congelar.
 *
 * Regressão a testar em qualquer mudança aqui: alternar o mesmo campo duas
 * vezes seguidas e conferir o site nas duas. Uma alternância só passa por sorte.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  const search = new URLSearchParams({ query });

  // Parâmetros GROQ vão codificados em JSON: $slug precisa chegar como "valor".
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`;

  const response = await fetch(url, {
    next: { revalidate: 3600, tags: [OBRAS_TAG] },
  });

  if (!response.ok) {
    throw new Error(
      `Sanity respondeu ${response.status}: ${await response.text()}`
    );
  }

  const { result } = (await response.json()) as { result: T };
  return result;
}
