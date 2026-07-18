"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

function waLink(msg: string): string {
  return `${SITE.links.whatsapp}?text=${encodeURIComponent(msg)}`;
}

// ── Los 4 principios de la agencia (tarifario 2026) ──────────
const PRINCIPIOS = [
  {
    n: "01",
    title: "Velocidad real",
    text: "De la idea a la entrega en semanas, no meses. Los cambios se regeneran — no exigen re-rodaje.",
  },
  {
    n: "02",
    title: "Cero logística",
    text: "Sin cámaras, luces, set, locación ni cast. Toda la producción es dirección + IA.",
  },
  {
    n: "03",
    title: "Motores de frontera",
    text: "Higgsfield, Kling 3.0, Seedance 2.0, ElevenLabs, HeyGen y Suno — lo más avanzado en imagen, video y sonido.",
  },
  {
    n: "04",
    title: "Respaldo real",
    text: "Marcas de consumo y de lanzamiento ya producen sus campañas con nosotros. Esto no es un experimento.",
  },
];

// ── Vieja era vs. nueva era ─────────────────────────────────
const ERAS = {
  vieja: [
    "Meses de rodaje y coordinación",
    "Set, locación, cast y equipo técnico",
    "Cada cambio exige volver a grabar",
    "Presupuesto abierto que siempre crece",
  ],
  nueva: [
    "Semanas, de brief a entrega",
    "Dirección creativa + motores de IA",
    "Los cambios se regeneran en días",
    "Precio cerrado por proyecto, sin sorpresas",
  ],
};

// ── El método — las 3 capas de toda pieza ───────────────────
const METODO = [
  {
    n: "I",
    title: "Dirección y concepto",
    text: "Idea, guion, storyboard y definición del look. La visión que hace que la pieza se sienta de marca — no genérica. Esta capa es 100% humana.",
  },
  {
    n: "II",
    title: "Generación",
    text: "Cada plano se genera y regenera decenas de veces hasta lograr consistencia, encuadre y movimiento de nivel cinematográfico.",
  },
  {
    n: "III",
    title: "Acabado",
    text: "Edición, color grade, diseño sonoro y música. Lo que convierte generaciones sueltas en una pieza pulcra y coherente.",
  },
];

// ── Las puertas del sitio ───────────────────────────────────
const PUERTAS = [
  {
    n: "01",
    href: "/casos",
    title: "Portafolio",
    sub: "El trabajo habla primero. Comerciales, contenido, diseño y todo lo producido — con IA y antes de ella.",
    cta: "Ver el trabajo",
    video: "/videos/portafolio-hero.mp4",
  },
  {
    n: "02",
    href: "/servicios",
    title: "Servicios",
    sub: "Ocho formas de trabajar juntos: producción IA, diseño, web y automatización comercial.",
    cta: "Ver los servicios",
  },
  {
    n: "03",
    href: "/taller",
    title: "Academy",
    sub: "El mismo método que usamos con clientes, enseñado paso a paso. Empieza gratis en la bóveda.",
    cta: "Conocer la Academy",
  },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay },
});

export default function Home() {
  return (
    <div className="hm">
      {/* ── HERO — el manifiesto ── */}
      <header className="hm-hero">
        <div className="hm-glow hm-glow-1" />
        <div className="hm-glow hm-glow-2" />
        <div className="hm-grid-tex" aria-hidden="true" />
        <span className="hm-watermark" aria-hidden="true">RESUELTO</span>

        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <motion.span className="hm-eyebrow" {...reveal(0.05)}>
            Agencia de producción con IA — Lima, Perú
          </motion.span>

          <motion.h1 className="hm-h1" {...reveal(0.15)}>
            La producción<br />
            publicitaria cambió<br />
            de era. <span className="hm-grad">Nosotros<br />la dirigimos.</span>
          </motion.h1>

          <motion.p className="hm-sub" {...reveal(0.3)}>
            Resuelto une <strong>5+ años de criterio en agencias globales</strong> con los motores de
            generación más avanzados del mundo. El resultado: piezas de nivel televisión,
            entregadas en semanas, con precio cerrado.
          </motion.p>

          <motion.div className="hm-cta-row" {...reveal(0.45)}>
            <a className="hm-btn" href="/casos">Ver el trabajo →</a>
            <a className="hm-btn-outline" href={waLink("¡Hola! Quiero cotizar un proyecto con Resuelto.")} target="_blank" rel="noopener noreferrer">
              Hablar por WhatsApp
            </a>
          </motion.div>

          {/* Firma de credenciales — una línea, no un bloque */}
          <motion.p className="hm-cred" {...reveal(0.6)}>
            5M+ vistas generadas · 20+ marcas · 2,000+ piezas · TBWA · Fahrenheit DDB
          </motion.p>
        </div>
      </header>

      {/* ── LOS 4 PRINCIPIOS ── */}
      <section className="container-base hm-section">
        <div className="hm-section-head">
          <div>
            <span className="hm-eyebrow">Por qué existe Resuelto</span>
            <h2>Cuatro cosas que la<br />producción tradicional<br />no puede darte.</h2>
          </div>
        </div>

        <div className="hm-prin-grid">
          {PRINCIPIOS.map((p, i) => (
            <motion.div className="hm-prin" key={p.n} {...reveal(i * 0.08)}>
              <span className="n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VIEJA ERA vs NUEVA ERA ── */}
      <section className="hm-eras">
        <div className="container-base">
          <span className="hm-eyebrow">El cambio de era</span>
          <div className="hm-eras-grid">
            <motion.div className="hm-era hm-era-vieja" {...reveal(0.05)}>
              <span className="hm-era-label">La vieja era</span>
              <ul>
                {ERAS.vieja.map((item) => (
                  <li key={item}><i>✕</i>{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="hm-era hm-era-nueva" {...reveal(0.15)}>
              <span className="hm-era-label">La era Resuelto</span>
              <ul>
                {ERAS.nueva.map((item) => (
                  <li key={item}><i>✓</i>{item}</li>
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
            <h2>La IA genera.<br />El criterio dirige.</h2>
          </div>
          <p>
            Toda pieza — un comercial, un empaque, una web — atraviesa las mismas tres capas.
            La diferencia entre algo genérico y algo de marca vive en la primera.
          </p>
        </div>

        <div className="hm-metodo">
          {METODO.map((m, i) => (
            <motion.div className="hm-acto" key={m.n} {...reveal(i * 0.1)}>
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
            <motion.a className="hm-puerta" href={p.href} key={p.href} {...reveal(i * 0.08)}>
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
                <span className="hm-puerta-cta">{p.cta} →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="hm-cta">
        <div className="hm-glow-cta" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <h2>Tu marca merece<br />producir en esta era.</h2>
          <p>Cuéntanos la idea. Respondemos en el día con una propuesta cerrada.</p>
          <a className="hm-btn" href={waLink("¡Hola! Quiero cotizar un proyecto con Resuelto.")} target="_blank" rel="noopener noreferrer">
            Hablemos por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
