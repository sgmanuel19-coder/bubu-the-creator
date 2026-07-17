import AnimatedSection from "@/components/AnimatedSection";

/**
 * Puente entre las ofertas de RESUELTO — el hilo de coherencia del sitio:
 * la agencia es la PRUEBA del método, la academy VENDE el método, la
 * bóveda lo DEMUESTRA gratis y el Sistema IA lo AUTOMATIZA.
 * Cada página muestra los caminos que NO son su propia oferta.
 */

type Camino = "agencia" | "academy" | "sistemas" | "boveda";

const CAMINOS: Record<
  Camino,
  { eyebrow: string; titulo: string; texto: string; cta: string; href: string }
> = {
  agencia: {
    eyebrow: "Para tu empresa",
    titulo: "Lo produzco por ti",
    texto:
      "Contenido con nivel cinematográfico generado con IA para tu marca — el sistema completo trabajando para tu empresa, sin que toques una herramienta.",
    cta: "Ver los servicios",
    href: "/servicios",
  },
  academy: {
    eyebrow: "Para creativos y marcas",
    titulo: "Te enseño el sistema",
    texto:
      "El mismo método que uso con mis clientes, enseñado paso a paso: pensar como director creativo y producir campañas con IA que se cobran de verdad.",
    cta: "Conocer la masterclass",
    href: "/taller",
  },
  sistemas: {
    eyebrow: "Para tu operación",
    titulo: "Lo automatizo contigo",
    texto:
      "Un sistema de IA que atiende, califica y agenda a tus clientes por WhatsApp las 24 horas — la otra mitad del negocio, automatizada.",
    cta: "Ver servicios de automatización",
    href: "/servicios",
  },
  boveda: {
    eyebrow: "Empieza gratis",
    titulo: "Pruébalo tú mismo",
    texto:
      "La Bóveda: guías completas y gratuitas de mi método — Meta Ads, IA aplicada y sistemas de contenido. Léelas y decide con evidencia.",
    cta: "Abrir la bóveda",
    href: "/taller/recursos",
  },
};

export default function PuenteOfertas({
  titulo,
  subtitulo,
  caminos,
}: {
  titulo: string;
  subtitulo: string;
  caminos: Camino[];
}) {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container-base relative z-10">
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-[0.25em] uppercase text-neon-green mb-3">
            <span className="w-6 h-px bg-neon-green/50" />
            Un solo sistema
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight max-w-2xl">
            {titulo}
          </h2>
          <p className="font-body text-muted mt-3 max-w-xl">{subtitulo}</p>
        </AnimatedSection>

        <div className={`mt-10 grid gap-4 ${caminos.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {caminos.map((clave) => {
            const c = CAMINOS[clave];
            return (
              <AnimatedSection key={clave}>
                <a
                  href={c.href}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6
                             transition-all hover:-translate-y-1 hover:border-neon-green/40"
                >
                  <p className="text-[11px] font-display font-semibold tracking-[0.2em] uppercase text-neon-green/80">
                    {c.eyebrow}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold">{c.titulo}</p>
                  <p className="mt-2 flex-1 text-sm font-body text-muted leading-relaxed">
                    {c.texto}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-neon-green">{c.cta} →</p>
                </a>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
