import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { sanityFetch } from "@/sanity/fetch";
import { imageUrl } from "@/sanity/image";
import { obrasCountQuery, obrasListQuery } from "@/sanity/queries";
import type { ObraCard } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Obras Realizadas",
  description:
    "Conheça as obras realizadas pela Metalgalvano: galpões metálicos, coberturas, fachadas ACM, escadas e mais em Joinville, Araquari, Curitiba e outras cidades.",
};

export default async function ObrasPage() {
  const [obras, total] = await Promise.all([
    sanityFetch<ObraCard[]>(obrasListQuery),
    sanityFetch<number>(obrasCountQuery),
  ]);

  return (
    <>
      <PageHero
        badge="Portfólio"
        title="Obras realizadas"
        subtitle={`Mais de ${total} projetos entregues em Santa Catarina, Paraná e todo o Brasil.`}
      />

      <section className="relative py-20 bg-surface overflow-hidden">
        {/* Grade blueprint — mesma linguagem técnica do hero */}
        <div
          aria-hidden
          className="absolute inset-0 [background-image:linear-gradient(rgba(38,40,43,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(38,40,43,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_85%)]"
        />
        <div
          aria-hidden
          className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-accent/8 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-[-10%] w-[460px] h-[460px] rounded-full bg-primary/6 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {obras.map((obra) => (
              <Link
                key={obra.slug}
                href={`/obras/${obra.slug}`}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-border shadow-[0_1px_2px_rgba(38,40,43,0.04)] transition-colors duration-300 ease-out hover:border-accent/50 hover:bg-accent/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
              >
                <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                  <Image
                    src={imageUrl(obra.coverImage, 600)}
                    alt={obra.coverImage.alt || obra.title}
                    width={600}
                    height={375}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                  {/* Scrim superior — garante contraste do chip sobre céus claros */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary-dark/45 to-transparent"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-heading font-medium text-primary-dark shadow-sm">
                    {obra.type}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-heading font-semibold text-foreground leading-snug transition-colors duration-200 group-hover:text-accent">
                    {obra.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1.5 flex items-center gap-1.5">
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 shrink-0 text-accent"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span>
                      {obra.location}
                      {obra.client && ` — ${obra.client}`}
                    </span>
                  </p>

                  {obra.highlight && (
                    <p className="mt-3 pt-3 border-t border-border text-sm text-primary font-heading font-medium">
                      {obra.highlight}
                    </p>
                  )}

                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-heading font-medium text-accent">
                    Ver obra
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Quer ser nosso próximo case?"
        description="Entre em contato e solicite um orçamento para o seu projeto."
      />
    </>
  );
}
