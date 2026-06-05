"use client";

import { motion } from "framer-motion";

export interface ChipOption {
  key: string;
  label: string;
}

export default function FilterChips({
  options,
  active,
  onSelect,
  color = "green",
}: {
  options: ChipOption[];
  active: string;
  onSelect: (key: string) => void;
  color?: "green" | "purple";
}) {
  const rgb = color === "green" ? "26,128,255" : "77,159,255";

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {options.map((opt) => {
        const isActive = active === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            className="relative text-[11px] font-display font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full transition-colors duration-200"
            style={{
              color: isActive ? "#fff" : `rgba(${rgb},0.7)`,
              background: isActive ? `rgba(${rgb},0.16)` : "rgba(255,255,255,0.02)",
              border: `1px solid rgba(${rgb},${isActive ? 0.5 : 0.15})`,
            }}
          >
            {isActive && (
              <motion.span
                layoutId={`chip-glow-${color}`}
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `0 0 16px rgba(${rgb},0.35)`, border: `1px solid rgba(${rgb},0.6)` }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
