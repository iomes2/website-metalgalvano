import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";

interface ServicePageProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string[];
  features: string[];
  ctaText?: string;
  heroImage?: string;
}

export function ServicePage({
  badge,
  title,
  subtitle,
  description,
  features,
  ctaText = "Solicitar orçamento",
  heroImage,
}: ServicePageProps) {
  return (
    <>
      <PageHero
        badge={badge}
        title={title}
        subtitle={subtitle}
        image={heroImage}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              {description.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-8 space-y-3">
                {features.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contato"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-lg font-heading font-semibold transition-colors cursor-pointer mt-10"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="bg-muted rounded-2xl aspect-[4/3] flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  Foto do serviço
                </p>
              </div>
              <div className="bg-muted rounded-2xl aspect-[4/3] flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  Foto do serviço
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
