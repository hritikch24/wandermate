import { Metadata } from 'next';
import Link from 'next/link';
import { STATES, Region, getStatesByRegion } from '@/data/states';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const title = 'Explore Destinations Across India | Luventra';
  const description = 'Browse every Indian state and union territory by region — North, South, East, West, Northeast, and Central India. Find your next destination and connect with verified travel partners on Luventra.';

  return {
    title,
    description,
    alternates: { canonical: 'https://luventra.co/destinations' },
    openGraph: {
      title,
      description,
      url: 'https://luventra.co/destinations',
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const REGIONS: Array<{ key: Region; label: string; intro: string }> = [
  {
    key: 'north',
    label: 'North India',
    intro: 'From the Himalayan passes of Ladakh to the Mughal heritage of Delhi and Agra, and the desert forts of Rajasthan, North India packs an extraordinary range of landscapes and history into one region. It is the most-visited part of the country for both domestic and international travelers.',
  },
  {
    key: 'south',
    label: 'South India',
    intro: 'South India offers a different rhythm — ancient Dravidian temples, palm-lined backwaters, misty tea-garden hill stations, and a coastline stretching across both the Arabian Sea and Bay of Bengal. The cuisine, languages, and architecture shift noticeably as you move south.',
  },
  {
    key: 'west',
    label: 'West India',
    intro: 'West India spans Goa\'s beaches, Maharashtra\'s caves and hill stations, and Gujarat\'s deserts and wildlife, with Mumbai anchoring the region as India\'s financial and entertainment capital. It is one of the most economically developed and tourism-ready parts of the country.',
  },
  {
    key: 'east',
    label: 'East India',
    intro: 'East India is anchored by Kolkata\'s colonial heritage and Bengal\'s cultural depth, alongside Odisha\'s temple architecture and beaches, and Bihar and Jharkhand\'s historic and tribal heritage. The region remains comparatively less touristed than the north or south, which appeals to travelers seeking less crowded experiences.',
  },
  {
    key: 'northeast',
    label: 'Northeast India',
    intro: 'The eight northeastern states are India\'s most ecologically and culturally distinct region — Meghalaya\'s living root bridges, Assam\'s tea gardens and one-horned rhinos, and Sikkim\'s Himalayan monasteries offer an experience unlike anywhere else in the country, with far fewer crowds than the well-worn tourist circuits.',
  },
  {
    key: 'central',
    label: 'Central India',
    intro: 'Central India is the country\'s wildlife heartland — Madhya Pradesh\'s tiger reserves and ancient temples, alongside Chhattisgarh\'s waterfalls and tribal heritage, make this region a strong choice for travelers prioritizing nature and history over beaches or nightlife.',
  },
];

const MONTH_PICKS: Array<{ month: string; slugs: string[] }> = [
  { month: 'December', slugs: ['goa', 'rajasthan', 'kerala', 'andaman-and-nicobar-islands'] },
  { month: 'April', slugs: ['himachal-pradesh', 'uttarakhand', 'ladakh', 'sikkim'] },
  { month: 'July', slugs: ['meghalaya', 'kerala', 'goa', 'karnataka'] },
];

export default function DestinationsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://luventra.co' },
      { '@type': 'ListItem', position: 2, name: 'Destinations', item: 'https://luventra.co/destinations' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-romantic-200/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800">Destinations</span>
          </nav>
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Explore <span className="gradient-text">Every Destination</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse India region by region, find destinations matched to your travel month, and connect with verified
            travel partners headed wherever you want to go next.
          </p>
        </div>
      </section>

      {/* ============ BEST FOR THE MONTH ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Best Destinations by Month
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {MONTH_PICKS.map((mp) => (
              <div key={mp.month} className="glass-card rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{mp.month}</h3>
                <div className="flex flex-wrap gap-2">
                  {mp.slugs.filter((s) => STATES[s]).map((slug) => (
                    <Link key={slug} href={`/state/${slug}`} className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-medium hover:bg-brand-100 transition-colors">
                      {STATES[slug].name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REGIONS ============ */}
      {REGIONS.map((region) => {
        const states = getStatesByRegion(region.key);
        if (states.length === 0) return null;
        return (
          <section key={region.key} className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-10">
                <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-3">
                  {region.label}
                </h2>
                <p className="text-gray-600 max-w-3xl text-sm leading-relaxed">{region.intro}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {states.map((state) => (
                  <Link key={state.slug} href={`/state/${state.slug}`} className="glass-card rounded-2xl overflow-hidden trip-card group block">
                    <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${state.heroImage})` }} />
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
                        {state.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{state.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ============ CTA ============ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card romantic-glow rounded-3xl p-10 sm:p-14 text-center">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Wherever You&apos;re Headed, <span className="gradient-text">Go Together</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Find a verified travel partner for any destination across India on Luventra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Find a Travel Partner
              </Link>
              <Link href="/travel-guide" className="px-8 py-4 rounded-xl text-sm font-semibold text-gray-700 bg-white/60 border border-white/40 hover:bg-white transition-all">
                Read Travel Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
