"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Para activar un video agrega el ID y la plataforma:
// Instagram: id: "ABC123xyz"  → https://www.instagram.com/reel/ABC123xyz/
// TikTok:    id: "12345678"   → https://www.tiktok.com/@user/video/12345678
// ─────────────────────────────────────────────────────────────────────────────
const REELS: { id: string | null; platform: "instagram" | "tiktok"; label: string; client: string; color: "green" | "purple" }[] = [
  { id: "DNG9SA4RGyf", platform: "instagram", label: "Colaboración", client: "WIN Internet · Mario Hart", color: "green"  },
  { id: "DOGsMRhDGKJ", platform: "instagram", label: "Experto a cámara", client: "WIN Internet",         color: "purple" },
  { id: "DSXaFmajAYQ", platform: "instagram", label: "Experto · IA",    client: "Livoltek",             color: "green"  },
  { id: "DW6m1y9E6hy", platform: "instagram", label: "Contenido IA",     client: "WIN Internet",        color: "purple" },
  { id: "DWR-phYj6dR", platform: "instagram", label: "Cobertura",        client: "Livoltek",             color: "green"  },
  { id: "DRNGaxTjWuf", platform: "instagram", label: "Cobertura evento", client: "Livoltek",          color: "purple" },
  { id: "C59LnoZJLS_", platform: "instagram", label: "Video en tienda",  client: "Wong",                 color: "green"  },
  { id: null, platform: "tiktok",    label: "Comercial",        client: "Video de venta",       color: "purple" },
  { id: null, platform: "instagram", label: "Contenido IA",     client: "Motion + IA",          color: "green"  },
];

function embedSrc(reel: typeof REELS[0]): string {
  if (!reel.id) return "";
  return reel.platform === "tiktok"
    ? `https://www.tiktok.com/embed/v2/${reel.id}`
    : `https://www.instagram.com/reel/${reel.id}/embed/`;
}

function ReelCard({ reel, index }: { reel: typeof REELS[0]; index: number }) {
  const isGreen = reel.color === "green";
  const borderColor = isGreen ? "rgba(0,255,135,0.18)" : "rgba(204,68,255,0.18)";
  const glowHover   = isGreen ? "rgba(0,255,135,0.22)" : "rgba(204,68,255,0.22)";
  const accentClass = isGreen ? "text-neon-green" : "text-neon-purple";
  const cornerColor = isGreen ? "rgba(0,255,135,0.55)" : "rgba(204,68,255,0.55)";
  const lineGrad    = isGreen
    ? "linear-gradient(90deg, rgba(0,255,135,0.8) 0%, rgba(0,255,135,0.2) 70%, transparent 100%)"
    : "linear-gradient(90deg, rgba(204,68,255,0.8) 0%, rgba(204,68,255,0.2) 70%, transparent 100%)";

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "9/16",
        background: "rgba(5,7,9,0.95)",
        border: `1px solid ${borderColor}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        borderColor: isGreen ? "rgba(0,255,135,0.5)" : "rgba(204,68,255,0.5)",
        boxShadow: `0 0 32px ${glowHover}, 0 8px 32px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: lineGrad }} />

      {/* HUD corners */}
      <div className="absolute top-3 left-3 w-4 h-4 pointer-events-none z-10"
        style={{ borderTop: `1.5px solid ${cornerColor}`, borderLeft: `1.5px solid ${cornerColor}`, borderTopLeftRadius: 3 }} />
      <div className="absolute top-3 right-3 w-4 h-4 pointer-events-none z-10"
        style={{ borderTop: `1.5px solid ${cornerColor}`, borderRight: `1.5px solid ${cornerColor}`, borderTopRightRadius: 3 }} />
      <div className="absolute bottom-3 left-3 w-4 h-4 pointer-events-none z-10"
        style={{ borderBottom: `1.5px solid ${cornerColor}`, borderLeft: `1.5px solid ${cornerColor}`, borderBottomLeftRadius: 3 }} />
      <div className="absolute bottom-3 right-3 w-4 h-4 pointer-events-none z-10"
        style={{ borderBottom: `1.5px solid ${cornerColor}`, borderRight: `1.5px solid ${cornerColor}`, borderBottomRightRadius: 3 }} />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-10"
        style={{ background: "repeating-linear-gradient(0deg,rgba(0,0,0,0.07) 0px,rgba(0,0,0,0.07) 1px,transparent 1px,transparent 4px)" }} />

      {reel.id ? (
        <iframe
          src={embedSrc(reel)}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          scrolling="no"
          allowTransparency
          allowFullScreen
        />
      ) : (
        <>
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: isGreen
                ? "radial-gradient(ellipse at 50% 35%, rgba(0,255,135,0.06) 0%, transparent 65%)"
                : "radial-gradient(ellipse at 50% 35%, rgba(204,68,255,0.06) 0%, transparent 65%)",
            }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                border: `1.5px solid ${borderColor}`,
                background: isGreen ? "rgba(0,255,135,0.07)" : "rgba(204,68,255,0.07)",
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ml-0.5 ${accentClass}`}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
            <span className={`font-display font-extrabold text-5xl select-none pointer-events-none ${accentClass} opacity-[0.06] absolute bottom-[20%] right-[10%]`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </>
      )}

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, rgba(6,6,8,0.95) 0%, transparent 100%)" }}>
        <p className={`font-display font-bold text-[10px] tracking-widest uppercase ${accentClass} mb-0.5`}>
          {reel.label}
        </p>
        <p className="font-body text-muted/50 text-[10px] leading-snug truncate">{reel.client}</p>
      </div>
    </motion.div>
  );
}

export default function VideoReel() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? REELS : REELS.slice(0, 8);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-neon-purple/20" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[300px] rounded-full bg-neon-purple/4 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[300px] rounded-full bg-neon-green/3 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="container-base relative z-10 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-3">
              <span className="w-6 h-px bg-neon-green/50" />
              Casos reales
            </span>
            <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight">
              Evidencia, no promesas
            </h2>
            <p className="font-body text-muted text-sm mt-2 max-w-md">
              Trabajo real para marcas reales.
            </p>
          </div>
          <Link href="/casos#portafolio" className="btn-outline text-sm self-start sm:self-auto shrink-0">
            Ver portafolio completo →
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="container-base relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {visible.map((reel, i) => (
            <ReelCard key={i} reel={reel} index={i} />
          ))}
        </div>

        {REELS.length > 8 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(v => !v)}
              className="btn-outline text-sm"
            >
              {showAll ? "Ver menos ↑" : `Ver todos (${REELS.length}) →`}
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
    </section>
  );
}
