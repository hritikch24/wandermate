'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TravelerProfile } from '@/data/cities';

const SPONSOR_LABELS: Record<string, { label: string; class: string; icon: string }> = {
  'sponsor': { label: "I'll Sponsor", class: 'badge-sponsor', icon: '💚' },
  'need-sponsor': { label: 'Need Sponsor', class: 'badge-need-sponsor', icon: '🙏' },
  'just-join': { label: "Let's Go Together", class: 'badge-just-join', icon: '🤝' },
};

const AVATAR_COLORS = [
  'from-brand-400 to-romantic-400',
  'from-romantic-400 to-purple-400',
  'from-forest-400 to-teal-400',
  'from-warm-400 to-brand-400',
  'from-indigo-400 to-romantic-400',
  'from-emerald-400 to-forest-400',
  'from-amber-400 to-warm-400',
  'from-rose-400 to-romantic-400',
];

export default function TravelerCard({ traveler, index = 0 }: { traveler: TravelerProfile; index?: number }) {
  const { data: session } = useSession();
  const router = useRouter();
  const sponsor = SPONSOR_LABELS[traveler.sponsorType];
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<'sent' | 'already' | 'error' | null>(null);

  const handleConnect = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    setShowModal(true);
  };

  const sendRequest = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/trip-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripId: traveler.id, message }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setResult('already');
      } else if (!res.ok) {
        setResult('error');
      } else {
        setResult('sent');
      }
    } catch {
      setResult('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="glass-card rounded-2xl p-6 trip-card group cursor-pointer">
        {/* Header: Avatar + Name + Badge */}
        <div className="flex items-start gap-4 mb-4">
          <div className="avatar-ring shrink-0">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-lg font-bold`}>
              {traveler.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 truncate">{traveler.name}</h3>
              {traveler.verified && (
                <svg className="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-500">{traveler.age} · {traveler.travelStyle}</p>
          </div>
        </div>

        {/* Sponsor Type Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${sponsor.class}`}>
            <span>{sponsor.icon}</span>
            {sponsor.label}
          </span>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{traveler.bio}</p>

        {/* Trip Details */}
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {traveler.dateRange}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {traveler.destination.charAt(0).toUpperCase() + traveler.destination.slice(1)}
          </span>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {traveler.interests.map((interest) => (
            <span key={interest} className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100">
              {interest}
            </span>
          ))}
        </div>

        {/* Stats & Languages */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              {traveler.rating}
            </span>
            <span>{traveler.tripsCompleted} trips</span>
          </div>
          <div className="flex items-center gap-1">
            {traveler.languages.slice(0, 2).map((lang) => (
              <span key={lang} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{lang}</span>
            ))}
            {traveler.languages.length > 2 && (
              <span className="text-xs text-gray-400">+{traveler.languages.length - 2}</span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleConnect}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 hover:shadow-lg transition-all"
          >
            Connect & Plan Together
          </button>
        </div>
      </div>

      {/* Join Request Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => !sending && setShowModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-md glass-card rounded-2xl p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {result === 'sent' ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                <p className="text-sm text-gray-600 mb-6">{traveler.name} will be notified. You&apos;ll hear back once they accept.</p>
                <button onClick={() => { setShowModal(false); setResult(null); setMessage(''); }} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-romantic-500">
                  Done
                </button>
              </div>
            ) : result === 'already' ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Already Requested</h3>
                <p className="text-sm text-gray-600 mb-6">You&apos;ve already sent a request for this trip. Hang tight!</p>
                <button onClick={() => { setShowModal(false); setResult(null); }} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200">
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold text-gray-900 mb-1">Join {traveler.name}&apos;s Trip</h3>
                <p className="text-sm text-gray-500 mb-6">
                  {traveler.destination.charAt(0).toUpperCase() + traveler.destination.slice(1)} · {traveler.dateRange} · {sponsor.icon} {sponsor.label}
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Introduce yourself (optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell them why you'd be a great travel partner..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none transition-all text-sm resize-none"
                  />
                </div>

                {result === 'error' && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                    Something went wrong. Please try again.
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowModal(false); setResult(null); setMessage(''); }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendRequest}
                    disabled={sending}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {sending ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
