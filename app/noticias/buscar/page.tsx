import type { Metadata } from "next";

import { Cabecera } from "@/components/noticias/Radar";
import TiempoRelativo from "@/components/noticias/TiempoRelativo";
import { createSupabaseAdmin } from "@/lib/ics/supabase/admin";
import { SECCIONES, type Seccion } from "@/lib/noticias/fuentes";

// ============================================================
// LA NOTICIA — buscador del archivo
//
// El archivo crece ~50 notas por día y hasta ahora no había forma de
// consultarlo. Esto lo vuelve una herramienta en vez de una pila.
//
// Es dinámico (depende de ?q=) y va con noindex: las páginas de
// resultados de búsqueda son contenido generado por el visitante y
// Google penaliza tenerlas indexadas.
// ============================================================

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Buscar en el archivo | La noticIA",
  description:
    "Busca en todo lo que ha pasado por La noticIA: herramientas, campañas, proyectos y ciencia con IA aplicada.",
  robots: { index: false, follow: true },
};

type Fila = {
  id: string;
  titulo: string;
  extracto: string;
  url: string;
  fecha: string;
  seccion: string;
  fuente_corto: string;
  fuente_idioma: string;
};

async function buscar(q: string): Promise<{ filas: Fila[]; error: string | null }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { filas: [], error: "El archivo todavía no está conectado." };
  }
  try {
    const supabase = createSupabaseAdmin();
    // Se escapan los comodines de PostgREST: sin esto, buscar "%"
    // devuelve la tabla entera y una coma parte el filtro en dos.
    const limpio = q.replace(/[%,()]/g, " ").trim();
    if (!limpio) return { filas: [], error: null };

    const { data, error } = await supabase
      .from("noticias_archivo")
      .select("id,titulo,extracto,url,fecha,seccion,fuente_corto,fuente_idioma")
      .or(`titulo.ilike.%${limpio}%,extracto.ilike.%${limpio}%`)
      .order("fecha", { ascending: false })
      .limit(60);

    if (error) {
      console.warn("[radar] buscar —", error.message);
      return { filas: [], error: "La búsqueda falló. Inténtalo de nuevo." };
    }
    return { filas: (data ?? []) as Fila[], error: null };
  } catch {
    return { filas: [], error: "La búsqueda falló. Inténtalo de nuevo." };
  }
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const consulta = (q ?? "").slice(0, 80);
  const { filas, error } = consulta ? await buscar(consulta) : { filas: [], error: null };

  return (
    <main className="noticias-root relative z-10 min-h-screen bg-bg">
      <Cabecera secciones={Object.keys(SECCIONES) as Seccion[]} />

      <div className="mx-auto max-w-4xl px-5 pb-24 pt-12 sm:px-8 lg:pt-16">
        <nav className="text-xs text-muted" aria-label="Migas de pan">
          <a href="/noticias" className="transition-colors hover:text-brand-blue">
            La noticIA
          </a>
          <span aria-hidden className="px-2 text-white/25">
            /
          </span>
          <span className="text-cream/70">Buscar</span>
        </nav>

        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
          Buscar en el archivo
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Todo lo que pasó el filtro desde que arrancó el portal, sin ventana de
          siete días. Busca por herramienta, marca, tema o medio.
        </p>

        {/* Formulario GET: la búsqueda queda en la URL y se puede
            compartir o guardar. Sin JavaScript de por medio. */}
        <form method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="q" className="sr-only">
            Qué buscas
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={consulta}
            placeholder="kling, campaña, diagnóstico, agentes…"
            className="min-w-0 flex-1 rounded-lg border border-white/15 bg-surface px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-muted/60 focus:border-brand-blue"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-brand-blue px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
          >
            Buscar
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-6 text-sm text-[#E0A93C]">
            {error}
          </p>
        )}

        {consulta && !error && (
          <p className="mt-8 text-xs text-muted">
            {filas.length === 0
              ? `Nada para "${consulta}". El archivo se llena todos los días, prueba de nuevo la semana que viene.`
              : `${filas.length} ${filas.length === 1 ? "resultado" : "resultados"} para "${consulta}"`}
          </p>
        )}

        {filas.length > 0 && (
          <section className="mt-5 rounded-xl border border-white/8 bg-surface px-5 sm:px-6">
            {filas.map((f) => (
              <article
                key={f.id}
                className="group relative border-b border-white/6 py-4 last:border-b-0"
              >
                <h2 className="font-display text-[0.95rem] font-semibold leading-snug text-cream transition-colors group-hover:text-brand-blue">
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {f.titulo}
                  </a>
                </h2>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                  <span className="font-medium text-cream/70">{f.fuente_corto}</span>
                  {f.fuente_idioma === "en" && (
                    <span className="rounded border border-white/15 px-1 py-px text-[0.6rem] font-semibold tracking-wider text-muted/80">
                      EN
                    </span>
                  )}
                  <span aria-hidden>·</span>
                  <TiempoRelativo iso={new Date(f.fecha).toISOString()} />
                  <span aria-hidden>·</span>
                  <span>{f.seccion}</span>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
