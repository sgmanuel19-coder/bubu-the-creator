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

// ── Glifos únicos por servicio ──────────────────────────────
export function ServicioIcon({ id }: { id: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "contenido-ia": // stack de frames con play
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <rect x="3" y="7" width="14" height="14" rx="2.5" />
          <path d="M7 4h13a1.5 1.5 0 0 1 1.5 1.5V18" opacity=".45" />
          <path d="M8.5 11.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "comerciales-ia": // claqueta de cine
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <rect x="3" y="10" width="18" height="10" rx="2" />
          <path d="M3.5 9.5l17-4.5 1 3.5-17.5 4.5z" />
          <path d="M8 8.3l2.6 2.8M13 7l2.6 2.8" opacity=".6" />
        </svg>
      );
    case "paginas-web": // navegador con cursor
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <rect x="3" y="4" width="18" height="15" rx="2.5" />
          <path d="M3 8.5h18M6 6.3h.01M8.3 6.3h.01M10.6 6.3h.01" />
          <path d="M12.5 12l6 2.2-2.7 1 1.6 2.8-1.6.9-1.6-2.8-2 2z" fill="currentColor" stroke="none" opacity=".9" />
        </svg>
      );
    case "packaging": // caja 3D
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" />
          <path d="M12 3v9M4 7.2l8 4.8 8-4.8" opacity=".6" />
        </svg>
      );
    case "diseno-ia-btl": // marco con destello
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
          <path d="M12 7.5l1.2 2.8 2.8 1.2-2.8 1.2L12 15.5l-1.2-2.8L8 11.5l2.8-1.2z" fill="currentColor" stroke="none" />
          <path d="M17 16.5h.01M7 7h.01" opacity=".7" />
        </svg>
      );
    case "chatbot-ia": // burbuja con chispa
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z" />
          <path d="M12 7l.9 2.1L15 10l-2.1.9L12 13l-.9-2.1L9 10l2.1-.9z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "base-de-datos": // cilindro DB
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
          <path d="M4.5 5.5v13c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-13" />
          <path d="M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" opacity=".6" />
        </svg>
      );
    case "email-marketing": // sobre con rayo
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3.5 7l8.5 6 8.5-6" />
          <path d="M13.2 10.5l-2.4 3.4h2l-1 2.6 2.8-3.6h-2z" fill="currentColor" stroke="none" opacity=".9" />
        </svg>
      );
    default:
      return null;
  }
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
      {/* Capas decorativas */}
      <span className="sv-sweep" aria-hidden="true" />
      <span className="sv-corner sv-corner-tl" aria-hidden="true" />
      <span className="sv-corner sv-corner-br" aria-hidden="true" />

      <div className="sv-card-top">
        <span className="sv-glyph"><ServicioIcon id={s.id} /></span>
        <div className="sv-card-top-text">
          <span className="sv-cat">{s.categoria}</span>
          <span className="sv-index">{s.n}<i>/08</i></span>
        </div>
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
