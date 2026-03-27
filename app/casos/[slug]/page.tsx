import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return SITE.proof.cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const caso = SITE.proof.cases.find((c) => c.slug === params.slug);
  if (!caso) return { title: "Caso no encontrado" };
  return {
    title: `${caso.client} — Caso de Éxito · ${SITE.brandName}`,
    description: caso.problem,
  };
}

const sectorColors: Record<string, "green" | "purple"> = {
  "win-internet": "green",
  "wong-cencosud": "purple",
  "redondos": "green",
  "livoltek": "purple",
  "manana-me-caso": "green",
};

export default function CasoDetailPage({ params }: Props) {
  const cases = SITE.proof.cases;
  const idx = cases.findIndex((c) => c.slug === params.slug);
  if (idx === -1) notFound();

  const caso = cases[idx];
  const prevCaso = cases[idx - 1] ?? null;
  const nextCaso = cases[idx + 1] ?? null;
  const color = sectorColors[params.slug] ?? "green";
  const isGreen = color === "green";

  const accentColor = isGreen ? "#00ff87" : "#cc44ff";
  const accentClass = isGreen ? "text-neon-green" : "text-neon-purple";
  const borderClass = isGreen ? "border-neon-green/25" : "border-neon-purple/25";
  const bgClass = isGreen ? "bg-neon-green/5" : "bg-neon-purple/5";
  const glowClass = isGreen ? "bg-neon-green/8" : "bg-neon-purple/8";

  // Split result into bullet points
  const resultPoints = caso.result.split("·").map((s) => s.trim()).filter(Boolean);

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* ── Hero section ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: isGreen ? "rgba(0,255,135,0.07)" : "rgba(204,68,255,0.07)" }} />

        <div className="container-base relative z-10 max-w-5xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-body text-muted/60 mb-8">
            <Link href="/" className="hover:text-muted transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/casos" className="hover:text-muted transition-colors">Casos</Link>
            <span>/</span>
            <span className={accentClass}>{caso.client}</span>
          </div>

          {/* Sector tag */}
          <span className={`inline-flex items-center text-[10px] font-display font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border mb-6 ${accentClass} ${borderClass} ${bgClass}`}>
            {caso.sector}
          </span>

          {/* Title */}
          <h1 className="font-display font-extrabold tracking-tighter leading-[1.02] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            {caso.client}
          </h1>

          {/* One-liner result */}
          <p className={`font-body text-lg lg:text-xl leading-relaxed max-w-2xl ${accentClass} font-medium`}>
            {resultPoints[0]}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}33, transparent)` }} />
      </section>

      {/* ── Case content ─────────────────────────────────────── */}
      <section className="relative section-padding overflow-hidden">
        <div className="container-base relative z-10 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">

            {/* Problem */}
            <div className="rounded-2xl border border-white/8 p-8 relative overflow-hidden"
              style={{ background: "rgba(8,10,13,0.97)" }}>
              <div className={`absolute top-0 left-0 w-full h-px ${isGreen ? "bg-neon-green/30" : "bg-neon-purple/30"}`} />
              <p className={`text-[10px] font-display font-bold tracking-[0.3em] uppercase mb-4 ${isGreen ? "text-neon-green/60" : "text-neon-purple/60"}`}>
                El problema
              </p>
              <p className="font-body text-cream/80 text-base leading-relaxed">
                {caso.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="rounded-2xl border border-white/8 p-8 relative overflow-hidden"
              style={{ background: "rgba(8,10,13,0.97)" }}>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-neon-green/30 to-neon-purple/30" />
              <p className="text-[10px] font-display font-bold tracking-[0.3em] uppercase mb-4 text-muted/60">
                La solución
              </p>
              <p className="font-body text-cream/80 text-base leading-relaxed">
                {caso.solution}
              </p>
            </div>
          </div>

          {/* Results — full width */}
          <div className="rounded-2xl border p-8 lg:p-12 relative overflow-hidden mb-16"
            style={{
              background: "rgba(8,10,13,0.98)",
              borderColor: isGreen ? "rgba(0,255,135,0.2)" : "rgba(204,68,255,0.2)",
            }}>
            <div className={`absolute inset-0 rounded-2xl pointer-events-none ${glowClass}`} />
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl pointer-events-none"
              style={{ borderColor: `${accentColor}60` }} />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 rounded-tr pointer-events-none"
              style={{ borderColor: `${accentColor}40` }} />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 rounded-bl pointer-events-none"
              style={{ borderColor: `${accentColor}40` }} />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 rounded-br pointer-events-none"
              style={{ borderColor: `${accentColor}60` }} />

            <p className={`relative z-10 text-[10px] font-display font-bold tracking-[0.3em] uppercase mb-8 ${accentClass}`}>
              Resultados obtenidos
            </p>

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resultPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-1 shrink-0 text-lg ${accentClass}`}>✦</span>
                  <p className="font-body text-cream/90 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Prev / Next navigation ───────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between border-t border-white/8 pt-10">
            {prevCaso ? (
              <Link href={`/casos/${prevCaso.slug}`}
                className="group flex items-center gap-3 text-left">
                <span className="text-xl text-muted/40 group-hover:text-muted transition-colors">←</span>
                <div>
                  <p className="text-[10px] font-display tracking-widest uppercase text-muted/50 mb-0.5">Caso anterior</p>
                  <p className="font-display font-semibold text-cream group-hover:text-neon-green transition-colors">
                    {prevCaso.client}
                  </p>
                </div>
              </Link>
            ) : <div />}

            <Link href="/casos"
              className="self-center text-xs font-display font-semibold tracking-[0.2em] uppercase text-muted/50 hover:text-cream transition-colors">
              Ver todos los casos
            </Link>

            {nextCaso ? (
              <Link href={`/casos/${nextCaso.slug}`}
                className="group flex items-center gap-3 text-right justify-end">
                <div>
                  <p className="text-[10px] font-display tracking-widest uppercase text-muted/50 mb-0.5">Caso siguiente</p>
                  <p className="font-display font-semibold text-cream group-hover:text-neon-purple transition-colors">
                    {nextCaso.client}
                  </p>
                </div>
                <span className="text-xl text-muted/40 group-hover:text-muted transition-colors">→</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
