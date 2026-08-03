"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  MessageCircle,
  TriangleAlert,
  Upload,
  X,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx";

const AREAS = [
  "Solda e Caldeiraria",
  "Montagem em Obra",
  "Produção e Serralheria",
  "Engenharia e Projetos",
  "Administrativo e Comercial",
  "Logística e Expedição",
  "Outra área",
];

const EXPERIENCIA = [
  "Sem experiência na área",
  "Até 1 ano",
  "De 1 a 3 anos",
  "De 3 a 5 anos",
  "Mais de 5 anos",
];

const ESCOLARIDADE = [
  "Ensino fundamental",
  "Ensino médio",
  "Curso técnico",
  "Ensino superior",
];

const DISPONIBILIDADE = [
  "Início imediato",
  "Obras fora da cidade",
  "Trabalho em altura",
  "Hora extra",
  "Possuo CNH",
];

/** Rótulo numerado que abre cada bloco do formulário */
function Legend({ step, children }: { step: number; children: string }) {
  return (
    <legend className="flex items-center gap-3 mb-6 w-full">
      <span
        aria-hidden
        className="font-heading text-xs font-semibold tabular-nums text-accent"
      >
        {String(step).padStart(2, "0")}
      </span>
      <span className="font-heading text-sm font-semibold uppercase tracking-widest text-foreground">
        {children}
      </span>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </legend>
  );
}

const fieldClass =
  "w-full px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

const labelClass = "block text-sm font-medium text-foreground mb-2";

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

type Status = "idle" | "enviando" | "sucesso" | "erro";

export function CurriculoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [erro, setErro] = useState("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    if (selected && selected.size > MAX_FILE_BYTES) {
      setErro("O arquivo passa de 5 MB. Envie uma versão mais leve.");
      setStatus("erro");
      event.target.value = "";
      setFile(null);
      return;
    }
    setErro("");
    setStatus("idle");
    setFile(selected);
  }

  function limparArquivo() {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setErro("Anexe o arquivo do seu currículo.");
      setStatus("erro");
      return;
    }

    setStatus("enviando");
    setErro("");

    try {
      const response = await fetch("/api/candidatura", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErro(data.error || "Não conseguimos enviar sua candidatura.");
        setStatus("erro");
        return;
      }

      formRef.current?.reset();
      limparArquivo();
      setStatus("sucesso");
    } catch {
      setErro(
        "Falha de conexão ao enviar. Confira sua internet e tente de novo."
      );
      setStatus("erro");
    }
  }

  if (status === "sucesso") {
    return (
      <div className="bg-surface rounded-2xl border border-border p-8 sm:p-12 text-center">
        <CheckCircle2
          aria-hidden
          className="w-14 h-14 text-accent mx-auto mb-6"
          strokeWidth={1.5}
        />
        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
          Candidatura enviada!
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
          Recebemos seu currículo e ele já está com o nosso RH. Se o perfil
          combinar com alguma vaga, entramos em contato pelo telefone que você
          informou.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-accent font-heading font-medium text-sm hover:text-accent-hover transition-colors cursor-pointer"
        >
          Enviar outra candidatura
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-border p-8 sm:p-10">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
        <fieldset>
          <Legend step={1}>Seus dados</Legend>
          <div className="space-y-6">
            <div>
              <label htmlFor="nome" className={labelClass}>
                Nome completo *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                autoComplete="name"
                className={fieldClass}
                placeholder="Seu nome"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="telefone" className={labelClass}>
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  required
                  autoComplete="tel"
                  className={fieldClass}
                  placeholder="(47) 99999-9999"
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className={fieldClass}
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="cidade" className={labelClass}>
                Cidade onde mora *
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                required
                className={fieldClass}
                placeholder="Araquari, Joinville, Barra Velha..."
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <Legend step={2}>Perfil profissional</Legend>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="area" className={labelClass}>
                  Área de interesse *
                </label>
                <select
                  id="area"
                  name="area"
                  required
                  defaultValue=""
                  className={`${fieldClass} cursor-pointer`}
                >
                  <option value="" disabled>
                    Selecione uma área
                  </option>
                  {AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cargo" className={labelClass}>
                  Cargo desejado
                </label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  className={fieldClass}
                  placeholder="Soldador, montador, projetista..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="experiencia" className={labelClass}>
                  Experiência na área
                </label>
                <select
                  id="experiencia"
                  name="experiencia"
                  defaultValue=""
                  className={`${fieldClass} cursor-pointer`}
                >
                  <option value="">Selecione</option>
                  {EXPERIENCIA.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="escolaridade" className={labelClass}>
                  Escolaridade
                </label>
                <select
                  id="escolaridade"
                  name="escolaridade"
                  defaultValue=""
                  className={`${fieldClass} cursor-pointer`}
                >
                  <option value="">Selecione</option>
                  {ESCOLARIDADE.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="cursos" className={labelClass}>
                Cursos e certificações
              </label>
              <input
                type="text"
                id="cursos"
                name="cursos"
                className={fieldClass}
                placeholder="NR-35, NR-10, solda MIG, AutoCAD..."
              />
            </div>

            <div>
              <span className={labelClass}>Disponibilidade</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISPONIBILIDADE.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 bg-white border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary/40 transition-colors has-checked:border-accent has-checked:bg-accent/5"
                  >
                    <input
                      type="checkbox"
                      name="disponibilidade"
                      value={item}
                      className="w-4 h-4 accent-accent cursor-pointer"
                    />
                    <span className="text-sm text-foreground">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <Legend step={3}>Currículo</Legend>
          <div>
            <div>
              <span className={labelClass}>Arquivo do currículo *</span>

              {file ? (
                <div className="flex items-center gap-4 bg-white border border-accent/40 rounded-xl p-4">
                  <FileText
                    aria-hidden
                    className="w-8 h-8 text-accent shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={limparArquivo}
                    aria-label="Remover arquivo"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="curriculo"
                  className="flex flex-col items-center justify-center gap-2 bg-white border-2 border-dashed border-border rounded-xl px-6 py-10 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors focus-within:ring-2 focus-within:ring-primary/30"
                >
                  <Upload
                    aria-hidden
                    className="w-8 h-8 text-accent mb-1"
                    strokeWidth={1.5}
                  />
                  <span className="font-heading font-semibold text-foreground text-sm">
                    Escolher arquivo
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF, DOC ou DOCX — até 5 MB
                  </span>
                </label>
              )}

              <input
                ref={fileInputRef}
                type="file"
                id="curriculo"
                name="curriculo"
                accept={ACCEPT}
                required
                onChange={handleFileChange}
                className="sr-only"
              />
            </div>
          </div>
        </fieldset>

        <div className="border-t border-border pt-8">
          {status === "erro" && (
            <div
              role="alert"
              className="flex items-start gap-3 mb-6 text-sm bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <TriangleAlert
                aria-hidden
                className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
              />
              <div className="text-foreground">
                <p>{erro}</p>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.rh.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 font-medium text-accent hover:text-accent-hover transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar com o RH pelo WhatsApp
                </a>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "enviando"}
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-heading font-semibold transition-colors cursor-pointer w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {status === "enviando" ? (
              <>
                <Loader2 aria-hidden className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar candidatura
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground mt-4">
            Seus dados são usados apenas no processo seletivo da Metalgalvano.
          </p>
        </div>
      </form>
    </div>
  );
}
