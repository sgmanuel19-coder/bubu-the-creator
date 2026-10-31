import { CHAPTERS, type Piece } from "./portafolio";

/** Round-robin by brand: a large campaign never occupies the whole opening. */
export function mixBrands<T extends Piece>(pieces: T[]): T[] {
  const groups = new Map<string, T[]>();
  for (const piece of pieces) {
    const brand = piece.client.split(" · ")[0];
    if (!groups.has(brand)) groups.set(brand, []);
    groups.get(brand)!.push(piece);
  }
  const result: T[] = [];
  for (let i = 0; result.length < pieces.length; i++) {
    for (const group of groups.values()) if (group[i]) result.push(group[i]);
  }
  return result;
}

// Curated opening, followed by the complete AI library. All URLs come from
// the portfolio catalogue; titles, clients and playback stay in sync.
const OPENING = [
  "/videos/win-huawei-naufrago.mp4", "/videos/rolex-comercial.mp4", "/videos/lacoste-comercial.mp4",
  "/videos/comercial-11.mp4", "/videos/comercial-01.mp4", "/videos/comercial-10.mp4",
  "/videos/comercial-08.mp4", "/videos/producto-01.mp4", "/videos/avatar-1014.mp4",
  "/videos/story-01.mp4", "/videos/win-fibrin-halloween.mp4", "/videos/ugc-01.mp4",
  "/videos/producto-03.mp4", "/videos/story-04.mp4", "/videos/win-tesla-storytelling.mp4",
  "/videos/ugc-03.mp4", "/videos/avatar-04.mp4", "/videos/story-08.mp4",
];
const all = CHAPTERS.flatMap(chapter => chapter.pieces.filter(p => p.url).map(p => ({ ...p, category: chapter.title })));
const opening = OPENING.flatMap(url => all.filter(p => p.url === url));
export const LIBRARY_PIECES = [...opening, ...mixBrands(all.filter(p => !OPENING.includes(p.url!)))];
