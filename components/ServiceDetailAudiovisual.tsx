"use client";

import { useState } from "react";
import { SITE } from "@/lib/constants";

// ── Sub-components ───────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[10px] font-display font-bold tracking-[0.25em] uppercase text-neon-green mb-6">
      <span className="w-5 h-px bg-neon-green/50" />
      {text}
    </div>
  );
}

// ── Contenido IA tab ─────────────────────────────────────────
function ContenidoIATab() {
  return (
    <div className="space-y-0">

      {/* ── HEADER ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Sistema Contenido con IA" />
        <h3 className="font-display font-bold text-xl lg:text-2xl text-cream leading-tight mb-3">
          Cerebro Creativo Estratégico con IA
        </h3>
        <p className="font-body text-muted text-sm lg:text-base leading-relaxed max-w-2xl">
          Para marcas de productos complejos, técnicos y premium que merecen verse como lo que son. Creamos lo que la cámara no puede capturar — y lo que todavía no existe.
        </p>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── FASES ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Cómo funciona — 3 fases" />
        <div className="grid sm:grid-cols-3 gap-4">
          {([
            {
              label: "Fase 01 · Mes 1", icon: "🧠", name: "Cerebro IA", tag: "Solo en mes 1", color: "green",
              desc: "1,200 páginas de documentación estratégica: briefing, buyer persona, arquitectura de comunicación, benchmark. Prompts maestros entrenados con la voz y lógica de tu marca.",
            },
            {
              label: "Fase 02 · Mensual", icon: "🎬", name: "Producción", tag: "Cada mes", color: "purple",
              desc: "Guiones con el Cerebro IA → prompts semióticos → prompts cinematográficos → generación de imagen y video con motores IA → ensamblaje y edición profesional manual.",
            },
            {
              label: "Fase 03 · Mensual", icon: "✨", name: "Entrega", tag: "Cada mes", color: "green",
              desc: "10 videos listos para redes sociales + 3 posts estratégicos + 3 carruseles de autoridad. Captions y guía de publicación incluidos.",
            },
          ] as const).map((fase, i) => (
            <div key={i} className={`rounded-xl border p-5 ${
              fase.color === "green"
                ? "border-neon-green/20 bg-neon-green/[0.02]"
                : "border-neon-purple/20 bg-neon-purple/[0.02]"
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{fase.icon}</span>
                <div>
                  <p className={`text-[9px] font-display font-bold tracking-widest uppercase ${
                    fase.color === "green" ? "text-neon-green/60" : "text-neon-purple/60"
                  }`}>{fase.label}</p>
                  <p className={`font-display font-bold text-sm ${
                    fase.color === "green" ? "text-neon-green" : "text-neon-purple"
                  }`}>{fase.name}</p>
                </div>
              </div>
              <span className={`inline-block text-[10px] font-display font-semibold px-2 py-0.5 rounded-full border mb-3 ${
                fase.color === "green" ? "border-neon-green/20 text-neon-green/60" : "border-neon-purple/20 text-neon-purple/60"
              }`}>{fase.tag}</span>
              <p className="font-body text-cream/60 text-xs leading-relaxed">{fase.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── ENTREGABLES ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Qué recibes cada mes" />
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {([
            { icon: "🧠", title: "Cerebro IA del negocio", sub: "Docs estratégicos + prompts maestros personalizados (incluido en mes 1)" },
            { icon: "🎬", title: "10 videos para redes", sub: "Generados con Kling 3.0 · Seedance · Veo 3 + edición profesional manual" },
            { icon: "🎁", title: "Bono: 3 posts + 3 carruseles", sub: "Posts estáticos y carruseles de autoridad diseñados con Banana Pro · GPT Image" },
            { icon: "📋", title: "Guiones + captions", sub: "Redactados con el Cerebro IA, alineados a la voz y tono de tu marca" },
          ] as const).map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-neon-green/12 bg-neon-green/[0.02] px-4 py-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-lg">
                {item.icon}
              </div>
              <div>
                <p className="font-display font-bold text-sm text-cream mb-1">{item.title}</p>
                <p className="font-body text-muted/60 text-xs leading-relaxed">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[9px] font-display font-bold tracking-[0.2em] uppercase text-muted/40 mb-3">
            Motores de IA utilizados
          </p>
          <div className="flex flex-wrap gap-2">
            {["Kling 3.0", "Seedance", "Veo 3", "Banana Pro", "GPT Image"].map((engine) => (
              <span key={engine} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neon-green/20 bg-neon-green/[0.04] text-[10px] font-display font-semibold text-neon-green/80">
                <span className="w-1 h-1 rounded-full bg-neon-green/60" />
                {engine}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── CASOS ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Casos reales" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-neon-green/15 bg-neon-green/[0.02] p-5">
            <p className="font-display font-bold text-sm text-neon-green mb-1">WIN Internet</p>
            <p className="text-[10px] font-display tracking-widest uppercase text-muted/40 mb-3">Telecomunicaciones</p>
            <p className="font-body text-cream/70 text-xs leading-relaxed mb-3">
              Creamos a Fibrin, un personaje 3D con IA para narrar conceptos técnicos complejos que ninguna cámara podría capturar. Contenido educativo y de autoridad que el equipo no podía producir de forma tradicional.
            </p>
            <div className="flex items-center gap-2 pt-3 border-t border-white/5">
              <span className="text-neon-green text-xs">→</span>
              <p className="font-body text-neon-green/80 text-xs font-semibold">Millones de vistas · ROI amplio sostenido</p>
            </div>
          </div>
          <div className="rounded-xl border border-neon-purple/15 bg-neon-purple/[0.02] p-5">
            <p className="font-display font-bold text-sm text-neon-purple mb-1">Livoltek</p>
            <p className="text-[10px] font-display tracking-widest uppercase text-muted/40 mb-3">Energía Solar · B2B</p>
            <p className="font-body text-cream/70 text-xs leading-relaxed mb-3">
              Videos de productos que físicamente no existían todavía. Conceptos técnicos complejos visualizados con IA — personalizados por marca. La empresa pasó a verse al nivel de marcas internacionales.
            </p>
            <div className="flex items-center gap-2 pt-3 border-t border-white/5">
              <span className="text-neon-purple text-xs">→</span>
              <p className="font-body text-neon-purple/80 text-xs font-semibold">Percepción de marca elevada · Material para ferias y ventas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── PRECIOS ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Inversión" />
        <h3 className="font-display font-bold text-2xl lg:text-3xl text-cream mb-2 leading-tight">
          Dos momentos.<br />
          <span className="text-neon-green">Un solo sistema en marcha.</span>
        </h3>
        <p className="font-body text-muted/50 text-xs mb-8 tracking-wide">
          Todos los precios en Soles +IGV
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mb-10">
          <div className="rounded-2xl border border-neon-green/30 bg-neon-green/[0.03] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-neon-green/80 via-neon-green/40 to-transparent" />
            <p className="text-[10px] font-display font-bold tracking-[0.25em] uppercase text-neon-green/60 mb-1">Mes 1 · Arranque</p>
            <p className="font-display font-extrabold text-4xl text-neon-green mb-1">S/ 4,200</p>
            <p className="font-body text-muted/50 text-xs mb-4">+IGV · Cerebro IA + primera entrega</p>
            <p className="font-body text-neon-green/70 text-xs italic">✓ Incluye construcción del Cerebro IA</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[10px] font-display font-bold tracking-[0.25em] uppercase text-muted/50 mb-1">Mes 2+ · Retainer</p>
            <p className="font-display font-extrabold text-4xl text-cream mb-1">S/ 3,600</p>
            <p className="font-body text-muted/50 text-xs mb-4">/mes +IGV · 10 videos + 6 piezas</p>
            <p className="font-body text-muted/40 text-xs italic">Sin permanencia mínima forzada</p>
          </div>
        </div>
        <div className="rounded-xl border border-neon-green/15 bg-neon-green/[0.02] p-5 mb-6">
          <p className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-neon-green/60 mb-2">Garantía de Cerebro Perfecto</p>
          <p className="font-body text-cream/80 text-sm leading-relaxed">
            Si al entregar el Cerebro IA no refleja tu marca exactamente, lo refinamos — ronda tras ronda, sin costo adicional — hasta que sí.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={SITE.links.calendly.startsWith("[") ? "/contacto" : SITE.links.calendly} className="btn-glow text-sm py-3.5 px-8">
            Agendar llamada →
          </a>
          <a href={SITE.links.whatsapp.startsWith("[") ? "/contacto" : SITE.links.whatsapp} className="btn-outline text-sm py-3.5 px-8">
            WhatsApp →
          </a>
        </div>
      </div>

    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function ServiceDetailAudiovisual() {
  const [activeTab, setActiveTab] = useState<"audiovisual" | "contenido">("audiovisual");

  return (
    <div className="space-y-0">

      {/* ── DIVIDER ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent" />

      {/* ── TABS ── */}
      <div className="flex border-b border-white/8">
        {(["audiovisual", "contenido"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 lg:px-10 py-4 font-display font-semibold text-sm border-b-2 -mb-px transition-all duration-200 ${
              activeTab === tab
                ? "border-neon-green text-neon-green"
                : "border-transparent text-muted/50 hover:text-cream/70"
            }`}
          >
            {tab === "audiovisual" ? "📹 Audiovisual Corporativo" : "🤖 Contenido con IA"}
          </button>
        ))}
      </div>

      {activeTab === "contenido" && <ContenidoIATab />}

      {activeTab === "audiovisual" && (
      <div>

      {/* ── HEADER ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Sistema Audiovisual con IA" />
        <h3 className="font-display font-bold text-xl lg:text-2xl text-cream leading-tight mb-3">
          Una pieza de autoridad para tu empresa.<br />
          <span className="text-neon-green">Producida con IA. Con criterio humano.</span>
        </h3>
        <p className="font-body text-muted text-sm lg:text-base leading-relaxed max-w-2xl">
          Para empresas que necesitan una pieza específica de alto valor — sin contratar una productora completa. Video caso, cobertura de evento, conceptos técnicos visualizados con IA o tu Cerebro Creativo instalado.
        </p>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── QUÉ INCLUYE ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Qué recibes" />
        <div className="grid sm:grid-cols-2 gap-3">
          {([
            { icon: "🎬", title: "Video caso o pieza principal", sub: "La pieza central de autoridad de tu empresa — real, dirigida y editada" },
            { icon: "🤖", title: "Recursos visuales con IA", sub: "Tomas y conceptos técnicos que ninguna cámara podría capturar" },
            { icon: "✂️", title: "Edición profesional", sub: "Criterio humano sobre producción IA para un resultado de nivel corporativo" },
            { icon: "🧠", title: "Cerebro IA aplicado", sub: "Guiones y estrategia de comunicación incluidos en cada entrega" },
          ] as const).map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-neon-green/12 bg-neon-green/[0.02] px-4 py-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-lg">
                {item.icon}
              </div>
              <div>
                <p className="font-display font-bold text-sm text-cream mb-1">{item.title}</p>
                <p className="font-body text-muted/60 text-xs leading-relaxed">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── PLAN SEÑAL ── */}
      <div className="py-14 px-6 lg:px-10">
        <SectionLabel text="Inversión" />
        <div className="max-w-md mb-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-5">
            <div>
              <p className="text-[10px] font-display font-bold tracking-[0.25em] uppercase text-muted/50 mb-1">Punto de entrada</p>
              <p className="font-display font-extrabold text-2xl text-cream">Plan Señal</p>
              <p className="font-body text-muted/60 text-xs mt-1 leading-snug">Elige el servicio que tu empresa necesita ahora.</p>
            </div>
            <div>
              <span className="font-display font-extrabold text-4xl text-cream">$500 USD</span>
              <span className="font-body text-muted/50 text-xs ml-2">+IGV · pago único · sin permanencia</span>
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
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={SITE.links.calendly.startsWith("[") ? "/contacto" : SITE.links.calendly} className="btn-glow text-sm py-3.5 px-8">
            Agendar llamada →
          </a>
          <a href={SITE.links.whatsapp.startsWith("[") ? "/contacto" : SITE.links.whatsapp} className="btn-outline text-sm py-3.5 px-8">
            WhatsApp →
          </a>
        </div>
      </div>

      </div>
      )}

    </div>
  );
}
