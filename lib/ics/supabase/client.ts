"use client";

import { createBrowserClient } from "@supabase/ssr";

/** Cliente Supabase para componentes de navegador (Realtime, login, uploads). */
export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
