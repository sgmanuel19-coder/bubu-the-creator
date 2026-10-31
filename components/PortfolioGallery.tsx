"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { autoThumb, previewSrc, type Chapter, type Piece } from "@/lib/portafolio";
import { mixBrands } from "@/lib/portfolio-selection";
import styles from "./PortfolioGallery.module.css";

// One budget shared by the gallery, archive and pricing examples.
const slots = new Set<() => void>();
const waiting = new Set<() => void>();
function acquire(grant: () => void) {
  if (slots.size < 3) { slots.add(grant); grant(); }
  else waiting.add(grant);
  return () => {
    waiting.delete(grant);
    if (!slots.delete(grant)) return;
    const next = waiting.values().next().value;
    if (next) { waiting.delete(next); slots.add(next); next(); }
  };
}

/** Mount only while requested. Unmount releases both the decoder and the slot. */
export function PortfolioPreview({ src, className }: { src: string; className?: string }) {
  const [granted, setGranted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (failed) return;
    return acquire(() => setGranted(true));
  }, [failed]);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.play().catch(() => setFailed(true));
    return () => { video.pause(); video.removeAttribute("src"); video.load(); };
  }, [granted, failed]);
  if (!granted || failed) return null;
  return <video ref={ref} className={className} src={src} muted loop playsInline
    preload="none" tabIndex={-1} aria-hidden="true" disablePictureInPicture
    data-portfolio-preview="true" style={{ opacity: ready ? 1 : 0 }}
    onPlaying={() => setReady(true)} onError={() => setFailed(true)} />;
}

export function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update(); document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

function GalleryCard({ piece, onOpen, paused, lite }: {
  piece: Piece; onOpen: (piece: Piece) => void; paused: boolean; lite: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const pointer = useRef("mouse");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [intent, setIntent] = useState(false);
  const thumb = autoThumb(piece);
  const preview = previewSrc(piece);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.4);
      if (!entry.isIntersecting || entry.intersectionRatio < 0.4) { setTapped(false); setHovered(false); }
    }, { threshold: [0, 0.4], rootMargin: "0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  // Brief hover delay avoids downloading every card crossed by the pointer.
  useEffect(() => {
    if (!(hovered && !lite) && !tapped) { setIntent(false); return; }
    const timer = window.setTimeout(() => setIntent(true), tapped ? 0 : 180);
    return () => window.clearTimeout(timer);
  }, [hovered, tapped, lite]);
  const active = visible && !paused && intent && ((hovered && !lite) || tapped);
  return (
    <article ref={ref} className={styles.card} data-portfolio-card>
      <button type="button" className={styles.media} disabled={!piece.url}
        aria-label={`Vista previa: ${piece.label} — ${piece.client}`}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse") setHovered(false); }}
        onPointerDown={(e) => { pointer.current = e.pointerType; }}
        onClick={(e) => {
          if (!piece.url) return;
          if (e.detail !== 0 && pointer.current !== "mouse" && preview) setTapped(v => !v);
          else onOpen(piece);
        }}>
        {thumb && <Image src={thumb} alt={`${piece.label} — ${piece.client}`} fill
          sizes="(max-width:600px) 90vw, (max-width:1100px) 43vw, 28vw" loading="lazy"
          className={styles.poster} />}
        {active && preview && <PortfolioPreview src={preview} className={styles.preview} />}
        <span className={styles.previewHint} aria-hidden="true">
          {active ? "Vista previa · sin sonido" : <><span className={styles.desktopHint}>Pasar para explorar</span><span className={styles.touchHint}>Toca para previsualizar</span></>}
        </span>
        <span className={styles.play} aria-hidden="true">{active ? "Ⅱ" : "▷"}</span>
      </button>
      <div className={styles.caption}>
        <div><h4>{piece.label}</h4><p>{piece.client.split(" · ")[0]}</p></div>
        <button type="button" disabled={!piece.url} onClick={() => onOpen(piece)}
          aria-label={`Ver completo: ${piece.label} — ${piece.client}`}>Ver completo <span aria-hidden="true">↗</span></button>
      </div>
    </article>
  );
}

export default function PortfolioGallery({ chapters, onOpen, paused = false, eyebrow, title }: {
  chapters: Chapter[]; onOpen: (piece: Piece) => void; paused?: boolean;
  eyebrow?: string; title?: ReactNode;
}) {
  const [category, setCategory] = useState(0);
  const [brand, setBrand] = useState(-1);
  const [limit, setLimit] = useState(6);
  const [lite, setLite] = useState(false);
  const pageVisible = usePageVisible();
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => setLite(mq.matches || !!connection?.saveData);
    update(); mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const chapter = chapters[category];
  const brands = [...new Set(chapter.pieces.map(p => p.client))];
  const selected = brand < 0 ? null : brands[brand];
  const pieces = selected ? chapter.pieces.filter(p => p.client === selected) : mixBrands(chapter.pieces);
  const selectBrand = (index: number) => { setBrand(index); setLimit(6); };
  return (
    <div className={styles.gallery} data-portfolio-gallery>
      {title && <header className={styles.heading}><span>{eyebrow}</span><h2>{title}</h2>
        <p>Explora por especialidad y por marca. Abre cada pieza para verla completa con sonido.</p></header>}
      <nav className={styles.categories} aria-label="Especialidades del portafolio">
        {chapters.map((c, i) => <button key={c.id} type="button" aria-pressed={category === i}
          onClick={() => { setCategory(i); setBrand(-1); setLimit(6); }}>
          <span>{c.title}</span><small>{String(c.pieces.length).padStart(2, "0")}</small>
        </button>)}
      </nav>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <span className={styles.eyebrow}>Cliente / proyecto</span>
          <div className={styles.brandButtons}>
            <button type="button" aria-pressed={selected === null} onClick={() => selectBrand(-1)}>
              <span>Todas las marcas</span><b>{chapter.pieces.length}</b>
            </button>
            {brands.map((name, i) => <button type="button" key={name} aria-pressed={selected === name}
              onClick={() => selectBrand(i)}><span>{name.split(" · ")[0]}
                {name.includes(" · ") && <small>{name.split(" · ").slice(1).join(" · ")}</small>}</span>
              <b>{chapter.pieces.filter(p => p.client === name).length}</b></button>)}
          </div>
          <label className={styles.mobileSelect}><span className={styles.srOnly}>Cliente o proyecto</span>
            <select value={selected ? brands.indexOf(selected) : -1} onChange={e => selectBrand(Number(e.target.value))}>
              <option value={-1}>Todas las marcas</option>
              {brands.map((name, i) => <option key={name} value={i}>{name}</option>)}
            </select>
          </label>
        </aside>
        <div className={styles.results}>
          <header className={styles.groupHeader}><div><h3>{selected ?? "Todas las marcas"}</h3><p>{chapter.desc}</p></div>
            <span>{String(pieces.length).padStart(2, "0")} piezas</span></header>
          <div className={styles.grid} key={`${chapter.id}-${selected}`}>
            {pieces.slice(0, limit).map(p => <GalleryCard key={p.url ?? p.label} piece={p} onOpen={onOpen}
              paused={paused || !pageVisible} lite={lite} />)}
          </div>
          <footer className={styles.more}><span aria-live="polite">{Math.min(limit, pieces.length)} de {pieces.length} piezas</span>
            {pieces.length > limit && <button type="button" onClick={() => setLimit(v => v + 6)}>Mostrar más <span aria-hidden="true">+</span></button>}
          </footer>
        </div>
      </div>
    </div>
  );
}
