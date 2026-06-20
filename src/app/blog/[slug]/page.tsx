import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import prisma from '@/lib/prisma';
import { getStateBySlug } from '@/data/states';
import {
  getSampleBlogPostBySlug,
  getRelatedSamplePosts,
  SAMPLE_BLOG_POSTS,
  SampleBlogPost,
} from '@/data/sampleBlogPosts';

interface Props {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

interface DbBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  state: string | null;
  city: string | null;
  tags: string;
  author: string;
  createdAt: Date;
}

async function getDbPost(slug: string): Promise<DbBlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    return post as unknown as DbBlogPost | null;
  } catch {
    return null;
  }
}

function generateSampleArticle(post: SampleBlogPost): string[] {
  const stateData = post.state ? getStateBySlug(post.state) : undefined;
  const stateName = stateData?.name || 'India';
  const tagList = post.tags.join(', ');

  return [
    `${post.excerpt}`,
    `If you've been searching for inspiration on ${post.title.toLowerCase()}, you're in the right place. India rewards travelers who go a little deeper than the postcard checklist, and this is exactly the kind of trip where a good travel partner — someone to split costs with, share the planning load, or simply swap stories with over chai — makes the experience richer. Whether you're a solo traveler building confidence one trip at a time or part of a group looking for a shared itinerary, the destinations and ideas below are built to be explored together.`,
    `**Why this trip works.** ${stateName} (and the regions connected to it) offers a rare mix of accessibility and authenticity. You don't need to be an expert backpacker to enjoy it, but it rewards those who plan a little. Local transport is generally reliable, accommodation ranges from budget hostels to boutique stays, and the food alone is worth the trip. Keep ${tagList} in mind as you research further — these are the exact themes that come up again and again from travelers who've done this route.`,
    `**Getting there and getting around.** Most travelers combine flights into the nearest major hub with trains or shared cabs for the final stretch — it's almost always cheaper and more scenic than flying door to door. Book your onward transport a few days ahead during peak season, since the best routes fill up quickly. If you're traveling with a partner found through Luventra, coordinate arrival times so you're not waiting around alone at a station or airport.`,
    `**What to budget.** Costs vary widely depending on your travel style, but a reasonable estimate covers stays, local transport, food, and entry fees. Traveling with a partner usually cuts per-person costs by 20-30% on accommodation and private transport alone, which is one of the most practical reasons solo travelers in India increasingly look for a trip partner before booking.`,
    `**Best time to go.** Shoulder seasons tend to offer the sweet spot of good weather and fewer crowds. Avoid the peak holiday weeks if you can, both for cost reasons and because the best spots get noticeably busier. Check local festival calendars too — sometimes the "crowded" weeks are exactly when you want to be there, if the festival itself is the draw.`,
    `**A few honest tips.** Pack lighter than you think you need to. Carry a printed or offline copy of your bookings in case signal is patchy. Keep some cash on hand even in places that claim to be card-friendly. And if you're meeting a travel partner for the first time, choose a public meeting point for your first leg of the journey — most experienced travelers do this as a simple, sensible precaution.`,
    `Ready to make this trip happen? The hardest part of most journeys isn't the destination — it's finding someone reliable to share it with. That's exactly what Luventra is built for: connecting verified travelers who want to explore ${stateName} and the rest of India together, split costs fairly, and turn a solo idea into a shared adventure.`,
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dbPost = await getDbPost(params.slug);
  const samplePost = !dbPost ? getSampleBlogPostBySlug(params.slug) : undefined;

  if (!dbPost && !samplePost) return {};

  const title = dbPost ? dbPost.title : samplePost!.title;
  const description = dbPost ? dbPost.excerpt : samplePost!.excerpt;
  const tags = dbPost ? (JSON.parse(dbPost.tags || '[]') as string[]) : samplePost!.tags;
  const coverImage = dbPost?.coverImage || samplePost?.coverImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200';

  return {
    title: `${title} | Luventra Blog`,
    description,
    keywords: tags,
    alternates: { canonical: `https://luventra.co/blog/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `https://luventra.co/blog/${params.slug}`,
      type: 'article',
      locale: 'en_IN',
      images: [{ url: coverImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const dbPost = await getDbPost(params.slug);
  const samplePost = !dbPost ? getSampleBlogPostBySlug(params.slug) : undefined;

  if (!dbPost && !samplePost) notFound();

  const title = dbPost ? dbPost.title : samplePost!.title;
  const excerpt = dbPost ? dbPost.excerpt : samplePost!.excerpt;
  const coverImage = dbPost?.coverImage || samplePost?.coverImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200';
  const category = dbPost ? dbPost.category : samplePost!.category;
  const tags = dbPost ? (JSON.parse(dbPost.tags || '[]') as string[]) : samplePost!.tags;
  const author = dbPost ? dbPost.author : samplePost!.author;
  const publishedAt = dbPost ? dbPost.createdAt.toISOString() : samplePost!.publishedAt;
  const stateSlug = dbPost ? dbPost.state : samplePost!.state;
  const stateData = stateSlug ? getStateBySlug(stateSlug) : undefined;

  const contentSections = !dbPost ? samplePost!.contentSections : undefined;

  const paragraphs = dbPost
    ? dbPost.content.split('\n').filter(Boolean)
    : !contentSections
      ? generateSampleArticle(samplePost!)
      : [];

  const readTime = samplePost ? samplePost.readTime : Math.max(4, Math.round(dbPost!.content.split(' ').length / 200));

  const relatedPosts = samplePost
    ? getRelatedSamplePosts(samplePost, 3)
    : SAMPLE_BLOG_POSTS.filter((p) => p.category === category).slice(0, 3);

  const dateLabel = new Date(publishedAt).toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    image: coverImage,
    datePublished: publishedAt,
    author: { '@type': 'Organization', name: author },
    publisher: {
      '@type': 'Organization',
      name: 'Luventra',
      logo: { '@type': 'ImageObject', url: 'https://luventra.co/favicon.ico' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://luventra.co/blog/${params.slug}`,
    },
    keywords: tags.join(', '),
  };

  const shareUrl = `https://luventra.co/blog/${params.slug}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${coverImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 pb-14 pt-32 w-full">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white truncate max-w-[180px]">{title}</span>
          </nav>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-lg mb-4">
            {category}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-4 text-white/70 text-sm flex-wrap">
            <span>{author}</span>
            <span>·</span>
            <span>{dateLabel}</span>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </section>

      {/* ============ CONTENT + SIDEBAR ============ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Article */}
          <article className="glass-card rounded-2xl p-8 sm:p-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">{excerpt}</p>
            {contentSections && contentSections.length > 0 ? (
              <div className="prose-luventra space-y-8">
                {contentSections.map((section, idx) => (
                  <div key={idx}>
                    <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {section.heading}
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-[15px]">{section.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose-luventra space-y-5">
                {paragraphs.map((para, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed text-[15px]">
                    {para.replace(/\*\*/g, '')}
                  </p>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200/60">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200/60">
              <span className="text-sm font-medium text-gray-500">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-track="blog-share-whatsapp"
                className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Share on WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4C7.46 4 3.73 7.73 3.73 12.32c0 1.55.42 3 1.16 4.27L4 20.5l4.04-1.06a8.8 8.8 0 0 0 4.01.97h.01c4.59 0 8.32-3.73 8.32-8.32a8.3 8.3 0 0 0-2.78-5.77z" /></svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-track="blog-share-twitter"
                className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Share on X"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H2l8.2-9.3L1.5 2h6.9l4.9 6.5L18.9 2Z" /></svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-track="blog-share-facebook"
                className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Share on Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" /></svg>
              </a>
            </div>
          </article>

          {/* Sidebar: Related posts */}
          <aside className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 style={{ fontFamily: 'var(--font-display)' }} className="font-bold text-gray-900 mb-4">Related Reads</h3>
              <div className="space-y-4">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="flex gap-3 group">
                    <div
                      className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url(${rp.coverImage})` }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                        {rp.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{rp.readTime} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {stateData && (
              <div className="glass-card romantic-glow rounded-2xl p-6 text-center">
                <p style={{ fontFamily: 'var(--font-script)' }} className="text-xl text-romantic-500 mb-1">
                  Heading to {stateData.name}?
                </p>
                <h3 className="font-bold text-gray-900 mb-3">
                  Find Travel Partners for {stateData.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Connect with verified travelers planning trips to {stateData.name}. Split costs, share the journey.
                </p>
                <Link
                  href={`/state/${stateData.slug}`}
                  data-track="blog-sidebar-state-cta"
                  data-track-id={stateData.slug}
                  className="inline-block w-full px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Explore {stateData.name}
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card romantic-glow rounded-3xl p-10 sm:p-14 text-center">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-4">
              Find Travel Partners for <span className="gradient-text">{stateData ? stateData.name : 'Your Next Trip'}</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Turn this story into your own adventure. Connect with verified travel partners and companions on Luventra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                data-track="blog-bottom-cta-register"
                className="px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Find a Travel Partner
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 rounded-xl text-sm font-semibold text-gray-700 bg-white/60 border border-white/40 hover:bg-white transition-all"
              >
                Read More Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
