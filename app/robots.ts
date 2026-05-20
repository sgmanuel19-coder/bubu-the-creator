import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web',
          'Bytespider', 'PetalBot', 'Applebot-Extended', 'cohere-ai',
        ],
        disallow: ['/'],
      },
      {
        userAgent: ['SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot', 'BLEXBot'],
        disallow: ['/'],
      },
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://resueltoagency.com/sitemap.xml',
  };
}
