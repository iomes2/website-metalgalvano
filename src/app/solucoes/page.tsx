import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Warehouse,
  Layers,
  Blinds,
  PanelsTopLeft,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Soluções construtivas da Metalgalvano: estruturas metálicas, pré-moldados, estrutura mista, brise e ACM para galpões, coberturas e fachadas.",
};

const SOLUCOES = [
  {
    icon: Building2,
    title: "Estruturas Metálicas",
    description:
      "Projetos, fabricação e montagem de estruturas em aço para galpões, coberturas, mezaninos, escadas e edificações de todos os portes.",
    href: "/solucoes/estruturas-metalicas",
    image: "/images/obra-galpao-3700m2.jpg",
    imageAlt:
      "Galpão de 3.700m² em estrutura metálica durante a montagem, vista aérea",
  },
  {
    icon: Warehouse,
    title: "Pré-Moldados",
    description:
      "Elementos pré-fabricados em concreto para construção rápida, com menor geração de resíduos e acabamento padronizado.",
    href: "/solucoes/pre-moldados",
    image: "/images/obra-crematorio-angelus.jpg",
    imageAlt: "Edificação concluída executada pela Metalgalvano, vista aérea",
  },
  {
    icon: Layers,
    title: "Estrutura Mista",
    description:
      "Combinação de estruturas metálicas com concreto, proporcionando versatilidade construtiva e economia de materiais.",
    href: "/solucoes/estrutura-mista",
    image: "/images/obra-hacasa.jpg",
    imageAlt:
      "Obra combinando estrutura metálica e elementos de concreto, vista aérea",
  },
  {
    icon: Blinds,
    title: "Brise",
    description:
      "Brises metálicos fixos ou móveis para controle solar, conforto térmico e definição da identidade visual da fachada.",
    href: "/solucoes/brise",
    image: "/images/obra17-agora-tech-park/agora-tech-park-1.jpg",
    imageAlt:
      "Fachada do Ágora Tech Park revestida com brises verticais, vista aérea",
  },
  {
    icon: PanelsTopLeft,
    title: "ACM",
    description:
      "Revestimento de fachadas em alumínio composto, com estrutura metálica de suporte projetada e montada em conjunto.",
    href: "/solucoes/acm",
    image: "/images/obra15-acats/acats-4.jpg",
    imageAlt:
      "Prédio da ACATS em Florianópolis com fachada envelopada em ACM",
  },
];

export default function SolucoesPage() {
  return (
    <>
      <PageHero
        badge="Nossas soluções"
        title="Soluções construtivas"
        subtitle="Cinco linhas de atuação para atender projetos de diferentes portes e necessidades."
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="max-w-2xl mb-14">
            <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
              Linhas de atuação
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance">
              Escolha o sistema construtivo do seu projeto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {/* Células vazias para fechar a última linha da grade */}
            {SOLUCOES.map((sol, i) => (
              <Link
                key={sol.title}
                href={sol.href}
                className="group relative flex flex-col bg-white hover:bg-surface transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-primary-dark">
                  <Image
                    src={sol.image}
                    alt={sol.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] motion-reduce:transform-none transition-all duration-500 ease-out"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/20 to-primary-dark/30"
                  />

                  <span
                    aria-hidden
                    className="absolute top-5 left-5 font-heading text-sm font-medium tabular-nums text-white/70"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <sol.icon
                    aria-hidden
                    className="absolute top-5 right-5 w-6 h-6 text-white/70 group-hover:text-accent-light transition-colors duration-300"
                    strokeWidth={1.5}
                  />

                  <h2 className="absolute bottom-5 left-5 right-5 font-heading text-2xl font-bold text-white text-balance">
                    {sol.title}
                  </h2>

                  {/* Barra de acento — cresce da esquerda no hover */}
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 motion-reduce:transition-none transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="flex flex-col flex-1 p-8">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {sol.description}
                  </p>
                  <span className="mt-auto inline-flex items-center justify-between gap-2 text-primary font-heading font-medium group-hover:text-accent transition-colors duration-300">
                    Saiba mais
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            ))}
            {Array.from({ length: (3 - (SOLUCOES.length % 3)) % 3 }).map(
              (_, i) => (
                <div key={`filler-${i}`} aria-hidden className="hidden md:block bg-white" />
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
