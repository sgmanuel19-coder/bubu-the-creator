"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TALLER, leccionesConVideoGlobal, type Leccion } from "@/lib/taller/content";
import { getVistas, getUltimaLeccion } from "@/lib/taller/progress";
import { responder, PREGUNTAS_RAPIDAS, PREGUNTAS_RAPIDAS_VENTAS, CONSEJOS } from "@/lib/taller/bubu";
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

function PixelBubu({
  size = 56,
  parpadeo = false,
}: {
  size?: number;
  parpadeo?: boolean;
}) {
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
        [...fila].map((c, x) => {
          // Al parpadear, las lunas de los lentes se oscurecen un instante.
          const color = parpadeo && c === "L" ? "#2A4A73" : COLORES[c];
          return color ? (
            <rect
              key={`${x}-${y}`}
              x={x * px}
              y={y * px}
              width={px}
              height={px}
              fill={color}
            />
          ) : null;
        }),
      )}
    </svg>
  );
}

// ── Progreso del alumno (para mensajes y consejos) ────────────
function calcularProgreso(): { pct: number; siguiente: Leccion | null; hayVideos: boolean } {
  const vistas = getVistas();
  // Progreso a través de TODOS los cursos del Classroom.
  const conVideo = leccionesConVideoGlobal();
  if (conVideo.length === 0) return { pct: 0, siguiente: null, hayVideos: false };
  const total = conVideo.filter((l) => vistas[l.youtubeId]).length;
  const pct = Math.round((total / conVideo.length) * 100);
  const siguiente = conVideo.find((l) => !vistas[l.youtubeId]) ?? null;
  return { pct, siguiente, hayVideos: true };
}

function etapaDe(pct: number, hayVideos: boolean): keyof typeof CONSEJOS {
  if (!hayVideos || pct === 0) return "arranque";
  if (pct < 50) return "progreso";
  if (pct < 100) return "avanzado";
  return "completo";
}

function usarMensaje(pathname: string): string {
  const nombre = TALLER.asistente.nombre;
  return useMemo(() => {
    if (pathname === "/taller") {
      return `¡Hola! Soy ${nombre}, tu guía de la masterclass. Toca aquí y pregúntame lo que quieras — respondo al instante.`;
    }
    if (pathname.startsWith("/taller/en-vivo")) {
      return `Consejo de ${nombre}: entra 10 minutos antes del vivo y ven con una marca o producto en mente — lo vamos a trabajar en la sesión.`;
    }
    const { pct, siguiente, hayVideos } = calcularProgreso();
    if (!hayVideos) {
      return `Soy ${nombre} 👋 Los videos se publican pronto. Mientras tanto pregúntame lo que quieras de la masterclass — me sé el temario completo.`;
    }
    if (pct === 0) {
      return `¡Bienvenido! Soy ${nombre}, te acompaño en todo el curso. Empieza por la PARTE 0 y no te saltes el ACTO 1 — la estrategia es lo que separa tu contenido del resto.`;
    }
    if (pct === 100) {
      return `¡100% completado! 🎉 Ya tienes el sistema entero. Ahora toca COBRAR: pídeme un consejo y te digo cómo arrancar tu plan de 30 días.`;
    }
    if (siguiente) {
      return `Vas en ${pct}% — buen ritmo. Tu siguiente lección: «${siguiente.titulo}». ¿Dudas? Pregúntame aquí.`;
    }
    return `Vas en ${pct}%. Sigue así — cada parte construye sobre la anterior.`;
  }, [pathname, nombre]);
}

type Mensaje = { de: "alumno" | "bubu"; texto: string };

// ── Componente principal ──────────────────────────────────────
export default function AsistenteBubu() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [burbuja, setBurbuja] = useState(false);
  const [parpadeo, setParpadeo] = useState(false);
  const [chat, setChat] = useState<Mensaje[]>([]);
  const [pregunta, setPregunta] = useState("");
  const [consejoIdx, setConsejoIdx] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const mensaje = usarMensaje(pathname);
  const { asistente } = TALLER;
  // En la landing Bubu vende (info para decidir); adentro guía a profundidad.
  const modo: "ventas" | "curso" = pathname === "/taller" ? "ventas" : "curso";

  // Parpadeo del personaje cada ~4 segundos.
  useEffect(() => {
    const id = setInterval(() => {
      setParpadeo(true);
      setTimeout(() => setParpadeo(false), 180);
    }, 4200);
    return () => clearInterval(id);
  }, []);

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

  // Autoscroll del chat al último mensaje.
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [chat]);

  if (!asistente.activo) return null;

  function abrir() {
    setBurbuja(false);
    setAbierto(true);
    trackTaller("taller_asistente", { accion: "abrir", pagina: pathname });
  }

  function preguntar(texto: string) {
    const limpio = texto.trim();
    if (!limpio) return;
    const { respuesta, id } = responder(limpio, modo);
    setChat((c) => [...c, { de: "alumno", texto: limpio }, { de: "bubu", texto: respuesta }]);
    setPregunta("");
    trackTaller("taller_asistente", { accion: "pregunta", tema: id });
  }

  function darConsejo() {
    const { pct, hayVideos } = calcularProgreso();
    const pool = CONSEJOS[etapaDe(pct, hayVideos)];
    const texto = pool[consejoIdx % pool.length];
    setConsejoIdx((i) => i + 1);
    setChat((c) => [...c, { de: "bubu", texto: `💡 ${texto}` }]);
    trackTaller("taller_asistente", { accion: "consejo" });
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
            height: "min(560px, 72vh)",
          }}
          role="dialog"
          aria-label={`Asistente ${asistente.nombre}`}
        >
          <div
            className="flex items-center justify-between gap-3 border-b px-4 py-3"
            style={{ borderColor: "rgba(244,240,222,0.10)", background: "rgba(26,128,255,0.08)" }}
          >
            <div className="flex items-center gap-3">
              <PixelBubu size={36} parpadeo={parpadeo} />
              <div>
                <p className="text-sm font-bold">{asistente.nombre}</p>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                  Tu guía de la masterclass
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

          {/* Conversación */}
          <div ref={chatRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            <div
              className="max-w-[90%] rounded-2xl rounded-tl-sm border px-4 py-3 text-sm leading-relaxed"
              style={{ borderColor: "rgba(26,128,255,0.35)", background: "rgba(26,128,255,0.07)" }}
            >
              {mensaje}
            </div>
            {chat.map((m, i) => (
              <div
                key={`${i}-${m.texto.slice(0, 12)}`}
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.de === "alumno" ? "ml-auto rounded-tr-sm" : "rounded-tl-sm border"
                }`}
                style={
                  m.de === "alumno"
                    ? { background: "var(--green)", color: "#fff" }
                    : {
                        borderColor: "rgba(26,128,255,0.35)",
                        background: "rgba(26,128,255,0.07)",
                      }
                }
              >
                {m.texto}
              </div>
            ))}

            {/* Preguntas rápidas (solo al inicio de la conversación) */}
            {chat.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {(modo === "ventas" ? PREGUNTAS_RAPIDAS_VENTAS : PREGUNTAS_RAPIDAS).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => preguntar(q)}
                    className="rounded-full border px-3 py-1.5 text-xs transition-opacity hover:opacity-80"
                    style={{ borderColor: "rgba(244,240,222,0.25)", color: "var(--cream)" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Acciones */}
          <div
            className="border-t p-3"
            style={{ borderColor: "rgba(244,240,222,0.10)" }}
          >
            {modo === "curso" ? (
              <button
                type="button"
                onClick={darConsejo}
                className="mb-2 w-full rounded-xl border py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                style={{ borderColor: "rgba(26,128,255,0.45)", color: "var(--green)" }}
              >
                💡 Dame un consejo según mi avance
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAbierto(false);
                  document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" });
                  trackTaller("taller_asistente", { accion: "ver_planes" });
                }}
                className="mb-2 w-full rounded-xl border py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                style={{ borderColor: "rgba(26,128,255,0.45)", color: "var(--green)" }}
              >
                Ver planes y precios ↓
              </button>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                preguntar(pregunta);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
                placeholder="Pregúntame algo de la masterclass…"
                aria-label="Escribe tu pregunta"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2"
                style={{
                  background: "rgba(244,240,222,0.06)",
                  border: "1px solid rgba(244,240,222,0.18)",
                  color: "var(--cream)",
                }}
              />
              <button
                type="submit"
                aria-label="Enviar pregunta"
                className="shrink-0 rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--green)", color: "#fff" }}
              >
                →
              </button>
            </form>
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

      {/* Botón flotante (el personaje, con animación) */}
      <button
        type="button"
        onClick={abierto ? () => setAbierto(false) : abrir}
        aria-label={`Abrir asistente ${asistente.nombre}`}
        className="bubu-flota fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-xl"
        style={{ borderColor: "rgba(26,128,255,0.45)", background: "var(--surface)" }}
      >
        <PixelBubu size={48} parpadeo={parpadeo} />
      </button>
    </>
  );
}
