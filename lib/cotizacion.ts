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

// ── Presupuesto aproximado ───────────────────────────────────
// Barra en dólares: arranca en USD 1,500 y llega a «Más de USD 100,000»
// (decisión de Manuel, 3-nov-2026). Los pasos crecen con el monto para que
// la barra se pueda usar en el celular. «Aún no lo sé» = lead tibio.
const PASOS_USD = [
  1500, 2000, 2500, 3000, 4000, 5000, 6000, 7500, 10000, 12500, 15000, 20000,
  25000, 30000, 40000, 50000, 60000, 75000, 100000,
];

export type Presupuesto = { id: string; label: string };

export const PRESUPUESTOS: Presupuesto[] = [
  ...PASOS_USD.map((n) => ({ id: String(n), label: `USD ${n.toLocaleString("en-US")}` })),
  { id: "100000+", label: "Más de USD 100,000" },
];

export const NO_SE: Presupuesto = { id: "no_se", label: "Aún no lo sé" };

export const presupuestoPor = (id: string | null | undefined): Presupuesto | undefined =>
  id === NO_SE.id ? NO_SE : PRESUPUESTOS.find((p) => p.id === id);

export const PLAZOS = [
  { id: "este_mes", label: "Este mes" },
  { id: "1_3_meses", label: "En 1 a 3 meses" },
  { id: "averiguando", label: "Solo estoy averiguando" },
] as const;

// ── Teléfono ─────────────────────────────────────────────────
// Perú por defecto (móvil de 9 dígitos que empieza en 9). Cada país valida
// su formato de celular; «Otro país» pide el número con su código.
export const PAISES = [
  { id: "pe", cod: "51", label: "Perú", re: /^9\d{8}$/, ejemplo: "987 654 321" },
  { id: "co", cod: "57", label: "Colombia", re: /^3\d{9}$/, ejemplo: "301 234 5678" },
  { id: "cl", cod: "56", label: "Chile", re: /^9\d{8}$/, ejemplo: "9 1234 5678" },
  { id: "mx", cod: "52", label: "México", re: /^\d{10}$/, ejemplo: "55 1234 5678" },
  { id: "ec", cod: "593", label: "Ecuador", re: /^9\d{8}$/, ejemplo: "99 123 4567" },
  { id: "ar", cod: "54", label: "Argentina", re: /^9?\d{10}$/, ejemplo: "11 2345 6789" },
  { id: "bo", cod: "591", label: "Bolivia", re: /^[67]\d{7}$/, ejemplo: "7123 4567" },
  { id: "ve", cod: "58", label: "Venezuela", re: /^4\d{9}$/, ejemplo: "412 123 4567" },
  { id: "pa", cod: "507", label: "Panamá", re: /^6\d{7}$/, ejemplo: "6123 4567" },
  { id: "cr", cod: "506", label: "Costa Rica", re: /^[5-8]\d{7}$/, ejemplo: "8123 4567" },
  { id: "gt", cod: "502", label: "Guatemala", re: /^\d{8}$/, ejemplo: "5123 4567" },
  { id: "do", cod: "1", label: "Rep. Dominicana", re: /^8[024]9\d{7}$/, ejemplo: "809 123 4567" },
  { id: "uy", cod: "598", label: "Uruguay", re: /^9\d{7}$/, ejemplo: "94 123 456" },
  { id: "py", cod: "595", label: "Paraguay", re: /^9\d{8}$/, ejemplo: "981 123 456" },
  { id: "us", cod: "1", label: "EE. UU.", re: /^\d{10}$/, ejemplo: "305 123 4567" },
  { id: "es", cod: "34", label: "España", re: /^[67]\d{8}$/, ejemplo: "612 345 678" },
  { id: "otro", cod: "", label: "Otro país", re: /^\d{8,15}$/, ejemplo: "Código de país + número" },
] as const;

/** Número en formato internacional (+51987654321) o null si no es válido. */
export function telefonoValido(pais: string, numero: string): string | null {
  const p = PAISES.find((x) => x.id === pais);
  if (!p) return null;
  let digitos = numero.replace(/\D/g, "");
  // Si la persona escribió el código de país, se quita.
  if (p.cod && digitos.startsWith(p.cod) && p.re.test(digitos.slice(p.cod.length))) {
    digitos = digitos.slice(p.cod.length);
  }
  if (!p.re.test(digitos)) return null;
  return `+${p.cod}${digitos}`;
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
// de escribir. Se guarda la letra de origen, la campaña y el ID del clic
// de Google (gclid, gbraid o wbraid): con ese ID el pedido se puede subir
// a Google Ads como conversión offline aunque la persona no acepte cookies
// (10-nov-2026: GA4 veía 14 de ~85 clics pagados). El ID es un código
// técnico del anuncio, no un dato personal.
const ORIGEN_KEY = "rs-origen";
type Origen = {
  letra: string;
  source: string;
  campaign: string;
  gclid: boolean;
  /** Valor del ID de clic de Google, si lo hubo. */
  clickId?: string;
  /** gclid | gbraid | wbraid */
  clickTipo?: string;
  term?: string;
  /** Página donde aterrizó desde el anuncio. */
  landing?: string;
};

export function registrarOrigen(search: string, pathname = "") {
  const p = new URLSearchParams(search);
  const clickTipo = (["gclid", "gbraid", "wbraid"] as const).find((k) => p.get(k));
  const clickId = clickTipo ? (p.get(clickTipo) || "").slice(0, 200) : "";
  const gclid = !!clickId;
  const campaign = (p.get("utm_campaign") || "").slice(0, 80);
  if (!gclid && !campaign) return;
  const source = (p.get("utm_source") || "").toLowerCase().slice(0, 40);
  const letra =
    gclid || /google|adwords/.test(source) ? "G"
    : /facebook|instagram|meta|^fb|^ig/.test(source) ? "M"
    : /tiktok/.test(source) ? "T"
    : "C";
  const origen: Origen = {
    letra,
    source,
    campaign,
    gclid,
    clickId: clickId || undefined,
    clickTipo: clickTipo || undefined,
    term: (p.get("utm_term") || "").slice(0, 80) || undefined,
    landing: pathname.slice(0, 200) || undefined,
  };
  try {
    sessionStorage.setItem(ORIGEN_KEY, JSON.stringify(origen));
    // Copia de 90 días: si vuelve otro día por su cuenta y cotiza, el clic
    // del anuncio sigue siendo el origen (ventana de conversión de Ads).
    localStorage.setItem(ORIGEN_KEY, JSON.stringify({ ...origen, ts: Date.now() }));
  } catch {}
}

const NOVENTA_DIAS = 90 * 24 * 60 * 60 * 1000;

export function leerOrigen(): Origen | null {
  try {
    const raw = sessionStorage.getItem(ORIGEN_KEY);
    if (raw) return JSON.parse(raw) as Origen;
    const guardado = localStorage.getItem(ORIGEN_KEY);
    if (!guardado) return null;
    const o = JSON.parse(guardado) as Origen & { ts?: number };
    if (!o.ts || Date.now() - o.ts > NOVENTA_DIAS) return null;
    return o;
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
