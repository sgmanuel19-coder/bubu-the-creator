"use client";

import { useEffect, useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { getVistas } from "@/lib/taller/progress";
import { calcularGamificacion, type Gamificacion } from "@/lib/taller/gamificacion";

export default function GamificacionHeader() {
  const [g, setG] = useState<Gamificacion | null>(null);
  useEffect(() => setG(calcularGamificacion(getVistas())), []);

  const { miembros, admins } = TALLER.comunidad;

  return (
    <section
      className="overflow-hidden rounded-3xl border"
      style={{
        borderColor: "rgba(26,128,255,0.4)",
        background:
          "linear-gradient(135deg, rgba(26,128,255,0.14), rgba(26,128,255,0.02) 60%), var(--surface)",
      }}
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        {/* Nivel + XP */}
        <div className="flex items-center gap-4">
          {/* Insignia de nivel estilo videojuego */}
          <div
            className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2"
            style={{
              borderColor: "var(--green)",
              background: "rgba(26,128,255,0.15)",
              boxShadow: "0 0 24px rgba(26,128,255,0.35)",
            }}
          >
            <span
              className="text-2xl font-black tabular-nums"
              style={{ color: "var(--green)", fontFamily: "monospace" }}
            >
              {g ? g.nivel : "—"}
            </span>
            <span
              className="absolute -bottom-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
              style={{ background: "var(--green)", color: "#fff" }}
            >
              Nivel
            </span>
          </div>

          <div className="min-w-[180px]">
            <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
              Tu progreso
            </p>
            <p className="text-lg font-bold leading-tight">{g ? g.nombre : "Aprendiz"}</p>
            {/* Barra de XP */}
            <div className="mt-2 w-full max-w-[220px]">
              <div
                className="h-2 w-full overflow-hidden rounded-full"
                style={{ background: "rgba(244,240,222,0.12)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${g ? g.pctNivel : 0}%`,
                    background: "linear-gradient(90deg, var(--green), #7FB8FF)",
                  }}
                />
              </div>
              <p className="mt-1 text-[11px] tabular-nums" style={{ color: "var(--muted)" }}>
                {g ? `${g.xp} XP` : "0 XP"}
                {g && g.sigMin !== null ? ` · faltan ${g.sigMin - g.xp} para subir` : g ? " · nivel máximo" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Logros */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            Logros
          </p>
          <div className="flex gap-2">
            {(g
              ? g.logros
              : [
                  { id: "a", nombre: "", icono: "🎬", obtenido: false },
                  { id: "b", nombre: "", icono: "🎯", obtenido: false },
                  { id: "c", nombre: "", icono: "⚡", obtenido: false },
                  { id: "d", nombre: "", icono: "👑", obtenido: false },
                ]
            ).map((l) => (
              <div
                key={l.id}
                title={l.nombre}
                className="flex h-11 w-11 items-center justify-center rounded-xl border text-lg transition-transform hover:scale-110"
                style={{
                  borderColor: l.obtenido ? "var(--green)" : "rgba(244,240,222,0.15)",
                  background: l.obtenido ? "rgba(26,128,255,0.15)" : "transparent",
                  filter: l.obtenido ? "none" : "grayscale(1)",
                  opacity: l.obtenido ? 1 : 0.4,
                }}
              >
                {l.icono}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Franja de comunidad */}
      {(miembros > 0 || admins > 0) && (
        <div
          className="flex flex-wrap gap-x-6 gap-y-1 border-t px-6 py-3 text-xs"
          style={{ borderColor: "rgba(244,240,222,0.10)", color: "var(--muted)" }}
        >
          {miembros > 0 && (
            <span>
              <span style={{ color: "var(--cream)", fontWeight: 600 }}>{miembros}</span> miembros
            </span>
          )}
          {admins > 0 && (
            <span>
              <span style={{ color: "var(--cream)", fontWeight: 600 }}>{admins}</span>{" "}
              {admins === 1 ? "admin" : "admins"}
            </span>
          )}
        </div>
      )}
    </section>
  );
}
