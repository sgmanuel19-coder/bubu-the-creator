// ============================================================
// PORTAFOLIO — DATA EDITABLE
// Para agregar un video a una sección, pega su link en `url`.
//
//   ★ RECOMENDADO — Google Drive (miniatura automática + video limpio):
//     sube el video a Drive, compártelo como "Cualquiera con el enlace",
//     y pega el link:  https://drive.google.com/file/d/FILE_ID/view
//
//   También soportado:
//   Archivo propio: coloca el mp4 en /public/videos/ → url: "/videos/pieza.mp4"
//   Instagram: https://www.instagram.com/reel/XXXX/  ó  /p/XXXX/   (muestra la UI de Instagram)
//   TikTok:    https://www.tiktok.com/@user/video/1234567890
//   YouTube:   https://www.youtube.com/watch?v=XXXX  (usa wide:true para 16:9)
//
// Un slot con url:null se muestra como "Tu pieza reciente + agregar".
// Todo lo de estos capítulos es TRABAJO RECIENTE HECHO CON IA.
// ============================================================

export type Piece = {
  url: string | null;
  label: string;
  client: string;
  wide?: boolean;
  // Miniatura opcional (ruta en /public, ej. "/images/portfolio/thumbs/comercial-1.jpg").
  // Si no se define: mp4 usa su primer frame, YouTube usa su thumbnail automático.
  thumb?: string;
};

export type Chapter = {
  n: string;
  id: string;
  title: string;
  desc: string;
  pieces: Piece[];
};

// Video que resume el portafolio — va en el hero, al lado del título.
export const SHOWREEL = {
  url: "https://www.instagram.com/p/DZ3ZQ7qOAY0/",
  handle: "@bubu_thecreator",
};

export const CHAPTERS: Chapter[] = [
  {
    n: "01",
    id: "comerciales-ia",
    title: "Comerciales IA",
    desc: "Spots y campañas generados con IA: nivel de producción cinematográfica sin rodaje ni set.",
    pieces: [
      { url: null, label: "Comercial IA", client: "Tu pieza reciente" },
      { url: null, label: "Comercial IA", client: "Tu pieza reciente" },
      { url: null, label: "Comercial IA", client: "Tu pieza reciente" },
      { url: null, label: "Comercial IA", client: "Tu pieza reciente" },
      { url: null, label: "Comercial IA", client: "Tu pieza reciente" },
    ],
  },
  {
    n: "02",
    id: "video-producto-ia",
    title: "Video de Producto IA",
    desc: "Producto que se ve premium sin estudio: generación IA + criterio de dirección de arte.",
    pieces: [
      { url: null, label: "Video producto IA", client: "Tu pieza reciente" },
      { url: null, label: "Video producto IA", client: "Tu pieza reciente" },
      { url: null, label: "Video producto IA", client: "Tu pieza reciente" },
      { url: null, label: "Video producto IA", client: "Tu pieza reciente" },
      { url: null, label: "Video producto IA", client: "Tu pieza reciente" },
    ],
  },
  {
    n: "03",
    id: "ugc-ia",
    title: "UGC IA",
    desc: "Prueba social a escala: creadores generados con IA hablando del producto como un usuario real.",
    pieces: [
      { url: "https://www.instagram.com/reel/DSXaFmajAYQ/", label: "Experto IA", client: "Livoltek" },
      { url: null, label: "UGC IA", client: "Tu pieza reciente" },
      { url: null, label: "UGC IA", client: "Tu pieza reciente" },
      { url: null, label: "UGC IA", client: "Tu pieza reciente" },
      { url: null, label: "UGC IA", client: "Tu pieza reciente" },
    ],
  },
  {
    n: "04",
    id: "storytelling-ia",
    title: "Storytelling & B-Rolls IA",
    desc: "Narrativa de marca y b-rolls cinematográficos generados con IA que construyen percepción premium.",
    pieces: [
      { url: null, label: "Storytelling IA", client: "Tu pieza reciente" },
      { url: null, label: "B-Roll IA", client: "Tu pieza reciente" },
      { url: null, label: "Storytelling IA", client: "Tu pieza reciente" },
      { url: null, label: "B-Roll IA", client: "Tu pieza reciente" },
      { url: null, label: "Storytelling IA", client: "Tu pieza reciente" },
    ],
  },
  {
    n: "05",
    id: "content-ia",
    title: "Content IA",
    desc: "Contenido continuo para redes producido con IA: formatos expertos, trends y sistemas de producción.",
    pieces: [
      { url: "https://www.instagram.com/reel/DW6m1y9E6hy/", label: "Contenido IA", client: "WIN Internet" },
      { url: null, label: "Contenido IA", client: "Tu pieza reciente" },
      { url: null, label: "Contenido IA", client: "Tu pieza reciente" },
      { url: "https://www.youtube.com/watch?v=pKEcI6peLSA", label: "Automatizaciones IA", client: "Resuelto", wide: true },
    ],
  },
];

// True si la url es un archivo de video propio (se muestra SOLO el video).
export function isVideoFile(url: string | null): boolean {
  if (!url) return false;
  return /\.(mp4|webm|mov|m4v)$/i.test(url) || url.startsWith("/videos/");
}

// Extrae el ID de un link de Google Drive.
//   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   https://drive.google.com/open?id=FILE_ID
export function driveId(url: string | null): string | null {
  if (!url || !url.includes("drive.google.com")) return null;
  const m = url.match(/\/file\/d\/([^/?#]+)/) || url.match(/[?&]id=([^&#]+)/);
  return m ? m[1] : null;
}

// Extrae el ID de un link de YouTube.
export function youtubeId(url: string | null): string | null {
  if (!url) return null;
  if (url.includes("youtu.be")) return url.split("youtu.be/")[1]?.split(/[?&/]/)[0] || null;
  if (url.includes("youtube.com")) return new URLSearchParams(url.split("?")[1] || "").get("v");
  return null;
}

// Miniatura automática para la tarjeta de la galería.
export function autoThumb(piece: Piece): string | null {
  if (piece.thumb) return piece.thumb;
  const dv = driveId(piece.url);
  if (dv) return `https://drive.google.com/thumbnail?id=${dv}&sz=w800`;
  const yt = youtubeId(piece.url);
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
  return null;
}

// Convierte un link de la pieza al src del iframe embebido.
export function embedSrc(url: string | null): string | null {
  if (!url) return null;
  if (isVideoFile(url)) return url;
  const dv = driveId(url);
  if (dv) return `https://drive.google.com/file/d/${dv}/preview`;
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split(/[?&/]/)[0]
      : new URLSearchParams(url.split("?")[1] || "").get("v");
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (url.includes("tiktok.com")) {
    const id = url.split("/video/")[1]?.split(/[?&/]/)[0];
    return id ? `https://www.tiktok.com/embed/v2/${id}` : null;
  }
  if (url.includes("instagram.com")) {
    return url.replace(/\/?$/, "/") + "embed/";
  }
  return null;
}
