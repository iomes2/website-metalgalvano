import { apiVersion, dataset, projectId } from "./env";

/**
 * Busca conteúdo no Sanity com cache do Next.
 *
 * Usa o `fetch` global em vez do cliente oficial (@sanity/client) porque só
 * assim o Next enxerga a requisição e consegue cachear a página.
 *
 * `revalidate: 3600` define a validade do cache e é a rede de segurança: se o
 * webhook falhar, o conteúdo se atualiza sozinho em até 1 hora em vez de
 * congelar. A atualização imediata ao publicar vem de `revalidatePath`, em
 * /api/revalidate.
 *
 * ⚠️ Este cache sobrevive entre builds (fica em .next/cache). Um build feito
 * logo após uma edição pode sair com conteúdo de até 1 hora atrás; o webhook
 * corrige na sequência. Para forçar conteúdo novo num build, apague .next.
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

  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(
      `Sanity respondeu ${response.status}: ${await response.text()}`
    );
  }

  const { result } = (await response.json()) as { result: T };
  return result;
}
