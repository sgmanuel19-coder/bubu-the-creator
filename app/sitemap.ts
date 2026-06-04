import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://resueltoagency.com',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://resueltoagency.com/sistemas-ia',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://resueltoagency.com/sobre-mi',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://resueltoagency.com/servicios',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://resueltoagency.com/casos',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
