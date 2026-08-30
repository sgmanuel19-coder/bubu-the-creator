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

/* Clips verificados uno por uno del rubro energía e industria. Las etiquetas de
   `lib/portafolio.ts` no dicen de qué trata cada video, así que esta lista se
   armó extrayendo fotogramas y mirándolos. No agregar nada sin hacer lo mismo. */
const MUESTRA = [
  "/videos/web/story-04.mp4",
  "/videos/web/producto-02.mp4",
  "/videos/web/story-07.mp4",
  "/videos/web/producto-05.mp4",
  "/videos/web/story-12.mp4",
  "/videos/web/producto-07.mp4",
  "/videos/web/story-03.mp4",
];

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
    <motion.div className="mb-10 md:mb-14" {...fadeUp}>
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

/* ── Testimonios.
   Se leen de `SITE.proof.testimonials`, la misma fuente que ya usa el resto del
   sitio. No se copian ni se reescriben aquí: si mañana se corrige una cita en
   constants.ts, se corrige también en esta landing.

   Livoltek va primero a propósito — es el único del sector energía y el que más
   le dice algo a quien recibe el correo. */
const ORDEN_EMPRESAS = ["Livoltek", "WIN Internet", "TBWA Perú"];

const TESTIMONIOS = [...SITE.proof.testimonials].sort((a, b) => {
  const ia = ORDEN_EMPRESAS.indexOf(a.company);
  const ib = ORDEN_EMPRESAS.indexOf(b.company);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
});

/* ── Cinta infinita de clips. La lista se repite para que el bucle no muestre
   un corte. Son TRES copias, no dos: con dos, en un monitor ancho el
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

/* ── Fila de entregable, en versión compacta.
   El clip va al costado como prueba: en una landing de agencia audiovisual,
   describir el entregable con palabras y no mostrarlo es el peor argumento
   posible. La `etiqueta` dice qué es REALMENTE ese clip, para que un comercial
   no pase por un videocaso solo porque está al lado del texto. ── */
function Entregable({
  t,
  d,
  v,
  vertical,
  icono: Icono,
  etiqueta,
}: {
  t: string;
  d: string;
  v?: string;
  vertical?: boolean;
  icono?: (p: { className?: string }) => JSX.Element;
  etiqueta?: string;
}) {
  return (
    <div className="group flex gap-4 border-t border-cream/10 p-5 transition-colors duration-300 first:border-t-0 hover:bg-surface-2 md:p-6">
      {Icono && (
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-blue/25 bg-brand-blue/10 text-brand-blue transition-transform duration-300 group-hover:scale-105">
          <Icono className="h-[18px] w-[18px]" />
        </span>
      )}

      <div className="min-w-0 flex-1">
        <h4 className="font-display text-[15px] font-semibold leading-snug text-cream">{t}</h4>
        <p className="mt-1.5 font-body text-[13px] leading-relaxed text-muted">{d}</p>
      </div>

      {v && (
        <figure className={`shrink-0 ${vertical ? "w-16 md:w-20" : "w-24 md:w-28"}`}>
          <div className="overflow-hidden rounded-lg border border-cream/10 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand-blue/40">
            <div className={vertical ? "aspect-[9/16]" : "aspect-video"}>
              <LoopVideo src={v} vertical={vertical} />
            </div>
          </div>
          {etiqueta && (
            <figcaption className="mt-1.5 font-body text-[10px] leading-tight text-muted/70">
              {etiqueta}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  );
}

/* ── Contenido ─────────────────────────────────────────────── */

const BLOQUE_1 = [
  {
    t: "1 videocaso de 2 minutos",
    d: "Tu proyecto contado como caso: el reto del cliente, tu solución técnica, el resultado medible. Grabado en campo y potenciado con IA.",
    icono: Videocaso,
    v: "/videos/web/trad-comerciales-02.mp4",
    etiqueta: "Videocaso · Livoltek",
  },
  {
    t: "1 versión corta de 30 segundos",
    d: "Corte con gancho en los primeros 3 segundos, en vertical y horizontal. Para LinkedIn, pauta, WhatsApp comercial y las pantallas de tu stand.",
    icono: Vertical,
    v: "/videos/web/story-03.mp4",
    etiqueta: "Vertical · Wellmax",
    vertical: true,
  },
  {
    t: "8 imágenes profesionales con IA",
    d: "Tu equipo en contextos que no se pueden fotografiar: instalado, en corte técnico, a escala real. Para catálogo, fichas y propuestas.",
    icono: ImagenIA,
    v: "/videos/web/producto-02.mp4",
    etiqueta: "Producto generado con IA",
    vertical: true,
  },
];

const BLOQUE_2 = [
  {
    t: "1 video de feria o evento",
    d: "Registro del stand, las ponencias y las reuniones, editado como pieza recap que puedes enviar la misma semana.",
    icono: Stand,
  },
  {
    t: "Hasta 3 stories en vivo",
    d: "Cobertura en tiempo real durante el evento, publicada el mismo día. Los que no fueron ven que estuviste.",
    icono: EnVivo,
    v: "/videos/web/story-12.mp4",
    etiqueta: "Registro en obra",
    vertical: true,
  },
  {
    t: "Hasta 3 entrevistas a profesionales",
    d: "A tu gerente, tus ingenieros o los especialistas que te visitan. Preguntas dirigidas, no improvisadas.",
    icono: Entrevista,
    v: "/videos/web/story-04.mp4",
    etiqueta: "Vocero técnico",
    vertical: true,
  },
  {
    t: "Más de 15 fotografías profesionales",
    d: "Banco fotográfico editado: stand, equipo, producto, retratos corporativos y momentos de reunión.",
    icono: Foto,
  },
];

const PROBLEMAS = [
  {
    t: "Vendes con el catálogo del fabricante",
    d: "Los mismos renders y fichas que usan los otros distribuidores de tu marca. Nada ahí explica por qué el proyecto debería ser tuyo.",
    icono: Catalogo,
  },
  {
    t: "Tus mejores instalaciones no tienen registro",
    d: "La planta quedó operando y no te llevaste ni una toma. Cuando llega la siguiente licitación no tienes nada que mostrar.",
    icono: SinRegistro,
  },
  {
    t: "La feria se acaba y no queda nada",
    d: "Pagaste stand, pasajes y viáticos. Tres días después no hay un video, ni una entrevista, ni un banco de fotos.",
    icono: FeriaVacia,
  },
  {
    t: "Lo técnico se muere en la reunión",
    d: "Tu solución es mejor y sabes sustentarla. Pero quien firma no es el ingeniero, y lo que no se entiende rápido no se aprueba.",
    icono: Reunion,
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

/* Detalle operativo del servicio. Reemplaza a la tarjeta de precio: el monto
   cambia según alcance, sector y ciudad, así que publicarlo cerraba
   conversaciones antes de empezarlas. */
const DETALLE = [
  {
    t: "Dirección estratégica y creativa",
    d: "No recibes un proveedor que ejecuta pedidos. Definimos qué proyecto contar, con qué ángulo y para qué momento comercial.",
  },
  {
    t: "Preproducción completa",
    d: "Guion, storyboard, plan de rodaje, coordinación de accesos y permisos de seguridad con tu área de operaciones.",
  },
  {
    t: "Producción en campo",
    d: "Cámara profesional más equipo de celular para zonas restringidas. Equipo reducido, sin frenar tu operación.",
  },
  {
    t: "Postproducción integral",
    d: "Edición, generación de piezas con IA, corrección de color, sonido y musicalización.",
  },
  {
    t: "Entrega por formato y uso",
    d: "Carpeta organizada: horizontal para web y presentaciones, vertical para redes y pauta, cortes para WhatsApp comercial.",
  },
  {
    t: "Ajustes definidos",
    d: "Una ronda en estrategia y guion, hasta dos ajustes por pieza terminada. El alcance se cierra al inicio.",
  },
  {
    t: "Cobertura y traslados",
    d: "Lima Metropolitana incluida. Para obras, plantas o ferias fuera de Lima o del país, se cotizan pasajes y viáticos aparte.",
  },
  {
    t: "Uso declarado de IA",
    d: "Siempre te decimos qué elemento es generado. Nunca presentamos una simulación como si fuera registro real de tu obra.",
  },
];

const FAQ = [
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance: cuántas piezas al mes, si hay ferias en el calendario, cuántas sedes u obras hay que cubrir y en qué ciudad. Por eso no publicamos una tarifa fija — en el diagnóstico de 20 minutos definimos el alcance real y te enviamos la propuesta con el monto cerrado.",
  },
  {
    q: "¿Se nota que hay IA?",
    a: "No, porque no se usa para simular la realidad sino para mostrar lo que la cámara no alcanza y para elevar lo que sí se grabó. Lo que es registro real se graba. Y siempre te decimos qué elemento es generado — nunca presentamos una simulación como si fuera una foto de tu obra.",
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
      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-20 md:pt-40">
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
            Convertimos proyectos
            <br />
            en casos de éxito
            <br />
            <span className="text-brand-blue">que venden por ti.</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-muted md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
          >
            Videocasos y piezas comerciales potenciadas con IA que ponen al frente tus
            capacidades reales, tus resultados medibles y el impacto de lo que ejecutas.
            Con el alcance que una ficha técnica y un PDF nunca te van a dar.
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
            <span className="text-cream">
              WIN Internet · Livoltek · Wellmax · Smart System Perú
            </span>
          </motion.p>
        </div>
      </section>

      {/* ── MUESTRA COMO BANNER ──────────────────────────────
          Va pegada al hero, sin encabezado: es lo mejor que hay para mostrar y
          tiene que verse antes de que el visitante lea un solo argumento. ── */}
      <section className="border-b border-cream/10 pb-20 md:pb-24">
        <Cinta vertical clips={MUESTRA} />
        <motion.p
          className="container-base mx-auto mt-8 max-w-5xl px-6 text-center font-body text-sm text-muted"
          {...fadeUp}
        >
          Piezas producidas por Resuelto para clientes de energía e industria: voceros
          técnicos, producto generado con IA y registro en obra.
        </motion.p>
      </section>

      {/* ── EL SISTEMA ───────────────────────────────────── */}
      <section className="border-b border-cream/10 px-6 py-20 md:py-28">
        <div className="container-base mx-auto max-w-6xl">
          <Head
            n="01 · El sistema"
            title="Dos bloques, todos los meses."
            sub="Uno construye tu autoridad y te sirve todo el año. El otro convierte cada feria y cada obra en material que puedes usar la misma semana."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <motion.div
              className="overflow-hidden rounded-2xl border border-cream/10 bg-surface"
              {...fadeUp}
            >
              <div className="border-b border-cream/10 bg-brand-blue/[0.06] px-5 py-4 md:px-6">
                <span className="font-brand text-[11px] uppercase tracking-[0.22em] text-brand-blue">
                  Bloque 1
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-cream">
                  La pieza de autoridad
                </h3>
              </div>
              {BLOQUE_1.map((x) => (
                <Entregable key={x.t} {...x} />
              ))}
            </motion.div>

            <motion.div
              className="overflow-hidden rounded-2xl border border-cream/10 bg-surface"
              {...fadeUp}
            >
              <div className="border-b border-cream/10 bg-brand-blue/[0.06] px-5 py-4 md:px-6">
                <span className="font-brand text-[11px] uppercase tracking-[0.22em] text-brand-blue">
                  Bloque 2
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-cream">
                  Coberturas Resuelto
                </h3>
              </div>
              {BLOQUE_2.map((x) => (
                <Entregable key={x.t} {...x} />
              ))}
            </motion.div>
          </div>

          <motion.p className="mt-6 font-body text-sm text-muted" {...fadeUp}>
            Incluye dirección estratégica y creativa, una sesión mensual de revisión con tu
            equipo, y el banco de assets organizado y entregado.
          </motion.p>
        </div>
      </section>

      {/* ── VSL ──────────────────────────────────────────── */}
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
            Cómo se construye una pieza que mezcla grabación real con IA, y por qué eso
            cambia lo que puedes mostrarle a un cliente técnico.
          </motion.p>
        </div>
      </section>

      {/* ── EL MÉTODO ────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-cream/10 px-6 py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-blue/10 blur-[120px]"
        />
        <div className="container-base relative mx-auto max-w-4xl text-center">
          <motion.p className="font-brand text-xs uppercase tracking-[0.28em] text-brand-blue" {...fadeUp}>
            02 · El método
          </motion.p>
          <motion.h2
            className="mt-6 font-display text-3xl font-bold leading-[1.12] tracking-tight text-cream md:text-6xl"
            {...fadeUp}
          >
            Tus tomas reales,
            <br />
            <span className="text-brand-blue">potenciadas con IA.</span>
          </motion.h2>
          <motion.p className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-muted md:text-lg" {...fadeUp}>
            Grabamos tu operación como es: tu planta, tu obra, tu equipo, tu producto
            instalado. Eso es lo que da verdad a la pieza y no se reemplaza con nada.
          </motion.p>
          <motion.p className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-cream md:text-lg" {...fadeUp}>
            Después complementamos ese material con contenido generativo con IA — el corte
            por dentro del equipo, la escala real de la instalación, el plano que ninguna
            cámara podía tomar. El resultado es <strong className="font-semibold">una sola pieza,
            de un impacto que ninguna de las dos técnicas alcanza por separado</strong>, y que
            deja tus mejores capacidades al frente.
          </motion.p>

          {/* El método dibujado. Un diagrama propio lo explica mejor que un
              párrafo más, y no depende de tener el material perfecto. */}
          <motion.div className="mx-auto mt-14 max-w-xl" {...fadeUp}>
            <MetodoVisual className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* ── EL PROBLEMA ──────────────────────────────────── */}
      <section className="border-b border-cream/10 px-6 py-20 md:py-28">
        <div className="container-base mx-auto max-w-5xl">
          <Head
            n="03 · Por qué pasa"
            title="Cuatro formas de perder un proyecto que ya te habías ganado."
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {PROBLEMAS.map((p, i) => (
              <motion.div
                key={p.t}
                className="group relative overflow-hidden bg-surface p-7 transition-colors duration-300 hover:bg-surface-2 md:p-9"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
              >
                {/* Numeral enorme al fondo: da jerarquía sin ocupar espacio */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-cream/[0.04] transition-colors duration-500 group-hover:text-brand-blue/10"
                >
                  0{i + 1}
                </span>

                <span className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cream/12 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-blue/40 group-hover:text-brand-blue">
                  <p.icono className="h-6 w-6" />
                </span>
                <h3 className="relative font-display text-lg font-semibold text-cream transition-colors group-hover:text-brand-blue md:text-xl">
                  {p.t}
                </h3>
                <p className="relative mt-3 font-body text-sm leading-relaxed text-muted md:text-base">
                  {p.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────── */}
      {TESTIMONIOS.length > 0 && (
        <section className="border-b border-cream/10 px-6 py-20 md:py-28">
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

      {/* ── A QUIÉN LE HABLAMOS ──────────────────────────────
          Baja de posición: reconocer al lector ayuda, pero después de haberle
          mostrado el trabajo y el sistema. ── */}
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

      {/* ── PROCESO ──────────────────────────────────────── */}
      <section className="border-b border-cream/10 px-6 py-20 md:py-28">
        <div className="container-base mx-auto max-w-5xl">
          <Head n="05 · Cómo funciona" title="Cuatro etapas. Sin misterio." />

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
      <section className="border-b border-cream/10 px-6 py-20 md:py-28">
        <div className="container-base mx-auto max-w-5xl">
          <Head n="06 · Filtro" title="Esto no es para todos." />
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

      {/* ── EL SERVICIO EN DETALLE ───────────────────────────
          Reemplaza a la tarjeta de precio. El monto cambia por alcance, sector
          y ciudad, así que publicarlo cerraba conversaciones antes de
          empezarlas: aquí se explica qué entra, y el número sale del
          diagnóstico. ── */}
      <section className="border-b border-cream/10 px-6 py-20 md:py-28">
        <div className="container-base mx-auto max-w-5xl">
          <Head
            n="07 · El servicio en detalle"
            title="Qué entra, exactamente."
            sub="Un servicio mensual con permanencia mínima de tres meses, dirigido de punta a punta. Esto es lo que incluye más allá de los entregables."
          />

          <div className="grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {DETALLE.map((d) => (
              <motion.div key={d.t} className="group bg-surface p-6 transition-colors duration-300 hover:bg-surface-2 md:p-7" {...fadeUp}>
                <h3 className="flex items-start gap-3 font-display text-base font-semibold text-cream">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue transition-transform duration-300 group-hover:scale-125" />
                  {d.t}
                </h3>
                <p className="mt-2.5 pl-7 font-body text-sm leading-relaxed text-muted">{d.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-6 rounded-2xl border border-brand-blue/30 bg-surface-2 p-8 md:p-10"
            {...fadeUp}
          >
            <h3 className="font-display text-xl font-bold text-cream md:text-2xl">
              La inversión se define por alcance.
            </h3>
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-muted">
              No publicamos una tarifa fija porque no la hay: cambia según cuántas piezas
              necesitas al mes, si hay ferias en tu calendario, cuántas sedes u obras hay
              que cubrir y en qué ciudad están. Cada bloque también se puede contratar por
              separado — una feria puntual, un videocaso para una licitación, un banco de
              imágenes para el catálogo.
            </p>
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-cream">
              En el diagnóstico de 20 minutos definimos el alcance real y te enviamos la
              propuesta con el monto cerrado. Sin sorpresas después.
            </p>
            <div className="mt-8">
              <Cta label="Pedir mi propuesta" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="border-b border-cream/10 px-6 py-20 md:py-28">
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
          <LoopVideo src="/videos/web/trad-comerciales-02.mp4" className="opacity-20" />
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
            Y quien lo gane no va a ser necesariamente el que tenga el mejor equipo, sino el
            que lo sepa demostrar. Agenda 20 minutos: revisamos cuál de tus instalaciones
            vale la pena contar y te entregamos el mapa de piezas — trabajemos juntos o no.
          </motion.p>
          <motion.div className="mt-10 flex justify-center" {...fadeUp}>
            <Cta />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
