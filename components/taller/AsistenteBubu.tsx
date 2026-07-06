"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { TALLER, type Leccion } from "@/lib/taller/content";
import { getVistas, getUltimaLeccion } from "@/lib/taller/progress";
import { trackTaller } from "@/lib/taller/analytics";

// ── Personaje pixel art: hombre con lentes, estilo retro ──────
// Cada fila es una cadena de 16 "píxeles"; el mapa de caracteres
// define el color de cada uno. Se dibuja como <rect>s en SVG.
const PIXELES = [
  "....HHHHHHHH....",
  "...HHHHHHHHHH...",
  "..HHHHHHHHHHHH..",
  "..HHSSSSSSSSHH..",
  "..HSSSSSSSSSSH..",
  "..GGGGGGGGGGGG..",
  "..GLLGGSSGGLLG..",
  "..GLLGGSSGGLLG..",
  "..GGGGGSSGGGGG..",
  "..SSSSSSSSSSSS..",
  "..SSSMMMMMMSSS..",
  "...SSSSSSSSSS...",
  "....SSSSSSSS....",
  "...TTTTTTTTTT...",
  "..TTTTWWWWTTTT..",
  ".TTTTTWWWWTTTTT.",
];

const COLORES: Record<string, string> = {
  H: "#2B1D14", // cabello
  S: "#E5B584", // piel
  G: "#14120C", // montura de los lentes
  L: "#7FB8FF", // lunas
  M: "#A05A3C", // boca
  T: "#1A80FF", // polo
  W: "#F4F0DE", // cuello del polo
};

function PixelBubu({ size = 56 }: { size?: number }) {
  const px = size / 16;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {PIXELES.flatMap((fila, y) =>
        [...fila].map((c, x) =>
          COLORES[c] ? (
            <rect
              key={`${x}-${y}`}
              x={x * px}
              y={y * px}
              width={px}
              height={px}
              fill={COLORES[c]}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

// ── Lógica de mensajes contextuales ───────────────────────────
function siguienteLeccion(vistas: Record<string, boolean>): Leccion | null {
  for (const m of TALLER.modulos) {
    if (!m.disponible) continue;
    const pendiente = m.lecciones.find((l) => l.youtubeId && !vistas[l.youtubeId]);
    if (pendiente) return pendiente;
  }
  return null;
}

function usarMensaje(pathname: string): string {
  const nombre = TALLER.asistente.nombre;
  return useMemo(() => {
    if (pathname === "/taller") {
      return `¡Hola! Soy ${nombre}, el asistente de Manuel. Si tienes dudas sobre la masterclass, toca aquí y te las respondo al instante.`;
    }
    if (pathname.startsWith("/taller/en-vivo")) {
      return `Consejo de ${nombre}: entra 10 minutos antes del vivo y ven con una marca o producto en mente — lo vamos a trabajar en la sesión.`;
    }
    // /taller/curso — mensajes según el progreso real del alumno
    const vistas = getVistas();
    const conVideo = TALLER.modulos
      .filter((m) => m.disponible)
      .flatMap((m) => m.lecciones)
      .filter((l) => l.youtubeId);
    if (conVideo.length === 0) {
      return `Soy ${nombre} 👋 Los videos se publican pronto. Mientras tanto, revisa la agenda del vivo y prepara tu marca o producto.`;
    }
    const total = conVideo.filter((l) => vistas[l.youtubeId]).length;
    const pct = Math.round((total / conVideo.length) * 100);
    if (pct === 0) {
      return `¡Bienvenido! Soy ${nombre}, te acompaño en todo el curso. Mi consejo: empieza por la PARTE 0 y no te saltes el ACTO 1 — la estrategia es lo que separa tu contenido del resto.`;
    }
    if (pct === 100) {
      return `¡100% completado! 🎉 Ya tienes el sistema entero. Ahora toca COBRAR: baja al final de la página y mira las dos formas de ir más rápido.`;
    }
    const siguiente = siguienteLeccion(vistas);
    const ultima = getUltimaLeccion();
    if (ultima && siguiente) {
      return `Vas en ${pct}% — buen ritmo. Tu siguiente lección: «${siguiente.titulo}». Un módulo por día y en una semana tienes el sistema completo.`;
    }
    return `Vas en ${pct}%. Sigue así — cada parte construye sobre la anterior.`;
  }, [pathname, nombre]);
}

// ── Componente principal ──────────────────────────────────────
export default function AsistenteBubu() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [burbuja, setBurbuja] = useState(false);
  const mensaje = usarMensaje(pathname);
  const { asistente, whatsapp, gate } = TALLER;

  // La burbuja aparece sola una vez por página por sesión, sin acosar.
  useEffect(() => {
    const clave = `bubu_visto_${pathname}`;
    try {
      if (!window.sessionStorage.getItem(clave)) {
        const t = setTimeout(() => {
          setBurbuja(true);
          window.sessionStorage.setItem(clave, "1");
        }, 2500);
        return () => clearTimeout(t);
      }
    } catch {
      // sin sessionStorage, no mostramos la burbuja automática
    }
  }, [pathname]);

  if (!asistente.activo) return null;

  function abrir() {
    setBurbuja(false);
    setAbierto(true);
    trackTaller("taller_asistente", { accion: "abrir", pagina: pathname });
  }

  return (
    <>
      {/* Panel */}
      {abierto && (
        <div
          className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border shadow-2xl"
          style={{
            borderColor: "rgba(244,240,222,0.15)",
            background: "var(--surface)",
            maxHeight: "70vh",
          }}
          role="dialog"
          aria-label={`Asistente ${asistente.nombre}`}
        >
          <div
            className="flex items-center justify-between gap-3 border-b px-4 py-3"
            style={{ borderColor: "rgba(244,240,222,0.10)", background: "rgba(26,128,255,0.08)" }}
          >
            <div className="flex items-center gap-3">
              <PixelBubu size={36} />
              <div>
                <p className="text-sm font-bold">{asistente.nombre}</p>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                  Asistente de la masterclass
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar asistente"
              className="rounded-full px-2 text-lg"
              style={{ color: "var(--muted)" }}
            >
              ✕
            </button>
          </div>

          <div className="overflow-y-auto p-4">
            {/* Mensaje contextual */}
            <div
              className="rounded-2xl rounded-tl-sm border px-4 py-3 text-sm leading-relaxed"
              style={{ borderColor: "rgba(26,128,255,0.35)", background: "rgba(26,128,255,0.07)" }}
            >
              {mensaje}
            </div>

            {/* Preguntas frecuentes */}
            <p
              className="mt-4 text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "var(--muted)" }}
            >
              Respuestas al instante
            </p>
            <div className="mt-2 space-y-2">
              {gate.faq.map((f) => (
                <details
                  key={f.q}
                  className="rounded-xl border px-3 py-2.5"
                  style={{ borderColor: "rgba(244,240,222,0.12)" }}
                  onToggle={(e) => {
                    if ((e.target as HTMLDetailsElement).open) {
                      trackTaller("taller_asistente", { accion: "faq", pregunta: f.q });
                    }
                  }}
                >
                  <summary className="cursor-pointer text-sm font-medium">{f.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>

            {/* Derivación al bot de WhatsApp */}
            <a
              href={`${whatsapp}?text=${encodeURIComponent(asistente.mensajeWhatsApp)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTaller("taller_asistente", { accion: "whatsapp" })}
              className="mt-4 block rounded-xl py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--green)", color: "#fff" }}
            >
              ¿Otra pregunta? Escríbeme por WhatsApp →
            </a>
            <p className="mt-2 text-center text-[11px]" style={{ color: "var(--muted)" }}>
              Respondo 24/7 y Manuel entra cuando hace falta.
            </p>
          </div>
        </div>
      )}

      {/* Burbuja de saludo */}
      {burbuja && !abierto && (
        <button
          type="button"
          onClick={abrir}
          className="fixed bottom-24 right-4 z-50 w-[calc(100vw-6rem)] max-w-[280px] rounded-2xl rounded-br-sm border px-4 py-3 text-left text-sm leading-snug shadow-xl transition-opacity hover:opacity-90"
          style={{
            borderColor: "rgba(26,128,255,0.4)",
            background: "var(--surface)",
            color: "var(--cream)",
          }}
        >
          {mensaje}
        </button>
      )}

      {/* Botón flotante (el personaje) */}
      <button
        type="button"
        onClick={abierto ? () => setAbierto(false) : abrir}
        aria-label={`Abrir asistente ${asistente.nombre}`}
        className="fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-xl transition-transform hover:scale-105"
        style={{ borderColor: "rgba(26,128,255,0.45)", background: "var(--surface)" }}
      >
        <PixelBubu size={48} />
      </button>
    </>
  );
}
