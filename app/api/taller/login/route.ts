import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  hashPassword,
  NIVELES_COOKIE,
  parseNiveles,
  passwordsPorNivel,
  serializarNiveles,
  TALLER_COOKIE,
  TALLER_SESSION_DAYS,
  tokenDeNivel,
} from "@/lib/taller/auth";

// ── Freno anti fuerza bruta ──────────────────────────────────
// Límite por IP en memoria de la instancia. En serverless no es perfecto
// (cada instancia cuenta aparte), pero encarece mucho el ataque en
// instancias calientes y no requiere infraestructura extra.
const VENTANA_MS = 10 * 60 * 1000;
const MAX_INTENTOS = 10;
const intentos = new Map<string, { n: number; desde: number }>();

function ipDe(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida"
  );
}

function bloqueada(ip: string): boolean {
  const reg = intentos.get(ip);
  if (!reg) return false;
  if (Date.now() - reg.desde > VENTANA_MS) {
    intentos.delete(ip);
    return false;
  }
  return reg.n >= MAX_INTENTOS;
}

function registrarFallo(ip: string) {
  const ahora = Date.now();
  const reg = intentos.get(ip);
  if (!reg || ahora - reg.desde > VENTANA_MS) {
    intentos.set(ip, { n: 1, desde: ahora });
  } else {
    reg.n += 1;
  }
  // Que el mapa no crezca sin límite.
  if (intentos.size > 5000) intentos.clear();
}

// Comparación en tiempo constante sobre los hashes (mitiga timing attacks).
async function coincide(entrada: string, configurada: string): Promise<boolean> {
  const [a, b] = await Promise.all([hashPassword(entrada), hashPassword(configurada)]);
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(request: Request) {
  const configuradas = passwordsPorNivel();
  if (Object.keys(configuradas).length === 0) {
    return NextResponse.json(
      { ok: false, error: "El portal aún no está habilitado. Escríbenos por WhatsApp." },
      { status: 503 },
    );
  }

  const ip = ipDe(request);
  if (bloqueada(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Demasiados intentos. Espera unos minutos y vuelve a probar.",
      },
      { status: 429 },
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password.trim() : "";
  } catch {
    // body inválido → cae al chequeo de abajo
  }

  // Busca a qué nivel pertenece la contraseña. Se recorren TODOS los
  // niveles siempre (sin break) para no filtrar información por tiempo.
  let nivelGanador: string | null = null;
  if (password) {
    for (const [nivel, pass] of Object.entries(configuradas)) {
      if (await coincide(password, pass)) nivelGanador = nivel;
    }
  }

  if (!nivelGanador) {
    registrarFallo(ip);
    await dormir(400); // encarece la fuerza bruta sin molestar a un humano
    return NextResponse.json(
      { ok: false, error: "Contraseña incorrecta. Revisa el correo o mensaje donde te la enviamos." },
      { status: 401 },
    );
  }

  intentos.delete(ip);

  // Suma el nivel a los que ya tenía (acumulable: vivo + un premium, etc.)
  const previos = parseNiveles(
    request.headers.get("cookie")?.match(/(?:^|;\s*)taller_niveles=([^;]*)/)?.[1]
      ? decodeURIComponent(
          request.headers.get("cookie")!.match(/(?:^|;\s*)taller_niveles=([^;]*)/)![1],
        )
      : undefined,
  );
  previos.set(nivelGanador, await tokenDeNivel(nivelGanador, configuradas[nivelGanador]));

  const opciones = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: TALLER_SESSION_DAYS * 24 * 60 * 60,
  };

  const response = NextResponse.json({ ok: true, nivel: nivelGanador });
  response.cookies.set(NIVELES_COOKIE, serializarNiveles(previos), opciones);
  // La cookie legada se mantiene para el acceso maestro (compatibilidad).
  if (nivelGanador === "todo") {
    response.cookies.set(TALLER_COOKIE, await hashPassword(configuradas.todo), opciones);
  }
  return response;
}
