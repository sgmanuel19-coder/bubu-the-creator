"use client";

/* eslint-disable @next/next/no-img-element */

import type { StoryboardFrame } from "@/lib/ics/types";

/**
 * Storyboard "tira de cine": scroll horizontal con snap en mobile,
 * grilla en desktop. Cada cuadro: imagen + LO QUE VEMOS / LO QUE DECIMOS.
 */
export default function StoryboardStrip({ frames }: { frames: StoryboardFrame[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-3 md:overflow-visible">
      {frames.map((f, i) => (
        <article
          key={f.id}
          className="snap-center shrink-0 w-[78vw] max-w-xs md:w-auto rounded-xl border border-white/10 bg-surface overflow-hidden"
        >
          <div className="relative aspect-[9/16] bg-surface-2">
            {f.image_url ? (
              <img
                src={f.image_url}
                alt={`Cuadro ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted text-xs">
                Sin imagen
              </div>
            )}
            <span className="absolute top-2 left-2 rounded bg-bg/80 px-2 py-0.5 text-[10px] font-mono">
              {i + 1}/{frames.length}
            </span>
            {f.duration_seconds != null && (
              <span className="absolute top-2 right-2 rounded bg-bg/80 px-2 py-0.5 text-[10px]">
                {f.duration_seconds}s
              </span>
            )}
          </div>
          <div className="p-3 space-y-2">
            {f.what_we_see && (
              <div>
                <p className="text-[10px] font-bold tracking-wider text-brand-blue uppercase">
                  Lo que vemos
                </p>
                <p className="text-xs leading-relaxed whitespace-pre-wrap">{f.what_we_see}</p>
              </div>
            )}
            {f.what_we_say && (
              <div>
                <p className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
                  Lo que decimos
                </p>
                <p className="text-xs leading-relaxed whitespace-pre-wrap italic">
                  “{f.what_we_say}”
                </p>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
