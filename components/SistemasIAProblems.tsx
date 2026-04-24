'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Users, MessageCircle, Shield, Calendar, Bot } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

const problems = [
  { icon: Clock,         title: 'Demoran en responder',       description: 'Pierden leads en los primeros minutos. El prospecto pregunta, nadie contesta rapido, y ya se fue con la competencia.', color: 'purple' as const },
  { icon: Users,         title: 'Leads se pierden por desorden', description: 'Mensajes enterrados en el chat. Nadie hace seguimiento. Los prospectos calientes se enfrian sin que nadie lo note.', color: 'green' as const },
  { icon: MessageCircle, title: 'El equipo responde distinto',  description: 'Sin guion ni criterio. Cada vendedor improvisa y la calidad de la atencion depende del humor del dia.', color: 'purple' as const },
  { icon: Shield,        title: 'No filtran prospectos',        description: 'Pierden horas con curiosos que nunca van a comprar. Sin un sistema de calificacion, todo el mundo parece un lead.', color: 'green' as const },
  { icon: Calendar,      title: 'Agendar les quita horas',      description: 'El vaiven de mensajes para coordinar una cita consume tiempo valioso que deberia dedicarse a cerrar ventas.', color: 'purple' as const },
  { icon: Bot,           title: 'Preguntan siempre lo mismo',   description: 'Las mismas 10 preguntas todos los dias. El equipo las responde manualmente, una por una, sin parar.', color: 'green' as const },
];

export function SistemasIAProblems() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 px-4 relative" style={{ background: '#040406' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(204,68,255,0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#cc44ff', marginBottom: 12 }}>
            <span style={{ width: 20, height: 1, background: 'rgba(204,68,255,0.5)', display: 'inline-block' }} />
            El problema real
            <span style={{ width: 20, height: 1, background: 'rgba(204,68,255,0.5)', display: 'inline-block' }} />
          </span>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: '#f8f8f2', lineHeight: 1.1 }}>
            Tu equipo pierde leads<br />
            <span style={{ color: '#cc44ff' }}>todos los dias</span>
          </h2>
          <p style={{ marginTop: 16, maxWidth: 480, margin: '16px auto 0', fontFamily: 'Inter, sans-serif', color: 'rgba(248,248,242,0.55)', fontSize: '1rem' }}>
            No porque sean malos vendedores. Sino porque no tienen un sistema que trabaje cuando ellos no pueden.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => {
            const Icon = p.icon;
            const isGreen = p.color === 'green';
            const rgb = isGreen ? '0,255,135' : '204,68,255';
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.55, delay: 0.07 * i, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <GlowCard glowColor={p.color} className="p-6 h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.25)` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: isGreen ? '#00ff87' : '#cc44ff' }} />
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#f8f8f2', marginBottom: 8 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(248,248,242,0.55)' }}>
                    {p.description}
                  </p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
