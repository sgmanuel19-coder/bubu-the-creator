"use client";

import { useEffect, useRef, useState } from "react";
import { TALLER } from "@/lib/taller/content";

// Comparativo animado: producción tradicional (gris, apagada — el color es
// énfasis retórico, la identidad la dan las etiquetas) vs. el sistema (azul).
// Las barras crecen al entrar en pantalla.
export default function VersusAnimado() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="mx-auto mt-20 max-w-3xl" ref={ref}>
      <h2 className="text-center text-2xl font-bold">La misma campaña, dos mundos</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm" style={{ color: "var(--muted)" }}>
        Lo que a una productora le cuesta semanas y cinco cifras, el sistema lo produce en días.
      </p>

      <div
        className="mt-8 overflow-hidden rounded-3xl border"
        style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
      >
        {/* Cabecera de entidades */}
        <div
          className="grid grid-cols-2 border-b text-center text-xs font-semibold uppercase tracking-wider"
          style={{ borderColor: "rgba(244,240,222,0.10)" }}
        >
          <div className="py-3" style={{ color: "var(--muted)" }}>
            Producción tradicional
          </div>
          <div
            className="py-3"
            style={{ color: "var(--green)", background: "rgba(26,128,255,0.07)" }}
          >
            Con el sistema
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          {TALLER.gate.versus.map((fila, i) => (
            <div key={fila.metrica}>
              <p className="text-center text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
                {fila.metrica}
              </p>
              <div className="mt-2 grid grid-cols-2 items-center gap-4">
                {/* Tradicional */}
                <div className="text-right">
                  <p className="text-sm font-semibold" style={{ color: "var(--muted)" }}>
                    {fila.tradicional}
                  </p>
                  <div className="mt-1.5 flex justify-end">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: visible ? `${fila.barraTrad}%` : "0%",
                        background: "rgba(158,152,130,0.45)",
                        transition: `width 0.9s ease ${i * 150}ms`,
                      }}
                    />
                  </div>
                </div>
                {/* Sistema */}
                <div>
                  <p className="text-sm font-semibold">{fila.sistema}</p>
                  <div className="mt-1.5">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: visible ? `${fila.barraSis}%` : "0%",
                        background: "var(--green)",
                        boxShadow: "0 0 10px rgba(26,128,255,0.5)",
                        transition: `width 0.9s ease ${i * 150 + 250}ms`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className="border-t px-6 py-4 text-center text-sm font-medium"
          style={{ borderColor: "rgba(244,240,222,0.10)" }}
        >
          Mismo nivel visual. Por eso un proyecto con este sistema se cobra{" "}
          <span style={{ color: "var(--green)" }}>desde $2,000</span>.
        </p>
      </div>
    </section>
  );
}
