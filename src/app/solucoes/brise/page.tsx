import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Brise",
  description:
    "Brises metálicos para controle solar e conforto térmico em fachadas. Projeto, fabricação e montagem pela Metalgalvano em Araquari/SC.",
};

export default function BrisePage() {
  return (
    <ServicePage
      badge="Soluções"
      title="Brise"
      subtitle="Controle solar e identidade visual para a fachada, em estrutura metálica."
      description={[
        "O brise é um elemento de proteção solar instalado na fachada da edificação. Suas lâminas filtram a incidência direta do sol sobre as aberturas, reduzindo o ganho de calor e o ofuscamento sem bloquear a iluminação natural nem a ventilação.",
        "Fabricamos brises em alumínio e em aço, nas versões fixa e móvel, com lâminas horizontais ou verticais definidas conforme a orientação solar de cada fachada. A estrutura de fixação é projetada junto com o brise, garantindo alinhamento e desempenho ao vento.",
        "Além do ganho térmico, o brise é um recurso de linguagem arquitetônica: define ritmo, textura e profundidade na fachada. Executamos essa solução em obras como o Ágora Tech Park, a Core Internacional e a Escola S.",
      ]}
      features={[
        "Lâminas horizontais ou verticais",
        "Versões fixa e móvel",
        "Execução em alumínio ou aço",
        "Redução do ganho térmico e do ofuscamento",
        "Iluminação e ventilação natural preservadas",
        "Estrutura de fixação projetada sob medida",
        "Acabamento em pintura ou anodização",
        "Projeto, fabricação e montagem próprios",
      ]}
    />
  );
}
