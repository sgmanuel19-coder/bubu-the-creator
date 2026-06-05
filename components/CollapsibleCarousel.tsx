"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioCarousel from "@/components/PortfolioCarousel";

export default function CollapsibleCarousel() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-5 transition-colors"
          style={{
            background: "rgba(20,18,9,0.5)",
            border: `1px solid rgba(${open ? "26,128,255" : "244,240,222"},${open ? 0.35 : 0.12})`,
          }}
        >
          <div className="text-left">
            <span className="inline-flex items-center gap-2 text-[10px] font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-1">
              Portafolio visual completo
            </span>
            <p className="font-display font-bold text-cream text-base lg:text-lg">
              Ver láminas detalladas de cada caso
            </p>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center text-cream/70"
          >
            ▾
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="carousel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <div className="pt-6">
                <PortfolioCarousel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
