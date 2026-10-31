"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { autoThumb, previewSrc, type Piece } from "@/lib/portafolio";
import { LIBRARY_PIECES } from "@/lib/portfolio-selection";
import { PortfolioPreview, usePageVisible } from "./PortfolioGallery";
import styles from "./PortfolioLibrary.module.css";

export default function PortfolioLibrary({ onOpen, paused }: { onOpen: (piece: Piece) => void; paused: boolean }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(18);
  const [flat, setFlat] = useState(false);
  const [lite, setLite] = useState(true);
  const [inView, setInView] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const [touch, setTouch] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{x: number; y: number} | null>(null);
  const swiped = useRef(false);
  const visible = usePageVisible();
  const totalPages = Math.ceil(LIBRARY_PIECES.length / pageSize);
  const pieces = LIBRARY_PIECES.slice(page * pageSize, (page + 1) * pageSize);

  useEffect(() => {
    const small = matchMedia("(max-width: 1024px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = matchMedia("(hover: none)");
    const update = () => {
      if (timer.current) clearTimeout(timer.current);
      setPageSize(small.matches ? 9 : 18); setPage(0); setSelected(null); setPreview(null);
      setTouch(coarse.matches);
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      setLite(reduced.matches || !!conn?.saveData);
    };
    update(); [small, reduced, coarse].forEach(q => q.addEventListener("change", update));
    return () => [small, reduced, coarse].forEach(q => q.removeEventListener("change", update));
  }, []);
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const observer = new IntersectionObserver(([e]) => {
      const show = e.isIntersecting && e.intersectionRatio >= 0.3;
      setInView(show);
      if (!show) { if (timer.current) clearTimeout(timer.current); setPreview(null); setSelected(null); }
    }, {threshold:[0,0.3]});
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current); if(timer.current) clearTimeout(timer.current); };
  }, []);
  const clearPreview = () => {
    if (timer.current) clearTimeout(timer.current);
    setPreview(null);
  };
  const go = (delta: number) => {
    clearPreview(); setSelected(null);
    setPage(p => (p + delta + totalPages) % totalPages);
  };
  const point = (x: number, y: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      stage.current?.style.setProperty("--camera-x", `${y * -3}deg`);
      stage.current?.style.setProperty("--camera-y", `${x * 4}deg`);
    });
  };
  const active = selected === null ? null : pieces[selected];
  return (
    <header className={styles.library} data-portfolio-library>
      <div className={`container-base ${styles.intro}`}>
        <div><span className={styles.eyebrow}>RESUELTO / Portafolio</span>
          <h1>Una biblioteca<br />de ideas en movimiento.</h1></div>
        <div className={styles.introAside}><p>Marcas, historias y mundos distintos.<br />Acércate a una pieza y dale play.</p>
          <a href="#trabajo">Explorar por marca <span aria-hidden="true">↘</span></a></div>
      </div>
      <div ref={stage} className={`${styles.stage} ${flat ? styles.flat : ""}`} data-library-stage data-view={flat ? "flat" : "3d"}
        onPointerMove={e => {
          if (e.pointerType !== "mouse" || lite || flat) return;
          const r = e.currentTarget.getBoundingClientRect();
          point((e.clientX - r.left) / r.width - .5, (e.clientY - r.top) / r.height - .5);
        }}
        onPointerLeave={e => { point(0,0); if(e.pointerType === "mouse") clearPreview(); }}
        onPointerDown={e => {
          if(e.pointerType !== "mouse") { touchStart.current = {x:e.clientX,y:e.clientY}; swiped.current = false; }
        }}
        onPointerUp={e => {
          const start = touchStart.current; touchStart.current = null;
          if (!start) return;
          const dx = e.clientX - start.x, dy = e.clientY - start.y;
          if(Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) { swiped.current = true; go(dx < 0 ? 1 : -1); }
        }}
        onPointerCancel={() => { touchStart.current = null; }}
        onClickCapture={e => { if(swiped.current) { e.preventDefault(); e.stopPropagation(); swiped.current = false; } }}>
        <div className={styles.floor} aria-hidden="true" />
        <div className={styles.board} key={`${page}-${pageSize}`}>
          {pieces.map((piece, i) => {
            const src = previewSrc(piece), poster = autoThumb(piece);
            const playing = preview === i && inView && visible && !paused;
            const label = piece.client === "Resuelto Agency" ? piece.category : piece.client.split(" · ")[0];
            return <button type="button" className={`${styles.tile} ${selected === i ? styles.selected : ""}`}
              style={{"--depth":`${Math.floor(i / (pageSize === 9 ? 3 : 6)) === 1 ? 24 : 0}px`} as CSSProperties}
              key={piece.url} aria-label={`Explorar ${label}: ${piece.label}`} data-library-card
              onPointerEnter={e => {
                if (e.pointerType !== "mouse") return;
                clearPreview(); setSelected(i);
                if (!lite) timer.current = setTimeout(() => setPreview(i),180);
              }}
              onPointerLeave={e => { if(e.pointerType === "mouse") clearPreview(); }}
              onFocus={() => setSelected(i)}
              onClick={e => {
                if (touch && e.detail !== 0) { setSelected(i); setPreview(p => p === i ? null : i); }
                else onOpen(piece);
              }}>
              <span className={styles.screen}>
                {poster && <Image src={poster} alt="" fill
                  sizes="(max-width:1024px) 30vw, 220px" loading={i < 6 ? "eager" : "lazy"}
                  className={styles.poster} />}
                {playing && src && <PortfolioPreview src={src} className={styles.preview} />}
                <span className={styles.play} aria-hidden="true">{playing ? "Ⅱ" : "↗"}</span>
              </span>
              <span className={styles.tileCaption}><b>{label}</b><small>{String(page * pageSize + i + 1).padStart(2,"0")}</small></span>
            </button>;
          })}
        </div>
      </div>
      <div className={`container-base ${styles.toolbar}`}>
        <div className={styles.readout} aria-live="polite">
          <span className={styles.eyebrow}>{active ? active.client.split(" · ")[0] : `${LIBRARY_PIECES.length} piezas · archivo IA`}</span>
          <p>{active ? active.label : touch ? "Desliza para recorrer · toca para previsualizar" : "Mueve el mouse para explorar la biblioteca"}</p>
        </div>
        <div className={styles.controls}>
          {active && <button type="button" className={styles.open} onClick={() => onOpen(active)}>Ver con sonido ↗</button>}
          <button type="button" className={styles.view} onClick={() => { setFlat(f => !f); point(0,0); }}>Vista {flat ? "3D" : "plana"}</button>
          <div className={styles.pager}>
            <button type="button" aria-label="Biblioteca: página anterior" onClick={() => go(-1)}>←</button>
            <span aria-live="polite">{String(page + 1).padStart(2,"0")} / {String(totalPages).padStart(2,"0")}</span>
            <button type="button" aria-label="Biblioteca: página siguiente" onClick={() => go(1)}>→</button>
          </div>
        </div>
      </div>
    </header>
  );
}
