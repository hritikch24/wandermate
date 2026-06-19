'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GuideProfile } from '@/data/cities';

const AVATAR_COLORS = [
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-indigo-500',
  'from-amber-500 to-orange-500',
  'from-cyan-500 to-blue-500',
  'from-violet-500 to-purple-500',
  'from-teal-500 to-emerald-500',
  'from-rose-500 to-pink-500',
  'from-indigo-500 to-violet-500',
];

export default function GuideCard({ guide, index = 0 }: { guide: GuideProfile; index?: number }) {
  const { data: session } = useSession();
  const router = useRouter();
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];

  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({ startDate: '', endDate: '', notes: '' });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<'booked' | 'error' | null>(null);

  const handleBook = () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    setShowModal(true);
  };

  const submitBooking = async () => {
    if (!bookingData.startDate || !bookingData.endDate) return;
    setSending(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId: guide.id, ...bookingData }),
      });
      if (!res.ok) {
        setResult('error');
      } else {
        setResult('booked');
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
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="avatar-ring shrink-0">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-lg font-bold`}>
              {guide.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 truncate">{guide.name}</h3>
              {guide.verified && (
                <svg className="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-500">{guide.speciality}</p>
          </div>
        </div>

        {/* Local badge + price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Local for {guide.localSince}
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-forest-50 text-forest-700 border border-forest-200">
            {guide.pricePerDay}/day
          </span>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{guide.bio}</p>

        {/* Availability */}
        <div className="flex items-center gap-2 mb-4 text-xs">
          <span className={`flex items-center gap-1.5 ${guide.availability.includes('Available now') ? 'text-green-600' : 'text-amber-600'}`}>
            <span className={`w-2 h-2 rounded-full ${guide.availability.includes('Available now') ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`} />
            {guide.availability}
          </span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{guide.toursCompleted} tours completed</span>
        </div>

        {/* Expertise */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {guide.expertise.map((skill) => (
            <span key={skill} className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              {skill}
            </span>
          ))}
        </div>

        {/* Footer: Rating + Languages */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              {guide.rating}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {guide.languages.slice(0, 2).map((lang) => (
              <span key={lang} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{lang}</span>
            ))}
            {guide.languages.length > 2 && (
              <span className="text-xs text-gray-400">+{guide.languages.length - 2}</span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleBook}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:shadow-lg transition-all"
          >
            Book This Guide
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => !sending && setShowModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-md glass-card rounded-2xl p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {result === 'booked' ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Sent!</h3>
                <p className="text-sm text-gray-600 mb-6">{guide.name} will confirm your booking. You&apos;ll be notified once confirmed.</p>
                <button onClick={() => { setShowModal(false); setResult(null); }} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500">
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold text-gray-900 mb-1">Book {guide.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{guide.speciality} · {guide.pricePerDay}/day</p>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                      <input type="date" value={bookingData.startDate} onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-300 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                      <input type="date" value={bookingData.endDate} onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-300 outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes (optional)</label>
                    <textarea value={bookingData.notes} onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      placeholder="What are you looking to explore? Any special requests?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-300 outline-none transition-all text-sm resize-none" />
                  </div>
                </div>

                {result === 'error' && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                    Something went wrong. Please try again.
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => { setShowModal(false); setResult(null); }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">
                    Cancel
                  </button>
                  <button onClick={submitBooking} disabled={sending || !bookingData.startDate || !bookingData.endDate}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:shadow-lg transition-all disabled:opacity-50">
                    {sending ? 'Booking...' : 'Send Booking'}
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
