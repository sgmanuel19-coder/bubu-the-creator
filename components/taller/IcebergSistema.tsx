"use client";

import { useEffect, useRef, useState } from "react";
import { TALLER } from "@/lib/taller/content";

// Visual "iceberg": la punta que todos ven ('videos con IA') vs. el sistema
// completo que va debajo. Refuerza el posicionamiento y se anima al entrar
// en pantalla. 100% offline.
export default function IcebergSistema() {
  const { tip, capas } = TALLER.gate.iceberg;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="mx-auto mt-20 max-w-3xl">
      <h2 className="text-center text-2xl font-bold">Por qué tu contenido se ve genérico</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm" style={{ color: "var(--muted)" }}>
        Casi todos trabajan solo con la punta del iceberg. El valor está debajo.
      </p>

      <div
        ref={ref}
        className="mt-8 overflow-hidden rounded-3xl border"
        style={{
          borderColor: "rgba(244,240,222,0.12)",
          background:
            "linear-gradient(180deg, #0F1A2E 0%, #0F1A2E 28%, #0A2A4A 30%, #071E38 100%)",
        }}
      >
        {/* Sobre el agua: la punta */}
        <div className="relative px-6 pb-4 pt-8 text-center">
          <div
            className="mx-auto flex h-0 w-0"
            style={{
              borderLeft: "42px solid transparent",
              borderRight: "42px solid transparent",
              borderBottom: "34px solid rgba(244,240,222,0.9)",
              filter: "drop-shadow(0 0 14px rgba(244,240,222,0.25))",
            }}
            aria-hidden
          />
          <p className="mt-3 text-sm font-semibold" style={{ color: "var(--cream)" }}>
            {tip}
          </p>
        </div>

        {/* Línea de agua */}
        <div
          className="flex items-center justify-between px-5 py-1.5 text-[10px] uppercase tracking-[0.2em]"
          style={{
            background: "rgba(26,128,255,0.18)",
            borderTop: "1px solid rgba(127,184,255,0.4)",
            borderBottom: "1px solid rgba(127,184,255,0.2)",
            color: "#9EC7FF",
          }}
        >
          <span>Lo que se ve</span>
          <span>Nivel del agua</span>
          <span>Lo que no se ve</span>
        </div>

        {/* Bajo el agua: el sistema */}
        <div className="space-y-2.5 px-5 py-6 sm:px-8">
          {capas.map((capa, i) => (
            <div
              key={capa}
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                background: `rgba(26,128,255,${0.10 + i * 0.03})`,
                border: "1px solid rgba(127,184,255,0.25)",
                color: "var(--cream)",
                // Más profundidad = más indentado (efecto de descenso)
                marginLeft: `${Math.min(i * 6, 30)}px`,
                marginRight: `${Math.min(i * 6, 30)}px`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <span style={{ color: "var(--green)" }}>▼</span> {capa}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-sm" style={{ color: "var(--muted)" }}>
        Eso de abajo es lo que enseño. Empieza por la estrategia, no por la herramienta.
      </p>
    </section>
  );
}
