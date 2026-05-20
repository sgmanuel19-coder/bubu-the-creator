import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Allows apex and www. Exact match prevents Host-header injection
// (e.g. evil-resueltoagency.com no longer passes).
const RESUELTO_HOST_PATTERN = /^(www\.)?(resueltoagenc[ay]\.com|localhost)(:\d+)?$/i;

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isResuelto = RESUELTO_HOST_PATTERN.test(host);

  if (!isResuelto && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/sistemas-ia", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
