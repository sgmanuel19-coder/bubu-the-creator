"use client";

import { useEffect, useState } from "react";
import { PAGOS, TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";

/**
 * Bandeja de pago: se muestra en recursos premium bloqueados y al comprar
 * un nivel de acceso. Datos de transferencia/Yape/Plin + pasos + botón de
 * WhatsApp para enviar la captura. Tras confirmar el pago, Manuel envía el
 * link mágico (o la contraseña) del nivel — el input de abajo la valida.
 */
export default function BandejaPago({
  nombre,
  precio,
  hotmartUrl,
}: {
  nombre: string; // qué está comprando (recurso o nivel)
  precio: string;
  hotmartUrl?: string;
}) {
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    trackTaller("taller_pago", { accion: "abrir", recurso: nombre });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mensajeWsp = `Hola Manuel, ya hice el pago de «${nombre}» (${precio}). Te envío mi captura para que me des el acceso.`;
  const linkWsp = `${TALLER.whatsapp}?text=${encodeURIComponent(mensajeWsp)}`;

  async function desbloquear(e: React.FormEvent) {
    e.preventDefault();
    if (!clave.trim() || cargando) return;
    setCargando(true);
    setError("");
    try {
      const res = await fetch("/api/taller/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: clave.trim() }),
      });
      const data = await res.json();
      if (data.ok) {
        trackTaller("taller_desbloqueo", { nivel: String(data.nivel ?? "") });
        window.location.reload();
        return;
      }
      setError(data.error ?? "Contraseña incorrecta.");
    } catch {
      setError("No se pudo validar. Revisa tu conexión e inténtalo de nuevo.");
    }
    setCargando(false);
  }

  const qrs = [
    { etiqueta: "Yape", src: PAGOS.yapePlin.qrYape },
    { etiqueta: "Plin", src: PAGOS.yapePlin.qrPlin },
  ];

  return (
    <section
      className="mt-8 rounded-2xl border p-6"
      style={{ borderColor: "rgba(255,209,102,0.4)", background: "var(--surface)" }}
    >
      <p className="text-lg font-bold" style={{ color: "#FFD166" }}>
        💎 {nombre} · {precio}
      </p>

      {/* Pasos */}
      <ol className="mt-4 space-y-2">
        {PAGOS.pasos.map((p, i) => (
          <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--cream)" }}>
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
              style={{ background: "rgba(255,209,102,0.2)", color: "#FFD166" }}
            >
              {i + 1}
            </span>
            {p}
          </li>
        ))}
      </ol>

      {/* Datos de pago */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div
          className="rounded-xl border p-4 text-sm"
          style={{ borderColor: "rgba(244,240,222,0.12)" }}
        >
          <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            Transferencia · {PAGOS.banco}
          </p>
          <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>{PAGOS.titular}</p>
          <p className="mt-1">
            Cuenta: <span className="select-all font-semibold">{PAGOS.cuenta}</span>
          </p>
          <p className="mt-1">
            CCI: <span className="select-all font-semibold">{PAGOS.cci}</span>
          </p>
        </div>
        <div
          className="rounded-xl border p-4 text-sm"
          style={{ borderColor: "rgba(244,240,222,0.12)" }}
        >
          <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            Yape · Plin
          </p>
          <p className="mt-2">
            Número: <span className="select-all font-semibold">{PAGOS.yapePlin.numero}</span>
          </p>
          <div className="mt-3 flex gap-3">
            {qrs.map((qr) =>
              qr.src ? (
                <img
                  key={qr.etiqueta}
                  src={qr.src}
                  alt={`QR de ${qr.etiqueta}`}
                  className="h-24 w-24 rounded-lg bg-white object-contain p-1"
                />
              ) : (
                <div
                  key={qr.etiqueta}
                  className="flex h-24 w-24 items-center justify-center rounded-lg border text-center text-[10px]"
                  style={{ borderColor: "rgba(244,240,222,0.15)", color: "var(--muted)" }}
                >
                  QR {qr.etiqueta}
                  <br />
                  próximamente
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={linkWsp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTaller("taller_pago", { accion: "whatsapp", recurso: nombre })}
          className="rounded-xl px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
          style={{ background: "#FFD166", color: "#0D0C08" }}
        >
          Ya pagué → enviar mi captura por WhatsApp
        </a>
        {hotmartUrl && (
          <a
            href={hotmartUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTaller("taller_pago", { accion: "hotmart", recurso: nombre })}
            className="rounded-xl border px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
          >
            Pagar con tarjeta (Hotmart) →
          </a>
        )}
      </div>

      {/* Ya tiene su clave */}
      <form onSubmit={desbloquear} className="mt-6 border-t pt-5" style={{ borderColor: "rgba(244,240,222,0.1)" }}>
        <p className="text-sm font-semibold">¿Ya tienes tu clave de acceso?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder="Escribe tu clave aquí"
            aria-label="Clave de acceso"
            className="min-w-0 flex-1 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
            style={{
              background: "rgba(244,240,222,0.06)",
              border: "1px solid rgba(244,240,222,0.18)",
              color: "var(--cream)",
            }}
          />
          <button
            type="submit"
            disabled={cargando}
            className="rounded-xl px-5 py-3 text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--green)", color: "#fff" }}
          >
            {cargando ? "Validando…" : "Desbloquear"}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-xs" style={{ color: "#ff8f8f" }}>
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
