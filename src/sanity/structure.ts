import type { StructureResolver } from "sanity/structure";

/**
 * Menu do Studio. Separa publicadas de rascunhos para o dono enxergar de
 * imediato o que está no ar e o que ficou pela metade.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Metalgalvano")
    .items([
      S.listItem()
        .title("Obras publicadas")
        .child(
          S.documentList()
            .title("Obras publicadas")
            .filter('_type == "obra" && status == "publicado"')
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Rascunhos (fora do ar)")
        .child(
          S.documentList()
            .title("Rascunhos")
            .filter('_type == "obra" && status != "publicado"')
            .defaultOrdering([{ field: "_updatedAt", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Todas as obras")
        .child(
          S.documentTypeList("obra")
            .title("Todas as obras")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.documentTypeListItem("obraType").title("Tipos de obra"),
    ]);
