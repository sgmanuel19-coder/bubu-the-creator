"use client";

import { SITE } from "@/lib/constants";
import { motion } from "framer-motion";

const PROBLEM_VIDEO = "/videos/problem-section-bg.mp4";

export default function Problem() {
  const items = SITE.problem.items;

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Video background — autoplay, no sticky needed */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src={PROBLEM_VIDEO} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/65 to-black/60" />

      {/* Border lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight text-white mb-4">
            {SITE.problem.title}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto" />
        </motion.div>

        {/* Problem cards — appear one by one on scroll */}
        <div className="flex flex-col gap-5 mb-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.75,
                delay: i * 0.18,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="relative p-6 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-sm"
            >
              {/* HUD corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-violet-400/50 rounded-tl pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-violet-400/50 rounded-tr pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-violet-400/50 rounded-bl pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-violet-400/50 rounded-br pointer-events-none" />

              <div className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-violet-500/20 border border-violet-400/30
                                 flex items-center justify-center text-xs font-display font-bold text-violet-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display font-semibold text-sm text-violet-300 mb-1 tracking-wide uppercase">
                    {item.label}
                  </p>
                  <p className="font-body text-white/60 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center font-display font-semibold text-lg lg:text-xl bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"
        >
          {SITE.problem.closing}
        </motion.p>

      </div>
    </section>
  );
}
