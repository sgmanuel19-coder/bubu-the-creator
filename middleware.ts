import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Separación de proyectos Vercel por dominio.
 * - resueltoagencia.vercel.app → sirve RESUELTO landing en /
 * - Cualquier otro dominio (sistema-ia, etc.) → redirige / a /sistemas-ia
 *
 * ⚠️ NO modificar app/page.tsx para agregar redirect().
 *    La separación entre proyectos se maneja aquí, no en la página.
 */
const RESUELTO_HOSTS = ["resueltoagencia", "resueltoagency", "localhost"];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isResuelto = RESUELTO_HOSTS.some((h) => host.includes(h));

  if (!isResuelto && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/sistemas-ia", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
