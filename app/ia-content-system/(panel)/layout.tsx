import { redirect } from "next/navigation";
import Link from "next/link";
import { requireProfile, isStaff } from "@/lib/ics/auth";
import { createSupabaseServer } from "@/lib/ics/supabase/server";
import { ICS_BASE } from "@/lib/ics/constants";
import PanelNav from "@/components/ics/PanelNav";

async function signOut() {
  "use server";
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect(`${ICS_BASE}/login`);
}

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireProfile();

  let clientName: string | null = null;
  if (profile.client_id) {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from("clients")
      .select("name")
      .eq("id", profile.client_id)
      .single();
    clientName = data?.name ?? null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href={ICS_BASE} className="shrink-0">
            <span className="font-display font-black tracking-tight">
              RESUELTO<span className="text-brand-blue"> /</span>
            </span>
            <span className="hidden sm:inline font-display text-[10px] tracking-[0.25em] text-muted ml-2">
              IA CONTENT SYSTEM
            </span>
          </Link>
          <div className="flex items-center gap-3 min-w-0">
            {clientName && (
              <span className="text-xs text-muted truncate">{clientName}</span>
            )}
            <form action={signOut}>
              <button
                type="submit"
                className="text-xs text-muted hover:text-cream border border-white/10 rounded-md px-3 py-1.5 transition-colors"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <PanelNav staff={isStaff(profile)} />

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 pb-24 md:pb-8">
        {children}
      </div>
    </div>
  );
}
