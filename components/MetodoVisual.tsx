"use client";

/**
 * Recurso vectorizado y animado para la sección "Hacemos ver lo que no se puede
 * filmar".
 *
 * La idea que tiene que transmitir es el método completo en un golpe de vista:
 * una sola pieza cuya mitad izquierda se grabó con cámara y cuya mitad derecha
 * se generó con IA — y cuya costura, la línea del medio, se desvanece.
 *
 * Por eso la unión late y se apaga en bucle: es literalmente "sin que se note
 * la costura", dibujado. Todo es SVG, sin imágenes ni dependencias, y se
 * detiene si el visitante pidió menos movimiento.
 */
export default function MetodoVisual({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 250"
      className={className}
      role="img"
      aria-label="Una sola pieza: la mitad izquierda grabada con cámara, la mitad derecha generada con IA, y la unión entre ambas desapareciendo"
    >
      <style>{`
        .mv-seam      { animation: mv-seam 3.2s ease-in-out infinite; }
        .mv-iris      { animation: mv-iris 3.2s ease-in-out infinite; transform-origin: 108px 118px; }
        .mv-scan      { animation: mv-scan 3.2s cubic-bezier(.5,0,.5,1) infinite; }
        .mv-dot       { animation: mv-dot 2.6s ease-in-out infinite; }
        .mv-spark     { animation: mv-spark 3.2s ease-in-out infinite; transform-origin: 312px 112px; }
        @keyframes mv-seam {
          0%, 100% { opacity: .85; }
          55%      { opacity: 0; }
        }
        @keyframes mv-iris {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(.72); }
        }
        @keyframes mv-scan {
          0%       { transform: translateX(0);   opacity: 0; }
          15%      { opacity: .9; }
          85%      { opacity: .9; }
          100%     { transform: translateX(150px); opacity: 0; }
        }
        @keyframes mv-dot {
          0%, 100% { opacity: .18; }
          50%      { opacity: 1; }
        }
        @keyframes mv-spark {
          0%, 100% { transform: scale(1)   rotate(0deg);   opacity: .85; }
          50%      { transform: scale(1.25) rotate(45deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mv-seam, .mv-iris, .mv-scan, .mv-dot, .mv-spark { animation: none; }
        }
      `}</style>

      <defs>
        {/* Resplandor de la costura: fuerte al centro, nulo en los extremos */}
        <linearGradient id="mv-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A80FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#1A80FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#1A80FF" stopOpacity="0" />
        </linearGradient>
        {/* La franja de barrido que recorre la mitad generada */}
        <linearGradient id="mv-scanline" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A80FF" stopOpacity="0" />
          <stop offset="100%" stopColor="#1A80FF" stopOpacity=".55" />
        </linearGradient>
        {/* Recorte para que el barrido no se salga de la mitad derecha */}
        <clipPath id="mv-derecha">
          <rect x="210" y="40" width="180" height="150" />
        </clipPath>
      </defs>

      {/* ── El marco: la pieza terminada ── */}
      <rect
        x="30"
        y="40"
        width="360"
        height="150"
        rx="14"
        fill="#141209"
        stroke="#F4F0DE"
        strokeOpacity=".18"
        strokeWidth="1.5"
      />

      {/* ── Mitad izquierda: grabado con cámara ── */}
      {/* Cuerpo de cámara */}
      <rect
        x="74"
        y="98"
        width="52"
        height="40"
        rx="6"
        fill="none"
        stroke="#F4F0DE"
        strokeOpacity=".75"
        strokeWidth="2"
      />
      <path
        d="M126 110l22-11v40l-22-11"
        fill="none"
        stroke="#F4F0DE"
        strokeOpacity=".75"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Lente que abre y cierra */}
      <circle className="mv-iris" cx="108" cy="118" r="8" fill="#1A80FF" fillOpacity=".9" />
      {/* Líneas sólidas: lo que la cámara sí captura */}
      <path
        d="M62 158h96M62 168h64"
        stroke="#F4F0DE"
        strokeOpacity=".28"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ── Mitad derecha: generado con IA ── */}
      {/* Retícula de puntos que titilan por turnos */}
      {Array.from({ length: 4 }).map((_, fila) =>
        Array.from({ length: 6 }).map((__, col) => (
          <circle
            key={`${fila}-${col}`}
            className="mv-dot"
            cx={244 + col * 24}
            cy={70 + fila * 24}
            r="2.4"
            fill="#1A80FF"
            style={{ animationDelay: `${((fila * 6 + col) % 9) * 0.22}s` }}
          />
        )),
      )}
      {/* Destello: la marca de lo generado */}
      <path
        className="mv-spark"
        d="M312 96l5.5 11 11 5.5-11 5.5-5.5 11-5.5-11-11-5.5 11-5.5z"
        fill="#1A80FF"
      />
      {/* Líneas punteadas: lo que se construye, no se captura */}
      <path
        d="M262 158h96M294 168h64"
        stroke="#1A80FF"
        strokeOpacity=".45"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 7"
      />
      {/* Barrido de generación, recortado a la mitad derecha */}
      <g clipPath="url(#mv-derecha)">
        <rect className="mv-scan" x="212" y="40" width="34" height="150" fill="url(#mv-scanline)" />
      </g>

      {/* ── La costura, que late y desaparece ── */}
      <rect className="mv-seam" x="209" y="40" width="2" height="150" fill="url(#mv-glow)" />

      {/* ── Etiquetas ── */}
      <text
        x="110"
        y="212"
        textAnchor="middle"
        fill="#9E9882"
        fontSize="11"
        letterSpacing="1.6"
        fontFamily="var(--font-poppins), sans-serif"
      >
        GRABADO
      </text>
      <text
        x="310"
        y="212"
        textAnchor="middle"
        fill="#1A80FF"
        fontSize="11"
        letterSpacing="1.6"
        fontFamily="var(--font-poppins), sans-serif"
      >
        GENERADO CON IA
      </text>
      <text
        x="210"
        y="238"
        textAnchor="middle"
        fill="#F4F0DE"
        fontSize="12"
        letterSpacing="3"
        fontFamily="var(--font-poppins), sans-serif"
      >
        UNA SOLA PIEZA
      </text>
    </svg>
  );
}
