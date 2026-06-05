"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

export default function TrajectoryTimeline() {
  const { timeline, timelineLabel } = SITE.about;

  return (
    <section id="trayectoria" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[300px] rounded-full bg-neon-purple/4 blur-[120px]" />
      </div>

      <div className="container-base relative z-10">
        <div className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-purple mb-4">
            <span className="w-6 h-px bg-neon-purple/50" />
            Trayectoria
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-4xl tracking-tight mb-3">
            De ejecutar piezas a diseñar sistemas con IA
          </h2>
          <p className="font-body text-muted text-sm">{timelineLabel}</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-green/40 via-neon-purple/30 to-transparent" />

          <div className="space-y-6">
            {timeline.map((item, i) => {
              const isLast = i === timeline.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative pl-8"
                >
                  {/* Dot */}
                  <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2"
                    style={{
                      borderColor: isLast ? "#1A80FF" : "rgba(77,159,255,0.5)",
                      background: isLast ? "#1A80FF" : "rgba(5,7,10,1)",
                      boxShadow: isLast ? "0 0 12px rgba(26,128,255,0.8)" : "none",
                    }} />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
                    <span className={`font-display font-black text-sm tracking-wide ${isLast ? "text-neon-green" : "text-neon-purple"}`}>
                      {item.year}
                    </span>
                    <span className="font-display font-bold text-cream text-base">{item.company}</span>
                    <span className="font-body text-muted text-[12px] italic">— {item.title}</span>
                  </div>
                  <p className="font-body text-muted text-[13px] leading-relaxed max-w-2xl">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
