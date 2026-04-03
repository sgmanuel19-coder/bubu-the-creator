"use client";

import { SITE } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PROBLEM_VIDEO = "/videos/problem-section-bg.mp4";

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress over the full 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Title fades in early and stays
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.08], [30, 0]);

  // Problem 1: appears at 10%, stays visible
  const p1Opacity = useTransform(scrollYProgress, [0.10, 0.20], [0, 1]);
  const p1Y = useTransform(scrollYProgress, [0.10, 0.20], [40, 0]);

  // Problem 2: appears at 35%, stays visible
  const p2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const p2Y = useTransform(scrollYProgress, [0.35, 0.45], [40, 0]);

  // Problem 3: appears at 60%, stays visible
  const p3Opacity = useTransform(scrollYProgress, [0.60, 0.70], [0, 1]);
  const p3Y = useTransform(scrollYProgress, [0.60, 0.70], [40, 0]);

  // Closing text: appears at 80%
  const closingOpacity = useTransform(scrollYProgress, [0.80, 0.90], [0, 1]);
  const closingY = useTransform(scrollYProgress, [0.80, 0.90], [20, 0]);

  const items = SITE.problem.items;
  const itemAnimations = [
    { opacity: p1Opacity, y: p1Y },
    { opacity: p2Opacity, y: p2Y },
    { opacity: p3Opacity, y: p3Y },
  ];

  return (
    // Outer: 300vh tall — provides scroll room
    <div ref={sectionRef} style={{ height: "300vh" }}>
      {/* Inner: sticky viewport — stays fixed while scrolling through the 300vh */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Video background */}
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={PROBLEM_VIDEO} type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/50" />
        <div className="absolute inset-0 bg-[#0d0618]/40" />

        {/* Border lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent z-20" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-20">
          <div className="w-full max-w-4xl mx-auto">

            {/* Title */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="text-center mb-14"
            >
              <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight text-white mb-4">
                {SITE.problem.title}
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto" />
            </motion.div>

            {/* Problem items */}
            <div className="grid md:grid-cols-2 gap-5 mb-12">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: itemAnimations[i].opacity, y: itemAnimations[i].y }}
                  className="group relative p-7 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-default"
                >
                  {/* HUD corners */}
                  <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-violet-400/40 rounded-tl" />
                  <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-violet-400/40 rounded-tr" />
                  <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-violet-400/40 rounded-bl" />
                  <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-violet-400/40 rounded-br" />

                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-violet-500/15 border border-violet-400/30
                                     flex items-center justify-center text-xs font-display font-bold text-violet-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-sm text-violet-300 mb-2 tracking-wide">
                        {item.label}
                      </p>
                      <p className="font-body text-white/60 text-base leading-relaxed group-hover:text-white/80 transition-colors">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Closing */}
            <motion.p
              style={{ opacity: closingOpacity, y: closingY }}
              className="font-display font-semibold text-xl lg:text-2xl text-center bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"
            >
              {SITE.problem.closing}
            </motion.p>

          </div>
        </div>

      </div>
    </div>
  );
}
