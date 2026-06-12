import { requireProfile } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import PieceForm from "@/components/ics/PieceForm";
import type { Client } from "@/lib/ics/types";

export default async function NuevaPiezaPage() {
  await requireProfile(["admin", "team"]);
  const supabase = await createSupabaseServer();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, formats")
    .order("name");

  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="font-display text-xl font-bold mb-5">Nueva pieza</h1>
      <PieceForm clients={(clients ?? []) as Pick<Client, "id" | "name" | "formats">[]} />
    </main>
  );
}
