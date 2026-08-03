import type { Metadata } from "next";
import {
  ArrowRight,
  Bus,
  ClipboardList,
  Factory,
  Flame,
  GraduationCap,
  HardHat,
  HeartPulse,
  MapPin,
  MessageCircle,
  PencilRuler,
  ShieldCheck,
  Stethoscope,
  Truck,
  UserRound,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { PageHero } from "@/components/PageHero";
import { CurriculoForm } from "@/components/CurriculoForm";

export const metadata: Metadata = {
  title: "Trabalhe Conosco",
  description:
    "Faça parte da equipe Metalgalvano. Conheça as áreas de atuação, os benefícios e envie seu currículo para trabalhar na nossa fábrica em Araquari/SC.",
};

const WHATSAPP_RH = `https://wa.me/${COMPANY.whatsapp.rh.number}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Metalgalvano e gostaria de enviar meu currículo."
)}`;

const PILLARS = [
  {
    icon: Factory,
    title: "Fábrica própria",
    description:
      "Mais de 5.000m² de área fabril com maquinário de ponta. Aqui você trabalha com estrutura de verdade, não com improviso.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança em primeiro lugar",
    description:
      "EPIs, treinamentos e procedimentos de segurança levados a sério — na fábrica e nas montagens em obra.",
  },
  {
    icon: GraduationCap,
    title: "Espaço para crescer",
    description:
      "Quem entra como ajudante pode chegar a montador, soldador ou líder de equipe. Valorizamos quem quer aprender.",
  },
  {
    icon: UserRound,
    title: "Time que se conhece",
    description:
      "Equipe enxuta e próxima, onde a sua entrega aparece e o seu trabalho é reconhecido pelo nome.",
  },
];

const AREAS = [
  {
    icon: Flame,
    title: "Solda e Caldeiraria",
    description:
      "Soldadores, caldeireiros e ajudantes para a fabricação de estruturas metálicas em aço.",
  },
  {
    icon: HardHat,
    title: "Montagem em Obra",
    description:
      "Montadores e ajudantes de montagem para execução de coberturas, galpões, brises e fachadas.",
  },
  {
    icon: Wrench,
    title: "Produção e Serralheria",
    description:
      "Operadores de máquinas, serralheiros, pintores e auxiliares de produção na nossa planta.",
  },
  {
    icon: PencilRuler,
    title: "Engenharia e Projetos",
    description:
      "Projetistas e desenhistas com domínio de CAD e softwares de detalhamento de estruturas metálicas.",
  },
  {
    icon: ClipboardList,
    title: "Administrativo e Comercial",
    description:
      "Vendas, orçamentos, compras, financeiro e apoio administrativo.",
  },
  {
    icon: Truck,
    title: "Logística e Expedição",
    description:
      "Motoristas, conferentes e apoio na expedição e no transporte das estruturas até a obra.",
  },
];

const BENEFITS = [
  { icon: UtensilsCrossed, label: "Refeição no local" },
  { icon: Bus, label: "Vale-transporte" },
  { icon: Stethoscope, label: "Assistência médica" },
  { icon: HeartPulse, label: "Seguro de vida" },
  { icon: GraduationCap, label: "Treinamentos técnicos" },
  { icon: ShieldCheck, label: "EPIs fornecidos pela empresa" },
];

const STEPS = [
  {
    title: "Envio do currículo",
    description:
      "Você manda o currículo pelo WhatsApp do RH ou entrega pessoalmente na fábrica.",
  },
  {
    title: "Triagem",
    description:
      "Nosso RH analisa o perfil e compara com as vagas abertas e com as demandas previstas.",
  },
  {
    title: "Entrevista",
    description:
      "Conversa com o RH e com o responsável pela área, para entender experiência e expectativas.",
  },
  {
    title: "Admissão",
    description:
      "Aprovado, você recebe a lista de documentos, faz o exame admissional e a integração de segurança.",
  },
];

export default function CarreirasPage() {
  return (
    <>
      <PageHero
        badge="Trabalhe conosco"
        title="Construa sua carreira com a gente"
        subtitle="Somos uma indústria de estruturas metálicas em Araquari/SC, com mais de 20 anos de estrada e obras espalhadas por Santa Catarina e pelo Brasil. E tudo isso é feito por gente."
      />

      {/* Por que trabalhar aqui */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
                  Por que a Metalgalvano
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance">
                  Um bom lugar para trabalhar e evoluir
                </h2>
                <p className="text-muted-foreground mt-5 leading-relaxed">
                  Cada galpão, cobertura ou fachada que entregamos passa pela
                  mão de alguém do nosso time. É por isso que investimos em
                  estrutura, em segurança e nas pessoas que fazem a obra
                  acontecer.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-border">
                {PILLARS.map((item, i) => (
                  <div
                    key={item.title}
                    className="group relative border-b border-r border-border p-8 bg-white hover:bg-surface transition-colors duration-300"
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

      {/* Áreas de atuação */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center mb-12">
            <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
              Onde você pode atuar
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Áreas de atuação
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Trabalhamos com perfis técnicos e administrativos. Mesmo que não
              haja uma vaga aberta hoje na sua área, mantemos os currículos em
              banco para as próximas contratações.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <area.icon
                  aria-hidden
                  className="w-8 h-8 text-accent mb-5"
                  strokeWidth={1.5}
                />
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {area.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-10 items-center">
            <div className="lg:col-span-5">
              <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
                O que oferecemos
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-5">
                Benefícios
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Registro em carteira desde o primeiro dia, salário em dia e uma
                estrutura pensada para quem passa o dia inteiro conosco.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BENEFITS.map((benefit) => (
                  <li
                    key={benefit.label}
                    className="flex items-center gap-4 bg-surface rounded-xl p-5 border border-border"
                  >
                    <benefit.icon
                      aria-hidden
                      className="w-6 h-6 text-primary shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {benefit.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Processo seletivo */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-12 max-w-2xl">
            <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
              Sem mistério
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance">
              Como é o nosso processo seletivo
            </h2>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {STEPS.map((step, i) => (
              <li key={step.title} className="bg-surface p-8">
                <span
                  aria-hidden
                  className="font-heading text-3xl font-bold tabular-nums text-accent/25 block mb-4"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Formulário de candidatura */}
      <section id="enviar-curriculo" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-12">
            <p className="text-accent font-heading font-medium text-sm uppercase tracking-widest mb-3">
              Cadastre-se
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-5">
              Envie seu currículo
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Preencha os campos abaixo e anexe o arquivo do seu currículo. Sua
              candidatura vai direto para o nosso RH e fica registrada no banco
              de talentos para as próximas contratações.
            </p>
          </div>

          <CurriculoForm />
        </div>
      </section>

      {/* Outros canais */}
      <section className="relative bg-primary-dark text-white overflow-hidden">
        <div
          aria-hidden
          className="h-1.5 w-full bg-accent [background-image:repeating-linear-gradient(-45deg,transparent_0_10px,rgba(38,40,43,0.55)_10px_20px)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div
          aria-hidden
          className="absolute -top-32 right-[10%] w-[480px] h-[480px] rounded-full bg-accent/15 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 text-accent-light font-heading font-medium text-sm uppercase tracking-widest mb-5">
                <span aria-hidden className="w-8 h-[2px] bg-accent-light" />
                Outras formas de chegar até nós
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-balance mb-5">
                Prefere falar direto com o RH?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-xl mb-8">
                Você também pode mandar mensagem no WhatsApp ou entregar o
                currículo pessoalmente na nossa fábrica, em Araquari.
              </p>

              <div className="border-t border-white/15 pt-8">
                <p className="font-heading font-semibold mb-4">
                  O que incluir no currículo
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm text-white/70">
                  {[
                    "Cargo ou área de interesse",
                    "Experiências anteriores e tempo em cada uma",
                    "Cursos técnicos e certificações (NR-35, NR-10, solda)",
                    "Cidade onde mora e disponibilidade de horário",
                    "Telefone e WhatsApp atualizados",
                    "Disponibilidade para viagens ou obras fora",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="w-1.5 h-1.5 rounded-full bg-accent-light shrink-0 mt-2"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-16">
              <div className="flex flex-col gap-4">
                <a
                  href={WHATSAPP_RH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-lg font-heading font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp do RH
                  <ArrowRight className="w-5 h-5" />
                </a>
                <p className="text-white/50 text-sm text-center">
                  {COMPANY.whatsapp.rh.label}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/15">
                <p className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin
                    aria-hidden
                    className="w-5 h-5 text-accent-light shrink-0 mt-0.5"
                  />
                  <span>
                    <span className="block text-white font-medium mb-1">
                      Entrega presencial
                    </span>
                    {COMPANY.address}
                    <br />
                    CEP: {COMPANY.cep}
                    <br />
                    <span className="text-white/50">{COMPANY.hours}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
