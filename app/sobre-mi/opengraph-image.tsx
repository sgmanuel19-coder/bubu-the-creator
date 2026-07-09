import { ImageResponse } from "next/og";

// Vista previa al compartir /sobre-mi (WhatsApp, Meta, etc.).
// Se genera en el edge con la identidad del sitio — sin assets externos.
export const alt = "Manuel Severo — Estratega de contenido · RESUELTO";
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
            RESUELTO
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            Manuel Severo
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#C9C4AE",
              maxWidth: 900,
            }}
          >
            Estratega de contenido. +5 años con las marcas más exigentes del
            Perú — de agencias top-tier a sistemas propios con IA.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#9E9882" }}>
            resueltoagency.com/sobre-mi
          </div>
          <div
            style={{
              display: "flex",
              padding: "18px 36px",
              borderRadius: 16,
              background: "#1A80FF",
              color: "#FFFFFF",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Conocer la historia →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
