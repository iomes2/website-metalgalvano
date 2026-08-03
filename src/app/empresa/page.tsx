import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Factory, Users, Award, Target } from "lucide-react";
import { STATS, SERVICES } from "@/lib/constants";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "Conheça a Metalgalvano: fundada em Araquari/SC, com mais de 5.000m² de fábrica e equipe especializada em estruturas metálicas e pré-moldados.",
};

export default function EmpresaPage() {
  return (
    <>
      <PageHero
        badge="Quem somos"
        title="A Metalgalvano"
        subtitle="Referência em soluções metálicas completas no Sul do Brasil."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Nossa história
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Fundada em Araquari, Santa Catarina, a Metalgalvano nasceu com o
                propósito de oferecer soluções metálicas completas para o mercado
                da construção civil e industrial.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Com uma área fabril de mais de 5.000m², contamos com ampla
                infraestrutura para desenvolver projetos de diferentes portes e
                complexidades. Da concepção do projeto à montagem final, cada
                etapa é executada com rigor técnico e compromisso com prazos.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Ao longo da nossa trajetória, orgulhamo-nos de ter entregue mais
                de 39 obras em 12 cidades, atendendo clientes como BMW, Weg,
                Hapvida, Senai, Sesi e muitos outros.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-surface rounded-xl p-5 border border-border"
                  >
                    <p className="font-heading text-2xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted rounded-2xl aspect-[4/3] flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  Foto da fábrica
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
                  Por que a Metalgalvano
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance">
                  Nossos diferenciais
                </h2>
                <p className="text-muted-foreground mt-5 leading-relaxed">
                  O que garante prazo, qualidade e previsibilidade em cada obra
                  que entregamos.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-border">
                {[
                  {
                    icon: Factory,
                    title: "Fábrica própria",
                    description:
                      "Mais de 5.000m² com maquinário de ponta para todos os processos — nada é terceirizado.",
                  },
                  {
                    icon: Users,
                    title: "Equipe especializada",
                    description:
                      "Profissionais qualificados acompanham do projeto à montagem final.",
                  },
                  {
                    icon: Award,
                    title: "Qualidade total",
                    description:
                      "Processos integrados com controle de qualidade em cada etapa.",
                  },
                  {
                    icon: Target,
                    title: "Soluções sob medida",
                    description:
                      "Cada projeto é desenvolvido conforme as necessidades do cliente.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="group relative border-b border-r border-border p-8 bg-surface hover:bg-white transition-colors duration-300"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-[3px] bg-accent origin-top scale-y-0 group-hover:scale-y-100 motion-reduce:transition-none transition-transform duration-300 ease-out"
                    />
                    <div className="flex items-start justify-between mb-6">
                      <item.icon
                        aria-hidden
                        className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <span
                        aria-hidden
                        className="font-heading text-sm font-medium tabular-nums text-muted-foreground/40 group-hover:text-accent transition-colors duration-300"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Nossas soluções
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Do projeto à montagem, com fabricação na nossa própria planta e
              controle de qualidade em cada etapa.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((sol) => (
              <Link
                key={sol.title}
                href={sol.href}
                className="group bg-surface rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {sol.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {sol.description}
                </p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Saiba mais <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Vamos construir juntos?"
        description="Entre em contato e descubra como a Metalgalvano pode viabilizar seu projeto."
      />
    </>
  );
}
