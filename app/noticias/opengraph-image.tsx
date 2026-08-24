import { ImageResponse } from "next/og";

// Vista previa al compartir /noticias (WhatsApp, Meta, LinkedIn).
// Misma receta que el resto del sitio: se genera en el edge, sin
// assets externos. Era la única sección que no tenía la suya, así que
// el enlace del portal se compartía pelado.
export const alt = "La noticIA — noticias de inteligencia artificial aplicada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0D0C08 55%, #0A1E3C 100%)",
          color: "#F4F0DE",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#8A8570",
              textTransform: "uppercase",
            }}
          >
            Un proyecto de RESUELTO
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            La notic<span style={{ color: "#1A80FF" }}>IA</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 40,
              lineHeight: 1.25,
              maxWidth: 900,
              color: "#C9C3AC",
            }}
          >
            Inteligencia artificial aplicada: lo que se puede usar, construir
            o vender.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: "#9E9882" }}>
            Producción · Herramientas · Hecho con IA · Negocio · Frontera
          </div>
          <div
            style={{
              display: "flex",
              padding: "16px 32px",
              borderRadius: 16,
              background: "#1A80FF",
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Se actualiza solo
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
