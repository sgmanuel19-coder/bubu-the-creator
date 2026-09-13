"use client";

import { useEffect, useState } from "react";
import type { BloqueRecurso, SeccionRecurso } from "@/lib/taller/content";
import { getModoPasos, setModoPasos, marcarLeido } from "@/lib/taller/progress";

/**
 * Renderiza una guía a fondo: secciones numeradas con párrafos, listas,
 * pasos, tablas, prompts copiables y notas — el formato artículo de la
 * bóveda. Solo recibe las secciones cuando el server decidió que el
 * visitante tiene el nivel correcto (el candado vive en la página).
 */

function BotonCopiar({ contenido }: { contenido: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(contenido).then(() => {
          setCopiado(true);
          setTimeout(() => setCopiado(false), 1600);
        });
      }}
      className="shrink-0 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-opacity hover:opacity-80"
      style={{
        borderColor: copiado ? "var(--green)" : "rgba(244,240,222,0.25)",
        color: copiado ? "var(--green)" : "var(--cream)",
      }}
    >
      {copiado ? "✓ Copiado" : "Copiar"}
    </button>
  );
}

function Bloque({
  bloque,
  onRespuesta,
}: {
  bloque: BloqueRecurso;
  // Solo lo usa el bloque "pregunta": avisa al lector paso a paso si la
  // respuesta fue correcta, para habilitar el botón de avanzar.
  onRespuesta?: (correcta: boolean) => void;
}) {
  switch (bloque.tipo) {
    case "parrafo":
      return (
        <p className="text-sm leading-relaxed" style={{ color: "var(--cream)" }}>
          {bloque.texto}
        </p>
      );

    case "lista":
      return (
        <ul className="space-y-1.5">
          {bloque.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--cream)" }}>
              <span style={{ color: "var(--green)" }}>·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "pasos":
      return (
        <ol className="space-y-3">
          {bloque.items.map((paso, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: "rgba(26,128,255,0.15)", color: "var(--green)" }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold">{paso.titulo}</p>
                <p className="mt-0.5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {paso.detalle}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "tabla":
      return (
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "rgba(244,240,222,0.12)" }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: "rgba(244,240,222,0.05)" }}>
                {bloque.columnas.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloque.filas.map((fila, i) => (
                <tr key={i} className="border-t" style={{ borderColor: "rgba(244,240,222,0.08)" }}>
                  {fila.map((celda, j) => (
                    <td key={j} className="px-4 py-2.5 align-top text-sm leading-relaxed"
                      style={{ color: j === 0 ? "var(--cream)" : "var(--muted)" }}>
                      {celda}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "copiable":
      return (
        <div className="rounded-xl border" style={{ borderColor: "rgba(26,128,255,0.35)" }}>
          <div
            className="flex items-center justify-between gap-3 border-b px-4 py-2.5"
            style={{ borderColor: "rgba(26,128,255,0.2)" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--green)" }}>
              {bloque.etiqueta}
            </p>
            <BotonCopiar contenido={bloque.contenido} />
          </div>
          <pre
            className="overflow-x-auto whitespace-pre-wrap px-4 py-3 font-mono text-xs leading-relaxed"
            style={{ color: "var(--cream)" }}
          >
            {bloque.contenido}
          </pre>
        </div>
      );

    case "nota":
      return (
        <div
          className="rounded-xl border-l-4 px-4 py-3 text-sm leading-relaxed"
          style={{
            borderColor: "#FFD166",
            background: "rgba(255,209,102,0.07)",
            color: "var(--cream)",
          }}
        >
          {bloque.texto}
        </div>
      );

    case "cita":
      return (
        <blockquote
          className="border-l-2 pl-4 text-base font-medium italic leading-relaxed"
          style={{ borderColor: "var(--green)", color: "var(--cream)" }}
        >
          «{bloque.texto}»
        </blockquote>
      );

    case "imagen":
      // Sin src todavía: se pinta el hueco con la descripción exacta de
      // qué imagen va ahí. Así el artículo se publica completo de texto y
      // las imágenes se van rellenando después sin tocar la redacción.
      if (!bloque.src) return <HuecoMedia bloque={bloque} />;
      return (
        <figure className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bloque.src}
            alt={bloque.alt}
            loading="lazy"
            className="w-full rounded-xl border"
            style={{ borderColor: "rgba(244,240,222,0.12)" }}
          />
          {bloque.pie && (
            <figcaption className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {bloque.pie}
            </figcaption>
          )}
        </figure>
      );

    case "video":
      if (!bloque.youtubeId) return <HuecoMedia bloque={bloque} />;
      return (
        <figure className="space-y-2">
          <div
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: "rgba(244,240,222,0.12)", aspectRatio: "16 / 9" }}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${bloque.youtubeId}`}
              title={bloque.titulo}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          {bloque.pie && (
            <figcaption className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {bloque.pie}
            </figcaption>
          )}
        </figure>
      );

    case "enlace":
      return (
        <a
          href={bloque.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 rounded-xl border px-4 py-3 transition-opacity hover:opacity-80"
          style={{ borderColor: "rgba(26,128,255,0.35)", background: "rgba(26,128,255,0.06)" }}
        >
          <span style={{ color: "var(--green)" }}>↗</span>
          <span>
            <span className="block text-sm font-semibold" style={{ color: "var(--cream)" }}>
              {bloque.texto}
            </span>
            {bloque.nota && (
              <span className="mt-0.5 block text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                {bloque.nota}
              </span>
            )}
          </span>
        </a>
      );

    case "pregunta":
      return <Pregunta bloque={bloque} onRespuesta={onRespuesta} />;
  }
}

const VERDE = "#4CC78A";
const ROJO = "#FF7A66";

/** Comprobación de lectura: una opción correcta y por qué lo es. */
function Pregunta({
  bloque,
  onRespuesta,
}: {
  bloque: Extract<BloqueRecurso, { tipo: "pregunta" }>;
  onRespuesta?: (correcta: boolean) => void;
}) {
  const [elegida, setElegida] = useState<number | null>(null);
  const acerto = elegida === bloque.correcta;

  function responder(i: number) {
    if (acerto) return; // ya resuelta: no se cambia
    setElegida(i);
    onRespuesta?.(i === bloque.correcta);
  }

  return (
    <div
      className="rounded-xl border px-4 py-4"
      style={{ borderColor: "rgba(26,128,255,0.35)", background: "rgba(26,128,255,0.06)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--green)" }}>
        Comprueba que lo pillaste
      </p>
      <p className="mt-2 text-sm font-semibold leading-snug">{bloque.enunciado}</p>
      <div className="mt-3 space-y-2">
        {bloque.opciones.map((opcion, i) => {
          const esta = elegida === i;
          const correcta = i === bloque.correcta;
          const marcar = esta || (acerto && correcta);
          return (
            <button
              key={i}
              type="button"
              onClick={() => responder(i)}
              disabled={acerto}
              className="flex w-full items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-sm leading-snug transition-opacity hover:opacity-80 disabled:cursor-default"
              style={{
                borderColor: marcar
                  ? correcta
                    ? VERDE
                    : ROJO
                  : "rgba(244,240,222,0.2)",
                background: marcar
                  ? correcta
                    ? "rgba(76,199,138,0.12)"
                    : "rgba(255,122,102,0.10)"
                  : "transparent",
                color: "var(--cream)",
              }}
            >
              <span aria-hidden className="shrink-0" style={{ color: marcar ? (correcta ? VERDE : ROJO) : "var(--muted)" }}>
                {marcar ? (correcta ? "✓" : "✗") : "○"}
              </span>
              <span>{opcion}</span>
            </button>
          );
        })}
      </div>
      {elegida !== null && (
        <p className="mt-3 text-sm leading-relaxed" style={{ color: acerto ? VERDE : ROJO }}>
          {acerto ? "Correcto. " : "No es esa — prueba otra. "}
          {acerto && bloque.explicacion && (
            <span style={{ color: "var(--muted)" }}>{bloque.explicacion}</span>
          )}
        </p>
      )}
    </div>
  );
}

// Recuadro que ocupa el lugar de una imagen o un video que todavía no se
// subió, describiendo exactamente qué va ahí. Es visible a propósito:
// sirve de checklist de producción dentro del propio artículo.
function HuecoMedia({
  bloque,
}: {
  bloque: Extract<BloqueRecurso, { tipo: "imagen" | "video" }>;
}) {
  const esVideo = bloque.tipo === "video";
  const etiqueta = esVideo
    ? "Falta video"
    : bloque.captura
      ? "Falta captura de pantalla"
      : "Falta imagen de referencia";
  const descripcion = esVideo ? bloque.titulo : bloque.alt;

  return (
    <div
      className="rounded-xl border border-dashed px-4 py-5"
      style={{ borderColor: "rgba(255,209,102,0.45)", background: "rgba(255,209,102,0.05)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#FFD166" }}>
        {esVideo ? "▶" : "🖼"} {etiqueta}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--cream)" }}>
        {descripcion}
      </p>
      {bloque.pie && (
        <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
          Pie: {bloque.pie}
        </p>
      )}
    </div>
  );
}

/** Una sección con su número, tal como se ve en lectura corrida. */
function Seccion({ seccion, numero }: { seccion: SeccionRecurso; numero: number }) {
  return (
    <section>
      <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--green)" }}>
        {String(numero).padStart(2, "0")} · {seccion.titulo}
      </p>
      <div className="mt-4 space-y-4">
        {seccion.bloques.map((bloque, j) => (
          <Bloque key={j} bloque={bloque} />
        ))}
      </div>
    </section>
  );
}

/**
 * Clase paso a paso: una sección por pantalla, con barra de avance y
 * botón para continuar. Si la sección trae preguntas, no se avanza hasta
 * acertarlas — eso es lo que vuelve la lectura una clase. Al terminar se
 * marca el artículo como leído (suma XP igual que un video visto).
 */
function LectorPasos({
  secciones,
  slug,
  onSalir,
}: {
  secciones: SeccionRecurso[];
  slug?: string;
  onSalir: () => void;
}) {
  const [paso, setPaso] = useState(0);
  const [aciertos, setAciertos] = useState<Record<string, boolean>>({});
  const [terminado, setTerminado] = useState(false);

  const total = secciones.length;
  const seccion = secciones[paso];
  const nPreguntas = seccion.bloques.filter((b) => b.tipo === "pregunta").length;
  const nAcertadas = Object.entries(aciertos).filter(
    ([clave, ok]) => ok && clave.startsWith(`${paso}:`),
  ).length;
  const puedeAvanzar = nAcertadas >= nPreguntas;
  const esUltima = paso === total - 1;

  function avanzar() {
    if (!esUltima) {
      setPaso((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (slug) marcarLeido(slug);
    setTerminado(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (terminado) {
    return (
      <div
        className="mt-8 rounded-2xl border px-6 py-10 text-center"
        style={{ borderColor: "rgba(76,199,138,0.45)", background: "rgba(76,199,138,0.07)" }}
      >
        <p className="text-3xl" aria-hidden>
          ✓
        </p>
        <p className="mt-2 text-base font-bold" style={{ color: VERDE }}>
          Clase terminada
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Quedó marcada como leída y sumó su XP. Abajo tienes el tema siguiente.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setPaso(0);
              setTerminado(false);
            }}
            className="rounded-xl border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
          >
            Repasar desde el inicio
          </button>
          <button
            type="button"
            onClick={onSalir}
            className="rounded-xl border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
          >
            Ver el texto completo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Avance por pasos */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1">
          {secciones.map((_, i) => (
            <span
              key={i}
              className="h-1 flex-1 rounded-full transition-colors"
              style={{
                background: i <= paso ? "var(--green)" : "rgba(244,240,222,0.15)",
              }}
            />
          ))}
        </div>
        <span className="shrink-0 text-xs tabular-nums" style={{ color: "var(--muted)" }}>
          {paso + 1}/{total}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--green)" }}>
          {String(paso + 1).padStart(2, "0")} · {seccion.titulo}
        </p>
        <div className="mt-4 space-y-4">
          {seccion.bloques.map((bloque, j) => (
            <Bloque
              key={`${paso}-${j}`}
              bloque={bloque}
              onRespuesta={(ok) => setAciertos((a) => ({ ...a, [`${paso}:${j}`]: ok }))}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setPaso((p) => Math.max(0, p - 1))}
          disabled={paso === 0}
          className="rounded-xl border px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-30"
          style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
        >
          ← Atrás
        </button>
        <div className="flex items-center gap-3">
          {!puedeAvanzar && (
            <span className="text-xs" style={{ color: "#FFD166" }}>
              Responde para continuar
            </span>
          )}
          <button
            type="button"
            onClick={avanzar}
            disabled={!puedeAvanzar}
            className="rounded-xl px-6 py-2.5 text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-30"
            style={{ background: "var(--green)", color: "#fff" }}
          >
            {esUltima ? "Terminar la clase ✓" : "Continuar →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SeccionesRecurso({
  secciones,
  slug,
  // Las guías gratis son vitrina pública: por defecto se leen de corrido.
  // El material de alumno arranca como clase paso a paso.
  gratis = false,
}: {
  secciones: SeccionRecurso[];
  slug?: string;
  gratis?: boolean;
}) {
  const [pasos, setPasos] = useState(false);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const pref = getModoPasos();
    setPasos(pref === null ? !gratis : pref);
    setCargado(true);
  }, [gratis]);

  function cambiar(a: boolean) {
    setPasos(a);
    setModoPasos(a);
  }

  // Antes de leer la preferencia se muestra el texto completo: el HTML
  // del servidor y el primer render del navegador coinciden, y los
  // buscadores siempre ven el artículo entero.
  const enPasos = cargado && pasos && secciones.length > 1;

  return (
    <>
      {cargado && secciones.length > 1 && (
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => cambiar(!pasos)}
            className="rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-wider transition-opacity hover:opacity-80"
            style={
              pasos
                ? { borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }
                : { borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }
            }
            title={
              pasos
                ? "Ver el artículo completo de corrido"
                : "Hacerlo como clase, una parte por pantalla"
            }
          >
            {pasos ? "▦ Clase paso a paso" : "☰ Texto completo"}
          </button>
        </div>
      )}

      {enPasos ? (
        <LectorPasos secciones={secciones} slug={slug} onSalir={() => cambiar(false)} />
      ) : (
        <div className={`space-y-10 ${cargado && secciones.length > 1 ? "mt-6" : "mt-8"}`}>
          {secciones.map((seccion, i) => (
            <Seccion key={i} seccion={seccion} numero={i + 1} />
          ))}
        </div>
      )}
    </>
  );
}

// Índice para la vista bloqueada: vende el contenido sin filtrarlo.
// Recibe SOLO los títulos (el server nunca manda las secciones completas
// a un visitante sin nivel).
export function IndiceSecciones({ titulos }: { titulos: string[] }) {
  return (
    <div
      className="mt-6 rounded-2xl border p-6"
      style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
        Lo que contiene esta guía
      </p>
      <ol className="mt-3 space-y-2">
        {titulos.map((titulo, i) => (
          <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--cream)" }}>
            <span className="font-mono text-xs" style={{ color: "var(--green)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            🔒 {titulo}
          </li>
        ))}
      </ol>
    </div>
  );
}
