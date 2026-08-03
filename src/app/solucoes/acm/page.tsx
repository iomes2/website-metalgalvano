import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "ACM",
  description:
    "Revestimento de fachadas em ACM (alumínio composto) com estrutura metálica de suporte. Projeto, fabricação e montagem pela Metalgalvano em Araquari/SC.",
};

export default function AcmPage() {
  return (
    <ServicePage
      badge="Soluções"
      title="ACM"
      subtitle="Revestimento de fachadas em alumínio composto, do suporte metálico ao acabamento."
      description={[
        "O ACM (Aluminum Composite Material) é um painel formado por duas lâminas de alumínio com um núcleo central de polietileno ou mineral. O resultado é um revestimento leve, rígido e de superfície plana, muito usado no envelopamento de fachadas, marquises, totens e forros.",
        "Trabalhamos com o sistema completo: projeto executivo do paginamento, estrutura metálica de suporte, corte, dobra e montagem dos painéis. Como a subestrutura é fabricada na nossa planta junto com o revestimento, a fachada chega à obra compatibilizada — o que reduz ajustes e prazo de montagem.",
        "O material está disponível em ampla gama de cores e acabamentos, incluindo os efeitos metálico, madeira e escovado. Executamos revestimentos em ACM em obras como a sede do Grupo Krona, a UDESC Joinville, o alpendre da Transligue e o revestimento da ACATS.",
      ]}
      features={[
        "Painéis de 4mm em cores e acabamentos diversos",
        "Estrutura metálica de suporte projetada em conjunto",
        "Projeto executivo de paginamento",
        "Corte, dobra e montagem próprios",
        "Aplicação em fachadas e alpendres",
        "Baixo peso sobre a estrutura da edificação",
        "Superfície plana e acabamento uniforme",
        "Alta durabilidade e baixa manutenção",
      ]}
      images={[
        {
          src: "/images/obra8-escritorio-krona/krona-4.jpeg",
          alt: "Fachada da sede do Grupo Krona revestida em ACM",
        },
        {
          src: "/images/obra7-jbs/jbs-5.jpeg",
          alt: "Fachada da JBS em Florianópolis revestida em ACM",
        },
        {
          src: "/images/obra9-transligue/transligue-3.jpg",
          alt: "Obra da Transligue em Blumenau com faixa de fachada revestida em ACM",
        },
        {
          src: "/images/obra12-udesc/udesc-1.jpg",
          alt: "Fachada da UDESC Joinville revestida em ACM",
        },
      ]}
    />
  );
}
