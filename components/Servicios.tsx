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
    case "produccion-audiovisual-ia": // claqueta de cine
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <rect x="3" y="7" width="14" height="14" rx="2.5" />
          <path d="M7 4h13a1.5 1.5 0 0 1 1.5 1.5V18" opacity=".45" />
          <path d="M8.5 11.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "capacitacion-ia": // birrete con chispa
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M12 4.2 21.5 8.6 12 13 2.5 8.6z" />
          <path d="M6.5 10.6v4.6c0 1.5 2.6 2.7 5.5 2.7s5.5-1.2 5.5-2.7v-4.6" opacity=".55" />
          <path d="M19.4 14.6l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6z" fill="currentColor" stroke="none" />
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
    case "plataformas-saas": // cilindro de datos
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
          <path d="M4.5 5.5v13c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-13" />
          <path d="M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" opacity=".6" />
        </svg>
      );
    case "plataformas-interactivas": // nodos irradiando desde un centro
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="6.2" opacity=".55" />
          <circle cx="12" cy="12" r="9.6" opacity=".28" />
          <circle cx="18.2" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="5.8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="7.6" cy="16.4" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "eventos-b2b": // escenario con foco
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M4 20h16" />
          <path d="M6.5 20V9.5h11V20" />
          <path d="M12 9.5V6" />
          <circle cx="12" cy="4.2" r="1.8" fill="currentColor" stroke="none" />
          <path d="M9 20v-4.5h6V20" opacity=".55" />
        </svg>
      );
    default:
      return null;
  }
}

// ── Panel del acordeón horizontal ───────────────────────────
// Cerrado: columna delgada con glifo + título vertical + número.
// Al hover/focus se expande (flex) y revela el contenido completo.
function ServicioPanel({
  s,
  active,
  onActivate,
  onOpen,
}: {
  s: Servicio;
  active: boolean;
  onActivate: () => void;
  onOpen: (s: Servicio) => void;
}) {
  const precio = precioLinea(s);

  return (
    <button
      type="button"
      className={`sv-panel${active ? " on" : ""}`}
      style={{ ["--sv-a" as string]: s.accentRgb }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      // Unificado desktop/móvil: si el panel ya está abierto, el clic abre el
      // detalle; si está cerrado, primero lo despliega. En desktop el hover ya
      // lo dejó activo, así que el clic abre el detalle directo.
      onClick={() => (active ? onOpen(s) : onActivate())}
      aria-expanded={active}
      aria-label={`Ver detalle de ${s.title}`}
    >
      <span className="sv-panel-tex" aria-hidden="true" />
      <span className="sv-panel-glow" aria-hidden="true" />
      <span className="sv-panel-ghost" aria-hidden="true"><ServicioIcon id={s.id} /></span>
      <span className="sv-panel-bar" aria-hidden="true" />

      {/* Estado cerrado — título vertical */}
      <span className="sv-panel-closed" aria-hidden={active}>
        <span className="sv-glyph sv-glyph-sm"><ServicioIcon id={s.id} /></span>
        <span className="sv-panel-vtitle">{s.title}</span>
        <span className="sv-panel-vnum">{s.n}</span>
      </span>

      {/* Estado abierto — contenido completo */}
      <span className="sv-panel-open" aria-hidden={!active}>
        <span className="sv-panel-open-top">
          <span className="sv-glyph"><ServicioIcon id={s.id} /></span>
          <span>
            <span className="sv-cat">{s.categoria}</span>
            <span className="sv-index">{s.n}<i>/{String(SERVICIOS.length).padStart(2, "0")}</i></span>
          </span>
        </span>
        <span className="sv-panel-open-body">
          <b>{s.title}</b>
          <span className="sv-panel-tagline">{s.tagline}</span>
          <span className="sv-tags">
            {s.tags.map((t) => <i key={t}>{t}</i>)}
          </span>
        </span>
        <span className="sv-panel-open-foot">
          <span className={`sv-precio${precio.definido ? "" : " sv-precio-tbd"}`}>{precio.texto}</span>
          <span className="sv-arrow">Ver detalle →</span>
        </span>
      </span>
    </button>
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
          <p className="sv-m-problema">{s.problema}</p>
          <p className="sv-m-desc">{s.desc}</p>
        </div>

        {/* Lo que te llevas — va ANTES del precio: primero el valor, después la cifra */}
        <div className="sv-m-sec">
          <span className="sv-m-label">Lo que te llevas</span>
          <ul className="sv-m-list sv-m-list-res">
            {s.resultado.map((item) => (
              <li key={item}><i>→</i>{item}</li>
            ))}
          </ul>
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

        {/* Para quién es */}
        {s.paraQuien && (
          <div className="sv-m-sec">
            <span className="sv-m-label">Para quién es</span>
            <p className="sv-m-paraquien">{s.paraQuien}</p>
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

        {/* Stack — cinta que corre. No son entregables: es con qué está
            hecho el servicio. Se repite tres veces y la animación recorre
            un tercio, así el bucle no deja hueco ni corte visible. */}
        {s.stack && s.stack.length > 0 && (
          <div className="sv-m-sec">
            <span className="sv-m-label">El stack detrás</span>
            <div className="sv-stack">
              <div className="sv-stack-track">
                {[0, 1, 2].map((rep) =>
                  s.stack!.map((h) => (
                    <span key={`${rep}-${h}`} className="sv-stack-item" aria-hidden={rep > 0}>
                      {h}
                    </span>
                  ))
                )}
              </div>
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

// Reparte los servicios en dos filas equilibradas para el acordeón.
const SPLIT = Math.ceil(SERVICIOS.length / 2);
const ROWS = [
  { start: 0, items: SERVICIOS.slice(0, SPLIT) },
  { start: SPLIT, items: SERVICIOS.slice(SPLIT) },
];

export default function Servicios() {
  const [open, setOpen] = useState<Servicio | null>(null);
  const [active, setActive] = useState(0);

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
            Producción audiovisual con IA, desarrollo web y software, eventos B2B,
            capacitación y plataformas interactivas —{" "}{SERVICIOS.length} servicios,
            un mismo estándar: <strong>nivel de agencia global, velocidad de IA.</strong>
          </p>

          <div className="sv-range">
            <div className="sv-range-bar" />
            <div className="sv-range-labels">
              <div><b>$2,000</b><span>El punto de entrada</span></div>
              <div className="end"><b>+$10,000</b><span>Campañas completas y producción recurrente</span></div>
            </div>
            <p className="sv-range-note">
              Rango de referencia de <b>producción audiovisual</b>: mientras más piezas,
              más comerciales y más producción recurrente, más se acerca a <b>+$10,000</b>.
              Desarrollo, eventos, capacitación y plataformas se cotizan por proyecto.
            </p>
          </div>
        </div>
      </header>

      {/* ── ACORDEÓN DE SERVICIOS ──
          Se reparte en dos filas: los paneles en una sola cinta no dejarían
          espacio para que el activo se expanda. La fila que NO contiene el
          panel activo reparte su ancho en partes iguales (clase "idle"). */}
      <section className="container-base sv-grid-wrap">
        <div className="sv-acc">
          {ROWS.map((row, r) => {
            const hasActive = active >= row.start && active < row.start + row.items.length;
            return (
              <div className={`sv-acc-row${hasActive ? "" : " idle"}`} key={r}>
                {row.items.map((s, i) => {
                  const idx = row.start + i;
                  return (
                    <ServicioPanel
                      key={s.id}
                      s={s}
                      active={active === idx}
                      onActivate={() => setActive(idx)}
                      onOpen={setOpen}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <p className="sv-acc-hint sv-hint-desktop" aria-hidden="true">Pasa el mouse por cada panel — clic para ver el detalle completo</p>
        <p className="sv-acc-hint sv-hint-mobile" aria-hidden="true">Toca un servicio para desplegarlo — vuelve a tocar para ver el detalle</p>
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
