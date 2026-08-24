import "server-only";

import { createClient } from "@supabase/supabase-js";

// ============================================================
// LA NOTICIA — franja de plataformas
//
// Por qué existe: se midió el 2026-08-24 y de 50 notas del día solo
// 2 mencionaban Kling, Seedance, Higgsfield o Artlist. No es el
// filtro: es que esos productos salen en prensa una vez al mes, no
// todos los días. Con la ventana de 7 días de la portada, la noticia
// del lanzamiento de Kling deja de existir a los siete días y la
// sección se ve siempre vacía.
//
// Esto lee del ARCHIVO de Supabase en vez de los feeds, así que no
// tiene ventana: muestra las últimas notas sobre estas herramientas
// aunque sean de hace dos meses. Es el primer uso real del archivo.
// ============================================================

/**
 * Las herramientas que le importan a quien produce.
 *
 * Ojo con los nombres cortos: el match es por LÍMITE DE PALABRA, no
 * por subcadena. Con subcadena "veo" entra en "video" y "proveo",
 * "luma" en "pluma" y "omni" en "omnicanal". Por eso NO se filtra en
 * la consulta SQL con `ilike` (que sí es por subcadena) sino acá, con
 * la misma regla que usa el clasificador en feed.ts.
 */
export const PLATAFORMAS = [
  "kling", "seedance", "seedream", "higgsfield", "artlist", "runway",
  "midjourney", "sora", "veo", "luma", "dream machine", "pika", "hailuo",
  "minimax", "vidu", "pixverse", "hunyuan", "moonvalley", "flux",
  "nano banana", "stable diffusion", "elevenlabs", "heygen", "synthesia",
  "hedra", "suno", "udio", "descript", "topaz", "magnific", "freepik",
  "ideogram", "recraft", "krea", "firefly", "capcut",
];

export type NotaArchivada = {
  id: string;
  titulo: string;
  extracto: string;
  url: string;
  imagen: string | null;
  fecha: Date;
  seccion: string;
  fuenteCorto: string;
  fuenteIdioma: string;
  /** Qué herramientas se le encontraron. Se pintan como etiquetas. */
  menciona: string[];
};

function escaparRegex(t: string): string {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Un regex por herramienta, para saber CUÁL se mencionó, no solo que
 * hubo alguna.
 *
 * El cierre es `(?![a-z])` y no `\b` a propósito: los nombres llegan
 * pegados al número de versión —"Kling2.5", "Wan3.0", "Veo3", "Sora2"—
 * y con `\b` ninguno matchea, porque el dígito también cuenta como
 * carácter de palabra. Prohibir solo la letra deja pasar la versión y
 * sigue descartando "klingon".
 */
const RE_PLATAFORMA = PLATAFORMAS.map((nombre) => ({
  nombre,
  re: new RegExp(`\\b${escaparRegex(nombre)}(?![a-z])`),
}));

function normalizar(texto: string): string {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/**
 * Cuántas filas del archivo se traen antes de filtrar en memoria.
 *
 * El filtro fino es por límite de palabra y eso no se puede expresar
 * con `ilike`, así que se trae una tanda reciente y se cierne acá. A
 * ~50 notas por día, 1500 filas son un mes de archivo.
 */
const FILAS_A_REVISAR = 1500;

export async function notasDePlataformas(limite = 12): Promise<NotaArchivada[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const llave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Sin archivo configurado la franja simplemente no se pinta. Nunca
  // puede tumbar la página.
  if (!url || !llave) return [];

  try {
    // Llave pública: esta tabla tiene lectura abierta por RLS y no hace
    // falta la service_role para leerla.
    const supabase = createClient(url, llave, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from("noticias_archivo")
      .select("id,titulo,extracto,url,imagen,fecha,seccion,fuente_corto,fuente_idioma")
      .order("fecha", { ascending: false })
      .limit(FILAS_A_REVISAR);

    if (error) {
      console.warn("[radar] plataformas: no se pudo leer el archivo —", error.message);
      return [];
    }

    const salida: NotaArchivada[] = [];
    for (const fila of data ?? []) {
      const texto = normalizar(`${fila.titulo} ${fila.extracto ?? ""}`);
      const menciona = RE_PLATAFORMA.filter((p) => p.re.test(texto)).map((p) => p.nombre);
      if (menciona.length === 0) continue;

      salida.push({
        id: fila.id,
        titulo: fila.titulo,
        extracto: fila.extracto ?? "",
        url: fila.url,
        imagen: fila.imagen,
        fecha: new Date(fila.fecha),
        seccion: fila.seccion,
        fuenteCorto: fila.fuente_corto,
        fuenteIdioma: fila.fuente_idioma,
        menciona,
      });
      if (salida.length >= limite) break;
    }

    return salida;
  } catch (e) {
    console.warn("[radar] plataformas: excepción —", e instanceof Error ? e.message : e);
    return [];
  }
}
