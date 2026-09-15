import { NextResponse } from "next/server";

// Captura de leads del registro con doble vía:
//   1) Webhook n8n (TALLER_N8N_WEBHOOK) → Google Sheets + aviso, si está configurado.
//   2) Respaldo: correo directo a Manuel vía FormSubmit (gratis, sin cuenta).
//      ⚠️ El PRIMER envío dispara un correo de activación de FormSubmit a esa
//      dirección: hay que hacer clic en "Activate" una sola vez.
// Solo si ambas fallan se le ofrece WhatsApp al interesado. Ningún lead se pierde
// en silencio.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEADS_EMAIL = process.env.TALLER_LEADS_EMAIL || "sgmanuel19@gmail.com";

type Lead = {
  nombre: string;
  email: string;
  producto: string;
  fecha: string;
  origen: string;
  // Solo cuando el lead viene del quiz de diagnóstico: el perfil que le
  // salió y lo que respondió. Sirve para saber con qué abrir la
  // conversación en vez de escribir un "hola" en frío.
  diagnostico?: string;
  respuestas?: string;
};

async function enviarAN8n(lead: Lead): Promise<boolean> {
  const webhook = process.env.TALLER_N8N_WEBHOOK;
  if (!webhook) return false;
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function enviarPorCorreo(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${LEADS_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: lead.diagnostico
          ? `Quiz: ${lead.nombre} — ${lead.diagnostico}`
          : `Nuevo registro a la masterclass: ${lead.nombre}`,
        _template: "table",
        Nombre: lead.nombre,
        Correo: lead.email,
        Compró: lead.producto,
        ...(lead.diagnostico ? { Diagnóstico: lead.diagnostico } : {}),
        ...(lead.respuestas ? { Respondió: lead.respuestas } : {}),
        Fecha: lead.fecha,
        Origen: lead.origen,
        "Siguiente paso": lead.diagnostico
          ? "Escribirle retomando su diagnóstico, no con un saludo en frío."
          : "Responder a su correo con la contraseña de acceso.",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => null);
    // FormSubmit responde success "true"; en el primer envío responde con el
    // mensaje de activación — también cuenta como capturado.
    return data?.success === "true" || data?.success === true || !!data?.message;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let nombre = "";
  let email = "";
  let producto = "";
  let honeypot = "";
  let diagnostico = "";
  let respuestas = "";
  try {
    const body = await request.json();
    nombre = typeof body?.nombre === "string" ? body.nombre.trim().slice(0, 120) : "";
    email = typeof body?.email === "string" ? body.email.trim().slice(0, 160) : "";
    producto = typeof body?.producto === "string" ? body.producto.trim().slice(0, 60) : "";
    honeypot = typeof body?.web === "string" ? body.web.trim() : "";
    diagnostico =
      typeof body?.diagnostico === "string" ? body.diagnostico.trim().slice(0, 120) : "";
    respuestas =
      typeof body?.respuestas === "string" ? body.respuestas.trim().slice(0, 600) : "";
  } catch {
    // body inválido → cae a la validación
  }

  // Honeypot anti-spam: el campo "web" es invisible para humanos; si un bot
  // lo llena, respondemos éxito falso y descartamos (no le avisamos al bot).
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!nombre || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Completa tu nombre y un correo válido." },
      { status: 400 },
    );
  }

  const lead: Lead = {
    nombre,
    email,
    producto: producto || "no indicado",
    fecha: new Date().toISOString(),
    origen: "resueltoagency.com/taller",
    ...(diagnostico ? { diagnostico } : {}),
    ...(respuestas ? { respuestas } : {}),
  };

  if (await enviarAN8n(lead)) return NextResponse.json({ ok: true });
  if (await enviarPorCorreo(lead)) return NextResponse.json({ ok: true });

  return NextResponse.json(
    {
      ok: false,
      error:
        "No pudimos registrar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.",
      fallback: "whatsapp",
    },
    { status: 502 },
  );
}
