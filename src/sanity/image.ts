import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** URL de imagem do Sanity com transformação sob demanda (crop/hotspot respeitados). */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}

/**
 * Gera a URL final para `next/image`. Como o Sanity já entrega a imagem no
 * tamanho pedido, passamos largura e qualidade direto para a CDN dele.
 */
export function imageUrl(source: SanityImageSource, width: number, quality = 80) {
  return urlFor(source).width(width).quality(quality).url();
}
