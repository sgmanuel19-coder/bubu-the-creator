"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";

const inputStyle: React.CSSProperties = {
  background: "rgba(244,240,222,0.06)",
  border: "1px solid rgba(244,240,222,0.18)",
  color: "var(--cream)",
};

const cardStyle: React.CSSProperties = {
  borderColor: "rgba(244,240,222,0.12)",
  background: "var(--surface)",
};

function urlCompra() {
  return `${TALLER.whatsapp}?text=${encodeURIComponent(TALLER.gate.mensajeCompra)}`;
}

function BotonComprar({ grande = false }: { grande?: boolean }) {
  return (
    <a
      href={urlCompra()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackTaller("taller_cta_comprar")}
      className={`inline-block rounded-xl font-semibold transition-opacity hover:opacity-90 ${
        grande ? "px-10 py-4 text-base" : "px-6 py-3 text-sm"
      }`}
      style={{ background: "var(--green)", color: "#fff" }}
    >
      {TALLER.gate.ctaComprar} →
    </a>
  );
}

// ── Modal de login para alumnos ───────────────────────────────
function LoginModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/taller/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        trackTaller("taller_login");
        router.push("/taller/en-vivo");
        router.refresh();
        return;
      }
      setError(data.error ?? "No pudimos validar la contraseña.");
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      style={{ background: "rgba(13,12,8,0.85)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Entrar al portal"
    >
      <div
        className="w-full max-w-sm rounded-3xl border p-6 sm:p-8"
        style={cardStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Entrar al portal</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full px-2 text-lg"
            style={{ color: "var(--muted)" }}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm">
              Contraseña del taller
            </label>
            <input
              id="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="La que recibiste por correo"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
              style={inputStyle}
            />
          </div>
          {error && (
            <p className="text-sm" style={{ color: "#FF7A7A" }} role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--green)", color: "#fff" }}
          >
            {busy ? "Verificando…" : "Entrar"}
          </button>
          <p className="text-center text-xs" style={{ color: "var(--muted)" }}>
            ¿No te llegó la contraseña?{" "}
            <a
              href={TALLER.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--cream)" }}
            >
              Escríbenos por WhatsApp
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

// ── Registro para quien ya pagó y no tiene contraseña ─────────
function RegistroCard() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [producto, setProducto] = useState("Taller en vivo");
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
        body: JSON.stringify({ nombre, email, producto }),
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
          <option>Taller en vivo</option>
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

// ── Landing ───────────────────────────────────────────────────
export default function TallerGate() {
  const [loginAbierto, setLoginAbierto] = useState(false);
  const { gate } = TALLER;
  const totalLecciones = TALLER.modulos.reduce(
    (n, m) => n + m.lecciones.length,
    0,
  );

  return (
    <>
      {/* Barra superior */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: "rgba(244,240,222,0.10)", background: "rgba(13,12,8,0.85)" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex flex-col">
            <span
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "var(--muted)" }}
            >
              {TALLER.marca}
            </span>
            <span className="text-sm font-semibold sm:text-base">{TALLER.nombre}</span>
          </div>
          <button
            type="button"
            onClick={() => setLoginAbierto(true)}
            className="rounded-full border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
          >
            Ya soy alumno →
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-20">
        {/* ── Hero ── */}
        <section className="pt-14 text-center sm:pt-20">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {TALLER.nombre}
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--muted)" }}
          >
            {gate.promesa}
          </p>

          {gate.proximoTaller && (
            <p
              className="mt-5 inline-block rounded-full border px-4 py-1.5 text-sm font-medium"
              style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
            >
              📅 {gate.proximoTaller}
            </p>
          )}

          {gate.vslYoutubeId && (
            <div
              className="relative mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-2xl border"
              style={{ aspectRatio: "16 / 9", borderColor: "rgba(244,240,222,0.12)" }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${gate.vslYoutubeId}?rel=0&modestbranding=1`}
                title="Presentación del taller"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          )}

          <div className="mt-8 flex flex-col items-center gap-3">
            <BotonComprar grande />
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {gate.precio.monto} · {gate.precio.nota}
            </p>
            {gate.alumnos && (
              <p className="text-sm font-medium" style={{ color: "var(--green)" }}>
                {gate.alumnos}
              </p>
            )}
          </div>
        </section>

        {/* ── Qué incluye ── */}
        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-2xl font-bold">Qué incluye</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {gate.incluye.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border p-4 text-sm"
                style={cardStyle}
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px]"
                  style={{ background: "rgba(26,128,255,0.18)", color: "var(--green)" }}
                >
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
          <p
            className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {gate.credenciales}
          </p>
        </section>

        {/* ── Curriculum vitrina (con candados) ── */}
        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-2xl font-bold">Lo que hay adentro</h2>
          <p className="mt-2 text-center text-sm" style={{ color: "var(--muted)" }}>
            {TALLER.modulos.length} módulos · {totalLecciones} lecciones en video
          </p>
          <div className="mt-6 space-y-3">
            {TALLER.modulos.map((modulo, i) => (
              <div
                key={modulo.titulo}
                className="flex items-center justify-between gap-4 rounded-2xl border px-5 py-4"
                style={cardStyle}
              >
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--green)" }}
                  >
                    Módulo {i + 1}
                  </p>
                  <p className="mt-1 font-semibold">{modulo.titulo}</p>
                  <p className="mt-0.5 text-sm" style={{ color: "var(--muted)" }}>
                    {modulo.lecciones.length}{" "}
                    {modulo.lecciones.length === 1 ? "lección" : "lecciones"}
                  </p>
                </div>
                <span className="text-xl" aria-label="Contenido para alumnos">
                  🔒
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <BotonComprar />
          </div>
        </section>

        {/* ── Testimonios (solo si hay reales) ── */}
        {gate.testimonios.length > 0 && (
          <section className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-center text-2xl font-bold">Lo que dicen los alumnos</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {gate.testimonios.map((t) => (
                <figure key={t.nombre} className="rounded-2xl border p-5" style={cardStyle}>
                  <blockquote className="text-sm leading-relaxed">
                    “{t.texto}”
                  </blockquote>
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
        {gate.faq.length > 0 && (
          <section className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-center text-2xl font-bold">Preguntas frecuentes</h2>
            <div className="mt-6 space-y-3">
              {gate.faq.map((item) => (
                <details key={item.q} className="rounded-2xl border px-5 py-4" style={cardStyle}>
                  <summary className="cursor-pointer text-sm font-semibold">
                    {item.q}
                  </summary>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── Cierre: precio + compra ── */}
        <section
          className="mx-auto mt-16 max-w-3xl rounded-3xl border px-6 py-12 text-center"
          style={{
            borderColor: "rgba(26,128,255,0.45)",
            background:
              "linear-gradient(180deg, rgba(26,128,255,0.10), rgba(26,128,255,0.02))",
          }}
        >
          <h2 className="text-2xl font-bold">Entra hoy</h2>
          <p className="mt-2 text-3xl font-bold">{gate.precio.monto}</p>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            {gate.precio.nota}
          </p>
          <div className="mt-6">
            <BotonComprar grande />
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

      {loginAbierto && <LoginModal onClose={() => setLoginAbierto(false)} />}
    </>
  );
}
