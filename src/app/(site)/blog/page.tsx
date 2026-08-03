import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre estruturas metálicas, dicas de construção, tipos de cobertura e mais. Blog da Metalgalvano.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        badge="Conteúdo"
        title="Blog"
        subtitle="Artigos, dicas e novidades sobre o mundo das estruturas metálicas."
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <div className="bg-surface rounded-2xl border border-border p-16">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Em breve
            </h2>
            <p className="text-muted-foreground">
              Estamos preparando conteúdos relevantes sobre estruturas metálicas,
              pré-moldados, dicas de construção e muito mais. Fique atento!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
