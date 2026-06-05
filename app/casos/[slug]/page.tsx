import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return SITE.proof.cases.map((c) => ({ slug: c.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caso = SITE.proof.cases.find((c) => c.slug === slug);
  if (!caso) return {};
  return {
    title: `${caso.client} — Caso de Éxito · ${SITE.brandName}`,
    description: caso.result,
    alternates: { canonical: `https://resueltoagency.com/casos/${caso.slug}` },
    openGraph: {
      title: `${caso.client} · Caso RESUELTO`,
      description: caso.result,
      url: `https://resueltoagency.com/casos/${caso.slug}`,
      siteName: SITE.brandName,
      locale: "es_PE",
      type: "website",
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CasoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caso = SITE.proof.cases.find((c) => c.slug === slug);
  if (!caso) notFound();

  const extra = caso as unknown as { status?: string; iaCategories?: string[] };
  const IA_LABEL: Record<string, string> = {
    "video-producto": "Video Producto IA",
    "ugc": "UGC IA",
    "storytelling": "Storytelling IA",
    "estrategia": "Estrategia IA",
    "generativo": "Generativo / Visual IA",
    "automatizacion": "Automatización IA",
  };

  const index = SITE.proof.cases.indexOf(caso);
  const isGreen = index % 2 === 0;
  const accentRgb = isGreen ? "26,128,255" : "77,159,255";
  const accentHex = isGreen ? "#1A80FF" : "#4D9FFF";

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ background: `radial-gradient(ellipse, rgba(${accentRgb},1) 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

        <div className="container-base relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/casos"
              className="font-display text-[0.68rem] tracking-widest uppercase text-muted hover:text-cream transition-colors"
            >
              ← Casos
            </Link>
            <span className="text-muted/30">/</span>
            <span className="font-display text-[0.68rem] tracking-widest uppercase" style={{ color: accentHex }}>
              {caso.client}
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            {/* Left: text */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {extra.status === "activo" && (
                  <span className="inline-flex items-center gap-1.5 font-display font-bold text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded"
                    style={{ color: "#1A80FF", background: "rgba(26,128,255,0.1)", border: "1px solid rgba(26,128,255,0.4)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> Cliente activo
                  </span>
                )}
                <span
                  className="inline-block font-display font-bold text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded"
                  style={{
                    color: accentHex,
                    background: `rgba(${accentRgb},0.08)`,
                    border: `1px solid rgba(${accentRgb},0.2)`,
                  }}
                >
                  {caso.sector}
                </span>
              </div>

              <h1
                className="font-display font-extrabold tracking-tighter leading-[1.05] text-cream mb-6"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
              >
                {caso.client}
              </h1>

              <p className="font-body text-muted text-base lg:text-lg leading-relaxed max-w-xl mb-5">
                {caso.problem}
              </p>

              {extra.iaCategories && extra.iaCategories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {extra.iaCategories.map((c) => (
                    <span key={c}
                      className="text-[11px] font-display font-semibold px-3 py-1.5 rounded-lg"
                      style={{ background: "rgba(26,128,255,0.08)", border: "1px solid rgba(26,128,255,0.22)", color: "rgba(120,180,255,0.95)" }}>
                      {IA_LABEL[c] ?? c}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: portfolio image */}
            <div
              className="relative rounded-2xl overflow-hidden border"
              style={{
                aspectRatio: "16/9",
                borderColor: `rgba(${accentRgb},0.2)`,
                background: `rgba(${accentRgb},0.03)`,
              }}
            >
              <Image
                src={caso.image}
                alt={caso.client}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Accent line top */}
              <div
                className="absolute top-0 left-0 right-0 h-px z-10"
                style={{ background: `linear-gradient(90deg, rgba(${accentRgb},0.9) 0%, transparent 70%)` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="h-px mx-6 lg:mx-8" style={{ background: `rgba(${accentRgb},0.12)` }} />

      {/* ── Body: Problema / Solución / Resultado ── */}
      <section className="relative section-padding">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Problema */}
            <div
              className="rounded-2xl p-7 border"
              style={{
                background: `rgba(${accentRgb},0.03)`,
                borderColor: `rgba(${accentRgb},0.12)`,
              }}
            >
              <span className="font-display font-bold text-[0.62rem] tracking-widest uppercase mb-3 block" style={{ color: accentHex }}>
                01 · El problema
              </span>
              <p className="font-body text-muted text-sm leading-relaxed">
                {caso.problem}
              </p>
            </div>

            {/* Solución */}
            <div
              className="rounded-2xl p-7 border"
              style={{
                background: `rgba(${accentRgb},0.05)`,
                borderColor: `rgba(${accentRgb},0.18)`,
              }}
            >
              <span className="font-display font-bold text-[0.62rem] tracking-widest uppercase mb-3 block" style={{ color: accentHex }}>
                02 · La solución
              </span>
              <p className="font-body text-muted text-sm leading-relaxed">
                {caso.solution}
              </p>
            </div>

            {/* Resultado */}
            <div
              className="rounded-2xl p-7 border"
              style={{
                background: `rgba(${accentRgb},0.07)`,
                borderColor: `rgba(${accentRgb},0.3)`,
              }}
            >
              <span className="font-display font-bold text-[0.62rem] tracking-widest uppercase mb-3 block" style={{ color: accentHex }}>
                03 · El resultado
              </span>
              <p className="font-body text-cream text-sm leading-relaxed font-medium">
                {caso.result}
              </p>
            </div>
          </div>

          {/* IA role (if present) */}
          {caso.iaRole && (
            <div
              className="mt-6 rounded-2xl p-6 border flex items-start gap-4"
              style={{
                background: `rgba(${accentRgb},0.04)`,
                borderColor: `rgba(${accentRgb},0.15)`,
              }}
            >
              <span className="text-xl flex-shrink-0">🤖</span>
              <div>
                <span
                  className="font-display font-bold text-[0.62rem] tracking-widest uppercase block mb-1.5"
                  style={{ color: accentHex }}
                >
                  IA en este caso
                </span>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {caso.iaRole}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Back nav ── */}
      <section className="pb-10">
        <div className="container-base flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/casos"
            className="font-display font-semibold text-sm tracking-wide text-muted hover:text-cream transition-colors border-b border-white/15 pb-1"
          >
            ← Ver todos los casos
          </Link>

          {/* Next / Prev */}
          <div className="flex gap-4">
            {index > 0 && (
              <Link
                href={`/casos/${SITE.proof.cases[index - 1].slug}`}
                className="font-display font-semibold text-sm tracking-wide border-b pb-1 transition-colors"
                style={{ color: accentHex, borderColor: `rgba(${accentRgb},0.35)` }}
              >
                ← {SITE.proof.cases[index - 1].client}
              </Link>
            )}
            {index < SITE.proof.cases.length - 1 && (
              <Link
                href={`/casos/${SITE.proof.cases[index + 1].slug}`}
                className="font-display font-semibold text-sm tracking-wide border-b pb-1 transition-colors"
                style={{ color: accentHex, borderColor: `rgba(${accentRgb},0.35)` }}
              >
                {SITE.proof.cases[index + 1].client} →
              </Link>
            )}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
