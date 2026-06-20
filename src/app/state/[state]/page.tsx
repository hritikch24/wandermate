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

export function generateStaticParams() {
  return STATE_SLUGS.map((state) => ({ state }));
}

export function generateMetadata({ params }: Props): Metadata {
  const state = getStateBySlug(params.state);
  if (!state) return {};

  const title = `${state.name} Travel Partners | Luventra`;
  const description = `${state.description} Find verified travel partners and companions for your ${state.name} trip on Luventra — plan together, split costs, and explore ${state.name}'s top cities, hidden gems, festivals, and cuisine.`;

  return {
    title,
    description,
    keywords: [
      ...state.seoKeywords,
      `travel partner ${state.name}`,
      `travel buddy ${state.name}`,
      `${state.name} trip planning`,
      `${state.name} group travel`,
      `solo travel ${state.name}`,
      `${state.name} backpacking`,
      `things to do in ${state.name}`,
      `best time to visit ${state.name}`,
    ],
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

  const jsonLd = {
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            <Link href="/#destinations" className="hover:text-white transition-colors">States</Link>
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

      {/* ============ QUICK INFO ============ */}
      <section className="py-8 px-4 -mt-8 relative z-20">
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
