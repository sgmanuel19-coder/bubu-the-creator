import { ImageResponse } from "next/og";

// Vista previa al compartir /taller (WhatsApp, Meta, etc.).
// Se genera en el edge con la identidad del portal — sin assets externos.
export const alt = "Masterclass de Creatividad Publicitaria IA — RESUELTO Academy";
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
            RESUELTO Academy
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            No te enseño a usar la IA. Te enseño a que la IA piense como un
            director creativo.
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
            Masterclass de Creatividad Publicitaria IA
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
            Ver la masterclass →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
