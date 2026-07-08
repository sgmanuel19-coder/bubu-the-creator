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
        _subject: `Nuevo registro a la masterclass: ${lead.nombre}`,
        _template: "table",
        Nombre: lead.nombre,
        Correo: lead.email,
        Compró: lead.producto,
        Fecha: lead.fecha,
        Origen: lead.origen,
        "Siguiente paso": "Responder a su correo con la contraseña de acceso.",
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
  try {
    const body = await request.json();
    nombre = typeof body?.nombre === "string" ? body.nombre.trim().slice(0, 120) : "";
    email = typeof body?.email === "string" ? body.email.trim().slice(0, 160) : "";
    producto = typeof body?.producto === "string" ? body.producto.trim().slice(0, 60) : "";
  } catch {
    // body inválido → cae a la validación
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
