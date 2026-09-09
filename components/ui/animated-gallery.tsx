"use client";

import * as React from "react";
import {
  type HTMLMotionProps,
  type MotionValue,
  type Variants,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

/* Galería 3D por scroll: el plano arranca inclinado 75° y se endereza a
   medida que bajás, con las columnas moviéndose a distinta velocidad.

   Adaptado de `motion/react` a `framer-motion`, que es lo que el proyecto ya
   usa — la API de useScroll/useTransform/MotionValue es idéntica. Instalar
   `motion` al lado habría duplicado la librería en el bundle. */

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

const SPRING_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
  duration: 0.3,
} as const;

const blurVariants: Variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(
  undefined
);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error("useContainerScrollContext debe usarse dentro de <ContainerScroll>");
  }
  return context;
}

export const ContainerScroll = ({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[120vh]", className)}
        style={{
          perspective: "1000px",
          perspectiveOrigin: "center top",
          transformStyle: "preserve-3d",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};
ContainerScroll.displayName = "ContainerScroll";

export const ContainerSticky = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("sticky left-0 top-0 min-h-[30rem] w-full overflow-hidden", className)}
    style={{
      perspective: "1000px",
      perspectiveOrigin: "center top",
      transformStyle: "preserve-3d",
      transformOrigin: "50% 50%",
      ...style,
    }}
    {...props}
  />
);
ContainerSticky.displayName = "ContainerSticky";

export const GalleryContainer = ({
  children,
  className,
  style,
  ...props
}: HTMLMotionProps<"div">) => {
  const { scrollYProgress } = useContainerScrollContext();
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [75, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 0.9], [1.2, 1]);
  /* Empuje de cámara: el plano arranca atrás, llega a neutro cuando termina
     de enderezarse y sigue avanzando hacia el espectador. Sin esto la
     inclinación sola se siente plana, no como atravesar el material. */
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-180, 0, 200]);

  return (
    <motion.div
      className={cn("relative grid size-full grid-cols-3 gap-2 rounded-2xl", className)}
      style={{
        rotateX,
        scale,
        z,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
GalleryContainer.displayName = "GalleryContainer";

export const GalleryCol = ({
  className,
  style,
  yRange = ["0%", "-10%"],
  ...props
}: HTMLMotionProps<"div"> & { yRange?: string[] }) => {
  const { scrollYProgress } = useContainerScrollContext();
  const y = useTransform(scrollYProgress, [0.5, 1], yRange);

  return (
    <motion.div
      className={cn("relative flex w-full flex-col gap-2", className)}
      style={{ y, ...style }}
      {...props}
    />
  );
};
GalleryCol.displayName = "GalleryCol";

export const ContainerStagger = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, viewport, transition, ...props }, ref) => (
    <motion.div
      className={cn("relative", className)}
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, ...viewport }}
      transition={{ staggerChildren: transition?.staggerChildren ?? 0.2, ...transition }}
      {...props}
    />
  )
);
ContainerStagger.displayName = "ContainerStagger";

export const ContainerAnimated = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, transition, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={blurVariants}
      transition={transition ?? SPRING_CONFIG}
      {...props}
    />
  )
);
ContainerAnimated.displayName = "ContainerAnimated";
