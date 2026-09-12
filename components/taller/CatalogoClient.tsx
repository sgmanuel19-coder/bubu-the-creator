"use client";

import { useEffect, useState } from "react";
import { TALLER, type Curso } from "@/lib/taller/content";
import { getVistas } from "@/lib/taller/progress";
import GamificacionHeader from "@/components/taller/GamificacionHeader";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";

const AMBAR = "#FFD166";

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

/** Título de sección con línea, para separar la malla de los bonus. */
function Separador({ titulo, nota }: { titulo: string; nota?: string }) {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-3">
        <h2 className="shrink-0 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
          {titulo}
        </h2>
        <span className="h-px flex-1" style={{ background: "rgba(244,240,222,0.12)" }} />
      </div>
      {nota && (
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          {nota}
        </p>
      )}
    </div>
  );
}

export default function CatalogoClient({ desbloqueado }: { desbloqueado: boolean }) {
  const [vistas, setVistas] = useState<Record<string, boolean>>({});
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setVistas(getVistas());
    setCargado(true);
  }, []);

  // La malla es la ruta del programa; los bonus vienen incluidos pero no
  // forman parte de ella y por eso van en su propia sección.
  const malla = TALLER.cursos.filter((c) => !c.bonus);
  const bonus = TALLER.cursos.filter((c) => c.bonus);

  function tarjeta(curso: Curso) {
    const lecciones = contarLecciones(curso);
    const pct = pctCurso(curso, vistas);
    const esBonus = Boolean(curso.bonus);

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
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{curso.titulo}</h3>
            {esBonus && (
              <span
                className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider"
                style={{ borderColor: "rgba(255,209,102,0.5)", color: AMBAR }}
              >
                ★ Bonus
              </span>
            )}
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
                      style={{ width: `${pct}%`, background: esBonus ? AMBAR : "var(--green)" }}
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
      borderColor: esBonus ? "rgba(255,209,102,0.35)" : "rgba(244,240,222,0.12)",
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
  }

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

      {bonus.length > 0 && <Separador titulo="La malla" nota="La ruta del programa, en orden." />}

      <div className={`grid gap-5 sm:grid-cols-2 ${bonus.length > 0 ? "mt-5" : "mt-8"}`}>
        {malla.map(tarjeta)}
      </div>

      {bonus.length > 0 && (
        <>
          <Separador
            titulo="Bonus incluidos"
            nota="No son parte de la malla: vienen con tu acceso y los tomas cuando quieras, o te los saltas."
          />
          <div className="mt-5 grid gap-5 sm:grid-cols-2">{bonus.map(tarjeta)}</div>
        </>
      )}
    </main>
  );
}
