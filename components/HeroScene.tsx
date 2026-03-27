"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Mouse ref shared across components ─────────────────────────────────────
const mouse = { x: 0, y: 0 };

// ── Individual floating shape ───────────────────────────────────────────────
function Shape({
  position,
  type,
  color,
  speed,
  phase,
  rx,
  ry,
}: {
  position: [number, number, number];
  type: "torus" | "icosa" | "octa";
  color: string;
  speed: number;
  phase: number;
  rx: number;
  ry: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.y = position[1] + Math.sin(t) * 0.3;
    ref.current.rotation.x += rx;
    ref.current.rotation.y += ry;
  });

  return (
    <mesh ref={ref} position={position}>
      {type === "torus"  && <torusGeometry args={[1.2, 0.03, 8, 48]} />}
      {type === "icosa"  && <icosahedronGeometry args={[0.9, 0]} />}
      {type === "octa"   && <octahedronGeometry args={[0.9, 0]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

// ── Camera parallax ─────────────────────────────────────────────────────────
function CameraRig() {
  useFrame(({ camera }) => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Canvas wrapper ──────────────────────────────────────────────────────────
export default function HeroScene() {
  // Track mouse outside React tree
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      dpr={1}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <CameraRig />

      {/* Green shapes */}
      <Shape position={[-5,  1.5, -2]} type="torus" color="#00ff87" speed={0.4} phase={0}   rx={0.003} ry={0.005} />
      <Shape position={[ 4,  2.0, -3]} type="icosa" color="#00ff87" speed={0.35} phase={1.2} rx={0.005} ry={0.003} />
      <Shape position={[-3, -2.0, -1]} type="octa"  color="#00ff87" speed={0.5} phase={2.5}  rx={0.004} ry={0.006} />

      {/* Purple shapes */}
      <Shape position={[ 5, -1.5, -2]} type="torus" color="#cc44ff" speed={0.38} phase={0.8} rx={0.004} ry={0.004} />
      <Shape position={[-4,  0.5, -3]} type="icosa" color="#cc44ff" speed={0.32} phase={1.8} rx={0.003} ry={0.007} />
      <Shape position={[ 3,  2.5, -1]} type="octa"  color="#cc44ff" speed={0.45} phase={3.1} rx={0.006} ry={0.003} />

      {/* Small accents */}
      <Shape position={[ 1.5, -1, -1]} type="icosa" color="#00ff87" speed={0.55} phase={0.5} rx={0.007} ry={0.005} />
      <Shape position={[-2,   2, -2]}  type="octa"  color="#cc44ff" speed={0.5}  phase={2.0} rx={0.005} ry={0.008} />
    </Canvas>
  );
}
