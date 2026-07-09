import { NextResponse } from "next/server";
import { NIVELES_COOKIE, TALLER_COOKIE } from "@/lib/taller/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/taller", request.url), 303);
  response.cookies.set(TALLER_COOKIE, "", { path: "/", maxAge: 0 });
  response.cookies.set(NIVELES_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
