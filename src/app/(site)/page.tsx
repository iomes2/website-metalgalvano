import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Warehouse,
  Layers,
  Blinds,
  PanelsTopLeft,
  Store,
  SunMedium,
  Volleyball,
  HardHat,
  Factory,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { SERVICES, SEGMENTS, STATS, CLIENTS } from "@/lib/constants";
import { sanityFetch } from "@/sanity/fetch";
import { imageUrl } from "@/sanity/image";
import { featuredObrasQuery } from "@/sanity/queries";
import type { ObraCard } from "@/sanity/types";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { AboutCarousel } from "@/components/AboutCarousel";
import { ClientsSlider } from "@/components/ClientsSlider";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Warehouse,
  Layers,
  Blinds,
  PanelsTopLeft,
  Store,
  SunMedium,
  Volleyball,
  HardHat,
  Factory,
};

export default async function Home() {
  // Sempre 6: destacadas primeiro, completadas pelas mais recentes.
  const obras = await sanityFetch<ObraCard[]>(featuredObrasQuery);

  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="bg-white relative -mt-16 z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="bg-white rounded-2xl shadow-xl border border-border grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`p-8 text-center ${
                  i < STATS.length - 1 ? "border-r border-border" : ""
                }`}
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
            {/* Coluna fixa de contexto */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
                  O que fazemos
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance">
                  Soluções completas em aço
                </h2>
                <p className="text-muted-foreground mt-5 leading-relaxed">
                  Da estrutura ao acabamento, todos os processos acontecem
                  dentro da nossa fábrica de 5.000m² — com maquinário de ponta e
                  controle de qualidade em cada etapa.
                </p>
                <Link
                  href="/solucoes"
                  className="mt-8 inline-flex items-center gap-2 text-primary font-heading font-medium border-b-2 border-primary/20 hover:border-accent hover:text-accent pb-1 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Ver todas as soluções
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Lista editorial — linhas divididas, sem cards */}
            <div className="lg:col-span-8 border-t border-border">
              {SERVICES.map((service, i) => {
                const Icon = iconMap[service.icon];
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group relative flex items-start gap-5 sm:gap-7 border-b border-border py-7 pl-5 pr-4 -mx-1 hover:bg-surface transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                  >
                    {/* Barra de acento — cresce no hover, sem deslocar o layout */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-[3px] bg-accent origin-top scale-y-0 group-hover:scale-y-100 motion-reduce:transition-none transition-transform duration-300 ease-out"
                    />

                    <span
                      aria-hidden
                      className="hidden sm:block font-heading text-sm font-medium tabular-nums text-muted-foreground/50 pt-1 group-hover:text-accent transition-colors duration-300"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <Icon
                      aria-hidden
                      className="w-7 h-7 shrink-0 text-primary group-hover:text-accent transition-colors duration-300"
                      strokeWidth={1.5}
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-xl font-semibold text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-1.5 max-w-xl">
                        {service.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      aria-hidden
                      className="w-5 h-5 shrink-0 self-center text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none transition-all duration-300"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Segmentos atendidos */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="border-t border-border pt-14">
            <div className="text-center mb-12">
              <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
                Onde atuamos
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Segmentos atendidos
              </h2>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
              {SEGMENTS.map((segment) => {
                const Icon = iconMap[segment.icon];
                return (
                  <li
                    key={segment.label}
                    className="group flex flex-col items-center text-center gap-4"
                  >
                    <Icon
                      aria-hidden
                      className="w-14 h-14 text-primary group-hover:text-accent group-hover:-translate-y-1 motion-reduce:transform-none transition-all duration-300 ease-out"
                      strokeWidth={1.25}
                    />
                    <span className="font-heading text-sm font-semibold uppercase tracking-wide text-secondary group-hover:text-foreground text-balance transition-colors duration-300">
                      {segment.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* About / Differentials */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
                Sobre a empresa
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Referência em soluções metálicas no Sul do Brasil
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Fundada em Araquari/SC, a Metalgalvano atua no mercado nacional
                com uma área fabril de mais de 5.000m². Nos destacamos por
                oferecer soluções metálicas completas — do projeto à montagem —
                com transparência e qualidade em cada etapa.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Nossa fábrica conta com equipamentos de ponta para o corte, a
                fabricação e a montagem das peças, garantindo controle total da
                qualidade.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Fábrica própria de 5.000m²",
                  "Equipe técnica especializada",
                  "Processos internos integrados",
                  "Atendimento em todo o Brasil",
                  "Projetos sob medida",
                  "Garantia de qualidade",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/empresa"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-3.5 rounded-lg font-heading font-medium transition-colors cursor-pointer"
              >
                Conheça nossa história
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <AboutCarousel />
              <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 rounded-2xl shadow-xl hidden lg:block z-10">
                <p className="font-heading text-3xl font-bold">5.000m²</p>
                <p className="text-white/80 text-sm">de área fabril</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Malha técnica — remete à prancha de projeto, esmaecida nas bordas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center mb-16">
            <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
              Portfólio
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Obras realizadas
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Conheça alguns dos nossos projetos entregues em diversas cidades de
              Santa Catarina e todo o Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {obras.map((obra) => (
              <Link
                key={obra.slug}
                href={`/obras/${obra.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                  <Image
                    src={imageUrl(obra.coverImage, 400)}
                    alt={obra.coverImage.alt || obra.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/60 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-heading font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver detalhes
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-2">
                    {obra.type}
                  </span>
                  <h3 className="font-heading font-semibold text-foreground">
                    {obra.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {obra.location}
                    {obra.client && ` — ${obra.client}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/obras"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3.5 rounded-lg font-heading font-medium transition-colors cursor-pointer"
            >
              Ver todas as obras
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center mb-12">
            <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
              Confiança comprovada
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Clientes que confiam em nós
            </h2>
          </div>
        </div>

        {/* Slider full-width (bleeds past the container) */}
        <div className="max-w-[100vw]">
          <ClientsSlider clients={CLIENTS} />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
