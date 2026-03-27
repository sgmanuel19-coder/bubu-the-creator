"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    const mouse = { x: -200, y: -200 };
    const ringPos = { x: -200, y: -200 };
    const glowPos = { x: -200, y: -200 };
    let rafId: number;
    let lastSpawn = 0;

    let particleToggle = false;
    const spawnParticle = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastSpawn < 40) return;
      lastSpawn = now;

      particleToggle = !particleToggle;
      const isGreen = particleToggle;

      const p = document.createElement("div");
      const size = 3 + Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      const dist = 8 + Math.random() * 18;
      const duration = 400 + Math.random() * 350;
      const opacity = 0.5 + Math.random() * 0.5;

      const color = isGreen
        ? `rgba(0,255,135,${opacity})`
        : `rgba(204,68,255,${opacity})`;
      const glow1 = isGreen
        ? `rgba(0,255,135,0.9)`
        : `rgba(160,32,240,0.9)`;
      const glow2 = isGreen
        ? `rgba(0,204,106,0.4)`
        : `rgba(204,68,255,0.4)`;

      p.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, ${color} 0%, transparent 100%);
        box-shadow: 0 0 ${size * 2}px ${glow1}, 0 0 ${size * 4}px ${glow2};
        pointer-events: none;
        z-index: 9996;
        transform: translate(${x - size / 2}px, ${y - size / 2}px) scale(1);
        transition: transform ${duration}ms cubic-bezier(0.1,0.8,0.2,1), opacity ${duration}ms ease, width ${duration}ms ease, height ${duration}ms ease;
        will-change: transform, opacity;
      `;
      document.body.appendChild(p);

      // Animate to final position
      requestAnimationFrame(() => {
        p.style.transform = `translate(${x + Math.cos(angle) * dist - 1}px, ${y + Math.sin(angle) * dist - 1}px) scale(0.2)`;
        p.style.opacity = "0";
        p.style.width = "2px";
        p.style.height = "2px";
      });

      setTimeout(() => p.remove(), duration + 50);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      glow.style.opacity = "1";
      spawnParticle(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      glow.style.opacity = "0";
    };

    // Check if hovering over a clickable
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button']");
      if (isClickable) {
        ring.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%,-50%) scale(1.8)`;
        ring.style.borderColor = "rgba(196,181,253,0.9)";
        ring.style.boxShadow = "0 0 20px rgba(124,58,237,0.8), 0 0 40px rgba(124,58,237,0.4)";
        dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%,-50%) scale(0.3)`;
      } else {
        ring.style.borderColor = "rgba(167,139,250,0.6)";
        ring.style.boxShadow = "0 0 10px rgba(124,58,237,0.5)";
        dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%,-50%) scale(1)`;
      }
    };

    const animate = () => {
      // Lerp ring & glow toward mouse
      ringPos.x += (mouse.x - ringPos.x) * 0.14;
      ringPos.y += (mouse.y - ringPos.y) * 0.14;
      glowPos.x += (mouse.x - glowPos.x) * 0.07;
      glowPos.y += (mouse.y - glowPos.y) * 0.07;

      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%)`;
      glow.style.transform = `translate(${glowPos.x}px, ${glowPos.y}px) translate(-50%,-50%)`;

      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* 1. Sharp center dot — neon green */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#00ff87",
          boxShadow: "0 0 8px rgba(0,255,135,1), 0 0 16px rgba(0,255,135,0.6)",
          willChange: "transform",
          transition: "opacity 0.2s ease, transform 0.05s ease",
        }}
      />
      {/* 2. Lagging ring — cycles green→purple via CSS */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] opacity-0"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(0,255,135,0.55)",
          boxShadow: "0 0 10px rgba(0,255,135,0.4)",
          willChange: "transform",
          transition: "opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
        }}
      />
      {/* 3. Large blurry glow orb — neon purple */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] opacity-0"
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(160,32,240,0.22) 0%, rgba(0,255,135,0.08) 50%, transparent 70%)",
          filter: "blur(10px)",
          willChange: "transform",
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}
