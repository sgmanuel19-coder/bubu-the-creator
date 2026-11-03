import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/ics/supabase/admin";
import { PLAZOS, presupuestoPor, servicioPor, telefonoValido } from "@/lib/cotizacion";

// Pedidos del formulario /cotizar. Se guardan en Supabase (tabla
// `cotizaciones`, migración 007) y se avisan por correo a Resuelto, Manuel y
// Roberth. El correo sale por Resend si está RESEND_API_KEY (dominio
// resueltoagency.com verificado en Resend); si no, por FormSubmit, que el
// 3-nov-2026 estuvo caído. Con que funcione una de las dos vías (base o
// correo), el pedido no se pierde.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Con FormSubmit, el destino principal es el que pide activar; las copias no.
const DESTINO = process.env.COTIZACIONES_EMAIL || "resueltoagency@gmail.com";
const COPIA = process.env.COTIZACIONES_CC ?? "sgmanuel19@gmail.com,roberth@resueltoagency.com";
const RESEND_FROM = process.env.RESEND_FROM || "Cotizaciones Resuelto <cotizaciones@resueltoagency.com>";

type Pedido = {
  servicio: string;
  rango_presupuesto: string;
  plazo: string;
  empresa: string;
  nombre: string;
  whatsapp: string;
  email: string | null;
  comentario: string | null;
  origen: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  gclid: boolean;
  pagina: string | null;
};

const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function guardar(p: Pedido): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.from("cotizaciones").insert(p).select("id").single();
    if (error || !data) {
      console.error("[cotizaciones] insert —", error?.message);
      return null;
    }
    const codigo = `C-${String(data.id).padStart(6, "0")}`;
    await supabase.from("cotizaciones").update({ codigo }).eq("id", data.id);
    return codigo;
  } catch (e) {
    console.error("[cotizaciones] supabase —", e);
    return null;
  }
}

const escapar = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function avisarPorCorreo(p: Pedido, etiquetas: Record<string, string>, codigo: string, fecha: string) {
  return process.env.RESEND_API_KEY
    ? avisarPorResend(p, etiquetas, codigo, fecha)
    : avisarPorFormSubmit(p, etiquetas, codigo, fecha);
}

async function avisarPorResend(p: Pedido, etiquetas: Record<string, string>, codigo: string, fecha: string) {
  const chat = `https://wa.me/${p.whatsapp.replace(/\D/g, "")}`;
  const filas: [string, string][] = [
    ["Pedido", codigo],
    ["Fecha", fecha],
    ["Servicio", etiquetas.servicio],
    ["Presupuesto", etiquetas.rango],
    ["Plazo", etiquetas.plazo],
    ["Empresa", p.empresa],
    ["Nombre", p.nombre],
    ["WhatsApp", p.whatsapp],
    ["Correo", p.email || "—"],
    ["Comentario", p.comentario || "—"],
    ["Origen", p.origen ? `${p.origen} · ${p.utm_source || "—"} · ${p.utm_campaign || "—"}` : "Directo / orgánico"],
    ["Página", p.pagina || "—"],
  ];
  const html =
    `<h2 style="font-family:Arial,sans-serif">Nueva cotización ${escapar(codigo)}</h2>` +
    `<table style="font-family:Arial,sans-serif;border-collapse:collapse">` +
    filas
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">${escapar(k)}</td>` +
          `<td style="padding:6px 12px;border:1px solid #ddd">${escapar(v)}</td></tr>`,
      )
      .join("") +
    `</table><p style="font-family:Arial,sans-serif"><a href="${chat}">Abrir el chat de WhatsApp</a></p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [DESTINO, ...COPIA.split(",").map((x) => x.trim()).filter(Boolean)],
        subject: `Cotización ${codigo} — ${etiquetas.servicio} · ${etiquetas.rango}`,
        html,
        text: filas.map(([k, v]) => `${k}: ${v}`).join("\n") + `\nAbrir chat: ${chat}`,
        ...(p.email ? { reply_to: p.email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[cotizaciones] resend —", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("[cotizaciones] resend —", e);
    return false;
  }
}

async function avisarPorFormSubmit(p: Pedido, etiquetas: Record<string, string>, codigo: string, fecha: string) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${DESTINO}`, {
      method: "POST",
      // Sin Origin/Referer FormSubmit responde 200 pero no envía nada
      // («open this page through a web server»): desde el servidor no hay.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://www.resueltoagency.com",
        Referer: "https://www.resueltoagency.com/cotizar",
      },
      body: JSON.stringify({
        _subject: `Cotización ${codigo} — ${etiquetas.servicio} · ${etiquetas.rango}`,
        _template: "table",
        ...(COPIA ? { _cc: COPIA } : {}),
        ...(p.email ? { _replyto: p.email } : {}),
        Pedido: codigo,
        Fecha: fecha,
        Servicio: etiquetas.servicio,
        Presupuesto: etiquetas.rango,
        Plazo: etiquetas.plazo,
        Empresa: p.empresa,
        Nombre: p.nombre,
        WhatsApp: p.whatsapp,
        "Abrir chat": `https://wa.me/${p.whatsapp.replace(/\D/g, "")}`,
        Correo: p.email || "—",
        Comentario: p.comentario || "—",
        Origen: p.origen ? `${p.origen} · ${p.utm_source || "—"} · ${p.utm_campaign || "—"}` : "Directo / orgánico",
        Página: p.pagina || "—",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await res.json().catch(() => null);
    const ok = res.ok && (data?.success === "true" || data?.success === true);
    if (!ok) console.error("[cotizaciones] formsubmit —", res.status, data?.message);
    return ok;
  } catch (e) {
    console.error("[cotizaciones] formsubmit —", e);
    return false;
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    // cae a la validación
  }

  // Honeypot anti-spam (campo "web" invisible).
  if (txt(body.web, 200)) return NextResponse.json({ ok: true, codigo: "—" });

  const servicio = servicioPor(txt(body.servicio, 40));
  const rango = presupuestoPor(txt(body.rango_presupuesto, 20));
  const plazo = PLAZOS.find((x) => x.id === txt(body.plazo, 20));
  const whatsapp = telefonoValido(txt(body.pais, 8), txt(body.whatsapp, 30));
  const email = txt(body.email, 160);

  if (!servicio || !rango || !plazo) {
    return NextResponse.json({ ok: false, error: "Elige el servicio, el presupuesto y el plazo." }, { status: 400 });
  }
  if (!whatsapp) {
    return NextResponse.json({ ok: false, error: "Revisa tu número de WhatsApp." }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Revisa tu correo." }, { status: 400 });
  }

  const p: Pedido = {
    servicio: servicio.key,
    rango_presupuesto: rango.id,
    plazo: plazo.id,
    empresa: txt(body.empresa, 160),
    nombre: txt(body.nombre, 160),
    whatsapp,
    email: email || null,
    comentario: txt(body.comentario, 1000) || null,
    origen: txt(body.origen, 4) || null,
    utm_source: txt(body.utm_source, 40) || null,
    utm_campaign: txt(body.utm_campaign, 80) || null,
    gclid: body.gclid === true,
    pagina: txt(body.pagina, 200) || null,
  };
  if (!p.empresa || !p.nombre) {
    return NextResponse.json({ ok: false, error: "Completa tu nombre y tu empresa o marca." }, { status: 400 });
  }

  const ahora = new Date();
  const fecha = ahora.toLocaleString("es-PE", { timeZone: "America/Lima", dateStyle: "long", timeStyle: "short" });
  const guardado = await guardar(p);
  // Sin base de datos: código por fecha y hora de Lima, único en la práctica.
  const codigo =
    guardado ?? `W${ahora.toLocaleString("sv-SE", { timeZone: "America/Lima" }).replace(/\D/g, "").slice(2, 14)}`;

  const avisado = await avisarPorCorreo(
    p,
    { servicio: servicio.label, rango: rango.label, plazo: plazo.label },
    codigo,
    fecha,
  );
  if (!guardado && !avisado) {
    return NextResponse.json(
      { ok: false, error: "No pudimos enviar tu pedido. Inténtalo de nuevo o escríbenos por WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, codigo, guardado: !!guardado, avisado });
}
