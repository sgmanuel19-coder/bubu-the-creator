"use client";

import { useEffect, useState } from "react";
import { TALLER, type Leccion } from "@/lib/taller/content";
import {
  getVistas,
  setVista,
  getUltimaLeccion,
  setUltimaLeccion,
} from "@/lib/taller/progress";
import { trackTaller } from "@/lib/taller/analytics";
import VentaCTA from "@/components/taller/VentaCTA";

function primeraConVideo(): Leccion | null {
  for (const m of TALLER.modulos) {
    if (!m.disponible) continue;
    const conVideo = m.lecciones.find((l) => l.youtubeId);
    if (conVideo) return conVideo;
  }
  return null;
}

function buscarLeccion(youtubeId: string): Leccion | null {
  for (const m of TALLER.modulos) {
    const l = m.lecciones.find((x) => x.youtubeId === youtubeId);
    if (l) return l;
  }
  return null;
}

export default function CursoClient() {
  const [actual, setActual] = useState<Leccion | null>(primeraConVideo);
  // El progreso vive en localStorage: se lee tras montar para no romper
  // la hidratación (el servidor no conoce el progreso del alumno).
  const [vistas, setVistas] = useState<Record<string, boolean>>({});
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setVistas(getVistas());
    const ultima = getUltimaLeccion();
    if (ultima) {
      const l = buscarLeccion(ultima);
      if (l) setActual(l);
    }
    setCargado(true);
  }, []);

  function abrirLeccion(leccion: Leccion) {
    setActual(leccion);
    setUltimaLeccion(leccion.youtubeId);
    if (!vistas[leccion.youtubeId]) {
      setVista(leccion.youtubeId, true);
      setVistas((v) => ({ ...v, [leccion.youtubeId]: true }));
    }
    trackTaller("taller_leccion_vista", { leccion: leccion.titulo });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleVista(leccion: Leccion) {
    const nueva = !vistas[leccion.youtubeId];
    setVista(leccion.youtubeId, nueva);
    setVistas((v) => {
      const copia = { ...v };
      if (nueva) copia[leccion.youtubeId] = true;
      else delete copia[leccion.youtubeId];
      return copia;
    });
  }

  // Progreso general (solo lecciones que ya tienen video)
  const todasConVideo = TALLER.modulos
    .filter((m) => m.disponible)
    .flatMap((m) => m.lecciones)
    .filter((l) => l.youtubeId);
  const totalVistas = todasConVideo.filter((l) => vistas[l.youtubeId]).length;
  const pctGeneral =
    todasConVideo.length > 0
      ? Math.round((totalVistas / todasConVideo.length) * 100)
      : 0;

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Curso grabado</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Todos los módulos del taller, para verlos a tu ritmo cuando quieras.
          </p>
        </div>
        {cargado && todasConVideo.length > 0 && (
          <div className="min-w-[180px]">
            <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
              <span>Tu avance</span>
              <span style={{ color: "var(--cream)" }}>{pctGeneral}%</span>
            </div>
            <div
              className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full"
              style={{ background: "rgba(244,240,222,0.12)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pctGeneral}%`, background: "var(--green)" }}
              />
            </div>
          </div>
        )}
      </div>

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
        {TALLER.modulos.map((modulo, i) => {
          const conVideo = modulo.lecciones.filter((l) => l.youtubeId);
          const vistasModulo = conVideo.filter((l) => vistas[l.youtubeId]).length;
          return (
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
                    {cargado && modulo.disponible && conVideo.length > 0 && (
                      <span style={{ color: "var(--muted)" }}>
                        {" "}· {vistasModulo}/{conVideo.length} vistas
                      </span>
                    )}
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
                    const tieneVideo = leccion.youtubeId !== "";
                    const activa = tieneVideo && actual?.youtubeId === leccion.youtubeId;
                    const vista = cargado && tieneVideo && !!vistas[leccion.youtubeId];
                    return (
                      <li
                        key={leccion.titulo}
                        className="flex items-center"
                        style={{
                          background: activa ? "rgba(26,128,255,0.12)" : "transparent",
                        }}
                      >
                        {/* Check de visto (clic para marcar/desmarcar) */}
                        <button
                          type="button"
                          disabled={!tieneVideo}
                          onClick={() => toggleVista(leccion)}
                          aria-label={vista ? "Marcar como no vista" : "Marcar como vista"}
                          className="ml-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] disabled:opacity-30"
                          style={
                            vista
                              ? { background: "var(--green)", borderColor: "var(--green)", color: "#fff" }
                              : { borderColor: "rgba(244,240,222,0.3)", color: "transparent" }
                          }
                        >
                          ✓
                        </button>
                        <button
                          type="button"
                          disabled={!tieneVideo}
                          onClick={() => abrirLeccion(leccion)}
                          className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition-colors disabled:cursor-not-allowed"
                          style={{ color: tieneVideo ? "var(--cream)" : "var(--muted)" }}
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
          );
        })}
      </div>

      {/* Recursos descargables */}
      {TALLER.recursos.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold">Recursos del taller</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {TALLER.recursos.map((r) => (
              <div
                key={r.titulo}
                className="rounded-2xl border p-5"
                style={{
                  borderColor: "rgba(244,240,222,0.12)",
                  background: "var(--surface)",
                  opacity: r.disponible ? 1 : 0.55,
                }}
              >
                <p className="font-semibold">📎 {r.titulo}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  {r.descripcion}
                </p>
                {r.disponible && r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackTaller("taller_recurso", { recurso: r.titulo })}
                    className="mt-3 inline-block rounded-lg border px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                    style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
                  >
                    Descargar →
                  </a>
                ) : (
                  <p className="mt-3 text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Próximamente
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <VentaCTA />
    </main>
  );
}
