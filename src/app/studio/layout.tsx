/**
 * Layout do Studio. Existe para carregar `metadata` e `viewport` no servidor —
 * o `page.tsx` precisa ser Client Component (ver comentário lá) e componentes
 * de cliente não podem exportar metadata.
 */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
