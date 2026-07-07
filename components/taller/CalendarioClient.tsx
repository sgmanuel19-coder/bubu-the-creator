"use client";

import { useMemo, useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// Partes de fecha en zona Lima (para ubicar cada sesión en su día correcto).
function limaYMD(iso: string): { y: number; m: number; d: number } | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { y: get("year"), m: get("month") - 1, d: get("day") };
}

function horaLima(iso: string): string {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
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

export default function CalendarioClient({ desbloqueado }: { desbloqueado: boolean }) {
  // Mes inicial: el de hoy (o el de la próxima sesión si hay).
  const hoy = new Date();
  const [ver, setVer] = useState<{ y: number; m: number }>({
    y: hoy.getFullYear(),
    m: hoy.getMonth(),
  });

  // Sesiones agrupadas por día (clave "y-m-d") del mes visible.
  const porDia = useMemo(() => {
    const map = new Map<number, typeof TALLER.sesiones>();
    for (const s of TALLER.sesiones) {
      const p = limaYMD(s.fecha);
      if (!p || p.y !== ver.y || p.m !== ver.m) continue;
      const arr = map.get(p.d) ?? [];
      arr.push(s);
      map.set(p.d, arr);
    }
    return map;
  }, [ver]);

  const sesionesDelMes = [...porDia.values()].flat().sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
  );

  // Estructura de la grilla.
  const primerDia = new Date(ver.y, ver.m, 1).getDay(); // 0=Dom
  const offset = (primerDia + 6) % 7; // para empezar en Lunes
  const diasEnMes = new Date(ver.y, ver.m + 1, 0).getDate();
  const celdas: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
  ];
  while (celdas.length % 7 !== 0) celdas.push(null);

  const esHoy = (d: number) =>
    d === hoy.getDate() && ver.m === hoy.getMonth() && ver.y === hoy.getFullYear();

  function cambiarMes(delta: number) {
    setVer((v) => {
      const nm = v.m + delta;
      return { y: v.y + Math.floor(nm / 12), m: ((nm % 12) + 12) % 12 };
    });
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">Calendario</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Las actividades del programa por día. Agrega las que quieras a tu Google Calendar.
      </p>

      {!desbloqueado && (
        <div className="mt-6">
          <DesbloquearBanner />
        </div>
      )}

      {/* Cabecera de mes */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => cambiarMes(-1)}
          aria-label="Mes anterior"
          className="rounded-full border px-3 py-1.5 text-sm transition-opacity hover:opacity-80"
          style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
        >
          ‹
        </button>
        <p className="text-lg font-semibold capitalize">
          {MESES[ver.m]} {ver.y}
        </p>
        <button
          type="button"
          onClick={() => cambiarMes(1)}
          aria-label="Mes siguiente"
          className="rounded-full border px-3 py-1.5 text-sm transition-opacity hover:opacity-80"
          style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
        >
          ›
        </button>
      </div>

      {/* Grilla mensual */}
      <div
        className="mt-4 overflow-hidden rounded-2xl border"
        style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
      >
        <div className="grid grid-cols-7">
          {DIAS.map((d) => (
            <div
              key={d}
              className="border-b py-2 text-center text-[11px] uppercase tracking-wider"
              style={{ borderColor: "rgba(244,240,222,0.10)", color: "var(--muted)" }}
            >
              {d}
            </div>
          ))}
          {celdas.map((d, i) => {
            const sesiones = d ? porDia.get(d) : undefined;
            const conEvento = !!sesiones?.length;
            return (
              <div
                key={i}
                className="min-h-[64px] border-b border-r p-1.5"
                style={{ borderColor: "rgba(244,240,222,0.06)" }}
              >
                {d && (
                  <>
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-xs tabular-nums"
                      style={
                        esHoy(d)
                          ? { background: "var(--green)", color: "#fff", fontWeight: 700 }
                          : { color: "var(--muted)" }
                      }
                    >
                      {d}
                    </span>
                    {conEvento && (
                      <div
                        className="mt-1 truncate rounded px-1 py-0.5 text-[10px] font-medium"
                        style={{ background: "rgba(26,128,255,0.18)", color: "var(--green)" }}
                        title={sesiones!.map((s) => s.titulo).join(" · ")}
                      >
                        ● {sesiones!.length === 1 ? sesiones![0].titulo : `${sesiones!.length} eventos`}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detalle de las actividades del mes */}
      <div className="mt-6 space-y-3">
        {sesionesDelMes.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            No hay actividades en {MESES[ver.m]}. Usa las flechas para ver otros meses.
          </p>
        ) : (
          sesionesDelMes.map((s) => {
            const p = limaYMD(s.fecha);
            const pasada = new Date(s.fecha).getTime() < Date.now();
            return (
              <div
                key={s.fecha + s.titulo}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4"
                style={{
                  borderColor: pasada ? "rgba(244,240,222,0.12)" : "rgba(26,128,255,0.4)",
                  background: "var(--surface)",
                  opacity: pasada ? 0.6 : 1,
                }}
              >
                <div>
                  <p className="font-semibold">{s.titulo}</p>
                  <p className="mt-0.5 text-sm" style={{ color: "var(--muted)" }}>
                    {p ? `${p.d} de ${MESES[p.m]}` : ""} · {horaLima(s.fecha)} (Lima) · {s.duracionMin} min
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
          })
        )}
      </div>
    </main>
  );
}
