/**
 * Sanity Studio embutido — o painel que o cliente usa para gerenciar as obras.
 * Acessível em /studio, com robots: noindex definido no layout.
 *
 * Por que "use client": a documentação do next-sanity monta esta página como
 * Server Component, mas aí o `sanity.config` entra no grafo do servidor e o
 * Turbopack (Next 16) resolve o `swr` pela condição `react-server`, cujo build
 * não tem export default — o build quebra. Marcando a página como cliente, o
 * config é avaliado só no navegador, que é onde o Studio roda de qualquer forma.
 */
"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
