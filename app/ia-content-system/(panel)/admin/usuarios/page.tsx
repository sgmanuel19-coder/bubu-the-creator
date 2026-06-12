import { requireProfile } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import UserForm from "@/components/ics/UserForm";
import type { Profile } from "@/lib/ics/types";

export default async function UsuariosPage() {
  await requireProfile(["admin"]);
  const supabase = await createSupabaseServer();

  const [{ data: profiles }, { data: clients }] = await Promise.all([
    supabase
      .from("profiles")
      .select("*, clients(name)")
      .order("created_at", { ascending: false }),
    supabase.from("clients").select("id, name").order("name"),
  ]);

  return (
    <main className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-xl font-bold mb-1">Usuarios</h1>
        <p className="text-sm text-muted">
          Crea los accesos de tus clientes: correo + contraseña que tú les das.
        </p>
      </div>

      <UserForm clients={(clients ?? []) as { id: string; name: string }[]} />

      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wider mb-3">
          Accesos existentes
        </h2>
        <ul className="divide-y divide-white/5 rounded-xl border border-white/10 bg-surface">
          {((profiles ?? []) as (Profile & { clients: { name: string } | null })[]).map(
            (p) => (
              <li key={p.id} className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {p.full_name || p.email}
                  </p>
                  <p className="text-xs text-muted truncate">{p.email}</p>
                </div>
                <span className="text-[11px] text-muted shrink-0">
                  {p.role === "admin"
                    ? "Admin"
                    : p.role === "team"
                      ? "Equipo"
                      : `Cliente · ${p.clients?.name ?? "—"}`}
                </span>
              </li>
            ),
          )}
        </ul>
      </section>
    </main>
  );
}
