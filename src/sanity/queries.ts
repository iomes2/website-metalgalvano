import { defineQuery } from "next-sanity";

/**
 * Consultas GROQ centralizadas. Nenhuma query solta em componente — quando o
 * schema mudar, muda aqui e só aqui.
 *
 * Regra que vale para todas: `status == "publicado"`. Rascunho nunca sai no site.
 */

/** Campos comuns aos cards (listagem e home). Sem a galeria, que é pesada. */
const CARD_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  location,
  client,
  "type": type->title,
  "highlight": highlights[0],
  coverImage
`;

/** Listagem completa em /obras. */
export const obrasListQuery = defineQuery(`
  *[_type == "obra" && status == "publicado"]
    | order(publishedAt desc) {
      ${CARD_FIELDS}
    }
`);

/**
 * Bloco "Obras realizadas" da página inicial.
 *
 * Sempre 6 itens: as marcadas como destaque vêm primeiro (mais recentes antes),
 * e o restante do espaço é completado pelas obras mais recentes. Marcar mais de
 * 6 não aumenta a seção — é o que o texto de ajuda do campo promete ao cliente.
 */
export const featuredObrasQuery = defineQuery(`
  *[_type == "obra" && status == "publicado"]
    | order(featured desc, publishedAt desc)[0...6] {
      ${CARD_FIELDS}
    }
`);

/** Página de uma obra. */
export const obraBySlugQuery = defineQuery(`
  *[_type == "obra" && status == "publicado" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    location,
    client,
    "type": type->title,
    description,
    highlights,
    coverImage,
    images[] {
      ...,
      "alt": coalesce(alt, "")
    },
    seoTitle,
    seoDescription
  }
`);

/** Só os endereços, para o Next saber quais páginas gerar. */
export const obrasSlugsQuery = defineQuery(`
  *[_type == "obra" && status == "publicado" && defined(slug.current)].slug.current
`);

/** Quantidade de obras publicadas — usada no subtítulo da página /obras. */
export const obrasCountQuery = defineQuery(`
  count(*[_type == "obra" && status == "publicado"])
`);
