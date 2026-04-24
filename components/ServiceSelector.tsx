"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import ServiceDetailAudiovisual from "./ServiceDetailAudiovisual";

type ServiceId = "audiovisual" | "ia" | null;

const core = SITE.services.core as any;
const premium = SITE.services.premium as any;

export default function ServiceSelector() {
  const [active, setActive] = useState<ServiceId>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Hash routing: /servicios#audiovisual auto-expands the service
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash === "#audiovisual") setActive("audiovisual");
    // IA is coming soon — don't auto-expand it
  }, []);

  function handleSelect(id: ServiceId) {
    if (active === id) {
      setActive(null);
      return;
    }
    setActive(id);
  }

  // Scroll to detail panel after it opens
  useEffect(() => {
    if (active && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [active]);

  return (
    <div>
      {/* ── 2 service cards ── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Card: Sistema Audiovisual */}
        <ServiceCard
          id="audiovisual"
          active={active}
          onSelect={handleSelect}
          color="green"
          badge={core.badge}
          name={core.name}
          tagline={core.tagline}
          price={core.price}
          priceNote={core.priceNote}
          items={core.items}
          cta={core.cta}
        />

        {/* Card: RESUELTO Automation */}
        <ServiceCard
          id="ia"
          active={active}
          onSelect={handleSelect}
          color="purple"
          badge={premium.badge}
          name={premium.name}
          tagline={premium.tagline}
          price={null}
          priceNote={null}
          items={premium.items}
          cta={premium.cta}
          landingUrl={premium.landingUrl}
        />
      </div>

      {/* ── Expanded detail panel ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            ref={detailRef}
            key={active}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden mt-4"
          >
            <div className={`rounded-2xl border overflow-hidden
              ${active === "audiovisual"
                ? "border-neon-green/25 bg-neon-green/[0.02]"
                : "border-neon-purple/25 bg-neon-purple/[0.02]"}`}>
              {active === "audiovisual" && <ServiceDetailAudiovisual />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Service Card ─────────────────────────────────────────────
function ServiceCard({
  id, active, onSelect, color, badge, name, tagline, price, priceNote, items, cta, landingUrl,
}: {
  id: ServiceId;
  active: ServiceId;
  onSelect: (id: ServiceId) => void;
  color: "green" | "purple";
  badge: string;
  name: string;
  tagline: string;
  price: string | null;
  priceNote: string | null;
  items: string[] | null;
  cta: string;
  landingUrl?: string;
}) {
  const isOpen = active === id;
  const isGreen = color === "green";

  const glowColor   = isGreen ? "rgba(0,255,135,ALPHA)" : "rgba(204,68,255,ALPHA)";
  const glowIdle    = glowColor.replace("ALPHA", "0.06");
  const glowHover   = glowColor.replace("ALPHA", "0.18");
  const glowActive  = glowColor.replace("ALPHA", "0.28");
  const borderColor = isGreen ? "rgba(0,255,135,ALPHA)" : "rgba(204,68,255,ALPHA)";
  const borderIdle  = borderColor.replace("ALPHA", "0.12");
  const borderHover = borderColor.replace("ALPHA", "0.45");
  const borderActive= borderColor.replace("ALPHA", "0.65");
  const textAccent  = isGreen ? "text-neon-green" : "text-neon-purple";
  const badgeBg     = isGreen ? "bg-neon-green/10 border-neon-green/25" : "bg-neon-purple/12 border-neon-purple/28";
  const dotColor    = isGreen ? "bg-neon-green" : "bg-neon-purple";
  const checkBg     = isGreen ? "bg-neon-green/12 border-neon-green/30 text-neon-green" : "bg-neon-purple/12 border-neon-purple/30 text-neon-purple";
  const btnClass    = isGreen ? "btn-glow" : "btn-outline";
  const bgColor     = isGreen ? "rgba(0,255,135,0.03)" : "rgba(204,68,255,0.04)";
  const bgActive    = isGreen ? "rgba(0,255,135,0.06)" : "rgba(204,68,255,0.07)";
  const accentLine  = isGreen
    ? "linear-gradient(90deg, rgba(0,255,135,0.85) 0%, rgba(0,255,135,0.3) 50%, transparent 100%)"
    : "linear-gradient(90deg, rgba(204,68,255,0.85) 0%, rgba(204,68,255,0.3) 50%, transparent 100%)";

  return (
    <motion.div
      onClick={() => { if (!landingUrl) onSelect(id); }}
      className={`relative rounded-2xl overflow-hidden ${landingUrl ? "cursor-default" : "cursor-pointer"}`}
      style={{
        background: isOpen ? bgActive : bgColor,
        border: `1px solid ${isOpen ? borderActive : borderIdle}`,
        boxShadow: isOpen
          ? `0 0 0 1px ${borderActive}, 0 0 48px ${glowActive}, inset 0 0 32px ${glowColor.replace("ALPHA", "0.04")}`
          : `0 0 0 0px transparent`,
      }}
      whileHover={{
        borderColor: borderHover,
        boxShadow: `0 0 0 1px ${borderHover}, 0 0 40px ${glowHover}, inset 0 0 24px ${glowColor.replace("ALPHA", "0.03")}`,
        background: isOpen ? bgActive : (isGreen ? "rgba(0,255,135,0.04)" : "rgba(204,68,255,0.05)"),
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Animated corner accents */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: accentLine }}
        animate={{ opacity: isOpen ? 1 : 0.3 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Corner HUD marks */}
      <motion.div className="absolute top-3 left-3 w-4 h-4 pointer-events-none"
        style={{ borderTop: `1.5px solid ${isOpen ? borderActive : borderIdle}`, borderLeft: `1.5px solid ${isOpen ? borderActive : borderIdle}`, borderTopLeftRadius: 4 }}
        animate={{ opacity: isOpen ? 1 : 0.4 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div className="absolute top-3 right-3 w-4 h-4 pointer-events-none"
        style={{ borderTop: `1.5px solid ${isOpen ? borderActive : borderIdle}`, borderRight: `1.5px solid ${isOpen ? borderActive : borderIdle}`, borderTopRightRadius: 4 }}
        animate={{ opacity: isOpen ? 1 : 0.4 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div className="absolute bottom-3 left-3 w-4 h-4 pointer-events-none"
        style={{ borderBottom: `1.5px solid ${isOpen ? borderActive : borderIdle}`, borderLeft: `1.5px solid ${isOpen ? borderActive : borderIdle}`, borderBottomLeftRadius: 4 }}
        animate={{ opacity: isOpen ? 1 : 0.4 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div className="absolute bottom-3 right-3 w-4 h-4 pointer-events-none"
        style={{ borderBottom: `1.5px solid ${isOpen ? borderActive : borderIdle}`, borderRight: `1.5px solid ${isOpen ? borderActive : borderIdle}`, borderBottomRightRadius: 4 }}
        animate={{ opacity: isOpen ? 1 : 0.4 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner glow bloom on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: isGreen
            ? "radial-gradient(ellipse at 30% 0%, rgba(0,255,135,0.07) 0%, transparent 70%)"
            : "radial-gradient(ellipse at 30% 0%, rgba(204,68,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="p-7 lg:p-8">
        {/* Badge */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-display font-semibold ${textAccent} ${badgeBg}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColor}`} />
            {badge}
          </span>
          {landingUrl && (
            <span className={`text-[10px] font-display font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${textAccent} opacity-75
              ${isGreen ? "border-neon-green/20" : "border-neon-purple/20"}`}>
              Automation
            </span>
          )}
        </div>

        {/* Name + tagline */}
        <h3 className="font-display font-bold text-xl lg:text-2xl text-cream tracking-tight mb-2 leading-tight">
          {name}
        </h3>
        <p className="font-body text-muted text-sm mb-5 leading-relaxed">{tagline}</p>

        {/* Price */}
        {price && (
          <div className="flex items-baseline gap-2 mb-5">
            <span className={`font-display font-extrabold text-3xl tracking-tight ${textAccent}`}>{price}</span>
            <span className="font-body text-muted/90 text-xs leading-snug">{priceNote}</span>
          </div>
        )}

        {/* Items list */}
        {items && (
          <ul className="space-y-2 mb-6">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className={`shrink-0 w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold mt-0.5 ${checkBg}`}>✓</span>
                <span className="font-body text-cream/85 text-sm leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA row */}
        <div className="flex items-center justify-between gap-4">
          {landingUrl ? (
            /* Card con landing dedicada — link directo */
            <Link
              href={landingUrl}
              onClick={(e) => e.stopPropagation()}
              className={`${btnClass} text-sm py-3 px-6`}
            >
              {cta}
            </Link>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(id); }}
              className={`${btnClass} text-sm py-3 px-6`}
            >
              {isOpen ? "Cerrar detalle ↑" : "Ver detalle completo ↓"}
            </button>
          )}
          {isOpen && !landingUrl && (
            <span className={`text-xs font-body ${textAccent}/60`}>
              Desplázate para explorar
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

