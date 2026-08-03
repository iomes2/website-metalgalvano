import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Estruturas Metálicas",
  description:
    "Projetos, fabricação e montagem de estruturas metálicas para galpões, coberturas, mezaninos, escadas e edificações industriais. Metalgalvano em Araquari/SC.",
};

export default function EstruturasMetalicasPage() {
  return (
    <ServicePage
      badge="Soluções"
      title="Estruturas Metálicas"
      subtitle="Projetos sob medida em aço para construção civil e industrial."
      description={[
        "A Metalgalvano é especialista em projetos, fabricação e montagem de estruturas metálicas para os mais diversos segmentos. Trabalhamos com estruturas em vigas e treliças metálicas parametrizadas conforme a necessidade de cada projeto.",
        "Nossas estruturas podem ser aplicadas em galpões industriais, coberturas metálicas, mezaninos, escadas, portões, guaritas e muito mais. Cada projeto é dimensionado por nossa equipe técnica para garantir segurança, durabilidade e economia. Entre as obras executadas nesse sistema estão o Galpão do Condomínio BHW, o galpão industrial do bairro Cubatão e a Escola SESI.",
      ]}
      features={[
        "Galpões industriais e comerciais",
        "Coberturas metálicas (treliça e arco)",
        "Mezaninos e passarelas",
        "Escadas e corrimãos metálicos",
        "Portões e portões de elevação",
        "Estruturas especiais",
        "Guarda-corpos e brises",
      ]}
      images={[
        {
          src: "/images/obra3-galpao-marina/galpao-marina-1.jpg",
          alt: "Galpão industrial em estrutura metálica no bairro Cubatão, Joinville",
        },
        {
          src: "/images/obra2-vila-germanica/vila-germanica-2.jpg",
          alt: "Montagem da cobertura em treliças metálicas do Espaço Vila Germânica, em Blumenau",
        },
        {
          src: "/images/obra10-condominio-bhw-araquari/bhw-5.jpeg",
          alt: "Interior do galpão do Condomínio BHW com cobertura em treliças metálicas",
        },
        {
          src: "/images/obra10-condominio-bhw-araquari/bhw-2.jpg",
          alt: "Galpão do Condomínio BHW em Araquari em estrutura metálica, vista aérea",
        },
      ]}
    />
  );
}
