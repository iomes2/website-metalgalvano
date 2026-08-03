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
        "Esse sistema construtivo permite maior flexibilidade de projeto, aproveitando a resistência do aço em vãos maiores e a robustez do concreto em fundações e fechamentos. É o sistema aplicado em obras como o Galpão do Condomínio BHW, em Araquari.",
      ]}
      features={[
        "Combinação de aço e concreto",
        "Maior versatilidade construtiva",
        "Flexibilidade no projeto",
        "Economia em materiais",
        "Aplicação em edifícios e galpões",
        "Redução de peso na estrutura",
      ]}
      images={[
        {
          src: "/images/obra10-condominio-bhw-araquari/bhw-1.jpg",
          alt: "Galpão do Condomínio BHW com pilares de concreto e treliças metálicas",
        },
        {
          src: "/images/obra10-condominio-bhw-araquari/bhw-5.jpeg",
          alt: "Interior do galpão do Condomínio BHW, com pilares de concreto e cobertura em treliças metálicas",
        },
      ]}
    />
  );
}
