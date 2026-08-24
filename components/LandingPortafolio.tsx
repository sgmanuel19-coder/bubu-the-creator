"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CHAPTERS } from "@/lib/portafolio";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Los posters viven en /images/portfolio/posters/<nombre>.jpg — mismo
   nombre base que el mp4. Se muestran como imagen estática y el video
   recién se descarga cuando el visitante hace clic: en una landing pagada
   precargar 40 mp4 de varios MB mataría la velocidad de carga (y con ella
   la conversión y el ranking de calidad del anuncio). */
function posterFor(url: string): string {
  const file = url.split("/").pop()?.replace(/\.mp4$/, "") ?? "";
  return `/images/portfolio/posters/${file}.jpg`;
}

/* Piezas que no se muestran en la landing pagada. Siguen publicadas en
   /casos — esto solo las saca del carrusel que ve el tráfico de anuncios.
   Para ocultarlas de todo el sitio hay que quitarlas de lib/portafolio.ts. */
const OCULTAS = new Set<string>([
  "/videos/comercial-07.mp4",
]);

/**
 * Cabecera opcional.
 *
 * El mismo carrusel sirve en las dos landings, pero el encuadre cambia:
 * en /produccion-ia es "esto es lo que hacemos" y en /masterclass es
 * "esto es lo que vas a poder hacer". Los valores por defecto son los
 * de siempre, así que /produccion-ia no cambia en nada.
 */
type Props = {
  eyebrow?: string;
  titulo?: string;
  bajada?: string;
};

export default function LandingPortafolio({
  eyebrow = "Portafolio",
  titulo = "Trabajo reciente producido con IA.",
  bajada = "Piezas generadas con IA y dirigidas por nosotros. Sin rodaje, sin set, sin cast.",
}: Props = {}) {
  const [activo, setActivo] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const capitulo = CHAPTERS[activo];
  const visibles = (c: (typeof CHAPTERS)[number]) =>
    c.pieces.filter((p) => p.url && !OCULTAS.has(p.url));
  const piezas = visibles(capitulo);

  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section className="container-base hm-section lp-pf">
      <div className="lp-head">
        <span className="hm-eyebrow">{eyebrow}</span>
        <h2>{titulo}</h2>
        <p className="lp-head-sub">{bajada}</p>
      </div>

      {/* Pestañas de categoría */}
      <div className="lp-pf-tabs" role="tablist" aria-label="Categorías del portafolio">
        {CHAPTERS.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === activo}
            className={`lp-pf-tab ${i === activo ? "is-active" : ""}`}
            onClick={() => {
              setActivo(i);
              setPlaying(null);
              scroller.current?.scrollTo({ left: 0, behavior: "smooth" });
            }}
          >
            {c.title}
            <span className="lp-pf-tab-n">{visibles(c).length}</span>
          </button>
        ))}
      </div>

      {/* El `key` fuerza el remontaje al cambiar de capítulo: con eso
          `initial`/`animate` vuelve a correr y se obtiene el fundido de
          entrada sin depender de AnimatePresence. */}
      <motion.p
        key={capitulo.id}
        className="lp-pf-desc"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {capitulo.desc}
      </motion.p>

      {/* Carrusel */}
      <div className="lp-pf-carousel-wrap">
        <button
          className="lp-pf-arrow lp-pf-arrow-l"
          onClick={() => scrollBy(-1)}
          aria-label="Ver piezas anteriores"
        >
          ←
        </button>

        <div className="lp-pf-scroller" ref={scroller}>
            <motion.div
              key={capitulo.id}
              className="lp-pf-track"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {piezas.map((p) => {
                const url = p.url as string;
                const activa = playing === url;
                return (
                  <div
                    className={`lp-pf-card ${p.wide ? "is-wide" : "is-tall"}`}
                    key={url}
                  >
                    {activa ? (
                      <video
                        src={url}
                        poster={posterFor(url)}
                        autoPlay
                        controls
                        playsInline
                        className="lp-pf-media"
                        onEnded={() => setPlaying(null)}
                      />
                    ) : (
                      <button
                        className="lp-pf-thumb"
                        onClick={() => setPlaying(url)}
                        aria-label={`Reproducir ${p.label}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={posterFor(url)}
                          alt={p.label}
                          loading="lazy"
                          className="lp-pf-media"
                        />
                        <span className="lp-pf-play" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="22" height="22">
                            <path d="M8 5.5v13l10-6.5z" fill="currentColor" />
                          </svg>
                        </span>
                        <span className="lp-pf-label">{p.label}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </motion.div>
        </div>

        <button
          className="lp-pf-arrow lp-pf-arrow-r"
          onClick={() => scrollBy(1)}
          aria-label="Ver más piezas"
        >
          →
        </button>
      </div>

      <p className="lp-pf-hint">Desliza para ver más · Clic para reproducir</p>
    </section>
  );
}
