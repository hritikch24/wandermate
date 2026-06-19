'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CityCard from '@/components/features/CityCard';
import TravelerCard from '@/components/features/TravelerCard';
import GuideCard from '@/components/features/GuideCard';
import SearchModeToggle from '@/components/features/SearchModeToggle';
import TripPlanModal from '@/components/features/TripPlanModal';
import { CITIES, SAMPLE_TRAVELERS, SAMPLE_GUIDES, SearchMode, TravelerProfile, GuideProfile } from '@/data/cities';

// Transform API trip data to TravelerProfile format for card display
function apiTripToTraveler(trip: Record<string, unknown>): TravelerProfile {
  const user = trip.user as Record<string, unknown>;
  return {
    id: trip.id as string,
    name: user.name as string,
    age: (user.age as number) || 25,
    avatar: (user.avatar as string) || '',
    bio: (user.bio as string) || (trip.description as string) || '',
    travelStyle: (user.travelStyle as string) || 'Explorer',
    languages: (user.languages as string[]) || [],
    verified: (user.verified as boolean) || false,
    rating: (user.rating as number) || 0,
    tripsCompleted: (user.tripsCount as number) || 0,
    sponsorType: trip.sponsorType as 'sponsor' | 'need-sponsor' | 'just-join',
    interests: (trip.interests as string[]) || [],
    destination: trip.destination as string,
    dateRange: formatDateRange(trip.startDate as string, trip.endDate as string),
  };
}

function formatDateRange(start: string, end: string): string {
  try {
    const s = new Date(start);
    const e = new Date(end);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[s.getMonth()]} ${s.getDate()}-${e.getDate()}`;
  } catch { return ''; }
}

// Transform API guide data to GuideProfile format
function apiGuideToProfile(guide: Record<string, unknown>): GuideProfile {
  const user = guide.user as Record<string, unknown>;
  return {
    id: guide.id as string,
    name: user.name as string,
    age: (user.age as number) || 30,
    avatar: (user.avatar as string) || '',
    bio: (user.bio as string) || '',
    speciality: guide.speciality as string,
    languages: (user.languages as string[]) || [],
    verified: (guide.verified as boolean) || false,
    rating: (user.rating as number) || 0,
    toursCompleted: (guide.toursCompleted as number) || 0,
    pricePerDay: `₹${(guide.pricePerDay as number)?.toLocaleString() || '0'}`,
    expertise: (guide.expertise as string[]) || [],
    city: guide.city as string,
    availability: (guide.availability as string) || 'Available now',
    localSince: (guide.localSince as string) || '',
  };
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>('partner');
  const [sponsorFilter, setSponsorFilter] = useState<string>('all');
  const [guideCity, setGuideCity] = useState<string>('all');
  const [trips, setTrips] = useState<TravelerProfile[]>(SAMPLE_TRAVELERS);
  const [guides, setGuides] = useState<GuideProfile[]>(SAMPLE_GUIDES);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const [loadingGuides, setLoadingGuides] = useState(false);

  // Fetch trips from API
  useEffect(() => {
    setLoadingTrips(true);
    const params = new URLSearchParams();
    if (sponsorFilter !== 'all') params.set('sponsorType', sponsorFilter);
    fetch(`/api/trips?${params}`)
      .then(r => r.json())
      .then(data => {
        if (data.trips?.length > 0) {
          setTrips(data.trips.map(apiTripToTraveler));
        }
      })
      .catch(() => { /* fallback to static data */ })
      .finally(() => setLoadingTrips(false));
  }, [sponsorFilter]);

  // Fetch guides from API
  useEffect(() => {
    setLoadingGuides(true);
    const params = new URLSearchParams();
    if (guideCity !== 'all') params.set('city', guideCity);
    fetch(`/api/guides?${params}`)
      .then(r => r.json())
      .then(data => {
        if (data.guides?.length > 0) {
          setGuides(data.guides.map(apiGuideToProfile));
        }
      })
      .catch(() => { /* fallback to static data */ })
      .finally(() => setLoadingGuides(false));
  }, [guideCity]);

  const filteredTravelers = trips;
  const filteredGuides = guides;

  return (
    <>
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-romantic-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-warm-200/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-600">2,450+ travelers connected this month</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
            Find Your Perfect{' '}
            <span className="gradient-text">Travel Partner</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Whether you want to{' '}
            <span className="font-semibold text-forest-600">sponsor an adventure</span>,{' '}
            <span className="font-semibold text-warm-600">find a sponsor</span>, or{' '}
            <span className="font-semibold text-purple-600">just find great company</span>{' '}
            — your next journey starts here.
          </p>

          <p style={{ fontFamily: 'var(--font-script)' }} className="text-2xl text-romantic-500 mb-10 animate-fade-in" >
            Because the best stories are shared ones
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="group px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl shadow-romantic-200/50 hover:shadow-2xl hover:shadow-romantic-300/50 hover:scale-105 transition-all duration-300"
            >
              Start Your Adventure
              <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            <a href="#destinations" className="px-8 py-4 rounded-2xl text-lg font-semibold text-gray-700 bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300">
              Explore Destinations
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span>ID Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span>4.8 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>12,000+ Travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-romantic-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <span>Zero Tolerance for Scams</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">Simple & Safe</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Luventra Works
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">Three simple steps to find your perfect travel companion</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Style',
                desc: 'Tell us if you want to sponsor a trip, need sponsorship, or just want company. Pick your destination, dates, and interests.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                ),
                color: 'from-forest-400 to-forest-600',
              },
              {
                step: '02',
                title: 'Match & Connect',
                desc: 'Our smart matching finds travelers with compatible vibes, budgets, and schedules. Chat safely, video call, and get to know each other.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                ),
                color: 'from-romantic-400 to-romantic-600',
              },
              {
                step: '03',
                title: 'Plan & Explore',
                desc: 'Plan your itinerary together, split expenses fairly, and embark on an adventure. Rate each other after and build your trust score.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
                color: 'from-warm-400 to-brand-500',
              },
            ].map((item) => (
              <div key={item.step} className="glass-card rounded-2xl p-8 text-center group hover:shadow-xl transition-all">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-brand-400 tracking-widest mb-2">STEP {item.step}</div>
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DESTINATIONS ============ */}
      <section id="destinations" className="py-24 px-4 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-romantic-500 uppercase tracking-wider mb-2">Explore India & Beyond</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Handpicked Destinations
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">Each destination has its own community of travelers ready to connect. Visit any city page for local trip plans and partners.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(CITIES).map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>

          <p className="text-center mt-8 text-sm text-gray-500">
            Access any city directly: <span className="font-mono text-brand-600">mussoorie.luventra.com</span>, <span className="font-mono text-brand-600">goa.luventra.com</span>, etc.
          </p>
        </div>
      </section>

      {/* ============ TRAVELERS / GUIDES ============ */}
      <section id="travelers" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-forest-500 uppercase tracking-wider mb-2">Connect Now</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {searchMode === 'partner' ? 'Travelers Looking for Partners' : 'Local Guides Ready to Show You Around'}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {searchMode === 'partner'
                ? 'Real people, verified profiles, genuine wanderlust. Find someone who matches your vibe.'
                : 'Verified locals who know every hidden gem. Book a guide and experience destinations like a local.'}
            </p>
          </div>

          {/* Mode Toggle */}
          <SearchModeToggle mode={searchMode} onChange={setSearchMode} />

          {/* Partner Mode */}
          {searchMode === 'partner' && (
            <>
              {/* Filters */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {[
                  { value: 'all', label: 'All Travelers', emoji: '✨' },
                  { value: 'sponsor', label: "Will Sponsor", emoji: '💚' },
                  { value: 'need-sponsor', label: 'Need Sponsor', emoji: '🙏' },
                  { value: 'just-join', label: "Let's Go Together", emoji: '🤝' },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setSponsorFilter(f.value)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      sponsorFilter === f.value
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-white/70 text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-600'
                    }`}
                  >
                    <span>{f.emoji}</span>
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTravelers.map((traveler, i) => (
                  <TravelerCard key={traveler.id} traveler={traveler} index={i} />
                ))}
              </div>

              {filteredTravelers.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No travelers found with this filter. Be the first!</p>
                </div>
              )}

              <div className="text-center mt-12">
                <button onClick={() => setModalOpen(true)}
                  className="px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  Post Your Trip
                </button>
              </div>
            </>
          )}

          {/* Guide Mode */}
          {searchMode === 'guide' && (
            <>
              {/* City filter for guides */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                <button
                  onClick={() => setGuideCity('all')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    guideCity === 'all'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white/70 text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  All Cities
                </button>
                {Object.values(CITIES).map((city) => (
                  <button
                    key={city.slug}
                    onClick={() => setGuideCity(city.slug)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      guideCity === city.slug
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-white/70 text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGuides.map((guide, i) => (
                  <GuideCard key={guide.id} guide={guide} index={i} />
                ))}
              </div>

              {filteredGuides.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No guides available for this city yet. Check back soon!</p>
                </div>
              )}

              <div className="text-center mt-12">
                <button className="px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  Become a Guide
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============ SAFETY ============ */}
      <section id="safety" className="py-24 px-4 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2">Your Safety, Our Priority</p>
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Travel with Confidence
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">We built Luventra from the ground up with safety as the foundation, addressing every concern real travelers have shared.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Verified Identities', desc: 'Every profile is verified through government ID, social media linking, and phone verification. No more fake profiles.', icon: '🛡️' },
              { title: 'Trust Score System', desc: 'Build your reputation through completed trips, reviews, and community endorsements. Higher trust = more matches.', icon: '⭐' },
              { title: 'Safe Chat & Video Calls', desc: 'Get to know your travel partner through our secure in-app chat and video calls before meeting in person.', icon: '💬' },
              { title: 'Emergency SOS', desc: 'One-tap emergency button that shares your live location with trusted contacts and local authorities.', icon: '🚨' },
              { title: 'Trip Insurance Integration', desc: 'Optional travel insurance for every trip. Covers cancellations, medical emergencies, and belongings.', icon: '🏥' },
              { title: 'Community Moderation', desc: 'Active 24/7 moderation team. Zero tolerance for scams, harassment, or fake intent. Report anything, anytime.', icon: '👁️' },
            ].map((feature) => (
              <div key={feature.title} className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <span className="text-3xl shrink-0">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 romantic-glow">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Next Adventure Is{' '}
              <span className="gradient-text">One Connection Away</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-script)' }} className="text-xl text-romantic-500 mb-2">
              Don&apos;t travel alone when you can travel together
            </p>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Join 12,000+ travelers who found their perfect match. Free to join, free to connect, free to wander.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-10 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl shadow-romantic-200/50 hover:shadow-2xl hover:scale-105 transition-all"
            >
              Join Luventra — It&apos;s Free
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <TripPlanModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
