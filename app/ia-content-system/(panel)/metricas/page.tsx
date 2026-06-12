import { requireProfile } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import { FunnelBadge } from "@/components/ics/Badges";
import { fmtDate, fmtMonth } from "@/lib/ics/utils";
import type { AccountMetrics, ContentPiece, PieceMetrics } from "@/lib/ics/types";

type MetricRow = PieceMetrics & { content_pieces: ContentPiece | null };

function n(v: number | null | undefined): string {
  if (v == null) return "—";
  return v.toLocaleString("es-PE");
}

export default async function MetricasPage() {
  await requireProfile();
  const supabase = await createSupabaseServer();

  const [{ data: pieceMetrics }, { data: accountMetrics }] = await Promise.all([
    supabase
      .from("piece_metrics")
      .select("*, content_pieces(*)")
      .order("measured_at", { ascending: false })
      .limit(30),
    supabase
      .from("account_metrics")
      .select("*")
      .order("month", { ascending: false })
      .limit(6),
  ]);

  const rows = ((pieceMetrics ?? []) as MetricRow[]).filter(
    (r) => r.content_pieces,
  );

  return (
    <main className="space-y-8">
      <div>
        <h1 className="font-display text-xl font-bold mb-1">Métricas</h1>
        <p className="text-sm text-muted">
          Resultados de tu contenido publicado, actualizados por el equipo.
        </p>
      </div>

      {/* Resumen mensual de cuenta */}
      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
          Evolución de la cuenta
        </h2>
        {(accountMetrics ?? []).length === 0 ? (
          <p className="text-sm text-muted">
            Aún no hay métricas cargadas. Aparecerán aquí con el primer reporte
            mensual.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {((accountMetrics ?? []) as AccountMetrics[]).map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-white/10 bg-surface p-4"
              >
                <p className="text-xs text-muted capitalize">{fmtMonth(m.month)}</p>
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div>
                    <p className="font-display font-bold text-lg">{n(m.followers)}</p>
                    <p className="text-[10px] text-muted">Seguidores</p>
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg">{n(m.total_reach)}</p>
                    <p className="text-[10px] text-muted">Alcance</p>
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg">
                      {m.engagement_rate != null ? `${m.engagement_rate}%` : "—"}
                    </p>
                    <p className="text-[10px] text-muted">Engagement</p>
                  </div>
                </div>
                {m.notes && <p className="text-xs text-muted mt-3">{m.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Por pieza */}
      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
          Por pieza publicada
        </h2>
        {rows.length === 0 ? (
          <p className="text-sm text-muted">Sin métricas por pieza todavía.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-surface text-muted text-left">
                  <th className="px-3 py-2 font-medium">Pieza</th>
                  <th className="px-3 py-2 font-medium">Funnel</th>
                  <th className="px-3 py-2 font-medium text-right">Alcance</th>
                  <th className="px-3 py-2 font-medium text-right">Likes</th>
                  <th className="px-3 py-2 font-medium text-right">Comentarios</th>
                  <th className="px-3 py-2 font-medium text-right">Compartidos</th>
                  <th className="px-3 py-2 font-medium text-right">Guardados</th>
                  <th className="px-3 py-2 font-medium">Medición</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-muted mr-1.5">
                        {r.content_pieces!.code}
                      </span>
                      {r.content_pieces!.title}
                    </td>
                    <td className="px-3 py-2.5">
                      <FunnelBadge level={r.content_pieces!.funnel_level} />
                    </td>
                    <td className="px-3 py-2.5 text-right">{n(r.reach)}</td>
                    <td className="px-3 py-2.5 text-right">{n(r.likes)}</td>
                    <td className="px-3 py-2.5 text-right">{n(r.comments_count)}</td>
                    <td className="px-3 py-2.5 text-right">{n(r.shares)}</td>
                    <td className="px-3 py-2.5 text-right">{n(r.saves)}</td>
                    <td className="px-3 py-2.5 text-muted">{fmtDate(r.measured_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
