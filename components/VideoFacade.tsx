"use client";

import { useState } from "react";

/**
 * Facade para embeds de YouTube: renderiza solo el thumbnail (~30KB) y
 * carga el iframe (~800KB de JS de terceros) recién al hacer click.
 * Evita que el player de YouTube compita con el LCP de la página.
 */
type Props = {
  videoId: string;
  title: string;
};

export default function VideoFacade({ videoId, title }: Props) {
  const [playing, setPlaying] = useState(false);
  const [thumbFallback, setThumbFallback] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Reproducir video: ${title}`}
      className="group absolute inset-0 w-full h-full"
    >
      <link rel="preconnect" href="https://i.ytimg.com" />
      {/* maxresdefault no existe en todos los videos; hqdefault es el respaldo */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/${thumbFallback ? "hqdefault" : "maxresdefault"}.jpg`}
        alt={title}
        fetchPriority="high"
        onError={() => setThumbFallback(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Oscurecido leve para que el botón de play resalte */}
      <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />

      {/* Botón de play */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex items-center justify-center w-20 h-20 rounded-full bg-bg/80 backdrop-blur-sm
                     border border-neon-green/50 transition-transform group-hover:scale-110"
          style={{ boxShadow: "0 0 40px rgba(26,128,255,0.35)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5-11-6.5z" fill="#F4F0DE" />
          </svg>
        </span>
      </span>
    </button>
  );
}
