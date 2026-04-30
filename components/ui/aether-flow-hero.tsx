"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { Typewriter } from '@/components/ui/typewriter';
import ShinyBordersButton from '@/components/ui/shiny-borders-button';

const AetherFlowHero = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isMobile = false;
    const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }

      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 5;
            this.y -= (dy / distance) * force * 5;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particles = [];
      const n = (canvas!.height * canvas!.width) / (isMobile ? 18000 : 9000);
      const colors = [
        'rgba(0, 255, 135, 0.5)',
        'rgba(204, 68, 255, 0.5)',
        'rgba(0, 255, 135, 0.3)',
        'rgba(204, 68, 255, 0.3)',
      ];
      for (let i = 0; i < n; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas!.width - size * 4) + size * 2;
        const y = Math.random() * (canvas!.height - size * 4) + size * 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(
          new Particle(x, y, Math.random() * 0.4 - 0.2, Math.random() * 0.4 - 0.2, size, color)
        );
      }
    }

    const resizeCanvas = () => {
      isMobile = window.innerWidth < 640;
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2;
          if (distance < (canvas!.width / 7) * (canvas!.height / 7)) {
            const opacity = 1 - distance / 20000;
            ctx!.strokeStyle = `rgba(0, 255, 135, ${opacity * 0.25})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx!.fillStyle = 'rgba(4, 4, 6, 0.96)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p) => p.update());
      if (!isMobile) connect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.18 + 0.4, duration: 0.75, ease: 'easeOut' },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-40 md:-top-20"
        fill="rgba(26,128,255,0.5)"
      />

      {/* Content: left text + right Spline */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-0 pt-28 pb-16 lg:pt-24 lg:pb-0 lg:min-h-screen">

        {/* ── Left: text content ── */}
        <div className="flex-1 flex flex-col items-start justify-center lg:pr-8 w-full max-w-2xl lg:max-w-none">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-7"
            style={{ background: 'rgba(26,128,255,0.08)', borderColor: 'rgba(26,128,255,0.25)' }}
          >
            <Zap className="h-4 w-4" style={{ color: '#1A80FF' }} />
            <span className="text-sm font-medium" style={{ color: '#1A80FF', fontFamily: 'Poppins, sans-serif' }}>
              Automatizacion Comercial con IA
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-bold tracking-tighter mb-5 leading-[1.05]"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.25rem, 5vw, 4.5rem)' }}
          >
            <span style={{ color: '#f8f8f2' }}>
              Super agente IA que responde,
            </span>
            <br />
            <Typewriter
              text="agenda y vende por ti 24/7"
              delay={950}
              speed={52}
              style={{
                background: 'linear-gradient(90deg, #1A80FF, #4D9FFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            />
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg mb-9 max-w-lg leading-relaxed"
            style={{ color: 'rgba(248,248,242,0.6)', fontFamily: 'Inter, sans-serif' }}
          >
            Maximiza y automatiza tus ventas con inteligencia artificial entrenada con tu negocio
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <ShinyBordersButton
              text="Agendar Demo en Vivo →"
              href="https://wa.me/51907462070?text=Hola,%20quiero%20info%20sobre%20el%20Sistema%20de%20Automatizacion%20IA"
              target="_blank"
              rel="noopener noreferrer"
            />
            <ShinyBordersButton
              text="Ver paquetes"
              href="#paquetes"
            />
          </motion.div>

          {/* Availability indicator */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex items-center gap-3"
          >
            <span
              className="flex items-center gap-2 text-xs"
              style={{ color: 'rgba(248,248,242,0.4)', fontFamily: 'Inter, sans-serif' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#1A80FF' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#1A80FF' }} />
              </span>
              3 cupos disponibles
            </span>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-3 flex items-center gap-1 flex-wrap"
          >
            {['Sistema listo en 5 días', 'Garantía 30 días', 'Con contrato', 'Meta business partners'].map((item, i, arr) => (
              <React.Fragment key={item}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'rgba(248,248,242,0.32)' }}>
                  ✓ {item}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: 'rgba(248,248,242,0.15)', fontSize: '0.7rem', margin: '0 4px' }}>·</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Spline 3D robot in circular frame — hidden on mobile ── */}
        <motion.div
          className="flex flex-1 items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="relative" style={{ width: 'clamp(220px, 70vw, 560px)', height: 'clamp(220px, 70vw, 560px)' }}>
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(77,159,255,0.1) 0%, rgba(26,128,255,0.06) 50%, transparent 75%)',
                transform: 'scale(1.15)',
              }}
            />
            {/* Spinning gradient border */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, rgba(26,128,255,0.8) 0%, rgba(77,159,255,0.8) 40%, rgba(26,128,255,0.1) 60%, rgba(77,159,255,0.8) 80%, rgba(26,128,255,0.8) 100%)',
                padding: 1.5,
                borderRadius: '50%',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full" style={{ background: '#040406' }} />
            </motion.div>
            {/* Static inner border for contrast */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(26,128,255,0.12)',
                boxShadow: '0 0 40px rgba(26,128,255,0.08), inset 0 0 40px rgba(77,159,255,0.06)',
              }}
            />
            {/* Clipped robot */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{ background: 'rgba(4,4,6,0.6)' }}
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #040406)' }}
      />
    </div>
  );
};

export default AetherFlowHero;
