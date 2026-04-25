import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Authority from "@/components/Authority";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import VSLSection from "@/components/VSLSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
    </main>
    <Problem />
    <main className="relative overflow-hidden">
      <Authority />
      <FAQ />
      <VSLSection />
      <FinalCTA />
      <Footer />
    </main>
    </>
  );
}
