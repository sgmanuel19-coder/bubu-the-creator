import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Bloquear solo bots de entrenamiento IA (no de búsqueda/citación)
      {
        userAgent: ['CCBot', 'Bytespider', 'PetalBot', 'Applebot-Extended'],
        disallow: ['/'],
      },
      // Bloquear scrapers de SEO
      {
        userAgent: ['SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot', 'BLEXBot'],
        disallow: ['/'],
      },
      // Permitir todo lo demás: GPTBot, ChatGPT-User, anthropic-ai, Claude-Web,
      // OAI-SearchBot, PerplexityBot, Google-Extended, Googlebot, Bingbot.
      // Los disallow son rutas sin valor de búsqueda: portal privado,
      // administración, endpoints y el honeypot. Gastan crawl budget.
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/trap-bot',
          '/ia-content-system',
          '/taller/admin',
          '/noticias/baja',
          '/noticias/buscar',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.resueltoagency.com/sitemap.xml',
  };
}
