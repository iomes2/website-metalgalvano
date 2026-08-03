# Gerenciamento de obras pelo cliente (CMS)

> **Status:** ✅ implementado e verificado em build de produção local.
> Falta apenas configurar o webhook no Sanity após o deploy (§8.1).
> **Objetivo:** o dono da Metalgalvano cria, edita, reordena e despublica obras sozinho,
> incluindo upload de fotos, sem depender de deploy e sem tocar em código.
> **Decisão:** Sanity (conteúdo + imagens) + ISR on-demand no Next.

---

## 1. Ponto de partida

| O que | Onde está hoje |
|---|---|
| Dados das 24 obras | `PORTFOLIO_OBRAS: Obra[]` em `src/lib/constants.ts:151` |
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
  dono) e as fotos engordam o repositório indefinidamente. Já são 24 obras × ~8 fotos.
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
publicação das 24 migradas. Preencher os alts legados aos poucos.

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
    fetch.ts             # busca com cache (fetch global; ver §5)
    image.ts             # urlFor()/imageUrl() para next/image
    queries.ts           # GROQ centralizado — nenhuma query solta em componente
    types.ts             # formatos devolvidos pelas queries
    schemas/
      index.ts
      obra.ts
      obraType.ts
    structure.ts         # organização do menu do Studio (Obras / Tipos)
  app/
    studio/layout.tsx             # metadata/viewport (robots: noindex)
    studio/[[...tool]]/page.tsx   # Studio embutido → metalgalvano.com.br/studio
    api/revalidate/route.ts       # webhook do Sanity
    (site)/                       # páginas públicas, com Header/Footer/WhatsApp
scripts/
  migrate-obras.ts       # roda uma vez; ver §6
  legacy-obras.ts        # dados antigos, só para o script acima
docs/
  obras-cms.md           # este arquivo
  carreiras-candidaturas.md
```

**Route group `(site)`:** foi preciso separar as páginas públicas do Studio, porque
`Header`, `Footer` e `WhatsAppButton` estavam no layout raiz e apareceriam por cima do
painel. As URLs não mudaram — nome de pasta entre parênteses não entra na rota.

**O `page.tsx` do Studio é Client Component**, ao contrário do que a documentação oficial
do Sanity mostra. Como Server Component, o `sanity.config` entra no grafo do servidor e o
Turbopack resolve o `swr` pela condição `react-server`, cujo build não tem export default
— o build quebra. O motivo está comentado no próprio arquivo; não "corrigir" de volta.

### Queries GROQ (`queries.ts`)

| Nome | Uso | Filtro |
|---|---|---|
| `obrasListQuery` | `/obras` | `status == "publicado"`, ordenado por `publishedAt desc`, projeção enxuta (sem `images`, sem `description` completa) |
| `obraBySlugQuery` | `/obras/[slug]` | documento completo |
| `obrasSlugsQuery` | `generateStaticParams` | só os slugs publicados |
| `featuredObrasQuery` | home | `featured == true` primeiro, completa até 6 com as mais recentes |

Projeção enxuta na listagem importa: sem ela, cada card puxa o array inteiro de imagens
de 24 obras.

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

### Como ficou de fato (achados da implementação)

**1. `revalidateTag` não serve aqui — usamos `revalidatePath`.**
A abordagem planejada (marcar as buscas com uma tag e invalidar a tag no webhook) foi
implementada e **não funcionou**: as páginas já pré-geradas continuavam servindo
conteúdo antigo, verificado em build de produção. Trocado por `revalidatePath` nas três
rotas afetadas, que funciona — a home refletiu a mudança já na primeira visita após o
webhook. As tags foram removidas do código para não sugerirem um mecanismo inativo.

```ts
revalidatePath("/");
revalidatePath("/obras");
revalidatePath("/obras/[slug]", "page"); // padrão de rota exige o 2º argumento
```

**2. As buscas usam `fetch` global, não `@sanity/client`.**
O cliente oficial encapsula a requisição de um jeito que o Next não enxerga, e o
resultado é o mesmo problema acima. `src/sanity/fetch.ts` monta a URL da API do Sanity e
chama o `fetch` do Next diretamente. Por isso não existe `src/sanity/client.ts`.

**3. Cuidado com o cache entre builds.**
O cache de dados do Next sobrevive em `.next/cache`. Um build feito logo após uma edição
pode sair com conteúdo de até 1 h atrás — foi observado durante os testes. O webhook
corrige na sequência; para forçar num build, apagar `.next`.

A rota `/api/revalidate`:
1. rejeita requisição sem assinatura válida (401) — testado;
2. invalida home, listagem e páginas de obra;
3. responde rápido (o Sanity tem timeout curto no webhook);
4. loga falhas — webhook quebrado em silêncio é o pior modo de falha aqui.

**Rede de segurança:** as buscas usam `revalidate: 3600`. Se o webhook falhar, o conteúdo
se atualiza sozinho em até 1 hora em vez de congelar.

---

## 6. Migração das 24 obras

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
- o dono conferir as 24 obras no Studio,
- as três páginas já lendo do Sanity em produção e validadas.

Até lá, o array fica intocado no `constants.ts`. Migração não pode ser a etapa em que se
perde conteúdo.

### Como ficou de fato

- `PORTFOLIO_OBRAS`, `OBRA_TYPES` e a interface `Obra` saíram de `constants.ts`
  (616 → 126 linhas). **Não foram apagados:** foram movidos para
  `scripts/legacy-obras.ts`, que só o script de migração usa. Assim o script continua
  rodando e fica registrado de onde veio o conteúdo do painel.
- ⚠️ **`public/images/obra*/` NÃO pode ser apagado.** O plano original previa isso, mas
  as páginas de soluções (`/solucoes`, `/solucoes/brise`,
  `/solucoes/estruturas-metalicas` e outras) usam **17** dessas mesmas fotos por caminho
  fixo. Apagá-las quebraria essas páginas. Migrar as soluções para o Sanity é outra
  entrega; até lá, as pastas ficam.

---

## 7. Acesso do dono

- Studio em `metalgalvano.com.br/studio`, com login por e-mail/Google gerenciado pelo
  Sanity. Sem senha compartilhada, sem usuário genérico.
- Convidar nominalmente quem publica.
- `/studio` fica fora do `sitemap` e com `robots: noindex` (o `metadata` exportado pelo
  `next-sanity/studio` já faz isso).

⚠️ **Limitação do plano Free:** só existem os papéis **Administrator** e **Viewer** —
não há papel "Editor". Quem precisa publicar tem de ser Administrator, o que significa
poder para apagar o dataset. A proteção, portanto, **não é o papel**: é o backup
periódico (§9) e ter mais de um Administrator na conta.

## 7.1 Custos

Projeto criado em `2026-08-04` com 30 dias de trial do plano Growth. Ao fim do trial o
projeto **continua funcionando**, revertendo aos limites do plano **Free** (gratuito,
sem prazo). As features do Growth que se perdem — datasets privados, comentários,
agendamento de publicação, AI Assist, papéis granulares — **não são usadas por esta
arquitetura**, com a única exceção dos papéis (ver aviso acima).

Folga nos limites do Free para este projeto:

| Limite do Free | Uso previsto |
|---|---|
| 10.000 documentos | 24 obras + 8 tipos = 33 |
| 100 GB de assets | ~200 fotos, 1–2 GB |
| 100 GB de banda/mês | site institucional |
| 1M requisições CDN/mês | milhares, com o cache do Next na frente |
| 2 datasets públicos | 1 (`production`) |
| 2 webhooks | 1 (revalidação) |
| 20 usuários | 2–3 |

Dataset **público** foi escolha deliberada e é o que o Free permite: o conteúdo é um
portfólio destinado a um site aberto, e assim a leitura dispensa token em produção.

---

## 8. Plano de execução

| # | Etapa | Status | Verificado por |
|---|---|:--:|---|
| 1 | Projeto Sanity + env vars | ✅ | Studio conecta; projeto `1wyt7tu5`, dataset `production` |
| 2 | Schemas `obra` + `obraType` | ✅ | campos e textos de ajuda conferidos na tela |
| 3 | Studio embutido em `/studio` | ✅ | login e edição funcionando |
| 4 | Migração das 24 obras | ✅ | 24 obras, 8 tipos, 91 fotos, 0 links quebrados |
| 5 | Páginas lendo do Sanity | ✅ | `/obras` 24 cards, home 6, 0 refs às fotos antigas |
| 6 | Webhook de revalidação | ✅ | 401 sem assinatura; com assinatura, home atualiza na 1ª visita |
| 7 | Limpeza do `constants.ts` | ✅ | 616 → 126 linhas; build de produção passa |
| 8 | Configurar o webhook no Sanity | ⬜ | **depende do deploy** — ver §8.1 |
| 9 | Treinamento do dono | ⬜ | dono publica uma obra sozinho |

### 8.1 Pendente: ligar o webhook em produção

Enquanto isso não for feito, publicar no Studio **não** atualiza o site na hora — só
depois de 1 hora (a rede de segurança). O webhook não pode ser testado em `localhost`
porque o Sanity precisa de uma URL pública.

Depois do deploy, em sanity.io/manage → **API → Webhooks → Create webhook**:

| Campo | Valor |
|---|---|
| URL | `https://www.metalgalvano.com.br/api/revalidate` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type == "obra" \|\| _type == "obraType"` |
| HTTP method | POST |
| API version | `v2025-02-19` |
| Secret | o mesmo valor de `SANITY_REVALIDATE_SECRET` |

As 4 variáveis de ambiente (§11) também precisam ser configuradas no host —
**menos** `SANITY_API_WRITE_TOKEN`, que é só local.

---

## 9. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Webhook falha e o site congela | revalidação por tempo como fallback (§5) + log de erro |
| Dono altera o slug de obra publicada | `readOnly` no campo após a primeira publicação, ou aviso explícito no schema |
| Dono publica obra sem capa | `validation: required` em `coverImage`; a página quebra sem ela |
| Dependência de SaaS / conta perdida | `sanity dataset export` mensal versionado fora do Sanity; mais de um admin na conta |
| Dono é Administrator e pode apagar o dataset (limitação do Free, §7) | backup por export é a única rede real — agendar e conferir |
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
