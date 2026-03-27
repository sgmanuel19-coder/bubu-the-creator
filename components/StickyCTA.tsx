"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SITE } from "@/lib/constants";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaHref = SITE.links.calendly.startsWith("[")
    ? "/contacto"
    : SITE.links.calendly;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-3 px-4 md:px-8 py-2.5"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,255,135,0.08) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.92) 60%, rgba(204,68,255,0.08) 100%)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(0,255,135,0.15)",
          }}
        >
          {/* Availability indicator */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-neon-green slot-available" />
            <p className="font-body text-xs text-muted truncate">
              <span className="text-neon-green font-semibold">2 cupos disponibles</span>
              <span className="hidden sm:inline"> — proyectos Q2 2026</span>
            </p>
          </div>

          {/* CTA */}
          <a
            href={ctaHref}
            target={ctaHref.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="flex-shrink-0 font-display font-semibold text-xs tracking-wide text-[#060608] bg-neon-green hover:bg-neon-green/90 transition-colors rounded-full px-4 py-1.5 whitespace-nowrap"
          >
            ¿Aplico para trabajar contigo? →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
