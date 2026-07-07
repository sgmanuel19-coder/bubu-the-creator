"use client";

import { useMemo, useState } from "react";
import { recursosGlobales } from "@/lib/taller/content";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";

function normalizar(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export default function RecursosClient({ desbloqueado }: { desbloqueado: boolean }) {
  const todos = useMemo(() => recursosGlobales(), []);

  const [q, setQ] = useState("");
  const filtro = normalizar(q.trim());
  const filtrados = filtro
    ? todos.filter(
        ({ recurso, curso }) =>
          normalizar(recurso.titulo).includes(filtro) ||
          normalizar(recurso.descripcion).includes(filtro) ||
          normalizar(curso.titulo).includes(filtro),
      )
    : todos;

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Recursos</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Tu bóveda de recursos: abre cada uno para ver su información y descargar los archivos. Búscalos por nombre.
      </p>

      {!desbloqueado && (
        <div className="mt-6">
          <DesbloquearBanner />
        </div>
      )}

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
          {filtrados.map(({ recurso, curso }) => {
            const nDescargas = recurso.descargas?.length ?? 0;
            return (
              <a
                key={recurso.slug}
                href={`/taller/recursos/${recurso.slug}`}
                className="flex flex-col rounded-2xl border p-5 transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(244,240,222,0.12)",
                  background: "var(--surface)",
                  opacity: desbloqueado && recurso.disponible ? 1 : 0.75,
                }}
              >
                <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--green)" }}>
                  {curso.titulo}
                </p>
                <p className="mt-1 font-semibold">
                  {desbloqueado ? "📂" : "🔒"} {recurso.titulo}
                </p>
                <p className="mt-1 flex-1 text-sm" style={{ color: "var(--muted)" }}>
                  {recurso.descripcion}
                </p>
                <p className="mt-3 text-xs font-medium" style={{ color: "var(--green)" }}>
                  {desbloqueado
                    ? `Abrir${nDescargas ? ` · ${nDescargas} descargable${nDescargas > 1 ? "s" : ""}` : ""} →`
                    : "🔒 Desbloquea para abrir"}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
