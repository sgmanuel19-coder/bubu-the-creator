import "server-only";

import { createSupabaseAdmin } from "@/lib/ics/supabase/admin";
import { huellaDe, type Noticia } from "@/lib/noticias/feed";

// ============================================================
// LA NOTICIA — volcado al archivo
//
// La portada es efímera por diseño: 7 días y a otra cosa. Esto
// guarda cada nota publicable en Supabase antes de que la ventana
// la tire, para que el portal tenga memoria.
//
// Regla de oro: NADA de esto puede tumbar /noticias. Si Supabase
// no está configurado o se cae, el portal sale igual que siempre.
// Por eso el volcado corre SOLO desde el cron (que puede fallar
// sin que nadie lo note) y nunca durante el render de la página.
// ============================================================

/** Cuántas notas van por INSERT. Los lotes evitan un payload gigante. */
const TAMANO_LOTE = 200;

/**
 * ¿Están las llaves de Supabase en el entorno? Mientras no lo estén,
 * el archivo simplemente no existe y el resto sigue funcionando.
 */
export function archivoConfigurado(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export type ResultadoArchivo = {
  ok: boolean;
  guardadas: number;
  /** Por qué no se guardó nada, cuando corresponde. */
  motivo?: string;
};

function aFila(n: Noticia) {
  return {
    id: n.id,
    titulo: n.titulo,
    extracto: n.extracto,
    url: n.url,
    imagen: n.imagen,
    fecha: n.fecha.toISOString(),
    fuente_id: n.fuente.id,
    fuente_nombre: n.fuente.nombre,
    fuente_corto: n.fuente.corto,
    fuente_sitio: n.fuente.sitio,
    fuente_idioma: n.fuente.idioma,
    seccion: n.seccion,
    puntaje: n.puntaje,
    huella: huellaDe(n.titulo),
  };
}

/**
 * Vuelca las notas al archivo. Idempotente: la clave primaria es
 * "fuenteId:url", así que repetir el volcado no duplica nada —
 * `ignoreDuplicates` hace que las ya guardadas se salten sin error
 * y sin reescribir el registro original.
 */
export async function archivar(noticias: Noticia[]): Promise<ResultadoArchivo> {
  if (!archivoConfigurado()) {
    return { ok: true, guardadas: 0, motivo: "Supabase sin configurar" };
  }
  if (noticias.length === 0) {
    return { ok: true, guardadas: 0, motivo: "nada que archivar" };
  }

  try {
    const supabase = createSupabaseAdmin();
    let guardadas = 0;

    for (let i = 0; i < noticias.length; i += TAMANO_LOTE) {
      const lote = noticias.slice(i, i + TAMANO_LOTE).map(aFila);
      const { error, count } = await supabase
        .from("noticias_archivo")
        .upsert(lote, { onConflict: "id", ignoreDuplicates: true, count: "exact" });

      if (error) {
        console.error("[radar] archivo: lote fallido —", error.message);
        return { ok: false, guardadas, motivo: error.message };
      }
      guardadas += count ?? 0;
    }

    return { ok: true, guardadas };
  } catch (e) {
    const motivo = e instanceof Error ? e.message : String(e);
    console.error("[radar] archivo: excepción —", motivo);
    return { ok: false, guardadas: 0, motivo };
  }
}
