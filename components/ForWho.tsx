"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

const icons = ["⚙️", "📡", "⚡", "🌾", "🏗️", "💡"];
const colors = ["green", "purple", "green", "purple", "green", "purple"] as const;

export default function ForWho() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-neon-green/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[90px] pointer-events-none" />

      <div className="container-base relative z-10">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Para quién es
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-5 max-w-2xl">
            {SITE.forWho.title}
          </h2>
          <p className="font-body text-muted text-base lg:text-lg leading-relaxed max-w-2xl">
            {SITE.forWho.intro}
          </p>
        </AnimatedSection>

        {/* Profile list — horizontal rows, visually distinct */}
        <div className="space-y-3">
          {SITE.forWho.profiles.map((profile, i) => {
            const color = colors[i];
            const isGreen = color === "green";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`group flex items-center gap-6 lg:gap-8 px-7 py-6 rounded-2xl border
                            transition-all duration-300 cursor-default
                            ${isGreen
                              ? "border-neon-green/10 hover:border-neon-green/30 hover:bg-neon-green/[0.03]"
                              : "border-neon-purple/10 hover:border-neon-purple/30 hover:bg-neon-purple/[0.03]"
                            }`}
                style={{ background: "rgba(8,10,13,0.6)" }}
              >
                {/* Number */}
                <div className={`shrink-0 font-display font-bold text-3xl lg:text-4xl leading-none select-none
                  transition-colors duration-300
                  ${isGreen ? "text-neon-green/15 group-hover:text-neon-green/35" : "text-neon-purple/15 group-hover:text-neon-purple/35"}`}>
                  0{i + 1}
                </div>

                {/* Icon */}
                <div className={`shrink-0 w-12 h-12 rounded-xl text-2xl flex items-center justify-center
                                border transition-all duration-300
                                ${isGreen
                                  ? "bg-neon-green/8 border-neon-green/20 group-hover:bg-neon-green/14 group-hover:border-neon-green/40"
                                  : "bg-neon-purple/8 border-neon-purple/20 group-hover:bg-neon-purple/14 group-hover:border-neon-purple/40"
                                }`}>
                  {icons[i]}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-base lg:text-lg text-cream mb-1 group-hover:text-white transition-colors">
                    {profile.title}
                  </h3>
                  <p className="font-body text-muted text-sm leading-relaxed group-hover:text-cream/70 transition-colors">
                    {profile.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className={`shrink-0 text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1
                                transition-all duration-300
                                ${isGreen ? "text-neon-green/60" : "text-neon-purple/60"}`}>
                  →
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
