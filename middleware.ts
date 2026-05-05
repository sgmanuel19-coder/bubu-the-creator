import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Dominio del proyecto Sistema IA (automatizaciones WhatsApp).
 * El proyecto RESUELTO (resueltoagencia.vercel.app) sirve la landing normal en /.
 * Este middleware redirige / → /sistemas-ia SOLO en el dominio de Sistema IA.
 *
 * ⚠️ NO modificar app/page.tsx para agregar redirect().
 *    La separación entre proyectos se maneja aquí, no en la página.
 */
const SISTEMA_IA_HOSTNAMES = [
  "project-yvdip.vercel.app",
  "sistema-ia",
];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isSistemaIA = SISTEMA_IA_HOSTNAMES.some((h) => host.includes(h));

  if (isSistemaIA && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/sistemas-ia", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
