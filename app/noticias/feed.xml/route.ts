import { obtenerPortada, REVALIDAR_SEGUNDOS } from "@/lib/noticias/feed";

// ============================================================
// LA NOTICIA — feed RSS propio
//
// Un agregador que no publica su feed no puede ser agregado por
// nadie. Los datos ya están armados; esto solo los sirve en el
// formato que entienden los lectores de RSS y otros portales.
//
// Se sirve lo mismo que la portada: titular, extracto y enlace a la
// fuente original. Nunca el artículo completo.
// ============================================================

// 6 horas, igual que la portada. Va como literal a propósito: Next
// analiza esta línea en tiempo de compilación, así que una constante
// importada rompe el build ("Invalid segment configuration export").
// Fuente de verdad del número: REVALIDAR_SEGUNDOS en lib/noticias/feed.ts
export const revalidate = 21600;

const SITIO = "https://www.resueltoagency.com";

/** XML no perdona estos cinco caracteres sueltos en el texto. */
function esc(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const portada = await obtenerPortada();
  const notas = portada.todas.slice(0, 60);

  const items = notas
    .map((n) => {
      // La cobertura de otros medios se cuenta en la descripción: es
      // la señal que hace distinto a este feed de leer los originales.
      const cobertura =
        n.tambienEn.length > 0
          ? ` (también en ${n.tambienEn.map((o) => o.fuente.corto).join(", ")})`
          : "";
      return `    <item>
      <title>${esc(n.titulo)}</title>
      <link>${esc(n.url)}</link>
      <guid isPermaLink="true">${esc(n.url)}</guid>
      <pubDate>${n.fecha.toUTCString()}</pubDate>
      <category>${esc(n.seccion)}</category>
      <source url="${esc(`https://${n.fuente.sitio}`)}">${esc(n.fuente.nombre)}</source>
      <description>${esc(n.extracto + cobertura)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>La noticIA — inteligencia artificial aplicada</title>
    <link>${SITIO}/noticias</link>
    <atom:link href="${SITIO}/noticias/feed.xml" rel="self" type="application/rss+xml" />
    <description>No todo lo que pasa en IA: solo lo que se puede usar, construir o vender. Un proyecto de RESUELTO, Lima.</description>
    <language>es</language>
    <lastBuildDate>${portada.actualizado.toUTCString()}</lastBuildDate>
    <ttl>360</ttl>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${REVALIDAR_SEGUNDOS}, stale-while-revalidate`,
    },
  });
}
