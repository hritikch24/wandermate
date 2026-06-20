import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/metrics', '/dashboard', '/chat', '/profile/edit'],
      },
    ],
    sitemap: 'https://luventra.co/sitemap.xml',
  };
}
