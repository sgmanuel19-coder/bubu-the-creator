"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

const ACCENTS = [
  { rgb: "26,128,255", hex: "#1A80FF" },
  { rgb: "77,159,255", hex: "#4D9FFF" },
  { rgb: "10,77,170",  hex: "#0A4DAA" },
] as const;

export default function FutureVision() {
  const { title, intro, milestones, closing } = SITE.futureVision;

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-neon-purple/20" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-neon-green/4 blur-[130px]" />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Roadmap
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-4xl tracking-tight mb-3">
            {title}
          </h2>
          <p className="font-body text-muted max-w-xl">{intro}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-neon-green/40 via-neon-purple/20 to-transparent hidden md:block" />

          <div className="space-y-5">
            {milestones.map((milestone, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative md:pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[18px] top-5 w-4 h-4 rounded-full border-2 hidden md:block"
                    style={{
                      borderColor: accent.hex,
                      background: `rgba(${accent.rgb},0.15)`,
                      boxShadow: `0 0 12px ${accent.hex}55`,
                    }}
                  />

                  <div
                    className="rounded-2xl p-5 border"
                    style={{
                      background: "rgba(5,7,10,0.8)",
                      borderColor: `rgba(${accent.rgb},0.18)`,
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      {/* Label pill */}
                      <span
                        className="font-display font-black text-xs tracking-widest uppercase shrink-0 px-3 py-1.5 rounded-full self-start"
                        style={{
                          color: accent.hex,
                          background: `rgba(${accent.rgb},0.1)`,
                          border: `1px solid rgba(${accent.rgb},0.25)`,
                        }}
                      >
                        {milestone.label}
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-base text-cream mb-1">{milestone.title}</h3>
                        <p className="font-body text-muted text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-body text-muted text-sm italic mt-10 max-w-lg"
        >
          {closing}
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
    </section>
  );
}
