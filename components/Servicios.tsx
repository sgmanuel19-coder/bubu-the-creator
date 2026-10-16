"use client";

// ============================================================
// ÍNDICE DE SERVICIOS (/servicios)
// 8 servicios en 3 áreas, según la propuesta de rediseño del 8-oct. Cada área
// tiene su acordeón: el panel activo se expande y los demás quedan como
// columnas con el título vertical. Cada panel es un enlace real a la página
// del servicio (/servicios/[id]), rastreable por Google.
// Datos: lib/servicios.ts · Estilos: bloque `.sv` en app/globals.css.
// ============================================================

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { AREAS, SERVICIOS, SERVICIOS_STACK, SITUACIONES, type AreaId, type Servicio } from "@/lib/servicios";

function precioLinea(s: Servicio): { texto: string; definido: boolean } {
  if (!s.precio) return { texto: "Inversión a cotizar", definido: false };
  const rango = s.precio.hasta ? `${s.precio.desde} – ${s.precio.hasta}` : `Desde ${s.precio.desde}`;
  return { texto: rango, definido: true };
}

// ── Glifos únicos por servicio ──────────────────────────────
export function ServicioIcon({ id }: { id: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "google-ads": // lupa con barras
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 21 21" />
          <path d="M7.9 12.8v-2M10.5 12.8V8.3M13.1 12.8V9.6" opacity=".75" />
        </svg>
      );
    case "posicionamiento-seo": // ranking que sube
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M3.5 6.5h9M3.5 12h7M3.5 17.5h5" />
          <path d="M18 19.5V6.5m0 0-3.2 3.2M18 6.5l3.2 3.2" />
        </svg>
      );
    case "diseno-paginas-web": // navegador con cursor
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <rect x="3" y="4" width="18" height="15" rx="2.5" />
          <path d="M3 8.5h18M6 6.3h.01M8.3 6.3h.01M10.6 6.3h.01" />
          <path d="M12.5 12l6 2.2-2.7 1 1.6 2.8-1.6.9-1.6-2.8-2 2z" fill="currentColor" stroke="none" opacity=".9" />
        </svg>
      );
    case "tienda-virtual": // bolsa de compra
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M5 8h14l-1.2 12.2H6.2z" />
          <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
          <path d="M9.5 13.5h5" opacity=".55" />
        </svg>
      );
    case "spot-publicitario-ia": // fotogramas con play
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <rect x="3" y="7" width="14" height="14" rx="2.5" />
          <path d="M7 4h13a1.5 1.5 0 0 1 1.5 1.5V18" opacity=".45" />
          <path d="M8.5 11.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "eventos-corporativos": // escenario con foco
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M4 20h16" />
          <path d="M6.5 20V9.5h11V20" />
          <path d="M12 9.5V6" />
          <circle cx="12" cy="4.2" r="1.8" fill="currentColor" stroke="none" />
          <path d="M9 20v-4.5h6V20" opacity=".55" />
        </svg>
      );
    case "videojuegos-a-medida": // mando de juego
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M7 8h10a4.5 4.5 0 0 1 4.3 5.8l-1 3.3a2.2 2.2 0 0 1-3.8.7L14.6 15H9.4l-1.9 2.8a2.2 2.2 0 0 1-3.8-.7l-1-3.3A4.5 4.5 0 0 1 7 8z" />
          <path d="M8 10.8v3.4M6.3 12.5h3.4" />
          <circle cx="15.6" cy="11.4" r=".95" fill="currentColor" stroke="none" />
          <circle cx="17.6" cy="13.4" r=".95" fill="currentColor" stroke="none" />
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
    default:
      return null;
  }
}

// ── Panel del acordeón horizontal ───────────────────────────
// Cerrado: columna delgada con glifo + título vertical + número.
// Al hover/focus se expande (flex) y revela el contenido completo.
function ServicioPanel({ s, active, onActivate }: { s: Servicio; active: boolean; onActivate: () => void }) {
  const precio = precioLinea(s);

  return (
    <Link
      href={`/servicios/${s.id}`}
      className={`sv-panel${active ? " on" : ""}`}
      style={{ ["--sv-a" as string]: s.accentRgb }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      // En desktop el hover ya lo dejó activo, así que el clic entra directo.
      // En móvil el primer toque solo lo despliega y el segundo entra.
      onClick={(e) => {
        if (!active) {
          e.preventDefault();
          onActivate();
        }
      }}
      aria-label={`${s.title}: ver el detalle del servicio`}
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
            <span className="sv-cat">{AREAS[s.area].nombre}</span>
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
          <span className="sv-arrow">Ver el servicio →</span>
        </span>
      </span>
    </Link>
  );
}

const AREA_IDS: AreaId[] = [1, 2, 3];
const porId = (id: string) => SERVICIOS.find((x) => x.id === id)!;

export default function Servicios() {
  // Cada área tiene su propio panel abierto.
  const [activos, setActivos] = useState<Record<AreaId, number>>({ 1: 0, 2: 0, 3: 0 });

  return (
    <div className="sv">
      {/* ── HERO ── */}
      <header className="sv-hero">
        <div className="sv-glow" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <span className="sv-eyebrow">{SERVICIOS.length} servicios · 3 áreas</span>
          <h1 className="sv-h1">
            Servicios de marketing y publicidad<br /><span className="sv-grad">con IA en Lima</span>
          </h1>
          <p className="sv-sub">
            Si no apareces cuando te buscan o quieres vender en línea, empieza por el primer grupo.
            Si tu marca no convence o tienes una feria en agenda, por el segundo. Si tu equipo
            quiere producir con IA, por el tercero.
          </p>
          <nav className="sv-area-nav" aria-label="Áreas de servicio">
            {AREA_IDS.map((a) => (
              <a key={a} href={`#area-${a}`}>
                <span>{AREAS[a].n}</span>
                {AREAS[a].nombre}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── LAS TRES ÁREAS ── */}
      {AREA_IDS.map((a) => {
        const items = SERVICIOS.filter((s) => s.area === a);
        const cinta = `${AREAS[a].nombre} ✦ ${items.map((i) => i.title).join(" ✦ ")} ✦ `;
        return (
          <section key={a} id={`area-${a}`} className="sv-area">
            {/* Franja de texto en contorno que corre. Se repite dos veces y la
                animación recorre la mitad, así el bucle no deja corte. */}
            <div className="sv-cinta" aria-hidden="true">
              <div className="sv-cinta-track">
                <span>{cinta}</span>
                <span>{cinta}</span>
              </div>
            </div>
            <div className="container-base">
              <div className="sv-area-head">
                <span className="sv-area-n" aria-hidden="true">{AREAS[a].n}</span>
                <div>
                  <span className="sv-eyebrow">{AREAS[a].nombre}</span>
                  <h2>{AREAS[a].titulo}</h2>
                </div>
                <p>{AREAS[a].para}</p>
              </div>
              <div className="sv-acc">
                <div className={`sv-acc-row sv-acc-n${items.length}`}>
                  {items.map((s, i) => (
                    <ServicioPanel
                      key={s.id}
                      s={s}
                      active={activos[a] === i}
                      onActivate={() => setActivos((prev) => ({ ...prev, [a]: i }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <p className="container-base sv-acc-hint sv-hint-desktop" aria-hidden="true">Pasa el mouse por cada panel — clic para entrar al servicio</p>
      <p className="container-base sv-acc-hint sv-hint-mobile" aria-hidden="true">Toca un servicio para desplegarlo — vuelve a tocar para entrar</p>

      {/* ── SEGÚN TU SITUACIÓN ── */}
      <section className="container-base sv-sit">
        <span className="sv-eyebrow">Según tu situación</span>
        <h2>¿Qué servicio de marketing y publicidad necesita tu empresa?</h2>
        <p className="sv-sit-sub">
          Depende de dónde se te va el cliente. Ubica tu situación: el primer servicio resuelve el
          cuello de botella y el segundo es el que suele venir después.
        </p>
        <ol className="sv-sit-list">
          {SITUACIONES.map((x) => {
            const e = porId(x.empieza);
            const l = porId(x.luego);
            return (
              <li key={x.situacion}>
                <p className="sv-sit-q">{x.situacion}</p>
                <Link href={`/servicios/${e.id}`} className="sv-sit-go" style={{ ["--sv-a" as string]: e.accentRgb }}>
                  <span>Empieza por</span>
                  <b>{e.title} →</b>
                </Link>
                <Link href={`/servicios/${l.id}`} className="sv-sit-go luego" style={{ ["--sv-a" as string]: l.accentRgb }}>
                  <span>Y luego</span>
                  <b>{l.title} →</b>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── STACK ── */}
      <section className="container-base sv-stack">
        <span className="sv-eyebrow">El stack detrás de cada servicio</span>
        <div className="sv-stack-row">
          {SERVICIOS_STACK.map((t) => <i key={t}>{t}</i>)}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="sv-cta">
        <div className="sv-glow-cta" />
        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <h2>¿No sabes qué servicio necesitas?<br />Te ayudamos.</h2>
          <p>Cuéntanos qué vendes y a quién. Te respondemos en el día con una propuesta cerrada.</p>
          <a className="sv-btn" href={SITE.links.whatsapp} target="_blank" rel="noopener noreferrer">
            Hablemos por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
