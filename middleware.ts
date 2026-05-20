import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RESUELTO_HOST_PATTERN = /^(resueltoagenc[ay]\.com|localhost)(:\d+)?$/i;

// Per-instance rate limiter (best-effort — Vercel runs multiple instances)
const rateMap = new Map<string, { n: number; t: number }>();
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.t > RATE_WINDOW_MS) {
    rateMap.set(ip, { n: 1, t: now });
    return false;
  }
  if (entry.n >= RATE_LIMIT) return true;
  entry.n++;
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Honeypot — any bot following invisible links gets 404 + logged
  if (pathname === '/trap-bot') {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const ua = request.headers.get('user-agent') ?? 'unknown';
    console.warn(`[BOT-TRAP] ip=${ip} ua=${ua}`);
    return new NextResponse(null, { status: 404 });
  }

  // Rate limiting by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' },
    });
  }

  // Routing: exact host match prevents Host-header injection
  const host = request.headers.get("host") ?? "";
  const isResuelto = RESUELTO_HOST_PATTERN.test(host);

  if (!isResuelto && pathname === "/") {
    return NextResponse.redirect(new URL("/sistemas-ia", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|videos/).*)"],
};
