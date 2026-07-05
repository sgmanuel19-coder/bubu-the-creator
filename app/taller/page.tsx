import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidSession, TALLER_COOKIE } from "@/lib/taller/auth";
import TallerGate from "@/components/taller/TallerGate";

export default async function TallerPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(TALLER_COOKIE)?.value;
  if (await isValidSession(session)) {
    redirect("/taller/en-vivo");
  }
  return <TallerGate />;
}
