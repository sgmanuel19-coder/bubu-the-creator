import { MetadataRoute } from 'next';
import { bovedaGlobal } from '@/lib/taller/boveda-server';

export default function sitemap(): MetadataRoute.Sitemap {
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
    {
      url: 'https://resueltoagency.com',
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://resueltoagency.com/sobre-mi',
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://resueltoagency.com/servicios',
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://resueltoagency.com/casos',
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
