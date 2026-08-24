import { MetadataRoute } from 'next';
import { bovedaGlobal } from '@/lib/taller/boveda-server';
import { SECCIONES } from '@/lib/noticias/fuentes';

export default function sitemap(): MetadataRoute.Sitemap {
  // Las cinco secciones de La noticIA. Cada una es una URL indexable con
  // texto propio: son las que atacan cola larga ("herramientas de IA",
  // "IA en publicidad"), que la portada sola no puede ganar.
  const seccionesNoticias: MetadataRoute.Sitemap = Object.values(SECCIONES).map(
    (s) => ({
      url: `https://www.resueltoagency.com/noticias/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }),
  );

  // Las guías GRATIS de la bóveda se indexan: son la entrada SEO al embudo.
  const guiasGratis: MetadataRoute.Sitemap = bovedaGlobal()
    .filter((r) => r.gratis && r.disponible)
    .map((r) => ({
      url: `https://www.resueltoagency.com/taller/recursos/${r.slug}`,
      lastModified: new Date('2026-07-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [
    {
      url: 'https://www.resueltoagency.com/taller',
      lastModified: new Date('2026-07-09'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...guiasGratis,
    {
      // El radar se regenera solo cada día: es la ruta más fresca del sitio.
      url: 'https://www.resueltoagency.com/noticias',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...seccionesNoticias,
    {
      url: 'https://www.resueltoagency.com',
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.resueltoagency.com/sobre-mi',
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://www.resueltoagency.com/servicios',
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.resueltoagency.com/casos',
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
