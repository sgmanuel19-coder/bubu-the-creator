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

const ERAS = {
  vieja: ["Meses de rodaje y coordinación", "Set, locación, cast y equipo técnico", "Cada cambio exige volver a grabar", "Presupuesto abierto que siempre crece"],
  nueva: ["Semanas, de brief a entrega", "Dirección creativa + motores de IA", "Los cambios se regeneran en días", "Precio cerrado por proyecto, sin sorpresas"],
};

const METODO = [
  { n: "I", title: "Dirección y concepto", text: "Idea, guion, storyboard y definición del look. La visión que hace que la pieza se sienta de marca — no genérica. Esta capa es 100% humana." },
  { n: "II", title: "Generación", text: "Cada plano se genera y regenera decenas de veces hasta lograr consistencia, encuadre y movimiento de nivel cinematográfico." },
  { n: "III", title: "Acabado", text: "Edición, color grade, diseño sonoro y música. Lo que convierte generaciones sueltas en una pieza pulcra y coherente." },
];

const PUERTAS = [
  { n: "01", href: "/casos", title: "Portafolio", sub: "El trabajo habla primero. Comerciales, contenido, diseño y todo lo producido — con IA y antes de ella.", video: "/videos/portafolio-hero.mp4" },
  { n: "02", href: "/servicios", title: "Servicios", sub: "Trece formas de trabajar juntos: producción IA, diseño, web, estrategia y automatización comercial." },
  { n: "03", href: "/taller", title: "Academy", sub: "El mismo método que usamos con clientes, enseñado paso a paso. Empieza gratis en la bóveda." },
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

          <motion.div
            className="hm-cta-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
          >
            <Magnetic>
              <a className="hm-btn" href="/casos">Ver el trabajo <i>→</i></a>
            </Magnetic>
            <Magnetic>
              <a className="hm-btn-outline" href={waLink("¡Hola! Quiero cotizar un proyecto con Resuelto.")} target="_blank" rel="noopener noreferrer">
                Hablar por WhatsApp
              </a>
            </Magnetic>
          </motion.div>

          {/* Credenciales con count-up */}
          <motion.div
            className="hm-cred"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <span><b><Counter to={5} suffix="M+" /></b> vistas generadas</span>
            <i />
            <span><b><Counter to={20} suffix="+" /></b> marcas</span>
            <i />
            <span><b><Counter to={2000} suffix="+" /></b> piezas</span>
            <i />
            <span className="hm-cred-ag">TBWA · Fahrenheit DDB</span>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="hm-scrollcue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          aria-hidden="true"
        >
          <span>scroll</span>
          <span className="hm-scrollcue-line" />
        </motion.div>
      </header>

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

      {/* ── LOS 4 PRINCIPIOS ── */}
      <section className="container-base hm-section">
        <div className="hm-section-head">
          <div>
            <span className="hm-eyebrow">Por qué existe Resuelto</span>
            <h2>
              <LineReveal>Cuatro cosas que la</LineReveal>
              <LineReveal delay={0.1}>producción tradicional</LineReveal>
              <LineReveal delay={0.2}>no puede darte.</LineReveal>
            </h2>
          </div>
        </div>

        <div className="hm-prin-grid">
          {PRINCIPIOS.map((p, i) => (
            <motion.div
              className="hm-prin"
              key={p.n}
              initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: EASE }}
            >
              <div className="hm-prin-border" aria-hidden="true" />
              <div className="hm-prin-inner">
                <div className="hm-prin-top">
                  <span className="hm-prin-icon"><PrincipioIcon id={p.id} /></span>
                  <span className="n">{p.n}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VIEJA ERA vs NUEVA ERA ── */}
      <section className="hm-eras">
        <div className="container-base">
          <span className="hm-eyebrow">El cambio de era</span>
          <div className="hm-eras-grid">
            <motion.div
              className="hm-era hm-era-vieja"
              initial={{ opacity: 0, x: -44 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="hm-era-label">La vieja era</span>
              <ul>
                {ERAS.vieja.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.09, ease: EASE }}
                  >
                    <i>✕</i><s>{item}</s>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.span
              className="hm-eras-divider"
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            />

            <motion.div
              className="hm-era hm-era-nueva"
              initial={{ opacity: 0, x: 44 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            >
              <span className="hm-era-label">La era Resuelto</span>
              <ul>
                {ERAS.nueva.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.09, ease: EASE }}
                  >
                    <i>✓</i>{item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── EL MÉTODO ── */}
      <section className="container-base hm-section">
        <div className="hm-section-head">
          <div>
            <span className="hm-eyebrow">Cómo pensamos cada pieza</span>
            <h2>
              <LineReveal>La IA genera.</LineReveal>
              <LineReveal delay={0.12}><span className="hm-grad">El criterio dirige.</span></LineReveal>
            </h2>
          </div>
          <p>
            Toda pieza — un comercial, un empaque, una web — atraviesa las mismas tres capas.
            La diferencia entre algo genérico y algo de marca vive en la primera.
          </p>
        </div>

        <div className="hm-metodo" ref={metodoRef}>
          <motion.span className="hm-metodo-line" style={{ scaleY: metodoLine }} aria-hidden="true" />
          {METODO.map((m, i) => (
            <motion.div
              className="hm-acto"
              key={m.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <span className="hm-acto-n">{m.n}</span>
              <div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            </motion.div>
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
              <a className="hm-btn hm-btn-lg" href={waLink("¡Hola! Quiero cotizar un proyecto con Resuelto.")} target="_blank" rel="noopener noreferrer">
                Hablemos por WhatsApp <i>→</i>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
