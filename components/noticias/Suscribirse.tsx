"use client";

import { useState } from "react";

/**
 * Alta en la newsletter.
 *
 * Un solo campo a propósito: cada dato extra que se pide baja la
 * conversión, y para mandar un resumen semanal el correo alcanza.
 *
 * Es `<form>` de verdad con `action` y `method`, así que si el
 * JavaScript no cargó el navegador lo envía igual y la API responde.
 * El fetch solo existe para no recargar la página.
 */
export default function Suscribirse({ origen = "portada" }: { origen?: string }) {
  const [estado, setEstado] = useState<"quieto" | "enviando" | "listo" | "error">(
    "quieto",
  );
  const [mensaje, setMensaje] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    setEstado("enviando");
    try {
      const r = await fetch("/api/noticias/suscribir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, origen }),
      });
      const datos = await r.json().catch(() => ({}));
      if (r.ok) {
        setEstado("listo");
      } else {
        setEstado("error");
        setMensaje(datos?.error ?? "No pudimos registrarte.");
      }
    } catch {
      setEstado("error");
      setMensaje("No pudimos registrarte. Revisa tu conexión.");
    }
  }

  if (estado === "listo") {
    return (
      <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/[0.06] p-6">
        <p className="font-display text-base font-semibold text-cream">
          Listo. Nos vemos el lunes.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Un correo por semana con lo que de verdad pasó. Si no te sirve, te das
          de baja en un clic desde el mismo correo.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-6">
      <h2 className="font-display text-base font-bold text-cream">
        El resumen de la semana, los lunes
      </h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
        Diez notas, elegidas de todo lo que pasó el filtro. Sin relleno y sin
        publicidad. Te das de baja cuando quieras.
      </p>

      <form
        onSubmit={enviar}
        action="/api/noticias/suscribir"
        method="post"
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <input type="hidden" name="origen" value={origen} />
        <label htmlFor="email-newsletter" className="sr-only">
          Tu correo
        </label>
        <input
          id="email-newsletter"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@correo.com"
          className="min-w-0 flex-1 rounded-lg border border-white/15 bg-bg px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-muted/60 focus:border-brand-blue"
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="shrink-0 rounded-lg bg-brand-blue px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {estado === "enviando" ? "Un momento…" : "Quiero el resumen"}
        </button>
      </form>

      {estado === "error" && (
        <p role="alert" className="mt-3 text-sm text-[#E0A93C]">
          {mensaje}
        </p>
      )}
    </div>
  );
}
