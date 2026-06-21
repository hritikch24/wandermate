'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface TripData {
  id: string; title: string; destination: string; description: string | null;
  startDate: string; endDate: string; sponsorType: string; budget: string | null;
  groupSize: string; accommodation: string; interests: string[]; status: string;
  user: { id: string; name: string; avatar: string | null; bio: string | null; verified: boolean; rating: number; tripsCount: number; travelStyle: string | null; languages: string[] };
  group: { id: string; name: string; members: { id: string; name: string; avatar: string | null; verified: boolean; role: string }[]; messageCount: number } | null;
  myRequest: { id: string; status: string } | null;
  isOwner: boolean;
}

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const router = useRouter();
  const [trip, setTrip] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetch(`/api/trips/${id}`).then(r => r.json()).then(d => setTrip(d.trip)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  const handleJoin = async () => {
    setJoining(true);
    try {
      const res = await fetch('/api/trip-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripId: id, message: joinMessage }),
      });
      if (res.ok) {
        setShowJoinModal(false);
        setTrip(prev => prev ? { ...prev, myRequest: { id: 'new', status: 'pending' } } : prev);
      }
    } catch {} finally { setJoining(false); }
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return d; }
  };

  const sponsorLabel: Record<string, { text: string; class: string }> = {
    sponsor: { text: 'Will Sponsor', class: 'badge-sponsor' },
    'need-sponsor': { text: 'Need Sponsor', class: 'badge-need-sponsor' },
    'just-join': { text: 'Just Join', class: 'badge-just-join' },
  };

  if (loading) return (
    <><Navbar /><div className="min-h-screen flex items-center justify-center pt-16"><div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" /></div></>
  );

  if (!trip) return (
    <><Navbar /><div className="min-h-screen flex items-center justify-center pt-16"><div className="text-center"><h1 className="text-2xl font-bold text-gray-900 mb-2">Trip Not Found</h1><Link href="/trips" className="text-brand-600 hover:underline">Browse all trips</Link></div></div></>
  );

  const badge = sponsorLabel[trip.sponsorType] || { text: trip.sponsorType, class: 'bg-gray-100 text-gray-600' };

  return (
    <>
      <Navbar />
      <main className="min-h-screen animated-bg pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/trips" className="hover:text-brand-600">Trips</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{trip.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trip header */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${badge.class}`}>{badge.text}</span>
                    <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                        {trip.destination}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${trip.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {trip.status === 'open' ? 'Open for Joining' : 'Closed'}
                  </span>
                </div>

                {trip.description && <p className="text-gray-700 leading-relaxed mb-6">{trip.description}</p>}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {trip.budget && <div className="bg-white/50 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">Budget</p><p className="font-semibold text-gray-900 text-sm">{trip.budget}</p></div>}
                  <div className="bg-white/50 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">Group Size</p><p className="font-semibold text-gray-900 text-sm">{trip.groupSize}</p></div>
                  <div className="bg-white/50 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">Accommodation</p><p className="font-semibold text-gray-900 text-sm capitalize">{trip.accommodation}</p></div>
                  <div className="bg-white/50 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">Status</p><p className="font-semibold text-gray-900 text-sm capitalize">{trip.status}</p></div>
                </div>

                {trip.interests.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {trip.interests.map(i => <span key={i} className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium border border-brand-200/50">{i}</span>)}
                    </div>
                  </div>
                )}
              </div>

              {/* Group Members */}
              {trip.group && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Trip Group ({trip.group.members.length} members)</h2>
                    {(trip.isOwner || trip.myRequest?.status === 'accepted') && (
                      <Link href={`/trip/${id}/chat`} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-romantic-500 hover:shadow-lg transition-all">
                        Group Chat ({trip.group.messageCount})
                      </Link>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {trip.group.members.map(m => (
                      <Link key={m.id} href={`/profile/${m.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-romantic-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {m.name?.split(' ').map(n => n[0]).join('') || '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">{m.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{m.role}</p>
                        </div>
                        {m.verified && <svg className="w-4 h-4 text-blue-500 shrink-0 ml-auto" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trip owner card */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Trip Creator</h3>
                <Link href={`/profile/${trip.user.id}`} className="flex items-center gap-3 mb-4 group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-400 to-romantic-400 flex items-center justify-center text-white font-bold text-lg shrink-0 group-hover:scale-110 transition-transform">
                    {trip.user.name?.split(' ').map(n => n[0]).join('') || '?'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{trip.user.name}</p>
                      {trip.user.verified && <svg className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                    </div>
                    <p className="text-xs text-gray-500">{trip.user.tripsCount} trips · ⭐ {trip.user.rating.toFixed(1)}</p>
                  </div>
                </Link>
                {trip.user.bio && <p className="text-sm text-gray-600 mb-3 line-clamp-3">{trip.user.bio}</p>}
                {trip.user.travelStyle && <p className="text-xs text-gray-500">Travel style: <span className="font-medium text-gray-700">{trip.user.travelStyle}</span></p>}
              </div>

              {/* CTA */}
              <div className="glass-card rounded-2xl p-6">
                {!session ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Sign in to join this trip and connect with the group</p>
                    <Link href="/auth/register" className="block w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-romantic-500 text-white font-semibold text-center hover:shadow-lg transition-all">
                      Join Luventra Free
                    </Link>
                  </div>
                ) : trip.isOwner ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">This is your trip</p>
                    <Link href="/dashboard" className="block w-full py-3 rounded-xl border border-brand-200 text-brand-600 font-semibold text-center hover:bg-brand-50 transition-all">
                      Manage Requests
                    </Link>
                  </div>
                ) : trip.myRequest ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Your request is <span className={`font-semibold ${trip.myRequest.status === 'accepted' ? 'text-green-600' : trip.myRequest.status === 'rejected' ? 'text-red-600' : 'text-amber-600'}`}>{trip.myRequest.status}</span></p>
                    {trip.myRequest.status === 'accepted' && (
                      <Link href={`/trip/${id}/chat`} className="block w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-romantic-500 text-white font-semibold text-center hover:shadow-lg transition-all mt-3">
                        Open Group Chat
                      </Link>
                    )}
                  </div>
                ) : trip.status === 'open' ? (
                  <button onClick={() => setShowJoinModal(true)} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all">
                    Request to Join
                  </button>
                ) : (
                  <p className="text-sm text-gray-500 text-center">This trip is no longer accepting requests</p>
                )}
              </div>

              {/* Share */}
              <div className="glass-card rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-3">Know someone who&apos;d love this trip?</p>
                <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="px-4 py-2 rounded-xl text-sm font-medium text-brand-600 border border-brand-200 hover:bg-brand-50 transition-all">
                  Copy Link to Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Join Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/40">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Join This Trip</h3>
              <p className="text-sm text-gray-600 mb-4">Send a message to {trip.user.name} explaining why you&apos;d be a great travel companion.</p>
              <textarea value={joinMessage} onChange={e => setJoinMessage(e.target.value)} rows={4} placeholder="Hi! I'd love to join because..."
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200 focus:ring-2 focus:ring-brand-300 outline-none text-sm resize-none mb-4" />
              <div className="flex gap-3">
                <button onClick={() => setShowJoinModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50">Cancel</button>
                <button onClick={handleJoin} disabled={joining} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-romantic-500 text-white font-semibold text-sm hover:shadow-lg disabled:opacity-50">
                  {joining ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
