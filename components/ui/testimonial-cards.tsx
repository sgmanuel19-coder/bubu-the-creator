"use client";

import * as React from "react";
import { motion } from "framer-motion";

type Position = "front" | "middle" | "back";

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: Position;
  id: number;
  author: string;
  role: string;
  company: string;
  color: "green" | "purple";
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
  role,
  company,
  color,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  const isGreen = color === "green";
  const accentColor = isGreen ? "#00ff87" : "#cc44ff";
  const borderColor = isGreen ? "rgba(0,255,135,0.25)" : "rgba(204,68,255,0.25)";
  const bgGlow     = isGreen ? "rgba(0,255,135,0.04)" : "rgba(204,68,255,0.04)";

  // Initials from author name
  const initials = author
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
        borderColor,
        background: `rgba(8,10,13,0.97)`,
      }}
      animate={{
        rotate: position === "front" ? "-5deg" : position === "middle" ? "0deg" : "5deg",
        x:      position === "front" ? "0%"    : position === "middle" ? "30%"  : "60%",
      }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: MouseEvent) => { dragRef.current = e.clientX; }}
      onDragEnd={(e: MouseEvent) => {
        if (dragRef.current - e.clientX > 150) handleShuffle();
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 flex flex-col h-[420px] w-[320px] select-none rounded-2xl border p-7 shadow-2xl backdrop-blur-sm
        ${isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
    >
      {/* Glow tint */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: bgGlow }} />

      {/* HUD corners */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l rounded-tl pointer-events-none" style={{ borderColor: accentColor + "60" }} />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r rounded-tr pointer-events-none" style={{ borderColor: accentColor + "40" }} />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l rounded-bl pointer-events-none" style={{ borderColor: accentColor + "40" }} />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r rounded-br pointer-events-none" style={{ borderColor: accentColor + "60" }} />

      {/* Stars */}
      <div className="relative z-10 flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-sm" style={{ color: accentColor + "bb" }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <div className="absolute top-5 right-7 font-bold text-5xl select-none pointer-events-none"
        style={{ color: accentColor + "12", fontFamily: "serif" }}>
        &ldquo;
      </div>

      {/* Testimonial text */}
      <p className="relative z-10 font-body text-cream/80 text-sm leading-relaxed flex-1 italic">
        &ldquo;{testimonial}&rdquo;
      </p>

      {/* Author */}
      <div className="relative z-10 flex items-center gap-3 mt-6 pt-5 border-t border-white/6">
        {/* Avatar — initials circle */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border shrink-0"
          style={{ background: bgGlow, borderColor, color: accentColor }}>
          {initials}
        </div>
        <div>
          <p className="font-display font-semibold text-sm text-cream">{author}</p>
          <p className="text-xs font-body mt-0.5" style={{ color: accentColor + "80" }}>
            {role} · {company}
          </p>
        </div>
      </div>

      {/* Drag hint on front card */}
      {isFront && (
        <p className="relative z-10 text-center text-[9px] font-display tracking-widest uppercase mt-3"
          style={{ color: accentColor + "50" }}>
          ← arrastra para ver más
        </p>
      )}

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, ${accentColor}50, transparent)` }} />
    </motion.div>
  );
}

// ── Shuffle container ────────────────────────────────────────────────────────
interface TestimonialData {
  id: number;
  testimonial: string;
  author: string;
  role: string;
  company: string;
}

interface ShuffleCardsProps {
  testimonials: TestimonialData[];
}

export function ShuffleCards({ testimonials }: ShuffleCardsProps) {
  const [positions, setPositions] = React.useState<Position[]>(
    testimonials.map((_, i) =>
      i === 0 ? "front" : i === 1 ? "middle" : "back"
    )
  );

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev] as Position[];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  };

  const colors: Array<"green" | "purple"> = ["green", "purple", "green", "purple", "green"];

  return (
    <div className="relative h-[420px] w-[320px]">
      {testimonials.map((t, i) => (
        <TestimonialCard
          key={t.id}
          {...t}
          handleShuffle={handleShuffle}
          position={positions[i]}
          color={colors[i % colors.length]}
        />
      ))}
    </div>
  );
}
