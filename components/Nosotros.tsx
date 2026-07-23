"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { SOCIOS, MANIFIESTO, PILARES, TRAYECTORIA, type Socio } from "@/lib/nosotros";

const EASE = [0.16, 1, 0.3, 1] as const;

function waLink(msg: string): string {
  return `${SITE.links.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/* Revelado de línea con máscara (observer en el contenedor visible) */
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

/* ── Tarjeta de socio ─────────────────────────────────────── */
function SocioCard({ s, index }: { s: Socio; index: number }) {
  return (
    <motion.article
      className="ns-socio"
      style={{ ["--ns-a" as string]: s.accentRgb }}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: EASE }}
    >
      {/* Retrato / placeholder */}
      <div className="ns-foto">
        {s.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.photo} alt={s.nombre} loading="lazy" />
        ) : (
          <div className="ns-foto-ph" aria-label={`Foto de ${s.nombre} pendiente`}>
            <span className="ns-foto-ini">{s.iniciales}</span>
            <span className="ns-foto-nota">Foto pendiente</span>
          </div>
        )}
        <span className="ns-foto-shade" aria-hidden="true" />
        <span className="ns-foto-n" aria-hidden="true">{s.n}</span>
      </div>

      {/* Datos */}
      <div className="ns-socio-body">
        <h3>{s.nombre}</h3>
        <p className="ns-rol">{s.rol}</p>
        <p className="ns-bio">{s.bio}</p>
        <div className="ns-focos">
          {s.focos.map((f) => <i key={f}>{f}</i>)}
        </div>
      </div>

      <span className="ns-socio-bar" aria-hidden="true" />
    </motion.article>
  );
}

export default function Nosotros() {
  return (
    <div className="ns">
      {/* ── HERO ── */}
      <header className="ns-hero">
        <div className="ns-glow" />
        <div className="ns-grid-tex" aria-hidden="true" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <motion.span
            className="ns-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Sobre nosotros — Resuelto Agency
          </motion.span>

          <h1 className="ns-h1">
            <LineReveal delay={0.2}>Tres socios.</LineReveal>
            <LineReveal delay={0.32}><span className="ns-grad">Un solo estándar.</span></LineReveal>
          </h1>

          <motion.p
            className="ns-sub"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.6, ease: EASE }}
          >
            Estrategia, producción con IA y tecnología. El ciclo completo de una marca,
            cubierto por gente que se formó donde el error se paga caro.
          </motion.p>
        </div>
      </header>

      {/* ── MANIFIESTO ── */}
      <section className="container-base ns-section">
        <div className="ns-manifiesto">
          <div className="ns-manifiesto-side">
            <span className="ns-eyebrow">Por qué existimos</span>
          </div>
          <div className="ns-manifiesto-text">
            {MANIFIESTO.map((p, i) => (
              <motion.p
                key={i}
                className={i === 0 ? "lead" : ""}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOS SOCIOS ── */}
      <section className="container-base ns-section ns-equipo">
        <div className="ns-section-head">
          <div>
            <span className="ns-eyebrow">El equipo</span>
            <h2>
              <LineReveal>Quiénes están</LineReveal>
              <LineReveal delay={0.1}>detrás de cada pieza.</LineReveal>
            </h2>
          </div>
          <p>
            Cada socio dirige un pilar del negocio. No tercerizamos el criterio:
            el que te atiende es el que ejecuta.
          </p>
        </div>

        <div className="ns-socios">
          {SOCIOS.map((s, i) => <SocioCard key={s.id} s={s} index={i} />)}
        </div>
      </section>

      {/* ── PILARES ── */}
      <section className="ns-pilares">
        <div className="container-base">
          <span className="ns-eyebrow">Cómo nos dividimos el trabajo</span>
          <div className="ns-pilares-grid">
            {PILARES.map((p, i) => (
              <motion.div
                className="ns-pilar"
                key={p.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              >
                <span className="n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAYECTORIA ── */}
      <section className="container-base ns-section">
        <div className="ns-section-head">
          <div>
            <span className="ns-eyebrow">De dónde viene el criterio</span>
            <h2>
              <LineReveal>No lo aprendimos</LineReveal>
              <LineReveal delay={0.1}><span className="ns-grad">en un curso.</span></LineReveal>
            </h2>
          </div>
        </div>

        <ol className="ns-tl">
          {TRAYECTORIA.map((t, i) => (
            <motion.li
              key={t.company}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
            >
              <span className="ns-tl-year">{t.year}</span>
              <span className="ns-tl-dot" aria-hidden="true" />
              <span className="ns-tl-body">
                <b>{t.company}</b>
                <span>{t.text}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ── CTA ── */}
      <section className="ns-cta">
        <div className="ns-glow-cta" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <h2>
            <LineReveal>Trabajemos</LineReveal>
            <LineReveal delay={0.12}><span className="ns-grad">juntos.</span></LineReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            Cuéntanos qué necesita tu marca. Respondemos en el día con una propuesta cerrada.
          </motion.p>
          <motion.a
            className="ns-btn"
            href={waLink("¡Hola! Quiero conversar con Resuelto sobre un proyecto.")}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            Hablemos por WhatsApp <i>→</i>
          </motion.a>
        </div>
      </section>
    </div>
  );
}
