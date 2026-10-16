"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import { SITE } from "@/lib/constants";
import { AREAS, SERVICIOS, type AreaId } from "@/lib/servicios";

const EASE = [0.16, 1, 0.3, 1] as const;

function waLink(msg: string): string {
  return `${SITE.links.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/* ── Revelado de línea con máscara (entrada tipo editorial premium).
   El observer va en el contenedor (siempre visible) y anima al hijo por
   variants — observar al hijo desplazado dentro de overflow:hidden nunca
   dispararía el IntersectionObserver. ── */
function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.span
      style={{ display: "block", overflow: "hidden" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.span
        style={{ display: "block" }}
        variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/* ── Contador animado (credenciales) ── */
function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      // ease-out expo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{val.toLocaleString("en-US")}{suffix}</span>;
}

/* ── Botón magnético ── */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ── Iconos de los 4 principios ── */
function PrincipioIcon({ id }: { id: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "velocidad":
      return <svg viewBox="0 0 24 24" {...p}><path d="M13 2L4.5 13.5h6L11 22l8.5-11.5h-6z" /></svg>;
    case "logistica":
      return <svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="8.5" /><path d="M5.5 5.5l13 13" opacity=".8" /><path d="M12 7.5v2M12 14.5v2M7.5 12h2M14.5 12h2" opacity=".45" /></svg>;
    case "motores":
      return <svg viewBox="0 0 24 24" {...p}><rect x="6" y="6" width="12" height="12" rx="2.5" /><path d="M9 2.5v3.5M15 2.5v3.5M9 18v3.5M15 18v3.5M2.5 9h3.5M2.5 15h3.5M18 9h3.5M18 15h3.5" opacity=".65" /><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" /></svg>;
    case "respaldo":
      return <svg viewBox="0 0 24 24" {...p}><path d="M12 2.8l7.5 3v6.1c0 4.8-3.2 8.3-7.5 9.6-4.3-1.3-7.5-4.8-7.5-9.6V5.8z" /><path d="M8.8 12l2.2 2.2 4.4-4.6" /></svg>;
    default:
      return null;
  }
}

const PRINCIPIOS = [
  { id: "velocidad", n: "01", title: "Velocidad real", text: "De la idea a la entrega en semanas, no meses. Los cambios se regeneran — no exigen re-rodaje." },
  { id: "logistica", n: "02", title: "Cero logística", text: "Sin cámaras, luces, set, locación ni cast. Toda la producción es dirección + IA." },
  { id: "motores", n: "03", title: "Motores de frontera", text: "Higgsfield, Kling 3.0, Seedance 2.0, ElevenLabs, HeyGen y Suno — lo más avanzado en imagen, video y sonido." },
  { id: "respaldo", n: "04", title: "Respaldo real", text: "Marcas de consumo y de lanzamiento ya producen sus campañas con nosotros. Esto no es un experimento." },
];

const METODO = [
  { n: "I", title: "Dirección y concepto", text: "Idea, guion, storyboard y definición del look. La visión que hace que la pieza se sienta de marca — no genérica. Esta capa es 100% humana." },
  { n: "II", title: "Generación", text: "Cada plano se genera y regenera decenas de veces hasta lograr consistencia, encuadre y movimiento de nivel cinematográfico." },
  { n: "III", title: "Acabado", text: "Edición, color grade, diseño sonoro y música. Lo que convierte generaciones sueltas en una pieza pulcra y coherente." },
];

const AREA_ANILLOS: Record<AreaId, { inset: string; dur: string; dir: 1 | -1 }> = {
  1: { inset: "0%", dur: "70s", dir: 1 },
  2: { inset: "17%", dur: "52s", dir: -1 },
  3: { inset: "34%", dur: "38s", dir: 1 },
};

const AREA_DIFERENCIA: Record<AreaId, string> = {
  1: "Cada contacto se mide hasta su origen. Páginas que venden, no folletos en línea.",
  2: "Un spot, un stand o un juego que nadie más tiene: la IA ejecuta, el criterio dirige.",
  3: "Tu equipo aprende con tu propia marca, no con ejemplos genéricos.",
};

const CONSTANTES = [
  { n: "1", t: "Criterio antes que herramienta" },
  { n: "2", t: "Lo medimos y lo cerramos en precio" },
  { n: "3", t: "Semanas, no meses" },
];

function DiferenciaServicios() {
  const [activa, setActiva] = useState<AreaId>(1);
  const [pausa, setPausa] = useState(false);

  useEffect(() => {
    if (pausa) return;
    const id = setInterval(() => setActiva((a) => ((a % 3) + 1) as AreaId), 5200);
    return () => clearInterval(id);
  }, [pausa]);

  const areas: AreaId[] = [1, 2, 3];

  return (
    <section className="container-base hm-section">
      <div className="hm-section-head">
        <div>
          <span className="hm-eyebrow">Qué hacemos y en qué somos distintos</span>
          <h2>
            <LineReveal>Ocho servicios.</LineReveal>
            <LineReveal delay={0.12}><span className="hm-grad">Un mismo criterio.</span></LineReveal>
          </h2>
        </div>
        <p>
          Cada servicio gira alrededor de lo mismo: una idea dirigida con criterio, medida y entregada
          a precio cerrado. Toca un anillo para ver qué hay en cada uno.
        </p>
      </div>

      <div
        className="hm-dif"
        onMouseEnter={() => setPausa(true)}
        onMouseLeave={() => setPausa(false)}
      >
        <div className="hm-orbit" aria-hidden="true">
          {areas.map((a) => {
            const svs = SERVICIOS.filter((s) => s.area === a);
            const r = AREA_ANILLOS[a];
            return (
              <button
                key={a}
                type="button"
                tabIndex={-1}
                className={`hm-ring${activa === a ? " on" : ""}`}
                style={{ inset: r.inset, animationDuration: r.dur, animationDirection: r.dir === 1 ? "normal" : "reverse" }}
                onClick={() => { setActiva(a); setPausa(true); }}
              >
                {svs.map((s, i) => {
                  const ang = (i / svs.length) * Math.PI * 2 - Math.PI / 2 + a;
                  return (
                    <span
                      key={s.id}
                      className="hm-dot"
                      style={{ left: `${50 + 50 * Math.cos(ang)}%`, top: `${50 + 50 * Math.sin(ang)}%` }}
                    />
                  );
                })}
              </button>
            );
          })}
          <div className="hm-core">
            <span>criterio</span>
          </div>
        </div>

        <div className="hm-dif-panel">
          <div className="hm-dif-tabs" role="tablist">
            {areas.map((a) => (
              <button
                key={a}
                type="button"
                role="tab"
                aria-selected={activa === a}
                className={activa === a ? "on" : ""}
                onClick={() => { setActiva(a); setPausa(true); }}
              >
                <i>{AREAS[a].n}</i>
                {AREAS[a].nombre}
              </button>
            ))}
          </div>

          <div className="hm-dif-body" key={activa}>
            <p className="hm-dif-dif">{AREA_DIFERENCIA[activa]}</p>
            <ul>
              {SERVICIOS.filter((s) => s.area === activa).map((s) => (
                <li key={s.id}>
                  <a href={`/servicios/${s.id}`}>
                    {s.title} <i>→</i>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hm-dif-const">
            {CONSTANTES.map((c) => (
              <span key={c.n}><b>{c.n}</b>{c.t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CASOS_EXITO = [
  { slug: "win-huawei", client: "WIN × Huawei", title: "Naufragar", sub: "Un salvavidas naranja que es fibra óptica." },
  { slug: "acceso-smart", client: "Acceso Smart Perú", title: "¡Ábreme!", sub: "El comercial IA completo y cómo se hizo." },
  { slug: "zlink", client: "ZLink × ExpoAgua", title: "Medir lo invisible", sub: "Lo que el agua no deja ver, medido." },
  { slug: "wellmax", client: "Wellmax", title: "Encender una idea", sub: "Una luz que se enciende y una grilla que vuelve encendida." },
  { slug: "hikaru", client: "Hikaru", title: "La primera luz", sub: "La iluminación japonesa llega a Perú." },
];

// ratio = ancho/alto del archivo ya recortado. La altura se calcula por área
// visual (no por alto fijo) para que un logo ancho no se vea más grande que
// uno compacto; boost compensa trazos finos (win) o lemas pequeños (Wellmax).
const CLIENTES = [
  { name: "WIN Internet", src: "/images/clientes/win.png", ratio: 2.43, boost: 1.3 },
  { name: "Wellmax", src: "/images/clientes/wellmax.png", ratio: 5.22, boost: 1.35 },
  { name: "Hikaru", src: "/images/clientes/hikaru.png", ratio: 3.38 },
  { name: "Livoltek", src: "/images/clientes/livoltek.svg", ratio: 5.88 },
  { name: "ZLink", src: "/images/clientes/zlink.png", ratio: 3.57 },
  { name: "Acceso Smart Perú", src: "/images/clientes/acceso-smart.png", ratio: 2.41, boost: 1.3 },
  { name: "Grimm Store", src: "/images/clientes/grimm.png", ratio: 1.11 },
];
const logoAlto = (l: { ratio: number; boost?: number }) =>
  Math.min(54, Math.round(Math.sqrt(4800 / l.ratio) * (l.boost ?? 1)));

// Carrusel curvo: los casos van comprimidos en una fila que se curva hacia
// el espectador en los extremos; el que se señala (hover, foco o toque) se
// abre y reproduce su video en silencio. "Con sonido" lo pasa a controles.
function CasosReel() {
  const [activo, setActivo] = useState(Math.floor(CASOS_EXITO.length / 2));
  const [sonido, setSonido] = useState(false);

  const espera = useRef<ReturnType<typeof setTimeout> | null>(null);

  const abrir = (i: number) => {
    if (espera.current) clearTimeout(espera.current);
    if (i === activo) return;
    setActivo(i);
    setSonido(false);
  };
  // Un instante de espera al pasar el mouse: el panel que se abre empuja a
  // los demás, y sin esto un cursor quieto abriría el vecino en cadena.
  const intencion = (i: number) => {
    if (espera.current) clearTimeout(espera.current);
    espera.current = setTimeout(() => abrir(i), 160);
  };

  return (
    <div className="hm-reel">
      {CASOS_EXITO.map((c, i) => {
        const off = i - activo;
        const on = off === 0;
        const giro = Math.sign(off) * Math.min(Math.abs(off), 2) * -11;
        return (
          <article
            key={c.slug}
            className={`hm-reel-item${on ? " on" : ""}`}
            style={{ "--giro": `${giro}deg` } as React.CSSProperties}
            onMouseEnter={() => intencion(i)}
            onMouseLeave={() => espera.current && clearTimeout(espera.current)}
            onFocus={() => abrir(i)}
            onClick={() => abrir(i)}
            tabIndex={0}
            aria-label={`${c.client}: ${c.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/videos/casos/${c.slug}.jpg`} alt="" loading="lazy" />
            {on && (
              <video
                key={`${c.slug}-${sonido}`}
                src={`/videos/casos/${c.slug}.mp4`}
                poster={`/videos/casos/${c.slug}.jpg`}
                autoPlay
                muted={!sonido}
                loop={!sonido}
                controls={sonido}
                playsInline
              />
            )}
            <span className="hm-reel-tab" aria-hidden="true">{c.client}</span>
            <div className="hm-reel-info">
              <span className="hm-caso-client">{c.client}</span>
              <strong>{c.title}</strong>
              <em>{c.sub}</em>
              {!sonido && (
                <button
                  type="button"
                  className="hm-reel-play"
                  onClick={(e) => { e.stopPropagation(); setActivo(i); setSonido(true); }}
                >
                  ▶ Ver el caso con sonido
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

const PUERTAS = [
  { n: "01", href: "/casos", title: "Portafolio", sub: "El trabajo habla primero. Comerciales, contenido, diseño y todo lo producido — con IA y antes de ella.", video: "/videos/portafolio-hero-v2.mp4" },
  { n: "02", href: "/servicios", title: "Servicios", sub: "Ocho servicios en tres áreas: marketing digital y ventas online, publicidad con IA y eventos, y capacitación en IA para tu equipo." },
  // Academy: vive en Skool desde 2026-10 (el portal /taller se eliminó).
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const metodoRef = useRef<HTMLDivElement>(null);

  // Parallax del watermark y del glow del hero
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const wmY = useTransform(heroProg, [0, 1], ["0%", "38%"]);
  const heroFade = useTransform(heroProg, [0, 0.75], [1, 0]);

  // Línea de progreso del método
  const { scrollYProgress: metodoProg } = useScroll({ target: metodoRef, offset: ["start 75%", "end 55%"] });
  const metodoLine = useSpring(metodoProg, { stiffness: 90, damping: 24 });

  return (
    <div className="hm">
      {/* Grain cinematográfico global */}
      <div className="hm-grain" aria-hidden="true" />

      {/* ── HERO — el manifiesto ── */}
      <header className="hm-hero" ref={heroRef}>
        <div className="hm-glow hm-glow-1" />
        <div className="hm-glow hm-glow-2" />
        <div className="hm-grid-tex" aria-hidden="true" />
        <motion.span className="hm-watermark" aria-hidden="true" style={{ y: wmY }}>
          RESUELTO
        </motion.span>

        <motion.div className="container-base" style={{ position: "relative", zIndex: 2, opacity: heroFade }}>
          <motion.div
            className="hm-eyebrow-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <motion.span
              className="hm-eyebrow-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            />
            <span className="hm-eyebrow-text">Agencia de producción con IA — Lima, Perú</span>
          </motion.div>

          <h1 className="hm-h1">
            <LineReveal delay={0.25}>La producción</LineReveal>
            <LineReveal delay={0.37}>publicitaria</LineReveal>
            <LineReveal delay={0.49}>cambió de era.</LineReveal>
            <LineReveal delay={0.64}><span className="hm-grad">Nosotros la dirigimos.</span></LineReveal>
          </h1>

          <motion.p
            className="hm-sub"
            initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          >
            Resuelto une <strong>5+ años de criterio en agencias globales</strong> con los motores de
            generación más avanzados del mundo. El resultado: piezas de nivel televisión,
            entregadas en semanas, con precio cerrado.
          </motion.p>

        </motion.div>

      </header>

      {/* ── VSL — Video Sales Letter ── */}
      <section className="container-base hm-section hm-vsl-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="hm-vsl-wrap"
        >
          <div className="hm-vsl-frame">
            <iframe
              src="https://www.youtube.com/embed/30bVmigalKQ?rel=0&modestbranding=1&cc_load_policy=0"
              title="Resuelto — Video de presentación"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        <motion.div
          className="hm-cta-row"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <Magnetic>
            <a className="hm-btn" href="/casos">Ver el trabajo <i>→</i></a>
          </Magnetic>
          <Magnetic>
            <a className="hm-btn-outline" href={waLink("Hola, vi su página web y quisiera agendar una llamada para cotizar mi proyecto.")} target="_blank" rel="noopener noreferrer">
              Hablar por WhatsApp
            </a>
          </Magnetic>
        </motion.div>

        {/* Credenciales con count-up */}
        <motion.div
          className="hm-cred"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span><b><Counter to={5} suffix="M+" /></b> vistas generadas</span>
          <i />
          <span><b><Counter to={20} suffix="+" /></b> marcas</span>
          <i />
          <span><b><Counter to={2000} suffix="+" /></b> piezas</span>
          <i />
          <span className="hm-cred-ag">TBWA · Fahrenheit DDB</span>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="hm-scrollcue"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          aria-hidden="true"
        >
          <span>scroll</span>
          <span className="hm-scrollcue-line" />
        </motion.div>
      </section>

      {/* ── MARQUEE CINÉTICO — statement tipográfico ── */}
      <div className="hm-kinetic" aria-hidden="true">
        <div className="hm-kinetic-row hm-kinetic-a">
          {[0, 1].map((r) => (
            <span key={r}>
              {["Dirección creativa", "Motores IA", "Nivel televisión", "Precio cerrado"].map((t) => (
                <span className="hm-kinetic-item" key={`${r}-${t}`}>{t}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
        <div className="hm-kinetic-row hm-kinetic-b">
          {[0, 1].map((r) => (
            <span key={r}>
              {["Semanas, no meses", "Cero logística", "Criterio humano", "Generación 4K"].map((t) => (
                <span className="hm-kinetic-item hm-kinetic-solid" key={`${r}-${t}`}>{t}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICIOS: CÓMO NOS DIFERENCIAMOS ── */}
      <DiferenciaServicios />

      {/* ── CASOS DE ÉXITO ── */}
      <section className="container-base hm-section">
        <div className="hm-section-head">
          <div>
            <span className="hm-eyebrow">Casos de éxito</span>
            <h2>
              <LineReveal>Ideas que se vieron.</LineReveal>
              <LineReveal delay={0.12}><span className="hm-grad">Marcas que las dirigieron.</span></LineReveal>
            </h2>
          </div>
          <p>Cada caso cuenta la idea, la ejecución y cómo se hizo. Pasa por uno para abrirlo.</p>
        </div>
        <CasosReel />
        <p className="hm-clientes-title">Nuestros clientes</p>
        <div className="hm-clientes" aria-label="Nuestros clientes">
          {CLIENTES.map((l, i) => (
            <motion.span
              key={l.name}
              className="hm-cliente"
              style={{ "--i": i } as React.CSSProperties}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.name} loading="lazy" style={{ "--h": `${logoAlto(l)}px` } as React.CSSProperties} />
            </motion.span>
          ))}
        </div>
      </section>

      {/* ── LAS PUERTAS ── */}
      <section className="hm-puertas">
        <div className="container-base">
          <span className="hm-eyebrow">Explora la agencia</span>
        </div>
        <div className="container-base hm-puertas-list">
          {PUERTAS.map((p, i) => (
            <motion.a
              className="hm-puerta"
              href={p.href}
              key={p.href}
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: EASE }}
            >
              {p.video && (
                <video className="hm-puerta-video" src={p.video} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" />
              )}
              <div className="hm-puerta-shade" />
              <div className="hm-puerta-inner">
                <span className="hm-puerta-n">{p.n}</span>
                <div className="hm-puerta-text">
                  <h3>{p.title}</h3>
                  <p>{p.sub}</p>
                </div>
                <span className="hm-puerta-arrow" aria-hidden="true">→</span>
              </div>
              <span className="hm-puerta-fill" aria-hidden="true" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="hm-cta">
        <div className="hm-glow-cta" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <h2>
            <LineReveal>Tu marca merece</LineReveal>
            <LineReveal delay={0.12}><span className="hm-grad">producir en esta era.</span></LineReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            Cuéntanos la idea. Respondemos en el día con una propuesta cerrada.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            <Magnetic>
              <a className="hm-btn hm-btn-lg" href={waLink("Hola, vi su página web y quisiera agendar una llamada para cotizar mi proyecto.")} target="_blank" rel="noopener noreferrer">
                Hablemos por WhatsApp <i>→</i>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
