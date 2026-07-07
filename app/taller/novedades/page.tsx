import PortalNav from "@/components/taller/PortalNav";
import { TALLER } from "@/lib/taller/content";

export default function NovedadesPage() {
  const { novedades } = TALLER;
  return (
    <>
      <PortalNav />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Novedades</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Lo más nuevo del programa: módulos, recursos y anuncios.
        </p>

        {novedades.length === 0 ? (
          <div
            className="mt-8 rounded-2xl border px-6 py-14 text-center text-sm"
            style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)", color: "var(--muted)" }}
          >
            Sin novedades por ahora. Vuelve pronto.
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {novedades.map((n, i) => (
              <article
                key={`${i}-${n.titulo}`}
                className="rounded-2xl border p-5"
                style={{ borderColor: "rgba(244,240,222,0.12)", background: "var(--surface)" }}
              >
                <div className="flex items-center gap-2">
                  {i === 0 && (
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
