"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { SOCIOS, MANIFIESTO, type Socio } from "@/lib/nosotros";

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

/* ── Ficha de socio — expediente editorial ────────────────── */
function SocioFicha({ s, index }: { s: Socio; index: number }) {
  return (
    <motion.article
      className="ns-ficha"
      style={{ ["--ns-a" as string]: s.accentRgb }}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      {/* índice */}
      <span className="ns-ficha-n">{s.n}<i>/0{SOCIOS.length}</i></span>

      {/* retrato — recuadro técnico */}
      <div className="ns-ficha-foto">
        {s.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.photo} alt={s.nombre} loading="lazy" />
        ) : (
          <div className="ns-ficha-ph" aria-label={`Foto de ${s.nombre} pendiente`}>
            <span className="x" aria-hidden="true" />
            <span className="ini">{s.iniciales}</span>
          </div>
        )}
        <span className="ns-ficha-corner tl" aria-hidden="true" />
        <span className="ns-ficha-corner br" aria-hidden="true" />
      </div>

      {/* datos */}
      <div className="ns-ficha-datos">
        <h3>{s.nombre}</h3>
        <span className="ns-ficha-linea" aria-hidden="true" />
        <p className="ns-ficha-roles">
          {s.roles.map((r, i) => (
            <span key={r}>
              {r}
              {i < s.roles.length - 1 && <i aria-hidden="true"> / </i>}
            </span>
          ))}
        </p>
        <p className="ns-ficha-bio">{s.bio}</p>
        <div className="ns-ficha-marcas">
          <span className="lbl">Marcas & proyectos</span>
          <p>{s.marcas}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Nosotros() {
  return (
    <div className="ns">
      {/* ── HERO — minimal, tipografía protagonista ── */}
      <header className="ns-hero">
        <span className="ns-hero-cross ns-cross-1" aria-hidden="true">+</span>
        <span className="ns-hero-cross ns-cross-2" aria-hidden="true">+</span>
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            className="ns-meta-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span>Resuelto Agency</span>
            <span className="dash" aria-hidden="true" />
            <span>Sobre nosotros</span>
            <span className="dash" aria-hidden="true" />
            <span>Lima, Perú</span>
          </motion.div>

          <h1 className="ns-h1">
            <LineReveal delay={0.2}>¿Tienes una idea?</LineReveal>
            <LineReveal delay={0.34}><em>Nosotros lo resolvemos.</em></LineReveal>
          </h1>

          <motion.p
            className="ns-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.65, ease: EASE }}
          >
            Tres socios fundadores. Dirección creativa, arte IA, estrategia, eventos y sonido —
            el ciclo completo de una marca, bajo un mismo techo.
          </motion.p>
        </div>
      </header>

      {/* ── MANIFIESTO ── */}
      <section className="container-base ns-section">
        <div className="ns-manifiesto">
          <div className="ns-manifiesto-side">
            <span className="ns-label">Por qué existimos</span>
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

      {/* ── LOS SOCIOS — expediente ── */}
      <section className="container-base ns-section ns-equipo" id="equipo">
        <div className="ns-equipo-head">
          <span className="ns-label">Los socios fundadores</span>
          <h2>
            <LineReveal>El equipo detrás</LineReveal>
            <LineReveal delay={0.1}>de cada entrega.</LineReveal>
          </h2>
        </div>

        <div className="ns-fichas">
          {SOCIOS.map((s, i) => <SocioFicha key={s.id} s={s} index={i} />)}
        </div>
      </section>

      {/* ── CTA — minimal ── */}
      <section className="container-base ns-cta">
        <span className="ns-label">Siguiente paso</span>
        <h2>
          <LineReveal>Cuéntanos tu idea.</LineReveal>
        </h2>
        <motion.a
          className="ns-cta-link"
          href={waLink("¡Hola! Tengo una idea y quiero conversarla con Resuelto.")}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          Hablemos por WhatsApp <i aria-hidden="true">→</i>
        </motion.a>
      </section>
    </div>
  );
}
