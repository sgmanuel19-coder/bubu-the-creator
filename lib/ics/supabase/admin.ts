import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente con service role — SOLO server-side.
 * Se usa para crear usuarios (Admin API) y tareas que saltan RLS (cron).
 */
export function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
