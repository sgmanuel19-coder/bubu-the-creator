"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { ContainerStagger, ContainerAnimated } from "@/components/ui/animated-gallery";
import { FlythroughIntro } from "@/components/ui/flythrough-intro";
import {
  CHAPTERS,
  TRADITIONAL_CHAPTERS,
  CASE_IMAGES,
  DESIGN_IMAGES,
  embedSrc,
  isVideoFile,
  autoThumb,
  previewSrc,
  type Chapter,
  type Piece,
  type ImagePiece,
} from "@/lib/portafolio";

// sizes tuned a la grilla densa de 5/4/3/2 columnas (ver breakpoints en globals.css)
const GRID_SIZES = "(max-width:560px) 50vw, (max-width:900px) 33vw, (max-width:1100px) 25vw, 20vw";
const FILMSTRIP_SIZES = "(max-width:900px) 70vw, 420px";
const DESIGN_SIZES = "(max-width:560px) 45vw, (max-width:900px) 30vw, 250px";

// Cada capítulo se queda en pantalla este tiempo antes de pasar al siguiente.
const ROTATE_MS = 11000;

const BLUE = "#1A80FF";

const brands = SITE.authority.logos.map((l) => l.name);

/* Apertura 3D del portafolio. Solo pósters apaisados: los verticales, con
   object-cover en un marco 16:9, se recortan por el medio y decapitan a la
   persona. Tres columnas que se mueven a distinta velocidad. */
/* Orden del vuelo: es el orden en que las piezas vienen desde el fondo, así
   que arranca con lo más reconocible. Solo apaisadas — las verticales,
   recortadas a 16:9, decapitan a la persona. */
const VUELO_BASE = [
  "comercial-04", "comercial-07", "comercial-09", "comercial-05",
  "comercial-10", "comercial-11", "comercial-08", "producto-01",
  "comercial-06", "avatar-07", "comercial-01", "avatar-03",
  "trad-comerciales-01", "avatar-02", "trad-comerciales-02", "avatar-06",
  "trad-comerciales-03", "trad-comerciales-04",
];
/* Se recorre el pool una vez y media: con 18 piezas el túnel se vaciaba
   sobre el final del scroll. La segunda vuelta arranca desplazada para que
   no se repita el mismo orden. */
const VUELO_3D = [...VUELO_BASE, ...VUELO_BASE.slice(4), ...VUELO_BASE.slice(0, 4)];

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

// ── Modo liviano: sin autoplay si el usuario pidió menos movimiento o
//    está ahorrando datos. Cae a la miniatura estática de siempre. ──
function useLiteMode() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const read = () => setLite(mq.matches || conn?.saveData === true);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return lite;
}

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

// ── Presupuesto de reproducción ────────────────────────────────────
// Sin tope, una grilla de 5 columnas llega a decodificar 10-14 clips a la
// vez y el scroll se traba en equipos de gama media. Solo corren los
// primeros que entran en cuadro; los demás esperan turno mostrando su
// póster, y toman el cupo apenas se libera uno.
const MAX_CLIPS = 6;

/* Dos presupuestos independientes: la intro 3D y la galería nunca comparten
   pantalla, así que sumar sus cupos no aumenta cuántos clips se decodifican
   a la vez. Con un cupo único, la intro dejaba la mitad de sus piezas
   congeladas en el póster y se veía rota. */
function crearPresupuesto(max: number) {
  let active = 0;
  const waiting = new Set<() => void>();
  return {
    acquire(grant: () => void) {
      if (active < max) {
        active++;
        return true;
      }
      waiting.add(grant);
      return false;
    },
    release(grant: () => void) {
      // Si seguía en la cola nunca ocupó cupo: alcanza con sacarlo.
      if (waiting.delete(grant)) return;
      active--;
      const next = waiting.values().next();
      if (!next.done) {
        waiting.delete(next.value);
        active++;
        next.value();
      }
    },
  };
}

const clipBudget = crearPresupuesto(MAX_CLIPS);

// ── Tarjeta de video: el clip corre solo, en silencio y en bucle (como un gif).
//    Clic abre el master completo con audio y controles en el lightbox. ──
function GalleryCard({
  piece,
  index,
  onOpen,
  iaBadge = true,
  paused = false,
}: {
  piece: Piece;
  index: number;
  onOpen: (p: Piece) => void;
  iaBadge?: boolean;
  paused?: boolean;
}) {
  const thumb = autoThumb(piece);
  const preview = previewSrc(piece);
  const clickable = Boolean(piece.url);
  const lite = useLiteMode();

  const { ref, inView } = useInView<HTMLButtonElement>(0.2);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Una vez montado el <video> lo dejamos montado: al volver a scrollear
  // el clip ya está en caché y arranca instantáneo.
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);

  const wantPlay = inView && !lite && !paused && Boolean(preview);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!wantPlay) return;
    const grant = () => setGranted(true);
    if (clipBudget.acquire(grant)) setGranted(true);
    return () => {
      clipBudget.release(grant);
      setGranted(false);
    };
  }, [wantPlay]);

  const shouldPlay = wantPlay && granted;

  useEffect(() => {
    if (shouldPlay) setMounted(true);
  }, [shouldPlay]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shouldPlay) {
      v.play().catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [shouldPlay, mounted]);

  return (
    <button
      ref={ref}
      type="button"
      className={`pf-card${piece.wide ? " pf-card-wide" : ""}${clickable ? "" : " pf-card-empty"}${playing ? " pf-card-live" : ""}${seen ? " in" : ""}`}
      style={{
        gridColumn: piece.wide ? "span 2" : undefined,
        aspectRatio: piece.wide ? "16/9" : "9/16",
        animationDelay: `${(index % 5) * 0.05}s`,
      }}
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

      {mounted && preview && (
        <video
          ref={videoRef}
          className="pf-card-video"
          src={preview}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
        />
      )}

      <span className="pf-card-play"><PlayIcon /></span>
      {clickable && <span className="pf-card-hint">Ver completo</span>}
      <div className="pf-tag">
        <b>{piece.label}</b>
        <span>{piece.url ? piece.client : "+ agregar"}</span>
      </div>
    </button>
  );
}

// ── Carrusel de diseño: dos líneas que corren en sentidos opuestos.
//    Cada fila se triplica para que el bucle no deje hueco ni en monitores
//    anchos (la animación recorre un tercio del track y vuelve a empezar,
//    así que el corte nunca entra en pantalla). Pasar el mouse frena solo
//    la fila que estás mirando, para poder hacer clic sin perseguir la pieza.
function DesignMarquee({ images, onOpen }: { images: ImagePiece[]; onOpen: (p: ImagePiece) => void }) {
  const half = Math.ceil(images.length / 2);
  const rows = [images.slice(0, half), images.slice(half)];
  // Fuera de cuadro las dos cintas se frenan: son 42 imágenes desplazándose
  // y no tiene sentido pagar ese trabajo mientras nadie las mira.
  const { ref, inView } = useInView<HTMLDivElement>(0);

  return (
    <div className={`pf-dstrip${inView ? "" : " paused"}`} ref={ref}>
      {rows.map((row, r) => (
        <div className="pf-dstrip-row" key={r}>
          <div className={`pf-dstrip-track${r === 1 ? " rev" : ""}`}>
            {[0, 1, 2].map((rep) =>
              row.map((img, i) => (
                <button
                  type="button"
                  className="pf-ds-item"
                  key={`${r}-${rep}-${i}`}
                  onClick={() => img.src && onOpen(img)}
                  // Las copias 2 y 3 son decorativas: el lector de pantalla
                  // solo debería encontrar cada pieza una vez.
                  aria-hidden={rep > 0}
                  tabIndex={rep > 0 ? -1 : undefined}
                  aria-label={`Ver pieza de diseño ${i + 1}`}
                >
                  <Image src={img.src as string} alt={rep === 0 ? img.label : ""} fill
                    sizes={DESIGN_SIZES} style={{ objectFit: "cover" }} loading="lazy" />
                  <span className="pf-ds-zoom"><ZoomIcon /></span>
                </button>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (play) setMounted(true);
  }, [play]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (play) v.play().catch(() => {});
    else v.pause();
  }, [play, mounted]);

  return (
    <div className="pf-lv-shot">
      <Image src={poster} alt="" fill sizes="(max-width:900px) 90vw, 420px"
        className="pf-lv-blur" aria-hidden="true" />
      {mounted && (
        <video ref={videoRef} className="pf-lv-clip" src={src} muted loop playsInline
          autoPlay preload="none" tabIndex={-1} aria-hidden="true" disablePictureInPicture />
      )}
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

function EscalaExactitud() {
  // Retráctil y cerrada por arranque: quien viene a ver trabajo no se topa
  // con un bloque de precios, y quien se está preguntando cuánto sale lo
  // abre. Los clips solo se descargan cuando se abre.
  const { ref, inView } = useInView<HTMLElement>(0);
  const [open, setOpen] = useState(false);
  const live = inView && open;

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

// Agrupa las piezas por marca conservando el orden de aparición. Solo se
// usa cuando el capítulo tiene más de una marca: si todas comparten cliente,
// un encabezado repetido no aporta nada y se muestra la grilla de siempre.
function agruparPorMarca(pieces: Piece[]) {
  const orden: string[] = [];
  const mapa = new Map<string, Piece[]>();
  for (const p of pieces) {
    if (!mapa.has(p.client)) {
      mapa.set(p.client, []);
      orden.push(p.client);
    }
    mapa.get(p.client)!.push(p);
  }
  return orden.map((marca) => ({ marca, piezas: mapa.get(marca)! }));
}

// ── Carrusel de capítulos: los grupos pasan solos, con barra de progreso.
//    Se frena solo cuando el visitante pasa el mouse por la grilla, cuando
//    la sección no está a la vista, con la pestaña en segundo plano o con
//    el lightbox abierto — nunca se le mueve el piso al que está mirando. ──
function ChapterCarousel({
  chapters,
  onOpen,
  iaBadge = true,
  cream = false,
  paused = false,
  eyebrow,
  title,
  showDesc = true,
  intervalMs = ROTATE_MS,
}: {
  chapters: Chapter[];
  onOpen: (p: Piece) => void;
  iaBadge?: boolean;
  cream?: boolean;
  paused?: boolean;
  eyebrow?: string;
  title?: ReactNode;
  showDesc?: boolean;
  intervalMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const lite = useLiteMode();

  // threshold 0: la grilla es mucho más alta que la ventana, así que un
  // porcentaje del propio elemento nunca se alcanzaría en pantallas chicas.
  const { ref: wrapRef, inView } = useInView<HTMLDivElement>(0);
  const barRef = useRef<HTMLElement | null>(null);
  const accRef = useRef(0);

  const active = chapters[idx];
  const running = auto && !hover && !paused && inView && tabVisible && !lite;

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const go = useCallback((n: number) => {
    accRef.current = 0;
    setIdx(((n % chapters.length) + chapters.length) % chapters.length);
  }, [chapters.length]);

  // Progreso pintado con rAF directo sobre el DOM: la barra y el salto de
  // capítulo comparten el mismo reloj, y no re-renderiza la grilla 60 veces
  // por segundo con decenas de videos corriendo.
  useEffect(() => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${accRef.current / intervalMs})`;
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      accRef.current += now - last;
      last = now;
      const p = Math.min(accRef.current / intervalMs, 1);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (p >= 1) {
        accRef.current = 0;
        setIdx((i) => (i + 1) % chapters.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, idx, intervalMs, chapters.length]);

  const grupos = agruparPorMarca(active.pieces);

  return (
    <>
      {eyebrow && (
        <div className="pf-gal-head">
          <div>
            <span className={`pf-eyebrow${cream ? " pf-eyebrow-cream" : ""}`}>{eyebrow}</span>
            {title && <h2>{title}</h2>}
          </div>
          {showDesc && <p className="pf-gal-desc" key={active.id}>{active.desc}</p>}
        </div>
      )}

      <div
        className="pf-carousel"
        ref={wrapRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={`pf-tabs${cream ? " pf-tabs-cream" : ""}`} role="tablist" aria-label="Capítulos del portafolio">
          {chapters.map((ch, i) => (
            <button
              key={ch.id}
              role="tab"
              aria-selected={idx === i}
              className={`pf-tab${idx === i ? " on" : ""}`}
              onClick={() => go(i)}
            >
              <span className="n">{ch.n}</span>
              {ch.title}
              {idx === i && (
                <span className="pf-tab-prog" aria-hidden="true">
                  <i ref={(el) => { barRef.current = el; }} />
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="pf-carousel-ctl">
          <span className="pf-cnum">
            <b>{String(idx + 1).padStart(2, "0")}</b> / {String(chapters.length).padStart(2, "0")}
          </span>
          <span className="pf-cdots" aria-hidden="true">
            {chapters.map((ch, i) => (
              <i key={ch.id} className={idx === i ? "on" : undefined} />
            ))}
          </span>
          <button className="pf-cbtn" onClick={() => go(idx - 1)} aria-label="Capítulo anterior">‹</button>
          <button
            className="pf-cbtn"
            onClick={() => setAuto((a) => !a)}
            aria-label={auto ? "Pausar el paso automático" : "Reanudar el paso automático"}
          >
            {auto ? "❚❚" : "▶"}
          </button>
          <button className="pf-cbtn" onClick={() => go(idx + 1)} aria-label="Capítulo siguiente">›</button>
          <span className="pf-cmeta">{active.pieces.length} piezas</span>
        </div>

        {grupos.length > 1 ? (
          <div className="pf-marcas" key={active.id}>
            {grupos.map((g) => (
              <section className="pf-marca" key={g.marca}>
                <header className="pf-marca-head">
                  <b>{g.marca}</b>
                  <span>{g.piezas.length} {g.piezas.length === 1 ? "pieza" : "piezas"}</span>
                </header>
                {/* Tira compacta, no grilla: las tarjetas 16:9 en la grilla
                    de 5 columnas ocupaban 2 columnas cada una y cada marca se
                    comía una fila entera. Así los bloques fluyen al costado. */}
                <div className="pf-marca-tiras">
                  {g.piezas.map((p, i) => (
                    <GalleryCard key={`${active.id}-${g.marca}-${i}`} piece={p} index={i}
                      onOpen={onOpen} iaBadge={iaBadge} paused={paused} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="pf-marca-tiras pf-tiras-solas" key={active.id}>
            {active.pieces.map((p, i) => (
              <GalleryCard key={`${active.id}-${i}`} piece={p} index={i} onOpen={onOpen} iaBadge={iaBadge} paused={paused} />
            ))}
          </div>
        )}
      </div>
    </>
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
      {/* ── HERO — video de fondo con texto superpuesto ── */}
      <header className="pf-hero pf-hero-video-mode">
        <video className="pf-hero-video" src="/videos/portafolio-hero-v2.mp4"
          poster="/images/portfolio/posters/portafolio-hero.jpg"
          autoPlay muted loop playsInline preload="metadata" />
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

      {/* ── INTRO EN VUELO — la cámara atraviesa el archivo ── */}
      <div className="pf-fly-wrap">
        <ContainerStagger className="pf-3d-intro container-base">
          <ContainerAnimated>
            <span className="pf-eyebrow">20+ marcas · 2000+ piezas</span>
          </ContainerAnimated>
          <ContainerAnimated>
            <h2 className="pf-3d-title">Cinco años de producción,<br />en una sola pantalla.</h2>
          </ContainerAnimated>
        </ContainerStagger>

        <FlythroughIntro piezas={VUELO_3D} className="pf-fly" />
      </div>

      {/* ── GALERÍA — capítulos que pasan solos, todo reproduciéndose ── */}
      <section className="container-base pf-gallery" id="trabajo">
        <ChapterCarousel
          chapters={CHAPTERS}
          onOpen={setOpen}
          paused={anyOpen}
          eyebrow="El trabajo"
          title={<>Piezas hechas<br />con IA.</>}
        />
      </section>

      {/* ── DISEÑO GRÁFICO IA — doble carrusel a contramano ── */}
      <section className="pf-gallery pf-design-sec">
        {/* Encabezado deliberadamente chico: el diseño gráfico acompaña, no
            compite con el video, que es lo que vende el portafolio. */}
        <div className="container-base">
          <div className="pf-design-head">
            <span className="pf-eyebrow">Diseño gráfico IA</span>
            <p>Piezas gráficas generadas con IA <i>· {DESIGN_IMAGES.length} piezas</i></p>
          </div>
        </div>

        {/* A sangre: la línea cruza toda la pantalla, no la caja del texto. */}
        <DesignMarquee images={DESIGN_IMAGES} onOpen={setOpenImage} />
      </section>

      {/* Lightboxes */}
      {open && <Lightbox piece={open} onClose={() => setOpen(null)} />}
      {openImage && <ImageLightbox piece={openImage} onClose={() => setOpenImage(null)} />}

      {/* ── CÓMO SE COTIZA — la escala de exactitud, justo antes del archivo ── */}
      <EscalaExactitud />

      {/* ── ANTES DE LA IA — carrusel de casos + producción tradicional ── */}
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

          <ChapterCarousel
            chapters={TRADITIONAL_CHAPTERS}
            onOpen={setOpen}
            paused={anyOpen}
            iaBadge={false}
            cream
          />

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
