"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

export default function TrajectoryTimeline() {
  const { timeline, timelineLabel } = SITE.about;

  return (
    <section id="trayectoria" className="relative section-padding">
      <div className="container-base">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="font-display text-[11px] font-semibold tracking-[0.28em] uppercase text-neon-green mb-5 block">
            Trayectoria
          </span>
          <h2 className="font-display font-extrabold text-cream tracking-tight leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
            De ejecutar piezas a diseñar sistemas con IA
          </h2>
          <p className="font-body text-muted text-[15px] leading-relaxed">{timelineLabel}</p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 sm:pl-0">
          {/* vertical line on mobile */}
          <div className="sm:hidden absolute left-[4px] top-2 bottom-2 w-px bg-cream/12" />

          <div className="space-y-0">
            {timeline.map((item, i) => {
              const isLast = i === timeline.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative grid sm:grid-cols-[120px_1fr] gap-x-8 gap-y-1 py-6 border-t border-cream/8"
                >
                  {/* mobile dot */}
                  <span className="sm:hidden absolute left-[-28px] top-7 w-2.5 h-2.5 rounded-full"
                    style={{ background: isLast ? "#1A80FF" : "rgba(244,240,222,0.3)" }} />

                  {/* year */}
                  <span className={`font-display font-black text-sm tracking-wide pt-0.5 ${isLast ? "text-neon-green" : "text-cream/40"}`}>
                    {item.year}
                  </span>

                  {/* content */}
                  <div>
                    <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
                      <h3 className="font-display font-bold text-cream text-lg tracking-tight">{item.company}</h3>
                      <span className="font-body text-muted text-[12px] italic">{item.title}</span>
                    </div>
                    <p className="font-body text-muted text-[13.5px] leading-relaxed max-w-2xl">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
