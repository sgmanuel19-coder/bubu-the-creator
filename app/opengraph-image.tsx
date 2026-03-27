import { ImageResponse } from "next/og";

export const alt = "RESUELTO — Comunicación Comercial Premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#030508",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Green glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "25%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(0, 255, 135, 0.12)",
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        {/* Purple glow */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: "20%",
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: "rgba(160, 32, 240, 0.14)",
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        {/* Top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #00ff87, #cc44ff, transparent)",
            display: "flex",
          }}
        />

        {/* Bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #cc44ff, #00ff87, transparent)",
            display: "flex",
          }}
        />

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "rgba(143, 168, 154, 0.35)",
              fontSize: 14,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            project-yvdip.vercel.app
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Eyebrow line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(0,255,135,0.5)",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#00ff87",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Comunicación Comercial Premium
            </span>
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(0,255,135,0.5)",
                display: "flex",
              }}
            />
          </div>

          {/* Brand name */}
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 900,
              letterSpacing: "0.18em",
              color: "#00ff87",
              textShadow:
                "0 0 40px rgba(0,255,135,0.5), 0 0 80px rgba(0,255,135,0.2)",
              marginBottom: 36,
              lineHeight: 1,
            }}
          >
            RESUELTO
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              color: "#8fa89a",
              fontSize: 22,
              textAlign: "center",
              maxWidth: 680,
              lineHeight: 1.6,
              marginBottom: 44,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span>Tu negocio tiene valor.&nbsp;</span>
            <span style={{ color: "#cc44ff" }}>
              El problema es cómo lo comunica.
            </span>
          </div>

          {/* Tags row */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              "Sistemas de Autoridad",
              "Conversión Premium",
              "Presencia Digital",
            ].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,255,135,0.2)",
                  background: "rgba(0,255,135,0.06)",
                  color: "rgba(0,255,135,0.7)",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
