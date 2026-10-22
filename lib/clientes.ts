// Logos reales de clientes. Los usan el inicio (Home) y el portafolio (/casos),
// así que un logo nuevo se agrega aquí una sola vez.
//
// ratio = ancho/alto del archivo ya recortado. La altura se calcula por área
// visual (no por alto fijo) para que un logo ancho no se vea más grande que
// uno compacto; boost compensa trazos finos (win) o lemas pequeños (Wellmax).
export const CLIENTES = [
  { name: "WIN Internet", src: "/images/clientes/win.png", ratio: 2.43, boost: 1.3 },
  { name: "Wellmax", src: "/images/clientes/wellmax.png", ratio: 5.22, boost: 1.35 },
  { name: "Hikaru", src: "/images/clientes/hikaru.png", ratio: 3.38 },
  { name: "Livoltek", src: "/images/clientes/livoltek.svg", ratio: 5.88 },
  { name: "ZLink", src: "/images/clientes/zlink.png", ratio: 3.57 },
  { name: "Acceso Smart Perú", src: "/images/clientes/acceso-smart.png", ratio: 2.41, boost: 1.3 },
  { name: "Grimm Store", src: "/images/clientes/grimm.png", ratio: 1.11 },
];

export const logoAlto = (l: { ratio: number; boost?: number }) =>
  Math.min(54, Math.round(Math.sqrt(4800 / l.ratio) * (l.boost ?? 1)));
