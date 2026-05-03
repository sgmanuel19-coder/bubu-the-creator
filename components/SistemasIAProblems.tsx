'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { WaveText } from '@/components/ui/wave-text';

const problems = [
  { emoji: '⏱️', title: 'Demoran en responder',          description: 'Pierden leads en los primeros minutos. El prospecto pregunta, nadie contesta rápido, y ya se fue con la competencia.' },
  { emoji: '📨', title: 'Leads se pierden por desorden', description: 'Mensajes enterrados en el chat. Nadie hace seguimiento. Los prospectos calientes se enfrían sin que nadie lo note.' },
  { emoji: '💬', title: 'El equipo responde distinto',    description: 'Sin guión ni criterio. Cada vendedor improvisa y la calidad de la atención depende del humor del día.' },
  { emoji: '🎯', title: 'No filtran prospectos',          description: 'Pierden horas con curiosos que nunca van a comprar. Sin un sistema de calificación, todo el mundo parece un lead.' },
  { emoji: '📅', title: 'Agendar les quita horas',        description: 'El vaivén de mensajes para coordinar una cita consume tiempo valioso que debería dedicarse a cerrar ventas.' },
  { emoji: '🔁', title: 'Preguntan siempre lo mismo',     description: 'Las mismas 10 preguntas todos los días. El equipo las responde manualmente, una por una, sin parar.' },
];

function ProblemCard({ p, i, inView }: { p: typeof problems[0]; i: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.88, y: 36, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.52, delay: 0.07 * i, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 18,
        borderRadius: 16,
        padding: '22px 24px',
        border: `1px solid rgba(77,159,255,${hovered ? 0.35 : 0.1})`,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.022)',
        boxShadow: hovered
          ? '0 8px 40px rgba(77,159,255,0.1), 0 0 0 1px rgba(77,159,255,0.12)'
          : '0 0 0 0 transparent',
        transform: hovered ? 'translateY(-3px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Mouse-following radial light */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(77,159,255,0.22), rgba(26,128,255,0.06) 50%, transparent 70%)`,
        }}
      />

      {/* Emoji */}
      <span style={{ fontSize: '2.1rem', lineHeight: 1, flexShrink: 0, marginTop: 1, position: 'relative', zIndex: 1 }}>
        {p.emoji}
      </span>

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '1rem',
          color: hovered ? '#f8f8f2' : 'rgba(248,248,242,0.9)',
          marginBottom: 6,
          transition: 'color 0.25s ease',
        }}>
          {p.title}
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: hovered ? 'rgba(248,248,242,0.7)' : 'rgba(248,248,242,0.55)',
          transition: 'color 0.25s ease',
        }}>
          {p.description}
        </p>
      </div>
    </motion.div>
  );
}

export function SistemasIAProblems() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #070b1e 0%, #040406 45%, #080d20 100%)' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(160,190,240,0.4), rgba(26,128,255,0.5), rgba(160,190,240,0.4), transparent)' }}
      />
      {/* Dot grid silver */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(160,190,235,0.10) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 10%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 10%, transparent 100%)',
      }} />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(77,130,220,0.10) 0%, transparent 70%)',
      }} />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(160,190,240,0.4), rgba(26,128,255,0.5), rgba(160,190,240,0.4), transparent)' }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4D9FFF', marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: 'rgba(77,159,255,0.5)', display: 'inline-block' }} />
            El problema real
            <span style={{ width: 20, height: 1, background: 'rgba(77,159,255,0.5)', display: 'inline-block' }} />
          </span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: '#f8f8f2', lineHeight: 1.1 }}>
            Pierdes clientes<br />
            <WaveText text="todos los dias" className="text-[#4D9FFF]" />
          </h2>
          <p style={{ marginTop: 16, maxWidth: 540, margin: '16px auto 0', fontFamily: 'Inter, sans-serif', color: 'rgba(248,248,242,0.55)', fontSize: '1rem' }}>
            No porque seas un mal vendedor, sino porque no tienes un sistema que trabaje y hable como tu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} p={p} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
