"use client";

import { useEffect, useState } from "react";
import type { ItemTemario, Temario } from "@/lib/taller/content";
import { getVistas, getModoRuta, setModoRuta } from "@/lib/taller/progress";

/**
 * El temario del curso, visible mientras se lee un artículo: qué temas
 * hay, cuál estás leyendo y cuáles ya marcaste. Sin esto, abrir un
 * artículo te saca del curso y pierdes la referencia de dónde estás.
 *
 * Con la RUTA GUIADA activa (por defecto), cada tema se abre al terminar
 * el anterior. El interruptor "Ver todo" la apaga y deja saltar libre.
 *
 * Los enlaces van con <a> y no <Link> por el Router Cache (ver CLAUDE.md).
 */

const AMBAR = "#FFD166";

function planos(temario: Temario): ItemTemario[] {
  return temario.modulos.flatMap((m) => m.lecciones);
}

/**
 * Con la ruta activa, un tema está cerrado si hay alguno anterior sin
 * terminar. Los gratis nunca se cierran (son la puerta de entrada) y
 * los ya leídos siempre se pueden repasar.
 */
export function estadoDeRuta(
  lista: ItemTemario[],
  leidos: Record<string, boolean>,
  slug: string,
): { cerrado: boolean; pendiente?: ItemTemario } {
  const i = lista.findIndex((l) => l.slug === slug);
  if (i < 0 || lista[i].gratis) return { cerrado: false };
  const idxPendiente = lista.findIndex((l) => !leidos[`leido:${l.slug}`]);
  if (idxPendiente < 0 || i <= idxPendiente) return { cerrado: false };
  return { cerrado: true, pendiente: lista[idxPendiente] };
}

// El toggle vive en varios componentes de la misma página: este evento
// los mantiene sincronizados sin montar un contexto para dos lugares.
const EVENTO_RUTA = "taller:ruta";

function cambiarRuta(activa: boolean) {
  setModoRuta(activa);
  window.dispatchEvent(new CustomEvent(EVENTO_RUTA, { detail: activa }));
}

/** Lee el modo ruta y se mantiene al día con el toggle de la página. */
export function useModoRuta(): { ruta: boolean; cargado: boolean } {
  const [ruta, setRuta] = useState(true);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setRuta(getModoRuta());
    setCargado(true);
    const onCambio = (e: Event) => setRuta((e as CustomEvent<boolean>).detail);
    window.addEventListener(EVENTO_RUTA, onCambio);
    return () => window.removeEventListener(EVENTO_RUTA, onCambio);
  }, []);

  return { ruta, cargado };
}

export function ToggleRuta({ compacto = false }: { compacto?: boolean }) {
  const { ruta, cargado } = useModoRuta();
  if (!cargado) return null;
  return (
    <button
      type="button"
      onClick={() => cambiarRuta(!ruta)}
      className={`rounded-full border transition-opacity hover:opacity-80 ${
        compacto ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"
      } uppercase tracking-wider`}
      style={
        ruta
          ? { borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }
          : { borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }
      }
      title={
        ruta
          ? "Los temas se abren en orden. Toca para ver el temario completo."
          : "Temario abierto. Toca para volver a la ruta en orden."
      }
    >
      {ruta ? "🔒 Ruta en orden" : "🔓 Ver todo"}
    </button>
  );
}

export default function TemarioCurso({
  temario,
  actual,
}: {
  temario: Temario;
  actual: string;
}) {
  const [leidos, setLeidos] = useState<Record<string, boolean>>({});
  const [cargado, setCargado] = useState(false);
  const { ruta } = useModoRuta();

  useEffect(() => {
    setLeidos(getVistas());
    setCargado(true);
  }, []);

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
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
          {posicion >= 0 && (
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Tema {posicion + 1} de {lista.length}
            </p>
          )}
          <ToggleRuta compacto />
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto lg:max-h-[calc(100vh-16rem)]">
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
                const { cerrado } = cargado && ruta
                  ? estadoDeRuta(lista, leidos, l.slug)
                  : { cerrado: false };
                const bloqueado = cerrado && !esActual;
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
                        opacity: bloqueado ? 0.45 : 1,
                      }}
                      title={bloqueado ? "Se abre al terminar el tema anterior" : undefined}
                    >
                      <span aria-hidden className="shrink-0">
                        {leido ? "✓" : esActual ? "📖" : bloqueado ? "🔒" : "·"}
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

/**
 * Puerta de la ruta guiada: si llegaste a un tema saltándote uno
 * anterior, el contenido espera detrás de este aviso. No es un candado
 * de seguridad — el texto ya viajó en el HTML, y se puede abrir con
 * "Leer igual". Es una guía de orden, que es justo lo que hace falta.
 */
export function PuertaRuta({
  temario,
  actual,
  children,
}: {
  temario: Temario;
  actual: string;
  children: React.ReactNode;
}) {
  const [leidos, setLeidos] = useState<Record<string, boolean>>({});
  const [cargado, setCargado] = useState(false);
  const [forzado, setForzado] = useState(false);
  const { ruta } = useModoRuta();

  useEffect(() => {
    setLeidos(getVistas());
    setCargado(true);
  }, []);

  // Antes de leer el progreso se muestra el contenido: así el HTML del
  // servidor y el primer render del navegador coinciden.
  if (!cargado || !ruta || forzado) return <>{children}</>;

  const { cerrado, pendiente } = estadoDeRuta(planos(temario), leidos, actual);
  if (!cerrado || !pendiente) return <>{children}</>;

  return (
    <div
      className="mt-8 rounded-2xl border border-dashed px-6 py-10 text-center"
      style={{ borderColor: "rgba(255,209,102,0.45)", background: "rgba(255,209,102,0.05)" }}
    >
      <p className="text-3xl" aria-hidden>
        🔒
      </p>
      <p className="mt-2 text-sm font-semibold" style={{ color: AMBAR }}>
        Este tema se abre cuando termines el anterior
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        El curso está pensado para hacerse en orden: cada tema se apoya en el de
        antes. Te falta terminar <strong style={{ color: "var(--cream)" }}>{pendiente.titulo}</strong>.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`/taller/recursos/${pendiente.slug}`}
          className="rounded-xl px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-90"
          style={{ background: "var(--green)", color: "#fff" }}
        >
          Ir a ese tema →
        </a>
        <button
          type="button"
          onClick={() => setForzado(true)}
          className="rounded-xl border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
        >
          Leer igual
        </button>
      </div>
      <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
        ¿Prefieres moverte libre? Apaga la ruta con «Ver todo» en el temario.
      </p>
    </div>
  );
}
