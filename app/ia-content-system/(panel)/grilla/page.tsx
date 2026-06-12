import { requireProfile } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import CalendarView from "@/components/ics/CalendarView";
import type { ContentPiece } from "@/lib/ics/types";

export default async function GrillaPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  await requireProfile();
  const { m } = await searchParams;

  const now = new Date();
  const month =
    m && /^\d{4}-\d{2}$/.test(m)
      ? m
      : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const start = `${month}-01`;
  const [y, mo] = month.split("-").map(Number);
  const end = new Date(y, mo, 1).toISOString().slice(0, 10); // 1ro del mes siguiente

  const supabase = await createSupabaseServer();
  const { data: pieces } = await supabase
    .from("content_pieces")
    .select("*")
    .gte("scheduled_date", start)
    .lt("scheduled_date", end)
    .order("scheduled_date", { ascending: true });

  return (
    <main>
      <h1 className="font-display text-xl font-bold mb-4">Grilla de contenido</h1>
      <CalendarView month={month} pieces={(pieces ?? []) as ContentPiece[]} />
    </main>
  );
}
