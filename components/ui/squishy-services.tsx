"use client";

import { motion } from "framer-motion";
import type { ComponentType, CSSProperties } from "react";

/* Tarjeta "squishy": el fondo SVG se deforma al pasar el mouse y el título
   crece desde su esquina superior izquierda. Adaptada del patrón de tarjetas
   de precio, pero SIN precio — acá el protagonista es el nombre del servicio.

   Paleta de marca: crema, marrón y azul. La crema es un fondo claro, así que
   la tarjeta necesita saber su tono para invertir texto, botón y figuras;
   con texto blanco sobre crema no se leería nada.

   Las figuras del fondo se pintan con `var(--figura)`, que cada tarjeta
   define según su tono. Así el mismo SVG sirve para fondo claro y oscuro. */

export type SquishyItem = {
  etiqueta: string;
  titulo: string;
  descripcion: string;
  cta: string;
  href: string;
  /* Clase Tailwind del fondo de la tarjeta. */
  fondo: string;
  /* "claro" = fondo claro con texto oscuro. */
  tono: "claro" | "oscuro";
  Fondo: ComponentType;
};

export function SquishyServices({ items }: { items: SquishyItem[] }) {
  return (
    <div className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-5">
      {items.map((item) => (
        <SquishyCard key={item.titulo} {...item} />
      ))}
    </div>
  );
}

function SquishyCard({ etiqueta, titulo, descripcion, cta, href, fondo, tono, Fondo }: SquishyItem) {
  const claro = tono === "claro";

  return (
    <motion.a
      href={href}
      initial="reposo"
      whileHover="hover"
      transition={{ duration: 1, ease: "backInOut" }}
      /* Cada figura declara SUS DOS estados (reposo y hover). Sin el de
         reposo, framer no tiene desde dónde interpolar y las formas del
         fondo no se animan. */
      variants={{ reposo: { scale: 1 }, hover: { scale: 1.04 } }}
      style={{ ["--figura" as string]: claro ? "rgba(26,24,16,0.10)" : "rgba(244,240,222,0.13)" } as CSSProperties}
      className={`relative block h-[23rem] w-[19rem] shrink-0 overflow-hidden rounded-2xl p-7 ${fondo} shadow-lg transition-shadow duration-300 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg`}
    >
      <div className={`relative z-10 ${claro ? "text-[#1A1810]" : "text-cream"}`}>
        <span
          className={`mb-3 block w-fit rounded-full border px-3 py-0.5 font-brand text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm ${
            claro
              ? "border-[#1A1810]/20 bg-[#1A1810]/10 text-[#1A1810]"
              : "border-cream/25 bg-cream/15 text-cream"
          }`}
        >
          {etiqueta}
        </span>
        <motion.span
          variants={{ reposo: { scale: 0.85 }, hover: { scale: 1 } }}
          transition={{ duration: 1, ease: "backInOut" }}
          className="my-2 block origin-top-left font-display text-[2.1rem] font-black leading-[1.1] tracking-tight"
        >
          {titulo}
        </motion.span>
        <p className={`mt-3 font-body text-[15px] leading-relaxed ${claro ? "text-[#1A1810]/80" : "text-cream/85"}`}>
          {descripcion}
        </p>
      </div>

      {/* Se mantiene como <span>: la tarjeta entera ya es el enlace, y un
          <button> o <a> anidado sería un objetivo dentro de otro. */}
      <span
        className={`absolute bottom-5 left-5 right-5 z-20 block rounded-lg py-2.5 text-center font-brand text-xs font-black uppercase tracking-wider ${
          claro ? "bg-[#1A1810] text-[#F4F0DE]" : "bg-cream text-[#1A1810]"
        }`}
      >
        {cta}
      </span>

      <Fondo />
    </motion.a>
  );
}

/* ── Fondos animados ──────────────────────────────────────────────── */

const FIGURA = "var(--figura)";

export const FondoCirculos = () => (
  <motion.svg
    width="320"
    height="384"
    viewBox="0 0 320 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ reposo: { scale: 1 }, hover: { scale: 1.5 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0"
    aria-hidden="true"
  >
    <motion.circle
      variants={{ reposo: { scaleY: 1, y: 0 }, hover: { scaleY: 0.5, y: -25 } }}
      transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
      cx="160.5"
      cy="114.5"
      r="101.5"
      fill={FIGURA}
    />
    <motion.ellipse
      variants={{ reposo: { scaleY: 1, y: 0 }, hover: { scaleY: 2.25, y: -25 } }}
      transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
      cx="160.5"
      cy="265.5"
      rx="101.5"
      ry="43.5"
      fill={FIGURA}
    />
  </motion.svg>
);

export const FondoBloques = () => (
  <motion.svg
    width="320"
    height="384"
    viewBox="0 0 320 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ reposo: { scale: 1 }, hover: { scale: 1.05 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0"
    aria-hidden="true"
  >
    <motion.rect
      x="14"
      width="153"
      height="153"
      rx="15"
      fill={FIGURA}
      variants={{ reposo: { y: 12, rotate: "0deg", scaleX: 1 }, hover: { y: 219, rotate: "90deg", scaleX: 2 } }}
      transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
    />
    <motion.rect
      x="155"
      width="153"
      height="153"
      rx="15"
      fill={FIGURA}
      variants={{ reposo: { y: 219, rotate: "0deg", scaleX: 1 }, hover: { y: 12, rotate: "90deg", scaleX: 2 } }}
      transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
    />
  </motion.svg>
);

export const FondoCapas = () => (
  <motion.svg
    width="320"
    height="384"
    viewBox="0 0 320 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ reposo: { scale: 1 }, hover: { scale: 1.25 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0"
    aria-hidden="true"
  >
    <motion.path
      variants={{ reposo: { y: 0 }, hover: { y: -50 } }}
      transition={{ delay: 0.3, duration: 1, ease: "backInOut" }}
      d="M148.893 157.531C154.751 151.673 164.249 151.673 170.107 157.531L267.393 254.818C273.251 260.676 273.251 270.173 267.393 276.031L218.75 324.674C186.027 357.397 132.973 357.397 100.25 324.674L51.6068 276.031C45.7489 270.173 45.7489 260.676 51.6068 254.818L148.893 157.531Z"
      fill={FIGURA}
    />
    <motion.path
      variants={{ reposo: { y: 0 }, hover: { y: -50 } }}
      transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
      d="M148.893 99.069C154.751 93.2111 164.249 93.2111 170.107 99.069L267.393 196.356C273.251 202.213 273.251 211.711 267.393 217.569L218.75 266.212C186.027 298.935 132.973 298.935 100.25 266.212L51.6068 217.569C45.7489 211.711 45.7489 202.213 51.6068 196.356L148.893 99.069Z"
      fill={FIGURA}
    />
    <motion.path
      variants={{ reposo: { y: 0 }, hover: { y: -50 } }}
      transition={{ delay: 0.1, duration: 1, ease: "backInOut" }}
      d="M148.893 40.6066C154.751 34.7487 164.249 34.7487 170.107 40.6066L267.393 137.893C273.251 143.751 273.251 153.249 267.393 159.106L218.75 207.75C186.027 240.473 132.973 240.473 100.25 207.75L51.6068 159.106C45.7489 153.249 45.7489 143.751 51.6068 137.893L148.893 40.6066Z"
      fill={FIGURA}
    />
  </motion.svg>
);
