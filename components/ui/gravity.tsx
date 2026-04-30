"use client";

import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import Matter, {
  Bodies,
  Common,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  World,
} from "matter-js";

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
) {
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100;
    return containerSize * percentage;
  }
  return typeof value === "number"
    ? value
    : elementSize - containerSize + elementSize / 2;
}

type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  gravity?: { x: number; y: number };
  resetOnResize?: boolean;
  grabCursor?: boolean;
  addTopWall?: boolean;
  autoStart?: boolean;
  className?: string;
};

type PhysicsBody = {
  element: HTMLElement;
  body: Matter.Body;
  props: MatterBodyProps;
};

type MatterBodyProps = {
  children: ReactNode;
  matterBodyOptions?: Matter.IBodyDefinition;
  isDraggable?: boolean;
  bodyType?: "rectangle" | "circle";
  x?: number | string;
  y?: number | string;
  angle?: number;
  className?: string;
};

export type GravityRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

const GravityContext = createContext<{
  registerElement: (id: string, element: HTMLElement, props: MatterBodyProps) => void;
  unregisterElement: (id: string) => void;
} | null>(null);

const MatterBody = ({
  children,
  className,
  matterBodyOptions = {
    friction: 0.3,
    restitution: 0.2,
    density: 0.002,
    isStatic: false,
  },
  bodyType = "rectangle",
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(GravityContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    context.registerElement(idRef.current, elementRef.current, {
      children,
      matterBodyOptions,
      bodyType,
      isDraggable,
      x,
      y,
      angle,
      ...props,
    });
    return () => context.unregisterElement(idRef.current);
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn("absolute", className, isDraggable ? "pointer-events-none" : undefined)}
    >
      {children}
    </div>
  );
};

const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      addTopWall = false,
      autoStart = true,
      className,
      ...props
    },
    ref
  ) => {
    const canvas = useRef<HTMLDivElement>(null);
    const engine = useRef(Engine.create());
    const render = useRef<Render>();
    const runner = useRef<Runner>();
    const bodiesMap = useRef(new Map<string, PhysicsBody>());
    const frameId = useRef<number>();
    const mouseConstraint = useRef<Matter.MouseConstraint>();
    const mouseDown = useRef(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const isRunning = useRef(false);

    const registerElement = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        if (!canvas.current) return;
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const canvasRect = canvas.current.getBoundingClientRect();
        const angle = (props.angle || 0) * (Math.PI / 180);
        const x = calculatePosition(props.x, canvasRect.width, width);
        const y = calculatePosition(props.y, canvasRect.height, height);

        const renderOpts = { fillStyle: debug ? "#888" : "#0000", strokeStyle: debug ? "#333" : "#0000", lineWidth: debug ? 3 : 0 };
        // Cast to any to avoid IChamfer null vs undefined mismatch between @types/matter-js versions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bodyOpts: any = { ...props.matterBodyOptions, angle, render: renderOpts };

        let body: Matter.Body;
        if (props.bodyType === "circle") {
          const radius = Math.max(width, height) / 2;
          body = Bodies.circle(x, y, radius, bodyOpts);
        } else {
          body = Bodies.rectangle(x, y, width, height, bodyOpts);
        }

        World.add(engine.current.world, [body]);
        bodiesMap.current.set(id, { element, body, props });
      },
      [debug]
    );

    const unregisterElement = useCallback((id: string) => {
      const entry = bodiesMap.current.get(id);
      if (entry) {
        World.remove(engine.current.world, entry.body);
        bodiesMap.current.delete(id);
      }
    }, []);

    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const rotation = body.angle * (180 / Math.PI);
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
      });
      frameId.current = requestAnimationFrame(updateElements);
    }, []);

    const initializeRenderer = useCallback(() => {
      if (!canvas.current) return;
      const height = canvas.current.offsetHeight;
      const width = canvas.current.offsetWidth;

      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        Common.setDecomp(require("poly-decomp"));
      } catch (_) { /* ok */ }

      engine.current.gravity.x = gravity.x;
      engine.current.gravity.y = gravity.y;

      render.current = Render.create({
        element: canvas.current,
        engine: engine.current,
        options: { width, height, wireframes: false, background: "#00000000" },
      });

      const mouse = Mouse.create(render.current.canvas);
      mouseConstraint.current = MouseConstraint.create(engine.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: debug } },
      });

      const walls = [
        Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true, friction: 1, render: { visible: debug } }),
        Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true, friction: 1, render: { visible: debug } }),
        Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true, friction: 1, render: { visible: debug } }),
      ];
      if (addTopWall) {
        walls.push(Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true, friction: 1, render: { visible: debug } }));
      }

      const touchingMouse = () =>
        Query.point(engine.current.world.bodies, mouseConstraint.current?.mouse.position || { x: 0, y: 0 }).length > 0;

      if (grabCursor) {
        Events.on(engine.current, "beforeUpdate", () => {
          if (canvas.current) {
            canvas.current.style.cursor = touchingMouse() ? (mouseDown.current ? "grabbing" : "grab") : "default";
          }
        });
        canvas.current.addEventListener("mousedown", () => {
          mouseDown.current = true;
          if (canvas.current) canvas.current.style.cursor = touchingMouse() ? "grabbing" : "default";
        });
        canvas.current.addEventListener("mouseup", () => {
          mouseDown.current = false;
          if (canvas.current) canvas.current.style.cursor = touchingMouse() ? "grab" : "default";
        });
      }

      World.add(engine.current.world, [mouseConstraint.current, ...walls]);
      render.current.mouse = mouse;
      runner.current = Runner.create();
      Render.run(render.current);
      updateElements();
      if (autoStart) {
        runner.current.enabled = true;
        Runner.run(runner.current, engine.current);
      }
    }, [updateElements, debug, autoStart, addTopWall, grabCursor, gravity]);

    const clearRenderer = useCallback(() => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      if (mouseConstraint.current) World.remove(engine.current.world, mouseConstraint.current);
      if (render.current) { Mouse.clearSourceEvents(render.current.mouse); Render.stop(render.current); render.current.canvas.remove(); }
      if (runner.current) Runner.stop(runner.current);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      bodiesMap.current.clear();
    }, []);

    const startEngine = useCallback(() => {
      if (runner.current) { runner.current.enabled = true; Runner.run(runner.current, engine.current); }
      if (render.current) Render.run(render.current);
      frameId.current = requestAnimationFrame(updateElements);
      isRunning.current = true;
    }, [updateElements]);

    const stopEngine = useCallback(() => {
      if (!isRunning.current) return;
      if (runner.current) Runner.stop(runner.current);
      if (render.current) Render.stop(render.current);
      if (frameId.current) cancelAnimationFrame(frameId.current);
      isRunning.current = false;
    }, []);

    const reset = useCallback(() => {
      stopEngine();
      clearRenderer();
      initializeRenderer();
    }, [stopEngine, clearRenderer, initializeRenderer]);

    useImperativeHandle(ref, () => ({ start: startEngine, stop: stopEngine, reset }), [startEngine, stopEngine, reset]);

    useEffect(() => {
      if (!resetOnResize) return;
      const debouncedResize = debounce(() => {
        clearRenderer();
        initializeRenderer();
        if (canvas.current) setCanvasSize({ width: canvas.current.offsetWidth, height: canvas.current.offsetHeight });
      }, 500);
      window.addEventListener("resize", debouncedResize);
      return () => { window.removeEventListener("resize", debouncedResize); debouncedResize.cancel(); };
    }, [clearRenderer, initializeRenderer, resetOnResize]);

    useEffect(() => {
      initializeRenderer();
      return clearRenderer;
    }, []);

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div ref={canvas} className={cn(className, "absolute top-0 left-0 w-full h-full")} {...props}>
          {children}
        </div>
      </GravityContext.Provider>
    );
  }
);

Gravity.displayName = "Gravity";
export { Gravity, MatterBody };
