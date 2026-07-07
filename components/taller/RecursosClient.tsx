"use client";

import { useMemo, useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";

type RecursoPlano = {
  curso: string;
  titulo: string;
  descripcion: string;
  url: string;
  disponible: boolean;
};

function normalizar(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export default function RecursosClient({ desbloqueado }: { desbloqueado: boolean }) {
  const todos: RecursoPlano[] = useMemo(
    () =>
      TALLER.cursos
        .filter((c) => c.disponible)
        .flatMap((c) =>
          c.recursos.map((r) => ({ curso: c.titulo, ...r })),
        ),
    [],
  );

  const [q, setQ] = useState("");
  const filtro = normalizar(q.trim());
  const filtrados = filtro
    ? todos.filter(
        (r) =>
          normalizar(r.titulo).includes(filtro) ||
          normalizar(r.descripcion).includes(filtro) ||
          normalizar(r.curso).includes(filtro),
      )
    : todos;

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Recursos</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Todos los documentos de apoyo de tus cursos, en un solo lugar. Búscalos por nombre.
      </p>

      {!desbloqueado && (
        <div className="mt-6">
          <DesbloquearBanner />
        </div>
      )}

      {/* Buscador */}
      <div className="mt-6">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔍 Buscar recurso por nombre…"
          aria-label="Buscar recurso"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
          style={{
            background: "rgba(244,240,222,0.06)",
            border: "1px solid rgba(244,240,222,0.18)",
            color: "var(--cream)",
          }}
        />
      </div>

      {todos.length === 0 ? (
        <p className="mt-8 text-sm" style={{ color: "var(--muted)" }}>
          Aún no hay recursos publicados. Aparecerán aquí cuando se suban.
        </p>
      ) : filtrados.length === 0 ? (
        <p className="mt-8 text-sm" style={{ color: "var(--muted)" }}>
          No encontré recursos con «{q}». Prueba otro nombre.
        </p>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {filtrados.map((r, i) => (
            <div
              key={`${i}-${r.titulo}`}
              className="rounded-2xl border p-5"
              style={{
                borderColor: "rgba(244,240,222,0.12)",
                background: "var(--surface)",
                opacity: desbloqueado && r.disponible ? 1 : 0.7,
              }}
            >
              <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--green)" }}>
                {r.curso}
              </p>
              <p className="mt-1 font-semibold">
                {desbloqueado ? "📎" : "🔒"} {r.titulo}
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {r.descripcion}
              </p>
              {desbloqueado && r.disponible && r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTaller("taller_recurso", { recurso: r.titulo })}
                  className="mt-3 inline-block rounded-lg border px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
                >
                  Descargar →
                </a>
              ) : (
                <p className="mt-3 text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  {desbloqueado ? "Próximamente" : "🔒 Solo alumnos"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
