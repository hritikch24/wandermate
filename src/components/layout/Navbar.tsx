'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { CITIES } from '@/data/cities';

export default function Navbar({ currentCity }: { currentCity?: string }) {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 via-romantic-400 to-warm-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <path d="M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold tracking-tight">
              <span className="gradient-text">Wander</span>
              <span className="text-gray-800">Mate</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <div className="relative" onMouseEnter={() => setCitiesOpen(true)} onMouseLeave={() => setCitiesOpen(false)}>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-all flex items-center gap-1">
                Destinations
                <svg className={`w-4 h-4 transition-transform ${citiesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {citiesOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 glass-card rounded-xl p-2 shadow-xl border border-white/30 animate-fade-in">
                  {Object.values(CITIES).map((city) => (
                    <Link
                      key={city.slug}
                      href={`/city/${city.slug}`}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        currentCity === city.slug ? 'bg-brand-100 text-brand-700 font-medium' : 'text-gray-700 hover:bg-brand-50 hover:text-brand-600'
                      }`}
                    >
                      <span className="text-lg">{getVibeEmoji(city.vibe)}</span>
                      <div>
                        <div className="font-medium">{city.name}</div>
                        <div className="text-xs text-gray-500">{city.state || city.country}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/#how-it-works" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-all">
              How It Works
            </Link>
            <Link href="/#travelers" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-all">
              Find Partners
            </Link>
            <Link href="/#safety" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-all">
              Safety
            </Link>
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <span className="text-sm text-gray-600">Hi, {session.user?.name?.split(' ')[0]}</span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/register" className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 hover:shadow-lg hover:shadow-romantic-200 hover:scale-105 transition-all">
                  Join Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-brand-50 transition-colors">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-card border-t border-white/20 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Destinations</p>
            {Object.values(CITIES).map((city) => (
              <Link key={city.slug} href={`/city/${city.slug}`} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-brand-50">
                <span>{getVibeEmoji(city.vibe)}</span>
                <span>{city.name}</span>
              </Link>
            ))}
            <hr className="my-2 border-gray-200" />
            <Link href="/#how-it-works" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-brand-50">How It Works</Link>
            <Link href="/#travelers" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-brand-50">Find Partners</Link>
            <Link href="/#safety" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-brand-50">Safety</Link>
            <hr className="my-2 border-gray-200" />
            {session ? (
              <button onClick={() => signOut()} className="w-full py-2.5 text-sm font-semibold text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50">
                Sign Out ({session.user?.name?.split(' ')[0]})
              </button>
            ) : (
              <Link href="/auth/register" onClick={() => setMenuOpen(false)}
                className="block w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 text-center">
                Join Free
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function getVibeEmoji(vibe: string): string {
  const map: Record<string, string> = {
    adventure: '\u{1F3D4}',
    spiritual: '\u{1F9D8}',
    romantic: '\u{1F339}',
    party: '\u{1F389}',
    serene: '\u{1F33F}',
    cultural: '\u{1F3DB}',
  };
  return map[vibe] || '\u{2708}';
}
