import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  NIVELES_COOKIE,
  parseNiveles,
  passwordsPorNivel,
  serializarNiveles,
  TALLER_SESSION_DAYS,
  tokenDeNivel,
} from "@/lib/taller/auth";

export const dynamic = "force-dynamic";

// Link mágico de desbloqueo: /api/taller/desbloquear?nivel=X&t=<token>.
// Manuel lo envía por WhatsApp tras confirmar el pago; el comprador lo
// abre y aterriza directo en su contenido, ya desbloqueado. El link lleva
// el token (hash atado a la contraseña vigente), nunca la contraseña:
// rotar la contraseña del nivel en Vercel mata los links viejos.

function destinoDe(nivel: string): string {
  if (nivel === "vivo") return "/taller/en-vivo";
  if (nivel === "todo" || nivel === "grabado") return "/taller/curso";
  return `/taller/recursos/${nivel}`; // premium: su recurso
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const nivel = url.searchParams.get("nivel") ?? "";
  const token = url.searchParams.get("t") ?? "";

  const configuradas = passwordsPorNivel();
  const pass = configuradas[nivel];

  let valido = false;
  if (pass && token) {
    const esperado = await tokenDeNivel(nivel, pass);
    valido =
      token.length === esperado.length &&
      timingSafeEqual(Buffer.from(token), Buffer.from(esperado));
  }

  if (!valido) {
    // Link inválido o contraseña rotada → a la landing, sin pistas extra.
    return NextResponse.redirect(new URL("/taller?link=invalido", request.url), 303);
  }

  const previos = parseNiveles(
    request.headers.get("cookie")?.match(/(?:^|;\s*)taller_niveles=([^;]*)/)?.[1]
      ? decodeURIComponent(
          request.headers.get("cookie")!.match(/(?:^|;\s*)taller_niveles=([^;]*)/)![1],
        )
      : undefined,
  );
  previos.set(nivel, token);

  const response = NextResponse.redirect(new URL(destinoDe(nivel), request.url), 303);
  response.cookies.set(NIVELES_COOKIE, serializarNiveles(previos), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TALLER_SESSION_DAYS * 24 * 60 * 60,
  });
  return response;
}
