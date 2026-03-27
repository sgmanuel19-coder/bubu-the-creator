"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const CyberneticGridShader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock  = new THREE.Clock();

    // GLSL — custom colors matching neon green + purple palette
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2  iResolution;
      uniform float iTime;
      uniform vec2  iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse        - 0.5 * iResolution.xy) / iResolution.y;
        float t    = iTime * 0.18;

        // Mouse warp
        float mouseDist = length(uv - mouse);
        float warp = sin(mouseDist * 22.0 - t * 4.5) * 0.08;
        warp *= smoothstep(0.45, 0.0, mouseDist);
        uv += warp;

        // Grid lines — neon green base
        vec2  gridUv = abs(fract(uv * 12.0) - 0.5);
        float line   = pow(1.0 - min(gridUv.x, gridUv.y), 55.0);

        // Neon green base color
        vec3 gridColor = vec3(0.0, 1.0, 0.53); // #00ff87
        vec3 color     = gridColor * line * (0.4 + sin(t * 2.0) * 0.15);

        // Purple energy pulses
        float energy = sin(uv.x * 22.0 + t * 5.0)
                     * sin(uv.y * 22.0 + t * 3.5);
        energy = smoothstep(0.82, 1.0, energy);
        color += vec3(0.8, 0.13, 1.0) * energy * line; // #cc44ff

        // Mouse glow — white/green
        float glow = smoothstep(0.12, 0.0, mouseDist);
        color += vec3(0.0, 1.0, 0.53) * glow * 0.6;

        // Noise grain
        color += random(uv + t * 0.08) * 0.04;

        // Keep it very dark — just accent, not overwhelming
        color *= 0.55;

        gl_FragColor = vec4(color, 0.85);
      }
    `;

    const uniforms = {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse:      { value: new THREE.Vector2(
        window.innerWidth / 2,
        window.innerHeight / 2,
      )},
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h);
    };
    window.addEventListener("resize", onResize, { passive: true });
    onResize();

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      uniforms.iMouse.value.set(e.clientX, container.clientHeight - e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Loop
    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.setAnimationLoop(null);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         "100vw",
        height:        "100vh",
        zIndex:        0,
        pointerEvents: "none",
      }}
    />
  );
};

export default CyberneticGridShader;
