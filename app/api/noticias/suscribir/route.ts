import { NextResponse } from "next/server";

import { emailValido, suscribir } from "@/lib/noticias/newsletter";

// Alta en la newsletter de La noticIA.
// Solo POST, solo un correo: no se piden nombre ni datos que no
// hagan falta, porque cada campo extra baja la conversión.

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let email = "";
  let origen = "portada";

  try {
    // Acepta JSON (fetch del formulario) y formulario clásico, para
    // que el alta funcione aunque el JavaScript no cargue.
    const tipo = request.headers.get("content-type") ?? "";
    if (tipo.includes("application/json")) {
      const cuerpo = await request.json();
      email = String(cuerpo?.email ?? "");
      origen = String(cuerpo?.origen ?? "portada").slice(0, 40);
    } else {
      const form = await request.formData();
      email = String(form.get("email") ?? "");
      origen = String(form.get("origen") ?? "portada").slice(0, 40);
    }
  } catch {
    return NextResponse.json({ ok: false, error: "pedido ilegible" }, { status: 400 });
  }

  if (!emailValido(email.trim())) {
    return NextResponse.json(
      { ok: false, error: "Ese correo no parece válido." },
      { status: 400 },
    );
  }

  const r = await suscribir(email, origen);
  if (!r.ok) {
    // El motivo real va al log, no al navegador: decir "sin base de
    // datos" es regalar información sobre la infraestructura.
    console.warn("[radar] alta fallida —", r.motivo);
    return NextResponse.json(
      { ok: false, error: "No pudimos registrarte. Inténtalo en un momento." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
