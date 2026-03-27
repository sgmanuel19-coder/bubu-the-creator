import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Authority from "@/components/Authority";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  const previewCases = SITE.proof.cases.slice(0, 3);

  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Authority />

      {/* ── Cases Preview ─────────────────────────────────────── */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-neon-purple/20" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] rounded-full bg-neon-green/4 blur-[100px] pointer-events-none" />

        <div className="container-base relative z-10">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-3">
                <span className="w-6 h-px bg-neon-green/50" />
                Casos reales
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mt-1">
                Evidencia, no promesas
              </h2>
            </div>
            <Link href="/casos" className="btn-outline text-sm hidden md:inline-flex">
              Ver todos los casos →
            </Link>
          </div>

          {/* 3 preview cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {previewCases.map((caso, i) => (
              <Link
                key={caso.slug}
                href={`/casos/${caso.slug}`}
                className="group relative rounded-2xl overflow-hidden hud-corners block"
                style={{ background: "rgba(8,10,13,0.97)" }}
              >
                {/* Gradient border */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, rgba(0,255,135,0.12) 0%, rgba(204,68,255,0.06) 100%)"
                      : "linear-gradient(135deg, rgba(204,68,255,0.12) 0%, rgba(0,255,135,0.06) 100%)",
                    padding: "1px",
                  }}
                />
                {/* Hover tint */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none
                  ${i % 2 === 0 ? "bg-neon-green/[0.04]" : "bg-neon-purple/[0.04]"}`} />

                <div className="relative rounded-2xl p-6 h-full flex flex-col"
                  style={{ background: "rgba(8,10,13,0.98)" }}>
                  {/* Sector tag */}
                  <span className={`self-start text-[10px] font-display font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-4 border
                    ${i % 2 === 0
                      ? "text-neon-green/70 border-neon-green/20 bg-neon-green/5"
                      : "text-neon-purple/70 border-neon-purple/20 bg-neon-purple/5"
                    }`}>
                    {caso.sector}
                  </span>

                  {/* Client name */}
                  <h3 className="font-display font-bold text-lg text-cream mb-3 leading-tight">
                    {caso.client}
                  </h3>

                  {/* Result preview */}
                  <p className="font-body text-sm text-muted leading-relaxed flex-1">
                    {caso.result.split("·")[0].trim()}
                  </p>

                  {/* CTA */}
                  <div className={`mt-5 flex items-center gap-2 text-xs font-display font-semibold tracking-wider uppercase
                    ${i % 2 === 0 ? "text-neon-green/60 group-hover:text-neon-green" : "text-neon-purple/60 group-hover:text-neon-purple"}
                    transition-colors duration-300`}>
                    Ver caso completo
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl
                    ${i % 2 === 0
                      ? "bg-gradient-to-r from-neon-green/60 to-transparent"
                      : "bg-gradient-to-r from-neon-purple/60 to-transparent"
                    }`} />
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/casos" className="btn-outline">
              Ver todos los casos →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
      </section>

      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
