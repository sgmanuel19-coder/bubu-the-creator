import type { Metadata } from "next";
import { Poppins, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import LandingChrome from "@/components/LandingChrome";
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
  title: `${SITE.brandName} — Creación de Contenido con IA`,
  description:
    "Videos con nivel cinematográfico generados con IA para empresas B2B. El nivel de una producción tradicional de $5,000–$50,000, entregado en días a una fracción del costo.",
  keywords: [
    "creación de contenido con IA",
    "videos con IA para empresas",
    "producción de video con IA",
    "agencia contenido IA Perú",
    "video IA publicitario",
    "contenido B2B con IA",
    "automatización con IA",
    "videos cinematográficos IA",
    "marketing B2B Perú",
    "agencia IA Lima",
  ],
  authors: [{ name: SITE.visibleName }],
  creator: SITE.brandName,
  openGraph: {
    title: `${SITE.brandName} — Creación de Contenido con IA`,
    description: "El nivel de una producción de $5,000–$50,000. Entregado en días. A una fracción del costo.",
    url: BASE_URL,
    siteName: SITE.brandName,
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE.brandName} — Creación de Contenido con IA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brandName} — Creación de Contenido con IA`,
    description: "El nivel de una producción de $5,000–$50,000. Entregado en días. A una fracción del costo.",
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
  "description": "Agencia de creación de contenido con IA en Lima, Perú. Videos con nivel cinematográfico generados con IA y automatización inteligente para empresas B2B.",
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
  "name": "RESUELTO — Creación de Contenido con IA",
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
        <LandingChrome />
        {children}
        <Analytics />
        {/* Honeypot: invisible to humans, bots follow it and get logged */}
        <a href="/trap-bot" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1}>.</a>
      </body>
    </html>
  );
}
