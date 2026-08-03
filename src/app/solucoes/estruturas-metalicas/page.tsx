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
        "Nossas estruturas podem ser aplicadas em galpões industriais, coberturas metálicas, mezaninos, escadas, portões, guaritas e muito mais. Cada projeto é dimensionado por nossa equipe técnica para garantir segurança, durabilidade e economia.",
        "Atendemos clientes em todo o Brasil, com destaque para projetos em Joinville, Florianópolis, Curitiba, São Paulo e Porto Alegre.",
      ]}
      features={[
        "Galpões industriais e comerciais",
        "Coberturas metálicas (treliça e arco)",
        "Mezaninos e passarelas",
        "Escadas e corrimãos metálicos",
        "Portões e portões de elevação",
        "Torres e estruturas especiais",
        "Guarda-corpos e brises",
        "Pontes rolantes",
      ]}
    />
  );
}
