"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { SERVICIOS } from "@/lib/servicios";
import { ServicioIcon } from "@/components/Servicios";

const brands = SITE.authority.logos.map((l) => l.name);

// Pieza real destacada junto al hero — vertical, para la tarjeta flotante.
const HERO_PIECE = { src: "/videos/ugc-01.mp4", label: "UGC IA" };

// Selección curada de trabajo real para el teaser de portafolio en Home.
const HIGHLIGHTS = [
  { src: "/videos/comercial-04.mp4", label: "Comercial IA", wide: true },
  { src: "/videos/producto-03.mp4", label: "Video Producto IA" },
  { src: "/videos/ugc-03.mp4", label: "UGC IA" },
  { src: "/videos/story-05.mp4", label: "Storytelling IA" },
  { src: "/videos/avatar-04.mp4", label: "Avatar IA" },
];

// Servicios destacados para el teaser de Home (los 2 de producción + 2 de automatización).
const FEATURED_SERVICE_IDS = ["contenido-ia", "comerciales-ia", "paginas-web", "chatbot-ia"];
const FEATURED_SERVICES = FEATURED_SERVICE_IDS
  .map((id) => SERVICIOS.find((s) => s.id === id))
  .filter(Boolean) as typeof SERVICIOS;

function waLink(msg: string): string {
  return `${SITE.links.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export default function Home() {
  return (
    <div className="hm">
      {/* ── HERO ── */}
      <header className="hm-hero">
        <div className="hm-glow hm-glow-1" />
        <div className="hm-glow hm-glow-2" />
        <div className="hm-grid-tex" aria-hidden="true" />

        <div className="container-base hm-hero-grid">
          <div className="hm-hero-text">
            <span className="hm-eyebrow">Resuelto Agency — Lima, Perú</span>
            <h1 className="hm-h1">
              Producción de <span className="hm-grad">$50,000</span><br />
              al precio de un<br />
              buen brief.
            </h1>
            <p className="hm-sub">
              Comerciales de nivel televisión, contenido de marca, páginas web y automatización
              comercial — generados con IA, dirigidos con <strong>5+ años de criterio real</strong> en
              agencias globales.
            </p>

            <div className="hm-cta-row">
              <a className="hm-btn" href="/casos">Ver el portafolio →</a>
              <a className="hm-btn-outline" href={waLink("¡Hola! Quiero cotizar un proyecto con Resuelto.")} target="_blank" rel="noopener noreferrer">
                Hablar por WhatsApp
              </a>
            </div>

            <div className="hm-stats">
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

          <div className="hm-hero-video">
            <span className="hm-hero-video-badge">Hecho con IA</span>
            <video src={HERO_PIECE.src} autoPlay muted loop playsInline preload="metadata" />
            <div className="hm-hero-video-tag">
              <b>{HERO_PIECE.label}</b>
              <span>Ver el portafolio completo →</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── MARQUEE ── */}
      <div className="hm-marquee" aria-hidden="true">
        <div className="hm-marquee-inner">
          {[0, 1].map((rep) => (
            <span key={rep}>
              {["Producción IA", "Diseño", "Páginas Web", "Automatización", "Contenido de Marca"].map((t) => (
                <span className="hm-mq-item" key={`${rep}-${t}`}>{t} <i>●</i></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── PRUEBA REAL ── */}
      <section className="container-base hm-section">
        <div className="hm-section-head">
          <div>
            <span className="hm-eyebrow">No es una promesa</span>
            <h2>Es lo que ya<br />hicimos.</h2>
          </div>
          <p>Piezas reales, producidas y entregadas — no mockups, no demos genéricos.</p>
        </div>

        <div className="hm-work-grid">
          {HIGHLIGHTS.map((h, i) => (
            <motion.a
              key={h.src}
              href="/casos"
              className="hm-work-card"
              style={{ gridColumn: h.wide ? "span 2" : undefined, aspectRatio: h.wide ? "16/9" : "9/16" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
            >
              <span className="hm-ia-badge">Hecho con IA</span>
              <video src={`${h.src}#t=0.1`} muted playsInline preload="metadata" />
              <div className="hm-work-tag"><b>{h.label}</b></div>
            </motion.a>
          ))}
        </div>

        <div className="hm-section-cta">
          <a href="/casos" className="hm-btn-outline">Ver portafolio completo →</a>
        </div>
      </section>

      {/* ── SERVICIOS DESTACADOS ── */}
      <section className="container-base hm-section">
        <div className="hm-section-head">
          <div>
            <span className="hm-eyebrow">Todo en un solo lugar</span>
            <h2>Ocho servicios.<br />Un mismo estándar.</h2>
          </div>
          <p>Producción con IA, diseño, web y automatización comercial — nivel de agencia global.</p>
        </div>

        <div className="hm-serv-grid">
          {FEATURED_SERVICES.map((s, i) => (
            <motion.a
              key={s.id}
              href="/servicios"
              className="hm-serv-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <span className="hm-serv-glyph"><ServicioIcon id={s.id} /></span>
              <h3>{s.title}</h3>
              <p>{s.tagline}</p>
              <span className="hm-serv-arrow">Ver detalle →</span>
            </motion.a>
          ))}
        </div>

        <div className="hm-section-cta">
          <a href="/servicios" className="hm-btn-outline">Ver los 8 servicios →</a>
        </div>
      </section>

      {/* ── AUTORIDAD ── */}
      <section className="hm-authority">
        <div className="container-base">
          <span className="hm-eyebrow hm-eyebrow-cream">Por qué confiar el proyecto</span>
          <h2 className="hm-authority-h2">
            5+ años de cancha.<br /><span>Ahora, con IA.</span>
          </h2>
          <p className="hm-authority-lead">
            El criterio no salió de un prompt. Salió de producir para las marcas más exigentes del país —
            dentro de agencias globales top-tier — antes de dirigir esa misma exigencia hacia motores de IA.
          </p>

          <div className="hm-ticker">
            <div className="hm-ticker-inner">
              {[...brands, ...brands].map((b, i) => <span key={i}>{b}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="container-base hm-testi">
        <span className="hm-eyebrow">Lo que dicen</span>
        <div className="hm-testi-grid">
          {SITE.proof.testimonials.map((t, i) => (
            <div className="hm-t" key={i}>
              <span className="q">&ldquo;</span>
              <p>{t.text}</p>
              <footer><b>{t.company}</b><span>{t.role}</span></footer>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="hm-cta">
        <div className="hm-glow-cta" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <h2>Cuéntanos tu idea,<br />y coticemos tu proyecto.</h2>
          <p>Brief → cotización cerrada → producción y entrega en semanas, no meses.</p>
          <a className="hm-btn" href={waLink("¡Hola! Quiero cotizar un proyecto con Resuelto.")} target="_blank" rel="noopener noreferrer">
            Hablemos por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
