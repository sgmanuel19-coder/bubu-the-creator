"use client";

/**
 * Set de iconos propio para la landing /energia.
 *
 * Son SVG dibujados a medida, no una librería: los packs genéricos no tienen
 * inversor, medidor ni stand de feria, y lo que sí tienen (un rayo, un foco)
 * dice "energía" de forma tan vaga que no aporta nada. Aquí cada trazo
 * representa una cosa concreta que el lector reconoce de su propio negocio.
 *
 * Reglas del set:
 * - Todos comparten viewBox 0 0 24 24 y trazo de 1.5 — así se ven de la misma
 *   familia aunque el dibujo cambie.
 * - Heredan el color con `currentColor`, para que el contenedor decida.
 * - `aria-hidden`: acompañan a un texto que ya dice lo mismo.
 */

type Props = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* ── Sector ─────────────────────────────────────────────── */

export function PanelSolar({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 14h18l-1.6-8H4.6L3 14Z" />
      <path d="M9.2 6 8.4 14M14.8 6l.8 8M3.8 10h16.4" />
      <path d="M12 14v6M9 20h6" />
    </svg>
  );
}

export function Inversor({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h3M8 11h3" />
      <path d="M14.5 7.5 12.8 12h2.6l-1.7 4.5" />
      <circle cx="9" cy="16.5" r="1.2" />
    </svg>
  );
}

export function Bateria({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="7" width="16" height="11" rx="2" />
      <path d="M22 11v3" />
      <path d="M6.5 10.5v4M10 10.5v4M13.5 10.5v4" />
    </svg>
  );
}

export function Medidor({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12l4-2.8" />
      <path d="M5.6 15.5A7.3 7.3 0 0 1 12 4.7a7.3 7.3 0 0 1 6.4 10.8" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

export function TorreElectrica({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2v20" />
      <path d="M6 22 12 6l6 16" />
      <path d="M8.2 14h7.6M9.5 9.5h5" />
      <path d="M4 8h4M16 8h4" />
    </svg>
  );
}

export function Casco({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 17h17" />
      <path d="M5 17v-1.5a7 7 0 0 1 14 0V17" />
      <path d="M10 8.6V5.4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3.2" />
    </svg>
  );
}

/* ── Entregables ────────────────────────────────────────── */

export function Videocaso({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="5" width="14" height="14" rx="2" />
      <path d="m16.5 10.5 5-2.8v8.6l-5-2.8" />
      <path d="m8 10 3.2 2L8 14v-4Z" />
    </svg>
  );
}

export function Vertical({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10.5 9.5 14 12l-3.5 2.5v-5Z" />
      <path d="M11 5h2" />
    </svg>
  );
}

export function ImagenIA({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="m3.5 15 4.5-4 3 2.6 3.5-3.4L20.5 15" />
      <circle cx="8.5" cy="8.5" r="1.3" />
      <path d="M18.5 2.5v3M17 4h3" />
    </svg>
  );
}

export function Stand({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8h18l-1.4-4H4.4L3 8Z" />
      <path d="M5 8v12M19 8v12" />
      <path d="M8.5 20v-6h7v6" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function EnVivo({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4" />
      <path d="M5 5a10 10 0 0 0 0 14M19 19a10 10 0 0 0 0-14" />
    </svg>
  );
}

export function Entrevista({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="9.5" y="2.5" width="5" height="10" rx="2.5" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4M9 21h6" />
    </svg>
  );
}

export function Foto({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8.5h3.2L8 5.5h8l1.8 3H21v11H3v-11Z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}

/* ── Proceso ────────────────────────────────────────────── */

export function Diagnostico({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
      <path d="M10.5 7.5v6M7.5 10.5h6" />
    </svg>
  );
}

export function Guion({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M5 3h10l4 4v14H5V3Z" />
      <path d="M15 3v4h4" />
      <path d="M8.5 12h7M8.5 15.5h7M8.5 8.5h3" />
    </svg>
  );
}

export function Camara({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="7" width="13" height="10" rx="2" />
      <path d="m15.5 11 6-3v8l-6-3" />
      <circle cx="6" cy="12" r="1.2" />
    </svg>
  );
}

export function Entrega({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
      <path d="m3 12 9 4.5L21 12" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </svg>
  );
}

/* ── Problema ──────────────────────────────────────────── */

export function Catalogo({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M4 4.5h6a2 2 0 0 1 2 2v13a2.4 2.4 0 0 0-2-1.5H4v-13Z" />
      <path d="M20 4.5h-6a2 2 0 0 0-2 2v13a2.4 2.4 0 0 1 2-1.5h6v-13Z" />
      <path d="M6.5 8.5h3M14.5 8.5h3M6.5 11.5h3M14.5 11.5h3" />
    </svg>
  );
}

export function SinRegistro({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8.5h3.2L8 5.5h5.5" />
      <path d="M3 8.5v11h18v-8" />
      <circle cx="12" cy="13.5" r="3.2" />
      <path d="m3.5 3.5 17 17" />
    </svg>
  );
}

export function FeriaVacia({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8h18l-1.4-4H4.4L3 8Z" />
      <path d="M5 8v12M19 8v12M3 20h18" />
      <path d="M9.5 13.5h5M12 11v5" strokeDasharray="2 2.5" />
    </svg>
  );
}

export function Reunion({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8" r="2.5" />
      <path d="M3.5 18a4.5 4.5 0 0 1 9 0M11.5 18a4.5 4.5 0 0 1 9 0" />
      <path d="M12 21v-1" />
    </svg>
  );
}

/* ── Filtro ─────────────────────────────────────────────── */

export function Check({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function Cruz({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
