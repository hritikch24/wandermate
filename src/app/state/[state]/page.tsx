import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { STATES, STATE_SLUGS, getStateBySlug } from '@/data/states';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Props {
  params: { state: string };
}

export const dynamic = 'force-static';

const VIBE_GRADIENTS: Record<string, string> = {
  adventure: 'from-orange-600 via-red-600 to-amber-600',
  spiritual: 'from-purple-600 via-indigo-600 to-violet-600',
  romantic: 'from-pink-600 via-rose-600 to-red-600',
  party: 'from-yellow-500 via-orange-500 to-red-500',
  serene: 'from-emerald-600 via-teal-600 to-cyan-600',
  cultural: 'from-blue-600 via-indigo-600 to-purple-600',
};

const KEYWORD_SUFFIXES = [
  (n: string) => `travel partner for ${n}`,
  (n: string) => `travel buddy ${n}`,
  (n: string) => `solo travel ${n}`,
  (n: string) => `${n} backpacking guide`,
  (n: string) => `is ${n} safe for solo female travelers`,
  (n: string) => `how to reach ${n}`,
  (n: string) => `${n} budget trip cost`,
  (n: string) => `best itinerary for ${n}`,
  (n: string) => `${n} trip planning`,
  (n: string) => `${n} group travel`,
  (n: string) => `things to do in ${n}`,
  (n: string) => `${n} packing list`,
  (n: string) => `${n} local customs and etiquette`,
  (n: string) => `${n} safety tips for travelers`,
  (n: string) => `${n} weekend getaway`,
  (n: string) => `${n} honeymoon trip ideas`,
  (n: string) => `${n} road trip itinerary`,
  (n: string) => `${n} budget backpacking`,
  (n: string) => `${n} travel guide 2026`,
  (n: string) => `${n} hidden gems`,
  (n: string) => `${n} offbeat destinations`,
  (n: string) => `${n} family trip itinerary`,
  (n: string) => `find travel companion for ${n}`,
  (n: string) => `${n} trip cost for couple`,
  (n: string) => `${n} budget itinerary 7 days`,
  (n: string) => `${n} best months to visit`,
  (n: string) => `${n} travel tips for first time visitors`,
  (n: string) => `${n} solo female travel guide`,
  (n: string) => `${n} nearby places to visit`,
  (n: string) => `${n} festivals and culture`,
  (n: string) => `${n} adventure activities`,
  (n: string) => `${n} food and cuisine guide`,
];

export function generateStaticParams() {
  return STATE_SLUGS.map((state) => ({ state }));
}

export function generateMetadata({ params }: Props): Metadata {
  const state = getStateBySlug(params.state);
  if (!state) return {};

  const title = `${state.name} Travel Partners | Luventra`;
  const description = `${state.description} Find verified travel partners and companions for your ${state.name} trip on Luventra — plan together, split costs, and explore ${state.name}'s top cities, hidden gems, festivals, and cuisine. Includes how to reach ${state.name}, budget guide, itineraries, packing tips, and safety advice for solo and group travelers.`;

  const generatedKeywords = KEYWORD_SUFFIXES.map((fn) => fn(state.name));

  return {
    title,
    description,
    keywords: [...state.seoKeywords, ...generatedKeywords],
    alternates: { canonical: `https://luventra.co/state/${state.slug}` },
    openGraph: {
      title,
      description,
      url: `https://luventra.co/state/${state.slug}`,
      images: [{ url: state.heroImage, width: 1200, height: 630, alt: `Travel to ${state.name}` }],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [state.heroImage],
    },
    other: {
      'geo.region': `IN-${state.slug.substring(0, 2).toUpperCase()}`,
      'geo.placename': state.name,
    },
  };
}

export default function StatePage({ params }: Props) {
  const state = STATES[params.state];
  if (!state) notFound();

  const vibeGradient = VIBE_GRADIENTS[state.topCities[0]?.vibe || 'cultural'] || VIBE_GRADIENTS.cultural;

  const touristDestinationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: state.name,
    description: state.description,
    url: `https://luventra.co/state/${state.slug}`,
    image: state.heroImage,
    touristType: state.topCities.map((c) => c.vibe),
    containedInPlace: {
      '@type': 'Country',
      name: 'India',
    },
    includesAttraction: state.famousFor.map((item) => ({
      '@type': 'TouristAttraction',
      name: item,
    })),
  };

  const travelGuideJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${state.name} Travel Guide`,
    headline: `Complete ${state.name} Travel Guide — How to Reach, Budget, Itineraries & Safety Tips`,
    about: state.name,
    description: `A complete travel guide for ${state.name} covering how to reach, budget planning, suggested itineraries, packing tips, local customs, safety tips, and frequently asked questions.`,
    author: { '@type': 'Organization', name: 'Luventra' },
    publisher: { '@type': 'Organization', name: 'Luventra' },
    datePublished: '2025-01-01',
    dateModified: '2026-06-01',
    url: `https://luventra.co/state/${state.slug}`,
    inLanguage: 'en-IN',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://luventra.co' },
      { '@type': 'ListItem', position: 2, name: 'States', item: 'https://luventra.co/destinations' },
      { '@type': 'ListItem', position: 3, name: state.name, item: `https://luventra.co/state/${state.slug}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: state.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const nearbyStateObjs = state.nearbyStates
    .map((slug) => STATES[slug])
    .filter((s): s is typeof state => Boolean(s));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelGuideJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${state.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/destinations" className="hover:text-white transition-colors">States</Link>
            <span>/</span>
            <span className="text-white">{state.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${vibeGradient} shadow-lg mb-4`}>
                {state.region.charAt(0).toUpperCase() + state.region.slice(1)} India · Capital: {state.capital}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
                {state.name}
              </h1>
              <p style={{ fontFamily: 'var(--font-script)' }} className="text-2xl text-white/80 mb-4">
                {state.tagline}
              </p>
              <p className="text-white/70 max-w-xl text-sm leading-relaxed">
                {state.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#cta"
                data-track="state-cta-hero"
                data-track-id={state.slug}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-center"
              >
                Find Travel Partners in {state.name}
              </a>
              <a href="#cities" className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all text-center">
                Explore Top Cities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LAST UPDATED ============ */}
      <div className="max-w-5xl mx-auto px-4 pt-6 text-center">
        <p className="text-xs text-gray-400">Last updated: June 2026</p>
      </div>

      {/* ============ QUICK INFO ============ */}
      <section className="py-8 px-4 -mt-2 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xl">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Capital</p>
              <p className="font-semibold text-gray-900">{state.capital}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Best Time to Visit</p>
              <p className="font-semibold text-gray-900 text-sm">{state.bestTimeToVisit}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Languages</p>
              <p className="font-semibold text-gray-900 text-sm">{state.languages.join(', ')}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Region</p>
              <p className="font-semibold text-gray-900 text-sm capitalize">{state.region} India</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAMOUS FOR ============ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2 text-center">Why Travelers Love It</p>
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            {state.name} is Famous For
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {state.famousFor.map((item) => (
              <span key={item} className="px-5 py-2.5 rounded-full glass-card text-sm font-medium text-gray-700 border border-white/40 hover:border-brand-300 hover:text-brand-600 transition-all cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TOP CITIES ============ */}
      <section id="cities" className="py-16 px-4 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Plan Your Route</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Top Cities in {state.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              From iconic landmarks to local favorites, here are the best cities to explore in {state.name} with a travel partner by your side.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.topCities.map((city) => {
              const cityGradient = VIBE_GRADIENTS[city.vibe] || VIBE_GRADIENTS.cultural;
              return (
                <Link
                  key={city.slug}
                  href={`/city/${city.slug}`}
                  className="glass-card rounded-2xl p-6 trip-card cursor-pointer group block"
                >
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${cityGradient} shadow mb-4`}>
                    {city.vibe.charAt(0).toUpperCase() + city.vibe.slice(1)}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{city.tagline}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-500 group-hover:gap-2 transition-all">
                    Find partners in {city.name}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ HIDDEN GEMS ============ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Off the Beaten Path</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Hidden Gems in {state.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Skip the crowds. These lesser-known spots in {state.name} are perfect for travelers looking for something authentic.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {state.hiddenGems.map((gem) => (
              <div key={gem} className="glass-card rounded-xl p-5 text-center hover:border-brand-300 border border-white/40 transition-all">
                <svg className="mx-auto mb-3 text-brand-400" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7z" />
                </svg>
                <p className="font-medium text-gray-900 text-sm">{gem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FESTIVALS & CUISINE ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Culture & Celebration</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-6">
              Festivals of {state.name}
            </h2>
            <ul className="space-y-3">
              {state.festivals.map((festival) => (
                <li key={festival} className="flex items-center gap-3 glass-card rounded-xl px-4 py-3">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-500 to-romantic-500 shrink-0" />
                  <span className="text-gray-800 text-sm font-medium">{festival}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Local Flavors</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-6">
              Must-Try Cuisine in {state.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {state.cuisine.map((dish) => (
                <span key={dish} className="px-4 py-2 rounded-full glass-card text-sm font-medium text-gray-700 border border-white/40">
                  {dish}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW TO REACH ============ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Getting There</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              How to Reach {state.name}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.7.8c-.3.4-.2.9.2 1.2L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.2 5.2c.3.4.8.5 1.2.2l.8-.7c.4-.3.6-.8.5-1.3z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">By Air</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{state.howToReach.byAir}</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center text-white mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15.5C4 16.88 5.12 18 6.5 18H7l-1.5 1.5v.5h13v-.5L17 18h.5c1.38 0 2.5-1.12 2.5-2.5V5c0-3.5-3.58-4-8-4s-8 .5-8 4v10.5zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM18 9H6V5h12v4z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">By Train</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{state.howToReach.byTrain}</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warm-400 to-brand-500 flex items-center justify-center text-white mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4zM5 17V7a2 2 0 012-2h10a2 2 0 012 2v10M5 11h14" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">By Road</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{state.howToReach.byRoad}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BUDGET GUIDE ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-romantic-500 uppercase tracking-wider mb-2">Plan Your Spending</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Budget Guide for {state.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Approximate daily costs per person — traveling with a partner can cut accommodation and transport costs significantly.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center border-2 border-transparent hover:border-forest-300 transition-all">
              <p className="text-xs uppercase tracking-wider text-forest-500 font-semibold mb-2">Budget</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{state.budgetGuide.budget}</p>
              <p className="text-xs text-gray-500">Hostels, local food, public transport</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center border-2 border-transparent hover:border-brand-300 transition-all romantic-glow">
              <p className="text-xs uppercase tracking-wider text-brand-500 font-semibold mb-2">Mid-Range</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{state.budgetGuide.mid}</p>
              <p className="text-xs text-gray-500">3-star hotels, sit-down dining, private cabs</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center border-2 border-transparent hover:border-warm-300 transition-all">
              <p className="text-xs uppercase tracking-wider text-warm-500 font-semibold mb-2">Luxury</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{state.budgetGuide.luxury}</p>
              <p className="text-xs text-gray-500">4-5 star resorts, private transport, curated experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ITINERARIES ============ */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Sample Plans</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Best Itineraries for {state.name}
            </h2>
          </div>
          <div className="space-y-5">
            {state.bestItineraries.map((it, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-5">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 via-romantic-500 to-warm-500 text-white flex flex-col items-center justify-center font-bold shadow-lg">
                  <span className="text-lg leading-none">{it.days}</span>
                  <span className="text-[10px] uppercase tracking-wide leading-none mt-0.5">days</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{it.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{it.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PACKING TIPS ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Packing Tips for {state.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {state.packingTips.map((tip, idx) => (
              <div key={idx} className="glass-card rounded-xl p-5 flex items-start gap-3">
                <svg className="w-5 h-5 text-forest-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LOCAL CUSTOMS ============ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Local Customs & Etiquette in {state.name}
          </h2>
          <div className="space-y-4">
            {state.localCustoms.map((custom, idx) => (
              <div key={idx} className="glass-card rounded-xl p-5 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  {idx + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{custom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SAFETY TIPS ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Safety Tips for {state.name}
          </h2>
          <div className="space-y-4">
            {state.safetyTips.map((tip, idx) => (
              <div key={idx} className="glass-card rounded-xl p-5 flex items-start gap-4">
                <svg className="w-6 h-6 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRAVEL TIPS ============ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Travel Tips for {state.name}
          </h2>
          <div className="space-y-4">
            {state.travelTips.map((tip, idx) => (
              <div key={idx} className="glass-card rounded-xl p-5 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  {idx + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Common Questions</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About {state.name}
            </h2>
          </div>
          <div className="space-y-4">
            {state.faqs.map((faq, idx) => (
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

      {/* ============ NEARBY DESTINATIONS ============ */}
      {nearbyStateObjs.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Keep Exploring</p>
              <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Nearby Destinations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                Planning a longer trip? These nearby states pair well with a {state.name} itinerary.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyStateObjs.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/state/${nearby.slug}`}
                  className="glass-card rounded-2xl overflow-hidden trip-card group block"
                >
                  <div
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${nearby.heroImage})` }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
                      {nearby.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{nearby.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CTA ============ */}
      <section id="cta" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card romantic-glow rounded-3xl p-10 sm:p-14 text-center">
            <p style={{ fontFamily: 'var(--font-script)' }} className="text-2xl text-romantic-500 mb-2">
              Your {state.name} adventure starts here
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Find Travel Partners in <span className="gradient-text">{state.name}</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Whether you're planning a solo trip to {state.name} and want company, looking to sponsor someone's journey,
              or just want a reliable trip partner to split costs with — Luventra connects you with verified travelers
              heading to {state.topCities.map((c) => c.name).join(', ')} and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                data-track="state-cta-register"
                data-track-id={state.slug}
                className="px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Find a Travel Partner in {state.name}
              </Link>
              <Link
                href="/"
                className="px-8 py-4 rounded-xl text-sm font-semibold text-gray-700 bg-white/60 border border-white/40 hover:bg-white transition-all"
              >
                Explore More Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
