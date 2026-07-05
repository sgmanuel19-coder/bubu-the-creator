import { NextResponse } from "next/server";

// Reenvía el registro al webhook de n8n (Google Sheets + notificación).
// El webhook nunca se expone al navegador: el cliente solo habla con esta ruta.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const webhook = process.env.TALLER_N8N_WEBHOOK;
  if (!webhook) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "El registro automático no está disponible en este momento. Escríbenos por WhatsApp y te damos acceso directo.",
        fallback: "whatsapp",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        email,
        producto: producto || "no indicado",
        fecha: new Date().toISOString(),
        origen: "resueltoagency.com/taller",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`webhook status ${res.status}`);
  } catch {
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

  return NextResponse.json({ ok: true });
}
