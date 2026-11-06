"use client";

import { useState } from "react";

const CASOS_EXITO = [
  { slug: "win-huawei", client: "WIN × Huawei", title: "Naufragar", sub: "Un salvavidas naranja que es fibra óptica." },
  { slug: "acceso-smart", client: "Acceso Smart Perú", title: "¡Ábreme!", sub: "El comercial IA completo y cómo se hizo." },
  { slug: "zlink", client: "ZLink × ExpoAgua", title: "Medir lo invisible", sub: "Lo que el agua no deja ver, medido." },
  { slug: "wellmax", client: "Wellmax", title: "Encender una idea", sub: "Una luz que se enciende y una grilla que vuelve encendida." },
  { slug: "hikaru", client: "Hikaru", title: "La primera luz", sub: "La iluminación japonesa llega a Perú." },
];

// Un caso destacado a tamaño completo (4:3, como se produjeron) y la lista de
// los demás al lado: nada se comprime. Elegir uno de la lista lo pasa al
// destacado; "Con sonido" cambia el loop mudo por controles.
export default function CasosReel() {
  const [activo, setActivo] = useState(0);
  const [sonido, setSonido] = useState(false);
  const c = CASOS_EXITO[activo];

  return (
    <div className="hm-casos">
      <div className="hm-casos-main">
        <div className="hm-casos-media">
          <video
            key={`${c.slug}-${sonido}`}
            src={`/videos/casos/${c.slug}.mp4`}
            poster={`/videos/casos/${c.slug}.jpg`}
            autoPlay
            muted={!sonido}
            loop={!sonido}
            controls={sonido}
            playsInline
          />
        </div>
        <div className="hm-casos-info">
          <div>
            <span className="hm-caso-client">{c.client}</span>
            <strong>{c.title}</strong>
            <em>{c.sub}</em>
          </div>
          {!sonido && (
            <button type="button" className="hm-reel-play" onClick={() => setSonido(true)}>
              ▶ Ver con sonido
            </button>
          )}
        </div>
      </div>

      <ol className="hm-casos-lista">
        {CASOS_EXITO.map((x, i) => (
          <li key={x.slug}>
            <button
              type="button"
              className={i === activo ? "on" : ""}
              aria-current={i === activo}
              onClick={() => { setActivo(i); setSonido(false); }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/videos/casos/${x.slug}.jpg`} alt="" loading="lazy" />
              <span>
                <small>{x.client}</small>
                {x.title}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
