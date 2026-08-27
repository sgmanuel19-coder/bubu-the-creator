import "server-only";

import {
  FEEDS_SOLO_IA,
  FUENTES,
  TERMINOS_IA,
  TERMINOS_SECCION,
  VETO,
  type Fuente,
  type Seccion,
} from "@/lib/noticias/fuentes";

// ============================================================
// RADAR IA — motor del portal
// Lee los feeds RSS/Atom, normaliza, aplica la línea editorial
// (ver fuentes.ts) y devuelve la portada ya armada.
//
// Todo corre en el servidor con ISR: la página se regenera sola
// cada REVALIDAR_SEGUNDOS sin que nadie toque nada. Si una fuente
// se cae, se ignora esa y el portal sigue saliendo.
// ============================================================

/** 6 horas: el portal nunca queda más de eso desactualizado. */
export const REVALIDAR_SEGUNDOS = 21_600;

/**
 * Etiqueta del Data Cache de los feeds RSS.
 * El cron diario tiene que invalidar ESTO, no solo la ruta: cada
 * fetch de RSS guarda su XML por REVALIDAR_SEGUNDOS por su cuenta,
 * así que un revalidatePath a secas re-renderiza la página con el
 * XML viejo y el portal se ve igual de desactualizado que antes.
 */
export const TAG_FEEDS = "noticias-feeds";

/** Cuántos ítems miramos por fuente antes de filtrar. */
const MAX_POR_FUENTE = 30;

/** Nada más viejo que esto entra a la portada. Un portal de noticias
 *  con notas de hace tres semanas no es un portal de noticias. */
const DIAS_MAXIMOS = 7;

export type Noticia = {
  id: string;
  titulo: string;
  extracto: string;
  url: string;
  imagen: string | null;
  fecha: Date;
  fuente: Fuente;
  seccion: Seccion;
  /** Cuántas señales del oficio encontró el clasificador. */
  puntaje: number;
  /**
   * Otros medios que publicaron la misma nota. Antes se tiraban a la
   * basura; son la mejor señal de importancia que tiene un agregador
   * (es el "More:" de Techmeme). Que tres medios cubran algo dice
   * más que cualquier peso que le asignemos a mano a una fuente.
   */
  tambienEn: { fuente: Fuente; url: string }[];
};

export type Portada = {
  principal: Noticia | null;
  destacadas: Noticia[];
  resto: Noticia[];
  porSeccion: { seccion: Seccion; noticias: Noticia[] }[];
  /**
   * TODAS las publicables, sin los recortes de la portada
   * (`resto` va topado en 40 y cada sección en 8). Es lo que se
   * manda al archivo: si guardáramos solo lo que se ve, las notas
   * que quedaron fuera del corte se perderían igual.
   */
  todas: Noticia[];
  total: number;
  fuentesVivas: number;
  fuentesTotales: number;
  actualizado: Date;
};

// ── Utilidades de texto ───────────────────────────────────────

const ENTIDADES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’", mdash: "—",
  ndash: "–", hellip: "…", eacute: "é", aacute: "á", iacute: "í",
  oacute: "ó", uacute: "ú", ntilde: "ñ",
};

function decodificar(texto: string): string {
  return texto
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTIDADES[n.toLowerCase()] ?? m);
}

function limpiarHtml(texto: string): string {
  return decodificar(
    texto
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** minúsculas + sin tildes, para comparar contra el vocabulario. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function recortar(texto: string, max: number): string {
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max);
  const ultimo = corte.lastIndexOf(" ");
  return (ultimo > max * 0.6 ? corte.slice(0, ultimo) : corte).trimEnd() + "…";
}

// ── Parser RSS 2.0 + Atom ─────────────────────────────────────

function extraerTag(bloque: string, ...tags: string[]): string {
  for (const tag of tags) {
    const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i");
    const m = bloque.match(re);
    if (m?.[1]) {
      const crudo = m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
      if (crudo) return crudo;
    }
  }
  return "";
}

function extraerEnlace(bloque: string): string {
  // Atom: <link href="..." rel="alternate"/>
  const atom =
    bloque.match(/<link[^>]+rel=["']alternate["'][^>]*href=["']([^"']+)["']/i) ??
    bloque.match(/<link[^>]+href=["']([^"']+)["'][^>]*\/>/i);
  if (atom?.[1]) return decodificar(atom[1]);
  // RSS: <link>...</link>
  const rss = extraerTag(bloque, "link");
  if (rss && /^https?:/i.test(rss)) return decodificar(rss);
  const guid = extraerTag(bloque, "guid");
  return /^https?:/i.test(guid) ? decodificar(guid) : "";
}

function extraerImagen(bloque: string): string | null {
  const candidatos = [
    bloque.match(/<media:content[^>]+url=["']([^"']+)["']/i),
    bloque.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i),
    bloque.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image\//i),
    bloque.match(/<itunes:image[^>]+href=["']([^"']+)["']/i),
    bloque.match(/<img[^>]+src=["']([^"']+)["']/i),
  ];
  for (const m of candidatos) {
    if (m?.[1]) {
      const url = decodificar(m[1]);
      if (/^https:\/\//i.test(url)) return url;
    }
  }
  return null;
}

function parsearFeed(xml: string, fuente: Fuente): Noticia[] {
  const bloques =
    xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ??
    xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) ??
    [];

  const limite = Date.now() - DIAS_MAXIMOS * 86_400_000;
  const salida: Noticia[] = [];

  for (const bloque of bloques.slice(0, MAX_POR_FUENTE)) {
    const titulo = limpiarHtml(extraerTag(bloque, "title"));
    const url = extraerEnlace(bloque);
    if (!titulo || !url) continue;

    const fechaTexto = extraerTag(bloque, "pubDate", "published", "updated", "dc:date");
    const fecha = fechaTexto ? new Date(fechaTexto) : new Date(NaN);
    if (Number.isNaN(fecha.getTime()) || fecha.getTime() < limite) continue;
    if (fecha.getTime() > Date.now() + 86_400_000) continue; // fechas futuras rotas

    const cuerpo = extraerTag(bloque, "description", "summary", "content:encoded", "content");

    salida.push({
      id: `${fuente.id}:${url}`,
      titulo: recortar(titulo, 160),
      extracto: recortar(limpiarHtml(cuerpo), 220),
      url,
      imagen: extraerImagen(bloque),
      fecha,
      fuente,
      seccion: fuente.seccionBase,
      puntaje: 0,
      tambienEn: [],
    });
  }

  return salida;
}

// ── Clasificador: la línea editorial hecha código ─────────────

function escaparRegex(t: string): string {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Compila un vocabulario a un regex con límites de palabra.
 * Sin esto, "ai" matchea dentro de "said" o "email" y "ad" dentro
 * de "read" o "leader": el filtro dejaría pasar casi todo.
 */
function compilar(terminos: string[]): RegExp {
  const partes = terminos.map((t) => {
    const cuerpo = escaparRegex(t);
    const abre = /^[a-z0-9]/.test(t) ? "\\b" : "";
    // Cierra con `(?![a-z])`, no con `\b`. Los nombres de herramienta
    // llegan pegados a su versión —"Kling2.5", "Veo3", "Sora2",
    // "Wan3.0"— y `\b` los rechaza, porque el dígito también cuenta
    // como carácter de palabra: se perdían menciones reales de IA en
    // todo el portal. Prohibir solo la letra deja pasar la versión y
    // sigue descartando "klingon" o "said" para "ai".
    const cierra = /[a-z0-9]$/.test(t) ? "(?![a-z])" : "";
    return `${abre}${cuerpo}${cierra}`;
  });
  return new RegExp(`(?:${partes.join("|")})`, "g");
}

const RE_IA = compilar(TERMINOS_IA);
const RE_VETO = compilar(VETO);
const RE_SECCION = Object.fromEntries(
  (Object.entries(TERMINOS_SECCION) as [Seccion, string[]][]).map(([s, t]) => [s, compilar(t)])
) as Record<Seccion, RegExp>;

/** Cuenta términos DISTINTOS encontrados, para que una palabra repetida no infle el puntaje. */
function contar(texto: string, re: RegExp): number {
  const hallados = texto.match(re);
  return hallados ? new Set(hallados).size : 0;
}

/**
 * Decide si la nota es de esta casa y a qué sección va.
 * Una fuente de IA necesita hablar del oficio; una de publicidad
 * o de creatividad necesita hablar de IA. Lo que no cruza, se cae.
 */
function clasificar(noticia: Noticia): Noticia | null {
  const texto = normalizar(`${noticia.titulo} ${noticia.extracto}`);

  if (contar(texto, RE_VETO) > 0) return null;

  const puntajeIA = contar(texto, RE_IA);

  let mejorSeccion: Seccion = noticia.fuente.seccionBase;
  let mejorPuntaje = 0;
  let totalOficio = 0;

  for (const seccion of Object.keys(RE_SECCION) as Seccion[]) {
    const n = contar(texto, RE_SECCION[seccion]);
    totalOficio += n;
    if (n > mejorPuntaje) {
      mejorPuntaje = n;
      mejorSeccion = seccion;
    }
  }

  // Regla de entrada. Un feed ya acotado a IA por su URL solo necesita
  // caer en alguna sección. Cualquier otro — tecnología general,
  // marketing, cine, foto — tiene que mencionar IA de verdad, o se cuela
  // media redacción de reviews de celulares y ofertas de afiliados.
  const yaFiltrada = FEEDS_SOLO_IA.has(noticia.fuente.id);
  const entra = yaFiltrada ? totalOficio > 0 : puntajeIA > 0 && totalOficio > 0;

  if (!entra) return null;

  return {
    ...noticia,
    seccion: mejorSeccion,
    puntaje: puntajeIA + totalOficio,
  };
}

// ── Carga ─────────────────────────────────────────────────────

async function traerFuente(fuente: Fuente, forzar = false): Promise<Noticia[]> {
  const respuesta = await fetch(fuente.url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; ResueltoRadar/1.0; +https://www.resueltoagency.com/noticias)",
      Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
    },
    // 8 segundos y se corta. NO es un detalle: sin esto, un feed que se
    // cuelga bloquea el Promise.allSettled entero y arrastra a todo lo
    // que dependa de él. Ya pasó — roastbrief devolvió un 524 de
    // Cloudflare y tumbó el build en Vercel, donde cada página tiene 60
    // segundos y corre con un solo worker. Un feed que no contesta en 8
    // segundos está caído para esta pasada, y el portal sale igual con
    // las otras 34 fuentes.
    signal: AbortSignal.timeout(8_000),
    // `cache: "no-store"` y `next.revalidate` son excluyentes: hay
    // que mandar uno u otro, nunca los dos.
    ...(forzar
      ? { cache: "no-store" as const }
      : { next: { revalidate: REVALIDAR_SEGUNDOS, tags: [TAG_FEEDS] } }),
  });
  if (!respuesta.ok) throw new Error(`${fuente.id}: HTTP ${respuesta.status}`);
  return parsearFeed(await respuesta.text(), fuente);
}

/**
 * Título reducido a su esqueleto comparable. Vive aquí y no en el
 * archivo para que la portada y la tabla de Supabase midan lo mismo
 * con la misma regla.
 */
export function huellaDe(titulo: string): string {
  return normalizar(titulo).replace(/[^a-z0-9]/g, "").slice(0, 55);
}

/**
 * Palabras que no distinguen una noticia de otra. Sin esta lista, dos
 * notas se parecen solo por compartir "para", "sobre" y "inteligencia
 * artificial", que están en la mitad del portal.
 */
const PALABRAS_VACIAS = new Set([
  "para", "como", "esta", "este", "esto", "esos", "esas", "pero", "porque",
  "cuando", "donde", "desde", "hasta", "sobre", "entre", "sino", "aunque",
  "todo", "toda", "todos", "todas", "otro", "otra", "otros", "otras",
  "mas", "menos", "muy", "tambien", "solo", "solo", "asi", "ahora", "hoy",
  "ano", "anos", "dia", "dias", "vez", "veces", "puede", "pueden", "hace",
  "hacer", "tiene", "tienen", "estan", "estar", "ser", "son", "sus", "con",
  "sin", "por", "que", "los", "las", "del", "una", "uno", "the", "and",
  "for", "with", "that", "this", "from", "have", "has", "its", "you",
  "your", "will", "can", "new", "says", "said", "how", "why", "what",
  "inteligencia", "artificial", "intelligence",
]);

/** Palabras con peso propio de un titular, ya normalizadas. */
function tokens(titulo: string): Set<string> {
  return new Set(
    normalizar(titulo)
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length >= 4 && !PALABRAS_VACIAS.has(t)),
  );
}

/**
 * ¿Son la misma noticia contada por dos redacciones?
 *
 * Comparar los titulares letra por letra NO sirve: se probó y daba cero
 * racimos, porque dos medios jamás titulan igual. Lo que sí se repite
 * son las palabras con carga —nombres de producto, empresas, verbos del
 * hecho—, así que se mide cuánto se solapan.
 *
 * Pide DOS condiciones a la vez: al menos 3 palabras en común (que dos
 * notas compartan "whatsapp" y "google" es casualidad; tres ya no) y
 * que sean casi la mitad del vocabulario de ambas. Con una sola de las
 * dos se juntaban notas distintas del mismo tema.
 */
function mismaNoticia(a: Set<string>, b: Set<string>): boolean {
  let comunes = 0;
  for (const t of a) if (b.has(t)) comunes++;
  if (comunes < 3) return false;
  return comunes / (a.size + b.size - comunes) >= 0.45;
}

/**
 * Agrupa la misma nota rebotada por varios medios.
 *
 * Antes esto se llamaba deduplicar y BORRABA las repetidas. Ahora las
 * cuelga de la primera en `tambienEn`: el racimo se muestra al lector
 * y alimenta el puntaje. La lista entra ordenada por fecha, así que la
 * que manda es la más reciente.
 */
function agrupar(noticias: Noticia[]): Noticia[] {
  const cabezas: { noticia: Noticia; tokens: Set<string> }[] = [];
  const salida: Noticia[] = [];

  for (const n of noticias) {
    const suyos = tokens(n.titulo);
    if (suyos.size === 0) continue;

    const cabeza = cabezas.find((c) => mismaNoticia(c.tokens, suyos));
    if (!cabeza) {
      cabezas.push({ noticia: n, tokens: suyos });
      salida.push(n);
      continue;
    }
    const principal = cabeza.noticia;

    // Un mismo medio republicando no cuenta como cobertura extra.
    const yaEsta =
      principal.fuente.id === n.fuente.id ||
      principal.tambienEn.some((o) => o.fuente.id === n.fuente.id);
    if (!yaEsta) principal.tambienEn.push({ fuente: n.fuente, url: n.url });

    // Si la que manda no traía imagen y la repetida sí, se la queda.
    // Sale gratis y ataca de frente la escasez de imágenes en los RSS.
    if (!principal.imagen && n.imagen) principal.imagen = n.imagen;
  }

  return salida;
}

/**
 * Arma la portada. `forzar` salta el caché de los feeds: lo usa el
 * cron diario, que existe justamente para no depender de que a
 * alguien le toque pagar la regeneración con su visita.
 */
export async function obtenerPortada(
  opciones: { forzar?: boolean } = {},
): Promise<Portada> {
  const resultados = await Promise.allSettled(
    FUENTES.map((f) => traerFuente(f, opciones.forzar)),
  );

  const crudas: Noticia[] = [];
  let vivas = 0;
  resultados.forEach((r, i) => {
    if (r.status === "fulfilled") {
      vivas++;
      crudas.push(...r.value);
    } else {
      console.warn(`[radar] fuente caída: ${FUENTES[i].id} —`, r.reason?.message ?? r.reason);
    }
  });

  const noticias = agrupar(
    crudas
      .map(clasificar)
      .filter((n): n is Noticia => n !== null)
      .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
  );

  // La nota principal: la que mejor combina frescura, peso de la
  // fuente y relevancia para el oficio. Solo de las últimas 72 h.
  const frescas = noticias.filter(
    (n) => Date.now() - n.fecha.getTime() < 3 * 86_400_000
  );
  const candidatas = frescas.length > 0 ? frescas : noticias;
  // La frescura manda: el castigo por antigüedad es fuerte a propósito
  // (una nota de ayer le gana a una de hace cinco días aunque puntúe
  // mejor en todo lo demás).
  // El castigo al inglés (10 ≈ 30 h de frescura) es el sesgo al
  // español que el comentario de abajo daba por hecho y el código
  // no tenía. Una nota en inglés llega a portada solo si le gana
  // de lejos a todo lo que hay en español.
  // La cobertura pesa fuerte (+6 por medio extra): que tres redacciones
  // distintas publiquen lo mismo es mejor evidencia de que la nota
  // importa que el peso que le pusimos a mano a cada fuente.
  const puntuar = (n: Noticia) =>
    n.fuente.peso * 2 +
    n.puntaje * 3 +
    n.tambienEn.length * 6 +
    (n.imagen ? 8 : 0) -
    (n.fuente.idioma === "en" ? 10 : 0) -
    (Date.now() - n.fecha.getTime()) / 10_800_000;

  const principal = [...candidatas].sort((a, b) => puntuar(b) - puntuar(a))[0] ?? null;

  const sinPrincipal = noticias.filter((n) => n.id !== principal?.id);

  // Destacadas: primero las que mejor puntúan (con el sesgo al español
  // y a las que traen imagen), no simplemente las más recientes.
  // "Lo último" es literal: las 4 MÁS RECIENTES, no las que mejor puntúan.
  //
  // Antes iba ordenado por puntaje y el título mentía — una nota de hace
  // 37 horas se sentaba encima de una de hace 2 y el portal se veía
  // parado aunque acabara de refrescarse. La jerarquía por calidad ya la
  // cubre `principal`, que sí se elige por puntaje; esta franja es para
  // responder "¿qué hay de nuevo?".
  //
  // `sinPrincipal` ya viene ordenado por fecha descendente, así que
  // basta con cortar los primeros cuatro.
  const destacadas = sinPrincipal.slice(0, 4);
  const usadasArriba = new Set(destacadas.map((n) => n.id));
  const resto = sinPrincipal.filter((n) => !usadasArriba.has(n.id)).slice(0, 40);

  // Observabilidad: si el filtro se pone muy estricto o una fuente
  // cambia de formato, esto lo delata en los logs del build/servidor.
  console.log(
    `[radar] ${crudas.length} crudas → ${noticias.length} publicables · ` +
      `fuentes ${vivas}/${FUENTES.length} · ` +
      `racimos ${noticias.filter((n) => n.tambienEn.length > 0).length} ` +
      `(+${noticias.reduce((a, n) => a + n.tambienEn.length, 0)} rebotes) · ` +
      `ES:${noticias.filter((n) => n.fuente.idioma === "es").length} ` +
      `EN:${noticias.filter((n) => n.fuente.idioma === "en").length} · ` +
      (Object.keys(TERMINOS_SECCION) as Seccion[])
        .map((s) => `${s}:${noticias.filter((n) => n.seccion === s).length}`)
        .join(" ")
  );

  const porSeccion = (Object.keys(TERMINOS_SECCION) as Seccion[])
    .map((seccion) => ({
      seccion,
      noticias: noticias.filter((n) => n.seccion === seccion).slice(0, 8),
    }))
    .filter((g) => g.noticias.length > 0);

  return {
    principal,
    destacadas,
    resto,
    porSeccion,
    todas: noticias,
    total: noticias.length,
    fuentesVivas: vivas,
    fuentesTotales: FUENTES.length,
    actualizado: new Date(),
  };
}
