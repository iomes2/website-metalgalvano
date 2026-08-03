/**
 * Lê e valida a configuração do Sanity. Falha cedo e com mensagem clara —
 * variável faltando aqui vira erro de build, não página quebrada em produção.
 */

function required(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(
      `Variável de ambiente ausente: ${name}. Veja .env.example e docs/obras-cms.md.`
    );
  }
  return value;
}

export const projectId = required(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
);

export const dataset = required(
  "NEXT_PUBLIC_SANITY_DATASET",
  process.env.NEXT_PUBLIC_SANITY_DATASET
);

/** Data fixa: congela o comportamento da API mesmo quando o Sanity evolui. */
export const apiVersion = "2025-02-19";
