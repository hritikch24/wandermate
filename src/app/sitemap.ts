import { MetadataRoute } from 'next';
import { STATE_SLUGS } from '@/data/states';
import { CITY_SLUGS } from '@/data/cities';
import { TOPIC_SLUGS } from '@/data/travelTopics';
import { SAMPLE_BLOG_POSTS } from '@/data/sampleBlogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://luventra.co';

  const statePages = STATE_SLUGS.map((state) => ({
    url: `${baseUrl}/state/${state}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const cityPages = CITY_SLUGS.map((city) => ({
    url: `${baseUrl}/city/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const topicPages = TOPIC_SLUGS.map((topic) => ({
    url: `${baseUrl}/travel-guide/${topic}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPostPages = SAMPLE_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/travel-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...statePages,
    ...cityPages,
    ...topicPages,
    ...blogPostPages,
    ...staticPages,
  ];
}
