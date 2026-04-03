"use client";

import { useRef } from "react";
import { SITE } from "@/lib/constants";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const PROBLEM_VIDEO = "/videos/problem-section-bg.mp4";

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll progress over the full 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scroll drives the video currentTime (scrubbing)
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = video.duration * progress;
  });

  // Title: visible from the start
  const titleOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const titleY       = useTransform(scrollYProgress, [0, 0.06], [24, 0]);

  // Problem 1: appears at 15%
  const p1Opacity = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const p1Y       = useTransform(scrollYProgress, [0.15, 0.28], [36, 0]);

  // Problem 2: appears at 40%
  const p2Opacity = useTransform(scrollYProgress, [0.40, 0.53], [0, 1]);
  const p2Y       = useTransform(scrollYProgress, [0.40, 0.53], [36, 0]);

  // Problem 3: appears at 65%
  const p3Opacity = useTransform(scrollYProgress, [0.65, 0.78], [0, 1]);
  const p3Y       = useTransform(scrollYProgress, [0.65, 0.78], [36, 0]);

  // Closing: appears at 85%
  const closingOpacity = useTransform(scrollYProgress, [0.85, 0.96], [0, 1]);
  const closingY       = useTransform(scrollYProgress, [0.85, 0.96], [16, 0]);

  const items = SITE.problem.items;
  const anims = [
    { opacity: p1Opacity, y: p1Y },
    { opacity: p2Opacity, y: p2Y },
    { opacity: p3Opacity, y: p3Y },
  ];

  return (
    /* 300vh outer — provides the scroll distance */
    <div ref={sectionRef} style={{ height: "300vh" }}>

      {/* Sticky inner — stays locked to viewport while user scrolls through 300vh */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Video — paused, currentTime driven by scroll */}
        <video
          ref={videoRef}
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={PROBLEM_VIDEO} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/55 pointer-events-none" />

        {/* Border lines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent z-10" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-4xl">

            {/* Title */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="text-center mb-12"
            >
              <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight text-white mb-4">
                {SITE.problem.title}
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto" />
            </motion.div>

            {/* Problem cards */}
            <div className="flex flex-col gap-4 max-w-2xl mx-auto mb-10">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: anims[i].opacity, y: anims[i].y }}
                  className="relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
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
                      <p className="font-display font-semibold text-sm text-violet-300 mb-1 tracking-wide">
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
              style={{ opacity: closingOpacity, y: closingY }}
              className="font-display font-semibold text-lg lg:text-xl text-center bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"
            >
              {SITE.problem.closing}
            </motion.p>

          </div>
        </div>

      </div>
    </div>
  );
}
