/** Usado pelo CLI do Sanity (deploy de schema, export/backup do dataset). */
import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
});
