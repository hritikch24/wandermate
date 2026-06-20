'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

interface UserProfile {
  id: string;
  name: string;
  avatar: string | null;
  bio: string | null;
  age: number | null;
  travelStyle: string | null;
  languages: string[];
  interests: string[];
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  verified: boolean;
  aadhaarVerified: boolean;
  rating: number;
  tripsCount: number;
  createdAt: string;
  isConnected: boolean;
  email?: string;
  phone?: string;
  trips: { id: string; title: string; destination: string; startDate: string; endDate: string; sponsorType: string }[];
  reviews: { id: string; rating: number; comment: string; createdAt: string; author: { id: string; name: string } }[];
}

const AVATAR_COLORS = [
  'from-brand-400 to-romantic-400',
  'from-romantic-400 to-purple-400',
  'from-forest-400 to-teal-400',
  'from-warm-400 to-brand-400',
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isOwnProfile = session?.user && (session.user as { id: string }).id === userId;

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); return; }
        setProfile(data);
      })
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (error || !profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">{error || 'Profile not found'}</p>
            <Link href="/" className="text-brand-600 font-medium hover:underline">Go Home</Link>
          </div>
        </div>
      </>
    );
  }

  const initials = profile.name.split(' ').map(n => n[0]).join('');
  const memberSince = new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const colorClass = AVATAR_COLORS[profile.name.length % AVATAR_COLORS.length];

  const socialLinks = [
    profile.instagram && { label: 'Instagram', url: `https://instagram.com/${profile.instagram}`, handle: `@${profile.instagram}`, gradient: 'from-purple-500 via-pink-500 to-orange-500', abbr: 'IG' },
    profile.facebook && { label: 'Facebook', url: profile.facebook.startsWith('http') ? profile.facebook : `https://facebook.com/${profile.facebook}`, handle: profile.facebook, gradient: 'from-blue-600 to-blue-600', abbr: 'FB' },
    profile.twitter && { label: 'X / Twitter', url: `https://x.com/${profile.twitter}`, handle: `@${profile.twitter}`, gradient: 'from-gray-800 to-black', abbr: 'X' },
    profile.linkedin && { label: 'LinkedIn', url: profile.linkedin.startsWith('http') ? profile.linkedin : `https://linkedin.com/in/${profile.linkedin}`, handle: 'LinkedIn', gradient: 'from-blue-700 to-blue-700', abbr: 'IN' },
  ].filter(Boolean) as { label: string; url: string; handle: string; gradient: string; abbr: string }[];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="glass-card rounded-2xl p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-2xl object-cover shrink-0 border-4 border-white shadow-lg" />
              ) : (
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-3xl font-bold shrink-0`}>
                  {initials}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                  {profile.verified && (
                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                  {profile.age && <span>{profile.age} years old</span>}
                  {profile.travelStyle && <span className="px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium">{profile.travelStyle}</span>}
                  <span>Member since {memberSince}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="font-medium">{profile.rating}</span>
                  </span>
                  <span>{profile.tripsCount} trips completed</span>
                </div>
                {profile.bio && <p className="text-gray-600 mt-3 leading-relaxed">{profile.bio}</p>}
                {isOwnProfile && (
                  <Link href="/profile/edit" className="inline-block mt-3 px-4 py-2 rounded-xl text-sm font-medium text-brand-600 border border-brand-200 hover:bg-brand-50 transition-all">
                    Edit Profile
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Connected: Show contact details */}
          {profile.isConnected && (
            <div className="glass-card rounded-2xl p-6 mb-6 border-2 border-green-200 bg-green-50/50">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-semibold text-green-700">You&apos;re connected!</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-brand-300 transition-all">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <div>
                      <div className="text-xs text-gray-400">Email</div>
                      <div className="text-sm font-medium text-gray-700">{profile.email}</div>
                    </div>
                  </a>
                )}
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-brand-300 transition-all">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <div>
                      <div className="text-xs text-gray-400">Phone</div>
                      <div className="text-sm font-medium text-gray-700">{profile.phone}</div>
                    </div>
                  </a>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                <Link href={`/chat/${profile.id}`}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-romantic-500 text-center hover:shadow-lg transition-all">
                  Chat Now
                </Link>
              </div>
            </div>
          )}

          {/* Social Media */}
          {socialLinks.length > 0 && (
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Social Profiles</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {socialLinks.map(link => (
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-sm transition-all">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${link.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                      {link.abbr}
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">{link.label}</div>
                      <div className="text-sm font-medium text-gray-700">{link.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Languages & Interests */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {profile.languages.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-semibold text-gray-900 mb-3">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map(lang => (
                    <span key={lang} className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">{lang}</span>
                  ))}
                </div>
              </div>
            )}
            {profile.interests.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-semibold text-gray-900 mb-3">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map(interest => (
                    <span key={interest} className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100">{interest}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Trips */}
          {profile.trips.length > 0 && (
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Active Trips</h2>
              <div className="space-y-3">
                {profile.trips.map(trip => (
                  <div key={trip.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{trip.title}</div>
                      <div className="text-xs text-gray-500">{trip.destination} · {new Date(trip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – {new Date(trip.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      trip.sponsorType === 'sponsor' ? 'bg-green-100 text-green-700' :
                      trip.sponsorType === 'need-sponsor' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {trip.sponsorType === 'sponsor' ? "Will Sponsor" : trip.sponsorType === 'need-sponsor' ? "Need Sponsor" : "Split & Share"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {profile.reviews.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Reviews ({profile.reviews.length})</h2>
              <div className="space-y-4">
                {profile.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{review.author.name}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
