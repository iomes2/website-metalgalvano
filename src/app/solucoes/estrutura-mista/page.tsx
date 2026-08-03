import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Estrutura Mista",
  description:
    "Estrutura mista combinando aço e concreto para máxima versatilidade construtiva. Projetos personalizados pela Metalgalvano em Araquari/SC.",
};

export default function EstruturaMistaPage() {
  return (
    <ServicePage
      badge="Soluções"
      title="Estrutura Mista"
      subtitle="A combinação ideal de aço e concreto para máxima versatilidade."
      description={[
        "A estrutura mista combina as vantagens das estruturas metálicas com as do concreto, oferecendo soluções versáteis e econômicas para diferentes tipos de obras.",
        "Esse sistema construtivo permite maior flexibilidade de projeto, aproveitando a resistência do aço em vãos maiores e a robustez do concreto em fundações e fechamentos.",
      ]}
      features={[
        "Combinação de aço e concreto",
        "Maior versatilidade construtiva",
        "Flexibilidade no projeto",
        "Economia em materiais",
        "Aplicação em edifícios e galpões",
        "Redução de peso na estrutura",
      ]}
    />
  );
}
