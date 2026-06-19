'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TravelerCard from '@/components/features/TravelerCard';
import GuideCard from '@/components/features/GuideCard';
import SearchModeToggle from '@/components/features/SearchModeToggle';
import TripPlanModal from '@/components/features/TripPlanModal';
import { CityData, TravelerProfile, GuideProfile, CITIES, SearchMode } from '@/data/cities';

const VIBE_GRADIENTS: Record<string, string> = {
  adventure: 'from-orange-600 via-red-600 to-amber-600',
  spiritual: 'from-purple-600 via-indigo-600 to-violet-600',
  romantic: 'from-pink-600 via-rose-600 to-red-600',
  party: 'from-yellow-500 via-orange-500 to-red-500',
  serene: 'from-emerald-600 via-teal-600 to-cyan-600',
  cultural: 'from-blue-600 via-indigo-600 to-purple-600',
};

export default function CityPageClient({
  city,
  cityTravelers,
  otherTravelers,
  cityGuides,
}: {
  city: CityData;
  cityTravelers: TravelerProfile[];
  otherTravelers: TravelerProfile[];
  cityGuides: GuideProfile[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>('partner');
  const vibeGradient = VIBE_GRADIENTS[city.vibe] || VIBE_GRADIENTS.adventure;

  return (
    <>
      <Navbar currentCity={city.slug} />

      {/* ============ HERO ============ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${city.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#destinations" className="hover:text-white transition-colors">Destinations</Link>
            <span>/</span>
            <span className="text-white">{city.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${vibeGradient} shadow-lg mb-4`}>
                {city.vibe.charAt(0).toUpperCase() + city.vibe.slice(1)} Destination
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
                {city.name}
              </h1>
              <p style={{ fontFamily: 'var(--font-script)' }} className="text-2xl text-white/80 mb-4">
                {city.tagline}
              </p>
              <p className="text-white/70 max-w-xl text-sm leading-relaxed">
                {city.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Plan a Trip to {city.name}
              </button>
              <a href="#travelers" className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all text-center">
                Find Partners Here
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
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</p>
              <p className="font-semibold text-gray-900">{city.state || city.country}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Best Time</p>
              <p className="font-semibold text-gray-900 text-sm">{city.bestTime.split(',')[0]}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg Budget</p>
              <p className="font-semibold text-gray-900 text-sm">{city.avgBudget}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Active Travelers</p>
              <p className="font-semibold text-gray-900">{cityTravelers.length + Math.floor(Math.random() * 20 + 10)}+</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HIGHLIGHTS ============ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Must-Visit in {city.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {city.highlights.map((highlight) => (
              <span key={highlight} className="px-5 py-2.5 rounded-full glass-card text-sm font-medium text-gray-700 border border-white/40 hover:border-brand-300 hover:text-brand-600 transition-all cursor-default">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POPULAR TRIPS ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Curated Experiences</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Popular Trips in {city.name}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {city.popularTrips.map((trip) => (
              <div key={trip.id} className="glass-card rounded-2xl p-6 trip-card cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-600 transition-colors">{trip.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span>{trip.duration}</span>
                      <span>·</span>
                      <span className={`font-medium ${
                        trip.difficulty === 'easy' ? 'text-green-600' :
                        trip.difficulty === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{trip.difficulty}</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-brand-600">{trip.estimatedCost}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trip.highlights.map((h) => (
                    <span key={h} className="px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button onClick={() => setModalOpen(true)} className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors flex items-center gap-1">
                    Find partners for this trip
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRAVELERS / GUIDES ============ */}
      <section id="travelers" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-romantic-500 uppercase tracking-wider mb-2">Active Now</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {searchMode === 'partner'
                ? `Travelers Heading to ${city.name}`
                : `Local Guides in ${city.name}`}
            </h2>
          </div>

          {/* Mode Toggle */}
          <SearchModeToggle mode={searchMode} onChange={setSearchMode} />

          {/* Partner Mode */}
          {searchMode === 'partner' && (
            <>
              {cityTravelers.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {cityTravelers.map((t, i) => (
                    <TravelerCard key={t.id} traveler={t} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass-card rounded-2xl mb-12">
                  <p className="text-gray-500 mb-4">No one has posted a trip to {city.name} yet. Be the first!</p>
                  <button onClick={() => setModalOpen(true)} className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-romantic-500 hover:shadow-lg transition-all">
                    Post Your {city.name} Trip
                  </button>
                </div>
              )}

              {otherTravelers.length > 0 && (
                <>
                  <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold text-gray-900 mb-6 text-center">
                    Travelers at Other Destinations
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {otherTravelers.map((t, i) => (
                      <TravelerCard key={t.id} traveler={t} index={i + 4} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Guide Mode */}
          {searchMode === 'guide' && (
            <>
              {cityGuides.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cityGuides.map((g, i) => (
                    <GuideCard key={g.id} guide={g} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass-card rounded-2xl">
                  <p className="text-gray-500 mb-4">No local guides available in {city.name} yet.</p>
                  <button className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg transition-all">
                    Become a Guide in {city.name}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ============ OTHER CITIES ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-6xl mx-auto text-center">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-8">Explore Other Destinations</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(CITIES)
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/city/${c.slug}`}
                  className="px-5 py-2.5 rounded-full glass-card text-sm font-medium text-gray-700 border border-white/40 hover:border-brand-300 hover:text-brand-600 hover:shadow-md transition-all"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-12 romantic-glow">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Explore <span className="gradient-text">{city.name}</span>?
          </h2>
          <p className="text-gray-600 mb-8">Find your perfect travel partner and create unforgettable memories together.</p>
          <button onClick={() => setModalOpen(true)}
            className="px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Start Planning
          </button>
        </div>
      </section>

      <Footer />
      <TripPlanModal isOpen={modalOpen} onClose={() => setModalOpen(false)} preselectedCity={city.slug} />
    </>
  );
}
