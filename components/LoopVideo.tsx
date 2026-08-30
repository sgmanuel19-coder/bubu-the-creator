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
        if (entry.isIntersecting) setCargar(true);
        else el.pause();
      },
      { rootMargin: "300px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reducido]);

  /* Este efecto corre DESPUÉS de que el <source> ya está en el DOM.
     Añadir un <source> a un <video> que el navegador ya renderizó no dispara
     ninguna descarga por sí solo: hay que pedirle explícitamente que relea sus
     fuentes con load(). Sin esto el marco se queda vacío cuando play() no
     arranca —autoplay bloqueado, pestaña oculta, ahorro de datos— porque nunca
     se llegó a decodificar ni el primer fotograma. */
  useEffect(() => {
    if (!cargar) return;
    const el = ref.current;
    if (!el) return;

    el.load();
    /* play() rechaza si el navegador todavía bloquea la reproducción. No es un
       error que deba romper nada: con load() ya hecho, el primer fotograma
       queda pintado igual. */
    el.play().catch(() => {});
  }, [cargar]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      /* "metadata" y no "none": el <source> solo se monta cuando el clip se
         acerca al viewport, así que aquí ya no hay riesgo de descargar de más.
         Con "none" el marco se queda en negro si la reproducción no arranca
         —autoplay bloqueado, ahorro de datos, pestaña en segundo plano— y el
         visitante ve una caja vacía en lugar del primer fotograma. */
      preload="metadata"
      aria-hidden="true"
      className={`h-full w-full object-cover ${className}`}
      style={vertical ? { aspectRatio: "9 / 16" } : undefined}
    >
      {cargar && <source src={src} type="video/mp4" />}
    </video>
  );
}
