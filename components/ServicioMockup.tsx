"use client";

// ============================================================
// MAQUETAS DE MECANISMO — el hero de cada servicio muestra CÓMO funciona.
// Idea de la propuesta de rediseño del 8-oct: una vista de interfaz que
// enseña el recorrido (búsqueda → WhatsApp → panel con su origen) en vez de
// describirlo. Las de interfaz llevan siempre el rótulo "vista de ejemplo,
// no datos reales" y usan un negocio genérico (tuempresa.com): el visitante
// tiene que verse a sí mismo, no a Resuelto.
//
// Todo es CSS + SVG, sin imágenes salvo la ficha de producto y el medio real.
// Estilos: bloque `.mk-` en app/globals.css.
// ============================================================

import { useState } from "react";
import Image from "next/image";
import type { Mockup } from "@/lib/servicios-detalle";

function Ventana({ titulo, vivo, children, pie }: { titulo: string; vivo?: boolean; children: React.ReactNode; pie?: string }) {
  return (
    <div className="mk-win">
      <div className="mk-bar">
        <i /><i /><i />
        <span>{titulo}</span>
        {vivo && <b className="mk-live">En vivo</b>}
      </div>
      <div className="mk-body">{children}</div>
      <p className="mk-pie">{pie ?? "Vista de ejemplo · muestra la estructura, no datos reales"}</p>
    </div>
  );
}

const Lupa = () => (
  <svg viewBox="0 0 24 24" aria-hidden><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);

// ── Google Ads: del clic al contacto ─────────────────────────
function Ads() {
  return (
    <Ventana titulo="Del clic al contacto">
      <ol className="mk-flow">
        <li style={{ "--i": 0 } as React.CSSProperties}>
          <span className="mk-k">Búsqueda en Google</span>
          <div className="mk-search"><Lupa /> inversores solares para empresas</div>
          <div className="mk-ad">
            <span className="mk-pat">Patrocinado</span>
            <span className="mk-url">tuempresa.com</span>
            <b>Inversores solares para empresas | Tu Empresa</b>
          </div>
        </li>
        <li style={{ "--i": 1 } as React.CSSProperties}>
          <span className="mk-k">Clic a WhatsApp</span>
          <div className="mk-bubble">Hola, quiero cotizar inversores para mi planta.</div>
        </li>
        <li style={{ "--i": 2 } as React.CSSProperties}>
          <span className="mk-k">Registrado en tu panel, con su origen</span>
          <div className="mk-chips"><code>whatsapp_click</code><code>google / cpc</code><code>inversores-lima</code></div>
        </li>
      </ol>
    </Ventana>
  );
}

// ── SEO: la búsqueda que sube ────────────────────────────────
function Seo() {
  return (
    <Ventana titulo="Resultados de Google">
      <div className="mk-search"><Lupa /> medidores de agua industriales</div>
      <ul className="mk-serp">
        <li className="mk-serp-yo">
          <span className="mk-pos">1</span>
          <div><span className="mk-url">tuempresa.com › medidores</span><b>Medidores de agua industriales | Tu Empresa</b></div>
          <span className="mk-up">↑ 7</span>
        </li>
        <li><span className="mk-pos">2</span><div><span className="mk-url">competencia-a.com</span><b className="mk-gris" /></div></li>
        <li><span className="mk-pos">3</span><div><span className="mk-url">competencia-b.pe</span><b className="mk-gris" /></div></li>
      </ul>
      <div className="mk-spark">
        <span className="mk-k">Clics desde Google · 6 meses</span>
        <svg viewBox="0 0 220 56" preserveAspectRatio="none" aria-hidden>
          <defs><linearGradient id="mkSeo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".35" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
          <path d="M0 50 C30 48 45 46 70 42 S110 36 130 28 S175 14 220 6 L220 56 L0 56Z" fill="url(#mkSeo)" />
          <path className="mk-line" d="M0 50 C30 48 45 46 70 42 S110 36 130 28 S175 14 220 6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </Ventana>
  );
}

// ── Web: el sitio que escribe ────────────────────────────────
function Web() {
  return (
    <Ventana titulo="tuempresa.com">
      <div className="mk-site">
        <div className="mk-site-nav"><b /><span /><span /><span /><em>Cotizar</em></div>
        <div className="mk-site-hero">
          <span className="mk-gris w60" />
          <span className="mk-gris w80 h" />
          <span className="mk-gris w45" />
          <em className="mk-site-cta">Escríbenos por WhatsApp</em>
        </div>
        <div className="mk-site-cards"><span /><span /><span /></div>
      </div>
      <div className="mk-toast">
        <i />
        <div><b>Nuevo contacto</b><span>WhatsApp · desde Google, búsqueda orgánica</span></div>
      </div>
    </Ventana>
  );
}

// ── Tienda: la ficha que vende ───────────────────────────────
function Tienda() {
  return (
    <Ventana titulo="Ficha de producto">
      <div className="mk-ficha">
        <div className="mk-ficha-img">
          <Image src="/images/portfolio/posters/producto-01.jpg" alt="" fill sizes="(max-width: 420px) 90vw, 260px" style={{ objectFit: "cover", objectPosition: "62% 70%" }} />
        </div>
        <div className="mk-ficha-txt">
          <span className="mk-k">Categoría · Iluminación</span>
          <b>Panel LED 60×60</b>
          <ul><li>40 W · 4000 K</li><li>Ficha técnica en PDF</li></ul>
          <div className="mk-ficha-btns"><em>Agregar al carrito</em><em className="wa">Cotizar por WhatsApp</em></div>
        </div>
      </div>
      <div className="mk-bubble mk-bubble-sm">Hola, quiero cotizar: Panel LED 60×60 · 20 unidades.</div>
    </Ventana>
  );
}

// ── Videojuego: cuatro casas por encender ────────────────────
function Juego() {
  return (
    <Ventana titulo="Juego de stand · pantalla táctil">
      <div className="mk-juego">
        <div className="mk-casas">
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="mk-casa" style={{ "--i": k } as React.CSSProperties}>
              <svg viewBox="0 0 24 24" aria-hidden><path d="M3 11l9-7 9 7v9H3z" fill="currentColor" /></svg>
            </span>
          ))}
        </div>
        <div className="mk-energia">
          <span className="mk-k">Energía generada</span>
          <div className="mk-barra"><i /></div>
          <div className="mk-pasos-j"><span>Recoge</span><span>Instala</span><span>Enciende</span></div>
        </div>
      </div>
    </Ventana>
  );
}

// ── Capacitación: cuatro sesiones, cuatro entregables ────────
function Programa() {
  const ses = [
    ["Pensar", "Insight y concepto"],
    ["El sistema", "Cerebro Creativo IA"],
    ["Crear", "Una pieza real"],
    ["Operar", "Grilla de 30 días"],
  ];
  return (
    <Ventana titulo="Programa in-company · 4 × 3.5 h" pie="Estructura del programa">
      <ol className="mk-prog">
        {ses.map(([t, e], k) => (
          <li key={t} style={{ "--i": k } as React.CSSProperties}>
            <span className="mk-prog-n">0{k + 1}</span>
            <div><b>{t}</b><span>Se llevan: {e}</span></div>
            <i className="mk-check" aria-hidden>✓</i>
          </li>
        ))}
      </ol>
    </Ventana>
  );
}

// ── Pieza real del portafolio ────────────────────────────────
function Media({ src, poster, etiqueta, onAbrir }: { src: string; poster: string; etiqueta: string; onAbrir?: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="mk-win mk-media">
      <button
        type="button"
        className="mk-media-in"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onAbrir}
        aria-label={`Reproducir: ${etiqueta}`}
      >
        <Image src={poster} alt={etiqueta} fill priority sizes="(max-width: 1024px) 100vw, 560px" style={{ objectFit: "cover" }} />
        {hover && <video src={src} muted loop playsInline autoPlay preload="none" />}
        <span className="mk-media-play" aria-hidden><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>
        <span className="mk-media-tag">{etiqueta}</span>
      </button>
      <p className="mk-pie">Pieza real del portafolio</p>
    </div>
  );
}

export default function ServicioMockup({ m, onAbrirMedia }: { m: Mockup; onAbrirMedia?: () => void }) {
  switch (m.tipo) {
    case "ads": return <Ads />;
    case "seo": return <Seo />;
    case "web": return <Web />;
    case "tienda": return <Tienda />;
    case "juego": return <Juego />;
    case "programa": return <Programa />;
    case "media": return <Media src={m.src} poster={m.poster} etiqueta={m.etiqueta} onAbrir={onAbrirMedia} />;
  }
}

// ── Panel de Google Ads (bloque destacado "Qué ves en tu panel") ──
// Sin cifras a propósito: barras de ancho fijo, no números inventados.
export function PanelMockup() {
  return (
    <Ventana titulo="Panel de campañas" vivo>
      <div className="mk-kpis">
        {["Inversión", "Contactos", "Costo por contacto", "Contactos calificados"].map((k, i) => (
          <div key={k} className="mk-kpi"><span className="mk-k">{k}</span><i style={{ width: `${[58, 44, 36, 30][i]}%` }} /></div>
        ))}
      </div>
      <div className="mk-chart">
        <span className="mk-k">Contactos por semana</span>
        <svg viewBox="0 0 300 70" preserveAspectRatio="none" aria-hidden>
          <defs><linearGradient id="mkPan" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".3" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
          <path d="M0 58 C40 54 70 50 100 50 S150 44 180 40 S240 30 300 18 L300 70 L0 70Z" fill="url(#mkPan)" />
          <path className="mk-line" d="M0 58 C40 54 70 50 100 50 S150 44 180 40 S240 30 300 18" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <ul className="mk-canales">
        {[["Clics a WhatsApp", 72], ["Llamadas", 44], ["Formularios", 28]].map(([n, w]) => (
          <li key={n as string}><span>{n}</span><i><b style={{ width: `${w}%` }} /></i></li>
        ))}
      </ul>
      <div className="mk-alertas"><em>Alerta de gasto</em><em>Anuncios rechazados</em></div>
    </Ventana>
  );
}
