import { COMPANY } from "@/lib/constants";

/** Limite do arquivo de currículo aceito no formulário */
export const MAX_FILE_BYTES = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const FIELD_LABELS: Record<string, string> = {
  nome: "Nome completo",
  telefone: "Telefone / WhatsApp",
  email: "E-mail",
  cidade: "Cidade",
  area: "Área de interesse",
  cargo: "Cargo desejado",
  experiencia: "Experiência",
  escolaridade: "Escolaridade",
  cursos: "Cursos e certificações",
};

const REQUIRED_FIELDS = ["nome", "telefone", "cidade", "area"];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RH_EMAIL_TO;
  const from = process.env.RH_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    return Response.json(
      {
        error:
          "O envio por e-mail ainda não está configurado. Use o WhatsApp do RH.",
      },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const text = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  for (const field of REQUIRED_FIELDS) {
    if (!text(field)) {
      return Response.json(
        { error: `Preencha o campo "${FIELD_LABELS[field]}".` },
        { status: 400 }
      );
    }
  }

  const disponibilidade = form
    .getAll("disponibilidade")
    .filter((item): item is string => typeof item === "string");

  const curriculo = form.get("curriculo");
  if (!(curriculo instanceof File) || curriculo.size === 0) {
    return Response.json(
      { error: "Anexe o arquivo do seu currículo." },
      { status: 400 }
    );
  }

  const extension = curriculo.name
    .slice(curriculo.name.lastIndexOf("."))
    .toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return Response.json(
      { error: "Envie o currículo em PDF, DOC ou DOCX." },
      { status: 400 }
    );
  }

  if (curriculo.size > MAX_FILE_BYTES) {
    return Response.json(
      { error: "O arquivo passa de 5 MB. Envie uma versão mais leve." },
      { status: 400 }
    );
  }

  const rows = Object.entries(FIELD_LABELS)
    .map(([key, label]) => [label, text(key)] as const)
    .filter(([, value]) => value !== "");

  if (disponibilidade.length > 0) {
    rows.push(["Disponibilidade", disponibilidade.join(", ")]);
  }

  const html = `
    <h2 style="font-family:sans-serif">Nova candidatura pelo site</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:6px 16px 6px 0;color:#6b6e70;vertical-align:top">${escapeHtml(
            label
          )}</td>
          <td style="padding:6px 0;color:#26282b">${escapeHtml(value).replace(
            /\n/g,
            "<br>"
          )}</td>
        </tr>`
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:13px;color:#6b6e70">
      Currículo em anexo: ${escapeHtml(curriculo.name)}
    </p>
  `;

  const base64 = Buffer.from(await curriculo.arrayBuffer()).toString("base64");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: text("email") || undefined,
      subject: `Currículo — ${text("nome")} (${text("area")})`,
      html,
      attachments: [{ filename: curriculo.name, content: base64 }],
    }),
  });

  if (!response.ok) {
    return Response.json(
      {
        error: `Não conseguimos enviar seu currículo agora. Tente pelo WhatsApp ${COMPANY.whatsapp.rh.label}.`,
      },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
