"use client";

import { useEffect, useState } from "react";
import { type Curso, type Leccion } from "@/lib/taller/content";
import {
  getVistas,
  setVista,
  getUltimaLeccion,
  setUltimaLeccion,
} from "@/lib/taller/progress";
import { trackTaller } from "@/lib/taller/analytics";
import VentaCTA from "@/components/taller/VentaCTA";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";
import ReproductorYouTube from "@/components/taller/ReproductorYouTube";
import DiplomaModal from "@/components/taller/DiplomaModal";

function ProgressRing({ pct }: { pct: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-11 w-11 shrink-0" aria-label={`${pct}% completado`}>
      <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" strokeWidth="4" stroke="rgba(244,240,222,0.12)" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
          stroke="var(--green)"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          style={{ transition: "stroke-dashoffset 0.4s" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tabular-nums">
        {pct}%
      </span>
    </div>
  );
}

export default function CursoClient({
  curso,
  desbloqueado,
}: {
  curso: Curso;
  desbloqueado: boolean;
}) {
  const primera = (): Leccion | null => {
    for (const m of curso.modulos) {
      if (!m.disponible) continue;
      const conVideo = m.lecciones.find((l) => l.youtubeId);
      if (conVideo) return conVideo;
    }
    return null;
  };

  // Sin sesión no se selecciona ninguna lección (no se expone ningún video).
  const [actual, setActual] = useState<Leccion | null>(desbloqueado ? primera : null);
  const [vistas, setVistas] = useState<Record<string, boolean>>({});
  const [cargado, setCargado] = useState(false);
  const [diplomaAbierto, setDiplomaAbierto] = useState(false);

  const idsDelCurso = new Set(
    curso.modulos.flatMap((m) => m.lecciones.map((l) => l.youtubeId)).filter(Boolean),
  );

  useEffect(() => {
    if (!desbloqueado) return;
    setVistas(getVistas());
    const ultima = getUltimaLeccion();
    if (ultima && idsDelCurso.has(ultima)) {
      for (const m of curso.modulos) {
        const l = m.lecciones.find((x) => x.youtubeId === ultima);
        if (l) {
          setActual(l);
          break;
        }
      }
    }
    setCargado(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curso.slug, desbloqueado]);

  // Abrir ya NO marca como vista: eso convertía el XP en un contador de
  // clics. La marca la dispara el reproductor al 80% de reproducción.
  function marcarCompletada(leccion: Leccion) {
    if (vistas[leccion.youtubeId]) return;
    setVista(leccion.youtubeId, true);
    setVistas((v) => ({ ...v, [leccion.youtubeId]: true }));
    trackTaller("taller_leccion_completada", { curso: curso.slug, leccion: leccion.titulo });
  }

  function abrirLeccion(leccion: Leccion) {
    setActual(leccion);
    setUltimaLeccion(leccion.youtubeId);
    trackTaller("taller_leccion_vista", { curso: curso.slug, leccion: leccion.titulo });
    // En móvil la lista va debajo del video, así que hay que subir. En
    // desktop la lista vive al costado y el reproductor ya está a la vista.
    if (window.innerWidth < 1024) window.scrollTo({ top: 0, behavior: "smooth" });
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

  const todasConVideo = curso.modulos
    .filter((m) => m.disponible)
    .flatMap((m) => m.lecciones)
    .filter((l) => l.youtubeId);
  const totalVistas = todasConVideo.filter((l) => vistas[l.youtubeId]).length;
  const pctGeneral =
    todasConVideo.length > 0
      ? Math.round((totalVistas / todasConVideo.length) * 100)
      : 0;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <a
        href="/taller/curso"
        className="text-sm transition-opacity hover:opacity-80"
        style={{ color: "var(--muted)" }}
      >
        ← Todos los cursos
      </a>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{curso.titulo}</h1>
          <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
            {curso.descripcion}
          </p>
        </div>
        {desbloqueado && cargado && todasConVideo.length > 0 && (
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

      {desbloqueado && cargado && todasConVideo.length > 0 && pctGeneral === 100 && (
        <div
          className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4"
          style={{ borderColor: "rgba(26,128,255,0.5)", background: "rgba(26,128,255,0.08)" }}
        >
          <p className="text-sm font-semibold">🎓 ¡Completaste el curso! Ya puedes sacar tu diploma.</p>
          <button
            type="button"
            onClick={() => setDiplomaAbierto(true)}
            className="rounded-xl px-4 py-2 text-xs font-bold transition-opacity hover:opacity-90"
            style={{ background: "var(--green)", color: "#fff" }}
          >
            Ver mi diploma →
          </button>
        </div>
      )}

      {diplomaAbierto && (
        <DiplomaModal cursoTitulo={curso.titulo} onClose={() => setDiplomaAbierto(false)} />
      )}

      {!desbloqueado && (
        <div className="mt-6">
          <DesbloquearBanner />
        </div>
      )}

      {/* Reproductor a la izquierda y lista de módulos al costado (estilo
          Skool). En móvil se apila: primero el video, después la lista. */}
      <div className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8">
      {/* Reproductor: sólo con sesión se carga el video real */}
      {desbloqueado && actual ? (
        <div>
          <ReproductorYouTube
            youtubeId={actual.youtubeId}
            titulo={actual.titulo}
            onCompletado={() => marcarCompletada(actual)}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium">▶ {actual.titulo}</p>
            {cargado && (
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {vistas[actual.youtubeId]
                  ? "✓ Completada"
                  : "Se marca sola al llegar al 80%"}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border px-6 py-16 text-center"
          style={{
            aspectRatio: "16 / 9",
            borderColor: "rgba(244,240,222,0.12)",
            background: "var(--surface)",
          }}
        >
          <span className="text-4xl">{desbloqueado ? "▶" : "🔒"}</span>
          <p className="text-sm font-semibold">
            {desbloqueado
              ? "Los videos de este curso se publican pronto."
              : "Contenido para alumnos"}
          </p>
          {!desbloqueado && (
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Desbloquea con tu contraseña para reproducir las clases.
            </p>
          )}
        </div>
      )}

      {/* Módulos: columna lateral con scroll propio en desktop */}
      <aside className="mt-8 space-y-3 lg:sticky lg:top-6 lg:mt-0 lg:max-h-[calc(100vh-3rem)] lg:space-y-2 lg:overflow-y-auto lg:pr-1">
        {curso.modulos.map((modulo, i) => {
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
              <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--green)" }}
                  >
                    Módulo {i + 1}
                    {desbloqueado && cargado && modulo.disponible && conVideo.length > 0 && (
                      <span style={{ color: "var(--muted)" }}>
                        {" "}· {vistasModulo}/{conVideo.length} vistas
                      </span>
                    )}
                  </p>
                  <h2 className="mt-1 font-semibold">{modulo.titulo}</h2>
                  {/* En la columna lateral la descripción no cabe: solo móvil. */}
                  <p className="mt-1 text-sm lg:hidden" style={{ color: "var(--muted)" }}>
                    {modulo.descripcion}
                  </p>
                </div>
                {!modulo.disponible ? (
                  <span
                    className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider"
                    style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }}
                  >
                    🔒 Próximamente
                  </span>
                ) : desbloqueado && cargado && conVideo.length > 0 ? (
                  <ProgressRing pct={Math.round((vistasModulo / conVideo.length) * 100)} />
                ) : !desbloqueado ? (
                  <span className="shrink-0 text-lg" aria-label="Bloqueado">
                    🔒
                  </span>
                ) : null}
              </div>

              {modulo.disponible && (
                <ul
                  className="border-t"
                  style={{ borderColor: "rgba(244,240,222,0.08)" }}
                >
                  {modulo.lecciones.map((leccion) => {
                    const tieneVideo = leccion.youtubeId !== "";
                    const activa =
                      desbloqueado && tieneVideo && actual?.youtubeId === leccion.youtubeId;
                    const vista = desbloqueado && cargado && tieneVideo && !!vistas[leccion.youtubeId];
                    // Sin sesión, ninguna lección es abrible.
                    const abrible = desbloqueado && tieneVideo;
                    return (
                      <li
                        key={leccion.titulo}
                        className="flex items-center"
                        style={{
                          background: activa ? "rgba(26,128,255,0.12)" : "transparent",
                        }}
                      >
                        {desbloqueado ? (
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
                        ) : (
                          <span className="ml-4 shrink-0 text-sm" aria-label="Bloqueado">
                            🔒
                          </span>
                        )}
                        <button
                          type="button"
                          disabled={!abrible}
                          onClick={() => abrirLeccion(leccion)}
                          className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[13px] leading-snug transition-colors disabled:cursor-not-allowed"
                          style={{ color: abrible ? "var(--cream)" : "var(--muted)" }}
                        >
                          <span>
                            {activa ? "▶ " : ""}
                            {leccion.titulo}
                            {desbloqueado && !tieneVideo && " · disponible pronto"}
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

              {modulo.disponible && modulo.pptUrl && desbloqueado && (
                <div
                  className="border-t px-4 py-3"
                  style={{ borderColor: "rgba(244,240,222,0.08)" }}
                >
                  <a
                    href={modulo.pptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-medium transition-opacity hover:opacity-80"
                    style={{ color: "var(--green)" }}
                  >
                    📊 Ver la presentación de este módulo →
                  </a>
                </div>
              )}
            </section>
          );
        })}
      </aside>
      </div>

      {/* Recursos del curso (abren su página de detalle en la bóveda) */}
      {curso.recursos.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold">Recursos del curso</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {curso.recursos.map((r) => (
              <a
                key={r.slug}
                href={`/taller/recursos/${r.slug}`}
                className="flex flex-col rounded-2xl border p-5 transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(244,240,222,0.12)",
                  background: "var(--surface)",
                  opacity: desbloqueado && r.disponible ? 1 : 0.7,
                }}
              >
                <p className="font-semibold">
                  {desbloqueado ? "📂" : "🔒"} {r.titulo}
                </p>
                <p className="mt-1 flex-1 text-sm" style={{ color: "var(--muted)" }}>
                  {r.descripcion}
                </p>
                <p className="mt-3 text-xs font-medium" style={{ color: "var(--green)" }}>
                  {desbloqueado ? "Abrir →" : "🔒 Desbloquea para abrir"}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      {desbloqueado && <VentaCTA />}
    </main>
  );
}
