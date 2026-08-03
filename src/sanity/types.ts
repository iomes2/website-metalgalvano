/** Formatos devolvidos pelas queries de `queries.ts`. */

export type SanityImage = {
  _type: "image";
  _key?: string;
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

/** Obra como aparece nos cards (listagem /obras e bloco da home). */
export type ObraCard = {
  slug: string;
  title: string;
  location: string;
  client?: string;
  type: string;
  /** Primeiro destaque — o único exibido no card. */
  highlight?: string;
  coverImage: SanityImage;
};

/** Obra completa, para a página /obras/[slug]. */
export type ObraDetail = {
  slug: string;
  title: string;
  location: string;
  client?: string;
  type: string;
  description: string;
  highlights?: string[];
  coverImage: SanityImage;
  images?: SanityImage[];
  seoTitle?: string;
  seoDescription?: string;
};
