"use client";

import { TALLER } from "@/lib/taller/content";

// Tarjeta de comunidad estilo Skool: miniatura, nombre, miembros, admins y
// precio de membresía. Social proof en el Inicio.
export default function ComunidadCard() {
  const { nombre, cover, descripcion, miembros, admins, precioMembresia } = TALLER.comunidad;

  return (
    <section
      className="mx-auto mt-10 max-w-md overflow-hidden rounded-3xl border"
      style={{ borderColor: "rgba(244,240,222,0.14)", background: "var(--surface)" }}
    >
      {/* Miniatura / cover */}
      <div
        className="flex h-28 items-center justify-center text-5xl"
        style={{ background: "linear-gradient(135deg, rgba(26,128,255,0.25), rgba(26,128,255,0.05))" }}
      >
        {cover}
      </div>

      <div className="p-5">
        <p className="font-semibold">{nombre}</p>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          {descripcion}
        </p>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs" style={{ color: "var(--muted)" }}>
          {miembros > 0 && (
            <span>
              <span style={{ color: "var(--cream)", fontWeight: 600 }}>{miembros}</span> miembros
            </span>
          )}
          <span>
            <span style={{ color: "var(--cream)", fontWeight: 600 }}>{admins}</span>{" "}
            {admins === 1 ? "admin" : "admins"}
          </span>
          <span>
            <span style={{ color: "#4ADE80", fontWeight: 600 }}>●</span> Privada
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          {precioMembresia ? (
            <p className="text-sm font-semibold">
              {precioMembresia}
              <span className="text-xs font-normal" style={{ color: "var(--muted)" }}>
                {" "}· membresía
              </span>
            </p>
          ) : (
            <span />
          )}
          <a
            href="#precios"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--green)", color: "#fff" }}
          >
            Unirme
          </a>
        </div>
      </div>
    </section>
  );
}
