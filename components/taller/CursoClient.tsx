"use client";

import { useState } from "react";
import { TALLER, type Leccion } from "@/lib/taller/content";

export default function CursoClient() {
  const [actual, setActual] = useState<Leccion | null>(() => {
    for (const m of TALLER.modulos) {
      if (!m.disponible) continue;
      const conVideo = m.lecciones.find((l) => l.youtubeId);
      if (conVideo) return conVideo;
    }
    return null;
  });

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Curso grabado</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Todos los módulos del taller, para verlos a tu ritmo cuando quieras.
      </p>

      {/* Reproductor */}
      {actual ? (
        <div className="mt-6">
          <div
            className="relative w-full overflow-hidden rounded-2xl border"
            style={{ aspectRatio: "16 / 9", borderColor: "rgba(244,240,222,0.12)" }}
          >
            <iframe
              key={actual.youtubeId}
              src={`https://www.youtube-nocookie.com/embed/${actual.youtubeId}?rel=0&modestbranding=1`}
              title={actual.titulo}
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <p className="mt-3 text-sm font-medium">▶ {actual.titulo}</p>
        </div>
      ) : (
        <div
          className="mt-6 rounded-2xl border px-6 py-14 text-center text-sm"
          style={{
            borderColor: "rgba(244,240,222,0.12)",
            background: "var(--surface)",
            color: "var(--muted)",
          }}
        >
          Los videos del curso se publicarán aquí después del taller en vivo.
        </div>
      )}

      {/* Módulos */}
      <div className="mt-10 space-y-4">
        {TALLER.modulos.map((modulo, i) => (
          <section
            key={modulo.titulo}
            className="overflow-hidden rounded-2xl border"
            style={{
              borderColor: "rgba(244,240,222,0.12)",
              background: "var(--surface)",
              opacity: modulo.disponible ? 1 : 0.55,
            }}
          >
            <div className="flex items-start justify-between gap-4 px-5 py-4">
              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--green)" }}
                >
                  Módulo {i + 1}
                </p>
                <h2 className="mt-1 font-semibold">{modulo.titulo}</h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  {modulo.descripcion}
                </p>
              </div>
              {!modulo.disponible && (
                <span
                  className="shrink-0 rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider"
                  style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }}
                >
                  Próximamente
                </span>
              )}
            </div>

            {modulo.disponible && (
              <ul
                className="border-t"
                style={{ borderColor: "rgba(244,240,222,0.08)" }}
              >
                {modulo.lecciones.map((leccion) => {
                  const activa = actual?.youtubeId === leccion.youtubeId && leccion.youtubeId !== "";
                  const tieneVideo = leccion.youtubeId !== "";
                  return (
                    <li key={leccion.titulo}>
                      <button
                        type="button"
                        disabled={!tieneVideo}
                        onClick={() => {
                          setActual(leccion);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex w-full items-center justify-between gap-4 px-5 py-3 text-left text-sm transition-colors disabled:cursor-not-allowed"
                        style={{
                          background: activa ? "rgba(26,128,255,0.12)" : "transparent",
                          color: tieneVideo ? "var(--cream)" : "var(--muted)",
                        }}
                      >
                        <span>
                          {activa ? "▶ " : ""}
                          {leccion.titulo}
                          {!tieneVideo && " · disponible pronto"}
                        </span>
                        <span
                          className="shrink-0 tabular-nums"
                          style={{ color: "var(--muted)" }}
                        >
                          {leccion.duracion}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
