import "server-only";

import { createSupabaseAdmin } from "@/lib/ics/supabase/admin";
import type { Noticia } from "@/lib/noticias/feed";

// ============================================================
// LA NOTICIA — newsletter semanal
//
// Por qué existe: el portal trae lectores y los manda a Xataka. Sin
// una lista propia, ese tráfico no deja nada. Esto lo convierte en
// audiencia, que es lo que hace falta para vender la Academia.
//
// El envío corre desde /api/noticias/newsletter con el cron de los
// lunes. Si no hay proveedor de correo configurado, arma el resumen
// igual y no manda nada: nunca revienta.
// ============================================================

const BASE = "https://www.resueltoagency.com";

export function newsletterConfigurada(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.NEWSLETTER_REMITENTE);
}

function supabaseListo(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

// ── Alta y baja ───────────────────────────────────────────────

export type ResultadoAlta =
  | { ok: true; yaEstaba: boolean }
  | { ok: false; motivo: string };

/** Validación deliberadamente simple: el rebote del envío es el filtro real. */
export function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email);
}

export async function suscribir(email: string, origen: string): Promise<ResultadoAlta> {
  if (!supabaseListo()) return { ok: false, motivo: "sin base de datos" };

  const limpio = email.trim().toLowerCase();
  if (!emailValido(limpio)) return { ok: false, motivo: "correo inválido" };

  try {
    const supabase = createSupabaseAdmin();

    // upsert por email: si ya existía se reactiva en vez de fallar, que
    // es lo que pasa cuando alguien se dio de baja y vuelve.
    const { error } = await supabase
      .from("noticias_suscriptores")
      .upsert(
        { email: limpio, origen, activo: true, baja_at: null },
        { onConflict: "email" },
      );

    if (error) {
      console.error("[radar] alta newsletter —", error.message);
      return { ok: false, motivo: "no se pudo guardar" };
    }
    return { ok: true, yaEstaba: false };
  } catch (e) {
    console.error("[radar] alta newsletter —", e instanceof Error ? e.message : e);
    return { ok: false, motivo: "error inesperado" };
  }
}

export async function darDeBaja(token: string): Promise<boolean> {
  if (!supabaseListo()) return false;
  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("noticias_suscriptores")
      .update({ activo: false, baja_at: new Date().toISOString() })
      .eq("token_baja", token);
    return !error;
  } catch {
    return false;
  }
}

export async function suscriptoresActivos(): Promise<
  { email: string; token_baja: string }[]
> {
  if (!supabaseListo()) return [];
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("noticias_suscriptores")
    .select("email,token_baja")
    .eq("activo", true);
  if (error) {
    console.error("[radar] leer suscriptores —", error.message);
    return [];
  }
  return data ?? [];
}

// ── El correo ─────────────────────────────────────────────────

function esc(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Arma el HTML del envío.
 *
 * Sin CSS externo ni imágenes remotas: los clientes de correo los
 * bloquean o los ignoran, así que todo va en estilos en línea y con
 * una sola columna. El enlace de baja es obligatorio.
 */
export function armarCorreo(notas: Noticia[], tokenBaja: string): string {
  const filas = notas
    .map(
      (n) => `
      <tr><td style="padding:0 0 22px 0;">
        <div style="font:600 11px/1.4 Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#8A8570;">
          ${esc(n.seccion)} · ${esc(n.fuente.corto)}${n.fuente.idioma === "en" ? " · EN" : ""}
        </div>
        <a href="${esc(n.url)}" style="display:block;margin-top:6px;font:700 17px/1.35 Arial,sans-serif;color:#0D0C08;text-decoration:none;">
          ${esc(n.titulo)}
        </a>
        ${n.extracto ? `<div style="margin-top:6px;font:400 14px/1.5 Arial,sans-serif;color:#55524A;">${esc(n.extracto)}</div>` : ""}
      </td></tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="es"><body style="margin:0;padding:0;background:#F4F0DE;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F0DE;padding:28px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:14px;padding:32px;">
        <tr><td style="padding-bottom:22px;border-bottom:1px solid #E5E0CC;">
          <div style="font:800 26px/1 Arial,sans-serif;color:#0D0C08;">La notic<span style="color:#1A80FF;">IA</span></div>
          <div style="margin-top:8px;font:400 14px/1.5 Arial,sans-serif;color:#55524A;">
            Lo que pasó esta semana en IA aplicada. Solo lo que se puede usar, construir o vender.
          </div>
        </td></tr>
        <tr><td style="padding-top:26px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${filas}</table>
        </td></tr>
        <tr><td style="padding-top:14px;border-top:1px solid #E5E0CC;">
          <a href="${BASE}/noticias" style="font:700 13px/1.4 Arial,sans-serif;color:#1A80FF;text-decoration:none;">Ver todo en La noticIA →</a>
          <div style="margin-top:18px;font:400 12px/1.6 Arial,sans-serif;color:#8A8570;">
            Recibes esto porque te suscribiste en resueltoagency.com.
            <a href="${BASE}/noticias/baja?t=${esc(tokenBaja)}" style="color:#8A8570;">Darte de baja</a>.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/**
 * Las notas de la semana, ya elegidas.
 *
 * Se ordena por puntaje del clasificador y se limita a una por medio
 * hasta llenar el cupo: sin eso, un medio que publica mucho se lleva
 * el correo entero y el resumen deja de representar la semana.
 */
export function seleccionSemanal(notas: Noticia[], cupo = 10): Noticia[] {
  const hace7dias = Date.now() - 7 * 86_400_000;
  const candidatas = notas
    .filter((n) => n.fecha.getTime() >= hace7dias)
    .sort((a, b) => b.puntaje * 3 + b.fuente.peso - (a.puntaje * 3 + a.fuente.peso));

  const usadas = new Set<string>();
  const salida: Noticia[] = [];
  for (const n of candidatas) {
    if (usadas.has(n.fuente.id)) continue;
    usadas.add(n.fuente.id);
    salida.push(n);
    if (salida.length >= cupo) break;
  }
  // Si con una por medio no se llena el cupo, se completa con el resto.
  for (const n of candidatas) {
    if (salida.length >= cupo) break;
    if (!salida.includes(n)) salida.push(n);
  }
  return salida;
}

// ── Envío ─────────────────────────────────────────────────────

export type ResultadoEnvio = {
  enviados: number;
  fallidos: number;
  motivo?: string;
};

/**
 * Manda el correo por Resend.
 *
 * Se eligió Resend porque su API es un POST y no necesita SDK. Si no
 * hay llave configurada devuelve el motivo y no manda nada: el resto
 * del cron sigue funcionando igual.
 */
export async function enviarNewsletter(notas: Noticia[]): Promise<ResultadoEnvio> {
  if (!newsletterConfigurada()) {
    return { enviados: 0, fallidos: 0, motivo: "sin RESEND_API_KEY o NEWSLETTER_REMITENTE" };
  }

  const gente = await suscriptoresActivos();
  if (gente.length === 0) return { enviados: 0, fallidos: 0, motivo: "sin suscriptores" };
  if (notas.length === 0) return { enviados: 0, fallidos: 0, motivo: "sin notas esta semana" };

  const asunto = `La noticIA — ${notas[0].titulo.slice(0, 60)}`;
  let enviados = 0;
  let fallidos = 0;

  // Uno por uno para que cada quien reciba SU enlace de baja. Con
  // listas chicas es lo correcto; si algún día son miles, hay que
  // pasar a envíos por lotes.
  for (const persona of gente) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NEWSLETTER_REMITENTE,
          to: persona.email,
          subject: asunto,
          html: armarCorreo(notas, persona.token_baja),
        }),
      });
      if (r.ok) enviados++;
      else fallidos++;
    } catch {
      fallidos++;
    }
  }

  return { enviados, fallidos };
}
