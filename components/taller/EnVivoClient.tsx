"use client";

import { useEffect, useState } from "react";
import { TALLER } from "@/lib/taller/content";
import { trackTaller } from "@/lib/taller/analytics";

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

export default function EnVivoClient() {
  const { youtubeId, proximaFecha, titulo, descripcion, agenda } = TALLER.enVivo;
  const countdown = useCountdown(proximaFecha);
  // El chat de YouTube exige el dominio que lo embebe; solo existe en el navegador.
  const [host, setHost] = useState("");
  useEffect(() => setHost(window.location.hostname), []);

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

      {youtubeId ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div
            className="relative w-full overflow-hidden rounded-2xl border"
            style={{ aspectRatio: "16 / 9", borderColor: "rgba(244,240,222,0.12)" }}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={titulo}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          {host && (
            <div
              className="hidden overflow-hidden rounded-2xl border lg:block"
              style={{ borderColor: "rgba(244,240,222,0.12)" }}
            >
              <iframe
                src={`https://www.youtube.com/live_chat?v=${youtubeId}&embed_domain=${host}`}
                title="Chat en vivo"
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className="mt-6 flex flex-col items-center justify-center rounded-2xl border px-6 py-20 text-center"
          style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
        >
          <span
            className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
            style={{ borderColor: "rgba(26,128,255,0.5)", color: "var(--green)" }}
          >
            Próximamente
          </span>
          {countdown ? (
            <>
              <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
                El taller en vivo empieza en
              </p>
              <div className="mt-4 flex gap-3 sm:gap-5">
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
                      className="mt-1 text-[11px] uppercase tracking-widest"
                      style={{ color: "var(--muted)" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-6 max-w-md text-sm" style={{ color: "var(--muted)" }}>
              {descripcion}
            </p>
          )}
        </div>
      )}

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
