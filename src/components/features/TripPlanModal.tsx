'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CITIES, CITY_SLUGS } from '@/data/cities';

interface TripPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCity?: string;
}

export default function TripPlanModal({ isOpen, onClose, preselectedCity }: TripPlanModalProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    destination: preselectedCity || '',
    startDate: '',
    endDate: '',
    sponsorType: '' as 'sponsor' | 'need-sponsor' | 'just-join' | '',
    budget: '',
    interests: [] as string[],
    bio: '',
    groupSize: '2-4',
    accommodation: 'flexible',
  });

  if (!isOpen) return null;

  const allInterests = ['Trekking', 'Photography', 'Food', 'Culture', 'Nightlife', 'Yoga', 'Wildlife', 'Water Sports', 'Camping', 'Shopping', 'History', 'Art'];

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? 'bg-gradient-to-r from-brand-500 to-romantic-500' : 'bg-gray-200'}`} />
          ))}
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-1">
          {step === 1 && 'Where shall we wander?'}
          {step === 2 && 'What\'s your travel style?'}
          {step === 3 && 'Tell fellow travelers about you'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {step === 1 && 'Pick your destination and dates'}
          {step === 2 && 'Help us match you with the right companions'}
          {step === 3 && 'A little goes a long way in building trust'}
        </p>

        {/* Step 1: Destination & Dates */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 focus:border-brand-400 outline-none transition-all text-sm"
              >
                <option value="">Choose a destination</option>
                {CITY_SLUGS.map((slug) => (
                  <option key={slug} value={slug}>{CITIES[slug].name} — {CITIES[slug].tagline}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none transition-all text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none transition-all text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Group Size</label>
              <div className="grid grid-cols-3 gap-2">
                {['2', '2-4', '4+'].map((size) => (
                  <button key={size} onClick={() => setFormData({ ...formData, groupSize: size })}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${formData.groupSize === size ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-brand-200'}`}>
                    {size} people
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Travel Style */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">How do you want to travel?</label>
              <div className="space-y-2">
                {([
                  { value: 'sponsor' as const, emoji: '💚', title: "I'll Sponsor the Trip", desc: 'I\'m happy to cover costs for a great companion' },
                  { value: 'need-sponsor' as const, emoji: '🙏', title: 'Looking for a Sponsor', desc: 'I bring great vibes, just need financial support' },
                  { value: 'just-join' as const, emoji: '🤝', title: 'Let\'s Split & Share', desc: 'Equal partners, split costs, share the journey' },
                ]).map((option) => (
                  <button key={option.value}
                    onClick={() => setFormData({ ...formData, sponsorType: option.value })}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${formData.sponsorType === option.value ? 'border-brand-400 bg-brand-50 shadow-sm' : 'border-gray-200 hover:border-brand-200'}`}>
                    <span className="text-2xl mt-0.5">{option.emoji}</span>
                    <div>
                      <div className="font-medium text-gray-900">{option.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{option.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Your interests (pick at least 3)</label>
              <div className="flex flex-wrap gap-2">
                {allInterests.map((interest) => (
                  <button key={interest} onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${formData.interests.includes(interest) ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'}`}>
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: About You */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell others about yourself</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="What makes you a great travel companion? Share your travel stories, personality, or what you hope to experience..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none transition-all text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Accommodation preference</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'hostel', label: 'Hostel/Budget' },
                  { value: 'hotel', label: 'Hotel' },
                  { value: 'homestay', label: 'Homestay' },
                  { value: 'flexible', label: 'Flexible' },
                ].map((opt) => (
                  <button key={opt.value} onClick={() => setFormData({ ...formData, accommodation: opt.value })}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${formData.accommodation === opt.value ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-brand-200'}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {submitError && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {submitError}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">
              Back
            </button>
          )}
          <button
            disabled={submitting}
            onClick={async () => {
              if (step < 3) {
                setStep(step + 1);
                return;
              }
              if (!session) {
                router.push('/auth/signin');
                onClose();
                return;
              }
              setSubmitting(true);
              setSubmitError('');
              try {
                const res = await fetch('/api/trips', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    destination: formData.destination,
                    title: `Trip to ${CITIES[formData.destination]?.name || formData.destination}`,
                    description: formData.bio,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    sponsorType: formData.sponsorType,
                    groupSize: formData.groupSize,
                    accommodation: formData.accommodation,
                    interests: formData.interests,
                  }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to post trip');
                onClose();
                router.refresh();
              } catch (err) {
                setSubmitError((err as Error).message);
              } finally {
                setSubmitting(false);
              }
            }}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 hover:shadow-lg hover:shadow-romantic-200 transition-all disabled:opacity-50"
          >
            {step < 3 ? 'Continue' : submitting ? 'Posting...' : session ? 'Post My Trip' : 'Sign In to Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
