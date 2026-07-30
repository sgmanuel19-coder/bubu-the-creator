"use client";

import { useEffect, useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { trackMeta, trackTaller } from "@/lib/taller/analytics";
import ComunidadCard from "@/components/taller/ComunidadCard";
import IcebergSistema from "@/components/taller/IcebergSistema";
import VersusAnimado from "@/components/taller/VersusAnimado";
import RutaDelSistema from "@/components/taller/RutaDelSistema";
import ValorGrafico from "@/components/taller/ValorGrafico";

// Un clic de compra dispara ambos sistemas de medición:
// Vercel Analytics (funnel propio) + Pixel de Meta (optimización de pauta).
function clickComprar(producto: "boveda" | "grabado" | "vivo") {
  trackTaller("taller_cta_comprar", { producto });
  trackMeta("InitiateCheckout", {
    content_name: `Masterclass Creatividad Publicitaria IA — ${producto}`,
  });
}

const inputStyle: React.CSSProperties = {
  background: "rgba(244,240,222,0.06)",
  border: "1px solid rgba(244,240,222,0.18)",
  color: "var(--cream)",
};

const cardStyle: React.CSSProperties = {
  borderColor: "rgba(244,240,222,0.12)",
  background: "var(--surface)",
};

function waLink(mensaje: string) {
  return `${TALLER.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// CTA del grabado: checkout directo (Hotmart); si aún no hay link, WhatsApp.
function urlGrabado() {
  const g = TALLER.gate.productos.grabado;
  return g.hotmartUrl || waLink(g.mensajeWhatsApp);
}

// CTA del vivo: SIEMPRE WhatsApp (se cierra por conversación).
function urlVivo() {
  return waLink(TALLER.gate.productos.vivo.mensajeWhatsApp);
}

// CTA de la bóveda: sin Hotmart, siempre WhatsApp (bandeja de pago manual).
function urlBoveda() {
  return waLink(TALLER.gate.productos.boveda.mensajeWhatsApp);
}

// ── CTA fijo en móvil (aparece tras pasar el hero) ────────────
function StickyCompra() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t px-4 py-3 pr-24 backdrop-blur-md lg:hidden"
      style={{ borderColor: "rgba(244,240,222,0.12)", background: "rgba(13,12,8,0.92)" }}
    >
      <a
        href="#precios"
        onClick={() => trackTaller("taller_cta_comprar", { producto: "sticky-precios" })}
        className="flex items-center justify-between rounded-xl px-5 py-3 text-sm font-semibold"
        style={{ background: "var(--green)", color: "#fff" }}
      >
        <span>Elegir mi acceso</span>
        <span className="text-xs font-normal opacity-90">$25 · $120 · $250 →</span>
      </a>
    </div>
  );
}

// ── Registro para quien ya pagó y no tiene contraseña ─────────
function RegistroCard() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [producto, setProducto] = useState("Masterclass en vivo");
  const [web, setWeb] = useState(""); // honeypot: los humanos nunca lo ven
  const [estado, setEstado] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  async function handleRegistro(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShowWhatsApp(false);
    setEstado("sending");
    try {
      const res = await fetch("/api/taller/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, producto, web }),
      });
      const data = await res.json();
      if (data.ok) {
        trackTaller("taller_registro", { producto });
        setEstado("done");
        return;
      }
      setError(data.error ?? "No pudimos enviar tu registro.");
      if (data.fallback === "whatsapp") setShowWhatsApp(true);
      setEstado("idle");
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
      setEstado("idle");
    }
  }

  if (estado === "done") {
    return (
      <div
        className="rounded-2xl border p-6 text-center"
        style={{ borderColor: "rgba(26,128,255,0.4)" }}
      >
        <p className="text-lg font-semibold">Registro recibido ✓</p>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Te enviaremos la contraseña a{" "}
          <span style={{ color: "var(--cream)" }}>{email}</span> apenas
          confirmemos tu inscripción.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegistro} className="space-y-4">
      {/* Honeypot anti-spam: invisible y fuera del orden de tabulación */}
      <input
        type="text"
        name="web"
        value={web}
        onChange={(e) => setWeb(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="mb-1.5 block text-sm">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm">
            Correo
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@gmail.com"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
            style={inputStyle}
          />
        </div>
      </div>
      <div>
        <label htmlFor="producto" className="mb-1.5 block text-sm">
          ¿Qué compraste?
        </label>
        <select
          id="producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={inputStyle}
        >
          <option>Masterclass en vivo</option>
          <option>Curso grabado</option>
          <option>Aún no compro — quiero info</option>
        </select>
      </div>
      {error && (
        <p className="text-sm" style={{ color: "#FF7A7A" }} role="alert">
          {error}
        </p>
      )}
      {showWhatsApp && (
        <a
          href={TALLER.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl border py-3 text-center text-sm font-semibold"
          style={{ borderColor: "rgba(244,240,222,0.25)" }}
        >
          Pedir acceso por WhatsApp →
        </a>
      )}
      <button
        type="submit"
        disabled={estado === "sending"}
        className="w-full rounded-xl py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ background: "var(--green)", color: "#fff" }}
      >
        {estado === "sending" ? "Enviando…" : "Solicitar mi contraseña"}
      </button>
    </form>
  );
}

// ── Tarjeta de producto (bóveda / grabado / vivo) ─────────────
function ProductoCard({ tipo }: { tipo: "boveda" | "grabado" | "vivo" }) {
  const p = TALLER.gate.productos[tipo];
  const esVivo = tipo === "vivo";
  const vivo = TALLER.gate.productos.vivo;
  const href = tipo === "vivo" ? urlVivo() : tipo === "grabado" ? urlGrabado() : urlBoveda();
  return (
    <div
      className="flex flex-col rounded-3xl border p-6 sm:p-8"
      style={
        esVivo
          ? {
              borderColor: "rgba(26,128,255,0.55)",
              background:
                "linear-gradient(180deg, rgba(26,128,255,0.10), rgba(26,128,255,0.02))",
            }
          : cardStyle
      }
    >
      {esVivo && (
        <span
          className="mb-3 self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
          style={{ background: "var(--green)", color: "#fff" }}
        >
          Recomendado
        </span>
      )}
      <h3 className="text-lg font-bold">{p.nombre}</h3>
      <p className="mt-3">
        <span className="text-4xl font-bold">{p.precio}</span>{" "}
        <span className="text-sm" style={{ color: "var(--muted)" }}>
          ({p.precioLocal})
        </span>
      </p>
      <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
        {p.nota}
      </p>
      {p.valorTotal && (
        <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
          Valor total de lo incluido: <s>{p.valorTotal}</s>
        </p>
      )}

      {esVivo && vivo.precioFundador && (
        <p
          className="mt-3 rounded-xl border px-3 py-2 text-sm font-medium"
          style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
        >
          🔥 {vivo.precioFundador}
        </p>
      )}
      {esVivo && vivo.proximaCohorte && (
        <p className="mt-2 text-sm font-medium">📅 {vivo.proximaCohorte}</p>
      )}
      {esVivo && vivo.cupos && (
        <p className="mt-1 text-sm font-medium" style={{ color: "var(--green)" }}>
          {vivo.cupos}
        </p>
      )}

      <ul className="mt-5 flex-1 space-y-2.5">
        {p.beneficios.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px]"
              style={{ background: "rgba(26,128,255,0.18)", color: "var(--green)" }}
            >
              ✓
            </span>
            {b}
          </li>
        ))}
      </ul>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => clickComprar(tipo)}
        className="mt-6 rounded-xl py-3.5 text-center text-sm font-semibold transition-opacity hover:opacity-90"
        style={
          esVivo
            ? { background: "var(--green)", color: "#fff" }
            : {
                border: "1px solid rgba(244,240,222,0.3)",
                color: "var(--cream)",
              }
        }
      >
        {p.cta} →
      </a>
      <p className="mt-4 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
        🛡 {p.garantia}
        {p.garantiaLink && (
          <>
            {" "}
            <a
              href={p.garantiaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
              style={{ color: "var(--green)" }}
            >
              Ver mi portafolio →
            </a>
          </>
        )}
      </p>
    </div>
  );
}

// ── Landing (Inicio) ──────────────────────────────────────────
// El header/nav lo pone PortalNav desde la página; aquí sólo va el
// contenido de venta.
export default function TallerGate() {
  const { gate } = TALLER;

  useEffect(() => {
    trackMeta("ViewContent", {
      content_name: "Masterclass Creatividad Publicitaria IA — landing",
    });
  }, []);

  // Galería "Míralo en acción": clic abre el video grande en un modal en
  // vez de reproducirlo diminuto dentro de la tarjeta de la grilla.
  const ejemplos =
    gate.videosEjemplo.length > 0
      ? gate.videosEjemplo
      : [
          { titulo: "Ejemplo próximamente", youtubeId: "" },
          { titulo: "Ejemplo próximamente", youtubeId: "" },
          { titulo: "Ejemplo próximamente", youtubeId: "" },
        ];
  const [videoAbierto, setVideoAbierto] = useState<number | null>(null);

  useEffect(() => {
    if (videoAbierto === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setVideoAbierto(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoAbierto]);

  return (
    <>
      <main className="mx-auto max-w-5xl px-5 pb-20">
        {/* ── Hero ── */}
        <section className="pt-14 text-center sm:pt-20">
          <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight">
            {gate.headline}
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--muted)" }}
          >
            {gate.subheadline}
          </p>

          {/* Video de presentación (VSL). Sin ID, no se muestra nada (antes
              dejaba un marcador con instrucciones internas visible al
              público — oculto hasta que subas el video real). */}
          {gate.vslYoutubeId && (
            <div
              className="relative mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-2xl border"
              style={{
                aspectRatio: "16 / 9",
                borderColor: "rgba(244,240,222,0.12)",
                background: "var(--surface)",
              }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${gate.vslYoutubeId}?rel=0&modestbranding=1`}
                title="Presentación de la masterclass"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          )}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#precios"
              className="w-full rounded-xl px-8 py-4 text-base font-semibold transition-opacity hover:opacity-90 sm:w-auto"
              style={{ background: "var(--green)", color: "#fff" }}
            >
              Ver la oferta completa ↓
            </a>
          </div>
          {gate.duracion && (
            <p className="mt-4 text-sm font-medium" style={{ color: "var(--muted)" }}>
              📚 {gate.duracion}
            </p>
          )}
          {gate.alumnos && (
            <p className="mt-2 text-sm font-medium" style={{ color: "var(--green)" }}>
              {gate.alumnos}
            </p>
          )}
          <p
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {gate.credenciales}
          </p>
        </section>

        {/* ── Míralo en acción (galería de ejemplos) ── */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-bold">Míralo en acción</h2>
          <p className="mt-2 text-center text-sm" style={{ color: "var(--muted)" }}>
            Piezas producidas de punta a punta con este sistema — sin cámara ni productora.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ejemplos.map((v, i) => {
              const tieneVideo = Boolean(v.youtubeId) || Boolean("driveId" in v && v.driveId);
              const poster = v.youtubeId
                ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`
                : "driveId" in v && v.driveId
                  ? `https://drive.google.com/thumbnail?id=${v.driveId}&sz=w800`
                  : null;
              return (
                <button
                  key={`${i}-${v.titulo}`}
                  type="button"
                  disabled={!tieneVideo}
                  onClick={() => setVideoAbierto(i)}
                  className="overflow-hidden rounded-2xl border text-left transition-transform hover:-translate-y-0.5 disabled:cursor-default disabled:hover:translate-y-0"
                  style={cardStyle}
                >
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "16 / 9", background: "var(--bg)" }}
                  >
                    {poster ? (
                      <>
                        <img
                          src={poster}
                          alt={v.titulo}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/40">
                          <span
                            className="flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                            style={{ background: "var(--green)", color: "#fff" }}
                          >
                            ▶
                          </span>
                        </div>
                      </>
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-3xl"
                        style={{ color: "var(--muted)" }}
                      >
                        ▶
                      </div>
                    )}
                  </div>
                  <p className="px-4 py-3 text-sm font-medium">{v.titulo}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Modal del video (clic en una tarjeta de arriba) ── */}
        {videoAbierto !== null && ejemplos[videoAbierto] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setVideoAbierto(null)}
          >
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setVideoAbierto(null)}
                aria-label="Cerrar"
                className="absolute -top-10 right-0 text-2xl text-white transition-opacity hover:opacity-70"
              >
                ✕
              </button>
              <div
                className="w-full overflow-hidden rounded-2xl"
                style={{ aspectRatio: "16 / 9", background: "#000" }}
              >
                {ejemplos[videoAbierto].youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${ejemplos[videoAbierto].youtubeId}?rel=0&modestbranding=1&autoplay=1`}
                    title={ejemplos[videoAbierto].titulo}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  (() => {
                    const actual = ejemplos[videoAbierto];
                    return "driveId" in actual && actual.driveId ? (
                      <iframe
                        src={`https://drive.google.com/file/d/${actual.driveId}/preview`}
                        title={actual.titulo}
                        allow="autoplay"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    ) : null;
                  })()
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Quién te enseña (autoridad, no repite credenciales) ── */}
        <section className="mx-auto mt-20 max-w-3xl">
          <div
            className="flex flex-col items-center gap-6 rounded-3xl border p-6 text-center sm:flex-row sm:p-8 sm:text-left"
            style={cardStyle}
          >
            <img
              src={gate.instructor.foto}
              alt={gate.instructor.nombre}
              className="h-28 w-28 shrink-0 rounded-2xl object-cover sm:h-32 sm:w-32"
            />
            <div>
              <h2 className="text-lg font-bold">{gate.instructor.nombre}</h2>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--green)" }}>
                {gate.instructor.rol}
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {gate.instructor.historia}
              </p>
            </div>
          </div>
        </section>

        {/* ── Dolor ── */}
        <section className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center text-2xl font-bold">{gate.dolor.titulo}</h2>
          <div className="mt-6 space-y-4">
            {gate.dolor.parrafos.map((p, i) => (
              <p
                key={p.slice(0, 30)}
                className="text-base leading-relaxed"
                style={
                  i === gate.dolor.parrafos.length - 1
                    ? { color: "var(--cream)", fontWeight: 600 }
                    : { color: "var(--muted)" }
                }
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* ── Comparativo animado: tradicional vs. sistema ── */}
        <VersusAnimado />

        {/* ── Iceberg: lo que se ve vs. el sistema debajo ── */}
        <IcebergSistema />

        {/* ── Las 5 partes del programa ── */}
        <section className="mt-20">
          <h2 className="text-center text-2xl font-bold">
            La masterclass completa, parte por parte
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm" style={{ color: "var(--muted)" }}>
            Pensar → construir el sistema → producir → verlo aplicado en marcas
            reales → cobrarlo. En ese orden, por algo.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gate.actos.map((acto) => (
              <div key={acto.numero} className="rounded-3xl border p-6" style={cardStyle}>
                <p
                  className="text-[11px] uppercase tracking-[0.25em]"
                  style={{ color: "var(--green)" }}
                >
                  {acto.numero}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{acto.titulo}</h3>
                <p className="mt-1 text-sm font-medium">{acto.subtitulo}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {acto.texto}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mapa de ruta estilo videojuego ── */}
        <RutaDelSistema />

        {/* ── Stack de valor ── */}
        <section className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center text-2xl font-bold">Todo lo que recibes</h2>
          <div className="mt-6 space-y-3">
            {gate.stack.map((s) => (
              <div
                key={s.valor + s.item.slice(0, 20)}
                className="flex items-start justify-between gap-4 rounded-2xl border px-5 py-4"
                style={
                  s.estrella
                    ? { borderColor: "rgba(26,128,255,0.55)", background: "rgba(26,128,255,0.07)" }
                    : cardStyle
                }
              >
                <p className="text-sm leading-relaxed">
                  {s.estrella && "⭐ "}
                  {s.soloVivo && (
                    <span
                      className="mr-2 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider"
                      style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
                    >
                      Solo en vivo
                    </span>
                  )}
                  {s.item}
                </p>
                <span
                  className="shrink-0 text-sm font-semibold tabular-nums"
                  style={{ color: "var(--muted)" }}
                >
                  {s.valor}
                </span>
              </div>
            ))}
          </div>
          {/* Gráfica del valor total (número héroe + barras) */}
          <ValorGrafico />

          <p
            className="mt-6 rounded-2xl border px-5 py-4 text-center text-sm font-medium leading-relaxed"
            style={{ borderColor: "rgba(26,128,255,0.45)" }}
          >
            {gate.ancla}
          </p>
        </section>

        {/* ── Para quién ── */}
        <section className="mx-auto mt-20 max-w-3xl text-center">
          <h2 className="text-2xl font-bold">¿Es para ti?</h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            {gate.paraQuien}
          </p>
        </section>

        {/* ── Tarjeta de comunidad (prueba social junto a la decisión) ── */}
        <ComunidadCard />

        {/* ── Precios ── */}
        <section id="precios" className="mt-20 scroll-mt-24">
          <h2 className="text-center text-2xl font-bold">Elige cómo entrar</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm" style={{ color: "var(--muted)" }}>
            Cada nivel incluye todo el de la izquierda: el vivo trae el grabado, y el grabado
            trae la bóveda completa.
          </p>
          <div className="mx-auto mt-8 grid max-w-5xl gap-5 md:grid-cols-3">
            <ProductoCard tipo="boveda" />
            <ProductoCard tipo="grabado" />
            <ProductoCard tipo="vivo" />
          </div>
        </section>

        {/* ── Testimonios (solo si hay reales) ── */}
        {gate.testimonios.length > 0 && (
          <section className="mx-auto mt-20 max-w-3xl">
            <h2 className="text-center text-2xl font-bold">Lo que dicen los alumnos</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {gate.testimonios.map((t) => (
                <figure key={t.nombre} className="rounded-2xl border p-5" style={cardStyle}>
                  <blockquote className="text-sm leading-relaxed">“{t.texto}”</blockquote>
                  <figcaption
                    className="mt-3 text-sm font-medium"
                    style={{ color: "var(--muted)" }}
                  >
                    — {t.nombre}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        <section className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center text-2xl font-bold">Preguntas frecuentes</h2>
          <div className="mt-6 space-y-3">
            {gate.faq.map((item) => (
              <details key={item.q} className="rounded-2xl border px-5 py-4" style={cardStyle}>
                <summary className="cursor-pointer text-sm font-semibold">{item.q}</summary>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Cierre ── */}
        <section
          className="mx-auto mt-20 max-w-3xl rounded-3xl border px-6 py-12 text-center"
          style={{
            borderColor: "rgba(26,128,255,0.45)",
            background:
              "linear-gradient(180deg, rgba(26,128,255,0.10), rgba(26,128,255,0.02))",
          }}
        >
          <h2 className="text-2xl font-bold">
            El sistema completo, por menos del 10% de lo que cobro por aplicarlo
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {gate.ancla}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={urlVivo()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clickComprar("vivo")}
              className="w-full rounded-xl px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90 sm:w-auto"
              style={{ background: "var(--green)", color: "#fff" }}
            >
              {gate.productos.vivo.cta} ({gate.productos.vivo.precio}) →
            </a>
            <a
              href={urlGrabado()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clickComprar("grabado")}
              className="w-full rounded-xl border px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-80 sm:w-auto"
              style={{ borderColor: "rgba(244,240,222,0.3)", color: "var(--cream)" }}
            >
              {gate.productos.grabado.cta} ({gate.productos.grabado.precio})
            </a>
          </div>
        </section>

        {/* ── Ya pagué y no tengo contraseña ── */}
        <section className="mx-auto mt-16 max-w-xl">
          <h2 className="text-center text-lg font-bold">
            ¿Ya pagaste y no tienes tu contraseña?
          </h2>
          <p className="mt-1 text-center text-sm" style={{ color: "var(--muted)" }}>
            Déjanos tus datos y te la enviamos al correo.
          </p>
          <div className="mt-5 rounded-3xl border p-6" style={cardStyle}>
            <RegistroCard />
          </div>
        </section>
      </main>

      <StickyCompra />
    </>
  );
}
