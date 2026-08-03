import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Metalgalvano | Estruturas Metálicas e Pré-Moldados em SC",
    template: "%s | Metalgalvano",
  },
  description:
    "Projetos, fabricação e montagem de estruturas metálicas e pré-moldados. Mais de 5.000m² de fábrica em Araquari/SC. Atendemos Joinville, Curitiba, Florianópolis e todo o Brasil.",
  keywords: [
    "estrutura metálica",
    "galpão metálico",
    "cobertura metálica",
    "pré-moldado",
    "estrutura metálica SC",
    "Metalgalvano",
    "brise metálico",
    "fachada ACM",
    "estrutura mista",
  ],
  authors: [{ name: "Metalgalvano Soluções Metálicas" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.metalgalvano.com.br",
    siteName: "Metalgalvano",
    title: "Metalgalvano | Estruturas Metálicas e Pré-Moldados",
    description:
      "Projetos, fabricação e montagem de estruturas metálicas e pré-moldados. Fábrica própria com mais de 5.000m² em Araquari/SC.",
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${lexend.variable} ${sourceSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
