"use client";

/**
 * Línea de tiempo vectorizada para la sección "Cómo funciona".
 *
 * Cuatro nodos unidos por una línea que se dibuja sola de izquierda a derecha,
 * con un pulso que la recorre. Comunica lo mismo que el texto —que esto es un
 * proceso con principio y fin, no una bolsa de tareas— pero de un vistazo.
 *
 * SVG puro, sin dependencias, y quieto si el visitante pidió menos movimiento.
 */
export default function ProcesoVisual({ className = "" }: { className?: string }) {
  const nodos = [40, 190, 340, 490];

  return (
    <svg
      viewBox="0 0 530 80"
      className={className}
      role="img"
      aria-label="Las cuatro etapas del proceso, conectadas en secuencia"
    >
      <style>{`
        .pv-linea { stroke-dasharray: 450; stroke-dashoffset: 450; animation: pv-trazo 2.6s ease-out forwards; }
        .pv-pulso { animation: pv-pulso 3.4s linear infinite; }
        .pv-nodo  { animation: pv-nodo 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes pv-trazo { to { stroke-dashoffset: 0; } }
        @keyframes pv-pulso {
          0%   { transform: translateX(0);   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateX(450px); opacity: 0; }
        }
        @keyframes pv-nodo {
          0%, 100% { opacity: .45; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pv-linea { stroke-dashoffset: 0; animation: none; }
          .pv-pulso, .pv-nodo { animation: none; }
        }
      `}</style>

      {/* Riel de fondo */}
      <path d="M40 40h450" stroke="#F4F0DE" strokeOpacity=".12" strokeWidth="2" strokeLinecap="round" />

      {/* Línea que se dibuja al entrar en pantalla */}
      <path
        className="pv-linea"
        d="M40 40h450"
        stroke="#1A80FF"
        strokeOpacity=".55"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pulso que recorre la línea: el proyecto avanzando */}
      <circle className="pv-pulso" cx="40" cy="40" r="4.5" fill="#1A80FF" />

      {nodos.map((x, i) => (
        <g key={x}>
          <circle
            className="pv-nodo"
            cx={x}
            cy="40"
            r="13"
            fill="#141209"
            stroke="#1A80FF"
            strokeOpacity=".55"
            strokeWidth="1.5"
            style={{ animationDelay: `${i * 0.85}s` }}
          />
          <text
            x={x}
            y="45"
            textAnchor="middle"
            fill="#1A80FF"
            fontSize="12"
            fontWeight="600"
            fontFamily="var(--font-poppins), sans-serif"
          >
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}
