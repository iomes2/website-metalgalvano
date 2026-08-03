export const COMPANY = {
  name: "Metalgalvano",
  fullName: "Metalgalvano Soluções Metálicas",
  tagline: "Estruturas Metálicas e Pré-Moldados",
  description:
    "Projetos, fabricação e montagem de estruturas metálicas e pré-moldados com qualidade e transparência.",
  address: "BR 280, km 26, 6.571 - Araquari/SC",
  cep: "89.245-000",
  phones: ["(47) 3433-4164", "(47) 3063-2130"],
  whatsapp: {
    comercial: { number: "5547991804291", label: "(47) 99180-4291" },
    financeiro: { number: "554734334164", label: "(47) 3433-4164" },
    rh: { number: "5547992223536", label: "(47) 99222-3536" },
  },
  email: "vendas@metalgalvano.com.br",
  hours: "Segunda a Sexta, 7h30 - 17h30",
  social: {
    instagram: "https://instagram.com/metalgalvano",
    facebook: "https://www.facebook.com/metalgalvano",
    youtube:
      "https://www.youtube.com/channel/UCN7zdOnI8RGL3Dq3nQp4hdQ",
    pinterest: "https://br.pinterest.com/metalgalvano",
    linkedin: "#",
  },
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Empresa", href: "/empresa" },
  {
    label: "Soluções",
    href: "/solucoes",
    children: [
      { label: "Estruturas Metálicas", href: "/solucoes/estruturas-metalicas" },
      { label: "Pré-Moldados", href: "/solucoes/pre-moldados" },
      { label: "Estrutura Mista", href: "/solucoes/estrutura-mista" },
      { label: "Brise", href: "/solucoes/brise" },
      { label: "ACM", href: "/solucoes/acm" },
    ],
  },
  { label: "Obras", href: "/obras" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
] as const;

export const SERVICES = [
  {
    title: "Estruturas Metálicas",
    description:
      "Projetos e construção de estruturas em aço para galpões, coberturas, mezaninos e edificações industriais.",
    icon: "Building2",
    href: "/solucoes/estruturas-metalicas",
  },
  {
    title: "Pré-Moldados",
    description:
      "Elementos pré-fabricados em concreto para construção rápida e eficiente.",
    icon: "Warehouse",
    href: "/solucoes/pre-moldados",
  },
  {
    title: "Estrutura Mista",
    description:
      "Combinação de aço e concreto para maior versatilidade construtiva e economia de materiais.",
    icon: "Layers",
    href: "/solucoes/estrutura-mista",
  },
  {
    title: "Brise",
    description:
      "Brises metálicos para controle solar, conforto térmico e identidade visual da fachada.",
    icon: "Blinds",
    href: "/solucoes/brise",
  },
  {
    title: "ACM",
    description:
      "Revestimento de fachadas em alumínio composto, com acabamento uniforme e alta durabilidade.",
    icon: "PanelsTopLeft",
    href: "/solucoes/acm",
  },
] as const;

export const SEGMENTS = [
  { label: "Shoppings Centers", icon: "Store" },
  { label: "Geração de Energia", icon: "SunMedium" },
  { label: "Ginásios Poliesportivos", icon: "Volleyball" },
  { label: "Construção Civil", icon: "HardHat" },
  { label: "Galpões Industriais", icon: "Factory" },
] as const;

export const STATS = [
  { value: "60+", label: "Obras Realizadas" },
  { value: "5.000", label: "m² de Fábrica" },
  { value: "12+", label: "Cidades Atendidas" },
  { value: "20+", label: "Anos de Experiência" },
] as const;

export const CLIENTS = [
  { name: "WEG", logo: "/images/imagem-28.jpg" },
  { name: "Ford", logo: "/images/imagem-42.png" },
  { name: "Schulz", logo: "/images/imagem-31.png" },
  { name: "Ciser", logo: "/images/imagem-45.png" },
  { name: "Univille", logo: "/images/imagem-30.png" },
  { name: "Grupo Marista", logo: "/images/imagem-38.png" },
  { name: "Grupo Almeida Junior", logo: "/images/imagem-20.jpg" },
  { name: "INCASA", logo: "/images/imagem-17.png" },
  { name: "OPA Bier", logo: "/images/imagem-18.png" },
  { name: "Henz Engenharia", logo: "/images/imagem-24.png" },
  { name: "RAC Engenharia", logo: "/images/imagem-23.png" },
  { name: "Qualieng Engenharia", logo: "/images/imagem-32.png" },
  { name: "Construtora Richter", logo: "/images/imagem-22.png" },
  { name: "Construtora Hora Certa", logo: "/images/imagem-21.png" },
  { name: "CHF Construtora", logo: "/images/imagem-25.png" },
  { name: "Construtora Dona Francisca", logo: "/images/imagem-26.png" },
  { name: "Vattaro Construções", logo: "/images/imagem-29.png" },
  { name: "PerVille Construções", logo: "/images/imagem-34.png" },
  { name: "Endeal Engenharia", logo: "/images/imagem-44.jpg" },
  { name: "Grupo Estrutura", logo: "/images/imagem-39.png" },
  { name: "Transmagna", logo: "/images/imagem-33.png" },
  { name: "IBT Plásticos", logo: "/images/imagem-35.png" },
  { name: "Linkplas Injetados", logo: "/images/imagem-37.png" },
  { name: "Cervejaria Gutbrau", logo: "/images/imagem-36.png" },
  { name: "Friolar Ovos", logo: "/images/imagem-41.jpg" },
] as const;

export const OBRA_TYPES = [
  "Todos",
  "Galpão Metálico",
  "Cobertura Metálica",
  "Fachada ACM",
  "Estrutura Metálica",
  "Escada Metálica",
  "Portão Metálico",
  "Guarda Corpo",
  "Mezanino",
] as const;

export interface Obra {
  slug: string;
  title: string;
  location: string;
  client?: string;
  type: string;
  description: string;
  highlights?: string[];
  coverImage: string;
  images: string[];
}

export const PORTFOLIO_OBRAS: Obra[] = [
  {
    slug: "quadra-escola",
    title: "Quadra de Escola — Cobertura e ACM",
    location: "Santa Catarina",
    type: "Estrutura Metálica",
    description:
      "Na Metalgalvano, transformamos planejamento em resultados, entregando estruturas metálicas com qualidade, segurança e pontualidade. Cada projeto entregue reforça nosso compromisso com a excelência, a confiança dos nossos clientes e a busca constante pelos melhores resultados.",
    highlights: [
      "950 m² de estrutura metálica para cobertura",
      "448 m² de estrutura metálica para fechamento",
      "193 m² de revestimento em ACM",
    ],
    coverImage: "/images/obra1-quadra-escola/quadra-escola-1.jpg",
    images: ["/images/obra1-quadra-escola/quadra-escola-1.jpg"],
  },
  {
    slug: "vila-germanica",
    title: "Espaço Vila Germânica — Oktoberfest",
    location: "Blumenau/SC",
    client: "Vila Germânica",
    type: "Estrutura Metálica",
    description:
      "Executamos o mais novo espaço da Vila Germânica da Oktoberfest, em Blumenau. Foram 3.200m² de estrutura metálica e 695m² em ACM.",
    highlights: [
      "3.200m² de estrutura metálica",
      "695m² de revestimento em ACM",
    ],
    coverImage: "/images/obra2-vila-germanica/vila-germanica-1.jpg",
    images: ["/images/obra2-vila-germanica/vila-germanica-1.jpg"],
  },
  {
    slug: "galpao-marina",
    title: "Galpão Industrial — Bairro Cubatão",
    location: "Joinville/SC",
    type: "Galpão Metálico",
    description:
      "Concluímos a construção de um galpão, alpendre e fechamento industrial no bairro Cubatão, em Joinville. O galpão foi executado com 5.095m² de estrutura metálica. Tudo executado com estrutura metálica de alta qualidade, garantindo agilidade, segurança e durabilidade para o cliente.",
    highlights: [
      "3.762m² de galpão metálico",
      "678m² de alpendre metálico",
      "655m² de fechamento",
    ],
    coverImage: "/images/obra3-galpao-marina/galpao-marina-1.jpg",
    images: [
      "/images/obra3-galpao-marina/galpao-marina-1.jpg",
      "/images/obra3-galpao-marina/galpao-marina-2.jpg",
    ],
  },
  {
    slug: "cei-manoel-antonio",
    title: "CEI Manoel Antônio da Rosa",
    location: "Joinville/SC",
    type: "Estrutura Metálica",
    description:
      "Participação com grande orgulho em mais uma nova escola. CEI Manoel Antônio da Rosa, localizado no bairro Comasa na cidade de Joinville, totalizando 6.994m² de estrutura metálica, com coberturas, fechamentos, pergolados, escadas, guarda-corpo, brises e ACM.",
    highlights: ["6.994m² de estrutura metálica"],
    coverImage: "/images/obra4-cei/cei-1.jpeg",
    images: ["/images/obra4-cei/cei-1.jpeg"],
  },
  {
    slug: "crematorio-angelus",
    title: "Crematório Angelus",
    location: "Santa Catarina",
    client: "Angelus",
    type: "Estrutura Metálica",
    description:
      "Orgulho de ter participado desta obra. Projeto completo com estrutura metálica, cobertura em telha sanduíche, plataforma metálica, escada marinheiro e marquise metálica revestida em ACM.",
    highlights: [
      "2.000m² de estrutura metálica",
      "Cobertura em telha sanduíche PIR 30mm",
      "Plataforma metálica",
      "Escada marinheiro",
      "Marquise metálica revestida em ACM",
    ],
    coverImage: "/images/obra5-crematorio-angelus/crematorio-angelus-1.jpg",
    images: [
      "/images/obra5-crematorio-angelus/crematorio-angelus-1.jpg",
      "/images/obra5-crematorio-angelus/crematorio-angelus-2.jpg",
    ],
  },
  {
    slug: "core-internacional",
    title: "Core Internacional",
    location: "Joinville/SC",
    client: "Core Internacional",
    type: "Cobertura Metálica",
    description:
      "No empreendimento Core Internacional, em Joinville, a Metalgalvano executou soluções metálicas que unem resistência, funcionalidade e estética, incluindo coberturas metálicas, brises arquitetônicos, pergolados, rampa caracol, passarela e escadas metálicas.",
    highlights: [
      "1.820m² de coberturas metálicas",
      "168m² de pergolados",
      "1.400m² de brises para fachada e rampa",
      "120m² de rampa caracol",
      "32,9m² de passarela metálica",
      "2 escadas metálicas",
    ],
    coverImage:
      "/images/obra6-escola-internacional-core-e/core-internacional-1.jpeg",
    images: [
      "/images/obra6-escola-internacional-core-e/core-internacional-1.jpeg",
      "/images/obra6-escola-internacional-core-e/core-internacional-2.jpeg",
      "/images/obra6-escola-internacional-core-e/core-internacional-3.jpeg",
      "/images/obra6-escola-internacional-core-e/core-internacional-4.jpeg",
    ],
  },
  {
    slug: "jbs-florianopolis",
    title: "Fachada JBS",
    location: "Florianópolis/SC",
    client: "JBS",
    type: "Fachada ACM",
    description:
      "Executamos o novo prédio da JBS, em Florianópolis. Realizamos o revestimento em ACM 4mm nas fachadas norte e sul, com fachada em brises e telha perfurada.",
    highlights: [
      "798m² de estrutura metálica revestida em ACM",
      "Fachada em brises",
      "Telha perfurada",
    ],
    coverImage: "/images/obra7-jbs/jbs-1.jpeg",
    images: [
      "/images/obra7-jbs/jbs-1.jpeg",
      "/images/obra7-jbs/jbs-2.jpeg",
      "/images/obra7-jbs/jbs-3.jpeg",
      "/images/obra7-jbs/jbs-4.jpeg",
      "/images/obra7-jbs/jbs-5.jpeg",
      "/images/obra7-jbs/jbs-6.jpeg",
      "/images/obra7-jbs/jbs-7.jpeg",
      "/images/obra7-jbs/jbs-8.jpeg",
      "/images/obra7-jbs/jbs-9.jpeg",
    ],
  },
  {
    slug: "escritorio-krona",
    title: "Fachada Grupo Krona",
    location: "Santa Catarina",
    client: "Krona",
    type: "Fachada ACM",
    description:
      "Executamos a fachada do Grupo Krona em ACM. Foram 817m² de revestimento em ACM e 207m² de estruturas metálicas, com acabamento em galvanização a fogo. Mais um projeto entregue com qualidade, precisão e alto padrão.",
    highlights: [
      "817m² de revestimento em ACM",
      "207m² de estruturas metálicas",
      "Acabamento em galvanização a fogo",
    ],
    coverImage: "/images/obra8-escritorio-krona/krona-4.jpeg",
    images: [
      "/images/obra8-escritorio-krona/krona-1.jpg",
      "/images/obra8-escritorio-krona/krona-2.jpeg",
      "/images/obra8-escritorio-krona/krona-3.jpeg",
      "/images/obra8-escritorio-krona/krona-4.jpeg",
    ],
  },
  {
    slug: "transligue-blumenau",
    title: "Alpendre Metálico Transligue",
    location: "Blumenau/SC",
    client: "Transligue",
    type: "Estrutura Metálica",
    description:
      "Alpendre metálico revestido em ACM, em Blumenau. O alpendre metálico oferece flexibilidade de design, resistência ao fogo, baixa manutenção, proteção térmica, instalação rápida, sustentabilidade, estética moderna e excelente custo-benefício.",
    highlights: [
      "Flexibilidade de design",
      "Resistência ao fogo",
      "Revestimento em ACM",
      "Estética moderna",
    ],
    coverImage: "/images/obra9-transligue/transligue-3.jpg",
    images: [
      "/images/obra9-transligue/transligue-1.jpg",
      "/images/obra9-transligue/transligue-2.jpg",
      "/images/obra9-transligue/transligue-3.jpg",
      "/images/obra9-transligue/transligue-4.jpg",
    ],
  },
  {
    slug: "condominio-bhw",
    title: "Galpão Condomínio BHW",
    location: "Araquari/SC",
    client: "BHW",
    type: "Galpão Metálico",
    description:
      "Mais uma grande obra da Metalgalvano. Executamos um galpão com 40.000m² no Condomínio BHW, em Araquari. Foram executados 40.000m² de estrutura metálica e fechamento metálico.",
    highlights: [
      "40.000m² de estrutura metálica",
      "Fechamento metálico completo",
    ],
    coverImage: "/images/obra10-condominio-bhw-araquari/bhw-2.jpg",
    images: [
      "/images/obra10-condominio-bhw-araquari/bhw-1.jpg",
      "/images/obra10-condominio-bhw-araquari/bhw-2.jpg",
      "/images/obra10-condominio-bhw-araquari/bhw-3.jpeg",
      "/images/obra10-condominio-bhw-araquari/bhw-4.jpeg",
      "/images/obra10-condominio-bhw-araquari/bhw-5.jpeg",
    ],
  },
  {
    slug: "tigre-alagoas",
    title: "Obra Tigre",
    location: "Alagoas",
    client: "Tigre",
    type: "Estrutura Metálica",
    description:
      "Projeto executado para a Tigre em Alagoas. Estruturas metálicas de alta qualidade com a excelência e o padrão Metalgalvano.",
    coverImage: "/images/obra11-tigre-alagoas/tigre-4.jpg",
    images: [
      "/images/obra11-tigre-alagoas/tigre-1.jpg",
      "/images/obra11-tigre-alagoas/tigre-2.jpg",
      "/images/obra11-tigre-alagoas/tigre-3.jpg",
      "/images/obra11-tigre-alagoas/tigre-4.jpg",
    ],
  },
  {
    slug: "udesc-joinville",
    title: "Alpendre UDESC",
    location: "Joinville/SC",
    client: "UDESC",
    type: "Fachada ACM",
    description:
      "Alpendre revestido em ACM na UDESC, em Joinville/SC. Projeto que combina funcionalidade e estética para a universidade.",
    coverImage: "/images/obra12-udesc/udesc-1.jpg",
    images: [
      "/images/obra12-udesc/udesc-1.jpg",
      "/images/obra12-udesc/udesc-2.jpg",
      "/images/obra12-udesc/udesc-3.jpg",
      "/images/obra12-udesc/udesc-4.jpg",
    ],
  },
  {
    slug: "escola-s-joinville",
    title: "Escola S",
    location: "Joinville/SC",
    type: "Estrutura Metálica",
    description:
      "Grande obra finalizada pela equipe Metalgalvano. Um empreendimento de referência para a cidade de Joinville e o estado de Santa Catarina, com mais de 10 mil m² de estrutura metálica, incluindo coberturas, fechamentos, guarita, passarela, brises e ACM.",
    highlights: [
      "Mais de 10.000m² de estrutura metálica",
      "Coberturas e fechamentos",
      "Guarita e passarela",
      "Brises e ACM",
    ],
    coverImage: "/images/obra13-escola-s/escola-s-5.jpg",
    images: [
      "/images/obra13-escola-s/escola-s-1.jpg",
      "/images/obra13-escola-s/escola-s-2.jpg",
      "/images/obra13-escola-s/escola-s-3.jpg",
      "/images/obra13-escola-s/escola-s-4.jpg",
      "/images/obra13-escola-s/escola-s-5.jpg",
      "/images/obra13-escola-s/escola-s-6.jpg",
      "/images/obra13-escola-s/escola-s-7.jpg",
      "/images/obra13-escola-s/escola-s-8.jpg",
    ],
  },
  {
    slug: "praca-angelo-piazera",
    title: "Praça Angêlo Piazera",
    location: "Jaraguá do Sul/SC",
    type: "Estrutura Metálica",
    description:
      "Obra da Praça Angêlo Piazera, em comemoração aos 147 anos de Jaraguá do Sul. Uma obra que temos orgulho de participar para o aniversário da cidade.",
    coverImage: "/images/obra14-praca-angelo/praca-angelo-3.jpg",
    images: [
      "/images/obra14-praca-angelo/praca-angelo-1.jpg",
      "/images/obra14-praca-angelo/praca-angelo-2.jpg",
      "/images/obra14-praca-angelo/praca-angelo-3.jpg",
      "/images/obra14-praca-angelo/praca-angelo-4.jpg",
      "/images/obra14-praca-angelo/praca-angelo-5.jpg",
      "/images/obra14-praca-angelo/praca-angelo-6.jpg",
      "/images/obra14-praca-angelo/praca-angelo-7.jpg",
      "/images/obra14-praca-angelo/praca-angelo-8.jpg",
    ],
  },
  {
    slug: "acats-florianopolis",
    title: "ACATS — Envelopamento em ACM",
    location: "Florianópolis/SC",
    client: "ACATS",
    type: "Fachada ACM",
    description:
      "A estrutura metálica através da engenharia estrutural atende aos múltiplos padrões exigentes da arquitetura moderna. A Metalgalvano é especialista em executar obras alinhando os mais exigentes padrões. Estrutura metálica para envelopamento do prédio da Associação Catarinense de Supermercados em ACM.",
    highlights: [
      "3.000m² de estrutura metálica com revestimento em ACM 4mm",
      "16.000 kg de estrutura",
    ],
    coverImage: "/images/obra15-acats/acats-4.jpg",
    images: [
      "/images/obra15-acats/acats-1.jpg",
      "/images/obra15-acats/acats-2.jpg",
      "/images/obra15-acats/acats-3.jpg",
      "/images/obra15-acats/acats-4.jpg",
    ],
  },
  {
    slug: "tupy-galpao",
    title: "Galpão Tupy",
    location: "Santa Catarina",
    client: "Tupy",
    type: "Galpão Metálico",
    description:
      "Finalizamos um galpão na Tupy, contendo cobertura, fechamento lateral e dois alpendres. Toda estrutura galvanizada, garantindo mais resistência, qualidade e durabilidade. Cada detalhe do projeto é pensado para oferecer a melhor solução em estruturas metálicas.",
    highlights: [
      "2.077,6m² de estruturas metálicas",
      "1.242m² de cobertura metálica",
      "670m² de fechamento lateral",
      "165,6m² para dois alpendres",
    ],
    coverImage: "/images/obra16-tupy/tupy-1.jpg",
    images: [
      "/images/obra16-tupy/tupy-1.jpg",
      "/images/obra16-tupy/tupy-2.jpg",
      "/images/obra16-tupy/tupy-3.jpg",
    ],
  },
  {
    slug: "agora-tech-park",
    title: "Ágora Tech Park",
    location: "Joinville/SC",
    type: "Estrutura Metálica",
    description:
      "Estamos na etapa final da obra do Ágora Tech Park! Uma área com 4.713,69 m² construídos de estrutura metálica e brises. A Metalgalvano tem grande orgulho em estar participando deste empreendimento.",
    highlights: [
      "4.713,69 m² construídos",
      "Estrutura metálica e brises",
    ],
    coverImage: "/images/obra17-agora-tech-park/agora-tech-park-1.jpg",
    images: [
      "/images/obra17-agora-tech-park/agora-tech-park-1.jpg",
      "/images/obra17-agora-tech-park/agora-tech-park-2.jpg",
      "/images/obra17-agora-tech-park/agora-tech-park-3.jpeg",
      "/images/obra17-agora-tech-park/agora-tech-park-4.jpeg",
      "/images/obra17-agora-tech-park/agora-tech-park-5.jpeg",
    ],
  },
  {
    slug: "almeida-junior-bc",
    title: "Balneário Shopping — Almeida Junior",
    location: "Balneário Camboriú/SC",
    client: "Almeida Junior",
    type: "Estrutura Metálica",
    description:
      "Escada de emergência, mais de 100 toneladas de aço parafusado, entregue em apenas 45 dias. Inclui também 1.770m² de estrutura metálica para revestimento em ACM.",
    highlights: [
      "100+ toneladas de aço parafusado",
      "Entregue em 45 dias",
      "1.770m² de estrutura para ACM",
    ],
    coverImage: "/images/obra18-almeida-junior-bc/almeida-junior-bc-6.jpg",
    images: [
      "/images/obra18-almeida-junior-bc/almeida-junior-bc-1.jpg",
      "/images/obra18-almeida-junior-bc/almeida-junior-bc-2.jpg",
      "/images/obra18-almeida-junior-bc/almeida-junior-bc-3.jpg",
      "/images/obra18-almeida-junior-bc/almeida-junior-bc-4.jpg",
      "/images/obra18-almeida-junior-bc/almeida-junior-bc-5.jpg",
      "/images/obra18-almeida-junior-bc/almeida-junior-bc-6.jpg",
    ],
  },
  {
    slug: "sede-aab-wood",
    title: "Nova Sede AAB Wood",
    location: "Santa Cecília/SC",
    client: "AAB Wood",
    type: "Galpão Metálico",
    description:
      "Estamos fazendo parte desse grande projeto: Nova sede da empresa AAB Wood na cidade de Santa Cecília - SC, o empreendimento conta com mais de 19 mil m² de construção. Temos orgulho de participar, contribuindo para fomentar a economia do nosso estado.",
    highlights: [
      "Mais de 19.000m² de construção",
    ],
    coverImage: "/images/obra19-sede-aab-wood/aab-wood-1.jpg",
    images: [
      "/images/obra19-sede-aab-wood/aab-wood-1.jpg",
      "/images/obra19-sede-aab-wood/aab-wood-2.jpg",
    ],
  },
  {
    slug: "cooperativa-juriti",
    title: "Nova Sede Cooperativa Juriti",
    location: "Massaranduba/SC",
    client: "Cooperativa Juriti",
    type: "Cobertura Metálica",
    description:
      "Nova Sede da Cooperativa Juriti, localizada em Massaranduba, Santa Catarina. O projeto envolve execução de cobertura, fechamentos metálicos e serviços especializados.",
    highlights: [
      "1.600m² de Cobertura Metálica",
      "2.640m² de Fechamento Metálico",
      "50.000 kg de aço galvanizado",
      "Calhas, rufos e pingadeiras",
      "Alpendres metálicos e grelhas",
      "Serviços especiais de solda",
    ],
    coverImage: "/images/obra20-cooperativa-juriti/cooperativa-juriti-1.jpg",
    images: [
      "/images/obra20-cooperativa-juriti/cooperativa-juriti-1.jpg",
      "/images/obra20-cooperativa-juriti/cooperativa-juriti-2.jpg",
      "/images/obra20-cooperativa-juriti/cooperativa-juriti-3.jpg",
    ],
  },
  {
    slug: "arcelor-mittal",
    title: "ArcelorMittal",
    location: "São Francisco do Sul/SC",
    client: "ArcelorMittal",
    type: "Cobertura Metálica",
    description:
      "Uma das maiores multinacionais de aço do mundo, que está presente em mais de 60 países, também conta agora com a qualidade das estruturas metálicas da Metalgalvano.",
    highlights: [
      "Cobertura para restaurante (1.290m², 4 águas)",
      "Telha sanduíche EPS 30mm Pintada Branco Ral 9003",
      "163m² de forro metálico em chapa aluzinco",
      "Cobertura para ponto de ônibus (180m², 1 água)",
      "93m² de fechamento metálico lateral",
      "Peso total da obra: 18.000 Kg",
    ],
    coverImage: "/images/obra21-arcelor-mittal/arcelor-mittal-1.jpg",
    images: [
      "/images/obra21-arcelor-mittal/arcelor-mittal-1.jpg",
      "/images/obra21-arcelor-mittal/arcelor-mittal-2.jpeg",
      "/images/obra21-arcelor-mittal/arcelor-mittal-3.jpeg",
    ],
  },
  {
    slug: "whirlpool",
    title: "Obra Whirlpool",
    location: "Joinville/SC",
    client: "Whirlpool",
    type: "Estrutura Metálica",
    description: "",
    coverImage: "/images/obra22-whirlpool/publiinsta.jpg",
    images: [
      "/images/obra22-whirlpool/publiinsta.jpg",
    ],
  },
  {
    slug: "weg",
    title: "Obra WEG",
    location: "Santa Catarina",
    client: "WEG",
    type: "Estrutura Metálica",
    description: "",
    coverImage: "/images/obra23-weg/0C74D146-DCD7-4143-B3E3-EBF414454720_L0_001-04_05_2023 18_22_11 (1).jpg",
    images: [
      "/images/obra23-weg/0C74D146-DCD7-4143-B3E3-EBF414454720_L0_001-04_05_2023 18_22_11 (1).jpg",
      "/images/obra23-weg/2815909F-C578-4D72-9B52-03734B4C68EB_L0_001-04_05_2023 19_26_09.jpg",
      "/images/obra23-weg/285991B2-27CC-44FF-B338-9E989843D299_L0_001-04_05_2023 18_04_27.jpg",
      "/images/obra23-weg/8AB9A69A-7B5B-4A34-BEB3-1D1B382211C8_L0_001-04_05_2023 19_58_50 (2).jpg",
    ],
  },
];
