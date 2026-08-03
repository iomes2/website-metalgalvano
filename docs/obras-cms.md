# Gerenciamento de obras pelo cliente (CMS)

> **Status:** aprovado, a implementar. Esta é a feature ativa.
> **Objetivo:** o dono da Metalgalvano cria, edita, reordena e despublica obras sozinho,
> incluindo upload de fotos, sem depender de deploy e sem tocar em código.
> **Decisão:** Sanity (conteúdo + imagens) + ISR on-demand no Next.

---

## 1. Ponto de partida

| O que | Onde está hoje |
|---|---|
| Dados das 25 obras | `PORTFOLIO_OBRAS: Obra[]` em `src/lib/constants.ts:151` |
| Tipos de obra (filtro/chip) | `OBRA_TYPES` em `src/lib/constants.ts:127` |
| Fotos | `public/images/obraN-slug/*.jpg` |
| Listagem | `src/app/obras/page.tsx` |
| Detalhe | `src/app/obras/[slug]/page.tsx` (estático via `generateStaticParams`) |
| Home (6 primeiras) | `src/app/page.tsx:277` — `PORTFOLIO_OBRAS.slice(0, 6)` |

Consumidores de `PORTFOLIO_OBRAS` a migrar: **3 arquivos** (`app/page.tsx`,
`app/obras/page.tsx`, `app/obras/[slug]/page.tsx`). Nenhum outro lugar depende dele.

`COMPANY`, `NAV_LINKS`, `SERVICES`, `SEGMENTS`, `STATS`, `CLIENTS` **permanecem** em
`constants.ts` — não fazem parte deste escopo.

---

## 2. Por que Sanity

Alternativas descartadas e o motivo:

- **Git-based (Decap/Tina):** cada edição vira commit + deploy (~2 min de espera para o
  dono) e as fotos engordam o repositório indefinidamente. Já são 25 obras × ~8 fotos.
- **Painel próprio + Supabase:** exigiria escrever CRUD, upload múltiplo, reordenação
  drag-and-drop, crop, auth e preview — semanas de trabalho para reproduzir o que o
  Studio já entrega, e tudo isso vira manutenção nossa para sempre.

Sanity entrega pronto: Studio hospedado dentro do próprio site, upload múltiplo,
reordenação por arrastar, hotspot/crop, CDN de imagem com transformação sob demanda,
histórico de versões (o dono desfaz erro sem nos chamar) e free tier folgado para este
volume.

**Trade-off aceito:** o conteúdo das obras passa a viver em SaaS de terceiro. Mitigação:
o dataset é exportável a qualquer momento (`sanity dataset export`) — ver §9.

---

## 3. Modelo de conteúdo

### 3.1 Documento `obra`

Campos existentes hoje, mais os que faltam para operar de verdade.

| Campo | Tipo Sanity | Obrig. | Notas |
|---|---|:--:|---|
| `title` | `string` | ✅ | máx. ~80 chars |
| `slug` | `slug` | ✅ | gerado do título; **não alterar depois de publicado** (quebra SEO e links) |
| `location` | `string` | ✅ | formato "Cidade/UF" |
| `client` | `string` | — | opcional; aparece no card e na ficha técnica |
| `type` | `reference → obraType` | ✅ | substitui o array `OBRA_TYPES` |
| `description` | `text` (rows: 6) | ✅ | quebras de linha preservadas (`whitespace-pre-line`); os 160 primeiros chars viram `meta description` quando `seo.description` estiver vazio |
| `highlights` | `array<string>` | — | ordenável; **o primeiro item aparece no card da listagem** — avisar isso no `description` do campo |
| `coverImage` | `image` (hotspot) | ✅ | capa do card e do hero da página |
| `images` | `array<image>` (hotspot) | — | galeria; ordenável; a seção só renderiza com 2+ itens (regra atual) |
| `images[].alt` | `string` | ✅* | obrigatório por imagem — hoje o alt é `"Título — Foto N"`, que é ruim para acessibilidade e SEO |
| `status` | `string` (lista) | ✅ | `rascunho` \| `publicado`. Default `rascunho` |
| `featured` | `boolean` | — | força presença no bloco da home |
| `publishedAt` | `datetime` | ✅ | default `now()`; **é o critério de ordenação padrão** (desc) |
| `seo.title` | `string` | — | override do `<title>` |
| `seo.description` | `text` | — | override da meta description |

\* Validação de `alt` obrigatório: aplicar apenas em imagens novas, para não travar a
publicação das 25 migradas. Preencher os alts legados aos poucos.

### 3.2 Documento `obraType`

`{ title: string, slug: slug, order: number }`

Lista inicial (migrada de `OBRA_TYPES`, sem o `"Todos"`, que é opção de UI e não dado):
Galpão Metálico, Cobertura Metálica, Fachada ACM, Estrutura Metálica, Escada Metálica,
Portão Metálico, Guarda Corpo, Mezanino.

Como referência (e não string livre), o dono pode criar um tipo novo sem deploy, e
renomear um tipo atualiza todas as obras de uma vez.

### 3.3 Ordenação

- Listagem `/obras` e home: `publishedAt desc`.
- No Studio, definir `orderings` para o dono conseguir ver por data e por título.
- Sem campo `order` manual: `publishedAt` já resolve, e um campo a mais é mais chance
  de confusão. Se o dono pedir arraste manual depois, adicionamos `orderRank`.

---

## 4. Estrutura de arquivos

```
src/
  sanity/
    env.ts               # lê e valida as env vars, falha cedo e com mensagem clara
    client.ts            # createClient (useCdn em prod, token só no server)
    image.ts             # urlFor() + loader para next/image
    queries.ts           # GROQ centralizado — nenhuma query solta em componente
    types.ts             # tipos derivados das queries
    schemas/
      index.ts
      obra.ts
      obraType.ts
    structure.ts         # organização do menu do Studio (Obras / Tipos)
  app/
    studio/[[...tool]]/page.tsx   # Studio embutido → metalgalvano.com.br/studio
    api/revalidate/route.ts       # webhook do Sanity
scripts/
  migrate-obras.ts       # roda uma vez; ver §6
docs/
  obras-cms.md           # este arquivo
  carreiras-candidaturas.md
```

### Queries GROQ (`queries.ts`)

| Nome | Uso | Filtro |
|---|---|---|
| `obrasListQuery` | `/obras` | `status == "publicado"`, ordenado por `publishedAt desc`, projeção enxuta (sem `images`, sem `description` completa) |
| `obraBySlugQuery` | `/obras/[slug]` | documento completo |
| `obrasSlugsQuery` | `generateStaticParams` | só os slugs publicados |
| `featuredObrasQuery` | home | `featured == true` primeiro, completa até 6 com as mais recentes |

Projeção enxuta na listagem importa: sem ela, cada card puxa o array inteiro de imagens
de 25 obras.

---

## 5. Renderização e cache

**Regra:** só o que está `publicado` aparece no site. Rascunho é invisível para o público.

Fluxo de publicação:

```
Dono edita no /studio → clica Publicar
   → Sanity dispara webhook POST /api/revalidate  (assinado)
   → rota valida a assinatura com SANITY_REVALIDATE_SECRET
   → invalida o cache das páginas de obras
   → site atualizado em segundos, sem deploy
```

⚠️ **A implementar lendo a documentação, não de memória.** Esta é a versão 16.2.12 do
Next e, conforme `AGENTS.md`, as APIs de cache/ISR podem divergir do que se conhece de
versões anteriores. Antes de escrever a rota de revalidação e as tags de cache, ler os
guias em `node_modules/next/dist/docs/` (cache, revalidação, route handlers) e seguir a
convenção daquela versão. Não assumir `revalidateTag`/`unstable_cache` sem confirmar.

A rota `/api/revalidate` deve:
1. rejeitar requisição sem assinatura válida (401);
2. invalidar listagem, home e a página do slug afetado;
3. responder rápido (o Sanity tem timeout curto no webhook);
4. logar falhas — webhook silencioso quebrado é o pior modo de falha aqui.

**Fallback obrigatório:** se o webhook falhar, o conteúdo não pode congelar para sempre.
Definir também uma revalidação por tempo (ex.: 1 h) como rede de segurança.

---

## 6. Migração das 25 obras

Script `scripts/migrate-obras.ts`, rodado **uma única vez**, com token de escrita:

1. Cria os documentos `obraType` a partir de `OBRA_TYPES`.
2. Para cada item de `PORTFOLIO_OBRAS`:
   - sobe cada arquivo de `public/images/...` como asset do Sanity;
   - cria o documento `obra` com `status: "publicado"`, `publishedAt` decrescente
     seguindo a ordem atual do array (preserva a ordem que existe hoje no site);
   - liga `coverImage` ao asset correspondente (dedupe: a mesma foto costuma ser capa
     **e** item da galeria — subir uma vez, referenciar duas);
   - `alt` inicial = `title` (melhorar depois manualmente).
3. Idempotência: usar `_id` derivado do slug (`obra-${slug}`) e `createOrReplace`, para
   poder rodar de novo sem duplicar se algo falhar no meio.
4. Imprimir um relatório: obras criadas, assets subidos, arquivos não encontrados.

### Ordem de corte (importante)

`PORTFOLIO_OBRAS` e as fotos em `public/images/` **só saem do repositório depois** de:
- o script rodar sem erro,
- o dono conferir as 25 obras no Studio,
- as três páginas já lendo do Sanity em produção e validadas.

Até lá, o array fica intocado no `constants.ts`. Migração não pode ser a etapa em que se
perde conteúdo.

Após o corte: remover `PORTFOLIO_OBRAS`, `OBRA_TYPES` e a interface `Obra` de
`constants.ts`, e apagar `public/images/obra*/`. Guardar o backup do dataset (§9) antes.

---

## 7. Acesso do dono

- Studio em `metalgalvano.com.br/studio`, com login por e-mail/Google gerenciado pelo
  Sanity. Sem senha compartilhada, sem usuário genérico.
- Convidar nominalmente quem publica. Papel `editor` — não `administrator` — para o
  pessoal da empresa; assim ninguém apaga o dataset por engano.
- `/studio` deve ficar fora do `sitemap` e com `robots: noindex`.

---

## 8. Plano de execução

| # | Etapa | Entregável | Pronto quando |
|---|---|---|---|
| 1 | Projeto Sanity + env vars | conta, dataset `production`, `.env.example` atualizado | `sanity` conecta local |
| 2 | Schemas `obra` + `obraType` | `src/sanity/schemas/*` | schemas validam |
| 3 | Studio embutido | `/studio` acessível e logando | dono consegue entrar |
| 4 | Script de migração | `scripts/migrate-obras.ts` | 25 obras + fotos no Studio, conferidas |
| 5 | Queries + leitura nas 3 páginas | `queries.ts`, `app/page.tsx`, `app/obras/*` | site idêntico ao atual, lendo do Sanity |
| 6 | Webhook de revalidação | `/api/revalidate` | publicar no Studio reflete no site em <30 s |
| 7 | Limpeza | `constants.ts` enxuto, `public/images/obra*` removido | build passa, nenhuma imagem quebrada |
| 8 | Treinamento | passo a passo curto para o dono (§10) | dono publica uma obra sozinho |

Etapas 1–3 e 5 são independentes de conteúdo real; 4 é o ponto de não-retorno.

---

## 9. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Webhook falha e o site congela | revalidação por tempo como fallback (§5) + log de erro |
| Dono altera o slug de obra publicada | `readOnly` no campo após a primeira publicação, ou aviso explícito no schema |
| Dono publica obra sem capa | `validation: required` em `coverImage`; a página quebra sem ela |
| Dependência de SaaS / conta perdida | `sanity dataset export` mensal versionado fora do Sanity; mais de um admin na conta |
| Free tier estourado (banda de imagem) | monitorar; imagens servidas via `next/image` com `sizes` corretos já reduzem muito |
| Migração perde fotos | ordem de corte da §6 — nada é apagado antes da conferência |

---

## 10. O que o dono precisa saber (roteiro do treinamento)

1. Entrar em `metalgalvano.com.br/studio`.
2. **Obras → criar nova.** Título, local, tipo, descrição.
3. Capa e galeria: arrastar fotos; a ordem das fotos é a ordem que aparece no site.
4. **Destaques:** o primeiro destaque é o que aparece no card da listagem.
5. Deixar em **rascunho** enquanto monta; **publicar** quando estiver pronto.
6. Publicou = está no ar em segundos. Errou = editar e publicar de novo, ou usar o
   histórico para voltar à versão anterior.
7. Para tirar do ar sem apagar: voltar o status para rascunho.

---

## 11. Variáveis de ambiente

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=        # server-only, para preview de rascunhos
SANITY_API_WRITE_TOKEN=       # NUNCA em produção; só local, para o script de migração
SANITY_REVALIDATE_SECRET=     # valida o webhook
```

Acrescentar ao `.env.example` (sem valores) junto da etapa 1.

---

## 12. Fora de escopo (não fazer agora)

- Filtro por tipo na página `/obras` (o `"Todos"` de `OBRA_TYPES` sugere que já foi
  pensado, mas hoje não existe filtro na UI) — decidir depois, é feature separada.
- Blog em `src/app/blog` — mesma stack serviria, mas é outra entrega.
- Páginas de soluções gerenciáveis — hoje são código e podem continuar assim.
- Candidaturas de carreiras — ver `docs/carreiras-candidaturas.md`, aguardando
  aprovação da empresa.
