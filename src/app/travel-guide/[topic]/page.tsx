import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TRAVEL_TOPICS, TOPIC_SLUGS, getTopicBySlug } from '@/data/travelTopics';
import { getStateBySlug } from '@/data/states';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Props {
  params: { topic: string };
}

export const dynamic = 'force-static';

export function generateStaticParams() {
  return TOPIC_SLUGS.map((topic) => ({ topic }));
}

export function generateMetadata({ params }: Props): Metadata {
  const topic = getTopicBySlug(params.topic);
  if (!topic) return {};

  return {
    title: topic.metaTitle,
    description: topic.metaDescription,
    keywords: topic.keywords,
    alternates: { canonical: `https://luventra.co/travel-guide/${topic.slug}` },
    openGraph: {
      title: topic.metaTitle,
      description: topic.metaDescription,
      url: `https://luventra.co/travel-guide/${topic.slug}`,
      type: 'article',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.metaTitle,
      description: topic.metaDescription,
    },
  };
}

export default function TravelTopicPage({ params }: Props) {
  const topic = TRAVEL_TOPICS[params.topic];
  if (!topic) notFound();

  const relatedStates = topic.relatedStateSlugs
    .map((slug) => getStateBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: topic.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://luventra.co' },
      { '@type': 'ListItem', position: 2, name: 'Travel Guide', item: 'https://luventra.co/travel-guide' },
      { '@type': 'ListItem', position: 3, name: topic.title, item: `https://luventra.co/travel-guide/${topic.slug}` },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: topic.title,
    description: topic.metaDescription,
    author: { '@type': 'Organization', name: 'Luventra' },
    publisher: { '@type': 'Organization', name: 'Luventra' },
    datePublished: '2025-01-01',
    dateModified: '2026-06-01',
    url: `https://luventra.co/travel-guide/${topic.slug}`,
    inLanguage: 'en-IN',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-romantic-200/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/travel-guide" className="hover:text-brand-600 transition-colors">Travel Guide</Link>
            <span>/</span>
            <span className="text-gray-800">{topic.title}</span>
          </nav>
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {topic.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{topic.intro}</p>
        </div>
      </section>

      {/* ============ SECTIONS ============ */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          {topic.sections.map((section) => (
            <div key={section.heading} className="glass-card rounded-2xl p-8">
              <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-4">
                {section.heading}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ RELATED DESTINATIONS ============ */}
      {relatedStates.length > 0 && (
        <section className="py-16 px-4 bg-white/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Where to Go</p>
              <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Related Destinations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                These states pair especially well with {topic.title.toLowerCase()}.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedStates.map((state) => (
                <Link
                  key={state.slug}
                  href={`/state/${state.slug}`}
                  className="glass-card rounded-2xl overflow-hidden trip-card group block"
                >
                  <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${state.heroImage})` }} />
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
                      {state.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{state.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ FAQ ============ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Common Questions</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {topic.faqs.map((faq, idx) => (
              <details key={idx} className="glass-card rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 text-sm cursor-pointer flex items-center justify-between gap-4 list-none">
                  {faq.question}
                  <svg className="w-4 h-4 text-brand-500 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-sm text-gray-600 leading-relaxed mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card romantic-glow rounded-3xl p-10 sm:p-14 text-center">
            <p style={{ fontFamily: 'var(--font-script)' }} className="text-2xl text-romantic-500 mb-2">
              Plan it together
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Find a <span className="gradient-text">Travel Partner</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Connect with verified travelers who share your travel style on Luventra. Split costs, plan together, and turn this guide into your next trip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Find a Travel Partner
              </Link>
              <Link href="/travel-guide" className="px-8 py-4 rounded-xl text-sm font-semibold text-gray-700 bg-white/60 border border-white/40 hover:bg-white transition-all">
                More Travel Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
