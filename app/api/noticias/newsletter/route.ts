import { timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { obtenerPortada } from "@/lib/noticias/feed";
import {
  enviarNewsletter,
  newsletterConfigurada,
  seleccionSemanal,
} from "@/lib/noticias/newsletter";

// ============================================================
// LA NOTICIA — envío semanal
//
// El cron de vercel.json lo llama TODOS los días porque el plan
// Hobby solo permite disparos diarios; la ruta decide si toca
// mandar. Los lunes manda, el resto de días no hace nada.
//
// Se puede forzar con ?forzar=1 para probar sin esperar al lunes.
// ============================================================

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Lunes en hora de Lima, que es la zona del negocio. */
function esLunesEnLima(): boolean {
  const enLima = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Lima" }),
  );
  return enLima.getDay() === 1;
}

function autorizado(cabecera: string | null, secreto: string): boolean {
  if (!cabecera) return false;
  const recibido = Buffer.from(cabecera);
  const esperado = Buffer.from(`Bearer ${secreto}`);
  if (recibido.length !== esperado.length) return false;
  return timingSafeEqual(recibido, esperado);
}

export async function GET(request: Request) {
  const secreto = process.env.CRON_SECRET;
  if (!secreto) {
    return NextResponse.json(
      { error: "Falta CRON_SECRET en las variables de entorno del proyecto." },
      { status: 503 },
    );
  }
  if (!autorizado(request.headers.get("authorization"), secreto)) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  const forzar = new URL(request.url).searchParams.get("forzar") === "1";
  if (!esLunesEnLima() && !forzar) {
    return NextResponse.json({ ok: true, enviado: false, motivo: "hoy no es lunes" });
  }

  // Sin forzar los feeds: si el cron diario ya pasó, el caché está
  // fresco y no hace falta volver a golpear 35 servidores.
  const portada = await obtenerPortada();
  const seleccion = seleccionSemanal(portada.todas, 10);

  const envio = await enviarNewsletter(seleccion);

  const resumen = {
    ok: true,
    enviado: envio.enviados > 0,
    seleccionadas: seleccion.length,
    ...envio,
    proveedor: newsletterConfigurada() ? "resend" : "sin configurar",
  };
  console.log("[radar] newsletter:", JSON.stringify(resumen));
  return NextResponse.json(resumen);
}
