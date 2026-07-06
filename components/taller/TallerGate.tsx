"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";

type Tab = "acceso" | "registro";

const inputStyle: React.CSSProperties = {
  background: "rgba(244,240,222,0.06)",
  border: "1px solid rgba(244,240,222,0.18)",
  color: "var(--cream)",
};

export default function TallerGate() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("acceso");

  // --- login ---
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // --- registro ---
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [producto, setProducto] = useState("Taller en vivo");
  const [regState, setRegState] = useState<"idle" | "sending" | "done">("idle");
  const [regError, setRegError] = useState("");
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
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
      setLoginError(data.error ?? "No pudimos validar la contraseña.");
    } catch {
      setLoginError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleRegistro(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    setShowWhatsApp(false);
    setRegState("sending");
    try {
      const res = await fetch("/api/taller/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, producto }),
      });
      const data = await res.json();
      if (data.ok) {
        trackTaller("taller_registro", { producto });
        setRegState("done");
        return;
      }
      setRegError(data.error ?? "No pudimos enviar tu registro.");
      if (data.fallback === "whatsapp") setShowWhatsApp(true);
      setRegState("idle");
    } catch {
      setRegError("Error de conexión. Inténtalo de nuevo.");
      setRegState("idle");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-5 py-16">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_420px]">
        {/* ── Panel de valor ── */}
        <div className="order-2 lg:order-1">
          <p
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--muted)" }}
          >
            {TALLER.marca}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            {TALLER.nombre}
          </h1>
          {TALLER.gate.proximoTaller && (
            <p
              className="mt-3 inline-block rounded-full border px-4 py-1.5 text-sm font-medium"
              style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
            >
              📅 {TALLER.gate.proximoTaller}
            </p>
          )}
          <ul className="mt-6 space-y-3">
            {TALLER.gate.incluye.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px]"
                  style={{ background: "rgba(26,128,255,0.18)", color: "var(--green)" }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p
            className="mt-6 max-w-md text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {TALLER.gate.credenciales}
          </p>
        </div>

        {/* ── Card de acceso / registro ── */}
        <div
          className="order-1 w-full rounded-3xl border p-6 sm:p-8 lg:order-2"
          style={{ borderColor: "rgba(244,240,222,0.14)", background: "var(--surface)" }}
        >
          {/* Tabs */}
          <div
            className="mb-6 grid grid-cols-2 rounded-full border p-1"
            style={{ borderColor: "rgba(244,240,222,0.15)" }}
          >
            {(
              [
                ["acceso", "Ya tengo contraseña"],
                ["registro", "Quiero acceso"],
              ] as [Tab, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className="rounded-full py-2 text-sm font-medium transition-colors"
                style={
                  tab === key
                    ? { background: "var(--green)", color: "#fff" }
                    : { color: "var(--muted)" }
                }
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "acceso" ? (
            <form onSubmit={handleLogin} className="space-y-4">
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
              {loginError && (
                <p className="text-sm" style={{ color: "#FF7A7A" }} role="alert">
                  {loginError}
                </p>
              )}
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full rounded-xl py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--green)", color: "#fff" }}
              >
                {loggingIn ? "Verificando…" : "Entrar al portal"}
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
          ) : regState === "done" ? (
            <div
              className="rounded-2xl border p-6 text-center"
              style={{ borderColor: "rgba(26,128,255,0.4)" }}
            >
              <p className="text-lg font-semibold">Registro recibido ✓</p>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Te enviaremos la contraseña de acceso a{" "}
                <span style={{ color: "var(--cream)" }}>{email}</span> apenas
                confirmemos tu inscripción.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegistro} className="space-y-4">
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
              {regError && (
                <p className="text-sm" style={{ color: "#FF7A7A" }} role="alert">
                  {regError}
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
                disabled={regState === "sending"}
                className="w-full rounded-xl py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--green)", color: "#fff" }}
              >
                {regState === "sending" ? "Enviando…" : "Solicitar mi contraseña"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
