import PortalNav from "@/components/taller/PortalNav";
import DesbloquearBanner from "@/components/taller/DesbloquearBanner";
import { TALLER } from "@/lib/taller/content";
import { estaDesbloqueado } from "@/lib/taller/session";

// Página interna del portal: no se indexa (la landing /taller sí).
export const metadata = { robots: { index: false, follow: false } };

export default async function NovedadesPage() {
  const desbloqueado = await estaDesbloqueado();
  const { novedades } = TALLER;

  return (
    <>
      <PortalNav desbloqueado={desbloqueado} />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Novedades</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Lo más nuevo del programa: módulos, recursos y anuncios.
        </p>

        <div className="mt-6">{!desbloqueado && <DesbloquearBanner />}</div>

        {novedades.length === 0 ? (
          <div
            className="rounded-2xl border px-6 py-14 text-center text-sm"
            style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)", color: "var(--muted)" }}
          >
            Sin novedades por ahora. Vuelve pronto.
          </div>
        ) : (
          <div className={`space-y-3 ${desbloqueado ? "" : "select-none opacity-60"}`}>
            {novedades.map((n, i) => (
              <article
                key={`${i}-${n.titulo}`}
                className="rounded-2xl border p-5"
                style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
              >
                <div className="flex items-center gap-2">
                  {!desbloqueado && <span aria-hidden>🔒</span>}
                  {desbloqueado && i === 0 && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: "var(--green)", color: "#fff" }}
                    >
                      Nuevo
                    </span>
                  )}
                  {n.fecha && (
                    <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                      {n.fecha}
                    </span>
                  )}
                </div>
                <h2 className="mt-2 font-semibold">{n.titulo}</h2>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {n.texto}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
