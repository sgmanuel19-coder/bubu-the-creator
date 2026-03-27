"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { SITE } from "@/lib/constants";

// ─── Reemplaza con tu Form ID de Formspree (formspree.io) ─────────────────────
// 1. Crea cuenta en https://formspree.io
// 2. Crea un formulario nuevo
// 3. Copia el Form ID (ej: "xkgwpqzr") y reemplázalo aquí
const FORMSPREE_ID = "[TU_FORM_ID_FORMSPREE]";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState("success");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <section id="contacto" className="relative section-padding overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-neon-green/6 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[250px] rounded-full bg-neon-purple/6 blur-[100px] pointer-events-none" />

      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/25 to-neon-purple/25" />

      <div className="container-base relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green mb-4">
            <span className="w-6 h-px bg-neon-green/50" />
            Contacto directo
            <span className="w-6 h-px bg-neon-green/50" />
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="font-body text-muted text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            Cuéntame en qué estás trabajando. Sin compromiso — solo una conversación para ver si tiene sentido colaborar.
          </p>
        </AnimatedSection>

        {/* Form card */}
        <AnimatedSection delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Border */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,255,135,0.18) 0%, rgba(160,32,240,0.10) 50%, rgba(204,68,255,0.18) 100%)",
                padding: "1px",
              }}
            />
            <div
              className="relative rounded-2xl p-8 lg:p-12"
              style={{ background: "rgba(8,10,13,0.98)" }}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 grid-pattern opacity-15 rounded-2xl" />

              {/* HUD corners */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-neon-green/40 rounded-tl" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-neon-green/30 rounded-tr" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-neon-purple/30 rounded-bl" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-neon-purple/40 rounded-br" />

              {/* Success state */}
              {state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-neon-green/15 border border-neon-green/40 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-cream mb-3">
                    Mensaje enviado
                  </h3>
                  <p className="font-body text-muted text-base">
                    Te respondo dentro de 24–48 horas. Mientras tanto, también puedes escribirme por{" "}
                    <a
                      href={SITE.links.whatsapp}
                      className="text-neon-green hover:underline"
                    >
                      WhatsApp
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-6 text-xs font-display text-muted/60 hover:text-muted tracking-widest uppercase transition-colors"
                  >
                    Enviar otro mensaje →
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                >
                  {/* Row 1: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green/60 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5
                                   font-body text-sm text-cream placeholder:text-muted/40
                                   focus:outline-none focus:border-neon-green/40 focus:bg-neon-green/[0.03]
                                   transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green/60 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5
                                   font-body text-sm text-cream placeholder:text-muted/40
                                   focus:outline-none focus:border-neon-green/40 focus:bg-neon-green/[0.03]
                                   transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company */}
                  <div>
                    <label className="block text-xs font-display font-semibold tracking-[0.2em] uppercase text-muted/50 mb-2">
                      Empresa / Proyecto{" "}
                      <span className="text-muted/30 normal-case tracking-normal font-body font-normal">
                        (opcional)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="¿Con qué empresa o proyecto trabajas?"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5
                                 font-body text-sm text-cream placeholder:text-muted/40
                                 focus:outline-none focus:border-neon-purple/40 focus:bg-neon-purple/[0.02]
                                 transition-all duration-200"
                    />
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label className="block text-xs font-display font-semibold tracking-[0.2em] uppercase text-neon-green/60 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Cuéntame sobre tu negocio y qué necesitas resolver..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5
                                 font-body text-sm text-cream placeholder:text-muted/40
                                 focus:outline-none focus:border-neon-green/40 focus:bg-neon-green/[0.03]
                                 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Error message */}
                  {state === "error" && (
                    <p className="text-xs font-body text-red-400/80">
                      Algo salió mal. Intenta de nuevo o escríbeme directamente a{" "}
                      <a
                        href={SITE.links.whatsapp}
                        className="underline hover:text-red-300"
                      >
                        WhatsApp
                      </a>
                      .
                    </p>
                  )}

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <p className="text-xs font-body text-muted/40">
                      Respondo en menos de 48 horas.
                    </p>
                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className="btn-glow w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === "loading" ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-black/40 border-t-black animate-spin" />
                          Enviando...
                        </span>
                      ) : (
                        "Enviar mensaje →"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Alternative contact */}
        <AnimatedSection delay={0.2} className="mt-8 text-center">
          <p className="text-xs font-body text-muted/50">
            ¿Prefieres algo más directo?{" "}
            <a
              href={SITE.links.whatsapp}
              className="text-neon-green/70 hover:text-neon-green transition-colors hover:underline"
            >
              Escríbeme por WhatsApp →
            </a>
          </p>
        </AnimatedSection>
      </div>

      {/* Divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/25 to-neon-green/25" />
    </section>
  );
}
