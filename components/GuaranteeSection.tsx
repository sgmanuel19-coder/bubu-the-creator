'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, FileText } from 'lucide-react';

const WA_LINK = 'https://wa.me/51907462070?text=Hola,%20quiero%20info%20sobre%20el%20Sistema%20de%20Automatizacion%20IA';

function PhaseCard({
  phase, days, icon: Icon, accentColor, accentRgb, title, description, badge, index, inView,
}: {
  phase: string; days: string; icon: React.ElementType;
  accentColor: string; accentRgb: string;
  title: string; description: string; badge: string;
  index: number; inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        flex: 1,
        minWidth: 0,
        borderRadius: 20,
        padding: '28px 26px 26px',
        overflow: 'hidden',
        background: hovered
          ? `linear-gradient(145deg, rgba(${accentRgb},0.10) 0%, rgba(4,8,24,0.97) 100%)`
          : 'linear-gradient(145deg, rgba(8,14,36,0.95) 0%, rgba(4,6,18,0.98) 100%)',
        border: `1px solid rgba(${accentRgb},${hovered ? 0.45 : 0.2})`,
        boxShadow: hovered
          ? `0 0 0 1px rgba(${accentRgb},0.15), 0 20px 60px rgba(${accentRgb},0.12), inset 0 1px 0 rgba(${accentRgb},0.12)`
          : `0 0 0 1px rgba(${accentRgb},0.06), inset 0 1px 0 rgba(200,215,245,0.04)`,
        transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Mouse radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
        background: `radial-gradient(circle 220px at ${mouse.x}px ${mouse.y}px, rgba(${accentRgb},0.18), rgba(${accentRgb},0.05) 50%, transparent 70%)`,
      }} />

      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s ease' }} />

      {/* Phase label */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(${accentRgb},0.7)` }}>
          {phase}
        </span>
        {/* Days badge */}
        <motion.div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 12px', borderRadius: 20,
            background: `rgba(${accentRgb},0.12)`,
            border: `1px solid rgba(${accentRgb},0.35)`,
          }}
          animate={{ boxShadow: [`0 0 0px ${accentColor}`, `0 0 14px rgba(${accentRgb},0.45)`, `0 0 0px ${accentColor}`] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
        >
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: accentColor, lineHeight: 1 }}>{days}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: `rgba(${accentRgb},0.7)`, fontWeight: 500 }}>días</span>
        </motion.div>
      </div>

      {/* Icon */}
      <div style={{
        width: 48, height: 48, borderRadius: 14, marginBottom: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `rgba(${accentRgb},0.1)`,
        border: `1px solid rgba(${accentRgb},0.28)`,
        boxShadow: hovered ? `0 0 20px rgba(${accentRgb},0.25)` : 'none',
        transition: 'box-shadow 0.3s ease',
        position: 'relative', zIndex: 1,
      }}>
        <Icon style={{ width: 22, height: 22, color: accentColor }} />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem',
        color: hovered ? '#e8eef8' : 'rgba(220,230,248,0.9)',
        marginBottom: 10, lineHeight: 1.25,
        position: 'relative', zIndex: 1,
        transition: 'color 0.25s ease',
      }}>{title}</h3>

      {/* Description */}
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.83rem', lineHeight: 1.6,
        color: hovered ? 'rgba(185,205,240,0.72)' : 'rgba(160,185,225,0.5)',
        position: 'relative', zIndex: 1,
        transition: 'color 0.25s ease',
        marginBottom: 18,
      }}>{description}</p>

      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 10,
        background: `rgba(${accentRgb},0.08)`,
        border: `1px solid rgba(${accentRgb},0.25)`,
        position: 'relative', zIndex: 1,
      }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.72rem', color: accentColor }}>{badge}</span>
      </div>
    </motion.div>
  );
}

export function GuaranteeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-28 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(155deg, #06091c 0%, #040406 45%, #07091e 100%)' }}>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(155,185,240,0.5), rgba(26,128,255,0.6), rgba(155,185,240,0.5), transparent)' }} />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(155,185,235,0.09) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 10%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 10%, transparent 100%)',
      }} />
      {/* Center glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 40%, rgba(26,100,220,0.10) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Shield icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 mx-auto"
            style={{ background: 'rgba(26,128,255,0.1)', border: '1px solid rgba(77,159,255,0.3)' }}
            animate={{ boxShadow: ['0 0 0px rgba(77,159,255,0)', '0 0 30px rgba(77,159,255,0.35)', '0 0 0px rgba(77,159,255,0)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ShieldCheck style={{ width: 30, height: 30, color: '#4D9FFF' }} />
          </motion.div>

          <motion.span
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4D9FFF', marginBottom: 14 }}
            animate={{ textShadow: ['0 0 0px #4D9FFF', '0 0 14px rgba(77,159,255,0.7)', '0 0 0px #4D9FFF'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span style={{ width: 24, height: 1, background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.8))', display: 'inline-block' }} />
            Garantía de acompañamiento
            <span style={{ width: 24, height: 1, background: 'linear-gradient(90deg, rgba(77,159,255,0.8), transparent)', display: 'inline-block' }} />
          </motion.span>

          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#e8eef8', lineHeight: 1.15 }}>
            Sin riesgo para ti.<br />
            <span style={{ background: 'linear-gradient(90deg, #4D9FFF, #a0c8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              El compromiso es nuestro.
            </span>
          </h2>
          <p style={{ marginTop: 14, fontFamily: 'Inter, sans-serif', color: 'rgba(170,190,230,0.55)', fontSize: '0.95rem', maxWidth: 480, margin: '14px auto 0' }}>
            Dos etapas claras. Todo por escrito. Sin letra chica.
          </p>
        </motion.div>

        {/* Two phase cards */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          <PhaseCard
            index={0}
            inView={inView}
            phase="Fase 1 — Activación"
            days="5"
            icon={Zap}
            accentColor="#f59e0b"
            accentRgb="245,158,11"
            title="Aterrizamos tu super agente personalizado"
            description="En los primeros 5 días configuramos, entrenamos y activamos tu agente con la voz y procesos de tu negocio. Si no lo logramos, te devolvemos todo — sin preguntas."
            badge="⚡ Reembolso total si no activamos"
          />

          {/* Connector arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, alignSelf: 'center', width: 36 }}
            className="hidden sm:flex"
          >
            <div style={{ fontSize: '1.4rem', color: 'rgba(155,185,240,0.35)' }}>→</div>
          </motion.div>

          <PhaseCard
            index={1}
            inView={inView}
            phase="Fase 2 — Acompañamiento"
            days="30"
            icon={HeartHandshake}
            accentColor="#4D9FFF"
            accentRgb="77,159,255"
            title="30 días contigo para que funcione de verdad"
            description="Una vez activo el agente, tienes 30 días de soporte directo. Ajustes, mejoras, respuestas a dudas — estamos contigo hasta que el sistema esté funcionando en tu negocio."
            badge="🤝 Soporte directo incluido"
          />
        </div>

        {/* Contract note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 12, marginBottom: 28,
            background: 'rgba(155,185,240,0.05)',
            border: '1px solid rgba(155,185,240,0.12)',
            width: 'fit-content', margin: '0 auto 32px',
          }}
        >
          <FileText style={{ width: 14, height: 14, color: 'rgba(155,185,240,0.5)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(155,185,240,0.5)' }}>
            Con contrato — las condiciones quedan por escrito antes de empezar
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.75 }}
          style={{ textAlign: 'center' }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '15px 32px', borderRadius: 14,
              background: 'linear-gradient(135deg, #1A80FF, #4D9FFF)',
              color: '#fff', fontFamily: 'Poppins, sans-serif',
              fontWeight: 600, fontSize: '0.95rem',
              boxShadow: '0 0 32px rgba(26,128,255,0.4), 0 4px 20px rgba(0,0,0,0.3)',
              textDecoration: 'none',
              transition: 'box-shadow 0.25s ease, transform 0.2s ease',
            }}
          >
            Agendar Demo en Vivo →
          </a>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(155,185,240,0.4), rgba(26,128,255,0.5), rgba(155,185,240,0.4), transparent)' }} />
    </section>
  );
}
