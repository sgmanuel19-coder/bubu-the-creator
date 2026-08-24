import type { Metadata } from "next";

import { Cabecera } from "@/components/noticias/Radar";
import TiempoRelativo from "@/components/noticias/TiempoRelativo";
import { SECCIONES, type Seccion } from "@/lib/noticias/fuentes";
import { notasDePlataformas, PLATAFORMAS } from "@/lib/noticias/plataformas";

// ============================================================
// LA NOTICIA — Plataformas
//
// La única página del portal que NO respeta la ventana de 7 días,
// porque si la respetara estaría vacía casi siempre: Kling saca
// versión una vez al mes, no todos los días. Lee del archivo de
// Supabase, así que muestra lo último que se dijo de cada
// herramienta aunque sea de hace meses.
//
// Es una ruta estática y gana sobre /noticias/[seccion] en el
// enrutado, así que "plataformas" nunca cae en la página de sección.
// ============================================================

export const revalidate = 21600;

const BASE = "https://www.resueltoagency.com";

const TITULO = "Kling, Seedance, Higgsfield y las plataformas de IA";
const DESCRIPCION =
  "Novedades de las herramientas con las que se produce: Kling, Seedance, Higgsfield, Artlist, Runway, Sora, Veo, ElevenLabs y más.";

export const metadata: Metadata = {
  title: `${TITULO} | La noticIA`,
  description: DESCRIPCION,
  alternates: {
    canonical: `${BASE}/noticias/plataformas`,
    types: {
      "application/rss+xml": [{ url: `${BASE}/noticias/feed.xml`, title: "La noticIA" }],
    },
  },
  openGraph: {
    type: "website",
    title: `${TITULO} — La noticIA`,
    description: DESCRIPCION,
    url: `${BASE}/noticias/plataformas`,
  },
};

export default async function PlataformasPage() {
  const notas = await notasDePlataformas(24);

  const datos = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITULO,
    description: DESCRIPCION,
    url: `${BASE}/noticias/plataformas`,
    inLanguage: "es",
    isPartOf: { "@type": "WebSite", name: "La noticIA", url: `${BASE}/noticias` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "La noticIA", item: `${BASE}/noticias` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Plataformas",
          item: `${BASE}/noticias/plataformas`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: notas.length,
      itemListElement: notas.map((n, i) => ({
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
      {/* relative z-10: el BeamsBackground del layout es `fixed z-0` y
          sin esto el velo tapa el contenido. */}
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
            <span className="text-cream/70">Plataformas</span>
          </nav>

          <header className="mt-5 border-b border-white/10 pb-8">
            <span className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-brand-blue">
              Plataformas
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
              {TITULO}
            </h1>
            <div className="mt-5 max-w-2xl space-y-3">
              <p className="text-base leading-relaxed text-muted">
                Las herramientas con las que se produce hoy sacan versión cada
                varias semanas, no todos los días. En la portada esa noticia dura
                una semana y desaparece; acá no caduca.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Esta página no tiene ventana de tiempo: guarda lo último que se
                publicó sobre cada herramienta, aunque sea de hace meses. Si
                quieres saber en qué quedó Kling o qué hizo Higgsfield la última
                vez, está acá.
              </p>
            </div>
          </header>

          {notas.length === 0 ? (
            <div className="py-16">
              <p className="text-muted">
                El archivo todavía está juntando material. Se llena solo: cada
                día el portal guarda las notas publicables, y en cuanto alguna
                mencione una de estas herramientas aparece acá.
              </p>
            </div>
          ) : (
            <section className="mt-10 rounded-xl border border-white/8 bg-surface px-5 sm:px-6">
              {notas.map((n) => (
                <article
                  key={n.id}
                  className="group relative flex flex-col gap-2 border-b border-white/6 py-5 last:border-b-0"
                >
                  <div className="flex flex-wrap items-center gap-1.5">
                    {n.menciona.slice(0, 4).map((m) => (
                      <span
                        key={m}
                        className="rounded border border-brand-blue/30 px-1.5 py-px text-[0.6rem] font-semibold uppercase tracking-wider text-brand-blue"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-base font-semibold leading-snug text-cream transition-colors group-hover:text-brand-blue sm:text-lg">
                    <a
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {n.titulo}
                    </a>
                  </h2>
                  {n.extracto && (
                    <p className="text-sm leading-relaxed text-muted line-clamp-2">
                      {n.extracto}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                    <span className="font-medium text-cream/70">{n.fuenteCorto}</span>
                    {n.fuenteIdioma === "en" && (
                      <span
                        title="Esta nota está en inglés"
                        className="rounded border border-white/15 px-1 py-px text-[0.6rem] font-semibold tracking-wider text-muted/80"
                      >
                        EN
                      </span>
                    )}
                    <span aria-hidden>·</span>
                    <TiempoRelativo iso={n.fecha.toISOString()} />
                    <span aria-hidden>·</span>
                    <span>{n.seccion}</span>
                  </div>
                </article>
              ))}
            </section>
          )}

          <section className="mt-14 border-t border-white/10 pt-8">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-muted">
              Qué se vigila
            </h2>
            {/* Listar las herramientas es texto propio y además le dice al
                lector exactamente qué esperar de esta página. */}
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {PLATAFORMAS.join(" · ")}
            </p>
            <a
              href="/noticias"
              className="mt-8 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue transition-opacity hover:opacity-75"
            >
              <span aria-hidden>←</span> Volver a la portada
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
