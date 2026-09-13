import { MetadataRoute } from 'next';
import { bovedaGlobal } from '@/lib/taller/boveda-server';
import { SECCIONES } from '@/lib/noticias/fuentes';
import { SITE } from '@/lib/constants';

const BASE = 'https://www.resueltoagency.com';

/**
 * Sitemap servido en /sitemap.xml (lo declara app/robots.ts).
 *
 * Solo entra aquí lo que queremos que Google indexe. Quedan FUERA a propósito:
 *  - /energia            landing de cold email: se llega por link directo, no por búsqueda
 *  - /sistemas-ia        redirect 308 a /servicios
 *  - /ia-content-system  portal privado tras login
 *  - /taller/admin/*     administración
 *  - /noticias/buscar    página funcional, sin contenido propio
 *  - /noticias/baja      baja del newsletter
 *  - /trap-bot           honeypot
 *  - /masterclass        noindex a propósito (canibalizaría a /taller)
 *  - /taller/curso       noindex: página interna del portal
 *  - /taller/recursos    noindex: página interna del portal
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

  // ── Las guías GRATIS de la bóveda: la entrada SEO al embudo del taller ───
  const guiasGratis: MetadataRoute.Sitemap = bovedaGlobal()
    .filter((r) => r.gratis && r.disponible)
    .map((r) => ({
      url: `${BASE}/taller/recursos/${r.slug}`,
      lastModified: new Date('2026-07-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
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
    {
      url: `${BASE}/produccion-ia`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/sobre-mi`,
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },

    // ── Portal del taller (público con candado: la vista previa indexa) ────
    {
      url: `${BASE}/taller`,
      lastModified: new Date('2026-07-09'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...guiasGratis,

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
