"use client";

import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";

// Backend post-compra (brief sección 6): dos CTAs dentro de la plataforma —
// implementación done-with-you y proyectos de agencia. Ambos van a WhatsApp.
export default function VentaCTA() {
  const { venta, whatsapp } = TALLER;
  return (
    <section
      className="mt-12 rounded-3xl border px-6 py-10 sm:px-10"
      style={{
        borderColor: "rgba(26,128,255,0.45)",
        background: "linear-gradient(180deg, rgba(26,128,255,0.10), rgba(26,128,255,0.02))",
      }}
    >
      <h2 className="text-center text-xl font-bold sm:text-2xl">{venta.titulo}</h2>
      <p
        className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {venta.texto}
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {venta.opciones.map((op) => (
          <div
            key={op.titulo}
            className="flex flex-col rounded-2xl border p-5"
            style={{ borderColor: "rgba(244,240,222,0.14)", background: "var(--surface)" }}
          >
            <h3 className="font-semibold">{op.titulo}</h3>
            <p
              className="mt-2 flex-1 text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {op.texto}
            </p>
            <a
              href={`${whatsapp}?text=${encodeURIComponent(op.mensajeWhatsApp)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTaller("taller_cta_venta", { cta: op.titulo })}
              className="mt-4 rounded-xl py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--green)", color: "#fff" }}
            >
              {op.cta} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
