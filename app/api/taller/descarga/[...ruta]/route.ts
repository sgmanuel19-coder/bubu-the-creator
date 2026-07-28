import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { estaDesbloqueado } from "@/lib/taller/session";

// ============================================================
// Descarga protegida de archivos de la bóveda.
//
// Por qué existe: todo lo que vive en /public es accesible por URL
// directa sin contraseña. La Biblia Publicitaria es el bono estrella
// del curso, así que sus PDFs viven FUERA de /public (en private/) y
// solo se entregan si la sesión tiene el nivel correcto.
//
// URL:  /api/taller/descarga/biblia/<archivo>.pdf
// ============================================================

export const dynamic = "force-dynamic";

// carpeta pública del endpoint → carpeta real en disco + nivel exigido
const CARPETAS: Record<string, { dir: string; nivel: string }> = {
  biblia: { dir: "biblia", nivel: "grabado" },
};

const TIPOS: Record<string, string> = {
  ".pdf": "application/pdf",
  ".zip": "application/zip",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ruta: string[] }> },
) {
  const { ruta } = await params;
  const [carpeta, ...resto] = ruta ?? [];
  const config = CARPETAS[carpeta ?? ""];
  if (!config || resto.length === 0) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  if (!(await estaDesbloqueado(config.nivel))) {
    return NextResponse.json({ error: "Necesitas tu acceso de alumno" }, { status: 403 });
  }

  // El nombre llega de la URL: hay que impedir que salga de su carpeta
  // con "../". basename + comprobación de la ruta resuelta.
  const archivo = path.basename(decodeURIComponent(resto.join("/")));
  const extension = path.extname(archivo).toLowerCase();
  if (!TIPOS[extension]) {
    return NextResponse.json({ error: "Tipo no permitido" }, { status: 400 });
  }

  const base = path.join(process.cwd(), "private", config.dir);
  const destino = path.join(base, archivo);
  if (!destino.startsWith(base + path.sep)) {
    return NextResponse.json({ error: "Ruta inválida" }, { status: 400 });
  }

  try {
    const contenido = await readFile(destino);
    return new NextResponse(new Uint8Array(contenido), {
      headers: {
        "Content-Type": TIPOS[extension],
        "Content-Disposition": `attachment; filename="${encodeURIComponent(archivo)}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
  }
}
