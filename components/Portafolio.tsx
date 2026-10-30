"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PortfolioGallery, { PortfolioPreview, usePageVisible } from "./PortfolioGallery";
import galleryStyles from "./PortfolioGallery.module.css";
import { SITE } from "@/lib/constants";
import { CLIENTES, logoAlto } from "@/lib/clientes";
import {
  CHAPTERS,
  TRADITIONAL_CHAPTERS,
  CASE_IMAGES,
  DESIGN_IMAGES,
  embedSrc,
  isVideoFile,
  type Piece,
  type ImagePiece,
} from "@/lib/portafolio";

const FILMSTRIP_SIZES = "(max-width:900px) 70vw, 420px";
const DESIGN_SIZES = "(max-width:560px) 45vw, (max-width:900px) 30vw, 250px";


const BLUE = "#1A80FF";


const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "none", stroke: BLUE, strokeWidth: 2 }}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ── ¿El elemento está a la vista? Con esto solo se descargan y reproducen
//    los clips que el visitante realmente tiene en pantalla. ──
function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold,
      rootMargin: "80px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// A fixed grid keeps each design still and avoids duplicating image requests.
function DesignGrid({ images, onOpen }: { images: ImagePiece[]; onOpen: (p: ImagePiece) => void }) {
  const [limit, setLimit] = useState(6);
  return <div className="container-base">
    <div className={galleryStyles.designGrid}>
      {images.slice(0, limit).map((img, i) => <button type="button" key={img.src ?? i}
        onClick={() => img.src && onOpen(img)} aria-label={`Ver pieza de diseño ${i + 1}`}>
        <Image src={img.src as string} alt={img.label} fill sizes={DESIGN_SIZES} style={{objectFit:"contain"}} loading="lazy" />
        <span aria-hidden="true"><ZoomIcon /></span>
      </button>)}
    </div>
    <div className={galleryStyles.more}><span>{Math.min(limit, images.length)} de {images.length} piezas</span>
      {limit < images.length && <button type="button" onClick={() => setLimit(v => v + 6)}>Mostrar más +</button>}
    </div>
  </div>;
}

// ── Escala de precio: por qué dos piezas no cuestan igual. Va antes del
//    archivo, cuando el visitante ya vio el trabajo y la pregunta que le
//    queda es cuánto sale.
//
//    El gráfico son TRES PIEZAS REALES del portafolio con lo que costó cada
//    una. Todo empieza igual — idea, guion y dirección nuestros —; lo que
//    mueve el precio es cuántas rondas de generación hacen falta hasta que
//    salga exactamente lo que se buscaba.
const ESCALA = [
  {
    n: "01",
    src: "/videos/preview/comercial-09.mp4",
    poster: "/images/portfolio/posters/comercial-09.jpg",
    tipo: "Contenido IA",
    precio: "$500",
    rondas: "1 – 2 rondas",
    linea: "Una escena, un personaje. Salió en las primeras generaciones y quedó ahí.",
  },
  {
    n: "02",
    src: "/videos/preview/comercial-08.mp4",
    poster: "/images/portfolio/posters/comercial-08.jpg",
    tipo: "Contenido de branding o producto",
    precio: "$1,500",
    rondas: "4 – 6 rondas",
    linea: "Producto real que tiene que verse idéntico en cada toma. Cada ajuste es volver a generar.",
  },
  {
    n: "03",
    src: "/videos/preview/comercial-01.mp4",
    poster: "/images/portfolio/posters/comercial-01.jpg",
    tipo: "Comercial / spot creativo",
    precio: "$3,000",
    desde: true,
    rondas: "12+ rondas",
    linea: "Varias escenas y épocas, con el mismo protagonista reconocible en todas.",
  },
];

// Las tres piezas tienen proporción distinta (9:16, 4:3 y 16:9). En vez de
// recortarlas a una común, el clip va completo sobre una copia suya
// desenfocada: se ve la pieza tal como se entregó y la tarjeta igual queda
// pareja con las otras dos.
function LevelClip({ src, poster, play }: { src: string; poster: string; play: boolean }) {
  const visible = usePageVisible();
  return (
    <div className="pf-lv-shot">
      <Image src={poster} alt="" fill sizes="(max-width:900px) 90vw, 420px"
        className="pf-lv-blur" aria-hidden="true" />
      <Image src={poster} alt="" fill sizes="(max-width:900px) 90vw, 420px" style={{objectFit:"contain"}} />
      {play && visible && <PortfolioPreview src={src} className="pf-lv-clip" />}
    </div>
  );
}

// Tarjeta de nivel. La luz que sigue al cursor se escribe como variables CSS
// directamente sobre el nodo: mover el mouse no re-renderiza nada de React.
function LevelCard({
  s,
  live,
}: {
  s: (typeof ESCALA)[number];
  live: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article className="pf-lv" ref={ref} onMouseMove={onMove}>
      <LevelClip src={s.src} poster={s.poster} play={live} />
      <h3 className="pf-lv-tipo">{s.tipo}</h3>
      <div className="pf-lv-head">
        <span className="pf-lv-price">
          {"desde" in s && <em>Desde</em>}
          {s.precio}
        </span>
        <span className="pf-lv-rondas">{s.rondas}</span>
      </div>
      <p>{s.linea}</p>
    </article>
  );
}

function EscalaExactitud({ paused }: { paused: boolean }) {
  // Retráctil y cerrada por arranque: quien viene a ver trabajo no se topa
  // con un bloque de precios, y quien se está preguntando cuánto sale lo
  // abre. Los clips solo se descargan cuando se abre.
  const { ref, inView } = useInView<HTMLElement>(0);
  const [open, setOpen] = useState(false);
  const live = inView && open && !paused;

  return (
    <section className={`container-base pf-scale${live ? " on" : ""}`} ref={ref}>
      {/* Cerrado no es un bloque: es una hairline con un botón chico al
          centro. Quien vino a ver trabajo casi ni lo registra; quien se está
          preguntando cuánto sale lo encuentra. */}
      <div className="pf-scale-hint">
        <button
          type="button"
          className={`pf-scale-pill${open ? " open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="escala-precio"
        >
          <span>Cómo se cotiza</span>
          <em>$500 — +$10,000</em>
          <i aria-hidden="true" />
        </button>
      </div>

      {/* grid-template-rows 0fr→1fr: se despliega con la altura real del
          contenido, sin medirla a mano ni fijar un max-height inventado. */}
      <div className="pf-scale-wrap" id="escala-precio" data-open={open}>
        <div className="pf-scale-inner pf-scale-panel">
          <p className="pf-scale-lead">
            Todo empieza igual: la idea, el guion y la dirección los ponemos nosotros. Si en las
            primeras generaciones ya sale lo que buscabas, ahí queda. Cada cambio o cada agregado
            son generaciones nuevas — <strong>y eso es lo único que mueve el precio</strong>.
          </p>

          {/* Eje de exactitud. Ata las tres piezas: los puntos usan la MISMA
              grilla que las tarjetas, así cada uno cae centrado sobre la suya
              y se lee de un vistazo que el precio sube con la exigencia. */}
          <div className="pf-exact" aria-hidden="true">
            <div className="pf-exact-top">
              <span>Menos exactitud<i>la IA propone</i></span>
              <span>Más exactitud<i>todo definido</i></span>
            </div>
            <div className="pf-exact-rail">
              <span className="pf-exact-fill" />
              <div className="pf-exact-dots">
                <i /><i /><i />
              </div>
            </div>
          </div>

          <div className="pf-scale-grid">
            {ESCALA.map((s) => (
              <LevelCard key={s.n} s={s} live={live} />
            ))}
          </div>

          <div className="pf-scale-foot">
            <p className="pf-scale-note">
              De ahí para arriba están las campañas completas y los comerciales de varias piezas,
              hasta <strong>+$10,000</strong>. Montos referenciales: el número final sale del brief.
            </p>
            {/* El mensaje va precargado: el prospecto llega al chat ya diciendo
                de dónde salió, sin tener que redactar nada. */}
            <a
              className="pf-scale-cta"
              data-loc="portafolio"
              href={`${SITE.links.whatsapp}?text=${encodeURIComponent(
                "Hola, vengo del portafolio y quiero cotizar un proyecto."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cotizar mi proyecto <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
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
  const [open, setOpen] = useState<Piece | null>(null);
  const [openImage, setOpenImage] = useState<ImagePiece | null>(null);
  const anyOpen = Boolean(open || openImage);

  return (
    <div className="pf">
      {/* ── HERO — portada estática y reel a demanda ── */}
      <header className={`pf-hero pf-hero-video-mode ${galleryStyles.hero}`}>
        <Image className="pf-hero-video" src="/images/portfolio/posters/portafolio-hero.jpg"
          alt="" fill priority sizes="100vw" />
        <div className="pf-hero-shade" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <span className="pf-eyebrow">Portafolio — Resuelto Agency</span>
          <h1 className="pf-h1">
            Portafolio<br /><span className="pf-ia-text">Creativo.</span>
          </h1>
          <p className="pf-sub">
            Comerciales, video de producto, UGC y storytelling producidos con IA generativa —
            sobre <strong>7+ años de ejecución real</strong> para las marcas más grandes del Perú.
          </p>

          <div className={galleryStyles.heroActions}>
            <a href="#trabajo">Explorar el trabajo ↓</a>
            <button type="button" onClick={() => setOpen({url:"/videos/portafolio-hero-v2.mp4",label:"Reel de RESUELTO",client:"RESUELTO Agency",wide:true})}>Ver reel ↗</button>
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

      {/* ── CLIENTES — los mismos logos reales del inicio (lib/clientes.ts),
          antes de todo el trabajo ── */}
      <div className="container-base pf-clientes-wrap">
        <p className="pf-clientes-title">Nuestros clientes</p>
        <div className="hm-clientes pf-clientes" aria-label="Nuestros clientes">
          {CLIENTES.map((l) => (
            <span key={l.name} className="hm-cliente">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.name} style={{ "--h": `${logoAlto(l)}px` } as React.CSSProperties} />
            </span>
          ))}
        </div>
      </div>

      {/* ── GALERÍA — categorías manuales y vistas previas a demanda ── */}
      <section className="container-base pf-gallery" id="trabajo">
        <PortfolioGallery
          chapters={CHAPTERS}
          onOpen={setOpen}
          paused={anyOpen}
          eyebrow="El trabajo"
          title={<>El trabajo, pieza a pieza.</>}
        />
      </section>

      {/* ── DISEÑO GRÁFICO IA — grilla estable ── */}
      <section className="pf-gallery pf-design-sec">
        {/* Encabezado deliberadamente chico: el diseño gráfico acompaña, no
            compite con el video, que es lo que vende el portafolio. */}
        <div className="container-base">
          <div className="pf-design-head">
            <span className="pf-eyebrow">Diseño gráfico IA</span>
            <p>Piezas gráficas generadas con IA <i>· {DESIGN_IMAGES.length} piezas</i></p>
          </div>
        </div>

        {/* Cada diseño se muestra una sola vez, en una grilla estable. */}
        <DesignGrid images={DESIGN_IMAGES} onOpen={setOpenImage} />
      </section>

      {/* Lightboxes */}
      {open && <Lightbox piece={open} onClose={() => setOpen(null)} />}
      {openImage && <ImageLightbox piece={openImage} onClose={() => setOpenImage(null)} />}

      {/* ── CÓMO SE COTIZA — la escala de exactitud, justo antes del archivo ── */}
      <EscalaExactitud paused={anyOpen} />

      {/* ── ANTES DE LA IA — carrusel de casos + producción tradicional ── */}
      <section className="pf-archive">
        <div className="container-base">
          <span className="pf-eyebrow pf-eyebrow-cream">El archivo</span>
          <h2>Antes de la IA,<br /><span>años de cancha.</span></h2>
          <p className="pf-lead">
            El criterio no salió de un prompt. Salió de producir para las marcas más exigentes del país —
            retail premium, FMCG, banca y cine — dentro de agencias globales top-tier.
          </p>

          {/* Casos de éxito: desplazamiento manual, clic para agrandar. */}
          <div className={`pf-filmstrip pf-filmstrip-archive ${galleryStyles.caseScroll}`} aria-label="Casos de éxito — clic para agrandar">
            <div className={`pf-filmstrip-inner ${galleryStyles.caseStrip}`}>
              {CASE_IMAGES.map((img, i) => (
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

          <PortfolioGallery
            chapters={TRADITIONAL_CHAPTERS}
            onOpen={setOpen}
            paused={anyOpen}
          />


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
          <a className="pf-btn" href={SITE.links.whatsapp} data-loc="cierre" target="_blank" rel="noopener noreferrer">
            Hablemos por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
