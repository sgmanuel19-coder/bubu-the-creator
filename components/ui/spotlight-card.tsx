'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
};

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: keyof typeof glowColorMap;
}

export function GlowCard({ children, className = '', glowColor = 'green' }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      if (!cardRef.current) return;
      cardRef.current.style.setProperty('--x', e.clientX.toFixed(2));
      cardRef.current.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2));
      cardRef.current.style.setProperty('--y', e.clientY.toFixed(2));
      cardRef.current.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2));
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  return (
    <div
      ref={cardRef}
      data-glow
      className={`relative rounded-2xl backdrop-blur-sm ${className}`}
      style={{
        '--base': base,
        '--spread': spread,
        '--radius': '14',
        '--border': '2',
        '--backdrop': 'rgba(255,255,255,0.04)',
        '--backup-border': 'rgba(255,255,255,0.08)',
        '--size': '200',
        '--outer': '1',
        '--border-size': 'calc(var(--border, 2) * 1px)',
        '--spotlight-size': 'calc(var(--size, 200) * 1px)',
        '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) 100% 70% / 0.06), transparent
        )`,
        backgroundColor: 'var(--backdrop)',
        backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
        backgroundPosition: '50% 50%',
        backgroundAttachment: 'fixed',
        border: 'var(--border-size) solid var(--backup-border)',
        position: 'relative',
        touchAction: 'none',
      } as React.CSSProperties}
    >
      <div data-glow />
      {children}
    </div>
  );
}
