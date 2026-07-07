"use client";

import { useEffect, useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";

function formatoLima(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

function linkGoogleCalendar(titulo: string, iso: string, duracionMin: number): string {
  const inicio = new Date(iso);
  const fin = new Date(inicio.getTime() + duracionMin * 60_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${titulo} — ${TALLER.nombre}`,
    dates: `${fmt(inicio)}/${fmt(fin)}`,
    details: "Entra al portal con tu contraseña: https://www.resueltoagency.com/taller",
    location: "https://www.resueltoagency.com/taller",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function CalendarioClient() {
  const [ahora, setAhora] = useState<number | null>(null);
  useEffect(() => setAhora(Date.now()), []);

  const sesiones = [...TALLER.sesiones].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
  );

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Calendario</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Las fechas de los próximos en vivo y la llamada de seguimiento. Agrega las que quieras a tu Google Calendar.
      </p>

      {sesiones.length === 0 ? (
        <div
          className="mt-8 rounded-2xl border px-6 py-14 text-center text-sm"
          style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)", color: "var(--muted)" }}
        >
          Aún no hay fechas publicadas. Cuando se abra la próxima cohorte, la verás aquí.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {sesiones.map((s) => {
            const ts = new Date(s.fecha).getTime();
            const pasada = ahora !== null && ts < ahora;
            return (
              <div
                key={s.fecha + s.titulo}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4"
                style={{
                  borderColor: pasada ? "rgba(244,240,222,0.12)" : "rgba(26,128,255,0.4)",
                  background: "var(--surface)",
                  opacity: pasada ? 0.55 : 1,
                }}
              >
                <div>
                  <p className="font-semibold">{s.titulo}</p>
                  <p className="mt-0.5 text-sm capitalize" style={{ color: "var(--muted)" }}>
                    {formatoLima(s.fecha)} (Lima) · {s.duracionMin} min
                  </p>
                </div>
                {pasada ? (
                  <span
                    className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider"
                    style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--muted)" }}
                  >
                    Finalizada
                  </span>
                ) : (
                  <a
                    href={linkGoogleCalendar(s.titulo, s.fecha, s.duracionMin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackTaller("taller_calendario", { sesion: s.titulo })}
                    className="rounded-lg border px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                    style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
                  >
                    🗓 Añadir a Google Calendar
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
