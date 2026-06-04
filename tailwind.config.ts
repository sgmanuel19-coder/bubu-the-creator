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
        bg:          "#0D0C08",   /* warm near-black  — brandbook charcoal base  */
        surface:     "#141209",   /* warm dark surface                           */
        "surface-2": "#1C1A12",   /* raised card surface                         */
        // Brand palette
        "brand-blue":  "#1A80FF",
        "brand-cream": "#EEEBD4",
        "brand-dark":  "#3A3125",
        // Token aliases (keeps existing class names working)
        violet: {
          DEFAULT: "#1A80FF",
          light: "#4D9FFF",
          dark: "#0A4DAA",
          glow: "#6AB4FF",
        },
        neon: {
          green:       "#1A80FF",   // brand blue
          "green-dim": "#1460CC",
          purple:      "#EEEBD4",   // brand cream
          "purple-dim":"#D4CFA8",
        },
        indigo: {
          DEFAULT: "#1A80FF",
          light: "#4D9FFF",
        },
        cream: "#F4F0DE",   /* brandbook cream exact                   */
        muted: "#9E9882",   /* warm muted — en lugar del cool blue-gray */
        "border-glow": "rgba(26, 128, 255, 0.12)",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "sans-serif"],
        brand:   ["var(--font-poppins)",    "sans-serif"],
        body:    ["var(--font-inter)",       "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand":
          "linear-gradient(135deg, #1A80FF 0%, #EEEBD4 100%)",
        "gradient-text":
          "linear-gradient(90deg, #1A80FF 0%, #4D9FFF 100%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
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
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
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
          "0%, 100%": { boxShadow: "0 0 8px rgba(0,212,255,0.7)", opacity: "1" },
          "50%": { boxShadow: "0 0 22px rgba(0,212,255,1)", opacity: "0.8" },
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
