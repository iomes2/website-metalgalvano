/**
 * Configuração do Sanity Studio embutido em /studio.
 * Precisa ficar na raiz para o CLI do Sanity também enxergar.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "metalgalvano",
  title: "Metalgalvano — Conteúdo",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // Console de GROQ — útil para nós, invisível no dia a dia do cliente.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
