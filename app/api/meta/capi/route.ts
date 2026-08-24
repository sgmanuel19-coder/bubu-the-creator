import { NextRequest, NextResponse } from "next/server";

// ============================================================
// CONVERSIONS API DE META (CAPI)
//
// Manda los eventos de conversión desde el servidor, en paralelo al
// Pixel del navegador. Los dos envían el MISMO `event_id`, así que Meta
// los reconoce como un solo evento y no los cuenta doble.
//
// Por qué existe: el Pixel del navegador se pierde por bloqueadores, por
// las restricciones de Safari/iOS y —sobre todo en nuestro caso— porque
// al hacer clic en un enlace de WhatsApp el navegador abandona la página
// antes de que la petición termine de salir.
//
// IMPORTANTE — consentimiento: este endpoint solo se llama desde el
// cliente cuando el visitante ya aceptó cookies. CAPI no es una forma de
// esquivar esa decisión: si alguien rechaza, no se envía nada por ningún
// canal.
//
// Configuración: META_CAPI_ACCESS_TOKEN se genera en
// Events Manager → Configuración → API de conversiones → Generar token.
// Es SECRETO: va sin el prefijo NEXT_PUBLIC para que nunca llegue al
// navegador. Sin token, el endpoint responde "not_configured" y el Pixel
// del navegador sigue trabajando solo.
// ============================================================

const API_VERSION = "v21.0";

type Body = {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  contentName?: string;
  contentCategory?: string;
  fbp?: string;
  fbc?: string;
};

export async function POST(req: NextRequest) {
  // Mismo saneado que en FacebookPixel: el valor almacenado trae un BOM
  // invisible que rompe la URL del Graph API ("Object with ID '﻿123...'
  // does not exist"). El ID es numérico, así que se dejan solo dígitos.
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID?.replace(/\D/g, "");
  const token = process.env.META_CAPI_ACCESS_TOKEN?.trim();

  if (!pixelId || !token) {
    // Diagnóstico: solo indica si cada variable llegó al runtime, nunca su
    // valor. Sirve para distinguir cuál de las dos falta sin exponer nada.
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }

  const { eventName, eventId, eventSourceUrl, contentName, contentCategory, fbp, fbc } = body;
  if (!eventName || !eventId) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }

  // IP y user-agent van SIN hashear (así los espera Meta). No manejamos
  // email ni teléfono en este punto del flujo, así que no hay nada que
  // hashear: el match se apoya en la IP, el user-agent y las cookies
  // _fbp / _fbc que deja el propio Pixel.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    undefined;
  const userAgent = req.headers.get("user-agent") ?? undefined;

  const userData: Record<string, string> = {};
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload = {
    // El token viaja en el cuerpo, no en la URL: así no queda registrado
    // en logs de acceso ni en historiales de proxy.
    access_token: token,
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: {
          ...(contentName ? { content_name: contentName } : {}),
          ...(contentCategory ? { content_category: contentCategory } : {}),
        },
      },
    ],
  };

  try {
    const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();

    if (!res.ok) {
      console.error("[CAPI] Meta rechazó el evento:", JSON.stringify(json));
      return NextResponse.json({ ok: false, reason: "rejected" });
    }

    return NextResponse.json({ ok: true, received: json.events_received ?? 0 });
  } catch (err) {
    // Nunca propagamos el fallo al visitante: si CAPI falla, el Pixel del
    // navegador ya cubrió el evento y la página no debe verse afectada.
    console.error("[CAPI] Error de red:", err);
    return NextResponse.json({ ok: false, reason: "network" });
  }
}
