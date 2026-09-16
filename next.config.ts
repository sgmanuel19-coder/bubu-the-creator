import type { NextConfig } from "next";

// CSP con script-src: bloquea scripts de orígenes no listados (mitiga XSS).
// 'unsafe-inline' es necesario para los scripts de hidratación de Next.js (sin infra de nonces).
// 'wasm-unsafe-eval' + blob: son necesarios para Spline/Three.js (WebAssembly + web workers).
// Sin connect-src/default-src para no bloquear fetch de escenas Spline ni analytics.
// React en modo desarrollo necesita eval() para debugging; en producción nunca lo usa.
const devEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

const csp = [
  // www.youtube.com: la IFrame API del reproductor del portal, que sirve
  // para marcar una lección como vista solo cuando de verdad se reprodujo.
  // www.googletagmanager.com: contenedor GTM-NSGQG23V, que a su vez carga
  // GA4 desde ese mismo host. www.google-analytics.com cubre el gtag directo.
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${devEval} blob: https://connect.facebook.net https://va.vercel-scripts.com https://www.youtube.com https://www.googletagmanager.com https://www.google-analytics.com`,
  "worker-src 'self' blob:",
  // googletagmanager.com en frame-src: el <noscript> de GTM es un iframe.
  // www.facebook.com: el Pixel abre un iframe oculto contra ese host; sin el
  // la consola se llena de violaciones de CSP en cada carga.
  "frame-src https://www.instagram.com https://www.youtube.com https://www.youtube-nocookie.com https://www.tiktok.com https://drive.google.com https://www.googletagmanager.com https://www.facebook.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  // El Pixel manda los eventos que no caben en una imagen como POST de
  // formulario a facebook.com/tr/. Con form-action solo en 'self' esos
  // eventos se bloqueaban: la pauta quedaba midiendo a medias.
  "form-action 'self' https://www.facebook.com",
  "upgrade-insecure-requests",
].join('; ');

const permissionsPolicy = [
  'camera=()',
  'microphone=()',
  'geolocation=()',
  'payment=()',
  'usb=()',
  'serial=()',
  // YouTube necesita permiso de autoplay delegado para que el facade
  // (thumbnail → click → iframe con autoplay=1) arranque sin segundo click.
  'autoplay=(self "https://www.youtube.com" "https://www.youtube-nocookie.com")',
].join(', ');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: permissionsPolicy },
  // frame-ancestors ya cubre navegadores modernos; esto es el respaldo
  // para los viejos, que no leen CSP pero sí este header.
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Corta la referencia window.opener entre orígenes distintos. La variante
  // "allow-popups" es a propósito: los CTA abren WhatsApp y Hotmart en
  // pestaña nueva y con 'same-origin' a secas se romperían.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
    // Vercel factura transformaciones y escrituras de caché de imagen, y
    // cada combinación formato × tamaño × quality es una distinta.
    //
    // Solo WebP: AVIF comprime ~20% mejor, pero obliga a transformar cada
    // imagen dos veces y su encoder es bastante más lento. Con el volumen
    // de /casos, ese 20% no paga el doble de transformaciones.
    formats: ['image/webp'],
    // 31 días en vez de 1. Con TTL de un día, una foto que no cambia nunca
    // se volvía a transformar y a escribir en caché ~30 veces al mes.
    minimumCacheTTL: 2678400,
    // Menos breakpoints = menos variantes por imagen. 750/828 y 1080/1200
    // eran pares casi idénticos: el ahorro de bytes no justificaba la
    // variante extra.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [32, 64, 128, 256, 384],
    // El código usa 75 (default) y 85. Declararlas evita que un quality
    // nuevo suelto multiplique la caché sin que nadie se entere.
    qualities: [75, 85],
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'date-fns',
    ],
  },
  // Los PDFs de la Biblia viven fuera de /public (no deben ser accesibles
  // por URL directa). Next no los "ve" porque nadie los importa, así que
  // hay que incluirlos a mano en el bundle de la ruta de descarga.
  outputFileTracingIncludes: {
    '/api/taller/descarga/[...ruta]': ['./private/biblia/**'],
  },
  async redirects() {
    return [
      // La landing vieja de Academy fue reemplazada por el portal /taller.
      { source: "/academy", destination: "/taller", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Solo en producción: en dev los chunks conservan el mismo nombre entre
      // ediciones y un immutable de 1 año hace que el navegador sirva JS viejo
      // (rompe HMR e hidratación — advertencia oficial de Next en los logs).
      ...(process.env.NODE_ENV === 'production'
        ? [
            {
              source: '/_next/static/(.*)',
              headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
              ],
            },
          ]
        : []),
      {
        source: '/videos/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

export default nextConfig;
