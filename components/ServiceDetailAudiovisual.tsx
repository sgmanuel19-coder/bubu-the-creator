"use client";

import { useState } from "react";
import { SITE } from "@/lib/constants";

// ── Contenido IA tab ─────────────────────────────────────────
function ContenidoIATab() {
  return (
    <div>

      {/* ── HERO ── */}
      <div className="px-6 lg:px-10 pt-12 pb-10">
        <p className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-neon-green/60 mb-4">
          Sistema Contenido con IA
        </p>
        <h3 className="font-display font-extrabold text-2xl lg:text-4xl text-cream leading-[1.1] tracking-tight mb-4">
          Tu empresa se ve como<br />
          <span className="text-neon-green">la referente de su industria.</span>
        </h3>
        <p className="font-body text-muted text-sm lg:text-base leading-relaxed max-w-xl">
          Para marcas técnicas, industriales y de productos premium. Creamos lo que la cámara no puede capturar — y lo que todavía no existe.
        </p>
      </div>

      {/* ── LO QUE RECIBES — visual destacado ── */}
      <div className="px-6 lg:px-10 pb-10">
        <div className="grid sm:grid-cols-2 gap-3">
          {([
            {
              icon: "🧠",
              title: "Cerebro Creativo IA",
              desc: "1,200 páginas de estrategia de marca. La IA aprende tu empresa desde adentro.",
              tag: "Mes 1 · base de todo",
              color: "green",
            },
            {
              icon: "🎬",
              title: "10 videos / mes",
              desc: "Tomas que ninguna cámara logra. Productos que no existen. Conceptos invisibles, visibles.",
              tag: "Mensual",
              color: "purple",
            },
            {
              icon: "📐",
              title: "3 posts + 3 carruseles",
              desc: "Piezas de autoridad diseñadas para posicionarte por encima de tu competencia.",
              tag: "Incluido",
              color: "green",
            },
            {
              icon: "✍️",
              title: "Guiones + captions",
              desc: "Todo redactado con tu voz. Nada genérico. Nada que parezca IA.",
              tag: "Incluido",
              color: "green",
            },
          ] as const).map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-5 flex flex-col gap-3 ${
                item.color === "purple"
                  ? "border-neon-purple/20 bg-neon-purple/[0.03]"
                  : "border-neon-green/20 bg-neon-green/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.icon}</span>
                <span className={`text-[9px] font-display font-bold tracking-widest uppercase px-2 py-1 rounded-full border ${
                  item.color === "purple"
                    ? "text-neon-purple/70 border-neon-purple/20"
                    : "text-neon-green/70 border-neon-green/20"
                }`}>{item.tag}</span>
              </div>
              <div>
                <p className="font-display font-bold text-base text-cream mb-1">{item.title}</p>
                <p className="font-body text-cream/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Motores */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["Kling 3.0", "Seedance", "Veo 3", "Banana Pro", "GPT Image"].map((e) => (
            <span key={e} className="text-[10px] font-display font-semibold px-2.5 py-1 rounded-full border border-white/10 text-muted/50">
              {e}
            </span>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── CASOS REALES — con números grandes ── */}
      <div className="px-6 lg:px-10 py-10">
        <p className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-muted/40 mb-6">
          Casos reales
        </p>
        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-2xl border border-neon-green/20 bg-neon-green/[0.02] p-6 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-neon-green/15 border border-neon-green/30 flex items-center justify-center text-xs font-display font-bold text-neon-green">
                  W
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-cream">WIN Internet</p>
                  <p className="text-[10px] text-muted/40 font-display tracking-widest uppercase">Telecomunicaciones</p>
                </div>
              </div>
              <p className="font-body text-cream/60 text-xs leading-relaxed">
                Creamos a Fibrin — personaje 3D con IA para explicar conceptos técnicos que ninguna cámara podría capturar. Contenido que su equipo jamás hubiera producido de forma tradicional.
              </p>
            </div>
            <div className="pt-4 border-t border-neon-green/10 flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-neon-green">M+</span>
              <span className="font-body text-neon-green/70 text-xs">vistas · ROI sostenido</span>
            </div>
          </div>

          <div className="rounded-2xl border border-neon-purple/20 bg-neon-purple/[0.02] p-6 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-neon-purple/15 border border-neon-purple/30 flex items-center justify-center text-xs font-display font-bold text-neon-purple">
                  L
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-cream">Livoltek</p>
                  <p className="text-[10px] text-muted/40 font-display tracking-widest uppercase">Energía Solar · B2B</p>
                </div>
              </div>
              <p className="font-body text-cream/60 text-xs leading-relaxed">
                Videos de productos que físicamente no existían todavía. Conceptos técnicos visibles, percepción de marca al nivel de marcas internacionales.
              </p>
            </div>
            <div className="pt-4 border-t border-neon-purple/10 flex items-baseline gap-2">
              <span className="font-display font-extrabold text-xl text-neon-purple">Nivel internacional</span>
              <span className="font-body text-neon-purple/60 text-xs">en feria B2B</span>
            </div>
          </div>

        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* ── PRECIO — limpio y grande ── */}
      <div className="px-6 lg:px-10 py-10">

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* Mes 1 */}
          <div className="rounded-2xl border border-neon-green/30 bg-neon-green/[0.04] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-green via-neon-green/60 to-transparent" />
            <p className="text-[9px] font-display font-bold tracking-[0.25em] uppercase text-neon-green/60 mb-3">Mes 1 · Arranque</p>
            <p className="font-display font-extrabold text-5xl text-neon-green leading-none mb-2">S/ 4,200</p>
            <p className="font-body text-muted/50 text-xs mb-4">+IGV · incluye Cerebro Creativo IA</p>
            <p className="font-body text-neon-green/60 text-xs">✓ Primera entrega incluida</p>
          </div>
          {/* Mes 2+ */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
            <p className="text-[9px] font-display font-bold tracking-[0.25em] uppercase text-muted/40 mb-3">Mes 2+ · Retainer</p>
            <p className="font-display font-extrabold text-5xl text-cream leading-none mb-2">S/ 3,600</p>
            <p className="font-body text-muted/50 text-xs mb-4">/mes +IGV</p>
            <p className="font-body text-muted/40 text-xs">Sin permanencia mínima forzada</p>
          </div>
        </div>

        {/* Garantía */}
        <div className="rounded-xl border border-neon-green/15 bg-neon-green/[0.02] px-5 py-4 mb-7 flex gap-3">
          <span className="text-xl shrink-0">🛡️</span>
          <div>
            <p className="font-display font-bold text-sm text-cream mb-1">Garantía de Cerebro Perfecto</p>
            <p className="font-body text-cream/50 text-xs leading-relaxed">
              Si el Cerebro IA no refleja tu marca exactamente, lo refinamos — ronda tras ronda, sin costo — hasta que sí lo haga.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href={SITE.links.calendly} className="btn-glow text-sm py-3.5 px-8">
            Agendar llamada →
          </a>
          <a href={SITE.links.whatsapp} className="btn-outline text-sm py-3.5 px-8">
            WhatsApp →
          </a>
        </div>
      </div>

    </div>
  );
}

// ── Audiovisual tab ──────────────────────────────────────────
function AudiovisualTab() {
  return (
    <div>

      {/* HERO */}
      <div className="px-6 lg:px-10 pt-12 pb-10">
        <p className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-neon-green/60 mb-4">
          Sistema Audiovisual con IA
        </p>
        <h3 className="font-display font-extrabold text-2xl lg:text-4xl text-cream leading-[1.1] tracking-tight mb-4">
          Una pieza de autoridad.<br />
          <span className="text-neon-green">Sin contratar productora.</span>
        </h3>
        <p className="font-body text-muted text-sm lg:text-base leading-relaxed max-w-xl">
          Para empresas que necesitan una pieza específica de alto valor — video caso, evento, conceptos técnicos con IA. Sin permanencia. Entra por donde necesitas.
        </p>
      </div>

      {/* ENTREGABLES */}
      <div className="px-6 lg:px-10 pb-10">
        <div className="grid sm:grid-cols-2 gap-3">
          {([
            { icon: "🎬", title: "Video caso o pieza principal", desc: "La pieza central de autoridad de tu empresa — dirigida y editada." },
            { icon: "🤖", title: "Recursos visuales con IA", desc: "Tomas y conceptos que ninguna cámara podría capturar." },
            { icon: "✂️", title: "Edición profesional", desc: "Criterio humano sobre producción IA. Resultado de nivel corporativo." },
            { icon: "🧠", title: "Estrategia incluida", desc: "Guión y comunicación definidos antes de producir una sola toma." },
          ] as const).map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-neon-green/15 bg-neon-green/[0.02] p-5">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <p className="font-display font-bold text-sm text-cream mb-1">{item.title}</p>
                <p className="font-body text-cream/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/5 mx-6 lg:mx-10" />

      {/* PRECIO */}
      <div className="px-6 lg:px-10 py-10">
        <p className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-muted/40 mb-4">Inversión · Plan Señal</p>

        <div className="max-w-sm mb-7">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="font-display font-extrabold text-5xl text-cream leading-none mb-2">$500</p>
            <p className="font-body text-muted/50 text-xs mb-5">USD +IGV · pago único · sin permanencia</p>
            <div className="space-y-2">
              {[
                { k: "A", v: "Video caso de éxito" },
                { k: "B", v: "Cobertura express de evento" },
                { k: "C", v: "Jornada de grabación" },
                { k: "D", v: "Cerebro IA personalizado" },
                { k: "E", v: "Piezas de contenido IA" },
              ].map(({ k, v }) => (
                <div key={k} className="flex items-center gap-3">
                  <span className="shrink-0 w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-display font-bold text-muted/50">{k}</span>
                  <span className="font-body text-cream/60 text-sm">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href={SITE.links.calendly} className="btn-glow text-sm py-3.5 px-8">
            Agendar llamada →
          </a>
          <a href={SITE.links.whatsapp} className="btn-outline text-sm py-3.5 px-8">
            WhatsApp →
          </a>
        </div>
      </div>

    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function ServiceDetailAudiovisual() {
  const [activeTab, setActiveTab] = useState<"audiovisual" | "contenido">("contenido");

  return (
    <div>
      <div className="h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent" />

      {/* TABS */}
      <div className="flex border-b border-white/8">
        {(["contenido", "audiovisual"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 lg:px-10 py-4 font-display font-semibold text-sm border-b-2 -mb-px transition-all duration-200 ${
              activeTab === tab
                ? "border-neon-green text-neon-green"
                : "border-transparent text-muted/40 hover:text-cream/60"
            }`}
          >
            {tab === "contenido" ? "🤖 Contenido con IA" : "📹 Audiovisual Corporativo"}
          </button>
        ))}
      </div>

      {activeTab === "contenido" && <ContenidoIATab />}
      {activeTab === "audiovisual" && <AudiovisualTab />}
    </div>
  );
}
