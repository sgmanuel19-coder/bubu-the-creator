"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================
// Reproductor con la IFrame API de YouTube.
//
// Por qué existe: antes la lección se marcaba como vista en el CLIC,
// así que el XP y los logros medían clics, no visionado. Aquí se avisa
// `onCompletado` recién cuando el alumno reprodujo el 80% del video
// (o llegó al final). Si la API no carga, cae a un iframe normal y el
// alumno siempre puede marcar la lección a mano con el check.
// ============================================================

const UMBRAL = 0.8;

type Reproductor = {
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

type YTGlobal = {
  Player: new (
    el: HTMLElement,
    opciones: Record<string, unknown>,
  ) => Reproductor;
  PlayerState: { ENDED: number };
};

declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let promesaApi: Promise<YTGlobal | null> | null = null;

// Carga el script una sola vez por sesión, aunque cambien de lección.
function cargarApi(): Promise<YTGlobal | null> {
  if (promesaApi) return promesaApi;
  promesaApi = new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(null);
    if (window.YT?.Player) return resolve(window.YT);

    const fallo = setTimeout(() => resolve(null), 8000);
    const anterior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      anterior?.();
      clearTimeout(fallo);
      resolve(window.YT ?? null);
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      clearTimeout(fallo);
      resolve(null);
    };
    document.head.appendChild(script);
  });
  return promesaApi;
}

export default function ReproductorYouTube({
  youtubeId,
  titulo,
  onCompletado,
}: {
  youtubeId: string;
  titulo: string;
  onCompletado: () => void;
}) {
  // Este wrapper es el único nodo que React administra. YT.Player()
  // REEMPLAZA el elemento que le pasamos por su propio iframe sin avisarle
  // a React — si le pasáramos un div con key={youtubeId} (como antes),
  // React intentaría luego hacer removeChild sobre un nodo que YT ya
  // sacó del DOM, y el `throw` resultante tumbaba toda la página al
  // cambiar de lección. Por eso el nodo que le entregamos a YT.Player se
  // crea y se destruye a mano, fuera de la reconciliación de React.
  const wrapper = useRef<HTMLDivElement>(null);
  const avisado = useRef(false);
  const [conApi, setConApi] = useState(true);

  useEffect(() => {
    avisado.current = false;
    let player: Reproductor | null = null;
    let intervalo: ReturnType<typeof setInterval> | null = null;
    let vivo = true;

    function completar() {
      if (avisado.current) return;
      avisado.current = true;
      onCompletado();
    }

    cargarApi().then((YT) => {
      if (!vivo) return;
      if (!YT || !wrapper.current) {
        setConApi(false);
        return;
      }
      setConApi(true);
      const nodo = document.createElement("div");
      wrapper.current.appendChild(nodo);
      player = new YT.Player(nodo, {
        // Sin width/height, el iframe que genera la API sale a su tamaño
        // por defecto (640×390) centrado dentro del contenedor — se veía
        // chico con barras negras a los lados. "100%" lo estira al wrapper.
        width: "100%",
        height: "100%",
        videoId: youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (e: { data: number }) => {
            if (e.data === YT.PlayerState.ENDED) completar();
          },
        },
      });

      intervalo = setInterval(() => {
        if (!player || avisado.current) return;
        try {
          const total = player.getDuration();
          if (total > 0 && player.getCurrentTime() / total >= UMBRAL) completar();
        } catch {
          // el player todavía no está listo — se reintenta al siguiente tick
        }
      }, 2000);
    });

    return () => {
      vivo = false;
      if (intervalo) clearInterval(intervalo);
      try {
        player?.destroy();
      } catch {
        // el nodo ya se fue con el desmontaje
      }
      if (wrapper.current) wrapper.current.innerHTML = "";
    };
    // onCompletado se recrea en cada render del padre: fijamos el efecto
    // al video para no reinstalar el player en cada tecla.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [youtubeId]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border"
      style={{ aspectRatio: "16 / 9", borderColor: "rgba(244,240,222,0.12)" }}
    >
      {conApi ? (
        <div ref={wrapper} className="absolute inset-0 h-full w-full" />
      ) : (
        <iframe
          key={youtubeId}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={titulo}
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
