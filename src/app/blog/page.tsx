import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import prisma from '@/lib/prisma';
import { SAMPLE_BLOG_POSTS, BLOG_CATEGORIES, SampleBlogPost } from '@/data/sampleBlogPosts';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Travel Blog — Guides, Itineraries & Hidden Gems Across India | Luventra',
  description:
    'Explore the Luventra travel blog for in-depth India travel guides, curated itineraries, hidden gems, budget travel tips, festival calendars, and packing checklists. Everything you need to plan your next trip with a travel partner or solo.',
  keywords: [
    'india travel blog', 'travel guides india', 'travel itineraries india', 'hidden gems india',
    'budget travel india', 'india packing tips', 'festival travel india', 'solo travel india blog',
    'backpacking india blog', 'best travel destinations india',
  ],
  alternates: { canonical: 'https://luventra.co/blog' },
  openGraph: {
    title: 'Travel Blog — Guides, Itineraries & Hidden Gems Across India | Luventra',
    description: 'In-depth India travel guides, curated itineraries, hidden gems, and budget travel tips from Luventra.',
    url: 'https://luventra.co/blog',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Blog — Guides, Itineraries & Hidden Gems Across India | Luventra',
    description: 'In-depth India travel guides, curated itineraries, hidden gems, and budget travel tips from Luventra.',
  },
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  'Hidden Gems': 'from-purple-600 via-indigo-600 to-violet-600',
  Itineraries: 'from-blue-600 via-indigo-600 to-purple-600',
  'Travel Guides': 'from-emerald-600 via-teal-600 to-cyan-600',
  'Packing Tips': 'from-amber-600 via-orange-600 to-red-600',
  Festivals: 'from-pink-600 via-rose-600 to-red-600',
  Food: 'from-yellow-500 via-orange-500 to-red-500',
  'Budget Travel': 'from-green-600 via-emerald-600 to-teal-600',
};

interface DbBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  tags: string;
  createdAt: Date;
  state: string | null;
}

function normalizeCategory(category: string): string {
  const map: Record<string, string> = {
    'hidden-gems': 'Hidden Gems',
    itinerary: 'Itineraries',
    guide: 'Travel Guides',
    packing: 'Packing Tips',
    festival: 'Festivals',
    food: 'Food',
    budget: 'Budget Travel',
  };
  return map[category] || category;
}

function estimateReadTime(excerpt: string): number {
  return Math.max(4, Math.round(excerpt.split(' ').length / 30) + 4);
}

async function getDbPosts(): Promise<DbBlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return posts as unknown as DbBlogPost[];
  } catch {
    return [];
  }
}

export default async function BlogIndexPage() {
  const dbPosts = await getDbPosts();
  const usingSamples = dbPosts.length === 0;

  type CardPost = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    coverImage: string;
    readTime: number;
    publishedAt: string;
  };

  const posts: CardPost[] = usingSamples
    ? SAMPLE_BLOG_POSTS.map((p: SampleBlogPost) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        coverImage: p.coverImage,
        readTime: p.readTime,
        publishedAt: p.publishedAt,
      }))
    : dbPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: normalizeCategory(p.category),
        coverImage: p.coverImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200',
        readTime: estimateReadTime(p.excerpt),
        publishedAt: p.createdAt.toISOString(),
      }));

  return (
    <>
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-300/30 rounded-full blur-3xl" />
        <div className="absolute -top-10 right-0 w-72 h-72 bg-romantic-300/30 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">The Luventra Travel Blog</p>
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Stories, Guides & <span className="gradient-text">Itineraries</span> for India
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hidden gems, budget travel hacks, festival calendars, and packing checklists — everything you need
            to plan your next adventure across India, whether you're traveling solo or with a travel partner.
          </p>
        </div>
      </section>

      {/* ============ CATEGORY FILTER BAR ============ */}
      <section className="px-4 pb-8">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-3">
          {BLOG_CATEGORIES.map((category) => (
            <span
              key={category}
              className={`px-5 py-2 rounded-full text-sm font-medium cursor-default transition-all ${
                category === 'All'
                  ? 'bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 text-white shadow-lg'
                  : 'glass-card text-gray-700 border border-white/40 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      {/* ============ POSTS GRID ============ */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const gradient = CATEGORY_GRADIENTS[post.category] || CATEGORY_GRADIENTS['Travel Guides'];
              const date = new Date(post.publishedAt);
              const dateLabel = date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="glass-card rounded-2xl overflow-hidden trip-card cursor-pointer group block"
                >
                  <div
                    className="h-44 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${gradient} shadow-lg`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{dateLabel}</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card romantic-glow rounded-3xl p-10 sm:p-14 text-center">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Turn These Stories Into <span className="gradient-text">Your Trip</span>?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Find a verified travel partner or sponsor for your next adventure across India.
            </p>
            <Link
              href="/auth/register"
              data-track="blog-cta-register"
              className="inline-block px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Find Your Travel Partner
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
