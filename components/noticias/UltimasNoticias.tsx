import { obtenerPortada } from "@/lib/noticias/feed";
import { SECCIONES } from "@/lib/noticias/fuentes";

// ============================================================
// Franja de La noticIA para la landing de la agencia.
//
// Para qué: el prospecto que entra a ver servicios no tiene forma de
// saber si Manuel está al día de verdad o vende lo que aprendió el
// año pasado. Tres titulares de hoy lo responden sin decirlo, y no
// hay nada que mantener: sale de los mismos feeds que el portal.
//
// Componente de servidor. Comparte el caché de la portada, así que
// no agrega ni una petición extra.
// ============================================================

export default async function UltimasNoticias() {
  let notas: Awaited<ReturnType<typeof obtenerPortada>>["todas"] = [];
  try {
    const portada = await obtenerPortada();
    notas = portada.todas.slice(0, 3);
  } catch {
    // Si los feeds fallan, la landing no muestra la franja y ya. Nunca
    // puede tumbar la página de ventas.
    return null;
  }
  if (notas.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <span className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-brand-blue">
            La notic<span className="text-cream">IA</span>
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-cream sm:text-3xl">
            Lo que pasó hoy en IA aplicada
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Nuestro portal filtra cada día la prensa de IA y se queda con lo que
            se puede usar, construir o vender. Se actualiza solo.
          </p>
        </div>
        <a
          href="/noticias"
          className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue transition-opacity hover:opacity-75"
        >
          Ver el portal →
        </a>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {notas.map((n) => (
          <a
            key={n.id}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-white/8 bg-surface p-5 transition-colors hover:border-brand-blue/30"
          >
            <span
              className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.2em]"
              style={{ color: SECCIONES[n.seccion].color }}
            >
              {n.seccion}
            </span>
            <h3 className="font-display text-sm font-semibold leading-snug text-cream transition-colors group-hover:text-white line-clamp-3">
              {n.titulo}
            </h3>
            <span className="mt-auto pt-1 text-xs text-muted">{n.fuente.corto}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
