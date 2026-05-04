"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MotionImage = motion(Image);

const slides = [
  { src: "/images/portfolio/slide-01.png", label: "WIN Internet" },
  { src: "/images/portfolio/slide-02.png", label: "Mañana Me Caso" },
  { src: "/images/portfolio/slide-03.png", label: "Livoltek" },
  { src: "/images/portfolio/slide-04.png", label: "Redondos" },
  { src: "/images/portfolio/slide-05.png", label: "Wong Cencosud" },
  { src: "/images/portfolio/slide-06.png", label: "Marcas" },
];

export default function PortfolioCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go]);
  const next = useCallback(() => go((current + 1) % slides.length), [current, go]);

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/8"
           style={{ aspectRatio: "16/9", background: "#060709" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <MotionImage
            key={current}
            src={slides[current].src}
            alt={slides[current].label}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            quality={85}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 rounded-full border border-white/15 bg-black/50 backdrop-blur-sm
                     flex items-center justify-center text-white/70 hover:text-white hover:border-white/40
                     transition-all duration-200"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 rounded-full border border-white/15 bg-black/50 backdrop-blur-sm
                     flex items-center justify-center text-white/70 hover:text-white hover:border-white/40
                     transition-all duration-200"
        >
          →
        </button>

        {/* Slide counter */}
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
          <span className="font-display text-xs text-white/60">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Thumbnail dots + labels */}
      <div className="flex items-center justify-center gap-3 mt-5">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className={`h-0.5 rounded-full transition-all duration-300
              ${i === current
                ? "w-8 bg-neon-green"
                : "w-4 bg-white/20 group-hover:bg-white/40"
              }`}
            />
            <span className={`font-display text-[10px] tracking-wider transition-colors duration-200 hidden sm:block
              ${i === current ? "text-neon-green" : "text-muted/40 group-hover:text-muted/70"}`}>
              {slide.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
