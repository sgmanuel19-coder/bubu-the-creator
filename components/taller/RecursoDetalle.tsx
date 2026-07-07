"use client";

import { type Recurso } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";

export default function RecursoDetalle({
  recurso,
  cursoTitulo,
  desbloqueado,
}: {
  recurso: Recurso;
  cursoTitulo: string;
  desbloqueado: boolean;
}) {
  const descargas = recurso.descargas ?? [];

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <a
        href="/taller/recursos"
        className="text-sm transition-opacity hover:opacity-80"
        style={{ color: "var(--muted)" }}
      >
        ← Todos los recursos
      </a>

      <p className="mt-4 text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--green)" }}>
        {cursoTitulo}
      </p>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
        {desbloqueado ? "📂" : "🔒"} {recurso.titulo}
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        {recurso.descripcion}
      </p>

      {!desbloqueado && (
        <div className="mt-6">
          <DesbloquearBanner />
        </div>
      )}

      {/* Información (tipo blog) */}
      {recurso.contenido && recurso.contenido.length > 0 && (
        <div
          className={`mt-6 space-y-4 rounded-2xl border p-6 ${desbloqueado ? "" : "select-none opacity-60"}`}
          style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
        >
          {recurso.contenido.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--cream)" }}>
              {p}
            </p>
          ))}
        </div>
      )}

      {/* Descargables */}
      <section className="mt-8">
        <h2 className="text-lg font-bold">Descargables</h2>
        {!desbloqueado ? (
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            🔒 Desbloquea con tu contraseña para descargar los archivos de este recurso.
          </p>
        ) : descargas.length === 0 ? (
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            Los archivos de este recurso se publican pronto.
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
    </main>
  );
}
