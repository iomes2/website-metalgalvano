import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Pré-Moldados",
  description:
    "Elementos pré-moldados em concreto para construção rápida e eficiente. Galpões, muros, pisos e pilares pré-fabricados. Metalgalvano em Araquari/SC.",
};

export default function PreMoldadosPage() {
  return (
    <ServicePage
      badge="Soluções"
      title="Pré-Moldados"
      subtitle="Elementos pré-fabricados em concreto para construção rápida e eficiente."
      description={[
        "A Metalgalvano oferece soluções em pré-moldados de concreto, atendendo projetos que demandam agilidade e padronização construtiva. Os elementos são fabricados com rigoroso controle de qualidade.",
        "A utilização de pré-moldados reduz significativamente o tempo de obra, gera menos resíduos e garante um acabamento uniforme e preciso.",
      ]}
      features={[
        "Pilares e vigas pré-fabricadas",
        "Lajes e painéis de fechamento",
        "Muros pré-moldados",
        "Pisos industriais",
        "Redução no tempo de execução",
        "Menor geração de resíduos",
      ]}
    />
  );
}
