import { timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { archivar, archivoConfigurado } from "@/lib/noticias/archivo";
import {
  REVALIDAR_SEGUNDOS,
  TAG_FEEDS,
  obtenerPortada,
} from "@/lib/noticias/feed";

// ============================================================
// LA NOTICIA — refresco diario
//
// El portal se regenera con ISR, o sea: solo cuando alguien entra
// y el caché ya venció. Con poco tráfico eso significa que el
// primer lector del día paga la espera y, peor, que si nadie entra
// en 20 horas la portada se queda vieja. Este endpoint lo fuerza.
//
// Lo llama el cron de vercel.json: "0 10 * * *", o sea 10:00 UTC
// = 05:00 en Lima, para que el portal amanezca fresco. El plan del
// proyecto es Hobby, que permite un solo disparo al día; si algún
// día pasa a Pro, ese schedule puede subir a "0 */6 * * *" y quedar
// alineado con el ISR de 6 h. (vercel.json es JSON estricto y su
// esquema rechaza claves desconocidas: por eso esto se documenta
// acá y no con un "_comment" al lado del cron.)
//
// Vercel manda "Authorization: Bearer $CRON_SECRET" automáticamente
// cuando esa variable existe en el proyecto.
// ============================================================

export const dynamic = "force-dynamic";
/** 25 fuentes RSS en paralelo: con 10 s por defecto no alcanza. */
export const maxDuration = 60;

/**
 * Compara en tiempo constante.
 *
 * `a !== b` corta en el primer carácter distinto, así que cuánto tarda
 * en responder filtra información sobre el secreto. Contra Vercel y por
 * red es impracticable de explotar, pero comparar bien cuesta cinco
 * líneas y quita la duda.
 */
function autorizado(cabecera: string | null, secreto: string): boolean {
  if (!cabecera) return false;
  const recibido = Buffer.from(cabecera);
  const esperado = Buffer.from(`Bearer ${secreto}`);
  // timingSafeEqual exige la misma longitud; comparar las longitudes
  // por separado no filtra nada útil.
  if (recibido.length !== esperado.length) return false;
  return timingSafeEqual(recibido, esperado);
}

export async function GET(request: Request) {
  const secreto = process.env.CRON_SECRET;

  // Sin secreto no se abre. Este endpoint sale a buscar 25 feeds
  // externos: dejarlo público es regalar un amplificador a quien
  // pase por ahí. Falla ruidoso a propósito, para que se vea en los
  // logs de Vercel en vez de quedar medio funcionando en silencio.
  if (!secreto) {
    return NextResponse.json(
      { error: "Falta CRON_SECRET en las variables de entorno del proyecto." },
      { status: 503 },
    );
  }
  if (!autorizado(request.headers.get("authorization"), secreto)) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  const arranque = Date.now();

  // forzar: true salta el Data Cache de los feeds. Sin eso este
  // endpoint releería el mismo XML guardado y no refrescaría nada.
  const portada = await obtenerPortada({ forzar: true });

  const archivo = await archivar(portada.todas);

  // Ahora sí, que la próxima visita reconstruya la página con lo
  // recién traído: primero el caché de los feeds, después la ruta.
  // En Next 16 revalidateTag pide el perfil de caché como segundo
  // argumento; le pasamos la misma vida que declaran los fetch de
  // los feeds, para que ambos hablen del mismo plazo.
  revalidateTag(TAG_FEEDS, { expire: REVALIDAR_SEGUNDOS });
  revalidatePath("/noticias");

  const resumen = {
    ok: true,
    publicables: portada.total,
    fuentes: `${portada.fuentesVivas}/${portada.fuentesTotales}`,
    archivo: archivoConfigurado()
      ? { ok: archivo.ok, guardadas: archivo.guardadas, motivo: archivo.motivo }
      : "sin configurar",
    ms: Date.now() - arranque,
  };

  console.log("[radar] refresco diario:", JSON.stringify(resumen));
  return NextResponse.json(resumen);
}
