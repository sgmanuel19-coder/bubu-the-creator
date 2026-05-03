"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * CyberMatrixBg — character grid that reacts to mouse proximity.
 * Blue palette. Designed as an absolute-positioned background layer
 * inside a `relative overflow-hidden` section.
 */
export function CyberMatrixBg() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient || !gridRef.current) return;
    const grid = gridRef.current;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/?@#$%^&*{}[]|';

    const createGrid = () => {
      grid.innerHTML = '';
      const size = 52;
      const columns = Math.max(1, Math.floor(grid.offsetWidth / size));
      const rows    = Math.max(1, Math.floor(grid.offsetHeight / size));
      grid.style.setProperty('--columns', String(columns));
      grid.style.setProperty('--rows',    String(rows));
      for (let i = 0; i < columns * rows; i++) {
        const tile = document.createElement('div');
        tile.className = 'cmb-tile';
        tile.textContent = chars[Math.floor(Math.random() * chars.length)];
        grid.appendChild(tile);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.32;
      for (const el of grid.children as HTMLCollectionOf<HTMLElement>) {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width  / 2);
        const dy = e.clientY - (r.top  + r.height / 2);
        const intensity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / radius);
        el.style.setProperty('--intensity', String(intensity.toFixed(3)));
      }
    };

    const ro = new ResizeObserver(createGrid);
    ro.observe(grid);
    window.addEventListener('mousemove', handleMouseMove);
    createGrid();

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  return (
    <>
      <div
        ref={gridRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(var(--columns, 12), 1fr)',
          gridTemplateRows:    'repeat(var(--rows, 8), 1fr)',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <style>{`
        .cmb-tile {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.88rem;
          font-weight: 700;
          user-select: none;
          pointer-events: none;
          opacity: calc(0.03 + var(--intensity, 0) * 0.88);
          color: hsl(214, 100%, calc(52% + var(--intensity, 0) * 38%));
          text-shadow: 0 0 calc(var(--intensity, 0) * 20px) rgba(77, 159, 255, 0.9),
                       0 0 calc(var(--intensity, 0) * 6px)  rgba(160, 200, 255, 0.6);
          transform: scale(calc(1 + var(--intensity, 0) * 0.18));
          transition: opacity 0.22s ease, color 0.22s ease, text-shadow 0.22s ease, transform 0.22s ease;
        }
      `}</style>
    </>
  );
}
