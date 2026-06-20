'use client';

import Link from 'next/link';
import { CityData } from '@/data/cities';
import { getStateBySlug } from '@/data/states';

const VIBE_COLORS: Record<string, string> = {
  adventure: 'from-orange-500 to-red-500',
  spiritual: 'from-purple-500 to-indigo-500',
  romantic: 'from-pink-500 to-rose-500',
  party: 'from-yellow-500 to-orange-500',
  serene: 'from-emerald-500 to-teal-500',
  cultural: 'from-blue-500 to-indigo-500',
};

export default function CityCard({ city }: { city: CityData }) {
  const vibeColor = VIBE_COLORS[city.vibe] || 'from-brand-500 to-romantic-500';
  const stateName = (city.state && getStateBySlug(city.state)?.name) || city.country;

  return (
    <Link href={`/city/${city.slug}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden trip-card h-80">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${city.heroImage})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Vibe Badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${vibeColor} shadow-lg`}>
            {city.vibe.charAt(0).toUpperCase() + city.vibe.slice(1)}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-white mb-1">
            {city.name}
          </h3>
          <p style={{ fontFamily: 'var(--font-script)' }} className="text-lg text-white/80 mb-3">
            {city.tagline}
          </p>
          <div className="flex items-center gap-4 text-xs text-white/70">
            <span>{stateName}</span>
            <span>·</span>
            <span>{city.avgBudget}</span>
            <span>·</span>
            <span>{city.bestTime.split(',')[0]}</span>
          </div>

          {/* Hover: View button */}
          <div className="mt-3 overflow-hidden max-h-0 group-hover:max-h-12 transition-all duration-300">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors">
              Explore {city.name}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
