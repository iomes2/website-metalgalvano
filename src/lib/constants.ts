export const COMPANY = {
  name: "Metalgalvano",
  fullName: "Metalgalvano Soluções Metálicas",
  tagline: "Estruturas Metálicas e Pré-Moldados",
  description:
    "Projetos, fabricação e montagem de estruturas metálicas e pré-moldados com qualidade e transparência.",
  address: "BR 280, km 26, 6.571 - Araquari/SC",
  cep: "89.245-000",
  phones: ["(47) 3433-4164"],
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
    linkedin: "https://www.linkedin.com/company/metalgalvano/",
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
  { label: "Carreiras", href: "/carreiras" },
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
  { label: "Fachadas Industriais e Comerciais", icon: "Building2" },
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

