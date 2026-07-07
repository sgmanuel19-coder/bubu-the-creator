"use client";

import { useEffect, useState } from "react";
import { TALLER, type Curso } from "@/lib/taller/content";
import { getVistas } from "@/lib/taller/progress";
import GamificacionHeader from "@/components/taller/GamificacionHeader";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";

function pctCurso(curso: Curso, vistas: Record<string, boolean>): number {
  const conVideo = curso.modulos
    .filter((m) => m.disponible)
    .flatMap((m) => m.lecciones)
    .filter((l) => l.youtubeId);
  if (conVideo.length === 0) return 0;
  const total = conVideo.filter((l) => vistas[l.youtubeId]).length;
  return Math.round((total / conVideo.length) * 100);
}

function contarLecciones(curso: Curso): number {
  return curso.modulos.reduce((n, m) => n + m.lecciones.length, 0);
}

export default function CatalogoClient({ desbloqueado }: { desbloqueado: boolean }) {
  const [vistas, setVistas] = useState<Record<string, boolean>>({});
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setVistas(getVistas());
    setCargado(true);
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <GamificacionHeader />

      <h1 className="mt-10 text-2xl font-bold sm:text-3xl">
        {desbloqueado ? "Tus cursos" : "Cursos"}
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Todo tu Classroom en un solo lugar. Entra a un curso para ver sus módulos.
      </p>

      {!desbloqueado && (
        <div className="mt-6">
          <DesbloquearBanner />
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {TALLER.cursos.map((curso) => {
          const lecciones = contarLecciones(curso);
          const pct = pctCurso(curso, vistas);
          const contenido = (
            <>
              {/* Portada */}
              <div
                className="flex h-36 items-center justify-center text-6xl"
                style={{ background: curso.portada.color }}
              >
                {curso.portada.emoji}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">{curso.titulo}</h2>
                  {!curso.disponible ? (
                    <span
                      className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider"
                      style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }}
                    >
                      🔒 Pronto
                    </span>
                  ) : (
                    !desbloqueado && (
                      <span
                        className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider"
                        style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
                      >
                        🔒 Bloqueado
                      </span>
                    )
                  )}
                </div>
                <p className="mt-1 flex-1 text-sm" style={{ color: "var(--muted)" }}>
                  {curso.descripcion}
                </p>

                {curso.disponible ? (
                  <>
                    <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
                      {curso.modulos.length} módulos · {lecciones} lecciones
                    </p>
                    {!desbloqueado ? (
                      <p className="mt-2 text-xs font-medium" style={{ color: "var(--green)" }}>
                        Desbloquea para ver los videos →
                      </p>
                    ) : cargado && (
                      <div className="mt-2">
                        <div
                          className="flex items-center justify-between text-xs"
                          style={{ color: "var(--muted)" }}
                        >
                          <span>{pct === 0 ? "Empezar" : pct === 100 ? "Completado ✓" : "Continuar"}</span>
                          <span style={{ color: "var(--cream)" }}>{pct}%</span>
                        </div>
                        <div
                          className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full"
                          style={{ background: "rgba(244,240,222,0.12)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${pct}%`, background: "var(--green)" }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="mt-4 text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Muy pronto
                  </p>
                )}
              </div>
            </>
          );

          const cardStyle: React.CSSProperties = {
            borderColor: "rgba(244,240,222,0.12)",
            background: "var(--surface)",
            opacity: !curso.disponible ? 0.6 : desbloqueado ? 1 : 0.85,
          };

          return curso.disponible ? (
            <a
              key={curso.slug}
              href={`/taller/curso/${curso.slug}`}
              className="flex flex-col overflow-hidden rounded-2xl border transition-transform hover:-translate-y-0.5"
              style={cardStyle}
            >
              {contenido}
            </a>
          ) : (
            <div
              key={curso.slug}
              className="flex cursor-not-allowed flex-col overflow-hidden rounded-2xl border"
              style={cardStyle}
            >
              {contenido}
            </div>
          );
        })}
      </div>
    </main>
  );
}
