'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Trip {
  id: string; title: string; destination: string; description: string | null;
  startDate: string; endDate: string; sponsorType: string; budget: string | null;
  groupSize: string; interests: string[]; status: string;
  user: { id: string; name: string; avatar: string | null; verified: boolean; rating: number; travelStyle: string | null };
}

const SPONSOR_LABELS: Record<string, { text: string; class: string }> = {
  sponsor: { text: 'Will Sponsor', class: 'badge-sponsor' },
  'need-sponsor': { text: 'Need Sponsor', class: 'badge-need-sponsor' },
  'just-join': { text: 'Just Join', class: 'badge-just-join' },
};

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({ destination: '', sponsorType: '', sort: 'newest' });
  const limit = 12;

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(limit), offset: String(offset), status: 'open' });
    if (filters.destination) params.set('destination', filters.destination);
    if (filters.sponsorType) params.set('sponsorType', filters.sponsorType);
    try {
      const res = await fetch(`/api/trips?${params}`);
      const data = await res.json();
      setTrips(data.trips || []);
      setTotal(data.total || 0);
    } catch {} finally { setLoading(false); }
  }, [offset, filters]);

  useEffect(() => { fetchTrips(); }, [fetchTrips]);

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); } catch { return d; }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen animated-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold mb-3">
              <span className="gradient-text">Find Your Next Adventure</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Browse open trips from travelers across India. Join a group, split costs, and explore together.
            </p>
          </div>

          {/* Filters */}
          <div className="glass-card rounded-2xl p-4 mb-8 flex flex-wrap gap-3 items-center">
            <input type="text" placeholder="Search destination..." value={filters.destination}
              onChange={e => { setFilters(f => ({ ...f, destination: e.target.value })); setOffset(0); }}
              className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
            <select value={filters.sponsorType} onChange={e => { setFilters(f => ({ ...f, sponsorType: e.target.value })); setOffset(0); }}
              className="px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-brand-300 outline-none text-sm">
              <option value="">All Types</option>
              <option value="sponsor">Will Sponsor</option>
              <option value="need-sponsor">Need Sponsor</option>
              <option value="just-join">Just Join</option>
            </select>
            <div className="text-sm text-gray-500">{total} trips found</div>
          </div>

          {/* Trip Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="glass-card rounded-2xl h-64 shimmer" />)}
            </div>
          ) : trips.length === 0 ? (
            <div className="glass-card rounded-2xl p-16 text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No trips found</h2>
              <p className="text-gray-600 mb-6">Be the first to post a trip to {filters.destination || 'this destination'}!</p>
              <Link href="/" className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-romantic-500 text-white font-semibold hover:shadow-lg transition-all">
                Post a Trip
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map(trip => {
                const badge = SPONSOR_LABELS[trip.sponsorType] || { text: trip.sponsorType, class: 'bg-gray-100' };
                return (
                  <Link key={trip.id} href={`/trip/${trip.id}`} className="glass-card rounded-2xl p-6 hover-lift group block">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${badge.class}`}>{badge.text}</span>
                      <span className="text-xs text-gray-500">{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-brand-600 transition-colors line-clamp-1">{trip.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                      {trip.destination}
                    </p>
                    {trip.description && <p className="text-sm text-gray-500 line-clamp-2 mb-4">{trip.description}</p>}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {trip.budget && <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200/50">₹{trip.budget}</span>}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/50">{trip.groupSize} people</span>
                    </div>
                    {trip.interests.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {trip.interests.slice(0, 3).map(i => <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">{i}</span>)}
                        {trip.interests.length > 3 && <span className="text-xs text-gray-400">+{trip.interests.length - 3}</span>}
                      </div>
                    )}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-romantic-400 flex items-center justify-center text-white font-bold text-xs">
                        {trip.user.name?.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{trip.user.name}</p>
                        <p className="text-xs text-gray-500">⭐ {trip.user.rating.toFixed(1)}</p>
                      </div>
                      {trip.user.verified && <svg className="w-4 h-4 text-blue-500 ml-auto" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {total > limit && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button onClick={() => setOffset(Math.max(0, offset - limit))} disabled={offset === 0}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                ← Previous
              </button>
              <span className="text-sm text-gray-500">Page {Math.floor(offset / limit) + 1} of {Math.ceil(total / limit)}</span>
              <button onClick={() => setOffset(offset + limit)} disabled={offset + limit >= total}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                Next →
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
