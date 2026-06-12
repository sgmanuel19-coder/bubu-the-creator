import { requireProfile, isStaff } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import RequestBoard from "@/components/ics/RequestBoard";
import type { RequestItem } from "@/lib/ics/types";

export default async function PedidosPage() {
  const profile = await requireProfile();
  const supabase = await createSupabaseServer();

  const [{ data: requests }, { data: clients }] = await Promise.all([
    supabase
      .from("requests")
      .select("*, clients(name)")
      .order("created_at", { ascending: false }),
    isStaff(profile)
      ? supabase.from("clients").select("id, name").order("name")
      : Promise.resolve({ data: null }),
  ]);

  return (
    <main>
      <h1 className="font-display text-xl font-bold mb-1">Pedidos</h1>
      <p className="text-sm text-muted mb-5">
        Lo que nos pides y lo que te pedimos para producir tu contenido.
      </p>
      <RequestBoard
        requests={(requests ?? []) as (RequestItem & { clients: { name: string } | null })[]}
        staff={isStaff(profile)}
        ownClientId={profile.client_id}
        clients={(clients ?? []) as { id: string; name: string }[]}
      />
    </main>
  );
}
