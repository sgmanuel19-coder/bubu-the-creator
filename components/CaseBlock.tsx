"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CASE_VISUAL, type Caso } from "@/components/CaseCard";

export default function CaseBlock({ caso, index, reverse }: {
  caso: Caso; index: number; reverse?: boolean;
}) {
  const vis = CASE_VISUAL[caso.slug];
  const isIA = caso.era === "ia";
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-16"
    >
      {/* Text */}
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-display font-black text-2xl text-neon-green/30 tabular-nums">{num}</span>
          <span className="h-px flex-1 max-w-[40px] bg-cream/15" />
          <span
            className="text-[10px] font-display font-semibold tracking-[0.22em] uppercase px-2.5 py-1 rounded-full"
            style={
              isIA
                ? { color: "#1A80FF", border: "1px solid rgba(26,128,255,0.35)", background: "rgba(26,128,255,0.06)" }
                : { color: "#9E9882", border: "1px solid rgba(244,240,222,0.12)" }
            }
          >
            {isIA ? "Con IA" : "Track record"}
          </span>
        </div>

        <p className="font-display text-[11px] font-semibold tracking-[0.25em] uppercase text-muted mb-3">
          {caso.sector}
        </p>
        <h3 className="font-display font-extrabold text-cream tracking-tight leading-[1.05] mb-5"
          style={{ fontSize: "clamp(2rem, 3.4vw, 3.1rem)" }}>
          {caso.client}
        </h3>

        <p className="font-body text-muted text-[15px] leading-relaxed max-w-md mb-7">
          {caso.problem}
        </p>

        {vis && (
          <div className="flex items-end gap-5 mb-7">
            <div>
              <span className="font-display font-black text-cream leading-none tabular-nums"
                style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.6rem)" }}>
                {vis.mainValue}<span className="text-neon-green">{vis.mainSuffix}</span>
              </span>
              <p className="font-body text-muted text-[12px] mt-1.5 max-w-[200px] leading-snug">{vis.mainLabel}</p>
            </div>
          </div>
        )}

        {vis && (
          <div className="flex flex-wrap gap-2 mb-8">
            {vis.badges.map((b) => (
              <span key={b}
                className="text-[11px] font-body px-3 py-1 rounded-full text-cream/75"
                style={{ border: "1px solid rgba(244,240,222,0.14)" }}>
                {b}
              </span>
            ))}
          </div>
        )}

        <Link href={`/casos/${caso.slug}`}
          className="group inline-flex items-center gap-2 font-display font-semibold text-[12px] tracking-[0.15em] uppercase text-cream">
          <span className="border-b border-neon-green/0 group-hover:border-neon-green transition-colors pb-0.5">
            Ver caso completo
          </span>
          <span className="text-neon-green transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Image */}
      <div className={reverse ? "lg:order-1" : ""}>
        <Link href={`/casos/${caso.slug}`} className="group block relative rounded-xl overflow-hidden"
          style={{ aspectRatio: "16/10", border: "1px solid rgba(244,240,222,0.1)" }}>
          <Image
            src={caso.image}
            alt={caso.client}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, rgba(26,128,255,0.7) 0%, transparent 60%)" }} />
        </Link>
      </div>
    </motion.article>
  );
}
