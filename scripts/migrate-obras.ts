/**
 * Migração única: leva PORTFOLIO_OBRAS (src/lib/constants.ts) e as fotos de
 * public/images para o Sanity.
 *
 * Uso:
 *   npm run migrate:obras          # simulação, não escreve nada
 *   npm run migrate:obras -- --go  # executa de verdade
 *
 * Idempotente: usa _id derivado do slug e `createOrReplace`, então pode rodar
 * de novo sem duplicar se algo falhar no meio. O Sanity também deduplica
 * assets idênticos pelo hash do arquivo.
 */
import { createReadStream, existsSync } from "node:fs";
import { basename } from "node:path";

import { createClient } from "@sanity/client";

import { OBRA_TYPES, PORTFOLIO_OBRAS, type Obra } from "./legacy-obras.ts";

const DRY_RUN = !process.argv.includes("--go");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Faltam variáveis. Rode com: node --env-file=.env.local (o npm script já faz isso).\n" +
      "SANITY_API_WRITE_TOKEN precisa de um token com permissão de Editor."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-02-19",
  useCdn: false,
});

/** "Galpão Metálico" -> "galpao-metalico" */
function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const typeDocId = (title: string) => `obraType-${slugify(title)}`;
const obraDocId = (slug: string) => `obra-${slug}`;

/** Cache path -> assetId, para não subir a mesma foto duas vezes. */
const assetCache = new Map<string, string>();

async function uploadImage(publicPath: string) {
  const cached = assetCache.get(publicPath);
  if (cached) return cached;

  const filePath = `public${publicPath}`;
  if (!existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado: ${filePath}`);
  }

  if (DRY_RUN) {
    assetCache.set(publicPath, "dry-run");
    return "dry-run";
  }

  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: basename(filePath),
  });
  assetCache.set(publicPath, asset._id);
  return asset._id;
}

function imageField(assetId: string, alt: string) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
}

async function migrateTypes() {
  // "Todos" é opção de interface, não um tipo de obra — fica de fora.
  const titles = OBRA_TYPES.filter((t) => t !== "Todos");

  for (const [index, title] of titles.entries()) {
    const doc = {
      _id: typeDocId(title),
      _type: "obraType",
      title,
      slug: { _type: "slug", current: slugify(title) },
      order: (index + 1) * 10,
    };
    if (!DRY_RUN) await client.createOrReplace(doc);
    console.log(`  tipo: ${title}`);
  }
  return titles.length;
}

async function migrateObra(obra: Obra, index: number) {
  // Preserva a ordem atual do array: a primeira obra fica com a data mais
  // recente, já que a listagem ordena por publishedAt decrescente.
  const publishedAt = new Date(
    Date.UTC(2026, 6, 1) - index * 24 * 60 * 60 * 1000
  ).toISOString();

  const coverAsset = await uploadImage(obra.coverImage);
  const galleryAssets = await Promise.all(
    obra.images.map(async (path) => ({
      path,
      assetId: await uploadImage(path),
    }))
  );

  const doc = {
    _id: obraDocId(obra.slug),
    _type: "obra",
    title: obra.title,
    slug: { _type: "slug", current: obra.slug },
    location: obra.location,
    ...(obra.client ? { client: obra.client } : {}),
    type: { _type: "reference", _ref: typeDocId(obra.type) },
    description: obra.description,
    ...(obra.highlights ? { highlights: obra.highlights } : {}),
    coverImage: imageField(coverAsset, obra.title),
    images: galleryAssets.map(({ assetId }, i) => ({
      ...imageField(assetId, `${obra.title} — foto ${i + 1}`),
      _key: `img-${i}`,
    })),
    status: "publicado",
    publishedAt,
    featured: false,
  };

  if (!DRY_RUN) await client.createOrReplace(doc);
  console.log(
    `  obra: ${obra.title} (${obra.images.length} fotos${
      obra.client ? `, cliente ${obra.client}` : ""
    })`
  );
}

async function main() {
  console.log(
    DRY_RUN
      ? "\n=== SIMULAÇÃO — nada será gravado. Use -- --go para executar ===\n"
      : `\n=== MIGRANDO para ${projectId}/${dataset} ===\n`
  );

  console.log("Tipos de obra:");
  const typeCount = await migrateTypes();

  console.log("\nObras:");
  for (const [index, obra] of PORTFOLIO_OBRAS.entries()) {
    await migrateObra(obra, index);
  }

  console.log(
    `\nResumo: ${typeCount} tipos, ${PORTFOLIO_OBRAS.length} obras, ` +
      `${assetCache.size} fotos únicas.`
  );
  if (DRY_RUN) console.log("Nada foi gravado (simulação).");
}

main().catch((error) => {
  console.error("\nFalhou:", error.message);
  process.exit(1);
});
