import { requireProfile } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import type { Client } from "@/lib/ics/types";

export default async function MarcaPage() {
  const profile = await requireProfile();
  const supabase = await createSupabaseServer();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", profile.client_id ?? "")
    .single<Client>();

  if (!client) {
    return (
      <main>
        <h1 className="font-display text-xl font-bold mb-2">Mi marca</h1>
        <p className="text-sm text-muted">Tu marca aún no está configurada.</p>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <h1 className="font-display text-xl font-bold">{client.name}</h1>

      {client.formats?.length > 0 && (
        <section>
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
            Formatos de contenido
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {client.formats.map((f) => (
              <div
                key={f.prefix}
                className="rounded-xl border border-white/10 bg-surface px-4 py-3"
              >
                <p className="text-sm font-semibold">
                  <span className="font-mono text-brand-blue mr-2">{f.prefix}</span>
                  {f.name}
                </p>
                {f.duration && (
                  <p className="text-xs text-muted mt-0.5">Duración: {f.duration}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {(client.brand_kit_links ?? []).length > 0 && (
        <section>
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
            Brand kit
          </h2>
          <ul className="space-y-2">
            {client.brand_kit_links!.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-blue underline underline-offset-4"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(client.contacts ?? []).length > 0 && (
        <section>
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
            Contactos
          </h2>
          <ul className="space-y-2">
            {client.contacts!.map((c, i) => (
              <li
                key={i}
                className="rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm"
              >
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-muted">
                  {[c.role, c.phone, c.email].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
