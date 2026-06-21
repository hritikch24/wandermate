'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { CITIES } from '@/data/cities';
import { getStateBySlug } from '@/data/states';

export default function Navbar({ currentCity }: { currentCity?: string }) {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const currentUserId = (session?.user as { id?: string })?.id;

  // Poll for pending notifications every 30s when logged in
  useEffect(() => {
    if (!session) return;
    const fetchCount = () => {
      fetch('/api/notifications')
        .then(r => r.json())
        .then(data => {
          setPendingCount(data.total || 0);
        })
        .catch(() => {});
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, [session]);

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
              <span className="gradient-text">Luv</span>
              <span className="text-gray-800">entra</span>
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
                        <div className="text-xs text-gray-500">{(city.state && getStateBySlug(city.state)?.name) || city.country}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/trips" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-all">
              Browse Trips
            </Link>
            <Link href="/how-it-works" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-all">
              How It Works
            </Link>
            <Link href="/blog" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-all">
              Blog
            </Link>
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link href="/chat" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors" title="Messages">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </Link>
                <Link href="/dashboard" className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
                  <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Dashboard
                  {pendingCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                      {pendingCount}
                    </span>
                  )}
                </Link>
                <div className="relative" onMouseEnter={() => setProfileOpen(true)} onMouseLeave={() => setProfileOpen(false)}>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-brand-50 transition-colors text-sm font-medium text-gray-700">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-romantic-400 flex items-center justify-center text-white text-xs font-bold">
                      {session.user?.name?.charAt(0) || '?'}
                    </div>
                    {session.user?.name?.split(' ')[0]}
                    <svg className={`w-3 h-3 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {profileOpen && (
                    <div className="absolute top-full right-0 mt-1 w-52 glass-card rounded-xl p-2 shadow-xl border border-white/30 animate-fade-in z-50">
                      {currentUserId && (
                        <Link href={`/profile/${currentUserId}`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          My Profile
                        </Link>
                      )}
                      <Link href="/profile/edit" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Edit Profile
                      </Link>
                      <Link href="/profile/verify" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600">
                        <svg className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Get Verified
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button onClick={() => signOut()}
                        className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
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
          <div className="md:hidden flex items-center gap-2">
            {session && pendingCount > 0 && (
              <Link href="/dashboard" className="relative p-2">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold animate-pulse">
                  {pendingCount}
                </span>
              </Link>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-brand-50 transition-colors">
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
            <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-brand-50">How It Works</Link>
            <Link href="/#travelers" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-brand-50">Find Partners</Link>
            <Link href="/#safety" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-brand-50">Safety</Link>
            <hr className="my-2 border-gray-200" />
            {session ? (
              <>
                {currentUserId && (
                  <Link href={`/profile/${currentUserId}`} onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-brand-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    My Profile
                  </Link>
                )}
                <Link href="/profile/edit" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-brand-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Edit Profile
                </Link>
                <Link href="/profile/verify" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-brand-50">
                  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Get Verified
                </Link>
                <hr className="my-1 border-gray-200" />
                <Link href="/chat" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-brand-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  Messages
                </Link>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-600 border border-brand-200 hover:bg-brand-50">
                  <span>Dashboard</span>
                  {pendingCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">{pendingCount} new</span>
                  )}
                </Link>
                <button onClick={() => signOut()} className="w-full mt-1 py-2.5 text-sm font-semibold text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50">
                  Sign Out ({session.user?.name?.split(' ')[0]})
                </button>
              </>
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
