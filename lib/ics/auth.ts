import { redirect } from "next/navigation";
import { ICS_BASE, Role } from "./constants";
import { createSupabaseServer } from "./supabase/server";
import type { Profile } from "./types";

/** Devuelve el perfil del usuario logueado, o null. */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (data as Profile) ?? null;
}

/** Exige sesión (y opcionalmente rol); si no, redirige al login. */
export async function requireProfile(roles?: Role[]): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) redirect(`${ICS_BASE}/login`);
  if (roles && !roles.includes(profile.role)) redirect(ICS_BASE);
  return profile;
}

export function isStaff(profile: Profile): boolean {
  return profile.role === "admin" || profile.role === "team";
}
