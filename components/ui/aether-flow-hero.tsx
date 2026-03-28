"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

const AetherFlowHero = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
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
      const n = (canvas!.height * canvas!.width) / 9000;
      const colors = [
        'rgba(0, 255, 135, 0.6)',
        'rgba(204, 68, 255, 0.6)',
        'rgba(0, 255, 135, 0.4)',
        'rgba(204, 68, 255, 0.4)',
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
            ctx!.strokeStyle = `rgba(0, 255, 135, ${opacity * 0.3})`;
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
      ctx!.fillStyle = 'rgba(6, 6, 8, 0.95)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p) => p.update());
      connect();
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
      transition: { delay: i * 0.2 + 0.5, duration: 0.8, ease: 'easeInOut' },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
          style={{ background: 'rgba(0,255,135,0.08)', borderColor: 'rgba(0,255,135,0.25)' }}
        >
          <Zap className="h-4 w-4" style={{ color: '#00ff87' }} />
          <span className="text-sm font-medium" style={{ color: '#00ff87', fontFamily: 'Space Grotesk, sans-serif' }}>
            Automatizacion Comercial con IA
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <span style={{ color: '#f8f8f2' }}>Tu negocio responde,</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #00ff87, #cc44ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            filtra y agenda solo.
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg md:text-xl mb-10"
          style={{ color: 'rgba(248,248,242,0.65)', fontFamily: 'Inter, sans-serif' }}
        >
          Instalo un sistema que convierte mensajes de WhatsApp e Instagram en citas calificadas.
          Sin bots genericos. Sin leads botados.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://wa.me/51999999999?text=Hola,%20quiero%20info%20sobre%20el%20Sistema%20Express%20de%20IA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105"
            style={{
              background: '#00ff87',
              color: '#060608',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            Quiero mi sistema <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="#paquetes"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 border"
            style={{
              borderColor: 'rgba(204,68,255,0.4)',
              color: '#cc44ff',
              background: 'rgba(204,68,255,0.08)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            Ver paquetes
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AetherFlowHero;
