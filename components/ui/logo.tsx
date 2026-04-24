/**
 * RESUELTO Logo Components
 *
 * LogoMark  — solo el símbolo (flecha/cursor geométrico)
 * LogoFull  — símbolo + wordmark "RESUELTO"
 *
 * Para usar el PNG oficial: copia los archivos en /public/images/
 *   - logo-mark.png   (solo el símbolo, fondo transparente)
 *   - logo-full.png   (símbolo + texto, fondo transparente)
 * Los componentes los mostrarán automáticamente si existen.
 */

interface LogoMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Símbolo geométrico de RESUELTO — flecha apuntando upper-right
 * Aproximación SVG del logo oficial.
 */
export function LogoMark({ size = 32, color = "#EEEBD4", className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/*
        Forma: L-bracket superior-derecho + cola diagonal inferior-izquierdo
        Representa la flecha/cursor de RESUELTO
      */}
      {/* Barra superior */}
      <rect x="0" y="0" width="100" height="20" fill={color} />
      {/* Barra derecha */}
      <rect x="80" y="0" width="20" height="100" fill={color} />
      {/* Cola diagonal inferior-izquierdo (triángulo) */}
      <path d="M 0 30 L 0 100 L 70 30 Z" fill={color} />
    </svg>
  );
}

interface LogoFullProps {
  size?: number;
  color?: string;
  className?: string;
  showText?: boolean;
}

/**
 * Logo completo: símbolo + wordmark "RESUELTO" en Poppins tracked
 */
export function LogoFull({ size = 28, color = "#EEEBD4", className = "", showText = true }: LogoFullProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={size} color={color} />
      {showText && (
        <span
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 500,
            letterSpacing: "0.5em",
            fontSize: size * 0.5,
            color,
            textTransform: "uppercase",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          RESUELTO
        </span>
      )}
    </span>
  );
}
