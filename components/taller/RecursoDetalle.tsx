"use client";

import { linkWhatsAppPremium, type RecursoBoveda } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";

export default function RecursoDetalle({
  recurso,
  desbloqueado,
}: {
  recurso: RecursoBoveda;
  desbloqueado: boolean;
}) {
  const descargas = recurso.descargas ?? [];
  const esPremium = Boolean(recurso.premium);

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <a
        href="/taller/recursos"
        className="text-sm transition-opacity hover:opacity-80"
        style={{ color: "var(--muted)" }}
      >
        ← Toda la bóveda
      </a>

      <p className="mt-4 text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--green)" }}>
        {recurso.cursoRelacionado ?? `${recurso.tipo} · ${recurso.nivel}`}
      </p>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
        {esPremium ? "💎" : desbloqueado ? "📂" : "🔒"} {recurso.titulo}
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        {recurso.descripcion}
      </p>

      {/* Los premium no usan el candado de alumno: se compran por WhatsApp */}
      {!esPremium && !desbloqueado && (
        <div className="mt-6">
          <DesbloquearBanner />
        </div>
      )}

      {/* Información (tipo blog) */}
      {recurso.contenido && recurso.contenido.length > 0 && (
        <div
          className={`mt-6 space-y-4 rounded-2xl border p-6 ${
            esPremium || desbloqueado ? "" : "select-none opacity-60"
          }`}
          style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
        >
          {recurso.contenido.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--cream)" }}>
              {p}
            </p>
          ))}
        </div>
      )}

      {/* Repo externo */}
      {recurso.linkExterno && (
        <a
          href={recurso.linkExterno}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition-opacity hover:opacity-80"
          style={{ borderColor: "rgba(26,128,255,0.5)", background: "var(--surface)" }}
        >
          <span className="text-sm font-medium">📦 {recurso.titulo}</span>
          <span className="shrink-0 text-xs font-semibold" style={{ color: "var(--green)" }}>
            Abrir en GitHub ↗
          </span>
        </a>
      )}

      {/* Premium: caja de compra por WhatsApp */}
      {esPremium && (
        <section
          className="mt-8 rounded-2xl border p-6"
          style={{ borderColor: "rgba(255,209,102,0.4)", background: "var(--surface)" }}
        >
          <p className="text-lg font-bold" style={{ color: "#FFD166" }}>
            💎 Recurso exclusivo · {recurso.premium!.precio}
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Este material se entrega en persona: me escribes por WhatsApp, coordinamos el pago y
            te lo mando directo con una explicación de cómo usarlo.
          </p>
          <a
            href={linkWhatsAppPremium(recurso)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTaller("taller_recurso", { recurso: recurso.titulo, premium: "si" })}
            className="mt-4 inline-block rounded-xl px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: "#FFD166", color: "#0D0C08" }}
          >
            Desbloquear por WhatsApp →
          </a>
        </section>
      )}

      {/* Descargables (solo recursos normales) */}
      {!esPremium && !recurso.linkExterno && (
        <section className="mt-8">
          <h2 className="text-lg font-bold">Descargables</h2>
          {!desbloqueado ? (
            <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
              🔒 Desbloquea con tu contraseña para descargar los archivos de este recurso.
            </p>
          ) : descargas.length === 0 ? (
            <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
              {recurso.tipo === "guia" || recurso.tipo === "proyecto"
                ? "Esta pieza es la guía completa de arriba — no tiene archivos aparte."
                : "Los archivos de este recurso se publican pronto."}
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {descargas.map((d) => (
                <a
                  key={d.nombre + d.url}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTaller("taller_recurso", { recurso: recurso.titulo, archivo: d.nombre })}
                  className="flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition-opacity hover:opacity-80"
                  style={{ borderColor: "rgba(26,128,255,0.5)", background: "var(--surface)" }}
                >
                  <span className="text-sm font-medium">📎 {d.nombre}</span>
                  <span className="shrink-0 text-xs font-semibold" style={{ color: "var(--green)" }}>
                    Descargar →
                  </span>
                </a>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
