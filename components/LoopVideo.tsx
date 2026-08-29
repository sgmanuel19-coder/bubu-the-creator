"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video en loop, silencioso y diferido.
 *
 * La landing /energia muestra muchos clips a la vez y la biblioteca pesa entre
 * 2 y 12 MB por archivo. Cargarlos todos de entrada arruinaría la página en un
 * celular con datos móviles — que es justo como la va a abrir un gerente que
 * acaba de recibir el correo.
 *
 * Por eso el <source> no se monta hasta que el clip se acerca al viewport, y la
 * reproducción se pausa al salir de pantalla. Si el visitante pidió menos
 * movimiento en su sistema, se queda en el póster y nunca se descarga el video.
 */
export default function LoopVideo({
  src,
  poster,
  className = "",
  vertical = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  vertical?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [cargar, setCargar] = useState(false);
  const [reducido, setReducido] = useState(false);

  useEffect(() => {
    setReducido(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducido) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCargar(true);
          /* play() rechaza si el navegador aún bloquea la reproducción; no es
             un error que deba romper nada, el póster queda visible. */
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reducido]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`h-full w-full object-cover ${className}`}
      style={vertical ? { aspectRatio: "9 / 16" } : undefined}
    >
      {cargar && <source src={src} type="video/mp4" />}
    </video>
  );
}
