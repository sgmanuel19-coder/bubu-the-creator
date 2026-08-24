"use client";

import { useEffect, useState } from "react";

import { sello } from "@/lib/noticias/tiempo";

/**
 * El único trozo de JS del portal, y tiene una razón concreta.
 *
 * La portada es estática y se regenera cada 6 h. Si el "hace 2 horas"
 * se calculara solo en el servidor, quedaría congelado en el HTML: a
 * las cinco horas seguiría diciendo "hace 2 horas" y estaría mintiendo.
 * Esto lo recalcula al montar y cada minuto.
 *
 * El servidor igual pinta el texto (llega bien en el HTML, para Google
 * y para quien no tenga JS); `suppressHydrationWarning` está porque el
 * reloj del servidor y el del visitante nunca coinciden al milímetro.
 */
export default function TiempoRelativo({ iso }: { iso: string }) {
  const [texto, setTexto] = useState(() => sello(new Date(iso), Date.now()));

  useEffect(() => {
    const calcular = () => setTexto(sello(new Date(iso), Date.now()));
    calcular();
    const id = setInterval(calcular, 60_000);
    return () => clearInterval(id);
  }, [iso]);

  return (
    <time dateTime={iso} suppressHydrationWarning>
      {texto}
    </time>
  );
}
