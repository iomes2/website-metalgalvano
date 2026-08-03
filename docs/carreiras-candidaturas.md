# Recebimento de currículos — página /carreiras

> **Status:** ⏸️ **em espera.** Aguardando a empresa aprovar a aba Carreiras.
> Não implementar antes do aval. A feature ativa é `docs/obras-cms.md`.
> **Decisão registrada:** Supabase (Postgres + Storage) para persistir, Resend para
> notificar o RH.

---

## 1. O que já existe

A página e o formulário **já estão no ar e funcionando**:

| Peça | Arquivo |
|---|---|
| Página | `src/app/carreiras/page.tsx` |
| Formulário (client) | `src/components/CurriculoForm.tsx` |
| Recebimento | `src/app/api/candidatura/route.ts` |
| Config | `.env.example` — `RESEND_API_KEY`, `RH_EMAIL_TO`, `RH_EMAIL_FROM` |

Fluxo atual: `multipart/form-data` → Route Handler valida → converte o anexo em base64
→ Resend envia e-mail com o currículo anexado para `RH_EMAIL_TO`. Sem as env vars,
responde **503** com orientação para o WhatsApp do RH — esse fallback é bom e fica.

Campos coletados hoje: nome, telefone, e-mail, cidade, área, cargo, experiência,
escolaridade, cursos, disponibilidade (múltipla) e o arquivo do currículo
(`.pdf/.doc/.docx`, até 5 MB).

---

## 2. Problemas do fluxo atual

Estes são os motivos de a feature existir — não é reescrita por gosto.

1. **⚠️ Limite de corpo da requisição.** O arquivo trafega até a serverless function e
   vira base64 (+33%). Um PDF de 5 MB vira ~6,7 MB, acima do limite de ~4,5 MB de body
   de function na Vercel. Currículos grandes falham — e falham com erro genérico, do
   ponto de vista do candidato. *Este é o bug real de produção hoje.*
2. **Nenhuma persistência.** A candidatura existe apenas como e-mail. Caiu em spam,
   foi apagada por engano ou o RH trocou de pessoa → sumiu. Não há banco de talentos,
   não há como rever quem se candidatou mês passado.
3. **Sem antispam.** Endpoint público que aceita upload é alvo de bot.
4. **Sem consentimento LGPD nem retenção.** Coleta-se nome, telefone, e-mail, cidade e
   currículo (que costuma trazer RG, CPF, endereço) sem consentimento registrado e sem
   prazo de descarte.
5. **Sem `alt`/rastro de status.** O RH não tem onde marcar "já analisei este".

---

## 3. Arquitetura proposta

```
Browser                             Servidor                    Destino
──────────────────────────────────────────────────────────────────────────────
1. valida tipo e tamanho local
2. POST /api/candidatura/upload  → gera signed upload URL  →  Supabase Storage
3. PUT do arquivo direto ────────────────────────────────────→ bucket privado
4. POST /api/candidatura           valida campos
   { campos..., curriculoPath }    honeypot + tempo mínimo
                                   rate limit por IP
                                 → INSERT                   →  Postgres
                                 → e-mail de notificação    →  Resend → RH
                                    (link assinado, sem anexo)
```

**Por que upload direto ao storage:** tira o arquivo do caminho da function, mata o
problema nº 1 de vez e permite subir o limite para 10 MB.

**Por que link em vez de anexo no e-mail:** e-mail com anexo pesado é bloqueado por
alguns servidores, e o anexo duplica o dado. O link assinado (validade de 7 dias) é
mais leve e o arquivo permanece disponível no banco depois.

### Três destinos, papéis distintos

| Destino | Guarda | Serve para |
|---|---|---|
| Supabase Storage (bucket privado `curriculos`) | o PDF | o arquivo em si, sem URL pública |
| Postgres (`candidaturas`) | os campos + caminho do arquivo + status | banco de talentos, consulta, triagem |
| E-mail para `RH_EMAIL_TO` | notificação | o gatilho do dia a dia do RH |

O RH consulta a lista pela própria interface do Supabase (Table Editor) — não vamos
construir painel `/admin` nesta primeira fase.

---

## 4. Modelo de dados

```sql
create table candidaturas (
  id              uuid primary key default gen_random_uuid(),
  criado_em       timestamptz not null default now(),
  nome            text not null,
  telefone        text not null,
  email           text,
  cidade          text not null,
  area            text not null,
  cargo           text,
  experiencia     text,
  escolaridade    text,
  cursos          text,
  disponibilidade text[],
  curriculo_path  text not null,          -- chave no bucket, nunca URL pública
  consentido_em   timestamptz not null,
  status          text not null default 'nova',  -- nova | em_analise | arquivada
  ip_hash         text                     -- hash, não o IP puro (minimização LGPD)
);

alter table candidaturas enable row level security;
-- Intencionalmente SEM policy pública: só a service_role (servidor) lê e escreve.
-- A anon key que vai ao browser não consegue ler currículo de ninguém.
```

Bucket `curriculos`: **privado**, caminho `candidaturas/{ano}/{mes}/{uuid}-{slug-nome}.pdf`.
Nome de arquivo sanitizado — nunca usar o nome original cru como chave.

---

## 5. Endurecimento do formulário

| Medida | Como |
|---|---|
| Honeypot | campo oculto que humano não preenche; preenchido → responde 200 e descarta |
| Tempo mínimo | timestamp no render; envio em <3 s → rejeita |
| Rate limit | 3 envios/hora por `ip_hash` |
| Sem captcha | decisão consciente: não atrapalhar candidato de obra no celular |
| Limite de arquivo | sobe de 5 MB para 10 MB (possível após o upload direto) |
| Tipos aceitos | mantém `.pdf/.doc/.docx`, validando também o content-type no servidor |
| Fallback WhatsApp | mantém o 503 atual quando faltar configuração |

---

## 6. LGPD

Obrigatório, não opcional — o formulário coleta dado pessoal sensível por natureza.

- **Checkbox de consentimento obrigatório**, com finalidade e prazo explícitos:
  "Autorizo a Metalgalvano a armazenar meus dados e currículo por 12 meses para fins de
  processos seletivos."
- Gravar `consentido_em`. Sem checkbox marcado, o servidor recusa.
- **Retenção:** rotina mensal que apaga candidaturas com mais de 12 meses (linha **e**
  arquivo no storage).
- Link para a política de privacidade ao lado do checkbox, com o contato do controlador.
- Armazenar `ip_hash`, não o IP — minimização de dados.

---

## 7. Plano de execução (quando aprovado)

| # | Etapa | Pronto quando |
|---|---|---|
| 1 | Projeto Supabase, tabela, bucket privado, RLS | `select` com anon key retorna vazio/erro |
| 2 | `POST /api/candidatura/upload` (signed URL) | arquivo sobe direto do browser |
| 3 | Reescrita de `api/candidatura/route.ts`: insert + e-mail com link | linha no banco + e-mail chegando |
| 4 | `CurriculoForm.tsx`: upload em duas etapas, barra de progresso, novo limite | envio de 8 MB funciona |
| 5 | Honeypot, tempo mínimo, rate limit | bot simples é barrado |
| 6 | Checkbox LGPD + texto + política | envio sem consentimento é recusado |
| 7 | Rotina de retenção 12 meses | job agendado e testado |
| 8 | Treinar o RH no Table Editor | RH consulta e muda status sozinho |

Etapas 1–4 resolvem o bug de produção; 5–7 são conformidade e higiene.

---

## 8. Variáveis de ambiente a acrescentar

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server-only: insert e geração de signed URL
```

As três atuais do Resend continuam válidas e necessárias.

---

## 9. Decisões registradas

- **Candidatura não vai para o Sanity.** Dado pessoal não entra em SaaS de conteúdo, e o
  Sanity não é ferramenta de triagem. Os dois sistemas ficam independentes.
- **Sem painel `/admin` na primeira fase.** O Table Editor do Supabase resolve. Se o RH
  pedir uma tela própria depois, é entrega separada.
- **Sem integração com ATS.** Fora de escopo até haver volume que justifique.

---

## 10. Referência cruzada

- Gerenciamento de obras (feature ativa): `docs/obras-cms.md`
- Contatos oficiais (WhatsApp do RH usado no fallback): `COMPANY.whatsapp.rh` em
  `src/lib/constants.ts`
