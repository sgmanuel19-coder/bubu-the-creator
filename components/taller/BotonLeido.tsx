"use client";

import { useEffect, useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { getVistas, setVista, EVENTO_LEIDO } from "@/lib/taller/progress";
import { XP_POR_LECCION } from "@/lib/taller/gamificacion";
import { trackTaller } from "@/lib/taller/analytics";

/**
 * "Lo leí" al pie de un artículo. Guarda la marca con la misma clave que
 * usa el curso (leido:<slug>), así un artículo suma XP y cuenta en el
 * anillo de progreso igual que un video visto al 80%.
 * Sin cuentas por alumno vive en localStorage, como todo el progreso.
 */
export default function BotonLeido({ slug, titulo }: { slug: string; titulo: string }) {
  const id = `leido:${slug}`;
  const [leido, setLeido] = useState(false);
  const [cargado, setCargado] = useState(false);

  // Solo suma XP si el artículo es lección de un curso publicado; una
  // guía suelta de la bóveda se marca igual, pero sin prometer puntos.
  const enCurso = TALLER.cursos.some(
    (c) =>
      c.disponible &&
      c.modulos.some((m) => m.disponible && m.lecciones.some((l) => l.recursoSlug === slug)),
  );

  useEffect(() => {
    setLeido(!!getVistas()[id]);
    setCargado(true);
    // El lector paso a paso marca solo al terminar la clase: hay que
    // reflejarlo aquí sin recargar la página.
    const onLeido = (e: Event) => {
      if ((e as CustomEvent<string>).detail === slug) setLeido(true);
    };
    window.addEventListener(EVENTO_LEIDO, onLeido);
    return () => window.removeEventListener(EVENTO_LEIDO, onLeido);
  }, [id, slug]);

  function toggle() {
    const nuevo = !leido;
    setVista(id, nuevo);
    setLeido(nuevo);
    if (nuevo) trackTaller("taller_leccion_completada", { leccion: titulo, formato: "articulo" });
  }

  return (
    <div
      className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4"
      style={{ borderColor: leido ? "var(--green)" : "rgba(244,240,222,0.12)", background: "var(--surface)" }}
    >
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {leido
          ? enCurso
            ? `Marcado como leído · +${XP_POR_LECCION} XP`
            : "Marcado como leído"
          : enCurso
            ? `¿Terminaste? Márcalo y suma ${XP_POR_LECCION} XP en tu progreso.`
            : "¿Terminaste? Márcalo para saber que ya lo leíste."}
      </p>
      <button
        type="button"
        onClick={toggle}
        disabled={!cargado}
        className="rounded-xl px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
        style={
          leido
            ? { border: "1px solid rgba(244,240,222,0.25)", color: "var(--cream)" }
            : { background: "var(--green)", color: "#fff" }
        }
      >
        {leido ? "✓ Leído" : "Lo leí"}
      </button>
    </div>
  );
}
