// ============================================================
// COTIZACIÓN — servicios, tramos y códigos de WhatsApp
//
// Fuente única para el formulario /cotizar, la página de gracias y la
// medición de los botones de WhatsApp (components/WhatsAppMeasurement).
// Brief de Roberth del 2-nov-2026: separar cotización de consulta y medir
// cotizaciones reales para pasar las campañas a «Maximizar conversiones».
//
// Nada de esto lleva datos personales: los códigos y parámetros solo
// dicen servicio, ubicación del botón y origen de la visita.
// ============================================================

import { SERVICIOS } from "@/lib/servicios";

export type ServicioKey =
  | "google_ads"
  | "seo"
  | "paginas_web"
  | "ecommerce"
  | "spot_ia"
  | "eventos"
  | "videojuegos"
  | "capacitacion_ia";

type ServicioCotizable = {
  key: ServicioKey; // valor del parámetro `servicio` en GA4
  slug: string; // ?servicio= de /cotizar
  pagina: string; // id de /servicios/[id]
  codigo: string; // código del mensaje de WhatsApp: [SPOT-IA]
  corto: string; // código de origen: [G-SPOT]
};

const BASE: ServicioCotizable[] = [
  { key: "spot_ia", slug: "spot-ia", pagina: "spot-publicitario-ia", codigo: "SPOT-IA", corto: "SPOT" },
  { key: "paginas_web", slug: "paginas-web", pagina: "diseno-paginas-web", codigo: "WEB", corto: "WEB" },
  { key: "eventos", slug: "eventos", pagina: "eventos-corporativos", codigo: "EVENTOS", corto: "EVENTOS" },
  { key: "ecommerce", slug: "ecommerce", pagina: "tienda-virtual", codigo: "ECOM", corto: "ECOM" },
  { key: "videojuegos", slug: "videojuegos", pagina: "videojuegos-a-medida", codigo: "JUEGOS", corto: "JUEGOS" },
  { key: "google_ads", slug: "google-ads", pagina: "google-ads", codigo: "GADS", corto: "GADS" },
  { key: "seo", slug: "seo", pagina: "posicionamiento-seo", codigo: "SEO", corto: "SEO" },
  { key: "capacitacion_ia", slug: "capacitacion-ia", pagina: "capacitacion-ia", codigo: "CAPACITA-IA", corto: "CAPACITA" },
];

export const SERVICIOS_COTIZAR = BASE.map((s) => ({
  ...s,
  label: SERVICIOS.find((x) => x.id === s.pagina)?.title ?? s.slug,
}));

export type ServicioCotizar = (typeof SERVICIOS_COTIZAR)[number];

/** Acepta el slug corto (spot-ia), la key (spot_ia) o el id de la página. */
export function servicioPor(valor: string | null | undefined): ServicioCotizar | undefined {
  if (!valor) return undefined;
  const v = valor.trim().toLowerCase();
  return SERVICIOS_COTIZAR.find((s) => s.slug === v || s.key === v || s.pagina === v);
}

export const cotizarHref = (pagina: string) => {
  const s = servicioPor(pagina);
  return s ? `/cotizar?servicio=${s.slug}` : "/cotizar";
};

// ── Rango de presupuesto ─────────────────────────────────────
// 4 tramos por servicio + «Aún no lo sé» (lead tibio). LOS MONTOS LOS
// DEFINE MANUEL: no inventar cifras. `valor` (PEN) es opcional y va como
// `value` del evento generate_lead para que Google distinga leads.
export type Tramo = { id: string; label: string; valor?: number };

export const TRAMOS: Record<ServicioKey, Tramo[]> = {
  spot_ia: [],
  paginas_web: [],
  eventos: [],
  ecommerce: [],
  videojuegos: [],
  google_ads: [],
  seo: [],
  capacitacion_ia: [],
};

export const NO_SE: Tramo = { id: "no_se", label: "Aún no lo sé" };

export const tramosDe = (key: ServicioKey): Tramo[] => [...TRAMOS[key], NO_SE];

export const PLAZOS = [
  { id: "este_mes", label: "Este mes" },
  { id: "1_3_meses", label: "En 1 a 3 meses" },
  { id: "averiguando", label: "Solo estoy averiguando" },
] as const;

// ── Teléfono ─────────────────────────────────────────────────
// Perú por defecto (móvil de 9 dígitos que empieza en 9). Colombia queda
// como opción porque una de las campañas corre allá.
export const PAISES = [
  { id: "51", label: "Perú +51", re: /^9\d{8}$/, ejemplo: "987 654 321" },
  { id: "57", label: "Colombia +57", re: /^3\d{9}$/, ejemplo: "301 234 5678" },
] as const;

export function telefonoValido(pais: string, numero: string): string | null {
  const p = PAISES.find((x) => x.id === pais);
  const digitos = numero.replace(/\D/g, "").replace(new RegExp(`^${pais}`), "");
  if (!p || !p.re.test(digitos)) return null;
  return `+${pais}${digitos}`;
}

// ── WhatsApp: tipo de botón, servicio y códigos ──────────────
export type TipoWhatsApp = "cotizar" | "consulta";

// Páginas que no son de servicio pero tienen su propio embudo.
const OTRAS: { prefijo: string; key: string; codigo: string; corto: string }[] = [
  { prefijo: "/masterclass", key: "academy", codigo: "ACADEMY", corto: "ACAD" },
  { prefijo: "/empezar", key: "academy", codigo: "ACADEMY", corto: "ACAD" },
  { prefijo: "/energia", key: "venta_visual", codigo: "VISUAL", corto: "VISUAL" },
  { prefijo: "/produccion-ia", key: "produccion_ia", codigo: "PROD-IA", corto: "PROD" },
];

/** Servicio de un botón: su data-service o, si no, la página donde está. */
export function servicioDeBoton(dataService: string | undefined, pathname: string) {
  const s = servicioPor(dataService) ?? servicioPor(pathname.match(/^\/servicios\/([^/]+)/)?.[1]);
  if (s) return { key: s.key as string, codigo: s.codigo, corto: s.corto, label: s.label };
  const o = OTRAS.find((x) => pathname.startsWith(x.prefijo));
  if (o) return { key: o.key, codigo: o.codigo, corto: o.corto, label: "" };
  return { key: "general", codigo: "GENERAL", corto: "GEN", label: "" };
}

/** data-loc de cada botón → hero, cuerpo, cierre, flotante o menu. */
export function ubicacionBoton(dataLoc: string | undefined): string {
  if (!dataLoc) return "cuerpo";
  if (dataLoc === "hero" || dataLoc === "cierre" || dataLoc === "flotante") return dataLoc;
  if (dataLoc.startsWith("header")) return "menu";
  return "cuerpo";
}

// ── Origen de la visita (utm_campaign / gclid) ───────────────
// Se guarda en sessionStorage al llegar, porque la persona navega antes
// de escribir. Solo se guarda una letra de origen y la campaña.
const ORIGEN_KEY = "rs-origen";
type Origen = { letra: string; source: string; campaign: string; gclid: boolean };

export function registrarOrigen(search: string) {
  const p = new URLSearchParams(search);
  const gclid = !!(p.get("gclid") || p.get("gbraid") || p.get("wbraid"));
  const campaign = (p.get("utm_campaign") || "").slice(0, 80);
  if (!gclid && !campaign) return;
  const source = (p.get("utm_source") || "").toLowerCase().slice(0, 40);
  const letra =
    gclid || /google|adwords/.test(source) ? "G"
    : /facebook|instagram|meta|^fb|^ig/.test(source) ? "M"
    : /tiktok/.test(source) ? "T"
    : "C";
  try {
    sessionStorage.setItem(ORIGEN_KEY, JSON.stringify({ letra, source, campaign, gclid } satisfies Origen));
  } catch {}
}

export function leerOrigen(): Origen | null {
  try {
    const raw = sessionStorage.getItem(ORIGEN_KEY);
    return raw ? (JSON.parse(raw) as Origen) : null;
  } catch {
    return null;
  }
}

/** «[SPOT-IA]» y, si la visita vino de una campaña, «[G-SPOT]». */
export function codigosWhatsApp(codigo: string, corto: string): string {
  const o = leerOrigen();
  return `[${codigo}]${o ? ` [${o.letra}-${corto}]` : ""}`;
}

export function mensajePorDefecto(tipo: TipoWhatsApp, label: string): string {
  if (tipo === "cotizar") return label ? `Hola, quiero cotizar ${label}.` : "Hola, quiero cotizar un proyecto.";
  return label ? `Hola, tengo una consulta sobre ${label}.` : "Hola, tengo una consulta.";
}
