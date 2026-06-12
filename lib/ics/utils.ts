import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

/** Convierte un link de Google Drive a URL embebible (iframe /preview). */
export function driveEmbedUrl(link: string | null): string | null {
  if (!link) return null;
  const m = link.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  const open = link.match(/[?&]id=([^&]+)/);
  if (open && link.includes("drive.google.com"))
    return `https://drive.google.com/file/d/${open[1]}/preview`;
  return null;
}

export function fmtDate(iso: string | null, pattern = "EEE d MMM"): string {
  if (!iso) return "Sin fecha";
  return format(parseISO(iso), pattern, { locale: es });
}

export function fmtMonth(iso: string): string {
  return format(parseISO(iso), "MMMM yyyy", { locale: es });
}
