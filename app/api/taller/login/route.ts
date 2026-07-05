import { NextResponse } from "next/server";
import {
  hashPassword,
  TALLER_COOKIE,
  TALLER_SESSION_DAYS,
} from "@/lib/taller/auth";

export async function POST(request: Request) {
  const configured = process.env.TALLER_PASSWORD;
  if (!configured) {
    return NextResponse.json(
      { ok: false, error: "El portal aún no está habilitado. Escríbenos por WhatsApp." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password.trim() : "";
  } catch {
    // body inválido → cae al chequeo de abajo
  }

  if (!password || password !== configured) {
    return NextResponse.json(
      { ok: false, error: "Contraseña incorrecta. Revisa el correo donde te la enviamos." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(TALLER_COOKIE, await hashPassword(configured), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TALLER_SESSION_DAYS * 24 * 60 * 60,
  });
  return response;
}
