import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#030508",
        surface: "#0a0d10",
        "surface-2": "#0f1318",
        violet: {
          DEFAULT: "#a020f0",
          light: "#cc44ff",
          dark: "#6b0fa0",
          glow: "#e040fb",
        },
        neon: {
          green: "#00ff87",
          "green-dim": "#00cc6a",
          purple: "#cc44ff",
          "purple-dim": "#a020f0",
        },
        indigo: {
          DEFAULT: "#4f46e5",
          light: "#818cf8",
        },
        cream: "#f0f4f0",
        muted: "#8fa89a",
        "border-glow": "rgba(0, 255, 135, 0.12)",
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        brand: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand":
          "linear-gradient(135deg, #a020f0 0%, #00ff87 100%)",
        "gradient-text":
          "linear-gradient(90deg, #cc44ff 0%, #00ff87 100%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "holo-shimmer": "holoShimmer 4s linear infinite",
        "border-spin": "borderSpin 4s linear infinite",
        "pulse-slot": "pulseSlot 2s ease-in-out infinite",
        aurora: "aurora 8s ease-in-out infinite alternate",
        glitch: "glitch 5s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        holoShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        borderSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseSlot: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(0,255,135,0.7)", opacity: "1" },
          "50%": { boxShadow: "0 0 22px rgba(0,255,135,1)", opacity: "0.8" },
        },
        aurora: {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(5%, -10%) scale(1.1)" },
          "66%": { transform: "translate(-5%, 5%) scale(0.95)" },
          "100%": { transform: "translate(2%, -5%) scale(1.05)" },
        },
        glitch: {
          "0%, 90%, 100%": { transform: "translate(0)" },
          "91%": { transform: "translate(-2px, 1px)" },
          "93%": { transform: "translate(2px, -1px)" },
          "95%": { transform: "translate(-1px, 2px)" },
          "97%": { transform: "translate(1px, -1px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
