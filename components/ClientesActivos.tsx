"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { type Caso } from "@/components/CaseCard";

// Short "qué IA hago" line per active client
const IA_LINE: Record<string, string> = {
  "wellmax": "Sistema IA completo — video producto, UGC, storytelling y estrategia",
  "win-internet": "Estrategia y Cerebro Creativo IA — planificación editorial mensual",
  "livoltek": "IA generativa B2B — visualización de conceptos técnicos",
  "resuelto-ia": "Automatización y contenido IA — flujos N8N + bot WhatsApp",
};

export default function ClientesActivos() {
  const clients = (SITE.proof.cases as unknown as Caso[]).filter((c) => c.era === "ia");

  return (
    <section id="clientes-activos" className="relative section-padding">
      <div className="container-base">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              <span className="font-display text-[11px] font-semibold tracking-[0.28em] uppercase text-neon-green">
                Clientes activos · IA
              </span>
            </div>
            <h2 className="font-display font-extrabold text-cream tracking-tight leading-[1.06]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
              Hoy trabajo con IA, de forma continua, con cuatro marcas.
            </h2>
          </div>
          <p className="font-body text-muted text-sm max-w-xs lg:text-right">
            No es un experimento. Es el sistema operando — en clientes reales y en mi propia marca.
          </p>
        </div>

        {/* 4 equal clients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(244,240,222,0.08)" }}>
          {clients.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-bg p-7 lg:p-8 flex flex-col min-h-[260px] transition-colors hover:bg-[rgba(26,128,255,0.03)]"
            >
              {/* top: status + sector */}
              <div className="flex items-center justify-between mb-8">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-display font-bold tracking-[0.2em] uppercase text-neon-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green" /> Activo
                </span>
                <span className="font-display text-[10px] font-semibold tracking-[0.18em] uppercase text-muted">
                  {c.sector}
                </span>
              </div>

              {/* name */}
              <h3 className="font-display font-extrabold text-cream text-2xl lg:text-[1.7rem] leading-tight tracking-tight mb-4">
                {c.client}
              </h3>

              {/* ia line */}
              <p className="font-body text-muted text-[13px] leading-relaxed flex-1">
                {IA_LINE[c.slug] ?? c.iaRole}
              </p>

              {/* link */}
              <Link href={`/casos/${c.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-display font-semibold text-[11px] tracking-[0.15em] uppercase text-cream/70 group-hover:text-cream transition-colors">
                Ver trabajo
                <span className="text-neon-green transition-transform group-hover:translate-x-1">→</span>
              </Link>

              {/* hover top accent */}
              <span className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                style={{ background: "linear-gradient(90deg, #1A80FF, transparent)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
