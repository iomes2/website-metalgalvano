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
        "O material está disponível em ampla gama de cores e acabamentos, incluindo os efeitos metálico, madeira e escovado. Executamos revestimentos em ACM em obras como a fachada da JBS em Florianópolis, o envelopamento da ACATS e a sede do Grupo Krona.",
      ]}
      features={[
        "Painéis de 4mm em cores e acabamentos diversos",
        "Estrutura metálica de suporte projetada em conjunto",
        "Projeto executivo de paginamento",
        "Corte, dobra e montagem próprios",
        "Aplicação em fachadas, marquises, forros e totens",
        "Baixo peso sobre a estrutura da edificação",
        "Superfície plana e acabamento uniforme",
        "Alta durabilidade e baixa manutenção",
      ]}
    />
  );
}
