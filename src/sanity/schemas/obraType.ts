import { defineField, defineType } from "sanity";

/**
 * Tipo de obra (o chip que aparece no card e na ficha técnica).
 * Vira documento — assim o dono cria um tipo novo sem depender de deploy,
 * e renomear um tipo atualiza todas as obras de uma vez.
 */
export const obraType = defineType({
  name: "obraType",
  title: "Tipo de obra",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "slug",
      title: "Identificador",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      description: "Menor número aparece primeiro nas listas de tipo.",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
