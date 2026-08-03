import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { PORTFOLIO_OBRAS } from "@/lib/constants";

export async function generateStaticParams() {
  return PORTFOLIO_OBRAS.map((obra) => ({
    slug: obra.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const obra = PORTFOLIO_OBRAS.find((o) => o.slug === slug);

  if (!obra) {
    return { title: "Obra não encontrada" };
  }

  return {
    title: `${obra.title} — Obras Metalgalvano`,
    description: obra.description.substring(0, 160),
    openGraph: {
      title: obra.title,
      description: obra.description.substring(0, 160),
      images: [{ url: obra.coverImage }],
    },
  };
}

export default async function ObraDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const obra = PORTFOLIO_OBRAS.find((o) => o.slug === slug);

  if (!obra) {
    notFound();
  }

  return (
    <>
      {/* Hero com imagem de capa */}
      <section className="relative h-[50vh] min-h-[400px] bg-primary-dark">
        <Image
          src={obra.coverImage}
          alt={obra.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-12 w-full">
            <Link
              href="/obras"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para obras
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block text-xs font-medium text-white bg-accent px-3 py-1.5 rounded-md">
                {obra.type}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/80 text-sm">
                <MapPin className="w-4 h-4" />
                {obra.location}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {obra.title}
            </h1>
            {obra.client && (
              <p className="text-white/70 mt-2 text-lg">
                Cliente: {obra.client}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Descrição */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Sobre esta obra
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                {obra.description}
              </p>
            </div>

            {/* Ficha Técnica */}
            <div>
              <div className="bg-surface rounded-2xl border border-border p-6 sticky top-28">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                  Ficha Técnica
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Tipo</span>
                    <span className="font-medium text-foreground">
                      {obra.type}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Localização</span>
                    <span className="font-medium text-foreground">
                      {obra.location}
                    </span>
                  </div>
                  {obra.client && (
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Cliente</span>
                      <span className="font-medium text-foreground">
                        {obra.client}
                      </span>
                    </div>
                  )}
                </div>

                {obra.highlights && obra.highlights.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-heading text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                      Destaques
                    </h4>
                    <div className="space-y-2">
                      {obra.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/contato"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-heading font-medium transition-colors cursor-pointer text-sm"
                >
                  Solicitar orçamento
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      {obra.images.length > 1 && (
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
              Galeria de Fotos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {obra.images.map((image, i) => (
                <div
                  key={image}
                  className="aspect-[16/10] rounded-xl overflow-hidden bg-muted"
                >
                  <Image
                    src={image}
                    alt={`${obra.title} — Foto ${i + 1}`}
                    width={600}
                    height={375}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Quer ser nosso próximo case?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato e solicite um orçamento para o seu projeto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-3.5 rounded-lg font-heading font-medium transition-colors cursor-pointer"
            >
              Solicitar orçamento
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/obras"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3.5 rounded-lg font-heading font-medium transition-colors cursor-pointer"
            >
              Ver outras obras
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
