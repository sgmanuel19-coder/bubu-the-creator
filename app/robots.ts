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
      // /trap-bot es un honeypot — nunca debe indexarse.
      {
        userAgent: '*',
        allow: '/',
        disallow: '/trap-bot',
      },
    ],
    sitemap: 'https://resueltoagency.com/sitemap.xml',
  };
}
