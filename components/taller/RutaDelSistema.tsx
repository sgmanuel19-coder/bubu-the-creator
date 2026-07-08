"use client";

import { useEffect, useRef, useState } from "react";

// Mapa de ruta estilo videojuego: el camino del alumno por los 3 actos
// hasta cobrar su primer proyecto. Los nodos aparecen en secuencia al
// entrar en pantalla. Los niveles conectan con la gamificación del portal.
const PARADAS = [
  { icono: "🧠", titulo: "ACTO 1 · PENSAR", detalle: "Construyes tu Cerebro Creativo IA", nivel: "Nivel: Guionista" },
  { icono: "🎬", titulo: "ACTO 2 · CREAR", detalle: "Produces tu primer spot con calidad de cine", nivel: "Nivel: Director" },
  { icono: "💼", titulo: "ACTO 3 · COBRAR", detalle: "Empaquetas tu oferta y tu pitch de 60s", nivel: "Nivel: Estratega" },
  { icono: "🏆", titulo: "TU PRIMER PROYECTO", detalle: "Un cliente pagándote por producir con el sistema", nivel: "Nivel: Maestro IA", meta: true },
];

export default function RutaDelSistema() {
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
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="mx-auto mt-20 max-w-3xl" ref={ref}>
      <h2 className="text-center text-2xl font-bold">Tu ruta dentro del sistema</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm" style={{ color: "var(--muted)" }}>
        Cada acto sube tu nivel. La meta no es «saber IA»: es cobrar por usarla.
      </p>

      <div className="relative mt-10 pl-2">
        {/* Línea del camino */}
        <div
          className="absolute bottom-6 left-[27px] top-2 w-0.5"
          style={{
            background: "linear-gradient(180deg, var(--green), rgba(26,128,255,0.15))",
            transform: visible ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
            transition: "transform 1.4s ease",
          }}
          aria-hidden
        />

        <ol className="space-y-8">
          {PARADAS.map((p, i) => (
            <li
              key={p.titulo}
              className="relative flex items-start gap-5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-14px)",
                transition: `opacity 0.5s ease ${i * 280}ms, transform 0.5s ease ${i * 280}ms`,
              }}
            >
              {/* Nodo */}
              <div
                className="z-10 flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border-2 text-2xl"
                style={{
                  height: 52,
                  width: 52,
                  borderColor: p.meta ? "var(--green)" : "rgba(26,128,255,0.5)",
                  background: p.meta ? "rgba(26,128,255,0.22)" : "var(--surface)",
                  boxShadow: p.meta ? "0 0 26px rgba(26,128,255,0.5)" : "none",
                }}
              >
                {p.icono}
              </div>
              <div
                className="flex-1 rounded-2xl border px-5 py-4"
                style={{
                  borderColor: p.meta ? "rgba(26,128,255,0.5)" : "rgba(244,240,222,0.12)",
                  background: p.meta
                    ? "linear-gradient(135deg, rgba(26,128,255,0.14), rgba(26,128,255,0.03))"
                    : "var(--surface)",
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold tracking-wide">{p.titulo}</p>
                  <span
                    className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ borderColor: "rgba(26,128,255,0.45)", color: "var(--green)" }}
                  >
                    {p.nivel}
                  </span>
                </div>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  {p.detalle}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
