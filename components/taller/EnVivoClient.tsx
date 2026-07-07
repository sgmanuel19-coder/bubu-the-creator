"use client";

import { useEffect, useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";

// Chat de comunidad estilo streamer (Kick/Twitch). Vista de diseño: durante
// el vivo, el chat real de YouTube reemplaza este panel. Los mensajes son
// ilustrativos del formato (uno destacado/fijado arriba).
const CHAT_DEMO = [
  { autor: "Manuel · RESUELTO", texto: "Bienvenidos al en vivo — ven con una marca o producto en mente, lo trabajamos hoy.", destacado: true },
  { autor: "Andrea", texto: "¡Aquí desde Lima! 🔥", destacado: false },
  { autor: "Diego", texto: "Listo para producir mi primer spot", destacado: false },
  { autor: "Bubu", texto: "Recuerda: se graba y queda en tu portal 🙌", destacado: false },
];

function ChatStreamer() {
  return (
    <div
      className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border"
      style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2.5"
        style={{ borderColor: "rgba(244,240,222,0.10)" }}
      >
        <span className="text-xs font-semibold uppercase tracking-wider">💬 Chat de la comunidad</span>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          vista previa
        </span>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {CHAT_DEMO.map((m) => (
          <div
            key={m.autor + m.texto}
            className="rounded-xl px-3 py-2 text-sm"
            style={
              m.destacado
                ? { background: "rgba(26,128,255,0.14)", border: "1px solid rgba(26,128,255,0.45)" }
                : { background: "rgba(244,240,222,0.04)" }
            }
          >
            {m.destacado && (
              <span
                className="mr-1 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                style={{ background: "var(--green)", color: "#fff" }}
              >
                ★ Fijado
              </span>
            )}
            <span
              className="font-semibold"
              style={{ color: m.destacado ? "var(--green)" : "var(--cream)" }}
            >
              {m.autor}
            </span>{" "}
            <span style={{ color: "var(--muted)" }}>{m.texto}</span>
          </div>
        ))}
      </div>
      <div
        className="border-t p-3"
        style={{ borderColor: "rgba(244,240,222,0.10)" }}
      >
        <div
          className="rounded-xl px-3 py-2 text-xs"
          style={{ background: "rgba(244,240,222,0.05)", color: "var(--muted)" }}
        >
          El chat se activa durante la transmisión en vivo…
        </div>
      </div>
    </div>
  );
}

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!target) return null;
  const diff = new Date(target).getTime() - now;
  if (Number.isNaN(diff) || diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    seg: s % 60,
  };
}

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
    details: `Entra al portal con tu contraseña: https://www.resueltoagency.com/taller`,
    location: "https://www.resueltoagency.com/taller",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function ProximasSesiones() {
  // Solo sesiones futuras; la lista completa vive en content.ts.
  const [ahora, setAhora] = useState<number | null>(null);
  useEffect(() => setAhora(Date.now()), []);
  if (ahora === null) return null;
  const futuras = TALLER.sesiones.filter(
    (s) => new Date(s.fecha).getTime() > ahora,
  );
  if (futuras.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold">Próximas sesiones</h2>
      <div className="mt-3 space-y-3">
        {futuras.map((s) => (
          <div
            key={s.fecha}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4"
            style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
          >
            <div>
              <p className="font-semibold">{s.titulo}</p>
              <p className="mt-0.5 text-sm capitalize" style={{ color: "var(--muted)" }}>
                {formatoLima(s.fecha)} (Lima) · {s.duracionMin} min
              </p>
            </div>
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
          </div>
        ))}
      </div>
    </section>
  );
}

export default function EnVivoClient({ desbloqueado }: { desbloqueado: boolean }) {
  const { youtubeId, proximaFecha, titulo, descripcion, agenda } = TALLER.enVivo;
  const countdown = useCountdown(proximaFecha);
  // El chat de YouTube exige el dominio que lo embebe; solo existe en el navegador.
  const [host, setHost] = useState("");
  useEffect(() => setHost(window.location.hostname), []);
  // Sólo con sesión y stream activo se carga la transmisión real.
  const enVivoActivo = desbloqueado && youtubeId;

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold sm:text-3xl">{titulo}</h1>
        <a
          href={TALLER.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTaller("taller_pregunta_vivo")}
          className="rounded-full border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
        >
          💬 Hacer una pregunta
        </a>
      </div>

      {!desbloqueado && (
        <div className="mt-6">
          <DesbloquearBanner />
        </div>
      )}

      {agenda.length > 0 && (
        <div
          className="mt-4 rounded-2xl border px-5 py-4"
          style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--green)" }}
          >
            Agenda de hoy
          </p>
          <ol className="mt-2 space-y-1">
            {agenda.map((punto, i) => (
              <li key={punto} className="flex gap-3 text-sm">
                <span className="tabular-nums" style={{ color: "var(--muted)" }}>
                  {i + 1}.
                </span>
                {punto}
              </li>
            ))}
          </ol>
        </div>
      )}

      {enVivoActivo ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
          {/* Reproductor con marco de marca "en vivo ahora" */}
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "rgba(26,128,255,0.4)", background: "var(--surface)" }}
          >
            <div
              className="flex items-center justify-between gap-3 border-b px-4 py-2.5"
              style={{ borderColor: "rgba(244,240,222,0.10)", background: "rgba(26,128,255,0.08)" }}
            >
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <span
                  className="bubu-pulse inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: "#FF4D4D" }}
                />
                En vivo ahora
              </span>
              <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                {TALLER.marca}
              </span>
            </div>
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={titulo}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
          {host && (
            <div
              className="hidden flex-col overflow-hidden rounded-2xl border lg:flex"
              style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
            >
              <div
                className="border-b px-4 py-2.5 text-xs font-semibold uppercase tracking-wider"
                style={{ borderColor: "rgba(244,240,222,0.10)" }}
              >
                💬 Chat en vivo
              </div>
              <iframe
                src={`https://www.youtube.com/live_chat?v=${youtubeId}&embed_domain=${host}`}
                title="Chat en vivo"
                className="h-full w-full flex-1"
              />
            </div>
          )}
        </div>
      ) : (
        // Layout estilo streamer (Kick/Twitch): pantalla + chat, incluso offline.
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "rgba(26,128,255,0.35)", background: "var(--surface)" }}
          >
            <div
              className="flex items-center justify-between gap-3 border-b px-4 py-2.5"
              style={{ borderColor: "rgba(244,240,222,0.10)", background: "rgba(244,240,222,0.03)" }}
            >
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: desbloqueado ? "#8A8570" : "#FF4D4D" }}
                />
                {desbloqueado ? "Offline" : "Bloqueado"}
              </span>
              <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                {TALLER.marca}
              </span>
            </div>
            {/* Pantalla offline/bloqueada */}
            <div
              className="relative flex flex-col items-center justify-center gap-3 px-6 text-center"
              style={{
                aspectRatio: "16 / 9",
                background:
                  "radial-gradient(circle at 50% 40%, rgba(26,128,255,0.12), transparent 60%), var(--bg)",
              }}
            >
              {desbloqueado ? (
                countdown ? (
                  <>
                    <span
                      className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
                      style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
                    >
                      Próximamente
                    </span>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      El en vivo empieza en
                    </p>
                    <div className="flex gap-3 sm:gap-5">
                      {(
                        [
                          [countdown.dias, "días"],
                          [countdown.horas, "horas"],
                          [countdown.min, "min"],
                          [countdown.seg, "seg"],
                        ] as [number, string][]
                      ).map(([value, label]) => (
                        <div key={label} className="flex flex-col items-center">
                          <span className="text-3xl font-bold tabular-nums sm:text-5xl">
                            {String(value).padStart(2, "0")}
                          </span>
                          <span
                            className="mt-1 text-[10px] uppercase tracking-widest"
                            style={{ color: "var(--muted)" }}
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-4xl">📡</span>
                    <p className="text-sm font-semibold">Sin transmisión ahora mismo</p>
                    <p className="max-w-sm text-xs" style={{ color: "var(--muted)" }}>
                      {descripcion}
                    </p>
                  </>
                )
              ) : (
                <>
                  <span className="text-4xl">🔒</span>
                  <p className="text-sm font-semibold">Transmisión para alumnos</p>
                  <p className="max-w-sm text-xs" style={{ color: "var(--muted)" }}>
                    Desbloquea con tu contraseña para entrar al en vivo.
                  </p>
                </>
              )}
            </div>
          </div>
          <ChatStreamer />
        </div>
      )}

      <ProximasSesiones />

      <p className="mt-6 text-center text-xs" style={{ color: "var(--muted)" }}>
        ¿Problemas para ver la transmisión?{" "}
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
    </main>
  );
}
