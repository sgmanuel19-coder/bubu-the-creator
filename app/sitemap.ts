import { MetadataRoute } from 'next';
import { SECCIONES } from '@/lib/noticias/fuentes';
import { SITE } from '@/lib/constants';
import { SERVICIOS } from '@/lib/servicios';

const BASE = 'https://www.resueltoagency.com';

/**
 * Sitemap servido en /sitemap.xml (lo declara app/robots.ts).
 *
 * Solo entra aquí lo que queremos que Google indexe. Quedan FUERA a propósito:
 *  - /energia            landing de cold email: se llega por link directo, no por búsqueda
 *  - /sistemas-ia        redirect 308 a /servicios
 *  - /ia-content-system  portal privado tras login
 *  - /noticias/buscar    página funcional, sin contenido propio
 *  - /noticias/baja      baja del newsletter
 *  - /trap-bot           honeypot
 *  - /masterclass        noindex a propósito (landing de pauta)
 *  - /empezar            noindex a propósito (embudo de pauta)
 *  - /appstudio          app (RESUELTO IA Studio), no contenido
 *
 * La Academy vive en Skool desde 2026-10: el portal /taller se eliminó.
 *
 * Pedir la indexación de una URL con noindex es una señal contradictoria:
 * Google la reporta como error y le baja la confianza a todo el sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // ── Portafolio: una URL por caso, con texto y resultado propios ──────────
  const casos: MetadataRoute.Sitemap = SITE.proof.cases.map((c) => ({
    url: `${BASE}/casos/${c.slug}`,
    lastModified: new Date('2026-08-26'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ── Una página por servicio: oferta, portafolio y paquetes ──────────────
  const servicios: MetadataRoute.Sitemap = SERVICIOS.map((sv) => ({
    url: `${BASE}/servicios/${sv.id}`,
    lastModified: new Date('2026-10-08'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── Las cinco secciones de La noticIA. Cada una ataca cola larga
  //    ("herramientas de IA", "IA en publicidad") que la portada no gana ────
  const seccionesNoticias: MetadataRoute.Sitemap = Object.values(SECCIONES).map(
    (s) => ({
      url: `${BASE}/noticias/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }),
  );

  return [
    // ── Núcleo comercial ──────────────────────────────────────────────────
    {
      url: BASE,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE}/servicios`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/casos`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...casos,
    ...servicios,
    {
      url: `${BASE}/sobre-mi`,
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE}/privacidad`,
      lastModified: new Date('2026-10-18'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },

    // ── La noticIA: lo más fresco del sitio ───────────────────────────────
    {
      // Se regenera solo cada día.
      url: `${BASE}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...seccionesNoticias,
    {
      // No respeta la ventana de 7 días: lee del archivo, así que
      // acumula en vez de rotar. Cambia más lento que las secciones.
      url: `${BASE}/noticias/plataformas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
