"use client";

import { useState } from "react";
import type { BloqueRecurso, SeccionRecurso } from "@/lib/taller/content";

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

function Bloque({ bloque }: { bloque: BloqueRecurso }) {
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
  }
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

export default function SeccionesRecurso({ secciones }: { secciones: SeccionRecurso[] }) {
  return (
    <div className="mt-8 space-y-10">
      {secciones.map((seccion, i) => (
        <section key={i}>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--green)" }}>
            {String(i + 1).padStart(2, "0")} · {seccion.titulo}
          </p>
          <div className="mt-4 space-y-4">
            {seccion.bloques.map((bloque, j) => (
              <Bloque key={j} bloque={bloque} />
            ))}
          </div>
        </section>
      ))}
    </div>
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
