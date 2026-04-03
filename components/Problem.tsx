"use client";

import { SITE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROBLEM_VIDEO = "/videos/problem-section-bg.mp4";

function ProblemItem({ item, index }: { item: { label: string; text: string }; index: number }) {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: false, margin: "-80px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.15 }}
    >
      <div className="group card-base hud-corners relative p-7 cursor-default">
        {/* Number */}
        <div className="flex items-start gap-4">
          <span className="shrink-0 w-8 h-8 rounded-full bg-violet/15 border border-violet/20
                           flex items-center justify-center text-xs font-display font-bold text-violet-light">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-display font-semibold text-sm text-violet-light mb-2 tracking-wide">
              {item.label}
            </p>
            <p className="font-body text-muted text-base leading-relaxed group-hover:text-cream/80 transition-colors">
              {item.text}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={PROBLEM_VIDEO} type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/40" />

        {/* Additional dark tint */}
        <div className="absolute inset-0 bg-purple-dark/30" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 section-padding overflow-hidden">
        <div className="container-base relative z-10 h-full flex flex-col">
          {/* Title */}
          <AnimatedSection className="mb-16 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight mb-4">
              {SITE.problem.title}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-violet to-indigo mx-auto" />
          </AnimatedSection>

          {/* Items - Sequential scroll animation */}
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-16">
            {SITE.problem.items.map((item, i) => (
              <ProblemItem key={i} item={item} index={i} />
            ))}
          </div>

          {/* Closing text */}
          <AnimatedSection delay={0.4} className="text-center">
            <p className="font-display font-semibold text-xl lg:text-2xl text-gradient">
              {SITE.problem.closing}
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent z-20" />

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent z-20" />
    </section>
  );
}
