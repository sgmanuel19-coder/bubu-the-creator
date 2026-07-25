"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo de haces de luz animados — capa global del sitio.
 *
 * Adaptado del componente original con 4 cambios necesarios:
 *  1. Colores de marca: hue acotado al azul Resuelto (200–224), no el
 *     rango cian→púrpura del original.
 *  2. Bugs de DPR del original corregidos: `ctx.scale()` se acumulaba en
 *     cada resize, y los haces se creaban con dimensiones en píxeles de
 *     dispositivo mientras se dibujaban en píxeles CSS (se salían de pantalla).
 *  3. Rendimiento: el canvas se renderiza a escala reducida y se estira por
 *     CSS — el blur oculta por completo la menor resolución y baja el costo
 *     del filtro ~3x. Menos haces en móvil. Se pausa con la pestaña oculta.
 *  4. Es solo fondo: sin texto ni hero, `pointer-events:none`, y respeta
 *     `prefers-reduced-motion` (queda un degradado estático).
 */

type Beam = {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
};

type Intensity = "subtle" | "medium" | "strong";

const OPACITY_MAP: Record<Intensity, number> = {
  subtle: 0.55,
  medium: 0.8,
  strong: 1,
};

// Azul de marca (#1A80FF ≈ hue 212) con variación mínima a ambos lados.
const HUE_BASE = 200;
const HUE_RANGE = 24;

function createBeam(width: number, height: number): Beam {
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 60 + Math.random() * 120,
    length: height * 2.5,
    angle: -35 + Math.random() * 10,
    speed: 0.5 + Math.random() * 0.9,
    opacity: 0.1 + Math.random() * 0.12,
    hue: HUE_BASE + Math.random() * HUE_RANGE,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.015 + Math.random() * 0.025,
  };
}

export default function BeamsBackground({
  intensity = "medium",
}: {
  intensity?: Intensity;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // el degradado estático del CSS ya cubre este caso

    // Render a resolución reducida: el blur hace que no se note y baja mucho el costo.
    const RENDER_SCALE = 0.55;
    let w = 0;
    let h = 0;
    let running = true;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * RENDER_SCALE));
      canvas.height = Math.max(1, Math.floor(h * RENDER_SCALE));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // setTransform (no scale) — evita que la escala se acumule en cada resize
      ctx.setTransform(RENDER_SCALE, 0, 0, RENDER_SCALE, 0, 0);

      const total = window.innerWidth < 768 ? 9 : 18;
      beamsRef.current = Array.from({ length: total }, () => createBeam(w, h));
    };

    resize();
    window.addEventListener("resize", resize);

    const resetBeam = (beam: Beam, index: number, total: number) => {
      const columns = 3;
      const spacing = w / columns;
      beam.y = h + 100;
      beam.x =
        (index % columns) * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 80 + Math.random() * 120;
      beam.speed = 0.4 + Math.random() * 0.5;
      beam.hue = HUE_BASE + (index * HUE_RANGE) / total;
      beam.opacity = 0.14 + Math.random() * 0.1;
      return beam;
    };

    const drawBeam = (beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsing =
        beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * OPACITY_MAP[intensity];

      const g = ctx.createLinearGradient(0, 0, 0, beam.length);
      g.addColorStop(0, `hsla(${beam.hue}, 92%, 62%, 0)`);
      g.addColorStop(0.1, `hsla(${beam.hue}, 92%, 62%, ${pulsing * 0.5})`);
      g.addColorStop(0.4, `hsla(${beam.hue}, 92%, 62%, ${pulsing})`);
      g.addColorStop(0.6, `hsla(${beam.hue}, 92%, 62%, ${pulsing})`);
      g.addColorStop(0.9, `hsla(${beam.hue}, 92%, 62%, ${pulsing * 0.5})`);
      g.addColorStop(1, `hsla(${beam.hue}, 92%, 62%, 0)`);

      ctx.fillStyle = g;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width / RENDER_SCALE, canvas.height / RENDER_SCALE);
      ctx.filter = "blur(30px)";

      const total = beamsRef.current.length;
      beamsRef.current.forEach((beam, i) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -100) resetBeam(beam, i, total);
        drawBeam(beam);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    // Pausa cuando la pestaña no está visible (no gasta batería en segundo plano)
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafRef.current);
      } else if (!running) {
        running = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    animate();

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  return (
    <div className="beams-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="beams-bg-canvas" />
      <div className="beams-bg-veil" />
    </div>
  );
}
