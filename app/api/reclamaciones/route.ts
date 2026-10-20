import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/ics/supabase/admin";
import { LEGAL } from "@/components/LegalNotice";

// Libro de Reclamaciones virtual (D.S. 011-2011-PCM, mod. D.S. 101-2022-PCM).
// Cada hoja se guarda en Supabase (el id es el correlativo) y se manda por
// correo a la empresa, con copia automática al consumidor — la norma exige
// que reciba su hoja en el momento. Si la base de datos aún no existe
// (migración 006 sin correr), igual se envía por correo con un código por
// fecha para que ninguna hoja se pierda.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DESTINO = process.env.RECLAMOS_EMAIL || process.env.TALLER_LEADS_EMAIL || "sgmanuel19@gmail.com";

type Hoja = {
  nombre: string;
  tipo_documento: string;
  numero_documento: string;
  domicilio: string;
  telefono: string;
  email: string;
  menor_de_edad: boolean;
  apoderado: string;
  tipo_bien: "producto" | "servicio";
  monto: number | null;
  descripcion_bien: string;
  tipo: "reclamo" | "queja";
  detalle: string;
  pedido: string;
};

const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function guardar(h: Hoja): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.from("libro_reclamaciones").insert(h).select("id, created_at").single();
    if (error || !data) {
      console.error("[reclamaciones] insert —", error?.message);
      return null;
    }
    const codigo = `${String(data.id).padStart(6, "0")}-${new Date(data.created_at).getFullYear()}`;
    await supabase.from("libro_reclamaciones").update({ codigo }).eq("id", data.id);
    return codigo;
  } catch (e) {
    console.error("[reclamaciones] supabase —", e);
    return null;
  }
}

async function enviarPorCorreo(h: Hoja, codigo: string, fecha: string): Promise<boolean> {
  const tipo = h.tipo === "reclamo" ? "Reclamo" : "Queja";
  const copia = [
    `Hoja de reclamación N.° ${codigo} — ${fecha}`,
    `${LEGAL.razonSocial} · RUC ${LEGAL.ruc} · ${LEGAL.domicilio}`,
    "",
    `Consumidor: ${h.nombre} (${h.tipo_documento} ${h.numero_documento})`,
    `Domicilio: ${h.domicilio} · Teléfono: ${h.telefono || "—"} · Correo: ${h.email}`,
    h.menor_de_edad ? `Padre, madre o apoderado: ${h.apoderado}` : "",
    "",
    `Bien contratado: ${h.tipo_bien} — ${h.descripcion_bien}`,
    `Monto reclamado: ${h.monto != null ? `S/ ${h.monto.toFixed(2)}` : "—"}`,
    "",
    `${tipo}: ${h.detalle}`,
    `Pedido: ${h.pedido}`,
    "",
    "Le responderemos en un plazo no mayor a quince (15) días hábiles.",
    "La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.",
  ]
    .filter((l) => l !== "")
    .join("\n");

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${DESTINO}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Libro de Reclamaciones — ${tipo} N.° ${codigo}`,
        _template: "table",
        // FormSubmit manda _autoresponse al campo "email": es la copia del consumidor.
        _autoresponse: copia,
        "N.° de hoja": codigo,
        Fecha: fecha,
        Tipo: tipo,
        Nombre: h.nombre,
        Documento: `${h.tipo_documento} ${h.numero_documento}`,
        Domicilio: h.domicilio,
        Teléfono: h.telefono || "—",
        email: h.email,
        ...(h.menor_de_edad ? { Apoderado: h.apoderado } : {}),
        "Bien contratado": `${h.tipo_bien} — ${h.descripcion_bien}`,
        Monto: h.monto != null ? `S/ ${h.monto.toFixed(2)}` : "—",
        Detalle: h.detalle,
        Pedido: h.pedido,
        "Plazo de respuesta": "15 días hábiles desde hoy",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => null);
    return data?.success === "true" || data?.success === true || !!data?.message;
  } catch {
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

  const montoTxt = txt(body.monto, 20).replace(",", ".");
  const monto = montoTxt ? Number(montoTxt) : null;

  const h: Hoja = {
    nombre: txt(body.nombre, 160),
    tipo_documento: ["DNI", "CE", "Pasaporte", "RUC"].includes(txt(body.tipo_documento, 20)) ? txt(body.tipo_documento, 20) : "DNI",
    numero_documento: txt(body.numero_documento, 20),
    domicilio: txt(body.domicilio, 240),
    telefono: txt(body.telefono, 30),
    email: txt(body.email, 160),
    menor_de_edad: body.menor_de_edad === true,
    apoderado: txt(body.apoderado, 160),
    tipo_bien: body.tipo_bien === "producto" ? "producto" : "servicio",
    monto: monto != null && Number.isFinite(monto) && monto >= 0 ? monto : null,
    descripcion_bien: txt(body.descripcion_bien, 600),
    tipo: body.tipo === "queja" ? "queja" : "reclamo",
    detalle: txt(body.detalle, 3000),
    pedido: txt(body.pedido, 1500),
  };

  const falta =
    !h.nombre || !h.numero_documento || !h.domicilio || !EMAIL_RE.test(h.email) ||
    !h.descripcion_bien || !h.detalle || !h.pedido || (h.menor_de_edad && !h.apoderado);
  if (falta) {
    return NextResponse.json({ ok: false, error: "Completa los campos obligatorios." }, { status: 400 });
  }

  const ahora = new Date();
  const fecha = ahora.toLocaleString("es-PE", { timeZone: "America/Lima", dateStyle: "long", timeStyle: "short" });
  const guardado = await guardar(h);
  // Sin base de datos: código por fecha y hora de Lima, único en la práctica.
  const codigo =
    guardado ??
    `W${ahora.toLocaleString("sv-SE", { timeZone: "America/Lima" }).replace(/\D/g, "").slice(2, 14)}`;

  const enviado = await enviarPorCorreo(h, codigo, fecha);
  if (!guardado && !enviado) {
    return NextResponse.json(
      { ok: false, error: `No pudimos registrar tu hoja. Inténtalo de nuevo o escríbenos a ${LEGAL.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, codigo, fecha, copiaEnviada: enviado });
}
