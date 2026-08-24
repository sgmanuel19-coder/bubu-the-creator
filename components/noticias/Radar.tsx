import Image from "next/image";

import TiempoRelativo from "@/components/noticias/TiempoRelativo";
import { SECCIONES, slugDeSeccion, type Seccion } from "@/lib/noticias/fuentes";
import type { Noticia, Portada } from "@/lib/noticias/feed";

// ============================================================
// RADAR IA — portada
// Componente de servidor: no lleva estado ni JS de cliente.
// Cada tarjeta es un titular + extracto corto que enlaza a la
// fuente original. Nunca se reproduce el artículo completo.
// ============================================================

const fmtLargo = new Intl.DateTimeFormat("es-PE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Lima",
});

// ── Cabecera propia del portal ────────────────────────────────
// Se exporta para que las páginas de sección usen la misma.
export function Cabecera({ secciones }: { secciones: Seccion[] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="/noticias" className="group flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/logo-mark.png"
            alt="RESUELTO"
            width={32}
            height={32}
            priority
            className="object-contain transition-opacity duration-300 group-hover:opacity-80"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight text-cream">
              La notic<span className="text-brand-blue">IA</span>
            </span>
            <span className="mt-0.5 font-brand text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-muted">
              Resuelto
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {/* Enlaces de verdad, no anclas: son la estructura interna que
              antes no existía (33 enlaces salían del sitio y 8 se quedaban)
              y le dan a cada sección una URL que Google puede indexar. */}
          {secciones.map((s) => (
            <a
              key={s}
              href={`/noticias/${slugDeSeccion(s)}`}
              className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-cream"
            >
              {s}
            </a>
          ))}
          <a
            href="/noticias/plataformas"
            className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-cream"
          >
            Plataformas
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <a
            href="/taller"
            className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-blue transition-opacity hover:opacity-75"
          >
            Academy
          </a>
        </div>
      </div>

      {/* Segunda fila solo para móvil.
          El menú de arriba es `hidden md:flex`, así que en teléfono no
          había NINGUNA forma de llegar a las secciones — y el teléfono
          es donde entra la mayoría. Va como tira deslizable para no
          comerse la pantalla ni obligar a un menú desplegable. */}
      <nav className="flex gap-5 overflow-x-auto border-t border-white/8 px-5 py-2.5 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {secciones.map((s) => (
          <a
            key={s}
            href={`/noticias/${slugDeSeccion(s)}`}
            className="shrink-0 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-cream"
          >
            {s}
          </a>
        ))}
        <a
          href="/noticias/plataformas"
          className="shrink-0 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand-blue"
        >
          Plataformas
        </a>
      </nav>
    </header>
  );
}

export function EtiquetaSeccion({ seccion, className = "" }: { seccion: Seccion; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[0.65rem] font-display font-semibold uppercase tracking-[0.18em] ${className}`}
      style={{ color: SECCIONES[seccion].color }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: SECCIONES[seccion].color }}
      />
      {seccion}
    </span>
  );
}

function Portadilla({ noticia, alto }: { noticia: Noticia; alto: string }) {
  if (noticia.imagen) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      // El alt lleva el titular, no está vacío. En un portal de noticias
      // la foto ES la nota: un alt="" la declara decorativa y renuncia a
      // Google Imágenes y a que un lector de pantalla sepa qué se ilustra.
      <img
        src={noticia.imagen}
        alt={noticia.titulo}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`w-full ${alto} object-cover transition-transform duration-700 group-hover:scale-[1.03]`}
      />
    );
  }
  return (
    <div
      className={`w-full ${alto} flex items-center justify-center bg-surface-2`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${SECCIONES[noticia.seccion].color}14 0%, transparent 70%)`,
      }}
    >
      <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-muted/60">
        {noticia.fuente.corto}
      </span>
    </div>
  );
}

function PieFuente({ noticia }: { noticia: Noticia }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
      <span className="font-medium text-cream/70">{noticia.fuente.corto}</span>
      {/* Aviso honesto: el destino está en inglés. Mejor saberlo antes
          del clic que después. */}
      {noticia.fuente.idioma === "en" && (
        <span
          title="Esta nota está en inglés"
          className="rounded border border-white/15 px-1 py-px text-[0.6rem] font-semibold tracking-wider text-muted/80"
        >
          EN
        </span>
      )}
      <span aria-hidden>·</span>
      <TiempoRelativo iso={noticia.fecha.toISOString()} />
    </div>
  );
}

/**
 * El racimo: qué otros medios publicaron lo mismo.
 *
 * Es el "More:" de Techmeme y es la señal más honesta que tiene un
 * agregador — que tres redacciones distintas cubran algo dice más que
 * cualquier peso editorial que le pongamos a una fuente. Estos datos
 * ya se calculaban para descartar repetidos; ahora se muestran.
 */
function TambienEn({ noticia }: { noticia: Noticia }) {
  if (noticia.tambienEn.length === 0) return null;
  return (
    <p className="text-xs leading-relaxed text-muted/80">
      <span className="text-muted/60">También en </span>
      {noticia.tambienEn.map((otro, i) => (
        <span key={otro.fuente.id + otro.url}>
          {i > 0 && <span className="text-muted/40">, </span>}
          <a
            href={otro.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 text-cream/70 underline decoration-white/20 underline-offset-2 transition-colors hover:text-brand-blue hover:decoration-brand-blue/50"
          >
            {otro.fuente.corto}
          </a>
        </span>
      ))}
    </p>
  );
}

// ── Nota principal ────────────────────────────────────────────
function NotaPrincipal({ noticia }: { noticia: Noticia }) {
  return (
    // No es un <a> envolvente: el bloque "También en" lleva sus propios
    // enlaces y anidar enlaces es HTML inválido. El titular es el enlace
    // y su ::after invisible cubre la tarjeta para que siga clickeable
    // entera; lo que deba quedar por encima usa `relative z-10`.
    <article className="group relative grid gap-6 overflow-hidden rounded-2xl border border-white/8 bg-surface transition-colors duration-300 hover:border-brand-blue/35 md:grid-cols-[1.15fr_1fr] md:gap-0">
      <div className="overflow-hidden md:order-2">
        <Portadilla noticia={noticia} alto="h-56 sm:h-72 md:h-full md:min-h-[22rem]" />
      </div>

      <div className="flex flex-col justify-center gap-4 px-6 pb-7 md:order-1 md:px-9 md:py-10">
        <EtiquetaSeccion seccion={noticia.seccion} />
        <h2 className="font-display text-2xl font-bold leading-[1.15] text-cream sm:text-3xl md:text-[2.1rem]">
          <a
            href={noticia.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {noticia.titulo}
          </a>
        </h2>
        {noticia.extracto && (
          <p className="text-[0.95rem] leading-relaxed text-muted line-clamp-3">
            {noticia.extracto}
          </p>
        )}
        <PieFuente noticia={noticia} />
        <TambienEn noticia={noticia} />
        <span className="mt-1 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
          Leer en {noticia.fuente.corto}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </article>
  );
}

// ── Tarjeta de grilla ─────────────────────────────────────────
export function Tarjeta({ noticia }: { noticia: Noticia }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-white/8 bg-surface transition-colors duration-300 hover:border-brand-blue/30">
      <div className="overflow-hidden">
        <Portadilla noticia={noticia} alto="h-40" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <EtiquetaSeccion seccion={noticia.seccion} />
        <h3 className="font-display text-base font-semibold leading-snug text-cream transition-colors group-hover:text-white line-clamp-3">
          <a
            href={noticia.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {noticia.titulo}
          </a>
        </h3>
        <div className="mt-auto flex flex-col gap-1.5 pt-1">
          <PieFuente noticia={noticia} />
          <TambienEn noticia={noticia} />
        </div>
      </div>
    </article>
  );
}

// ── Fila compacta (bloques por sección) ───────────────────────
export function Fila({ noticia }: { noticia: Noticia }) {
  return (
    <article className="group relative flex gap-4 border-b border-white/6 py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-[0.95rem] font-semibold leading-snug text-cream transition-colors group-hover:text-brand-blue line-clamp-2">
          <a
            href={noticia.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {noticia.titulo}
          </a>
        </h4>
        <div className="mt-1.5 flex flex-col gap-1">
          <PieFuente noticia={noticia} />
          <TambienEn noticia={noticia} />
        </div>
      </div>
      {noticia.imagen && (
        <div className="hidden shrink-0 overflow-hidden rounded-lg sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-16 w-24 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
    </article>
  );
}

// ── Portada completa ──────────────────────────────────────────
export default function Radar({ portada }: { portada: Portada }) {
  const { principal, destacadas, porSeccion, actualizado, total, fuentesVivas, fuentesTotales } = portada;

  const usados = new Set<string>(
    [principal?.id, ...destacadas.map((n) => n.id)].filter(Boolean) as string[]
  );

  const secciones = porSeccion
    .map((g) => ({ ...g, noticias: g.noticias.filter((n) => !usados.has(n.id)) }))
    .filter((g) => g.noticias.length > 0);

  const vacio = total === 0;

  return (
    // relative z-10 NO es decorativo: el BeamsBackground del layout es
    // `fixed z-0`, y un elemento posicionado con z-index 0 se pinta ENCIMA
    // del contenido estático. Sin esto, el velo del fondo tapa toda la
    // portada y solo se ve la cabecera (que es sticky z-50).
    <main id="main-content" className="noticias-root relative z-10 min-h-screen bg-bg">
      <Cabecera secciones={secciones.map((g) => g.seccion)} />

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 lg:pt-16">

        {/* ── Cabecera ── */}
        <header className="border-b border-white/10 pb-8">
          {/* Sin kicker de marca: el logo y "Resuelto" ya viven en la
              cabecera, justo encima. Repetirlo aquí lo vuelve ruido. */}
          <h1 className="font-display text-4xl font-bold leading-none tracking-tight text-cream sm:text-6xl">
            La notic<span className="text-brand-blue">IA</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Inteligencia artificial aplicada: lo que se puede usar, construir o
            vender. No todo lo que pasa en IA — solo lo que cambia tu trabajo.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              Actualizado {fmtLargo.format(actualizado)}
            </span>
            <span aria-hidden className="text-white/20">|</span>
            <span>{total} notas</span>
            <span aria-hidden className="text-white/20">|</span>
            <span>
              {fuentesVivas} de {fuentesTotales} fuentes
            </span>
          </div>
        </header>

        {vacio ? (
          <p className="py-24 text-center text-muted">
            Hoy no entró ninguna nota que pase el filtro.
            Vuelve mañana — esto se actualiza solo.
          </p>
        ) : (
          <>
            {/* ── Nota principal ── */}
            {principal && (
              <section className="pt-10">
                <NotaPrincipal noticia={principal} />
              </section>
            )}

            {/* ── Lo último ── */}
            {destacadas.length > 0 && (
              <section className="pt-14">
                <h2 className="mb-6 font-display text-xs font-bold uppercase tracking-[0.3em] text-muted">
                  Lo último
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {destacadas.map((n) => (
                    <Tarjeta key={n.id} noticia={n} />
                  ))}
                </div>
              </section>
            )}

            {/* ── Puerta a Plataformas ──
                Kling, Seedance y compañía salen una vez al mes: con la
                ventana de 7 días de esta portada casi nunca se ven. Esa
                página lee del archivo y no caduca. */}
            <section className="pt-14">
              <a
                href="/noticias/plataformas"
                className="group flex flex-col gap-3 rounded-xl border border-brand-blue/25 bg-brand-blue/[0.04] p-6 transition-colors hover:border-brand-blue/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-display text-lg font-bold text-cream sm:text-xl">
                    Kling, Seedance, Higgsfield y las demás
                  </h2>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
                    Las herramientas sacan versión cada varias semanas, no todos
                    los días. Acá no caducan: lo último de cada una, sin ventana
                    de tiempo.
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                  Ver plataformas
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </a>
            </section>

            {/* ── Bloques por sección ── */}
            {secciones.map(({ seccion, noticias }) => (
              <section key={seccion} id={SECCIONES[seccion].slug} className="scroll-mt-20 pt-16">
                <div
                  className="mb-5 border-l-2 pl-4"
                  style={{ borderColor: SECCIONES[seccion].color }}
                >
                  <h2 className="font-display text-xl font-bold text-cream sm:text-2xl">
                    <a
                      href={`/noticias/${SECCIONES[seccion].slug}`}
                      className="transition-colors hover:text-brand-blue"
                    >
                      {seccion}
                    </a>
                  </h2>
                  <p className="mt-1 text-sm text-muted">{SECCIONES[seccion].bajada}</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-surface px-5 sm:px-6">
                  {noticias.map((n) => (
                    <Fila key={n.id} noticia={n} />
                  ))}
                </div>
                <a
                  href={`/noticias/${SECCIONES[seccion].slug}`}
                  className="mt-4 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-brand-blue"
                >
                  Todo en {seccion} <span aria-hidden>→</span>
                </a>
              </section>
            ))}
          </>
        )}

        {/* ── Pie: honestidad editorial + puente a la Academy ── */}
        <footer className="mt-20 border-t border-white/10 pt-10">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cream">
                Cómo se arma esta portada
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Un robot lee cada día los feeds públicos de {fuentesTotales} medios y
                laboratorios, y se queda solo con IA aplicada: lo que alguien puede
                usar, construir o vender. Rondas de inversión, chips, papers y drama
                corporativo no entran — no le cambian el día a nadie que produce.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Cada nota es un titular con su extracto y su enlace al medio original.
                No reproducimos artículos completos: el crédito y el clic son de quien
                lo escribió.
              </p>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cream">
                Aquí te enteras. Allá aprendes qué hacer
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                La Academy te enseña qué hacer con eso: el método de dirección creativa
                que convierte una herramienta nueva en una campaña que se cobra.
              </p>
              <a
                href="/taller"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-brand-blue/40 px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue transition-colors hover:bg-brand-blue/10"
              >
                Ver la Academy <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Marca madre: discreta, sin arrastrar el menú de la agencia. */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-muted">
              Un proyecto de{" "}
              <a
                href="/"
                className="font-display font-semibold tracking-wide text-cream/80 transition-colors hover:text-brand-blue"
              >
                RESUELTO
              </a>
              {" "}· Lima, Perú
            </p>
            <p className="text-xs text-muted/70">
              © {new Date().getFullYear()} · Los titulares y enlaces pertenecen a sus medios.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
