"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { CHAPTERS, embedSrc, isVideoFile, autoThumb, type Piece } from "@/lib/portafolio";

const BLUE = "#1A80FF";
const CREAM = "#F4F0DE";
const CREAM_DIM = "#D4CFA8";
const MUTED = "#9E9882";
const LINE = "rgba(244,240,222,.08)";

type PfCase = {
  slug: string;
  image?: string;
  client: string;
  sector: string;
  era: string;
  problem: string;
  solution: string;
  result: string;
  status?: string;
  iaCategories?: readonly string[];
};

// Imágenes reales del trabajo — filmstrip y fondos.
const WORK_IMAGES = [
  { src: "/images/portfolio/slide-01.png", label: "WIN Internet" },
  { src: "/images/portfolio/slide-02.png", label: "Mañana Me Caso" },
  { src: "/images/portfolio/slide-03.png", label: "Livoltek" },
  { src: "/images/portfolio/slide-04.png", label: "Redondos" },
  { src: "/images/portfolio/slide-05.png", label: "Wong Cencosud" },
  { src: "/images/portfolio/slide-06.png", label: "Marcas" },
];

const allCases = SITE.proof.cases as unknown as PfCase[];
const iaCases = allCases.filter((c) => c.era === "ia");
const oldCases = allCases.filter((c) => c.era === "tradicional");
const brands = SITE.authority.logos.map((l) => l.name);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: BLUE, marginLeft: 3 }}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

// ── Tarjeta de la galería (miniatura + play, reproduce al clic) ──
function GalleryCard({ piece, index, onOpen }: { piece: Piece; index: number; onOpen: (p: Piece) => void }) {
  const thumb = autoThumb(piece);
  const isFile = isVideoFile(piece.url);
  const clickable = Boolean(piece.url);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
      className={`pf-card${clickable ? "" : " pf-card-empty"}`}
      style={{ gridColumn: piece.wide ? "span 2" : undefined, aspectRatio: piece.wide ? "16/9" : "9/16" }}
      onClick={() => clickable && onOpen(piece)}
      aria-label={clickable ? `Reproducir: ${piece.label} — ${piece.client}` : "Espacio disponible"}
    >
      <span className="pf-ia">Hecho con IA</span>
      {isFile ? (
        <video src={`${piece.url}#t=0.1`} muted playsInline preload="metadata"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumb} alt={`${piece.label} — ${piece.client}`} loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : clickable ? (
        <div className="pf-card-grad" />
      ) : null}
      <span className="pf-card-play"><PlayIcon /></span>
      <div className="pf-tag">
        <b>{piece.label}</b>
        <span>{piece.url ? piece.client : "+ agregar"}</span>
      </div>
    </motion.button>
  );
}

// ── Lightbox: reproduce la pieza en grande ──────────────────
function Lightbox({ piece, onClose }: { piece: Piece; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const src = embedSrc(piece.url);

  return (
    <div className="pf-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={piece.label}>
      <button className="pf-lb-close" onClick={onClose} aria-label="Cerrar">✕</button>
      <div
        className={`pf-lb-player${piece.wide ? " pf-lb-wide" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isVideoFile(piece.url) ? (
          <video src={piece.url as string} controls autoPlay playsInline
            style={{ width: "100%", height: "100%", objectFit: "contain", background: "#000" }} />
        ) : src ? (
          <iframe src={src} allowFullScreen scrolling="no" allow="autoplay; encrypted-media"
            style={{ width: "100%", height: "100%", border: 0, background: "#000" }} />
        ) : null}
        <div className="pf-lb-info">
          <b>{piece.label}</b>
          <span>{piece.client}</span>
        </div>
      </div>
    </div>
  );
}

export default function Portafolio() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<Piece | null>(null);
  const active = CHAPTERS[tab];

  return (
    <div className="pf">
      {/* ── HERO — video de fondo con texto superpuesto ── */}
      <header className="pf-hero pf-hero-video-mode">
        <video className="pf-hero-video" src="/videos/portafolio-hero.mp4"
          autoPlay muted loop playsInline preload="auto" />
        <div className="pf-hero-shade" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <span className="pf-eyebrow">Portafolio — {SITE.visibleName}</span>
          <h1 className="pf-h1">
            Creación<br /><span className="pf-ia-text">con IA.</span>
          </h1>
          <p className="pf-sub">
            Comerciales, video de producto, UGC y storytelling producidos con IA generativa —
            sobre <strong>5+ años de ejecución real</strong> para las marcas más grandes del Perú.
          </p>

          {/* stats */}
          <div className="pf-stats">
            {[
              { v: "5M+", l: "vistas generadas" },
              { v: "20+", l: "marcas trabajadas" },
              { v: "2000+", l: "piezas producidas" },
              { v: "5+", l: "años de experiencia" },
            ].map((s) => (
              <div key={s.l}><b>{s.v}</b><span>{s.l}</span></div>
            ))}
          </div>
        </div>
      </header>

      {/* ── MARQUEE DE CATEGORÍAS ── */}
      <div className="pf-marquee" aria-hidden="true">
        <div className="pf-marquee-inner">
          {[0, 1].map((rep) => (
            <span key={rep}>
              {CHAPTERS.map((ch) => (
                <span className="pf-mq-item" key={`${rep}-${ch.id}`}>
                  {ch.title} <i>●</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── GALERÍA CON TABS ── */}
      <section className="container-base pf-gallery" id="trabajo">
        <div className="pf-gal-head">
          <div>
            <span className="pf-eyebrow">El trabajo</span>
            <h2>Piezas hechas<br />con IA.</h2>
          </div>
          <p className="pf-gal-desc" key={active.id}>{active.desc}</p>
        </div>

        {/* Tab bar */}
        <div className="pf-tabs" role="tablist" aria-label="Categorías del portafolio">
          {CHAPTERS.map((ch, i) => (
            <button
              key={ch.id}
              role="tab"
              aria-selected={tab === i}
              className={`pf-tab${tab === i ? " on" : ""}`}
              onClick={() => setTab(i)}
            >
              <span className="n">{ch.n}</span>
              {ch.title}
            </button>
          ))}
        </div>

        {/* Grilla densa de miniaturas — menos columnas cuando hay pocas piezas */}
        <div
          className={`pf-gal-grid${active.pieces.length === 1 ? " pf-gal-grid-solo" : active.pieces.length === 2 ? " pf-gal-grid-duo" : ""}`}
          key={active.id}
        >
          {active.pieces.map((p, i) => (
            <GalleryCard key={`${active.id}-${i}`} piece={p} index={i} onOpen={setOpen} />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {open && <Lightbox piece={open} onClose={() => setOpen(null)} />}

      {/* ── FILMSTRIP — trabajo real desplazándose ── */}
      <div className="pf-filmstrip" aria-hidden="true">
        <div className="pf-filmstrip-inner">
          {[...WORK_IMAGES, ...WORK_IMAGES].map((img, i) => (
            <div className="pf-fs-item" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.label} loading="lazy" />
              <span>{img.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CASOS DE ÉXITO POR MARCA ── */}
      <section className="container-base pf-cases">
        <span className="pf-eyebrow">Casos de éxito</span>
        <h2 className="pf-cases-title">Marcas que ya<br />producen con IA.</h2>
        {iaCases.map((c) => (
          <motion.div key={c.slug} className="pf-case"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
            <div className="left">
              {c.image && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="pf-case-img" src={c.image} alt={c.client} loading="lazy" />
                  <div className="pf-case-shade" />
                </>
              )}
              <div style={{ position: "relative", zIndex: 2 }}>
                <div className="brand">{c.client}</div>
                <div className="sector">{c.sector}</div>
              </div>
              {c.status === "activo" && (
                <div className="metric" style={{ position: "relative", zIndex: 2 }}>
                  <b>Cliente activo</b><span>sistema de IA en operación</span>
                </div>
              )}
            </div>
            <div className="right">
              <div className="row"><b>Reto</b><p>{c.problem}</p></div>
              <div className="row"><b>Solución con IA</b><p>{c.solution}</p></div>
              {c.iaCategories && (
                <div className="pills">
                  {c.iaCategories.map((t) => <i key={t}>{t.replace(/-/g, " ")}</i>)}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── ANTES DE LA IA ── */}
      <section className="pf-archive">
        <div className="container-base">
          <span className="pf-eyebrow pf-eyebrow-cream">El archivo</span>
          <h2>Antes de la IA,<br /><span>años de cancha.</span></h2>
          <p className="pf-lead">
            El criterio no salió de un prompt. Salió de producir para las marcas más exigentes del país —
            retail premium, FMCG, banca y cine — dentro de agencias globales top-tier.
          </p>

          <div className="pf-old-grid">
            {oldCases.map((c) => (
              <div className="pf-old" key={c.slug}>
                {c.image && (
                  <div className="pf-old-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt={c.client} loading="lazy" />
                  </div>
                )}
                <div className="pf-old-body">
                  <span className="yr">{c.sector}</span>
                  <h3>{c.client}</h3>
                  <p>{c.solution}</p>
                  <div className="res">{c.result}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pf-ticker">
            <div className="pf-ticker-inner">
              {[...brands, ...brands].map((b, i) => <span key={i}>{b}</span>)}
            </div>
          </div>

          <div className="pf-inds">
            {SITE.proof.industries.map((ind) => (
              <i key={ind.key}>{ind.icon} {ind.label}</i>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="container-base pf-testi">
        <span className="pf-eyebrow">Lo que dicen</span>
        <div className="pf-testi-grid">
          {SITE.proof.testimonials.map((t, i) => (
            <div className="pf-t" key={i}>
              <span className="q">&ldquo;</span>
              <p>{t.text}</p>
              <footer><b>{t.company}</b><span>{t.role}</span></footer>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pf-cta">
        <div className="pf-glow-cta" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <h2>Tu marca puede<br />producir así.</h2>
          <p>Contenido, comerciales y video de producto con IA — con el criterio de años produciendo para marcas líderes.</p>
          <a className="pf-btn" href={SITE.links.whatsapp} target="_blank" rel="noopener noreferrer">
            Hablemos por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
