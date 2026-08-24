import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Cabecera, Fila, Tarjeta } from "@/components/noticias/Radar";
import { obtenerPortada } from "@/lib/noticias/feed";
import { SECCIONES, seccionDeSlug, type Seccion } from "@/lib/noticias/fuentes";

// ============================================================
// LA NOTICIA — página de sección
//
// Por qué existe: la portada sola es una URL con 95% de titulares
// ajenos y enlaces que salen del sitio. Contra El País o Xataka no
// compite por "noticias de inteligencia artificial", y no hay forma
// de que lo haga. Estas cinco páginas atacan cola larga que sí se
// puede ganar ("herramientas de IA", "IA en publicidad"), cada una
// con texto propio para no ser una lista de enlaces pelada.
//
// Comparten el mismo caché de feeds que la portada, así que las seis
// páginas se arman con una sola pasada por los 25 RSS.
// ============================================================

// 6 horas, igual que la portada. Literal a propósito: Next analiza
// esta línea en compilación y una constante importada rompe el build.
export const revalidate = 21600;

const BASE = "https://www.resueltoagency.com";

export function generateStaticParams() {
  return Object.values(SECCIONES).map((s) => ({ seccion: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seccion: string }>;
}): Promise<Metadata> {
  const { seccion: slug } = await params;
  const seccion = seccionDeSlug(slug);
  if (!seccion) return {};

  const ficha = SECCIONES[seccion];
  return {
    title: `${ficha.titulo} | La noticIA`,
    description: ficha.descripcion,
    alternates: {
      canonical: `${BASE}/noticias/${ficha.slug}`,
      types: {
        "application/rss+xml": [
          { url: `${BASE}/noticias/feed.xml`, title: "La noticIA" },
        ],
      },
    },
    openGraph: {
      type: "website",
      title: `${ficha.titulo} — La noticIA`,
      description: ficha.descripcion,
      url: `${BASE}/noticias/${ficha.slug}`,
    },
  };
}

export default async function SeccionPage({
  params,
}: {
  params: Promise<{ seccion: string }>;
}) {
  const { seccion: slug } = await params;
  const seccion = seccionDeSlug(slug);
  // Las URLs válidas son solo estas cinco: cualquier otra es 404 de
  // verdad, no una página vacía que Google indexe como delgada.
  if (!seccion) notFound();

  const ficha = SECCIONES[seccion];
  const portada = await obtenerPortada();
  const noticias = portada.todas.filter((n) => n.seccion === seccion);

  // Las 4 primeras en tarjeta grande y el resto en fila: mismo ritmo
  // visual que la portada, sin inventar un layout nuevo.
  const arriba = noticias.slice(0, 4);
  const resto = noticias.slice(4);

  const otras = (Object.keys(SECCIONES) as Seccion[]).filter((s) => s !== seccion);

  const datos = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: ficha.titulo,
    description: ficha.descripcion,
    url: `${BASE}/noticias/${ficha.slug}`,
    inLanguage: "es",
    isPartOf: { "@type": "WebSite", name: "La noticIA", url: `${BASE}/noticias` },
    dateModified: portada.actualizado.toISOString(),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "La noticIA", item: `${BASE}/noticias` },
        {
          "@type": "ListItem",
          position: 2,
          name: seccion,
          item: `${BASE}/noticias/${ficha.slug}`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: noticias.length,
      itemListElement: noticias.slice(0, 40).map((n, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: n.url,
        name: n.titulo,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
      />
      {/* relative z-10: mismo motivo que en la portada — el BeamsBackground
          del layout es `fixed z-0` y sin esto el velo tapa el contenido. */}
      <main className="noticias-root relative z-10 min-h-screen bg-bg">
        <Cabecera secciones={Object.keys(SECCIONES) as Seccion[]} />

        <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 lg:pt-16">
          <nav className="text-xs text-muted" aria-label="Migas de pan">
            <a href="/noticias" className="transition-colors hover:text-brand-blue">
              La noticIA
            </a>
            <span aria-hidden className="px-2 text-white/25">
              /
            </span>
            <span className="text-cream/70">{seccion}</span>
          </nav>

          <header className="mt-5 border-b border-white/10 pb-8">
            <span
              className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.25em]"
              style={{ color: ficha.color }}
            >
              {seccion}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
              {ficha.titulo}
            </h1>
            {/* El texto propio de la casa. Sin esto la página sería una
                lista de enlaces ajenos, o sea contenido delgado. */}
            <div className="mt-5 max-w-2xl space-y-3">
              {ficha.intro.map((parrafo) => (
                <p
                  key={parrafo.slice(0, 24)}
                  className="text-base leading-relaxed text-muted"
                >
                  {parrafo}
                </p>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted">
              {noticias.length === 0
                ? "Sin notas nuevas en los últimos 7 días"
                : `${noticias.length} ${noticias.length === 1 ? "nota" : "notas"} de los últimos 7 días`}
            </p>
          </header>

          {noticias.length === 0 ? (
            <p className="py-20 text-center text-muted">
              Esta semana no entró nada que pase el filtro en {seccion}. Se
              revisa solo todos los días.
            </p>
          ) : (
            <>
              {arriba.length > 0 && (
                <section className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                  {arriba.map((n) => (
                    <Tarjeta key={n.id} noticia={n} />
                  ))}
                </section>
              )}

              {resto.length > 0 && (
                <section className="mt-12 rounded-xl border border-white/8 bg-surface px-5 sm:px-6">
                  {resto.map((n) => (
                    <Fila key={n.id} noticia={n} />
                  ))}
                </section>
              )}
            </>
          )}

          {/* Enlaces laterales entre secciones: es lo que convierte cinco
              páginas sueltas en una estructura que se puede recorrer. */}
          <nav className="mt-16 border-t border-white/10 pt-8">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-muted">
              Otras secciones
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {otras.map((s) => (
                <a
                  key={s}
                  href={`/noticias/${SECCIONES[s].slug}`}
                  className="group rounded-lg border border-white/8 bg-surface p-4 transition-colors hover:border-brand-blue/30"
                >
                  <span
                    className="font-display text-sm font-semibold"
                    style={{ color: SECCIONES[s].color }}
                  >
                    {s}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {SECCIONES[s].bajada}
                  </p>
                </a>
              ))}
            </div>
            <a
              href="/noticias"
              className="mt-6 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue transition-opacity hover:opacity-75"
            >
              <span aria-hidden>←</span> Volver a la portada
            </a>
          </nav>
        </div>
      </main>
    </>
  );
}
