import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Separación de proyectos Vercel por dominio.
 * - resueltoagencia.vercel.app → sirve RESUELTO landing en /
 * - Cualquier otro dominio (sistema-ia, etc.) → redirige / a /sistemas-ia
 *
 * ⚠️ NO modificar app/page.tsx para agregar redirect().
 *    La separación entre proyectos se maneja aquí, no en la página.
 *
 * /ia-content-system/* → refresco de sesión Supabase + gate de auth.
 */
const RESUELTO_HOSTS = ["resueltoagencia", "resueltoagency", "localhost"];
const ICS = "/ia-content-system";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ----- PORTAL DEL TALLER -----
  // Todo /taller/* es PÚBLICO (vista previa con candado). Cada página lee
  // la sesión en el servidor y sólo muestra el contenido real (videos,
  // recursos) si la cookie es válida. La protección vive en las páginas,
  // no aquí, para dar la ilusión de ver toda la plataforma bloqueada.

  // ----- RESUELTO / IA CONTENT SYSTEM -----
  if (pathname.startsWith(ICS)) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Supabase aún no configurado: solo se sirve el login (evita 500s).
    if (!url || !anonKey) {
      if (pathname === `${ICS}/login`) return NextResponse.next();
      return NextResponse.redirect(new URL(`${ICS}/login`, request.url));
    }

    let response = NextResponse.next({ request });

    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isLogin = pathname === `${ICS}/login`;

    if (!user && !isLogin) {
      return NextResponse.redirect(new URL(`${ICS}/login`, request.url));
    }
    if (user && isLogin) {
      return NextResponse.redirect(new URL(ICS, request.url));
    }

    return response;
  }

  // ----- Separación por host (comportamiento original) -----
  const host = request.headers.get("host") ?? "";
  const isResuelto = RESUELTO_HOSTS.some((h) => host.includes(h));

  if (!isResuelto && pathname === "/") {
    return NextResponse.redirect(new URL("/sistemas-ia", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/ia-content-system/:path*"],
};
