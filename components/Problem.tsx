"use client";

import { useRef } from "react";
import { SITE } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";

const PROBLEM_VIDEO = "/videos/problem-section-bg.mp4";

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Title: appears at 0–8%
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const titleY       = useTransform(scrollYProgress, [0, 0.08], [30, 0]);

  // Problem 1: 12–25%
  const p1Opacity = useTransform(scrollYProgress, [0.12, 0.25], [0, 1]);
  const p1Y       = useTransform(scrollYProgress, [0.12, 0.25], [40, 0]);

  // Problem 2: 38–51%
  const p2Opacity = useTransform(scrollYProgress, [0.38, 0.51], [0, 1]);
  const p2Y       = useTransform(scrollYProgress, [0.38, 0.51], [40, 0]);

  // Problem 3: 62–75%
  const p3Opacity = useTransform(scrollYProgress, [0.62, 0.75], [0, 1]);
  const p3Y       = useTransform(scrollYProgress, [0.62, 0.75], [40, 0]);

  // Closing: 82–93%
  const closingOpacity = useTransform(scrollYProgress, [0.82, 0.93], [0, 1]);
  const closingY       = useTransform(scrollYProgress, [0.82, 0.93], [20, 0]);

  const items = SITE.problem.items;
  const anims = [
    { opacity: p1Opacity, y: p1Y },
    { opacity: p2Opacity, y: p2Y },
    { opacity: p3Opacity, y: p3Y },
  ];

  return (
    // Outer 300vh gives scroll room
    <div ref={sectionRef} style={{ height: "300vh", position: "relative" }}>

      {/* Sticky viewport — locks to screen while user scrolls through 300vh */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* ── Video background ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        >
          <source src={PROBLEM_VIDEO} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.65), rgba(0,0,0,0.55))",
          }}
        />

        {/* Border lines */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)", zIndex: 2 }} />

        {/* ── Content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <div style={{ width: "100%", maxWidth: 640 }}>

            {/* Title */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY, textAlign: "center", marginBottom: 48 }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-orbitron, sans-serif)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
                  color: "#f8f8f2",
                  marginBottom: 16,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                {SITE.problem.title}
              </h2>
              <div style={{ width: 64, height: 2, background: "linear-gradient(to right, #7c3aed, #4f46e5)", margin: "0 auto" }} />
            </motion.div>

            {/* Problem cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  style={{
                    opacity: anims[i].opacity,
                    y: anims[i].y,
                    position: "relative",
                    padding: "20px 24px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(124,58,237,0.2)",
                        border: "1px solid rgba(167,139,250,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#c4b5fd",
                        fontFamily: "var(--font-orbitron, sans-serif)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-orbitron, sans-serif)",
                          fontWeight: 600,
                          fontSize: 12,
                          color: "#c4b5fd",
                          marginBottom: 6,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-inter, sans-serif)",
                          fontSize: 14,
                          color: "rgba(255,255,255,0.6)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Closing */}
            <motion.p
              style={{
                opacity: closingOpacity,
                y: closingY,
                textAlign: "center",
                fontFamily: "var(--font-orbitron, sans-serif)",
                fontWeight: 600,
                fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
                background: "linear-gradient(to right, #a78bfa, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.5,
              }}
            >
              {SITE.problem.closing}
            </motion.p>

          </div>
        </div>
      </div>
    </div>
  );
}
