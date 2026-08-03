import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/**
 * Layout das páginas públicas. O Studio (/studio) fica fora deste grupo,
 * para não herdar cabeçalho, rodapé e botão de WhatsApp.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
