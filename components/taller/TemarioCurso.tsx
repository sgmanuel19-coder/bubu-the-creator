"use client";

import { useEffect, useState } from "react";
import type { Temario } from "@/lib/taller/content";
import { getVistas } from "@/lib/taller/progress";

/**
 * El temario del curso, visible mientras se lee un artículo: qué temas
 * hay, cuál estás leyendo y cuáles ya marcaste. Sin esto, abrir un
 * artículo te saca del curso y pierdes la referencia de dónde estás.
 *
 * Los enlaces van con <a> y no <Link> por el Router Cache (ver CLAUDE.md).
 */

function planos(temario: Temario) {
  return temario.modulos.flatMap((m) => m.lecciones);
}

export default function TemarioCurso({
  temario,
  actual,
}: {
  temario: Temario;
  actual: string;
}) {
  const [leidos, setLeidos] = useState<Record<string, boolean>>({});
  useEffect(() => setLeidos(getVistas()), []);

  const lista = planos(temario);
  const posicion = lista.findIndex((l) => l.slug === actual);

  return (
    <nav
      className="rounded-2xl border"
      style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
      aria-label={`Temario de ${temario.cursoTitulo}`}
    >
      <div className="border-b px-4 py-3.5" style={{ borderColor: "rgba(244,240,222,0.08)" }}>
        <a
          href={`/taller/curso/${temario.cursoSlug}`}
          className="text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
          style={{ color: "var(--green)" }}
        >
          ← {temario.cursoTitulo}
        </a>
        {posicion >= 0 && (
          <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            Tema {posicion + 1} de {lista.length}
          </p>
        )}
      </div>

      <div className="max-h-[60vh] overflow-y-auto lg:max-h-[calc(100vh-14rem)]">
        {temario.modulos.map((modulo) => (
          <div key={modulo.titulo}>
            {temario.modulos.length > 1 && (
              <p
                className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                {modulo.titulo}
              </p>
            )}
            <ul>
              {modulo.lecciones.map((l) => {
                const esActual = l.slug === actual;
                const leido = !!leidos[`leido:${l.slug}`];
                return (
                  <li key={l.slug}>
                    <a
                      href={`/taller/recursos/${l.slug}`}
                      aria-current={esActual ? "page" : undefined}
                      className="flex gap-2.5 border-l-2 px-3.5 py-2.5 text-[13px] leading-snug transition-colors"
                      style={{
                        borderColor: esActual ? "var(--green)" : "transparent",
                        background: esActual ? "rgba(26,128,255,0.12)" : "transparent",
                        color: esActual ? "var(--cream)" : "var(--muted)",
                        fontWeight: esActual ? 600 : 400,
                      }}
                    >
                      <span aria-hidden className="shrink-0">
                        {leido ? "✓" : esActual ? "📖" : "·"}
                      </span>
                      <span>{l.titulo}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

/** Anterior y siguiente al pie del artículo, para leer de corrido. */
export function NavTemario({ temario, actual }: { temario: Temario; actual: string }) {
  const lista = planos(temario);
  const i = lista.findIndex((l) => l.slug === actual);
  if (i < 0) return null;
  const anterior = i > 0 ? lista[i - 1] : null;
  const siguiente = i < lista.length - 1 ? lista[i + 1] : null;
  if (!anterior && !siguiente) return null;

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {anterior ? (
        <a
          href={`/taller/recursos/${anterior.slug}`}
          className="rounded-2xl border px-4 py-3 transition-opacity hover:opacity-80"
          style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
        >
          <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            ← Anterior
          </p>
          <p className="mt-1 text-sm font-medium">{anterior.titulo}</p>
        </a>
      ) : (
        <span />
      )}
      {siguiente && (
        <a
          href={`/taller/recursos/${siguiente.slug}`}
          className="rounded-2xl border px-4 py-3 text-right transition-opacity hover:opacity-80 sm:col-start-2"
          style={{ borderColor: "rgba(26,128,255,0.4)", background: "var(--surface)" }}
        >
          <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--green)" }}>
            Siguiente →
          </p>
          <p className="mt-1 text-sm font-medium">{siguiente.titulo}</p>
        </a>
      )}
    </div>
  );
}
