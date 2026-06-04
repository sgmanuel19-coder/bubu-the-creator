import type { Metadata } from "next";
import { Poppins, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import CursorTrail from "@/components/CursorTrail";
import StickyCTA from "@/components/StickyCTA";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://resueltoagency.com";

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
  verification: {
    google: "EOLyAFsuuXHf1BIxB1N6Z2mJpf0Py09NkeO6-QYRqGw",
  },
  icons: {
    icon: "/images/logo-mark.png",
    shortcut: "/images/logo-mark.png",
    apple: "/images/logo-mark.png",
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

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://resueltoagency.com/#organization",
  "name": "RESUELTO",
  "url": "https://resueltoagency.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://resueltoagency.com/images/logo-mark.png",
    "width": 512,
    "height": 512,
  },
  "description": "Agencia de comunicación comercial premium en Lima, Perú. Sistemas audiovisuales de autoridad, presencia digital y automatización con IA para empresas B2B.",
  "foundingDate": "2023",
  "email": "resueltoagency@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lima",
    "addressCountry": "PE",
  },
  "areaServed": "PE",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Spanish",
    "url": "https://wa.me/51932844074",
  },
  "sameAs": [
    "https://www.instagram.com/bubu_thecreator",
    "https://www.tiktok.com/@bubuthecreator",
    "https://www.linkedin.com/in/manuel-severo",
  ],
  "founder": {
    "@type": "Person",
    "@id": "https://resueltoagency.com/#founder",
    "name": "Manuel Severo",
    "jobTitle": "Fundador y Director",
    "url": "https://resueltoagency.com/sobre-mi",
    "sameAs": [
      "https://www.linkedin.com/in/manuel-severo",
      "https://www.instagram.com/bubu_thecreator",
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://resueltoagency.com/#website",
  "url": "https://resueltoagency.com",
  "name": "RESUELTO — Comunicación Comercial Premium",
  "inLanguage": "es-PE",
  "publisher": {
    "@id": "https://resueltoagency.com/#organization",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <meta name="theme-color" content="#060608" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${inter.variable} bg-bg text-cream antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-neon-green focus:text-bg focus:rounded focus:font-semibold focus:text-sm"
        >
          Saltar al contenido
        </a>
        <ScrollProgress />
        <StickyCTA />
        <CursorTrail />
        {children}
        <CookieConsentBanner />
        <Analytics />
        {/* Honeypot: invisible to humans, bots follow it and get logged */}
        <a href="/trap-bot" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1}>.</a>
      </body>
    </html>
  );
}
