import { MetadataRoute } from 'next';
import { CITY_SLUGS } from '@/data/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wandermate.com';

  const cityPages = CITY_SLUGS.map((city) => ({
    url: `${baseUrl}/city/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const subdomainPages = CITY_SLUGS.map((city) => ({
    url: `https://${city}.wandermate.com`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...cityPages,
    ...subdomainPages,
  ];
}
