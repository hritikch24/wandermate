'use client';

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
  const sponsor = SPONSOR_LABELS[traveler.sponsorType];
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
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

      {/* Hover CTA */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 hover:shadow-lg transition-all">
          Connect & Plan Together
        </button>
      </div>
    </div>
  );
}
