"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import {
  CHAPTERS,
  TRADITIONAL_CHAPTERS,
  CASE_IMAGES,
  DESIGN_IMAGES,
  embedSrc,
  isVideoFile,
  autoThumb,
  type Piece,
  type ImagePiece,
} from "@/lib/portafolio";

// sizes tuned a la grilla densa de 5/4/3/2 columnas (ver breakpoints en globals.css)
const GRID_SIZES = "(max-width:560px) 50vw, (max-width:900px) 33vw, (max-width:1100px) 25vw, 20vw";
const FILMSTRIP_SIZES = "(max-width:900px) 70vw, 420px";

const BLUE = "#1A80FF";

const brands = SITE.authority.logos.map((l) => l.name);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: BLUE, marginLeft: 3 }}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "none", stroke: BLUE, strokeWidth: 2 }}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ── Tarjeta de video (miniatura + play, reproduce al clic) ──
function GalleryCard({
  piece,
  index,
  onOpen,
  iaBadge = true,
}: {
  piece: Piece;
  index: number;
  onOpen: (p: Piece) => void;
  iaBadge?: boolean;
}) {
  const thumb = autoThumb(piece);
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
      {iaBadge && <span className="pf-ia">Hecho con IA</span>}
      {thumb ? (
        <Image src={thumb} alt={`${piece.label} — ${piece.client}`} fill sizes={GRID_SIZES}
          style={{ objectFit: "cover" }} loading="lazy" />
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

// ── Tarjeta de imagen (diseño / caso de éxito) — clic para agrandar ──
function ImageCard({ img, index, onOpen }: { img: ImagePiece; index: number; onOpen: (p: ImagePiece) => void }) {
  const clickable = Boolean(img.src);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
      className={`pf-card pf-dcard${clickable ? "" : " pf-card-empty"}`}
      onClick={() => clickable && onOpen(img)}
      aria-label={clickable ? `Ver: ${img.label}` : "Espacio disponible"}
    >
      {clickable ? (
        <Image src={img.src as string} alt={img.label} fill sizes={GRID_SIZES}
          style={{ objectFit: "cover" }} />
      ) : (
        <div className="pf-card-grad" />
      )}
      <span className="pf-card-play"><ZoomIcon /></span>
      <div className="pf-tag">
        <b>{img.label}</b>
        {!clickable && <span>+ agregar</span>}
      </div>
    </motion.button>
  );
}

// ── Lightbox de video: reproduce la pieza en grande ──────────
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

// ── Lightbox de imagen: agranda la pieza gráfica ─────────────
function ImageLightbox({ piece, onClose }: { piece: ImagePiece; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="pf-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={piece.label}>
      <button className="pf-lb-close" onClick={onClose} aria-label="Cerrar">✕</button>
      <div className="pf-lb-image-wrap" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={piece.src as string} alt={piece.label} className="pf-lb-image" />
      </div>
    </div>
  );
}

export default function Portafolio() {
  const [tab, setTab] = useState(0);
  const [tradTab, setTradTab] = useState(0);
  const [open, setOpen] = useState<Piece | null>(null);
  const [openImage, setOpenImage] = useState<ImagePiece | null>(null);

  const active = CHAPTERS[tab];
  const activeTrad = TRADITIONAL_CHAPTERS[tradTab];

  return (
    <div className="pf">
      {/* ── HERO — video de fondo con texto superpuesto ── */}
      <header className="pf-hero pf-hero-video-mode">
        <video className="pf-hero-video" src="/videos/portafolio-hero.mp4"
          autoPlay muted loop playsInline preload="auto" />
        <div className="pf-hero-shade" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <span className="pf-eyebrow">Portafolio — Resuelto Agency</span>
          <h1 className="pf-h1">
            Portafolio<br /><span className="pf-ia-text">Creativo.</span>
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

      {/* ── GALERÍA CON TABS — trabajo hecho con IA ── */}
      <section className="container-base pf-gallery" id="trabajo">
        <div className="pf-gal-head">
          <div>
            <span className="pf-eyebrow">El trabajo</span>
            <h2>Piezas hechas<br />con IA.</h2>
          </div>
          <p className="pf-gal-desc" key={active.id}>{active.desc}</p>
        </div>

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

        <div
          className={`pf-gal-grid${active.pieces.length === 1 ? " pf-gal-grid-solo" : active.pieces.length === 2 ? " pf-gal-grid-duo" : ""}`}
          key={active.id}
        >
          {active.pieces.map((p, i) => (
            <GalleryCard key={`${active.id}-${i}`} piece={p} index={i} onOpen={setOpen} />
          ))}
        </div>
      </section>

      {/* ── DISEÑO GRÁFICO IA ── */}
      <section className="container-base pf-gallery">
        <div className="pf-gal-head">
          <div>
            <span className="pf-eyebrow">Diseño gráfico IA</span>
            <h2>Piezas gráficas<br />generadas con IA.</h2>
          </div>
        </div>

        <div className="pf-gal-grid pf-design-grid">
          {DESIGN_IMAGES.map((img, i) => (
            <ImageCard key={i} img={img} index={i} onOpen={setOpenImage} />
          ))}
        </div>
      </section>

      {/* Lightboxes */}
      {open && <Lightbox piece={open} onClose={() => setOpen(null)} />}
      {openImage && <ImageLightbox piece={openImage} onClose={() => setOpenImage(null)} />}

      {/* ── ANTES DE LA IA — carrusel de casos + producción tradicional con tabs ── */}
      <section className="pf-archive">
        <div className="container-base">
          <span className="pf-eyebrow pf-eyebrow-cream">El archivo</span>
          <h2>Antes de la IA,<br /><span>años de cancha.</span></h2>
          <p className="pf-lead">
            El criterio no salió de un prompt. Salió de producir para las marcas más exigentes del país —
            retail premium, FMCG, banca y cine — dentro de agencias globales top-tier.
          </p>

          {/* Carrusel animado — casos de éxito, clic para agrandar */}
          <div className="pf-filmstrip pf-filmstrip-archive" aria-label="Casos de éxito — clic para agrandar">
            <div className="pf-filmstrip-inner">
              {[...CASE_IMAGES, ...CASE_IMAGES].map((img, i) => (
                <button
                  type="button"
                  className="pf-fs-item"
                  key={i}
                  onClick={() => setOpenImage(img)}
                  aria-label={`Ver caso de éxito: ${img.label}`}
                >
                  <Image src={img.src as string} alt={img.label} fill sizes={FILMSTRIP_SIZES}
                    style={{ objectFit: "cover" }} />
                  <span>{img.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pf-tabs pf-tabs-cream" role="tablist" aria-label="Categorías de producción tradicional">
            {TRADITIONAL_CHAPTERS.map((ch, i) => (
              <button
                key={ch.id}
                role="tab"
                aria-selected={tradTab === i}
                className={`pf-tab${tradTab === i ? " on" : ""}`}
                onClick={() => setTradTab(i)}
              >
                <span className="n">{ch.n}</span>
                {ch.title}
              </button>
            ))}
          </div>

          <div
            className={`pf-gal-grid${activeTrad.pieces.length === 1 ? " pf-gal-grid-solo" : activeTrad.pieces.length === 2 ? " pf-gal-grid-duo" : ""}`}
            key={activeTrad.id}
          >
            {activeTrad.pieces.map((p, i) => (
              <GalleryCard key={`${activeTrad.id}-${i}`} piece={p} index={i} onOpen={setOpen} iaBadge={false} />
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
