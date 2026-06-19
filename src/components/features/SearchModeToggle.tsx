'use client';

import { SearchMode } from '@/data/cities';

export default function SearchModeToggle({
  mode,
  onChange,
}: {
  mode: SearchMode;
  onChange: (mode: SearchMode) => void;
}) {
  return (
    <div className="flex items-center justify-center mb-10">
      <div className="glass-card rounded-2xl p-1.5 inline-flex shadow-lg border border-white/40">
        <button
          onClick={() => onChange('partner')}
          className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
            mode === 'partner'
              ? 'bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Find Travel Partner
        </button>
        <button
          onClick={() => onChange('guide')}
          className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
            mode === 'guide'
              ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Find Travel Guide
        </button>
      </div>
    </div>
  );
}
