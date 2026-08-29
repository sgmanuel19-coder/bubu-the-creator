"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import LoopVideo from "@/components/LoopVideo";
import MetodoVisual from "@/components/MetodoVisual";
import ProcesoVisual from "@/components/ProcesoVisual";
import {
  PanelSolar, Inversor, Bateria, Medidor, TorreElectrica, Casco,
  Videocaso, Vertical, ImagenIA, Stand, EnVivo, Entrevista, Foto,
  Diagnostico, Guion, Camara, Entrega,
  Catalogo, SinRegistro, FeriaVacia, Reunion, Check, Cruz,
} from "@/components/IconosEnergia";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Mensaje propio de esta landing: permite distinguir en WhatsApp si el lead
   vino del cold email al canal de energía o del sitio orgánico. */
const WA_MSG =
  "Hola, vi la página de IA Visual System y quisiera agendar el diagnóstico visual de 20 minutos.";

const waLink = () => `${SITE.links.whatsapp}?text=${encodeURIComponent(WA_MSG)}`;

/* VSL. Por ahora se reutiliza el video de /produccion-ia, que es el único
   grabado. Cuando exista una versión específica para el sector energía basta
   con cambiar este ID — no hay que tocar nada más. */
const VSL_ID = "30bVmigalKQ";

/* ── Animación de entrada estándar de la página ── */
const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  /* amount: 0 — basta con que asome un píxel para revelar. Esta landing llega
     por correo frío: el visitante arrastra la barra de scroll y salta, y con un
     umbral alto la sección puede quedarse sin revelar. */
  viewport: { once: true, amount: 0, margin: "-70px" },
  transition: { duration: 0.7, ease: EASE },
};

/* ── Encabezado de sección ── */
function Head({ n, title, sub }: { n: string; title: React.ReactNode; sub?: string }) {
  return (
    <motion.div className="mb-12 md:mb-16" {...fadeUp}>
      <span className="mb-4 block font-brand text-xs uppercase tracking-[0.28em] text-brand-blue">
        {n}
      </span>
      <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.12] tracking-tight text-cream md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
    </motion.div>
  );
}

/* ── Botón principal — agenda. El WhatsApp queda como vía secundaria
   porque en B2B de este ticket la llamada agendada convierte mejor. ── */
function Cta({ label = "Agendar diagnóstico visual", sub }: { label?: string; sub?: string }) {
  return (
    <motion.div className="flex flex-col items-start gap-4" {...fadeUp}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={SITE.links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-8 py-4 font-brand text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_0_rgba(26,128,255,0)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-light hover:shadow-[0_10px_34px_rgba(26,128,255,0.45)] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {label}{" "}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          >
            →
          </span>
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-8 py-4 font-brand text-sm font-semibold uppercase tracking-wider text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue hover:bg-brand-blue/10 hover:text-brand-blue"
        >
          o escríbeme por WhatsApp
        </a>
      </div>
      {sub && <p className="max-w-md font-body text-sm text-muted">{sub}</p>}
    </motion.div>
  );
}

/* ── VSL con portada propia.
   YouTube impone su propia miniatura, y la del video actual no tiene nada que
   ver con el sector. Con esta fachada la portada la elegimos nosotros — un
   fotograma de campo del propio material — y el iframe recién se monta al
   hacer clic, así la página no carga los scripts de YouTube de entrada. ── */
function VslConPortada() {
  const [reproducir, setReproducir] = useState(false);

  if (reproducir) {
    return (
      <div className="hm-vsl-frame">
        <iframe
          src={`https://www.youtube.com/embed/${VSL_ID}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=0`}
          title="RESUELTO — IA Visual System para el sector energía"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setReproducir(true)}
      aria-label="Reproducir el video"
      className="hm-vsl-frame group block w-full cursor-pointer border-0 p-0"
    >
      <Image
        src="/images/vsl-portada.jpg"
        alt="Ingeniero de campo revisando equipos en almacén"
        fill
        sizes="(max-width: 900px) 100vw, 900px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        priority
      />
      <span className="absolute inset-0 bg-gradient-to-t from-bg/75 via-bg/20 to-bg/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue shadow-[0_8px_40px_rgba(26,128,255,0.5)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          {/* Triángulo de play, ligeramente desplazado para que se vea centrado */}
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white md:h-8 md:w-8" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

/* ── Columna de bloque dentro de la tarjeta de precio. Lee los MISMOS arrays
   que la sección del sistema, para que nunca se desincronicen: si mañana
   cambia un entregable, cambia en los dos sitios a la vez. ── */
function ResumenBloque({
  n,
  titulo,
  items,
}: {
  n: string;
  titulo: string;
  items: string[];
}) {
  return (
    <div className="p-7 md:p-8">
      <p className="font-brand text-[11px] uppercase tracking-[0.22em] text-brand-blue">{n}</p>
      <h3 className="mt-1.5 font-display text-base font-bold text-cream md:text-lg">{titulo}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 font-body text-sm leading-snug text-muted">
            <span className="text-brand-blue" aria-hidden="true">·</span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Testimonios.
   Se leen de `SITE.proof.testimonials`, que es la misma fuente que ya usa el
   resto del sitio. No se copian ni se reescriben aquí: si mañana se corrige una
   cita en constants.ts, se corrige también en esta landing.

   Livoltek va primero a propósito — es el único del sector energía y el que más
   le dice algo a quien recibe el correo. */
const ORDEN_EMPRESAS = ["Livoltek", "WIN Internet", "TBWA Perú"];

const TESTIMONIOS = [...SITE.proof.testimonials].sort((a, b) => {
  const ia = ORDEN_EMPRESAS.indexOf(a.company);
  const ib = ORDEN_EMPRESAS.indexOf(b.company);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
});

/* ── Cinta infinita de clips. La lista se duplica para que el bucle no
   muestre un corte. Son TRES copias, no dos: con dos, en un monitor ancho el
   desplazamiento deja un hueco visible al final del ciclo. ── */
function Cinta({
  clips,
  vertical = false,
  invertida = false,
}: {
  clips: string[];
  vertical?: boolean;
  invertida?: boolean;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Degradados en los bordes: la cinta debe salir de la nada y volver a
          ella, no cortarse contra el filo de la pantalla. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-32" />

      <div
        className="flex w-max gap-4"
        style={{
          animation: `energia-cinta ${vertical ? 46 : 38}s linear infinite`,
          animationDirection: invertida ? "reverse" : "normal",
        }}
      >
        {[...clips, ...clips, ...clips].map((c, i) => (
          <div
            key={`${c}-${i}`}
            className={`shrink-0 overflow-hidden rounded-xl border border-cream/10 transition-all duration-500 hover:-translate-y-2 hover:border-brand-blue/50 hover:shadow-[0_14px_40px_rgba(0,0,0,0.55)] ${
              vertical ? "w-40 md:w-52" : "w-72 md:w-96"
            }`}
          >
            <div className={vertical ? "aspect-[9/16]" : "aspect-video"}>
              <LoopVideo src={c} vertical={vertical} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Fila de entregable: texto a la izquierda, clip real a la derecha.
   El clip es la prueba: en una landing de agencia audiovisual, describir el
   entregable con palabras y no mostrarlo es el peor argumento posible. ── */
function Entregable({
  t,
  d,
  v,
  vertical,
  icono: Icono,
  etiqueta,
  pendiente,
}: {
  t: string;
  d: string;
  v?: string;
  vertical?: boolean;
  icono?: (p: { className?: string }) => JSX.Element;
  /* Qué es REALMENTE el clip que se muestra al costado, según el catálogo de
     `lib/portafolio.ts`. Va a la vista: un comercial no puede pasar por un
     videocaso solo porque esté al lado del texto que lo describe. */
  etiqueta?: string;
  /* true cuando todavía no existe material de ese entregable y el clip es solo
     una referencia de estilo. */
  pendiente?: boolean;
}) {
  return (
    <div className="group flex flex-col gap-6 bg-surface p-7 transition-colors hover:bg-surface-2 md:flex-row md:items-center md:gap-8 md:p-8">
      <div className="flex flex-1 gap-4">
        {Icono && (
          <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-blue/25 bg-brand-blue/10 text-brand-blue transition-transform group-hover:scale-105">
            <Icono className="h-[22px] w-[22px]" />
          </span>
        )}
        <div>
          <h4 className="font-display text-base font-semibold text-cream md:text-lg">{t}</h4>
          <p className="mt-2.5 font-body text-sm leading-relaxed text-muted md:text-base">{d}</p>
        </div>
      </div>
      {v && (
        <figure className={`shrink-0 ${vertical ? "w-32 md:w-36" : "w-full md:w-64"}`}>
          <div className="overflow-hidden rounded-xl border border-cream/10 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand-blue/40">
            <div className={vertical ? "aspect-[9/16]" : "aspect-video"}>
              <LoopVideo src={v} vertical={vertical} />
            </div>
          </div>
          {etiqueta && (
            <figcaption
              className={`mt-2 font-body text-[11px] leading-snug ${
                pendiente ? "text-brand-blue/80" : "text-muted/70"
              }`}
            >
              {etiqueta}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  );
}

/* ── Contenido ─────────────────────────────────────────────── */

const PROBLEMAS = [
  {
    t: "Vendes con el catálogo del fabricante",
    icono: Catalogo,
    d: "Los mismos renders y las mismas fichas que usan los otros distribuidores de tu marca. Nada en ese material explica por qué el proyecto debería ser tuyo y no de ellos.",
  },
  {
    t: "Tus mejores instalaciones no tienen registro",
    icono: SinRegistro,
    d: "La planta quedó operando, el cliente quedó contento, y no te llevaste ni una toma. Cuando llega la siguiente licitación no tienes nada que mostrar.",
  },
  {
    t: "La feria se acaba y no queda nada",
    icono: FeriaVacia,
    d: "Pagaste stand, pasajes, traslado de equipos y viáticos del equipo comercial. Tres días después no hay ni un video, ni una entrevista, ni un banco de fotos que justifique esa inversión.",
  },
  {
    t: "Lo técnico se muere en la reunión",
    icono: Reunion,
    d: "Tu solución es mejor y sabes sustentarla. Pero quien firma no es el ingeniero: es el gerente, el dueño o el comité. Y lo que no se entiende rápido, no se aprueba.",
  },
];

const BLOQUE_1 = [
  {
    t: "1 videocaso de 2 minutos",
    icono: Videocaso,
    d: "Un proyecto real contado como caso: el problema del cliente, tu solución técnica, el resultado medible. Grabado en campo y completado con IA para todo lo que no se puede filmar.",
    v: "/videos/web/trad-comerciales-02.mp4",
    etiqueta: "Videocaso",
  },
  {
    t: "1 versión corta de 30 segundos",
    icono: Vertical,
    d: "Corte del mismo videocaso con gancho en los primeros 3 segundos. En vertical y horizontal — lista para LinkedIn, pauta, WhatsApp comercial y las pantallas de tu stand.",
    v: "/videos/web/story-03.mp4",
    vertical: true,
    etiqueta: "Storytelling IA",
  },
  {
    t: "8 imágenes profesionales con IA",
    icono: ImagenIA,
    d: "Tu producto en contextos que no se pueden fotografiar: el equipo instalado, el corte técnico por dentro, la escala real en obra, el entorno de operación. Alta resolución, para catálogo, fichas y propuestas.",
    v: "/videos/web/producto-05.mp4",
    etiqueta: "Video producto IA",
    vertical: true,
  },
];

const BLOQUE_2 = [
  {
    t: "1 video de feria o evento",
    icono: Stand,
    d: "Registro del stand, las ponencias y las reuniones, editado como pieza recap que puedes mandar la misma semana.",
    v: "/videos/web/trad-coberturas-02.mp4",
    etiqueta: "Cobertura real",
    vertical: true,
  },
  {
    t: "Hasta 3 stories en vivo",
    icono: EnVivo,
    d: "Cobertura en tiempo real durante el evento, publicada el mismo día. Los que no fueron ven que estuviste.",
    v: "/videos/web/trad-wong-03.mp4",
    vertical: true,
    etiqueta: "Cobertura real",
  },
  {
    t: "Hasta 3 entrevistas a profesionales",
    icono: Entrevista,
    d: "A tu gerente, tus ingenieros o los especialistas que te visitan. Preguntas dirigidas, no improvisadas. Se entregan como 3 videos independientes.",
    v: "/videos/web/trad-coberturas-06.mp4",
    etiqueta: "Cobertura real",
    vertical: true,
  },
  {
    t: "Más de 15 fotografías profesionales",
    icono: Foto,
    d: "Banco fotográfico editado: stand, equipo, producto, retratos corporativos y momentos de reunión.",
    v: "/videos/web/trad-coberturas-05.mp4",
    etiqueta: "Cobertura real",
    vertical: true,
  },
];

const PASOS = [
  {
    n: "01",
    icono: Diagnostico,
    t: "Diagnóstico visual",
    d: "20 minutos. Qué proyecto vale la pena contar, quién es tu vocero, qué se puede y qué no se puede filmar. Sales con un mapa de piezas, cierres o no cierres.",
  },
  {
    n: "02",
    icono: Guion,
    t: "Preproducción",
    d: "Guion, plan de rodaje, coordinación de accesos y permisos de seguridad. Definimos qué se resuelve con cámara y qué con IA.",
  },
  {
    n: "03",
    icono: Camara,
    t: "Producción",
    d: "Grabación en campo y en feria, entrevistas, fotos. Equipo reducido para no interferir con tu operación ni con tus clientes.",
  },
  {
    n: "04",
    icono: Entrega,
    t: "Entrega",
    d: "Edición, generación de piezas con IA, color y sonido. Recibes una carpeta organizada por formato y por uso, no un link suelto.",
  },
];

const FAQ = [
  {
    q: "¿Se nota que hay IA?",
    a: "No, porque no se usa para simular la realidad sino para mostrar lo que la cámara no alcanza: el interior de un equipo, un corte técnico, una instalación a escala. Lo que es registro real se graba. Y siempre te decimos qué elemento es generado — nunca presentamos una simulación como si fuera una foto de tu obra.",
  },
  {
    q: "¿Y si estoy fuera de Lima?",
    a: "El servicio se entrega igual. Lima Metropolitana está incluida; para obras, plantas o ferias fuera de Lima, o fuera del Perú, se cotizan los pasajes y viáticos aparte. Trabajamos con clientes en Perú, Colombia y Chile.",
  },
  {
    q: "¿Qué necesitan de mi lado?",
    a: "Tres cosas: un vocero disponible, una persona que apruebe (una sola, no un comité), y acceso coordinado a las instalaciones o la feria. El resto lo ponemos nosotros.",
  },
  {
    q: "¿Y si este mes no tengo ninguna feria?",
    a: "El bloque de coberturas se ejecuta como jornada en tu planta, obra o showroom, con los mismos entregables: 1 video, 3 entrevistas y más de 15 fotos. No pierdes el mes.",
  },
  {
    q: "¿Cuántos cambios incluye?",
    a: "Una ronda en estrategia y guion, y hasta dos ajustes por pieza terminada. Se define el alcance al inicio para que nadie descubra sorpresas al final.",
  },
  {
    q: "¿Por qué el mínimo de 3 meses?",
    a: "Porque un video suelto se agota en seis semanas. El primer mes se construye la base, el segundo se afina el tono y el tercero ya sabemos qué funciona con tu mercado. Menos de eso es gastar, no invertir.",
  },
];

export default function LandingEnergia() {
  return (
    <div className="bg-bg text-cream">
      {/* La cinta avanza exactamente un tercio de su ancho: como la lista se
          repite tres veces, al llegar ahí el fotograma es idéntico al inicial
          y el bucle no se nota. */}
      <style>{`
        @keyframes energia-cinta {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="energia-cinta"] { animation: none !important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-cream/10 px-6 pb-24 pt-32 md:pb-32 md:pt-40">
        {/* Halo azul de marca, sutil */}
        {/* Fondo en movimiento. Va detrás de un velo fuerte: tiene que dar
            textura, no competir con el titular. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <LoopVideo src="/videos/web/hero-bg.mp4" className="opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/85 to-bg" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-blue/15 blur-[140px]"
        />
        <div className="container-base relative mx-auto max-w-5xl">
          <motion.p
            className="mb-6 font-brand text-xs uppercase tracking-[0.28em] text-brand-blue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Para el canal de energía · Perú · Colombia · Chile
          </motion.p>

          <motion.h1
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-cream md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          >
            Lo mejor que haces
            <br />
            no se ve.
            <br />
            <span className="text-brand-blue">Nosotros lo hacemos ver.</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-muted md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
          >
            Tableros cerrados, plantas que no se detienen, obras a 3,000 metros. Ahí está
            tu mejor argumento de venta, y no existe en ningún video tuyo — por eso terminas
            vendiendo con el catálogo del fabricante, igual que los otros seis distribuidores
            de tu marca. IA Visual System cambia eso todos los meses.
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
          >
            <Cta sub="20 minutos, sin compromiso. Sales con un mapa de piezas aunque no trabajemos juntos." />
          </motion.div>

          <motion.p
            className="mt-14 font-body text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          >
            Clientes activos:{" "}
            <span className="text-cream">WIN Internet · Livoltek · Wellmax · Smart System Perú</span>
          </motion.p>
        </div>
      </section>

      {/* ── A QUIÉN LE HABLAMOS ──────────────────────────────
          La landing llega por correo frío a una lista muy concreta. Esta banda
          existe para que el lector se reconozca en los primeros segundos y no
          crea que le llegó una oferta genérica de agencia. ── */}
      <section className="border-b border-cream/10 bg-surface px-6 py-14 md:py-16">
        <div className="container-base mx-auto max-w-5xl">
          <motion.p
            className="mb-8 text-center font-brand text-[11px] uppercase tracking-[0.3em] text-muted"
            {...fadeUp}
          >
            Trabajamos con
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-3" {...fadeUp}>
            {[
              { t: "Distribuidores e importadores", I: Inversor },
              { t: "Energía solar y almacenamiento", I: PanelSolar },
              { t: "Medición inteligente", I: Medidor },
              { t: "EPC e ingeniería", I: TorreElectrica },
              { t: "Integradores e instaladores", I: Casco },
              { t: "Fabricantes con canal en LATAM", I: Bateria },
            ].map(({ t, I }) => (
              <span
                key={t}
                className="group/chip inline-flex cursor-default items-center gap-2.5 rounded-full border border-cream/15 px-5 py-2.5 font-body text-sm text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/60 hover:bg-brand-blue/10"
              >
                <I className="h-[18px] w-[18px] shrink-0 text-brand-blue transition-transform duration-300 group-hover/chip:scale-125" />
                {t}
              </span>
            ))}
          </motion.div>
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-center font-body text-sm leading-relaxed text-muted"
            {...fadeUp}
          >
            Si tu empresa vende equipos técnicos que alguien tiene que instalar, operar y
            mantener, hablamos tu idioma. No hacemos moda, ni restaurantes, ni retail.
          </motion.p>
        </div>
      </section>

      {/* ── VSL ──────────────────────────────────────────────
          Va inmediatamente después del hero: el visitante llega desde un
          correo frío y decide en segundos si esto le habla a él o no. ── */}
      <section className="border-b border-cream/10 px-6 py-20 md:py-28">
        <div className="container-base mx-auto max-w-4xl">
          <motion.p
            className="mb-6 text-center font-brand text-xs uppercase tracking-[0.28em] text-brand-blue"
            {...fadeUp}
          >
            Míralo en 3 minutos
          </motion.p>

          <motion.div className="lp-vsl-wrap !mt-0" {...fadeUp}>
            <VslConPortada />
          </motion.div>

          <motion.p
            className="mx-auto mt-7 max-w-xl text-center font-body text-sm leading-relaxed text-muted"
            {...fadeUp}
          >
            Cómo se construye una pieza que mezcla grabación real con IA, y por qué
            eso cambia lo que puedes mostrarle a un cliente técnico.
          </motion.p>
        </div>
      </section>

      {/* ── PROBLEMA ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-cream/10 px-6 py-24 md:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <LoopVideo src="/videos/web/problem-section-bg.mp4" className="opacity-15" />
          <div className="absolute inset-0 bg-bg/85" />
        </div>
        <div className="container-base relative mx-auto max-w-5xl">
          <Head
            n="01 · El problema"
            title="No es que no tengas qué mostrar. Es que nadie lo ha construido."
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {PROBLEMAS.map((p, i) => (
              <motion.div
                key={p.t}
                className="group bg-surface p-7 transition-colors duration-300 hover:bg-surface-2 md:p-9"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cream/12 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-blue/40 group-hover:text-brand-blue">
                  <p.icono className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-semibold text-cream transition-colors group-hover:text-brand-blue md:text-xl">{p.t}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted md:text-base">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IDEA CENTRAL ─────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-cream/10 px-6 py-28 md:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-blue/10 blur-[120px]"
        />
        <div className="container-base relative mx-auto max-w-4xl text-center">
          <motion.p className="font-brand text-xs uppercase tracking-[0.28em] text-brand-blue" {...fadeUp}>
            02 · La idea
          </motion.p>
          <motion.h2
            className="mt-6 font-display text-3xl font-bold leading-[1.12] tracking-tight text-cream md:text-6xl"
            {...fadeUp}
          >
            Hacemos ver lo que
            <br />
            <span className="text-brand-blue">no se puede filmar.</span>
          </motion.h2>
          <motion.p className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-muted md:text-lg" {...fadeUp}>
            Una productora tradicional te dirá que eso no se puede grabar, y tiene razón:
            no hay cámara que entre a un tablero energizado ni presupuesto que justifique
            subir un equipo completo a una obra remota por tres tomas.
          </motion.p>
          <motion.p className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-cream md:text-lg" {...fadeUp}>
            Nosotros grabamos lo que sí se puede y generamos con IA lo que no: el corte por
            dentro del equipo, la red bajo el asfalto, la instalación a escala real. Todo en
            una sola pieza, sin que se note la costura.
          </motion.p>

          {/* El método dibujado. Un diagrama propio explica la mezcla mejor que
              dos clips sueltos, y no depende de tener el material perfecto. */}
          <motion.div className="mx-auto mt-14 max-w-xl" {...fadeUp}>
            <MetodoVisual className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* ── EL SISTEMA ───────────────────────────────────── */}
      <section className="border-b border-cream/10 px-6 py-24 md:py-32">
        <div className="container-base mx-auto max-w-5xl">
          <Head
            n="03 · El sistema"
            title="Dos bloques, todos los meses."
            sub="Uno construye tu autoridad y te sirve todo el año. El otro convierte cada feria y cada obra en material que puedes usar la misma semana."
          />

          {/* Bloque 1 */}
          <motion.div className="mb-12" {...fadeUp}>
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-brand text-xs uppercase tracking-[0.22em] text-brand-blue">
                Bloque 1
              </span>
              <h3 className="font-display text-xl font-bold text-cream md:text-2xl">
                La pieza de autoridad
              </h3>
            </div>
            <div className="space-y-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10">
              {BLOQUE_1.map((x) => (
                <Entregable key={x.t} {...x} />
              ))}
            </div>
          </motion.div>

          {/* Bloque 2 */}
          <motion.div {...fadeUp}>
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-brand text-xs uppercase tracking-[0.22em] text-brand-blue">
                Bloque 2
              </span>
              <h3 className="font-display text-xl font-bold text-cream md:text-2xl">
                Coberturas Resuelto
              </h3>
            </div>
            <div className="space-y-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10">
              {BLOQUE_2.map((x) => (
                <Entregable key={x.t} {...x} />
              ))}
            </div>
          </motion.div>

          <motion.p className="mt-8 font-body text-sm text-muted" {...fadeUp}>
            Incluye dirección estratégica y creativa, una sesión mensual de revisión con tu
            equipo, y el banco de assets organizado y entregado.
          </motion.p>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────
          Solo se pinta si hay citas reales cargadas. ── */}
      {TESTIMONIOS.length > 0 && (
        <section className="border-b border-cream/10 px-6 py-24 md:py-32">
          <div className="container-base mx-auto max-w-5xl">
            <Head n="04 · Clientes" title="Lo que dicen los que ya trabajan así." />
            {/* Baraja superpuesta: las tarjetas se pisan entre sí y cada una
                está algo girada, como fichas dejadas sobre una mesa. Al pasar
                el mouse, la de encima se endereza y sube por delante del resto.
                En móvil el solape es vertical, porque a lo ancho no cabe. */}
            <div className="group/baraja flex flex-col items-center md:flex-row md:justify-center">
              {TESTIMONIOS.map((t, i) => (
                <motion.figure
                  key={t.company}
                  /* Al entrar a la baraja, todas se difuminan y retroceden; la
                     apuntada se endereza, crece y sube al frente. El `!` es
                     necesario para que el estado propio gane sobre el del
                     grupo, que en Tailwind se emite después. */
                  className={`relative w-full max-w-sm rounded-2xl border border-cream/10 bg-surface p-8 shadow-[0_18px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out group-hover/baraja:scale-[.97] group-hover/baraja:opacity-45 group-hover/baraja:blur-[3px] hover:!z-40 hover:!scale-105 hover:!opacity-100 hover:!blur-0 hover:-translate-y-4 hover:rotate-0 hover:border-brand-blue/60 hover:shadow-[0_30px_80px_rgba(0,0,0,0.75),0_0_60px_rgba(26,128,255,0.18)] ${
                    /* El solape mide menos que el padding de la tarjeta (p-8 = 32px),
                       así se pisan los bordes pero nunca el texto. */
                    i > 0 ? "-mt-6 md:-ml-7 md:mt-0" : ""
                  } ${
                    ["md:rotate-[-3deg]", "md:rotate-[1.5deg]", "md:rotate-[-1.5deg]"][i % 3]
                  } ${
                    /* El apilado base va en clases, no en `style`: un z-index
                       inline le gana a `hover:z-*` y la primera tarjeta se
                       quedaba pegada al frente para siempre. */
                    ["z-30", "z-20", "z-10"][i % 3]
                  }`}
                  {...fadeUp}
                >
                  <span
                    aria-hidden="true"
                    className="block font-display text-5xl leading-none text-brand-blue/40 transition-colors duration-500"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-3 font-body text-base leading-relaxed text-cream md:text-lg">
                    {t.text}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-cream/10 pt-5 font-body text-sm">
                    <span className="block font-semibold text-cream">{t.company}</span>
                    <span className="text-muted">{t.role}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MUESTRA ──────────────────────────────────────────
          Antes de pedir dinero, mostrar trabajo. Dos filas de clips reales
          moviéndose en direcciones opuestas: se lee como una mesa de montaje
          y demuestra volumen de producción sin tener que afirmarlo. ── */}
      <section className="overflow-hidden border-b border-cream/10 py-24 md:py-32">
        <div className="container-base mx-auto max-w-5xl px-6">
          <Head
            n="04 · Muestra"
            title="Así se ve el material."
            sub="Piezas producidas por Resuelto. Verticales, comerciales, producto y coberturas — el mismo tipo de material que recibirías cada mes."
          />
        </div>

        <div className="space-y-4">
          <Cinta
            clips={[
              "/videos/web/trad-comerciales-02.mp4",
              "/videos/web/comercial-05.mp4",
              "/videos/web/producto-01.mp4",
              "/videos/web/comercial-01.mp4",
              "/videos/web/trad-comerciales-01.mp4",
              "/videos/web/comercial-07.mp4",
            ]}
          />
          <Cinta
            invertida
            clips={[
              "/videos/web/story-06.mp4",
              "/videos/web/producto-03.mp4",
              "/videos/web/story-02.mp4",
              "/videos/web/trad-redondos-03.mp4",
              "/videos/web/story-07.mp4",
              "/videos/web/producto-04.mp4",
              "/videos/web/story-13.mp4",
              "/videos/web/story-12.mp4",
            ]}
            vertical
          />
        </div>
      </section>

      {/* ── INVERSIÓN ──────────────────────────────────────
          La duda que aparecía antes era si el precio cubría un bloque o los
          dos. Por eso los bloques se muestran aquí otra vez, sumándose de
          forma literal con un "+", y el precio aparece DESPUÉS de la suma. ── */}
      <section className="border-b border-cream/10 px-6 py-24 md:py-32">
        <div className="container-base mx-auto max-w-4xl">
          <Head
            n="05 · Inversión"
            title="Un precio. Los dos bloques."
            sub="No es un plan por bloque ni un menú por pieza: lo de abajo entra completo, todos los meses, por el mismo monto."
          />

          <motion.div
            className="overflow-hidden rounded-2xl border border-brand-blue/30 bg-surface-2"
            {...fadeUp}
          >
            {/* La suma */}
            <div className="grid md:grid-cols-[1fr_auto_1fr]">
              <ResumenBloque
                n="Bloque 1"
                titulo="La pieza de autoridad"
                items={BLOQUE_1.map((x) => x.t)}
              />

              <div className="flex items-center justify-center border-y border-cream/10 py-4 md:border-x md:border-y-0 md:px-6">
                <span
                  className="font-display text-3xl font-bold text-brand-blue"
                  aria-label="más"
                >
                  +
                </span>
              </div>

              <ResumenBloque
                n="Bloque 2"
                titulo="Coberturas Resuelto"
                items={BLOQUE_2.map((x) => x.t)}
              />
            </div>

            {/* El resultado de la suma */}
            <div className="border-t border-brand-blue/25 bg-brand-blue/[0.07] p-8 md:p-10">
              <p className="font-brand text-xs uppercase tracking-[0.22em] text-brand-blue">
                Todo lo anterior, cada mes
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-cream md:text-6xl">
                USD 4,200
                <span className="ml-2 align-middle font-body text-base font-normal text-muted md:text-lg">
                  + IGV / mes
                </span>
              </p>
              <p className="mt-3 font-body text-base text-muted">
                Permanencia mínima de 3 meses. Pago mensual adelantado.
              </p>

              <div className="mt-7 space-y-2.5 border-t border-cream/10 pt-7">
                {[
                  "Dirección estratégica y creativa incluida",
                  "Lima Metropolitana incluida",
                  "Fuera de Lima o del Perú: pasajes y viáticos cotizados aparte",
                ].map((l) => (
                  <p key={l} className="flex gap-3 font-body text-sm text-cream md:text-base">
                    <span className="text-brand-blue" aria-hidden="true">
                      —
                    </span>
                    {l}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Salida para quien no quiere el sistema completo: sin esto, el que
              solo necesita cubrir una feria se va sin escribir. */}
          <motion.div
            className="mt-6 rounded-2xl border border-cream/12 bg-surface p-7 md:p-8"
            {...fadeUp}
          >
            <h3 className="font-display text-lg font-semibold text-cream">
              ¿Solo necesitas uno de los dos?
            </h3>
            <p className="mt-2.5 font-body text-sm leading-relaxed text-muted md:text-base">
              Cada bloque se puede contratar por separado y se cotiza según el alcance —
              una feria puntual, un videocaso para una licitación, un banco de imágenes
              para el catálogo. Escríbenos qué necesitas y lo cotizamos aparte.
            </p>
          </motion.div>

          <motion.p className="mt-6 font-body text-sm leading-relaxed text-muted" {...fadeUp}>
            Para comparar: un solo video institucional con productora tradicional cuesta lo
            mismo o más, y se entrega una vez. Esto es un sistema corriendo todo el
            trimestre.
          </motion.p>
        </div>
      </section>

      {/* ── PROCESO ──────────────────────────────────────── */}
      <section className="border-b border-cream/10 px-6 py-24 md:py-32">
        <div className="container-base mx-auto max-w-5xl">
          <Head n="06 · Cómo funciona" title="Cuatro etapas. Sin misterio." />

          <motion.div className="mb-12 hidden sm:block" {...fadeUp}>
            <ProcesoVisual className="w-full max-w-3xl" />
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2">
            {PASOS.map((p, i) => (
              <motion.div
                key={p.n}
                className="group border-l border-cream/15 pl-6 transition-colors duration-300 hover:border-brand-blue"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-bold text-brand-blue/40">{p.n}</span>
                  <p.icono className="h-6 w-6 text-brand-blue transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-cream md:text-xl">{p.t}</h3>
                <p className="mt-2.5 font-body text-sm leading-relaxed text-muted md:text-base">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTRO ───────────────────────────────────────── */}
      <section className="border-b border-cream/10 px-6 py-24 md:py-32">
        <div className="container-base mx-auto max-w-5xl">
          <Head n="07 · Filtro" title="Esto no es para todos." />
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div className="rounded-2xl border border-brand-blue/25 bg-surface p-8" {...fadeUp}>
              <h3 className="font-display text-lg font-bold text-brand-blue">Sí es para ti si</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "Distribuyes, integras o instalas equipos de energía y ya facturas.",
                  "Tienes instalaciones ejecutadas que ningún material tuyo documenta.",
                  "Vas a ferias del sector al menos una vez al año.",
                  "Compites por proyectos donde el cliente pide respaldo, no solo precio.",
                  "Tienes un gerente o ingeniero dispuesto a salir en cámara.",
                ].map((l) => (
                  <li
                    key={l}
                    className="flex gap-3 font-body text-sm leading-relaxed text-cream md:text-base"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                    {l}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="rounded-2xl border border-cream/12 bg-surface p-8" {...fadeUp}>
              <h3 className="font-display text-lg font-bold text-muted">No es para ti si</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "Buscas community management o diseño de posts diarios.",
                  "No hay nadie disponible para hablar frente a cámara.",
                  "Necesitas aprobación de un comité de cinco personas por pieza.",
                  "Solo quieres “verse activo” en redes sin un objetivo comercial.",
                ].map((l) => (
                  <li
                    key={l}
                    className="flex gap-3 font-body text-sm leading-relaxed text-muted md:text-base"
                  >
                    <Cruz className="mt-0.5 h-4 w-4 shrink-0 text-muted/60" />
                    {l}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="border-b border-cream/10 px-6 py-24 md:py-32">
        <div className="container-base mx-auto max-w-3xl">
          <Head n="08 · Preguntas" title="Lo que siempre preguntan." />
          <div className="space-y-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10">
            {FAQ.map((f) => (
              <details key={f.q} className="group bg-surface">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-base font-semibold text-cream transition hover:text-brand-blue md:p-7 md:text-lg">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-body text-xl text-brand-blue transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 font-body text-sm leading-relaxed text-muted md:px-7 md:pb-7 md:text-base">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIERRE ───────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-28 md:py-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <LoopVideo src="/videos/web/final-cta-bg.mp4" className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/85 to-bg" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-brand-blue/15 blur-[130px]"
        />
        <div className="container-base relative mx-auto max-w-3xl text-center">
          <motion.h2
            className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-cream md:text-5xl"
            {...fadeUp}
          >
            El próximo proyecto grande
            <br />
            ya está siendo cotizado.
          </motion.h2>
          <motion.p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-muted md:text-lg" {...fadeUp}>
            Y quien lo gane no va a ser necesariamente el que tenga el mejor equipo, sino
            el que lo sepa demostrar. Agenda 20 minutos: revisamos cuál de tus
            instalaciones vale la pena contar y te entregamos el mapa de piezas —
            trabajemos juntos o no.
          </motion.p>
          <motion.div className="mt-10 flex justify-center" {...fadeUp}>
            <Cta />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
