'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WaveText } from '@/components/ui/wave-text';

const problems = [
  { emoji: '⏱️', title: 'Demoran en responder',          description: 'Pierden leads en los primeros minutos. El prospecto pregunta, nadie contesta rapido, y ya se fue con la competencia.' },
  { emoji: '📨', title: 'Leads se pierden por desorden', description: 'Mensajes enterrados en el chat. Nadie hace seguimiento. Los prospectos calientes se enfrian sin que nadie lo note.' },
  { emoji: '💬', title: 'El equipo responde distinto',    description: 'Sin guion ni criterio. Cada vendedor improvisa y la calidad de la atencion depende del humor del dia.' },
  { emoji: '🎯', title: 'No filtran prospectos',          description: 'Pierden horas con curiosos que nunca van a comprar. Sin un sistema de calificacion, todo el mundo parece un lead.' },
  { emoji: '📅', title: 'Agendar les quita horas',        description: 'El vaiven de mensajes para coordinar una cita consume tiempo valioso que deberia dedicarse a cerrar ventas.' },
  { emoji: '🔁', title: 'Preguntan siempre lo mismo',     description: 'Las mismas 10 preguntas todos los dias. El equipo las responde manualmente, una por una, sin parar.' },
];

export function SistemasIAProblems() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 px-4 relative" style={{ background: '#040406' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.3), transparent)' }}
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
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.88, y: 36, filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.52, delay: 0.07 * i, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 18,
                borderRadius: 16,
                padding: '22px 24px',
                border: '1px solid rgba(77,159,255,0.1)',
                background: 'rgba(255,255,255,0.022)',
              }}
            >
              <span style={{ fontSize: '2.1rem', lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{p.emoji}</span>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#f8f8f2', marginBottom: 6 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(248,248,242,0.55)' }}>
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
