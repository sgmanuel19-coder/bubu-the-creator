"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SITE } from "@/lib/constants";

const tiers = (SITE.services as any).tiers as Array<{
  id: string;
  badge: string;
  name: string;
  tagline: string;
  price: string;
  pricePrefix: string;
  priceNote: string;
  secondPrice: string | null;
  secondPriceNote: string | null;
  items: string[];
  comparison: string;
  cta: string;
  ctaType: "whatsapp" | "calendly";
  featured: boolean;
}>;

export default function PricingTiers() {
  return (
    <section id="precios" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-neon-green/5 blur-[140px]" />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Inversión
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2
            className="font-display font-extrabold tracking-tighter leading-[1.05] mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {(SITE.services as any).tiersTitle}
          </h2>
          <p className="font-body text-muted max-w-xl mx-auto">
            {(SITE.services as any).tiersSubtitle}
          </p>
        </motion.div>

        {/* Anchor: traditional comparison */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center font-body text-sm mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-muted/80 line-through decoration-red-400/60 decoration-2">
            {(SITE.services as any).tiersAnchor}
          </span>
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center font-body text-muted/60 text-xs mt-8 max-w-lg mx-auto"
        >
          Todos los precios +IGV. Cada video incluye hasta 2 rondas de ajuste —
          iteraciones adicionales consumen tokens de IA y se cotizan por separado.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/15 to-transparent" />
    </section>
  );
}

// ── Tier card with 3D tilt ───────────────────────────────────
function TierCard({
  tier,
  index,
}: {
  tier: (typeof tiers)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 200, damping: 25 });
  const sy = useSpring(my, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(sy, [0, 1], [4, -4]);
  const rotateY = useTransform(sx, [0, 1], [-4, 4]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const featured = tier.featured;
  const href =
    tier.ctaType === "calendly" ? SITE.links.calendly : SITE.links.whatsapp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ perspective: 1000 }}
      className={featured ? "lg:-mt-4 lg:-mb-4" : ""}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={reduceMotion ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative h-full rounded-2xl border p-7 flex flex-col overflow-hidden transition-shadow duration-300 ${
          featured
            ? "border-neon-green/45 bg-neon-green/[0.04] shadow-[0_0_60px_rgba(26,128,255,0.15)] hover:shadow-[0_0_80px_rgba(26,128,255,0.25)]"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(26,128,255,0.08)]"
        }`}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: featured
              ? "linear-gradient(90deg, #1A80FF 0%, rgba(26,128,255,0.4) 60%, transparent 100%)"
              : "linear-gradient(90deg, rgba(238,235,212,0.4) 0%, rgba(238,235,212,0.1) 60%, transparent 100%)",
          }}
        />

        {/* Badge */}
        <div className="mb-5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-display font-bold tracking-wider uppercase ${
              featured
                ? "text-neon-green border-neon-green/35 bg-neon-green/10"
                : "text-muted border-white/12 bg-white/[0.03]"
            }`}
          >
            {featured && (
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            )}
            {tier.badge}
          </span>
        </div>

        {/* Name + tagline */}
        <h3 className="font-display font-bold text-xl lg:text-2xl text-cream tracking-tight mb-2 leading-tight">
          {tier.name}
        </h3>
        <p className="font-body text-muted text-sm leading-relaxed mb-6">
          {tier.tagline}
        </p>

        {/* Price */}
        <div className="mb-1">
          <div className="flex items-baseline gap-2">
            {tier.pricePrefix && (
              <span className="font-body text-muted text-sm">{tier.pricePrefix}</span>
            )}
            <span
              className={`font-display font-extrabold tracking-tight leading-none ${
                featured ? "text-neon-green text-5xl" : "text-cream text-4xl"
              }`}
            >
              {tier.price}
            </span>
          </div>
          <p className="font-body text-muted/70 text-xs mt-2">{tier.priceNote}</p>
          {tier.secondPrice && (
            <p className="font-body text-muted/70 text-xs mt-1">
              <span className="font-display font-bold text-cream/90 text-sm">
                {tier.secondPrice}
              </span>{" "}
              {tier.secondPriceNote}
            </p>
          )}
        </div>

        {/* Comparison anchor */}
        <p className="font-body text-[11px] text-red-300/60 line-through decoration-red-400/40 mt-3 mb-6">
          {tier.comparison}
        </p>

        {/* Items */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {tier.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5">
              <span
                className={`shrink-0 w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold mt-0.5 ${
                  featured
                    ? "bg-neon-green/12 border-neon-green/35 text-neon-green"
                    : "bg-white/5 border-white/15 text-cream/70"
                }`}
              >
                ✓
              </span>
              <span className="font-body text-cream/85 text-sm leading-snug">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${
            featured ? "btn-glow" : "btn-outline"
          } text-sm py-3.5 px-6 text-center w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/50`}
        >
          {tier.cta} →
        </a>
      </motion.div>
    </motion.div>
  );
}
