"use client";

// ============================================================
// SERVICIO DETALLE — "Expediente revelado"
//
// Cada servicio se cuenta como un expediente técnico que se revela, en tres
// actos: I · la oferta, II · la prueba, III · la decisión. La frase ancla de
// la marca es "hacemos ver lo que no se puede filmar", y la página la actúa:
// una línea de escaneo barre el hero y revela el contenido, los miedos del
// cliente se tachan al entrar en pantalla y el configurador final emite una
// orden de trabajo que sale por WhatsApp.
//
// Estructura y textos clave: "Propuesta de rediseño web" del 8-oct (títulos
// por palabra clave, líder, maqueta del mecanismo, qué prometemos y qué no,
// casos, FAQ, relacionados, pendientes).
//
// Datos: lib/servicios.ts + lib/servicios-detalle.ts · Estilos: `.sd-`/`.mk-`.
// ============================================================

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { eventoMeta } from "@/lib/meta/evento";
import { ServicioIcon } from "@/components/Servicios";
import ServicioMockup, { PanelMockup } from "@/components/ServicioMockup";
import { AREAS, SERVICIOS, type Servicio } from "@/lib/servicios";
import {
  LIDERES,
  MOSTRAR_PENDIENTES,
  type Caso,
  type DetalleServicio,
  type Destacado,
  type Formato,
  type Pieza,
  type Variable,
} from "@/lib/servicios-detalle";

const RATIO: Record<Formato, number> = { "16/9": 16 / 9, "9/16": 9 / 16, "1/1": 1, "4/5": 0.8 };

const ACTOS = [
  { id: "acto-1", n: "I", label: "La oferta" },
  { id: "acto-2", n: "II", label: "La prueba" },
  { id: "acto-3", n: "III", label: "La decisión" },
];

const pad = (n: number) => String(n).padStart(2, "0");
const waLink = (texto: string) => `${SITE.links.whatsapp}?text=${encodeURIComponent(texto)}`;
const porId = (id: string) => SERVICIOS.find((x) => x.id === id);

// ── Revelado al entrar en pantalla ───────────────────────────
// La clase `sd-js` se pone antes del primer pintado: sin JS todo queda
// visible; con JS, lo que está abajo espera a que el observador lo revele.
function useRevelado(root: React.RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    el.classList.add("sd-js");
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, [root]);
}

// ── Riel de los tres actos ───────────────────────────────────
// El avance se escribe directo en una variable CSS del riel: si pasara por
// estado de React, la página entera se volvería a renderizar en cada scroll.
function useActos(railRef: React.RefObject<HTMLElement | null>) {
  const [acto, setActo] = useState(0);
  useEffect(() => {
    const secciones = ACTOS.map((a) => document.getElementById(a.id)).filter(
      (x): x is HTMLElement => x !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActo(secciones.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secciones.forEach((s) => io.observe(s));

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        railRef.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, h.scrollTop / max) : 0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [railRef]);
  return acto;
}

// ── Íconos de medio para los espacios por cargar ─────────────
function MedioIcon({ medio }: { medio: "video" | "foto" | "captura" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (medio === "video")
    return (
      <svg viewBox="0 0 24 24" {...p}>
        <rect x="2.5" y="5.5" width="14" height="13" rx="1.5" />
        <path d="M16.5 10l5-3v10l-5-3z" />
      </svg>
    );
  if (medio === "foto")
    return (
      <svg viewBox="0 0 24 24" {...p}>
        <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h3l1.6-2.2h5.8L16.5 7h3A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
        <circle cx="12" cy="13" r="3.4" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" {...p}>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M8.5 20.5h7M12 17v3.5" />
    </svg>
  );
}

// ── Una pieza del portafolio ─────────────────────────────────
function PiezaCard({ p, i, puedeHover, onAbrir }: { p: Pieza; i: number; puedeHover: boolean; onAbrir: (p: Pieza) => void }) {
  const [hover, setHover] = useState(false);
  const r = RATIO[p.formato];
  const estilo = { "--r": r, flexGrow: r * 100 } as React.CSSProperties;
  const clase = `sd-pz sd-pz-${p.formato.replace("/", "x")}`;

  if (p.tipo === "pendiente") {
    return (
      <div className={`${clase} sd-pz-slot`} style={estilo} data-reveal>
        <span className="sd-slot-tag">
          <i>Slot {pad(i + 1)}</i>
          <i>{p.medio} · {p.formato}</i>
        </span>
        <span className="sd-slot-icon" aria-hidden>
          <MedioIcon medio={p.medio} />
        </span>
        <span className="sd-slot-txt">
          <span className="sd-slot-state">Por cargar</span>
          <b>{p.titulo}</b>
          <span className="sd-slot-det">{p.detalle}</span>
        </span>
      </div>
    );
  }

  const imgSrc = p.tipo === "video" ? p.poster : p.src;
  return (
    <button
      type="button"
      className={clase}
      style={estilo}
      data-reveal
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onAbrir(p)}
      aria-label={`Ver ${p.titulo}${p.detalle ? `: ${p.detalle}` : ""}`}
    >
      <Image src={imgSrc} alt={p.titulo} fill sizes="(max-width: 640px) 50vw, 40vw" style={{ objectFit: "cover" }} />
      {/* El video solo existe mientras el mouse está encima: nada se descarga
          hasta que alguien muestra interés en esa pieza. */}
      {p.tipo === "video" && hover && puedeHover && (
        <video className="sd-pz-vid" src={p.src} muted loop playsInline autoPlay preload="none" />
      )}
      <span className="sd-pz-cap">
        <b>{p.titulo}</b>
        {p.detalle && <i>{p.detalle}</i>}
      </span>
      {p.tipo === "video" && (
        <span className="sd-pz-play" aria-hidden>
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
        </span>
      )}
    </button>
  );
}

// ── Bloque destacado del Acto I (varía por servicio) ─────────
function BloqueDestacado({ x, revision }: { x: Destacado; revision: boolean }) {
  if (x.tipo === "pasos" && x.requiereAutorizacion && !revision) return null;

  if (x.tipo === "panel") {
    return (
      <div className="sd-block sd-dest sd-dest-panel">
        <div data-reveal>
          <span className="sd-label">{x.label}</span>
          <h3 className="sd-h3">{x.titulo}</h3>
          <p className="sd-dest-txt">{x.texto}</p>
          <ul className="sd-checks">
            {x.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        </div>
        <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
          <PanelMockup />
        </div>
      </div>
    );
  }

  if (x.tipo === "comparar") {
    return (
      <div className="sd-block sd-dest">
        <div className="sd-dest-head" data-reveal>
          <span className="sd-label">{x.label}</span>
          <h3 className="sd-h3">{x.titulo}</h3>
          <p className="sd-dest-txt">{x.texto}</p>
        </div>
        <div className={`sd-cmp sd-cmp-${x.columnas.length}`}>
          {x.columnas.map((c, k) => (
            <div key={c.nombre} className="sd-cmp-col" data-reveal style={{ "--d": `${k * 110}ms` } as React.CSSProperties}>
              <span className="sd-mono">{c.cuando}</span>
              <b>{c.nombre}</b>
              <ul>{c.puntos.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          ))}
        </div>
        {x.nota && <p className="sd-cmp-nota" data-reveal>{x.nota}</p>}
      </div>
    );
  }

  return (
    <div className="sd-block sd-dest">
      <div className="sd-dest-head" data-reveal>
        <span className="sd-label">{x.label}</span>
        {x.requiereAutorizacion && <span className="sd-draft sd-draft-inline">Requiere autorización · solo en revisión</span>}
        <h3 className="sd-h3">{x.titulo}</h3>
        <p className="sd-dest-txt">{x.texto}</p>
      </div>
      <ol className="sd-pasos">
        {x.pasos.map((p, k) => (
          <li key={p.titulo} data-reveal style={{ "--d": `${k * 90}ms` } as React.CSSProperties}>
            <span className="sd-pasos-n" aria-hidden>{k + 1}</span>
            <div>
              <b>{p.titulo}</b>
              <p>{p.texto}</p>
              {p.seLlevan && <span className="sd-pasos-lleva">Se llevan: {p.seLlevan}</span>}
            </div>
          </li>
        ))}
      </ol>
      {x.nota && <p className="sd-cmp-nota" data-reveal>{x.nota}</p>}
    </div>
  );
}

// ── Caso real ────────────────────────────────────────────────
function CasoCard({ c, k }: { c: Caso; k: number }) {
  const cuerpo = (
    <>
      <div className="sd-caso-img">
        {c.poster ? (
          <Image src={c.poster} alt={c.cliente} fill sizes="(max-width: 1024px) 100vw, 420px" style={{ objectFit: "cover" }} />
        ) : (
          <span className="sd-caso-mono" aria-hidden>{c.cliente}</span>
        )}
        <div className="sd-caso-badges">
          {c.nuevo && <em>Nuevo</em>}
          {c.requiereAutorizacion && <em className="pend">Solo en revisión</em>}
        </div>
      </div>
      <div className="sd-caso-txt">
        <span className="sd-mono">{c.sector}</span>
        <b>{c.cliente}</b>
        <h4>{c.titulo}</h4>
        <p>{c.texto}</p>
        {c.cifras && (
          <ul className="sd-caso-cifras">{c.cifras.map((x) => <li key={x}>{x}</li>)}</ul>
        )}
        <div className="sd-caso-serv">{c.servicios.map((x) => <i key={x}>{x}</i>)}</div>
        {c.href && <span className="sd-caso-ver">Ver el caso →</span>}
      </div>
    </>
  );
  const props = { className: "sd-caso", "data-reveal": true, style: { "--d": `${k * 110}ms` } as React.CSSProperties };
  return c.href ? <Link href={c.href} {...props}>{cuerpo}</Link> : <article {...props}>{cuerpo}</article>;
}

// ── Página ───────────────────────────────────────────────────
export default function ServicioDetalle({
  s,
  d,
  total,
  siguiente,
  revision,
}: {
  s: Servicio;
  d: DetalleServicio;
  total: number;
  siguiente: Servicio;
  revision: boolean;
}) {
  const raiz = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLElement>(null);
  useRevelado(raiz);
  const acto = useActos(rail);
  const area = AREAS[s.area];

  // Casos: los que requieren autorización solo se ven en revisión.
  const casos = d.casos.filter((c) => revision || !c.requiereAutorizacion);

  // Portafolio. Los espacios por cargar llevan notas internas ("datos
  // anonimizados", "con permiso del cliente"): solo se ven en revisión. En
  // producción cada pieza aparece sola cuando se sube.
  const verSlots = revision && MOSTRAR_PENDIENTES;
  const piezas = d.portafolio.filter((p) => p.tipo !== "pendiente" || verSlots);
  const pendientes = piezas.filter((p) => p.tipo === "pendiente").length;
  const reales = piezas.length - pendientes;
  const hayPrueba = casos.length > 0 || reales > 0;
  const [abierta, setAbierta] = useState<Pieza | null>(null);
  const [puedeHover, setPuedeHover] = useState(false);
  useEffect(() => {
    setPuedeHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  useEffect(() => {
    if (!abierta) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierta(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierta]);

  // Configurador
  const [nivel, setNivel] = useState<1 | 2 | 3>(2);
  const [sel, setSel] = useState<Record<string, string[]>>({});
  const elegir = (v: Variable, op: string) =>
    setSel((prev) => {
      const cur = prev[v.id] ?? [];
      if (v.multiple) return { ...prev, [v.id]: cur.includes(op) ? cur.filter((x) => x !== op) : [...cur, op] };
      return { ...prev, [v.id]: cur[0] === op ? [] : [op] };
    });
  const paquete = d.paquetes[nivel - 1];
  const definidas = d.variables.filter((v) => (sel[v.id] ?? []).length > 0);
  const mensaje = [
    `Hola, quiero cotizar ${s.title}.`,
    `Nivel: ${paquete.nombre}`,
    ...definidas.map((v) => `• ${v.label}: ${sel[v.id].join(", ")}`),
    definidas.length < d.variables.length ? "Lo demás lo vemos en la llamada." : "",
  ]
    .filter(Boolean)
    .join("\n");

  const irAConfigurador = (n: 1 | 2 | 3) => {
    setNivel(n);
    document.getElementById("configurador")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const contacto = (origen: string) => eventoMeta("Contact", { contentName: `${s.title} · ${origen}` });

  // Pendientes (solo revisión)
  const [verPend, setVerPend] = useState(false);

  const relacionados = d.relacionados.ids.map(porId).filter((x): x is Servicio => Boolean(x));
  const media = d.mockup.tipo === "media" ? d.mockup : null;
  const largoH1 = `${d.h1} ${d.h1Acento}`.length;

  return (
    <div
      ref={raiz}
      className="sd"
      style={{ "--sd-a": s.accentRgb, "--sd-next": siguiente.accentRgb } as React.CSSProperties}
    >
      {/* ── RIEL DE ACTOS ── */}
      <nav ref={rail} className="sd-rail" aria-label="Actos de esta página">
        <span className="sd-rail-track" aria-hidden>
          <span className="sd-rail-fill" />
        </span>
        {ACTOS.map((a, k) => (
          <a key={a.id} href={`#${a.id}`} className={k === acto ? "on" : ""}>
            <b>{a.n}</b>
            <span>{a.label}</span>
          </a>
        ))}
      </nav>

      {/* ══════════════ HERO — el expediente se revela ══════════════ */}
      <header className="sd-hero">
        <div className="sd-hero-grid" aria-hidden />
        <div className="sd-hero-glow" aria-hidden />
        <span className="sd-hero-ghost" aria-hidden>{s.n}</span>
        <span className="sd-scan" aria-hidden />

        <div className="sd-hero-reveal">
          <div className="container-base sd-hero-in">
            <nav className="sd-crumbs" aria-label="Ruta">
              <Link href="/">Inicio</Link>
              <span aria-hidden>›</span>
              <Link href="/servicios">Servicios</Link>
              <span aria-hidden>›</span>
              <span aria-current="page">{s.title}</span>
              {revision && d.borrador && <span className="sd-draft">Borrador · por validar</span>}
            </nav>

            <div className="sd-hero-cols">
              <div className="sd-hero-txt">
                <p className="sd-hero-kicker">
                  <span className="sd-hero-glyph" aria-hidden><ServicioIcon id={s.id} /></span>
                  {area.nombre} · Servicio {s.n}
                </p>
                {/* Los H1 salen de la tabla de palabras clave y algunos son
                    largos: bajan de cuerpo para que el CTA quede a la vista. */}
                <h1 className={`sd-h1${largoH1 > 80 ? " sd-h1-xl" : largoH1 > 58 ? " sd-h1-l" : ""}`}>
                  {d.h1} <span className="sd-h1-acento">{d.h1Acento}</span>
                </h1>
                <p className="sd-hero-bajada">{d.bajada}</p>
                <ul className="sd-hero-tags">
                  {s.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <div className="sd-hero-cta">
                  <a
                    className="sv-btn sd-btn"
                    href={waLink(`Hola, quiero cotizar ${s.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => contacto("hero")}
                  >
                    Cotizar por WhatsApp →
                  </a>
                  <a className="sd-btn-ghost" href="#acto-3">Ver paquetes</a>
                </div>
                <div className="sd-lidera">
                  <span className="sd-mono">Lidera</span>
                  {d.lidera.map((l) => (
                    <span key={l} className="sd-lider">
                      <Image src={LIDERES[l].foto} alt="" width={34} height={34} />
                      <b>{LIDERES[l].nombre}</b>
                    </span>
                  ))}
                </div>
              </div>
              <div className="sd-hero-mock">
                <ServicioMockup
                  m={d.mockup}
                  onAbrirMedia={media ? () => setAbierta({ tipo: "video", src: media.src, poster: media.poster, titulo: media.etiqueta, formato: "16/9" }) : undefined}
                />
              </div>
            </div>

            <ol className="sd-hero-acts">
              {ACTOS.map((a) => (
                <li key={a.id}>
                  <a href={`#${a.id}`}>
                    <span className="sd-mono">Acto {a.n}</span>
                    <b>{a.label}</b>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </header>

      {/* ══════════════ ACTO I — LA OFERTA ══════════════ */}
      <section id="acto-1" className="sd-act container-base">
        <ActoHeader n="I" titulo="La oferta" kicker="Por qué esto vale más de lo que cuesta." />

        <div className="sd-split">
          <div data-reveal>
            <span className="sd-label">El problema</span>
            <h2 className="sd-pregunta">{d.pregunta}</h2>
            <p className="sd-problema">{s.problema}</p>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <span className="sd-label">Qué hacemos</span>
            <p className="sd-desc">{s.desc}</p>
            {s.stack && (
              <div className="sd-stack-mini">
                {s.stack.map((h) => <i key={h}>{h}</i>)}
              </div>
            )}
          </div>
        </div>

        <div className="sd-block sd-promesa" data-reveal>
          <span className="sd-label">La oferta</span>
          <p className="sd-promesa-nombre">{d.oferta}</p>
          <p className="sd-promesa-txt">{d.promesa}</p>
        </div>

        <div className="sd-block">
          <h3 className="sd-h3" data-reveal>
            Lo que <em>no</em> vas a tener que hacer
          </h3>
          <div className="sd-sin">
            {d.sin.map((x, k) => (
              <article key={x.miedo} className="sd-sin-card" data-reveal style={{ "--d": `${k * 140}ms` } as React.CSSProperties}>
                <span className="sd-mono">Sacrificio {pad(k + 1)}</span>
                <p className="sd-sin-miedo-wrap">
                  <span className="sd-sin-miedo">{x.miedo}</span>
                </p>
                <p className="sd-sin-porque">{x.porque}</p>
                <p className="sd-sin-como">{x.como}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="sd-block sd-gets">
          <h3 className="sd-h3" data-reveal>Lo que te llevas</h3>
          <ol>
            {s.resultado.map((r, k) => (
              <li key={r} data-reveal style={{ "--d": `${k * 70}ms` } as React.CSSProperties}>{r}</li>
            ))}
          </ol>
        </div>

        {d.destacado && <BloqueDestacado x={d.destacado} revision={revision} />}

        <div className="sd-block sd-tempo">
          <div data-reveal>
            <h3 className="sd-h3">Qué tan rápido</h3>
            <div className="sd-clock">
              <div className="sd-clock-card">
                <span className="sd-mono">Primera victoria</span>
                <b>{d.velocidad.primera.cuando}</b>
                <p>{d.velocidad.primera.que}</p>
              </div>
              <div className="sd-clock-card sd-clock-final">
                <span className="sd-mono">Resultado completo</span>
                <b>{d.velocidad.final.cuando}</b>
                <p>{d.velocidad.final.que}</p>
              </div>
            </div>
          </div>
          {s.proceso && (
            <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              <h3 className="sd-h3">Cómo trabajamos</h3>
              <ol className="sd-steps">
                {s.proceso.map((p) => (
                  <li key={p.paso}><b>{p.paso}</b><p>{p.texto}</p></li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Qué prometemos y qué no (propuesta): la honestidad como argumento */}
        <div className="sd-block sd-honesto">
          <div className="sd-honesto-si sd-corners" data-reveal>
            <span className="sd-label">Lo que firmamos</span>
            <ul className="sd-checks">
              {d.prometemos.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="sd-honesto-no" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <span className="sd-label">Lo que no prometemos</span>
            <p className="sd-honesto-q">{d.noPrometemos.pregunta}</p>
            <p className="sd-honesto-a">{d.noPrometemos.respuesta}</p>
          </div>
        </div>

        <div className="sd-fit" data-reveal>
          <div className="sd-fit-si">
            <span className="sd-label">Para quién es</span>
            <p>{s.paraQuien}</p>
          </div>
          <div className="sd-fit-no">
            <span className="sd-label">Para quién no es</span>
            <p>{d.noEsPara}</p>
          </div>
        </div>
      </section>

      {/* ══════════════ ACTO II — LA PRUEBA ══════════════ */}
      <section id="acto-2" className="sd-act container-base">
        <ActoHeader n="II" titulo="La prueba" kicker="Evidencia, no promesas. Cada caso dice qué servicio usamos." />

        {casos.length > 0 ? (
          <div className="sd-block">
            <h3 className="sd-h3" data-reveal>Casos reales</h3>
            <div className={`sd-casos sd-casos-${Math.min(casos.length, 3)}`}>
              {casos.map((c, k) => <CasoCard key={c.cliente + c.titulo} c={c} k={k} />)}
            </div>
          </div>
        ) : verSlots && d.casoPendiente ? (
          <div className="sd-block">
            <h3 className="sd-h3" data-reveal>Casos reales</h3>
            <div className="sd-caso-slot" data-reveal>
              <span className="sd-slot-state">Caso por cargar</span>
              <b>{d.casoPendiente}</b>
              <p>El próximo caso puede ser el tuyo.</p>
            </div>
          </div>
        ) : (
          !hayPrueba && (
            // Producción sin casos ni piezas publicadas: se dice tal cual, sin
            // rellenar con trabajo de otro servicio.
            <div className="sd-block sd-caso-slot sd-caso-pub" data-reveal>
              <span className="sd-label">Casos de {s.title}</span>
              <b>Publicamos cada caso con cifras reales y con permiso escrito del cliente. El primero de este servicio puede ser el tuyo.</b>
              <Link href="/casos" className="sd-gal-more">Ver el portafolio de producción →</Link>
            </div>
          )
        )}

        {piezas.length > 0 && <h3 className="sd-h3" data-reveal>Portafolio</h3>}
        {pendientes > 0 && (
          <div className="sd-gal-legend" data-reveal>
            <span><i className="dot real" />Pieza entregada · {reales}</span>
            <span><i className="dot slot" />Espacio por cargar · {pendientes}</span>
          </div>
        )}
        <div className="sd-gal">
          {piezas.map((p, k) => (
            <PiezaCard key={`${p.titulo}-${k}`} p={p} i={k} puedeHover={puedeHover} onAbrir={setAbierta} />
          ))}
        </div>
        {reales > 0 && (
          <Link href="/casos" className="sd-gal-more" data-reveal>Ver el portafolio completo →</Link>
        )}
      </section>

      {/* ══════════════ ACTO III — LA DECISIÓN ══════════════ */}
      <section id="acto-3" className="sd-act container-base">
        <ActoHeader n="III" titulo="La decisión" kicker="Tres formas de empezar. Elige una y ajusta el alcance." />

        <div className="sd-tiers">
          {d.paquetes.map((pq, k) => (
            <article
              key={pq.nombre}
              className={`sd-tier${pq.recomendado ? " rec" : ""}${pq.nivel === 3 ? " open" : ""}`}
              data-reveal
              style={{ "--d": `${k * 110}ms` } as React.CSSProperties}
            >
              <header>
                <span className="sd-mono">Nivel {pad(pq.nivel)}</span>
                {pq.recomendado && <span className="sd-rec-tag">Recomendado</span>}
                {pq.nivel === 3 && <span className="sd-mono sd-open-tag">Alcance abierto</span>}
              </header>
              <h3>{pq.nombre}</h3>
              <p className="sd-tier-para">{pq.para}</p>
              {pq.base && <p className="sd-tier-base">{pq.base}</p>}
              <ul>
                {pq.incluye.map((x) => <li key={x}><i aria-hidden>+</i>{x}</li>)}
              </ul>
              <footer>
                <span className="sd-mono">Inversión · a cotizar</span>
                <button type="button" onClick={() => irAConfigurador(pq.nivel)}>Armar este nivel →</button>
              </footer>
            </article>
          ))}
        </div>
        {d.notaPaquetes && <p className="sd-tiers-nota" data-reveal>{d.notaPaquetes}</p>}

        {/* ── Configurador: arma tu alcance → orden de trabajo ── */}
        <div id="configurador" className="sd-conf">
          <div className="sd-conf-l" data-reveal>
            <span className="sd-label">Arma tu alcance</span>
            <h3 className="sd-h3">Dinos qué necesitas. Te devolvemos una propuesta cerrada.</h3>

            <div className="sd-levels" role="radiogroup" aria-label="Nivel del paquete">
              {d.paquetes.map((pq) => (
                <button
                  key={pq.nivel}
                  type="button"
                  role="radio"
                  aria-checked={nivel === pq.nivel}
                  className={`sd-level${nivel === pq.nivel ? " on" : ""}`}
                  onClick={() => setNivel(pq.nivel)}
                >
                  <span className="sd-mono">Nivel {pad(pq.nivel)}</span>
                  <b>{pq.nombre}</b>
                </button>
              ))}
            </div>

            {d.variables.map((v) => (
              <div key={v.id} className="sd-var">
                <div className="sd-var-l">
                  <span>{v.label}</span>
                  <span>{v.multiple ? "Elige varias" : "Elige una"}</span>
                </div>
                <div className="sd-opts">
                  {v.opciones.map((op) => {
                    const on = (sel[v.id] ?? []).includes(op);
                    return (
                      <button
                        key={op}
                        type="button"
                        aria-pressed={on}
                        className={`sd-opt${on ? " on" : ""}${v.multiple ? " multi" : ""}`}
                        onClick={() => elegir(v, op)}
                      >
                        {op}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="sd-orden" aria-label="Orden de trabajo" data-reveal style={{ "--d": "150ms" } as React.CSSProperties}>
            <div className="sd-orden-head">
              <b>Orden de trabajo</b>
              <span>Resuelto Agency</span>
            </div>
            <div className="sd-orden-folio">
              <span>Folio</span>
              <span>RS-{s.n}-N{nivel}</span>
            </div>
            <dl>
              <div><dt>Servicio</dt><dd>{s.title}</dd></div>
              <div><dt>Nivel</dt><dd>{paquete.nombre}</dd></div>
            </dl>
            <dl className="sd-orden-vars">
              {d.variables.map((v) => {
                const val = sel[v.id] ?? [];
                return (
                  <div key={v.id}>
                    <dt>{v.label}</dt>
                    <dd className={val.length ? "" : "pend"}>{val.length ? val.join(", ") : "por definir"}</dd>
                  </div>
                );
              })}
            </dl>
            <div className="sd-orden-total">
              <span>Inversión</span>
              <b>A cotizar en la propuesta</b>
            </div>
            <a
              className="sd-orden-btn"
              href={waLink(mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => contacto(`configurador · nivel ${nivel}`)}
            >
              Enviar orden por WhatsApp →
            </a>
            <p className="sd-orden-nota">Te respondemos en el día. Propuesta cerrada, sin compromiso.</p>
            <span className="sd-barcode" aria-hidden />
          </aside>
        </div>

        {/* ── Preguntas frecuentes ── */}
        <div className="sd-faq">
          <div className="sd-faq-head" data-reveal>
            <span className="sd-label">Preguntas frecuentes</span>
            <h3 className="sd-h3">Antes de decidir</h3>
            <p className="sd-faq-sub">¿Tu duda no está aquí? Escríbenos: te respondemos en el día.</p>
            <a
              className="sd-btn-ghost"
              href={waLink(`Hola, tengo una pregunta sobre ${s.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => contacto("faq")}
            >
              Preguntar por WhatsApp →
            </a>
          </div>
          <div className="sd-faq-list">
            {d.faq.map((q, k) => (
              <details key={q.p} className="sd-faq-item" data-reveal open={k === 0} style={{ "--d": `${k * 60}ms` } as React.CSSProperties}>
                <summary>
                  <span>{q.p}</span>
                  <i aria-hidden />
                </summary>
                <p>{q.r}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ── Servicios relacionados ── */}
        {relacionados.length > 0 && (
          <div className="sd-rel">
            <div className="sd-rel-head" data-reveal>
              <span className="sd-label">Servicios relacionados</span>
              <h3 className="sd-h3">{d.relacionados.titulo}</h3>
              <p className="sd-dest-txt">{d.relacionados.texto}</p>
            </div>
            <div className="sd-rel-grid">
              {relacionados.map((r, k) => (
                <Link
                  key={r.id}
                  href={`/servicios/${r.id}`}
                  className="sd-rel-card"
                  data-reveal
                  style={{ "--d": `${k * 110}ms`, "--rel": r.accentRgb } as React.CSSProperties}
                >
                  <span className="sd-rel-glyph" aria-hidden><ServicioIcon id={r.id} /></span>
                  <span className="sd-mono">Servicio {r.n} · {AREAS[r.area].nombre}</span>
                  <b>{r.title}</b>
                  <p>{r.tagline}</p>
                  <span className="sd-rel-go">Ver el servicio →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ══════════════ CIERRE ══════════════ */}
      <section className="sd-cierre">
        <div className="container-base" data-reveal>
          <p className="sd-cierre-q">{d.cierre}</p>
          <div className="sd-hero-cta">
            <a
              className="sv-btn sd-btn"
              href={waLink(`Hola, quiero cotizar ${s.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => contacto("cierre")}
            >
              Hablemos por WhatsApp →
            </a>
            <span className="sd-mono">Te respondemos en el día · propuesta cerrada</span>
          </div>
        </div>
      </section>

      {/* ══════════════ SIGUIENTE EXPEDIENTE ══════════════ */}
      <Link href={`/servicios/${siguiente.id}`} className="sd-next">
        <div className="container-base">
          <span className="sd-mono">Siguiente servicio · {siguiente.n} / {pad(total)}</span>
          <h2>{siguiente.title} <span aria-hidden>→</span></h2>
          <p>{siguiente.tagline}</p>
        </div>
      </Link>

      {/* ── Pendientes (solo revisión): lo que falta decidir en esta página ── */}
      {revision && d.pendientes.length > 0 && (
        <div className={`sd-pend${verPend ? " open" : ""}`}>
          <button type="button" className="sd-pend-btn" onClick={() => setVerPend((v) => !v)} aria-expanded={verPend}>
            <b>{d.pendientes.length}</b>
            <span>Pendientes de esta página</span>
          </button>
          {verPend && (
            <div className="sd-pend-panel" role="region" aria-label="Pendientes de esta página">
              <p className="sd-mono">Solo visible en revisión · no sale en producción</p>
              <ol>{d.pendientes.map((x) => <li key={x}>{x}</li>)}</ol>
            </div>
          )}
        </div>
      )}

      {/* ── Visor ── */}
      {abierta && abierta.tipo !== "pendiente" && (
        <div className="sd-lb" role="dialog" aria-modal="true" aria-label={abierta.titulo} onClick={() => setAbierta(null)}>
          <button className="sd-lb-x" onClick={() => setAbierta(null)} aria-label="Cerrar">✕</button>
          <div className={`sd-lb-in sd-lb-${abierta.formato.replace("/", "x")}`} onClick={(e) => e.stopPropagation()}>
            {abierta.tipo === "video" ? (
              <video src={abierta.src} poster={abierta.poster} controls autoPlay playsInline />
            ) : (
              <Image src={abierta.src} alt={abierta.titulo} fill sizes="90vw" style={{ objectFit: "contain" }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ActoHeader({ n, titulo, kicker }: { n: string; titulo: string; kicker: string }) {
  return (
    <header className="sd-act-head" data-reveal>
      <span className="sd-act-num" aria-hidden>{n}</span>
      <div>
        <span className="sd-mono">Acto {n} / III</span>
        <h2>{titulo}</h2>
        <p>{kicker}</p>
      </div>
      <span className="sd-ruler" aria-hidden />
    </header>
  );
}
