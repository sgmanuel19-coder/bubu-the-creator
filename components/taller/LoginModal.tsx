"use client";

import { useEffect, useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";

const inputStyle: React.CSSProperties = {
  background: "rgba(244,240,222,0.06)",
  border: "1px solid rgba(244,240,222,0.18)",
  color: "var(--cream)",
};

// Modal de acceso reutilizable. Al validar, refresca la página actual para
// que el contenido se desbloquee en el mismo lugar (sin saltar de pantalla).
export default function LoginModal({ onClose }: { onClose: () => void }) {
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
        // Recarga completa: descarta el Router Cache de Next (que guardó las
        // pestañas en su estado bloqueado por prefetch) y reconstruye todo ya
        // con sesión. Así no vuelve a pedir la contraseña al cambiar de tab.
        window.location.reload();
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
      className="fixed inset-0 z-[60] flex items-center justify-center px-5"
      style={{ background: "rgba(13,12,8,0.85)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Entrar al portal"
    >
      <div
        className="w-full max-w-sm rounded-3xl border p-6 sm:p-8"
        style={{ borderColor: "rgba(244,240,222,0.15)", background: "var(--surface)" }}
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
            <label htmlFor="password-modal" className="mb-1.5 block text-sm">
              Contraseña de alumno
            </label>
            <input
              id="password-modal"
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
