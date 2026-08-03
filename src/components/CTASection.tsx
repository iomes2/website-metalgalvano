import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function CTASection({
  eyebrow = "Fale com a nossa equipe",
  title = "Pronto para iniciar seu projeto?",
  description = "Envie os dados da sua obra e receba um orçamento sem compromisso. Resposta em horário comercial, direto da nossa engenharia.",
}: CTASectionProps) {
  return (
    <section className="relative bg-primary-dark text-white overflow-hidden">
      {/* Faixa diagonal industrial */}
      <div
        aria-hidden
        className="h-1.5 w-full bg-accent [background-image:repeating-linear-gradient(-45deg,transparent_0_10px,rgba(38,40,43,0.55)_10px_20px)]"
      />

      {/* Grade blueprint */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      {/* Brilho de acento */}
      <div
        aria-hidden
        className="absolute -top-32 right-[10%] w-[480px] h-[480px] rounded-full bg-accent/15 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 items-center">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-accent-light font-heading font-medium text-sm uppercase tracking-widest mb-5">
              <span aria-hidden className="w-8 h-[2px] bg-accent-light" />
              {eyebrow}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-balance mb-5">
              {title}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-16">
            <div className="flex flex-col gap-4">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-lg font-heading font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${COMPANY.phones[0].replace(/\D/g, "")}`}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-heading font-medium transition-colors duration-200 cursor-pointer border border-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Phone className="w-5 h-5 text-accent-light" />
                {COMPANY.phones[0]}
              </a>
            </div>
            <dl className="mt-8 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="text-white/45 uppercase tracking-widest text-[11px] font-heading pt-0.5 w-20 shrink-0">
                  E-mail
                </dt>
                <dd className="text-white/80">{COMPANY.email}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-white/45 uppercase tracking-widest text-[11px] font-heading pt-0.5 w-20 shrink-0">
                  Horário
                </dt>
                <dd className="text-white/80">{COMPANY.hours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
