"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

/* Intro de vuelo a través del material (patrón "Marvel Studios").
 *
 * La diferencia con una galería que se inclina: acá NO hay un plano que se
 * endereza. Hay una nube de piezas repartidas en profundidad y la cámara
 * avanza entre ellas — vienen desde el fondo, crecen y te pasan por los
 * costados. Eso es lo que da la sensación de atravesar el archivo.
 *
 * Cada pieza tiene una profundidad fija `zBase`; el scroll suma un avance
 * común a todas. Como el recorrido cubre todo el rango de profundidad, cada
 * pieza entra y sale exactamente una vez: no hace falta reciclarlas.
 */

const PROFUNDIDAD = 170; // separación entre piezas consecutivas, en px de z
/* La pieza se desvanece recién MUY cerca de la cámara. Con la perspectiva de
   820px, a z=400 ya se ve al doble de tamaño y a z=600 al triple: ahí es
   donde llena el cuadro y pasa de largo. Cortarla antes la dejaba chiquita. */
const Z_CERCA = 600;

/* En teléfono el vuelo se ejecuta en modo liviano: sin desenfoque animado,
   menos videos a la vez y sin promover capas de más. Los tres son los costos
   que medimos como causa del tirón en móvil. */
function useLiviano() {
  const [liviano, setLiviano] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const leer = () => setLiviano(mq.matches);
    leer();
    mq.addEventListener("change", leer);
    return () => mq.removeEventListener("change", leer);
  }, []);
  return liviano;
}

type Props = {
  /* Nombres de pieza (sin extensión). Se buscan en /images/portfolio/posters
     y /videos/preview. */
  piezas: string[];
  className?: string;
};

export function FlythroughIntro({ piezas, className }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  /* Se monta solo en el cliente. framer serializa los estilos del motion con
     otra precisión que el render del servidor ("30.8285%" vs
     "30.82846589297299%") y React lo reportaba como hydration mismatch. Es un
     efecto decorativo: no tiene por qué existir en el HTML del servidor. */
  const [montado, setMontado] = React.useState(false);
  React.useEffect(() => setMontado(true), []);
  const liviano = useLiviano();

  /* En liviano las piezas van más separadas en profundidad: la banda visible
     es la misma, así que entran menos a la vez (≈11 en vez de ≈15) y con
     ellas bajan las capas y los videos simultáneos. Es el mismo cuadro, solo
     que un poco más aireado. */
  const paso = liviano ? 240 : PROFUNDIDAD;
  const recorrido = piezas.length * paso + Z_CERCA * 2;
  /* Las piezas cubren exactamente un período de profundidad, así que al
     envolverlas la separación entre la última y la primera sigue siendo
     `paso`: la nube queda pareja para siempre. */
  const periodo = piezas.length * paso;

  /* Reacción al puntero: la nube se inclina siguiendo el mouse o el dedo.
     Va con muelle para que no siga el cursor de forma rígida — el rebote es
     lo que la hace sentir viva y no un objeto pegado al puntero. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [9, -9]);
  const rotateX = useTransform(sy, [-1, 1], [-7, 7]);

  const alMover = (e: React.PointerEvent<HTMLDivElement>) => {
    const c = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - c.left) / c.width) * 2 - 1);
    py.set(((e.clientY - c.top) / c.height) * 2 - 1);
  };
  const alSalir = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div ref={ref} className={className}>
      <div
        className="fly-sticky"
        onPointerMove={alMover}
        onPointerLeave={alSalir}
        onPointerCancel={alSalir}
      >
        <motion.div className="fly-camara" style={{ rotateX, rotateY }}>
          {montado && piezas.map((nombre, i) => (
            <Pieza
              key={nombre + i}
              nombre={nombre}
              indice={i}
              zBase={-(i * paso) - Z_CERCA}
              recorrido={recorrido}
              periodo={periodo}
              progreso={scrollYProgress}
              liviano={liviano}
            />
          ))}
        </motion.div>
        {/* Viñeta: cierra los bordes y refuerza la lectura de túnel. */}
        <div className="fly-vineta" aria-hidden="true" />
      </div>
    </div>
  );
}

function Pieza({
  nombre,
  indice,
  zBase,
  recorrido,
  periodo,
  progreso,
  liviano,
}: {
  nombre: string;
  indice: number;
  zBase: number;
  recorrido: number;
  periodo: number;
  progreso: MotionValue<number>;
  liviano: boolean;
}) {
  /* Profundidad cíclica. Antes cada pieza cruzaba una sola vez, y como el
     recorrido termina cuando sale la última, sobre el final ya no quedaban
     piezas atrás para entrar: medido, la nube pasaba de 15 piezas a 0 y el
     último tercio del scroll era pantalla negra. Al envolver la z, la que
     sale por delante reaparece en el fondo y la densidad no cambia nunca.
     El salto no se ve porque en los dos extremos la opacidad ya es 0. */
  const z = useTransform(progreso, (p) => {
    const rel = zBase + recorrido * p - Z_CERCA;
    return (((rel % periodo) + periodo) % periodo) + Z_CERCA - periodo;
  });

  /* Aparece desde el fondo y se apaga justo antes de rozar la cámara, para
     que nunca se vea el corte de una pieza atravesando el plano. */
  const opacity = useTransform(z, [-2000, -1250, 505, Z_CERCA], [0, 1, 1, 0]);
  /* Brillo y saturación bajos a propósito: esta intro es atmósfera, y las
     piezas reales del portafolio van más abajo a pleno color. Si acá salieran
     al 100% competirían con ellas y el ojo no sabría dónde mirar.

     En liviano el desenfoque sale de la ecuación: animar un blur obliga al
     navegador a recalcularlo en cada cuadro y era el costo más alto de todos.
     La profundidad se sigue leyendo por el tamaño y la opacidad. */
  const filter = useTransform(z, (v) => {
    /* Fuera de la banda visible la pieza está en opacidad 0, pero el filtro
       se seguía evaluando: medido en escritorio, 26 piezas desenfocándose a
       9px sin que nadie las vea. `none` las saca del trabajo de filtrado. */
    if (v <= -2000 || v >= Z_CERCA) return "none";
    const base = "brightness(0.52) saturate(0.78) contrast(1.05)";
    if (liviano) return base;
    /* Desenfoque calculado acá y no en un MotionValue aparte: encadenar dos
       transforms sobre la misma z depende del orden de suscripción de
       framer, y eso es una dependencia oculta que no quiero. */
    const b = Math.min(9, Math.max(0, (9 * (v + 1150)) / -850));
    return `blur(${b.toFixed(2)}px) ${base}`;
  });

  /* El video solo se monta mientras la pieza está en la banda visible: en un
     vuelo de 20 piezas, montarlas todas serían 20 decodificaciones a la vez. */
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [enCuadro, setEnCuadro] = React.useState(false);
  /* Dos bandas distintas: la ancha decide si la pieza merece capa propia, la
     angosta si además carga su video. En liviano la de video es mucho más
     corta — pasamos de 10 clips decodificando a la vez a 4. */
  const bandaVideo = liviano ? -650 : -1450;
  const evaluar = React.useCallback(
    (v: number) => {
      const conVideo = v > bandaVideo && v < Z_CERCA;
      setVisible((prev) => (prev === conVideo ? prev : conVideo));
      const dentro = v > -2100 && v < Z_CERCA + 100;
      setEnCuadro((prev) => (prev === dentro ? prev : dentro));
    },
    [bandaVideo]
  );

  useMotionValueEvent(z, "change", evaluar);

  /* Evaluación inicial además de la del evento: `useMotionValueEvent` solo
     dispara al CAMBIAR, así que si alguien entra con la página ya scrolleada
     —volviendo con el botón atrás, o recargando a mitad— las piezas quedaban
     renderizadas pero sin video y sin capa hasta que movía el dedo. */
  React.useEffect(() => {
    evaluar(z.get());
  }, [evaluar, z]);

  /* El atributo autoPlay no alcanza: el <video> se monta después, dentro de
     un contenedor con transform 3D, y el navegador no lo arranca. Verificado
     en producción — los clips quedaban cargados (readyState 4) y pausados. */
  const arrancar = React.useCallback(() => {
    const el = videoRef.current;
    if (el && visible) el.play().catch(() => {});
  }, [visible]);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (visible) el.play().catch(() => {});
    else el.pause();
  }, [visible]);

  /* Posiciones fijas alternando cuadrante. El reparto radial por ángulo áureo
     que había antes tenía sesgo: en cualquier ventana de 6 piezas seguidas
     —que son las que se ven a la vez— la media no daba en el centro y todo
     se amontonaba arriba a la izquierda, dejando medio cuadro negro. Con
     ocho anclas rotativas, cada pieza cae del lado opuesto a la anterior y
     el vuelo cubre la pantalla entera. */
  /* Verticalmente muy abiertas: varias caen fuera del cuadro y se cortan
     contra el borde. Es lo que hace leer que arriba y abajo la nube sigue,
     en vez de terminarse en una banda centrada. */
  /* La perspectiva arrastra las piezas lejanas hacia el centro, así que un
     ancla alta solo llega al borde cuando la pieza ya está cerca. Estos
     valores medios son los que proyectan fuera del cuadro justo mientras la
     pieza todavía está opaca: ahí es cuando se corta contra el filo y se lee
     que la nube sigue más allá de la pantalla. */
  const anclas = [
    [-34, -30], [32, 26], [-26, 34], [30, -33],
    [-40, 14], [38, -16], [-15, -38], [17, 38],
  ];
  const [ax, ay] = anclas[indice % anclas.length];
  /* Desplazamiento leve por vuelta para que la segunda pasada no calque la
     primera. */
  const vuelta = Math.floor(indice / anclas.length) * 5;
  const x = ax + (indice % 3) * 3 - vuelta;
  const y = ay + (indice % 2) * 4;
  /* Inclinación mínima por pieza: rompe la sensación de mosaico ordenado. */
  const giro = ((indice % 5) - 2) * 1.6;

  return (
    <motion.div
      className="fly-pieza"
      style={{
        z,
        opacity,
        filter,
        rotate: giro,
        /* El centrado va en el propio transform: con margin negativo habría
           que recalcularlo cada vez que cambia el ancho de la pieza. */
        x: "-50%",
        y: "-50%",
        /* Capa de GPU solo mientras la pieza está en cuadro. Promoverlas las
           36 de entrada saturaba la memoria de video del teléfono. */
        willChange: enCuadro ? "transform, opacity" : "auto",
        /* Con opacidad 0 el compositor igual mantiene y compone la capa.
           `hidden` la saca del pintado: son ~22 de las 36 en cualquier
           momento. La banda de `enCuadro` es más ancha que la de opacidad,
           así que nunca se oculta algo que todavía se vea. */
        visibility: enCuadro ? "visible" : "hidden",
        left: `${(50 + x).toFixed(3)}%`,
        top: `${(50 + y).toFixed(3)}%`,
      }}
    >
      <div className="fly-int">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/portfolio/posters/${nombre}.jpg`} alt="" loading="lazy" />
        {visible && (
          <video
            ref={videoRef}
            src={`/videos/preview/${nombre}.mp4`}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            onCanPlay={arrancar}
            onLoadedData={arrancar}
            tabIndex={-1}
            aria-hidden="true"
            disablePictureInPicture
          />
        )}
      </div>
    </motion.div>
  );
}
