"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * CyberMatrixBg — optimized blue character grid.
 * Key perf: RAF-throttled mousemove, cached tile positions (no per-tile getBCR),
 * DocumentFragment batch insert, larger tiles = fewer nodes.
 */
export function CyberMatrixBg() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient || !gridRef.current) return;
    // Skip on touch/mobile devices — saves CPU + DOM nodes
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const grid = gridRef.current;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>@#$%&*';

    type TileData = { cx: number; cy: number; el: HTMLElement };
    let tiles: TileData[] = [];
    let rafId: number | null = null;
    let pendingX = -9999;
    let pendingY = -9999;

    // Build grid — cache positions relative to container (scroll-stable)
    const buildGrid = () => {
      grid.innerHTML = '';
      tiles = [];
      const TILE = 62;
      const cols = Math.max(1, Math.floor(grid.offsetWidth  / TILE));
      const rows = Math.max(1, Math.floor(grid.offsetHeight / TILE));
      grid.style.setProperty('--columns', String(cols));
      grid.style.setProperty('--rows',    String(rows));

      const frag = document.createDocumentFragment();
      for (let i = 0; i < cols * rows; i++) {
        const el = document.createElement('div');
        el.className = 'cmb-tile';
        el.textContent = chars[Math.floor(Math.random() * chars.length)];
        frag.appendChild(el);
      }
      grid.appendChild(frag);

      // Cache after layout — positions relative to grid (stable on scroll)
      requestAnimationFrame(() => {
        const gr = grid.getBoundingClientRect();
        tiles = (Array.from(grid.children) as HTMLElement[]).map(el => {
          const r = el.getBoundingClientRect();
          return {
            cx: r.left - gr.left + r.width  / 2,
            cy: r.top  - gr.top  + r.height / 2,
            el,
          };
        });
      });
    };

    // RAF-throttled: one getBCR for the container, zero per tile
    const processFrame = () => {
      rafId = null;
      const gr = grid.getBoundingClientRect();
      const mx = pendingX - gr.left;
      const my = pendingY - gr.top;
      const radius = Math.min(gr.width, gr.height) * 0.38;
      for (const { cx, cy, el } of tiles) {
        const d = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        const v = Math.max(0, 1 - d / radius);
        el.style.setProperty('--intensity', v > 0.005 ? v.toFixed(2) : '0');
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(processFrame);
    };

    const onMouseLeave = () => {
      pendingX = -9999;
      pendingY = -9999;
      for (const { el } of tiles) el.style.setProperty('--intensity', '0');
    };

    const ro = new ResizeObserver(buildGrid);
    ro.observe(grid);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    buildGrid();

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
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
          gridTemplateColumns: 'repeat(var(--columns, 10), 1fr)',
          gridTemplateRows:    'repeat(var(--rows, 6), 1fr)',
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
          font-size: 0.85rem;
          font-weight: 700;
          user-select: none;
          pointer-events: none;
          will-change: opacity, transform;
          opacity: calc(0.03 + var(--intensity, 0) * 0.88);
          color: hsl(214, 100%, calc(52% + var(--intensity, 0) * 38%));
          text-shadow: 0 0 calc(var(--intensity, 0) * 18px) rgba(77,159,255,0.85);
          transform: scale(calc(1 + var(--intensity, 0) * 0.14));
          transition: opacity 0.18s ease, color 0.18s ease, text-shadow 0.18s ease, transform 0.18s ease;
        }
      `}</style>
    </>
  );
}
