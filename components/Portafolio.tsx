"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { SHOWREEL, CHAPTERS, embedSrc, isVideoFile, type Piece } from "@/lib/portafolio";

const BLUE = "#1A80FF";
const CREAM = "#F4F0DE";
const CREAM_DIM = "#D4CFA8";
const MUTED = "#9E9882";
const LINE = "rgba(244,240,222,.08)";

type PfCase = {
  slug: string;
  client: string;
  sector: string;
  era: string;
  problem: string;
  solution: string;
  result: string;
  status?: string;
  iaCategories?: readonly string[];
};

const allCases = SITE.proof.cases as unknown as PfCase[];
const iaCases = allCases.filter((c) => c.era === "ia");
const oldCases = allCases.filter((c) => c.era === "tradicional");
const brands = SITE.authority.logos.map((l) => l.name);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: BLUE, marginLeft: 3 }}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

// ── Video propio que solo carga/reproduce cuando está en pantalla ──
function LazyVideo({ src, controls = false }: { src: string; controls?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      data-src={src}
      muted
      loop
      playsInline
      preload="none"
      controls={controls}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

// ── Marco de video (9:16 ó 16:9) ────────────────────────────
function Frame({ piece, index }: { piece: Piece; index: number }) {
  const src = embedSrc(piece.url);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      className="pf-frame"
      style={{ gridColumn: piece.wide ? "span 2" : undefined, aspectRatio: piece.wide ? "16/9" : "9/16" }}
    >
      <span className="pf-ia">Hecho con IA</span>
      {isVideoFile(piece.url) ? (
        <LazyVideo src={piece.url as string} />
      ) : src ? (
        <iframe src={src} loading="lazy" allowFullScreen scrolling="no"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
      ) : (
        <div className="pf-ph">
          <span className="pf-ring"><PlayIcon /></span>
        </div>
      )}
      <div className="pf-tag">
        <b>{piece.label}</b>
        <span>{piece.url ? piece.client : "+ agregar"}</span>
      </div>
    </motion.div>
  );
}

export default function Portafolio() {
  const showreelSrc = embedSrc(SHOWREEL.url);

  return (
    <div className="pf">
      {/* ── HERO ── */}
      <header className="pf-hero">
        <div className="pf-glow" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <div className="pf-hero-grid">
            <div>
              <span className="pf-eyebrow">Portafolio — {SITE.visibleName}</span>
              <h1 className="pf-h1">
                Creación<br /><span className="pf-ia-text">con IA.</span>
              </h1>
              <p className="pf-sub">
                Comerciales, video de producto, UGC y storytelling producidos con IA generativa —
                sobre <strong>5+ años de ejecución real</strong> para las marcas más grandes del Perú.
              </p>
            </div>

            <div className="pf-showreel">
              <span className="pf-showreel-badge">Showreel</span>
              {isVideoFile(SHOWREEL.url) ? (
                <LazyVideo src={SHOWREEL.url} controls />
              ) : showreelSrc ? (
                <iframe src={showreelSrc} loading="lazy" allowFullScreen scrolling="no"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
              ) : (
                <div className="pf-ph">
                  <span className="pf-ring"><PlayIcon /></span>
                </div>
              )}
            </div>
          </div>

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

      {/* ── ÍNDICE ── */}
      <section className="container-base pf-indice">
        <span className="pf-eyebrow">Índice</span>
        <ol>
          {CHAPTERS.map((ch) => (
            <li key={ch.id}>
              <a href={`#${ch.id}`}>
                <span className="num">{ch.n}</span>
                <span className="name">{ch.title}</span>
                <span className="count">Trabajo reciente</span>
                <span className="arr">→</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* ── CAPÍTULOS ── */}
      {CHAPTERS.map((ch) => (
        <section key={ch.id} id={ch.id} className="container-base pf-chapter">
          <div className="pf-chapter-head">
            <div className="big">
              <span className="n">{ch.n}</span>
              <h2>{ch.title}</h2>
            </div>
            <p>{ch.desc}</p>
          </div>
          <div className="pf-strip">
            {ch.pieces.map((p, i) => <Frame key={i} piece={p} index={i} />)}
          </div>
        </section>
      ))}

      {/* ── CASOS DE ÉXITO POR MARCA ── */}
      <section className="container-base pf-cases">
        <span className="pf-eyebrow">Casos de éxito</span>
        <h2 className="pf-cases-title">Marcas que ya<br />producen con IA.</h2>
        {iaCases.map((c) => (
          <motion.div key={c.slug} className="pf-case"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
            <div className="left">
              <div>
                <div className="brand">{c.client}</div>
                <div className="sector">{c.sector}</div>
              </div>
              {c.status === "activo" && (
                <div className="metric"><b>Cliente activo</b><span>sistema de IA en operación</span></div>
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
                <span className="yr">{c.sector}</span>
                <h3>{c.client}</h3>
                <p>{c.solution}</p>
                <div className="res">{c.result}</div>
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
