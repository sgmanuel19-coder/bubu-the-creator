"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { SERVICIOS, SERVICIOS_STACK, type Servicio } from "@/lib/servicios";

// Link de WhatsApp con mensaje prellenado por servicio.
function waLink(servicio: string): string {
  const msg = encodeURIComponent(`¡Hola! Quiero cotizar el servicio de ${servicio}.`);
  return `${SITE.links.whatsapp}?text=${msg}`;
}

function precioLinea(s: Servicio): { texto: string; definido: boolean } {
  if (!s.precio) return { texto: "Inversión a cotizar", definido: false };
  const rango = s.precio.hasta ? `${s.precio.desde} – ${s.precio.hasta}` : `Desde ${s.precio.desde}`;
  return { texto: rango, definido: true };
}

// ── Tarjeta de servicio ─────────────────────────────────────
function ServicioCard({ s, index, onOpen }: { s: Servicio; index: number; onOpen: (s: Servicio) => void }) {
  const precio = precioLinea(s);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
      className={`sv-card${s.destacado ? " sv-card-big" : ""}`}
      onClick={() => onOpen(s)}
      aria-label={`Ver detalle de ${s.title}`}
    >
      <div className="sv-card-top">
        <span className="sv-cat">{s.categoria}</span>
        <span className="sv-n">{s.n}</span>
      </div>

      <div className="sv-card-body">
        <h3>{s.title}</h3>
        <p>{s.tagline}</p>
      </div>

      <div className="sv-tags">
        {s.tags.map((t) => <i key={t}>{t}</i>)}
      </div>

      <div className="sv-card-foot">
        <span className={`sv-precio${precio.definido ? "" : " sv-precio-tbd"}`}>{precio.texto}</span>
        <span className="sv-arrow">Ver detalle →</span>
      </div>
    </motion.button>
  );
}

// ── Modal de detalle ────────────────────────────────────────
function ServicioModal({ s, onClose }: { s: Servicio; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const precio = precioLinea(s);

  return (
    <div className="sv-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={s.title}>
      <button className="sv-close" onClick={onClose} aria-label="Cerrar">✕</button>
      <motion.div
        className="sv-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="sv-m-head">
          <div className="sv-m-meta">
            <span className="sv-cat">{s.categoria}</span>
            <span className="sv-n">{s.n}</span>
          </div>
          <h2>{s.title}</h2>
          <p className="sv-m-desc">{s.desc}</p>
        </div>

        {/* Precio */}
        <div className={`sv-m-precio${precio.definido ? "" : " sv-m-precio-tbd"}`}>
          <b>{precio.texto}</b>
          {s.precio?.nota && <span>{s.precio.nota}</span>}
          {!s.precio && <span>El precio se define según el alcance de tu proyecto — cuéntanos tu idea y te enviamos una propuesta cerrada.</span>}
        </div>

        {/* Qué incluye */}
        <div className="sv-m-sec">
          <span className="sv-m-label">Qué incluye</span>
          <ul className="sv-m-list">
            {s.incluye.map((item) => (
              <li key={item}><i>✓</i>{item}</li>
            ))}
          </ul>
        </div>

        {/* Proceso */}
        {s.proceso && (
          <div className="sv-m-sec">
            <span className="sv-m-label">Cómo trabajamos</span>
            <div className="sv-m-pasos">
              {s.proceso.map((p, i) => (
                <div className="sv-m-paso" key={p.paso}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <b>{p.paso}</b>
                  <p>{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Factores de inversión */}
        {s.factores && (
          <div className="sv-m-sec">
            <span className="sv-m-label">Qué mueve la inversión</span>
            <div className="sv-m-factores">
              {s.factores.map((f) => <i key={f}>{f}</i>)}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="sv-m-cta">
          <a className="sv-btn" href={waLink(s.title)} target="_blank" rel="noopener noreferrer">
            Cotizar {s.title} →
          </a>
          <span>Respuesta en el día · propuesta cerrada, sin sorpresas</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Servicios() {
  const [open, setOpen] = useState<Servicio | null>(null);

  return (
    <div className="sv">
      {/* ── HERO ── */}
      <header className="sv-hero">
        <div className="sv-glow" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <span className="sv-eyebrow">Servicios — Resuelto Agency</span>
          <h1 className="sv-h1">
            Todo lo que tu marca<br /><span className="sv-grad">necesita para crecer.</span>
          </h1>
          <p className="sv-sub">
            Producción con IA, diseño, web y automatización comercial — ocho servicios,
            un mismo estándar: <strong>nivel de agencia global, velocidad de IA.</strong>
          </p>
        </div>
      </header>

      {/* ── GRILLA DE SERVICIOS ── */}
      <section className="container-base sv-grid-wrap">
        <div className="sv-grid">
          {SERVICIOS.map((s, i) => (
            <ServicioCard key={s.id} s={s} index={i} onOpen={setOpen} />
          ))}
        </div>
      </section>

      {/* Modal */}
      {open && <ServicioModal s={open} onClose={() => setOpen(null)} />}

      {/* ── STACK ── */}
      <section className="container-base sv-stack">
        <span className="sv-eyebrow">El stack detrás de cada pieza</span>
        <div className="sv-stack-row">
          {SERVICIOS_STACK.map((t) => <i key={t}>{t}</i>)}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="sv-cta">
        <div className="sv-glow-cta" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <h2>Cuéntanos tu idea,<br />y coticemos tu proyecto.</h2>
          <p>Brief → cotización cerrada → producción y entrega en semanas, no meses.</p>
          <a className="sv-btn" href={SITE.links.whatsapp} target="_blank" rel="noopener noreferrer">
            Hablemos por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
