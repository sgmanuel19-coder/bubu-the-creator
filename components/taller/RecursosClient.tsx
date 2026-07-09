"use client";

import { useMemo, useState } from "react";
import {
  bovedaGlobal,
  linkWhatsAppPremium,
  type NivelRecurso,
  type RecursoBoveda,
  type TipoRecurso,
} from "@/lib/taller/content";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";

function normalizar(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

const TIPOS: { valor: "todo" | TipoRecurso; label: string }[] = [
  { valor: "todo", label: "Todo" },
  { valor: "guia", label: "Guías" },
  { valor: "repo", label: "Repos" },
  { valor: "proyecto", label: "Proyectos" },
  { valor: "plantilla", label: "Plantillas" },
];

const NIVELES: { valor: "todos" | NivelRecurso; label: string }[] = [
  { valor: "todos", label: "Todos los niveles" },
  { valor: "principiante", label: "Principiante" },
  { valor: "intermedio", label: "Intermedio" },
  { valor: "avanzado", label: "Avanzado" },
];

const LABEL_TIPO: Record<TipoRecurso, string> = {
  guia: "guía",
  repo: "repo",
  proyecto: "proyecto",
  plantilla: "plantilla",
};

function Pill({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
      style={
        activo
          ? { background: "var(--green)", borderColor: "var(--green)", color: "#fff" }
          : {
              borderColor: "rgba(244,240,222,0.18)",
              background: "rgba(244,240,222,0.05)",
              color: "var(--cream)",
            }
      }
    >
      {children}
    </button>
  );
}

function Badges({ recurso }: { recurso: RecursoBoveda }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
        style={{ background: "rgba(26,128,255,0.15)", color: "var(--green)" }}
      >
        {LABEL_TIPO[recurso.tipo]}
      </span>
      <span
        className="rounded-md border px-2 py-0.5 text-[10px] capitalize"
        style={{ borderColor: "rgba(244,240,222,0.18)", color: "var(--muted)" }}
      >
        {recurso.nivel}
      </span>
      {recurso.premium && (
        <span
          className="rounded-md px-2 py-0.5 text-[10px] font-bold"
          style={{ background: "rgba(255,209,102,0.15)", color: "#FFD166" }}
        >
          💎 {recurso.premium.precio}
        </span>
      )}
    </div>
  );
}

function TarjetaBoveda({
  recurso,
  desbloqueado,
}: {
  recurso: RecursoBoveda;
  desbloqueado: boolean;
}) {
  // Premium: la tarjeta entera abre WhatsApp en pestaña nueva.
  if (recurso.premium) {
    return (
      <a
        href={linkWhatsAppPremium(recurso)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col rounded-2xl border p-5 transition-transform hover:-translate-y-0.5"
        style={{ borderColor: "rgba(255,209,102,0.4)", background: "var(--surface)" }}
      >
        <Badges recurso={recurso} />
        <p className="mt-3 font-semibold">💎 {recurso.titulo}</p>
        <p className="mt-1 flex-1 text-sm" style={{ color: "var(--muted)" }}>
          {recurso.descripcion}
        </p>
        <p className="mt-3 text-xs font-semibold" style={{ color: "#FFD166" }}>
          Desbloquear por WhatsApp →
        </p>
      </a>
    );
  }

  // Repos: abren GitHub en pestaña nueva.
  if (recurso.tipo === "repo" && recurso.linkExterno) {
    return (
      <a
        href={recurso.linkExterno}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col rounded-2xl border p-5 transition-transform hover:-translate-y-0.5"
        style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
      >
        <Badges recurso={recurso} />
        <p className="mt-3 font-mono text-sm font-semibold">{recurso.titulo}</p>
        <p className="mt-1 flex-1 text-sm" style={{ color: "var(--muted)" }}>
          {recurso.descripcion}
        </p>
        <p className="mt-3 text-xs font-medium" style={{ color: "var(--green)" }}>
          Abrir en GitHub ↗
        </p>
      </a>
    );
  }

  // Normales: página de detalle, con candado para no-alumnos.
  const nDescargas = recurso.descargas?.length ?? 0;
  return (
    <a
      href={`/taller/recursos/${recurso.slug}`}
      className="flex flex-col rounded-2xl border p-5 transition-transform hover:-translate-y-0.5"
      style={{
        borderColor: "rgba(244,240,222,0.12)",
        background: "var(--surface)",
        opacity: desbloqueado && recurso.disponible ? 1 : 0.8,
      }}
    >
      <Badges recurso={recurso} />
      {recurso.cursoRelacionado && (
        <p className="mt-3 text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--green)" }}>
          {recurso.cursoRelacionado}
        </p>
      )}
      <p className={recurso.cursoRelacionado ? "mt-1 font-semibold" : "mt-3 font-semibold"}>
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
}

export default function RecursosClient({ desbloqueado }: { desbloqueado: boolean }) {
  const todos = useMemo(() => bovedaGlobal(), []);

  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState<"todo" | TipoRecurso>("todo");
  const [nivel, setNivel] = useState<"todos" | NivelRecurso>("todos");

  const filtro = normalizar(q.trim());
  const filtrados = todos.filter((r) => {
    if (tipo !== "todo" && r.tipo !== tipo) return false;
    if (nivel !== "todos" && r.nivel !== nivel) return false;
    if (!filtro) return true;
    return (
      normalizar(r.titulo).includes(filtro) ||
      normalizar(r.descripcion).includes(filtro) ||
      (r.tags ?? []).some((t) => normalizar(t).includes(filtro))
    );
  });

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--green)" }}>
        La Bóveda
      </p>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Recursos</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Guías paso a paso, repos que valen la pena, proyectos completos y las plantillas de mi
        sistema. Filtra por tipo y nivel, o búscalos por nombre.
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
          placeholder="🔍 Busca guías, repos, proyectos…"
          aria-label="Buscar en la bóveda"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
          style={{
            background: "rgba(244,240,222,0.06)",
            border: "1px solid rgba(244,240,222,0.18)",
            color: "var(--cream)",
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {TIPOS.map((t) => (
          <Pill key={t.valor} activo={tipo === t.valor} onClick={() => setTipo(t.valor)}>
            {t.label}
          </Pill>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {NIVELES.map((n) => (
          <Pill key={n.valor} activo={nivel === n.valor} onClick={() => setNivel(n.valor)}>
            {n.label}
          </Pill>
        ))}
      </div>

      <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
        {filtrados.length} {filtrados.length === 1 ? "recurso" : "recursos"}
      </p>

      {filtrados.length === 0 ? (
        <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
          No encontré recursos con esos filtros. Prueba con otro tipo, nivel o nombre.
        </p>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {filtrados.map((r) => (
            <TarjetaBoveda key={r.slug} recurso={r} desbloqueado={desbloqueado} />
          ))}
        </div>
      )}
    </main>
  );
}
