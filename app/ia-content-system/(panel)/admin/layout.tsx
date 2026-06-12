import { requireProfile } from "@/lib/ics/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireProfile(["admin", "team"]);
  return <>{children}</>;
}
