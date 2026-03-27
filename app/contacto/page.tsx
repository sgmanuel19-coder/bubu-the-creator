import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import GridBackground from "@/components/ui/grid-background";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contacto — ${SITE.brandName}`,
  description: "¿Tienes un proyecto en mente? Cuéntame en qué estás trabajando. Sin compromiso — solo una conversación para ver si tiene sentido colaborar.",
};

export default function ContactoPage() {
  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col">
      <GridBackground />
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-36 pb-4 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-neon-green/6 blur-[100px] pointer-events-none" />

        <div className="container-base relative z-10 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Contacto directo
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h1 className="font-display font-extrabold tracking-tighter leading-[1.05] max-w-2xl mx-auto"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            ¿Tienes un proyecto en mente?
          </h1>
          <p className="font-body text-muted text-lg mt-4 max-w-xl mx-auto">
            Sin compromiso. Solo una conversación para ver si tiene sentido colaborar.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-neon-purple/20" />
      </section>

      {/* Contact options */}
      <div className="container-base max-w-3xl mx-auto pt-6 pb-2 relative z-10">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {SITE.links.whatsapp !== "[LINK_WHATSAPP]" && (
            <a href={SITE.links.whatsapp} target="_blank" rel="noopener noreferrer"
              className="btn-glow text-sm py-2.5 px-6">
              WhatsApp →
            </a>
          )}
          {SITE.links.calendly !== "[LINK_FORMULARIO_O_CALENDLY]" && (
            <a href={SITE.links.calendly} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-sm py-2.5 px-6">
              Agenda una llamada →
            </a>
          )}
          <a href={`mailto:${SITE.email}`}
            className="btn-outline text-sm py-2.5 px-6">
            Email directo →
          </a>
        </div>
        <p className="text-center text-xs font-body text-muted/40 mb-2">o usa el formulario</p>
      </div>

      <div className="flex-1">
        <ContactForm />
      </div>

      <Footer />
    </main>
  );
}
