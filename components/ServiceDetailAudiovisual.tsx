"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/constants";

const core = SITE.services.core as any;
const forWho = SITE.forWho;

// ── FAQ específico del servicio ───────────────────────────────
const faqs = [
  {
    q: "¿Cuánto es la inversión y qué plan me conviene?",
    a: "Hay tres planes: Plan Señal ($500 +IGV, pago único) para empresas que quieren probar con un servicio específico; Plan Presencia ($1,000/mes +IGV, mínimo 3 meses) para presencia activa sostenida con ~10 piezas mensuales; y Plan Autoridad ($3,000 +IGV, pago único) para el sistema completo con ~23 piezas. La elección depende del momento de la empresa — si hay urgencia de activar rápido, Señal. Si hay compromiso de largo plazo, Presencia. Si quieren el sistema completo de golpe, Autoridad.",
  },
  {
    q: "¿Cómo se organiza el trabajo según el plan?",
    a: "En el Plan Señal se define el servicio elegido y se ejecuta en 1–2 semanas. En el Plan Presencia, cada mes tiene una jornada de grabación, dirección estratégica y entrega de ~10 piezas. En el Plan Autoridad (2 meses): Fase 1 — Estrategia y Cerebro IA; Fase 2 — Preproducción y guiones; Fase 3 — Grabaciones en campo; Fase 4 — Edición, IA y entrega final.",
  },
  {
    q: "¿Cuánto tiempo toma ver resultados?",
    a: "Con el Plan Señal tienes la primera pieza entregada en 1–2 semanas. Con Presencia, el primer mes ya tienes ~10 piezas activas. Con Autoridad, al día 60 la empresa tiene ~23 activos de comunicación instalados y listos para usar en redes, ventas, presentaciones y ferias. No prometemos viralidad — prometemos un sistema instalado y funcional.",
  },
  {
    q: "¿Para qué tipo de empresa está diseñado?",
    a: "Para empresas B2B, técnicas e industriales: telecomunicaciones, energía, ingeniería, agro, manufactura, infraestructura, tecnología. Empresas que ya tienen algo valioso pero no lo comunican con la claridad y el nivel que deberían. Requisito: vocero disponible y responsable interno para feedback.",
  },
  {
    q: "¿Por qué Resuelto y no hacerlo internamente?",
    a: "Porque instalar un sistema de comunicación que genera clientes requiere cuatro disciplinas actuando juntas: estrategia publicitaria, producción audiovisual, IA generativa aplicada al contenido y diseño de sistema comercial. La mayoría de equipos internos tiene una o dos. Resuelto opera con las cuatro — con criterio de agencia global y ejecución directa, sin capas.",
  },
  {
    q: "¿Qué pasa después del primer plan?",
    a: "Los clientes del Plan Señal tienen acceso preferencial al Plan Presencia o Autoridad. Los clientes del Plan Autoridad tienen precio preferencial en el Plan Presencia para mantener presencia activa. La base ya está construida — la decisión es cómo seguir aprovechándola.",
  },
];

// ── Proceso (phases) ─────────────────────────────────────────
const phases = [
  { icon: "🎯", label: "Fase 1", name: "Estrategia", weeks: "Sem. 1–2",
    steps: ["Diagnóstico y enfoque estratégico", "Mensaje central y arquitectura de comunicación"] },
  { icon: "🎨", label: "Fase 2", name: "Base Creativa", weeks: "Sem. 3–4",
    steps: ["Cerebro Creativo IA + documentación estratégica", "Guiones, storyboards y preproducción"] },
  { icon: "🎬", label: "Fase 3", name: "Producción", weeks: "Sem. 5–6",
    steps: ["Grabación de video caso y cobertura", "Grabación de expertos y voceros"] },
  { icon: "✨", label: "Fase 4", name: "Edición y Entrega", weeks: "Sem. 7–8",
    steps: ["Edición integral y recursos IA", "Entrega final + revisiones"] },
];

// ── Sub-components ───────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[10px] font-display font-bold tracking-[0.25em] uppercase text-neon-green mb-6">
      <span className="w-5 h-px bg-neon-green/50" />
      {text}
    </div>
  );
}

function PillarAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const pillars = core.pillars as any[];

  return (
    <div className="space-y-2">
      {pillars.map((p, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-xl border overflow-hidden transition-all duration-200
              ${isOpen ? "border-neon-green/30 bg-neon-green/[0.03]" : "border-white/7 bg-white/[0.02] hover:border-white/12"}`}
          >
            {isOpen && <div className="h-0.5 bg-gradient-to-r from-neon-green/70 to-transparent" />}
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left"
            >
              <span className="shrink-0 w-7 h-7 rounded-lg bg-neon-green/10 border border-neon-green/25 flex items-center justify-center
                font-display font-bold text-[10px] text-neon-green">
                {String(p.num).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm text-cream leading-snug">{p.title}</p>
                {!isOpen && <p className="font-body text-muted/50 text-xs mt-0.5 leading-snug line-clamp-1">{p.summary}</p>}
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.18 }}
                className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-sm font-bold transition-colors
                  ${isOpen ? "border-neon-green/50 text-neon-green bg-neon-green/10" : "border-white/12 text-muted/50"}`}
              >
                +
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <p className="font-body text-muted/70 text-sm leading-relaxed mb-4">{p.summary}</p>
                    <ul className="space-y-2 mb-4">
                      {p.detail.map((d: string, j: number) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="shrink-0 w-4 h-4 rounded-full bg-neon-green/12 border border-neon-green/30 flex items-center justify-center mt-0.5 text-[9px] font-bold text-neon-green">✓</span>
                          <span className="font-body text-cream/70 text-sm leading-snug">{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-start gap-2 pt-3 border-t border-white/5">
                      <span className="text-neon-green text-xs mt-0.5">→</span>
                      <p className="font-body text-neon-green/80 text-xs italic leading-relaxed">
                        <span className="font-semibold not-italic text-neon-green/60 mr-1">Lo que recibe:</span>
                        {p.receives}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const isGreen = i % 2 === 0;
        return (
          <div
            key={i}
            className={`rounded-xl border overflow-hidden transition-all duration-200
              ${isOpen
                ? isGreen ? "border-neon-green/25 bg-neon-green/[0.03]" : "border-neon-purple/25 bg-neon-purple/[0.03]"
                : "border-white/7 bg-white/[0.02] hover:border-white/12"}`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left"
            >
              <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-display font-bold transition-colors
                ${isOpen
                  ? isGreen ? "bg-neon-green/15 text-neon-green" : "bg-neon-purple/15 text-neon-purple"
                  : "bg-white/5 text-muted/40"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display font-semibold text-sm text-cream leading-snug">{faq.q}</span>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.18 }}
                className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm font-bold transition-colors
                  ${isOpen
                    ? isGreen ? "border-neon-green/40 text-neon-green" : "border-neon-purple/40 text-neon-purple"
                    : "border-white/12 text-muted/50"}`}
              >
                +
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className={`mx-5 mb-4 p-3.5 rounded-lg border-l-2 bg-white/[0.02]
                    ${isGreen ? "border-neon-green/35" : "border-neon-purple/35"}`}>
                    <p className="font-body text-muted text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function ProfileCard({
  profile,
  index,
}: {
  profile: { icon: string; title: string; description: string };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const colors = [
    "0,255,135",   // green
    "204,68,255",  // purple
    "0,255,135",
    "204,68,255",
    "0,255,135",
    "204,68,255",
  ];
  const rgb = colors[index % colors.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        padding: "20px 18px",
        border: `1px solid ${hovered ? `rgba(${rgb},0.45)` : `rgba(${rgb},0.1)`}`,
        background: hovered ? `rgba(${rgb},0.06)` : `rgba(${rgb},0.02)`,
        boxShadow: hovered
          ? `0 0 0 1px rgba(${rgb},0.15), 0 0 32px rgba(${rgb},0.1), inset 0 0 24px rgba(${rgb},0.03)`
          : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.28s cubic-bezier(0.21,0.47,0.32,0.98)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Top shimmer */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, rgba(${rgb},0.7), transparent)`,
          opacity: hovered ? 1 : 0.2,
          transition: "opacity 0.28s ease",
        }}
      />
      {/* Icon */}
      <div
        className="mb-3 flex items-center justify-center"
        style={{
          width: 44, height: 44,
          borderRadius: 12,
          background: `rgba(${rgb},0.1)`,
          border: `1px solid rgba(${rgb},0.25)`,
          fontSize: "1.3rem",
          boxShadow: hovered ? `0 0 20px rgba(${rgb},0.25)` : "none",
          transition: "box-shadow 0.28s ease",
        }}
      >
        {profile.icon}
      </div>
      <p className="font-display font-bold text-sm text-cream mb-1.5 leading-tight">
        {profile.title}
      </p>
      <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(176,200,184,0.65)" }}>
        {profile.description}
      </p>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function ServiceDetailAudiovisual() {
  const TAKEN = 2;
  const TOTAL = 3;
  const AVAILABLE = TOTAL - TAKEN;

  return (
    <div className="space-y-0">

      {/* ── DIVIDER ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent" />

      {/* ── 1. PROBLEMA ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="El problema que resuelve" />
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="font-display font-bold text-xl lg:text-2xl text-cream leading-tight mb-4">
              Muchas empresas operan bien.<br />
              <span className="text-neon-green">Pero hacia afuera ocurre otra cosa.</span>
            </h3>
            <p className="font-body text-muted text-sm leading-relaxed mb-5">
              {core.pitch}
            </p>
          </div>
          {/* Before / After */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-[10px] font-display font-bold tracking-widest uppercase text-muted/40 mb-3">Antes</p>
              <ul className="space-y-2">
                {["Comunicación dispersa", "Piezas sueltas", "Mensajes poco claros", "Contenido sin sistema", "Baja consistencia"].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-muted/30 text-xs mt-0.5">✕</span>
                    <span className="font-body text-muted/55 text-xs leading-snug">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-neon-green/20 bg-neon-green/[0.03] p-4">
              <p className="text-[10px] font-display font-bold tracking-widest uppercase text-neon-green/50 mb-3">Después</p>
              <ul className="space-y-2">
                {["Narrativa clara", "Marca bien percibida", "Contenido técnico entendible", "Activos reutilizables", "Presencia sólida"].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-neon-green text-xs mt-0.5">✓</span>
                    <span className="font-body text-cream/70 text-xs leading-snug">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 2. QUÉ ES ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Qué es este sistema" />
        <p className="font-body text-muted text-sm lg:text-base leading-relaxed max-w-2xl">
          {core.whatItIs}
        </p>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 3. QUÉ INCLUYE (10 pilares) ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Qué incluye la implementación" />
        <p className="font-body text-muted/70 text-sm mb-6">
          10 pilares de trabajo. Despliega cada uno para ver qué contempla y qué entrega.
        </p>
        <PillarAccordion />
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 4. QUÉ RECIBE AL FINAL ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Qué recibe la empresa al final" />
        <p className="font-body text-muted/70 text-sm mb-6">
          Al terminar los 60 días, tu empresa no solo recibe "videos".
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {(core.finalDeliverables as string[]).map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-neon-green/12 bg-neon-green/[0.02] px-4 py-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-neon-green/12 border border-neon-green/30 flex items-center justify-center text-[9px] font-bold text-neon-green mt-0.5">✓</span>
              <span className="font-body text-cream/75 text-sm leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 7. PARA QUIÉN ES / NO ES ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Para quién es" />
        <p className="font-body text-muted/70 text-sm mb-8 max-w-xl leading-relaxed">{forWho.intro}</p>

        {/* Profile cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {forWho.profiles.map((p, i) => (
            <ProfileCard key={i} profile={p} index={i} />
          ))}
        </div>

        {/* Not for section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-display font-bold tracking-[0.2em] uppercase text-muted/50 mb-4">
              <span className="w-4 h-px bg-muted/30" />
              Para quién NO es
            </p>
            <div className="space-y-2">
              {(forWho as any).notFor.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.015] px-3 py-2.5">
                  <span className="text-muted/30 text-xs mt-0.5 shrink-0 font-bold">✕</span>
                  <span className="font-body text-muted/55 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <div
              className="w-full rounded-xl p-5"
              style={{
                background: "rgba(0,255,135,0.03)",
                border: "1px solid rgba(0,255,135,0.15)",
                borderLeft: "3px solid rgba(0,255,135,0.5)",
              }}
            >
              <p className="text-[10px] font-display font-bold tracking-widest uppercase text-neon-green/60 mb-2">
                El criterio
              </p>
              <p className="font-body text-muted/80 text-sm leading-relaxed">
                {forWho.closing}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 6. PROCESO 60 DÍAS ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="El proceso — 60 días" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, i) => (
            <div key={i} className={`rounded-xl border p-4
              ${i % 2 === 0 ? "border-neon-green/15 bg-neon-green/[0.02]" : "border-neon-purple/15 bg-neon-purple/[0.02]"}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{phase.icon}</span>
                <div>
                  <p className={`text-[9px] font-display font-bold tracking-widest uppercase ${i % 2 === 0 ? "text-neon-green/60" : "text-neon-purple/60"}`}>
                    {phase.label}
                  </p>
                  <p className={`font-display font-bold text-sm ${i % 2 === 0 ? "text-neon-green" : "text-neon-purple"}`}>
                    {phase.name}
                  </p>
                </div>
              </div>
              <span className={`inline-block text-[10px] font-display font-semibold px-2 py-0.5 rounded-full border mb-3
                ${i % 2 === 0 ? "border-neon-green/20 text-neon-green/60" : "border-neon-purple/20 text-neon-purple/60"}`}>
                {phase.weeks}
              </span>
              <ul className="space-y-1.5">
                {phase.steps.map((s, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className={`shrink-0 text-[10px] mt-0.5 ${i % 2 === 0 ? "text-neon-green/60" : "text-neon-purple/60"}`}>→</span>
                    <span className="font-body text-cream/60 text-xs leading-snug">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 7. QUÉ NO INCLUYE + POLÍTICA + CONDICIONES ── */}
      <div className="py-14 px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* No incluye */}
          <div>
            <SectionLabel text="Qué no incluye" />
            <ul className="space-y-2">
              {(core.notIncluded as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-muted/30 text-xs mt-0.5 shrink-0">✕</span>
                  <span className="font-body text-muted/55 text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Política de ajustes */}
          <div>
            <SectionLabel text="Política de ajustes" />
            <div className="space-y-3">
              <div className="rounded-lg border border-white/7 bg-white/[0.02] p-3">
                <p className="font-display font-semibold text-xs text-neon-green/70 mb-1">Estrategia</p>
                <p className="font-body text-muted/60 text-xs leading-relaxed">{core.revisionPolicy.strategy}</p>
              </div>
              <div className="rounded-lg border border-white/7 bg-white/[0.02] p-3">
                <p className="font-display font-semibold text-xs text-neon-green/70 mb-1">Videos</p>
                <p className="font-body text-muted/60 text-xs leading-relaxed">{core.revisionPolicy.videos}</p>
              </div>
            </div>
          </div>
          {/* Condiciones operativas */}
          <div>
            <SectionLabel text="Condiciones operativas" />
            <ul className="space-y-2">
              {(core.conditions as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neon-green/40 text-xs mt-0.5 shrink-0">·</span>
                  <span className="font-body text-muted/55 text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 8. GARANTÍA ── */}
      <div className="py-10 px-6 lg:px-10">
        <div className="flex items-start gap-4 rounded-xl border border-neon-green/15 bg-neon-green/[0.03] p-5">
          <span className="text-2xl shrink-0">🛡️</span>
          <div>
            <p className="font-display font-bold text-sm text-neon-green mb-2">Garantía de la implementación</p>
            <p className="font-body text-muted/70 text-sm leading-relaxed">{core.guarantee}</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 9. DISPONIBILIDAD ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Disponibilidad actual" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          {/* Slot visualizer */}
          <div className="flex items-center gap-3">
            {[...Array(TOTAL)].map((_, i) => (
              <div key={i} className={`relative w-14 h-20 rounded-xl flex flex-col items-center justify-center gap-1.5 border
                ${i < TAKEN
                  ? "bg-white/[0.03] border-white/8"
                  : "bg-neon-green/10 border-neon-green/40 slot-available"}`}>
                {i >= TAKEN && (
                  <>
                    <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-neon-green/60 rounded-tl" />
                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-neon-green/60 rounded-tr" />
                    <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-neon-green/60 rounded-bl" />
                    <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-neon-green/60 rounded-br" />
                  </>
                )}
                <div className={`w-2.5 h-2.5 rounded-full ${i < TAKEN ? "bg-white/15" : "bg-neon-green shadow-[0_0_8px_rgba(0,255,135,0.7)]"}`} />
                <span className={`text-[9px] font-display tracking-widest uppercase ${i < TAKEN ? "text-muted/40" : "text-neon-green font-bold"}`}>
                  {i < TAKEN ? "Tomado" : "Libre"}
                </span>
              </div>
            ))}
          </div>
          <div>
            <p className="font-display font-bold text-xl text-cream mb-1">
              Solo <span className="text-neon-green">{AVAILABLE} cupo disponible</span> este mes.
            </p>
            <p className="font-body text-muted text-sm leading-relaxed max-w-md">
              Para mantener el criterio y la calidad en cada proyecto, limito mi carga mensual. Si estás listo, tiene sentido moverse ahora.
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 10. FAQ ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Preguntas frecuentes" />
        <FAQSection />
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── 11. PLANES Y PRECIOS ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Planes y precios" />
        <h3 className="font-display font-bold text-2xl lg:text-3xl text-cream mb-2 leading-tight">
          Tres formas de entrar.<br />
          <span className="text-neon-green">Un solo sistema.</span>
        </h3>
        <p className="font-body text-muted/50 text-xs mb-10 tracking-wide">
          Todos los precios en USD +IGV · Cobertura Lima Metropolitana
        </p>

        {/* ── Plan cards ── */}
        <div className="grid lg:grid-cols-3 gap-4 mb-14 items-start">

          {/* Plan Señal */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-5">
            <div>
              <p className="text-[10px] font-display font-bold tracking-[0.25em] uppercase text-muted/50 mb-1">Punto de entrada</p>
              <p className="font-display font-extrabold text-2xl text-cream">Plan Señal</p>
              <p className="font-body text-muted/60 text-xs mt-1 leading-snug">Elige uno de los 5 servicios. Cada uno es una pieza de alto valor independiente.</p>
            </div>
            <div>
              <span className="font-display font-extrabold text-4xl text-cream">$500</span>
              <span className="font-body text-muted/50 text-xs ml-2">+IGV · por servicio · pago único</span>
            </div>
            <div className="rounded-lg bg-white/[0.03] border border-white/7 px-3 py-2">
              <p className="text-[10px] font-display font-bold tracking-widest uppercase text-muted/40 mb-2">Elige el que necesitas</p>
              <ul className="space-y-1.5">
                {[
                  { k: "A", v: "Video caso de éxito" },
                  { k: "B", v: "Cobertura express de evento" },
                  { k: "C", v: "Jornada de grabación" },
                  { k: "D", v: "Cerebro IA personalizado" },
                  { k: "E", v: "Piezas de contenido IA" },
                ].map(({ k, v }) => (
                  <li key={k} className="flex items-center gap-2">
                    <span className="shrink-0 w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-display font-bold text-muted/50">{k}</span>
                    <span className="font-body text-cream/60 text-xs">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-body text-muted/40 text-[11px]">1–5 piezas · sin permanencia</p>
          </div>

          {/* Plan Presencia */}
          <div className="rounded-2xl border border-neon-green/25 bg-neon-green/[0.03] p-6 flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-neon-green/80 via-neon-green/40 to-transparent" />
            <div>
              <p className="text-[10px] font-display font-bold tracking-[0.25em] uppercase text-neon-green/60 mb-1">Presencia continua</p>
              <p className="font-display font-extrabold text-2xl text-cream">Plan Presencia</p>
              <p className="font-body text-muted/60 text-xs mt-1 leading-snug">Para mantener presencia activa y sostenida todo el año.</p>
            </div>
            <div>
              <span className="font-display font-extrabold text-4xl text-neon-green">$1,000</span>
              <span className="font-body text-muted/50 text-xs ml-2">/mes +IGV · mín. 3 meses</span>
            </div>
            <ul className="space-y-2">
              {[
                "Dirección estratégica mensual",
                "1 jornada de grabación",
                "5 videos híbridos (grab.+IA)",
                "4 videos loc off + IA",
                "1 cobertura de evento/feria",
                "Coordinación done-for-you",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="shrink-0 w-4 h-4 rounded-full bg-neon-green/15 border border-neon-green/30 flex items-center justify-center text-[8px] font-bold text-neon-green mt-0.5">✓</span>
                  <span className="font-body text-cream/70 text-xs leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-neon-green/60 text-[11px] font-semibold">~10 piezas por mes</p>
          </div>

          {/* Plan Autoridad */}
          <div className="rounded-2xl border border-neon-purple/30 bg-[rgba(16,10,20,0.85)] p-6 flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-neon-purple/80 via-neon-purple/40 to-transparent" />
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 rounded-full bg-neon-purple/15 border border-neon-purple/30 text-[9px] font-display font-bold tracking-widest uppercase text-neon-purple/80">Insignia</span>
            </div>
            <div>
              <p className="text-[10px] font-display font-bold tracking-[0.25em] uppercase text-neon-purple/60 mb-1">Plan insignia</p>
              <p className="font-display font-extrabold text-2xl text-cream">Plan Autoridad</p>
              <p className="font-body text-muted/60 text-xs mt-1 leading-snug">El sistema completo de autoridad y adquisición.</p>
            </div>
            <div>
              <span className="font-display font-extrabold text-4xl text-neon-purple">$3,000</span>
              <span className="font-body text-muted/50 text-xs ml-2">+IGV · pago único · 2 meses</span>
            </div>
            <ul className="space-y-2">
              {[
                "Dirección estratégica integral",
                "Cerebro IA completo del negocio",
                "Hasta 3 jornadas de grabación",
                "10 videos híbridos + 10 loc off",
                "1 VSL + 2 coberturas de evento",
                "Supervisión y coordinación total",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="shrink-0 w-4 h-4 rounded-full bg-neon-purple/15 border border-neon-purple/30 flex items-center justify-center text-[8px] font-bold text-neon-purple mt-0.5">✓</span>
                  <span className="font-body text-cream/70 text-xs leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-neon-purple/60 text-[11px] font-semibold">~23 piezas entregadas</p>
          </div>
        </div>

        {/* ── Tabla comparativa ── */}
        <div className="mb-10">
          <p className="text-[10px] font-display font-bold tracking-[0.25em] uppercase text-muted/40 mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-muted/30" />Comparativa de planes
          </p>
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-white/[0.03] border-b border-white/8">
              <div className="px-4 py-3" />
              {["SEÑAL · $500", "PRESENCIA · $1k/mes", "AUTORIDAD · $3k"].map((h, i) => (
                <div key={i} className={`px-3 py-3 text-center border-l border-white/8 ${i === 2 ? "bg-neon-purple/[0.06]" : i === 1 ? "bg-neon-green/[0.04]" : ""}`}>
                  <p className={`font-display font-bold text-[10px] tracking-widest uppercase ${i === 2 ? "text-neon-purple" : i === 1 ? "text-neon-green" : "text-muted/50"}`}>{h}</p>
                </div>
              ))}
            </div>

            {[
              { group: "ESTRATEGIA Y DIRECCIÓN", rows: [
                { label: "Dirección estratégica", vals: ["—", "✓", "✓"] },
                { label: "Cerebro IA del negocio", vals: ["Op. D", "✓", "Completo"] },
                { label: "Preproducción y guiones", vals: ["—", "✓", "✓"] },
              ]},
              { group: "PRODUCCIÓN Y GRABACIÓN", rows: [
                { label: "Jornadas de grabación", vals: ["Op. C", "1 / mes", "Hasta 3"] },
                { label: "Videos híbridos (grab.+IA)", vals: ["Op. C", "5 / mes", "10"] },
                { label: "Videos loc off + IA", vals: ["—", "4 / mes", "10"] },
                { label: "Video VSL horizontal 2 min", vals: ["—", "—", "✓"] },
                { label: "Cobertura evento / feria", vals: ["Op. B", "1 / mes", "2"] },
              ]},
              { group: "IA + EDICIÓN + COORDINACIÓN", rows: [
                { label: "Piezas 100% IA generativa", vals: ["Op. E", "—", "—"] },
                { label: "Edición integral profesional", vals: ["Básica", "✓", "✓"] },
                { label: "Coordinación done-for-you", vals: ["—", "✓", "✓"] },
              ]},
            ].map(({ group, rows }) => (
              <div key={group}>
                <div className="grid grid-cols-4 bg-neon-green/[0.02] border-b border-white/5">
                  <div className="col-span-4 px-4 py-2">
                    <p className="text-[9px] font-display font-bold tracking-[0.2em] uppercase text-neon-green/50">{group}</p>
                  </div>
                </div>
                {rows.map(({ label, vals }, ri) => (
                  <div key={ri} className={`grid grid-cols-4 border-b border-white/5 ${ri % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                    <div className="px-4 py-3">
                      <p className="font-body text-muted/60 text-xs leading-snug">{label}</p>
                    </div>
                    {vals.map((v, vi) => (
                      <div key={vi} className={`px-3 py-3 border-l border-white/5 flex items-center justify-center ${vi === 2 ? "bg-neon-purple/[0.03]" : vi === 1 ? "bg-neon-green/[0.02]" : ""}`}>
                        <span className={`font-display font-semibold text-xs text-center
                          ${v === "✓" ? vi === 2 ? "text-neon-purple text-base" : "text-neon-green text-base" : v === "—" ? "text-muted/25" : vi === 2 ? "text-neon-purple/80" : vi === 1 ? "text-neon-green/80" : "text-muted/40"}`}>
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* Footer row */}
            <div className="grid grid-cols-4 bg-white/[0.03] border-t border-white/10">
              <div className="px-4 py-4">
                <p className="font-display font-bold text-xs text-cream/70">Piezas totales aprox.</p>
              </div>
              {[["1–5", "text-muted/60"], ["~10/mes", "text-neon-green"], ["~23", "text-neon-purple"]].map(([v, cls], i) => (
                <div key={i} className={`px-3 py-4 border-l border-white/8 flex items-center justify-center ${i === 2 ? "bg-neon-purple/[0.06]" : i === 1 ? "bg-neon-green/[0.04]" : ""}`}>
                  <span className={`font-display font-bold text-sm ${cls}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="font-body text-muted/40 text-[11px] mt-3 leading-relaxed">
            Clientes del Plan Autoridad tienen acceso prioritario y precio preferencial al Plan Presencia.
          </p>
        </div>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={SITE.links.calendly.startsWith("[") ? "/contacto" : SITE.links.calendly}
            className="btn-glow text-sm py-3.5 px-8"
          >
            {core.cta} →
          </a>
          <a
            href={SITE.links.whatsapp.startsWith("[") ? "/contacto" : SITE.links.whatsapp}
            className="btn-outline text-sm py-3.5 px-8"
          >
            WhatsApp →
          </a>
        </div>
      </div>

    </div>
  );
}
