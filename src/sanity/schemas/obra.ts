import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Uma obra do portfólio. Espelha todos os campos que a página
 * `/obras/[slug]` renderiza hoje, mais status, destaque e SEO.
 */
export const obra = defineType({
  name: "obra",
  title: "Obra",
  type: "document",
  groups: [
    { name: "conteudo", title: "Conteúdo", default: true },
    { name: "midia", title: "Fotos" },
    { name: "publicacao", title: "Publicação" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "conteudo",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Endereço da página",
      type: "slug",
      group: "conteudo",
      description:
        "É o final do endereço da obra no site. Ex.: “tupy-galpao” vira metalgalvano.com.br/obras/tupy-galpao. É preenchido sozinho a partir do título. Depois que a obra é publicada ele trava: mudar quebraria o link de quem já salvou ou compartilhou a página, e faria a obra perder a posição que conquistou no Google.",
      options: { source: "title", maxLength: 96 },
      // Trava o slug assim que a obra está publicada.
      readOnly: ({ value, document }) =>
        Boolean(value) && document?.status === "publicado",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Localização",
      type: "string",
      group: "conteudo",
      description: 'Formato "Cidade/UF". Ex.: Joinville/SC',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Cliente",
      type: "string",
      group: "conteudo",
      description: "Opcional. Aparece no card e na ficha técnica.",
    }),
    defineField({
      name: "type",
      title: "Tipo de obra",
      type: "reference",
      group: "conteudo",
      to: [{ type: "obraType" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 8,
      group: "conteudo",
      description:
        "Texto da seção “Sobre esta obra”. Quebras de linha são preservadas. Os primeiros 160 caracteres viram a descrição no Google, a menos que você preencha a aba SEO.",
      validation: (rule) => rule.required().min(40),
    }),
    defineField({
      name: "highlights",
      title: "Destaques",
      type: "array",
      group: "conteudo",
      description:
        "Números e diferenciais da obra. Ex.: “3.200m² de estrutura metálica”. O ideal são de 3 a 5 destaques — com muitos, a lista deixa de chamar atenção. O máximo permitido é 8. ⚠️ O primeiro da lista é o único que aparece no card da listagem de obras; arraste para reordenar e escolher qual será.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),

    defineField({
      name: "coverImage",
      title: "Foto de capa",
      type: "image",
      group: "midia",
      description:
        "A foto que representa a obra. Aparece em três lugares: no card da página Obras, como imagem grande no topo da página desta obra, e na página inicial caso a obra esteja destacada. Escolha a mais impactante.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Descrição da imagem",
          type: "string",
          description:
            "Descreva em poucas palavras o que aparece na foto. Ex.: “Galpão metálico visto de fora”. Serve para duas coisas: acessibilidade, porque é esse texto que uma pessoa cega ouve no lugar da imagem; e busca, porque é por ele que a foto pode aparecer na pesquisa de imagens do Google.",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Galeria de fotos",
      type: "array",
      group: "midia",
      description:
        "Fotos que aparecem na seção “Galeria de Fotos”, dentro da página desta obra. A ordem aqui é a ordem que sai no site — arraste para reordenar. Com menos de 2 fotos a galeria não é exibida.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Descrição da imagem",
              type: "string",
              description:
                "O que aparece nesta foto, em poucas palavras. É o texto que uma pessoa cega ouve no lugar da imagem, e é por ele que a foto pode aparecer na pesquisa de imagens do Google.",
              // Aviso, não erro: as 24 obras migradas entram sem alt individual
              // e não podem ficar impedidas de publicar por causa disso.
              validation: (rule) =>
                rule.warning("Descreva a foto — ajuda na acessibilidade e na busca do Google."),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "publicacao",
      description:
        "Só obras “Publicada” aparecem no site. Use “Rascunho” para montar com calma ou tirar do ar sem apagar.",
      options: {
        list: [
          { title: "Rascunho", value: "rascunho" },
          { title: "Publicada", value: "publicado" },
        ],
        layout: "radio",
      },
      initialValue: "rascunho",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      group: "publicacao",
      description: "Define a ordem no site — a mais recente aparece primeiro.",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Destacar na página inicial",
      type: "boolean",
      group: "publicacao",
      description:
        "Coloca esta obra na seção “Obras realizadas” da página inicial (o bloco Portfólio). Essa seção mostra 6 obras, sempre — não importa quantas você marcar. As marcadas entram primeiro, da mais recente para a mais antiga, e o que sobrar de espaço é completado automaticamente com as obras mais recentes. Se marcar mais de 6, as excedentes não aparecem lá (mas continuam normalmente na página Obras).",
      initialValue: false,
    }),

    defineField({
      name: "seoTitle",
      title: "Título para o Google",
      type: "string",
      group: "seo",
      description:
        "É o título azul que aparece no resultado do Google quando alguém pesquisa. Serve para incluir os termos que as pessoas realmente digitam — ex.: “Galpão metálico em Araquari/SC”. Deixe vazio para usar o título da obra. Máximo de 60 caracteres: acima disso o Google corta.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "Descrição para o Google",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "É o textinho cinza que aparece embaixo do título no resultado do Google. É o que convence a pessoa a clicar. Deixe vazio para usar o começo da descrição da obra. Máximo de 160 caracteres: acima disso o Google corta.",
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Mais recentes",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Título (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      status: "status",
      media: "coverImage",
    },
    prepare({ title, location, status, media }) {
      return {
        title,
        subtitle:
          status === "publicado"
            ? location
            : `${location} — RASCUNHO (fora do ar)`,
        media,
      };
    },
  },
});
