'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Tab = 'received' | 'sent' | 'my-trips' | 'bookings';

interface TripRequest {
  id: string;
  message: string | null;
  status: string;
  createdAt: string;
  user?: { id: string; name: string; avatar: string | null; bio: string | null; rating: number; verified: boolean };
  trip: { id: string; title: string; destination: string; user?: { id: string; name: string } };
}

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  sponsorType: string;
  status: string;
}

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  notes: string | null;
  guide: { id: string; speciality: string; user: { id: string; name: string; avatar: string | null } };
}

export default function DashboardPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('received');
  const [receivedRequests, setReceivedRequests] = useState<TripRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<TripRequest[]>([]);
  const [myTrips, setMyTrips] = useState<Trip[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [authStatus, router]);

  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    setLoading(true);

    Promise.all([
      fetch('/api/trip-requests?type=received').then(r => r.json()).catch(() => ({ requests: [] })),
      fetch('/api/trip-requests?type=sent').then(r => r.json()).catch(() => ({ requests: [] })),
      fetch('/api/trips?mine=true').then(r => r.json()).catch(() => ({ trips: [] })),
      fetch('/api/bookings').then(r => r.json()).catch(() => ({ bookings: [] })),
    ]).then(([received, sent, trips, bk]) => {
      setReceivedRequests(received.requests || []);
      setSentRequests(sent.requests || []);
      setMyTrips(trips.trips || []);
      setBookings(bk.bookings || []);
    }).finally(() => setLoading(false));
  }, [authStatus]);

  const handleAction = async (requestId: string, action: 'accepted' | 'rejected') => {
    setActionLoading(requestId);
    try {
      const res = await fetch('/api/trip-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status: action }),
      });
      if (res.ok) {
        setReceivedRequests(prev =>
          prev.map(r => r.id === requestId ? { ...r, status: action } : r)
        );
      }
    } catch {} finally {
      setActionLoading(null);
    }
  };

  if (authStatus === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading your dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'received', label: 'Received Requests', count: receivedRequests.filter(r => r.status === 'pending').length },
    { key: 'sent', label: 'Sent Requests', count: sentRequests.length },
    { key: 'my-trips', label: 'My Trips', count: myTrips.length },
    { key: 'bookings', label: 'My Bookings', count: bookings.length },
  ];

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      open: 'bg-blue-100 text-blue-700',
      closed: 'bg-gray-100 text-gray-600',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return d; }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500 mb-8">Manage your trips, requests, and bookings</p>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  tab === t.key ? 'bg-gray-900 text-white shadow-lg' : 'bg-white/70 text-gray-600 border border-gray-200 hover:border-brand-300'
                }`}>
                {t.label}
                {t.count > 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">{t.count}</span>}
              </button>
            ))}
          </div>

          {/* Received Requests */}
          {tab === 'received' && (
            <div className="space-y-4">
              {receivedRequests.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <p className="text-gray-500">No requests received yet. Post a trip and travelers will send you join requests!</p>
                </div>
              ) : receivedRequests.map(req => (
                <div key={req.id} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-romantic-400 flex items-center justify-center text-white font-bold">
                        {req.user?.name?.split(' ').map(n => n[0]).join('') || '?'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{req.user?.name}</span>
                          {req.user?.verified && <span className="text-blue-500 text-xs">Verified</span>}
                          {statusBadge(req.status)}
                        </div>
                        <p className="text-sm text-gray-500 mb-1">
                          Wants to join: <span className="font-medium text-gray-700">{req.trip.title}</span> ({req.trip.destination})
                        </p>
                        {req.message && <p className="text-sm text-gray-600 italic">&ldquo;{req.message}&rdquo;</p>}
                        <p className="text-xs text-gray-400 mt-1">{formatDate(req.createdAt)}</p>
                      </div>
                    </div>
                    {req.status === 'pending' && (
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleAction(req.id, 'accepted')} disabled={actionLoading === req.id}
                          className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition-all disabled:opacity-50">
                          Accept
                        </button>
                        <button onClick={() => handleAction(req.id, 'rejected')} disabled={actionLoading === req.id}
                          className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all disabled:opacity-50">
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sent Requests */}
          {tab === 'sent' && (
            <div className="space-y-4">
              {sentRequests.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <p className="text-gray-500">You haven&apos;t sent any trip requests yet. Browse travelers and connect!</p>
                </div>
              ) : sentRequests.map(req => (
                <div key={req.id} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{req.trip.title}</span>
                        {statusBadge(req.status)}
                      </div>
                      <p className="text-sm text-gray-500">
                        Trip by {req.trip.user?.name || 'Unknown'} · {req.trip.destination}
                      </p>
                      {req.message && <p className="text-sm text-gray-600 mt-1 italic">&ldquo;{req.message}&rdquo;</p>}
                      <p className="text-xs text-gray-400 mt-1">{formatDate(req.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* My Trips */}
          {tab === 'my-trips' && (
            <div className="space-y-4">
              {myTrips.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <p className="text-gray-500 mb-4">You haven&apos;t posted any trips yet.</p>
                  <button onClick={() => router.push('/')} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-romantic-500">
                    Post a Trip
                  </button>
                </div>
              ) : myTrips.map(trip => (
                <div key={trip.id} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{trip.title}</span>
                        {statusBadge(trip.status)}
                      </div>
                      <p className="text-sm text-gray-500">
                        {trip.destination} · {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bookings */}
          {tab === 'bookings' && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <p className="text-gray-500">No guide bookings yet. Browse guides and book one for your trip!</p>
                </div>
              ) : bookings.map(bk => (
                <div key={bk.id} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{bk.guide.user.name}</span>
                        {statusBadge(bk.status)}
                      </div>
                      <p className="text-sm text-gray-500">
                        {bk.guide.speciality} · {formatDate(bk.startDate)} – {formatDate(bk.endDate)}
                      </p>
                      {bk.notes && <p className="text-sm text-gray-600 mt-1 italic">&ldquo;{bk.notes}&rdquo;</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
