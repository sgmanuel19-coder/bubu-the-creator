"use client";

import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";

export default function VentaCTA() {
  const { venta, whatsapp } = TALLER;
  return (
    <section
      className="mt-12 rounded-2xl border px-6 py-10 text-center sm:px-10"
      style={{
        borderColor: "rgba(26,128,255,0.45)",
        background: "linear-gradient(180deg, rgba(26,128,255,0.10), rgba(26,128,255,0.02))",
      }}
    >
      <h2 className="text-xl font-bold sm:text-2xl">{venta.titulo}</h2>
      <p
        className="mx-auto mt-3 max-w-xl text-sm leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {venta.texto}
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={venta.urlCalendly}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTaller("taller_cta_venta", { cta: "calendly" })}
          className="w-full rounded-xl px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 sm:w-auto"
          style={{ background: "var(--green)", color: "#fff" }}
        >
          {venta.ctaPrincipal} →
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTaller("taller_cta_venta", { cta: "whatsapp" })}
          className="w-full rounded-xl border px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80 sm:w-auto"
          style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
        >
          {venta.ctaSecundario}
        </a>
      </div>
    </section>
  );
}
