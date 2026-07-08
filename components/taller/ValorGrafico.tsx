"use client";

import { useEffect, useRef, useState } from "react";
import { TALLER } from "@/lib/taller/content";

// Gráfica del stack de valor: número héroe ($ total, con conteo animado) +
// barras horizontales proporcionales al valor de cada componente.
// Una sola serie (magnitud) en azul de marca; identidad por etiqueta directa.
function parseValor(v: string): number {
  return Number(v.replace(/[^0-9]/g, "")) || 0;
}

export default function ValorGrafico() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [contador, setContador] = useState(0);

  const items = TALLER.gate.stack.map((s) => ({
    etiqueta: s.item.split(":")[0].split("—")[0].trim(),
    valor: parseValor(s.valor),
    estrella: !!s.estrella,
    soloVivo: !!s.soloVivo,
  }));
  const total = items.reduce((n, i) => n + i.valor, 0);
  const max = Math.max(...items.map((i) => i.valor));

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

  // Conteo animado del total al hacerse visible.
  useEffect(() => {
    if (!visible) return;
    const inicio = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - inicio) / dur);
      setContador(Math.round(total * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, total]);

  return (
    <div
      ref={ref}
      className="mt-6 rounded-3xl border p-6 sm:p-8"
      style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
    >
      {/* Número héroe */}
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--muted)" }}>
          Valor total de lo que recibes
        </p>
        <p className="mt-1 text-5xl font-black tabular-nums" style={{ color: "var(--green)" }}>
          ${contador.toLocaleString("en-US")}
        </p>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Hoy: {TALLER.gate.productos.grabado.precio} el grabado ·{" "}
          {TALLER.gate.productos.vivo.precio} el vivo
        </p>
      </div>

      {/* Barras por componente (etiqueta directa, una sola serie) */}
      <div className="mt-7 space-y-3.5">
        {items.map((it, i) => (
          <div key={it.etiqueta}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate">
                {it.estrella && "⭐ "}
                {it.etiqueta}
                {it.soloVivo && (
                  <span
                    className="ml-2 rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider"
                    style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
                  >
                    Solo en vivo
                  </span>
                )}
              </span>
              <span className="shrink-0 font-semibold tabular-nums" style={{ color: "var(--muted)" }}>
                ${it.valor}
              </span>
            </div>
            <div
              className="mt-1 h-2 w-full overflow-hidden rounded-full"
              style={{ background: "rgba(244,240,222,0.08)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: visible ? `${(it.valor / max) * 100}%` : "0%",
                  background: it.estrella
                    ? "linear-gradient(90deg, var(--green), #7FB8FF)"
                    : "var(--green)",
                  transition: `width 0.8s ease ${i * 110}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
