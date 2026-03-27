import type { Metadata } from "next";
import { Orbitron, Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import CursorTrail from "@/components/CursorTrail";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyCTA from "@/components/StickyCTA";
import { Analytics } from "@vercel/analytics/react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://project-yvdip.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: `${SITE.brandName} — Comunicación Comercial Premium`,
  description:
    "Diseño sistemas de autoridad, presencia digital y conversión para negocios donde la confianza es el factor que decide la venta.",
  keywords: [
    "comunicación comercial",
    "estrategia digital Lima",
    "marca personal Perú",
    "landing pages premium",
    "sistema de conversión",
    "presencia digital premium",
    "autoridad digital",
    "marketing B2B Perú",
    "contenido estratégico",
    "agencia comunicación Lima",
  ],
  authors: [{ name: SITE.visibleName }],
  creator: SITE.brandName,
  openGraph: {
    title: `${SITE.brandName} — Comunicación Comercial Premium`,
    description: "Tu negocio tiene valor. El problema es cómo lo comunica.",
    url: BASE_URL,
    siteName: SITE.brandName,
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE.brandName} — Comunicación Comercial Premium`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brandName} — Comunicación Comercial Premium`,
    description: "Tu negocio tiene valor. El problema es cómo lo comunica.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${orbitron.variable} ${barlowCondensed.variable} ${inter.variable} bg-bg text-cream antialiased`}
      >
        <StickyCTA />
        <CursorTrail />
        {children}
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
