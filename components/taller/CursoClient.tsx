"use client";

import { useEffect, useState } from "react";
import { type Curso, type Leccion, idProgreso } from "@/lib/taller/content";
import { NIVELES, calcularGamificacion } from "@/lib/taller/gamificacion";
import {
  getVistas,
  setVista,
  getUltimaLeccion,
  setUltimaLeccion,
} from "@/lib/taller/progress";
import { trackTaller } from "@/lib/taller/analytics";
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
  slugsGratis = [],
}: {
  curso: Curso;
  desbloqueado: boolean;
  // Slugs de artículos públicos: sus lecciones se muestran abiertas sin
  // sesión en vez de con candado (lo calcula la página, server-side).
  slugsGratis?: string[];
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
    curso.modulos.flatMap((m) => m.lecciones.map(idProgreso)).filter(Boolean),
  );

  useEffect(() => {
    if (!desbloqueado) return;
    setVistas(getVistas());
    const ultima = getUltimaLeccion();
    if (ultima && idsDelCurso.has(ultima)) {
      for (const m of curso.modulos) {
        const l = m.lecciones.find((x) => idProgreso(x) === ultima);
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
    const id = idProgreso(leccion);
    if (!id || vistas[id]) return;
    setVista(id, true);
    setVistas((v) => ({ ...v, [id]: true }));
    trackTaller("taller_leccion_completada", { curso: curso.slug, leccion: leccion.titulo });
  }

  function abrirLeccion(leccion: Leccion) {
    setActual(leccion);
    setUltimaLeccion(idProgreso(leccion));
    trackTaller("taller_leccion_vista", { curso: curso.slug, leccion: leccion.titulo });
    // En móvil la lista va debajo del video, así que hay que subir. En
    // desktop la lista vive al costado y el reproductor ya está a la vista.
    if (window.innerWidth < 1024) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleVista(leccion: Leccion) {
    const id = idProgreso(leccion);
    if (!id) return;
    const nueva = !vistas[id];
    setVista(id, nueva);
    setVistas((v) => {
      const copia = { ...v };
      if (nueva) copia[id] = true;
      else delete copia[id];
      return copia;
    });
  }

  // Lecciones que cuentan para el progreso: con video o con artículo.
  const todasConContenido = curso.modulos
    .filter((m) => m.disponible)
    .flatMap((m) => m.lecciones)
    .filter((l) => idProgreso(l));
  const totalVistas = todasConContenido.filter((l) => vistas[idProgreso(l)]).length;
  const pctGeneral =
    todasConContenido.length > 0
      ? Math.round((totalVistas / todasConContenido.length) * 100)
      : 0;

  // Módulos que se abren por nivel de XP: el nivel sale del mismo
  // progreso local que pinta GamificacionHeader.
  const nivelActual = cargado ? calcularGamificacion(vistas).nivel : 1;

  // Curso escrito: todo lo publicado son artículos, ni una lección con
  // video. No se pinta reproductor — un recuadro vacío de media pantalla
  // no aporta nada. El temario pasa a ser el contenido de la página.
  const esCursoEscrito =
    todasConContenido.length > 0 && todasConContenido.every((l) => !l.youtubeId);

  // ── Orden sugerido ────────────────────────────────────────────
  // El curso está pensado para hacerse en orden y el temario lo señala,
  // pero NADA se bloquea: cualquier lección se abre cuando el alumno
  // quiera. Esto solo marca cuál es la siguiente sin terminar.
  const proximaId = cargado
    ? (todasConContenido.find((l) => !vistas[idProgreso(l)]) ?? null)
    : null;

  return (
    <main className={`mx-auto px-5 py-10 ${esCursoEscrito ? "max-w-4xl" : "max-w-7xl"}`}>
      <a
        href="/taller/curso"
        className="text-sm transition-opacity hover:opacity-80"
        style={{ color: "var(--muted)" }}
      >
        ← Todos los cursos
      </a>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          {/* Parte de un curso largo: de dónde sale y cómo volver al todo. */}
          {curso.parteDe && (
            <p className="mb-1 text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--green)" }}>
              {curso.parteDe.cursoTitulo} · Parte {curso.parteDe.indice} de {curso.parteDe.total}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold sm:text-3xl">{curso.titulo}</h1>
            {/* Bonus: viene incluido pero no es parte de la malla. */}
            {curso.bonus && (
              <span
                className="shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider"
                style={{ borderColor: "rgba(255,209,102,0.5)", color: "#FFD166" }}
              >
                ★ Bonus · fuera de la malla
              </span>
            )}
          </div>
          <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
            {curso.descripcion}
          </p>
          {curso.parteDe && (
            <a
              href={`/taller/curso/${curso.parteDe.cursoSlug}`}
              className="mt-2 inline-block text-xs font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--green)" }}
            >
              Ver el programa completo, sus recursos y el diploma →
            </a>
          )}
        </div>
        {desbloqueado && cargado && todasConContenido.length > 0 && (
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

      {/* El diploma es del programa completo, no de una parte suelta. */}
      {!curso.parteDe && desbloqueado && cargado && todasConContenido.length > 0 && pctGeneral === 100 && (
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
          Skool). En móvil se apila: primero el video, después la lista.
          En un curso escrito no hay columna de reproductor: el temario
          ocupa la página entera. */}
      <div
        className={
          esCursoEscrito
            ? "mt-6"
            : "mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8"
        }
      >
      {/* Reproductor: sólo con sesión se carga el video real */}
      {esCursoEscrito ? null : desbloqueado && actual ? (
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
          {/* Solo se llega aquí en cursos con video: los escritos no
              pintan reproductor. */}
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

      {/* Módulos: columna lateral con scroll propio en desktop. En un
          curso escrito es el contenido principal, a ancho completo. */}
      <aside
        className={
          esCursoEscrito
            ? "space-y-3"
            : "mt-8 space-y-3 lg:sticky lg:top-6 lg:mt-0 lg:max-h-[calc(100vh-3rem)] lg:space-y-2 lg:overflow-y-auto lg:pr-1"
        }
      >
        {curso.modulos.map((modulo, i) => {
          const conContenido = modulo.lecciones.filter((l) => idProgreso(l));
          const vistasModulo = conContenido.filter((l) => vistas[idProgreso(l)]).length;
          const nivelRequerido = modulo.requiereNivel ?? 0;
          const nombreNivel = nivelRequerido > 0 ? (NIVELES[nivelRequerido - 1]?.nombre ?? "") : "";
          // Con sesión y progreso cargado: el módulo se cierra hasta el nivel.
          const bloqueadoPorNivel =
            desbloqueado && cargado && nivelRequerido > 0 && nivelActual < nivelRequerido;
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
                    {desbloqueado && cargado && modulo.disponible && conContenido.length > 0 && (
                      <span style={{ color: "var(--muted)" }}>
                        {" "}· {vistasModulo}/{conContenido.length} completadas
                      </span>
                    )}
                  </p>
                  <h2 className="mt-1 font-semibold">{modulo.titulo}</h2>
                  {/* En la columna lateral la descripción no cabe: solo móvil.
                      En un curso escrito hay ancho de sobra y sí se muestra. */}
                  <p
                    className={esCursoEscrito ? "mt-1 text-sm" : "mt-1 text-sm lg:hidden"}
                    style={{ color: "var(--muted)" }}
                  >
                    {modulo.descripcion}
                  </p>
                </div>
                {!modulo.disponible ? (
                  <span
                    className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider"
                    style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }}
                  >
                    🔒 Próximamente{nombreNivel ? ` · nivel ${nombreNivel}` : ""}
                  </span>
                ) : bloqueadoPorNivel ? (
                  <span
                    className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider"
                    style={{ borderColor: "rgba(255,209,102,0.45)", color: "#FFD166" }}
                    title={`Se abre al llegar al nivel ${nombreNivel}`}
                  >
                    🔒 Nivel {nombreNivel}
                  </span>
                ) : desbloqueado && cargado && conContenido.length > 0 ? (
                  <ProgressRing pct={Math.round((vistasModulo / conContenido.length) * 100)} />
                ) : !desbloqueado ? (
                  <span className="shrink-0 text-lg" aria-label="Bloqueado">
                    🔒
                  </span>
                ) : null}
              </div>

              {modulo.disponible && bloqueadoPorNivel && (
                <p
                  className="border-t px-4 py-3 text-xs leading-relaxed"
                  style={{ borderColor: "rgba(244,240,222,0.08)", color: "var(--muted)" }}
                >
                  Este módulo se abre al llegar al nivel {nombreNivel}. Cada lección
                  completada o artículo leído suma XP: sigue con lo que ya está abierto.
                </p>
              )}

              {modulo.disponible && !bloqueadoPorNivel && (
                <ul
                  className="border-t"
                  style={{ borderColor: "rgba(244,240,222,0.08)" }}
                >
                  {modulo.lecciones.map((leccion) => {
                    const tieneVideo = leccion.youtubeId !== "";
                    const id = idProgreso(leccion);
                    const activa =
                      desbloqueado && tieneVideo && actual?.youtubeId === leccion.youtubeId;
                    const vista = desbloqueado && cargado && id !== "" && !!vistas[id];
                    // Orden sugerido: se señala la siguiente pendiente,
                    // sin cerrar ninguna.
                    const esProxima =
                      proximaId !== null && id !== "" && idProgreso(proximaId) === id && !vista;
                    // Sin sesión, ninguna lección es abrible.
                    const abrible = desbloqueado && tieneVideo;
                    // Artículo público: se lee sin sesión, así que no lleva candado.
                    const abiertaSinSesion =
                      !tieneVideo && !!leccion.recursoSlug && slugsGratis.includes(leccion.recursoSlug);
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
                            disabled={id === ""}
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
                          <span
                            className="ml-4 shrink-0 text-sm"
                            aria-label={abiertaSinSesion ? "Lectura abierta" : "Bloqueado"}
                          >
                            {abiertaSinSesion ? "📖" : "🔒"}
                          </span>
                        )}
                        {/* Lección escrita: abre su artículo. Va con <a> y
                            no <Link> por el Router Cache (ver CLAUDE.md). */}
                        {leccion.recursoSlug && !tieneVideo ? (
                          <a
                            href={`/taller/recursos/${leccion.recursoSlug}`}
                            className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[13px] leading-snug transition-colors hover:opacity-80"
                            style={{ color: "var(--cream)" }}
                          >
                            <span>
                              {esProxima ? "→" : "📄"} {leccion.titulo}
                              {esProxima && (
                                <span
                                  className="ml-2 whitespace-nowrap text-[10px] uppercase tracking-wider"
                                  style={{ color: "var(--green)" }}
                                >
                                  sigue aquí
                                </span>
                              )}
                            </span>
                            <span className="shrink-0" style={{ color: "var(--muted)" }}>
                              {leccion.duracion}
                            </span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled={!abrible}
                            onClick={() => abrirLeccion(leccion)}
                            className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[13px] leading-snug transition-colors disabled:cursor-not-allowed"
                            style={{ color: abrible ? "var(--cream)" : "var(--muted)" }}
                          >
                            <span>
                              {activa ? "▶ " : esProxima ? "→ " : ""}
                              {leccion.titulo}
                              {desbloqueado && !tieneVideo && " · disponible pronto"}
                              {esProxima && !activa && (
                                <span
                                  className="ml-2 whitespace-nowrap text-[10px] uppercase tracking-wider"
                                  style={{ color: "var(--green)" }}
                                >
                                  sigue aquí
                                </span>
                              )}
                            </span>
                            <span
                              className="shrink-0 tabular-nums"
                              style={{ color: "var(--muted)" }}
                            >
                              {leccion.duracion}
                            </span>
                          </button>
                        )}
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

      {/* Navegación entre partes del mismo programa */}
      {curso.parteDe && (curso.parteDe.anterior || curso.parteDe.siguiente) && (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {curso.parteDe.anterior ? (
            <a
              href={`/taller/curso/${curso.parteDe.anterior.slug}`}
              className="rounded-2xl border px-4 py-3 transition-opacity hover:opacity-80"
              style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
            >
              <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                ← Parte anterior
              </p>
              <p className="mt-1 text-sm font-medium">{curso.parteDe.anterior.titulo}</p>
            </a>
          ) : (
            <span />
          )}
          {curso.parteDe.siguiente && (
            <a
              href={`/taller/curso/${curso.parteDe.siguiente.slug}`}
              className="rounded-2xl border px-4 py-3 text-right transition-opacity hover:opacity-80 sm:col-start-2"
              style={{ borderColor: "rgba(26,128,255,0.4)", background: "var(--surface)" }}
            >
              <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--green)" }}>
                Parte siguiente →
              </p>
              <p className="mt-1 text-sm font-medium">{curso.parteDe.siguiente.titulo}</p>
            </a>
          )}
        </div>
      )}

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

    </main>
  );
}
