import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Safety Guidelines — Travel Safe with Luventra',
  description: 'Safety tips for meeting travel partners from Luventra. Learn how to verify profiles, meet safely, and what to do in emergencies while traveling in India.',
  keywords: ['travel safety india', 'safe travel partner', 'meeting strangers safely', 'travel safety tips india', 'solo travel safety'],
};

const BEFORE_TIPS = [
  'Always video call before meeting in person',
  'Check their Aadhaar verification (blue tick) and reviews from other travelers',
  'Share your trip details with a trusted friend or family member',
  'Meet first in a public place — coffee shop, restaurant, or busy tourist area',
  'Google their name and social media profiles for consistency',
  'Never share financial details, passwords, or sensitive documents before meeting',
];

const DURING_TIPS = [
  'Share your live location with family/friends for the first few days',
  'Keep your important documents (passport, Aadhaar) in separate locations',
  'Set up regular check-in times with someone back home',
  'Trust your instincts — if something feels off, remove yourself from the situation',
  'Keep emergency cash in a separate place from your main wallet',
  'Download offline maps and save emergency numbers for the region you\'re in',
];

const EMERGENCY_CONTACTS = [
  { name: 'Police Emergency', number: '100' },
  { name: 'Women Helpline', number: '1091' },
  { name: 'Tourist Police', number: '1363' },
  { name: 'Ambulance', number: '108' },
  { name: 'Luventra Support', number: '+91 8859820935' },
];

export default function SafetyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen animated-bg pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/60 text-green-700 text-sm font-medium mb-6 border border-green-200/40">
              🛡️ Your safety is our #1 priority
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Safety Guidelines</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meeting new travel partners should be exciting, not stressful. Follow these guidelines to ensure safe and enjoyable experiences.
            </p>
          </div>

          {/* Before Meeting */}
          <section className="glass-card rounded-2xl p-8 mb-8">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-lg">1</span>
              Before You Meet
            </h2>
            <ul className="space-y-3">
              {BEFORE_TIPS.map(tip => (
                <li key={tip} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span className="text-gray-700 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* During Trip */}
          <section className="glass-card rounded-2xl p-8 mb-8">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-lg">2</span>
              During Your Trip
            </h2>
            <ul className="space-y-3">
              {DURING_TIPS.map(tip => (
                <li key={tip} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span className="text-gray-700 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Verification System */}
          <section className="glass-card rounded-2xl p-8 mb-8">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white text-lg">3</span>
              Our Verification System
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <h4 className="font-semibold text-gray-900 text-sm">Blue Tick (Aadhaar Verified)</h4>
                </div>
                <p className="text-xs text-gray-600">Identity confirmed via Aadhaar OTP. This means the person is who they say they are.</p>
              </div>
              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">⭐</span>
                  <h4 className="font-semibold text-gray-900 text-sm">Community Reviews</h4>
                </div>
                <p className="text-xs text-gray-600">Read reviews from other travelers who have traveled with this person. Higher ratings = more trustworthy.</p>
              </div>
              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-500">📱</span>
                  <h4 className="font-semibold text-gray-900 text-sm">Phone Verified</h4>
                </div>
                <p className="text-xs text-gray-600">Phone number verified via OTP during registration. Ensures a real contact exists.</p>
              </div>
              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-500">🚫</span>
                  <h4 className="font-semibold text-gray-900 text-sm">Report & Block</h4>
                </div>
                <p className="text-xs text-gray-600">Report suspicious behavior instantly. Blocked users cannot contact you or see your trips.</p>
              </div>
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="glass-card rounded-2xl p-8 mb-8">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-white text-lg">!</span>
              Emergency Contacts
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {EMERGENCY_CONTACTS.map(c => (
                <a key={c.name} href={`tel:${c.number}`} className="flex items-center justify-between p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all">
                  <span className="text-sm font-medium text-gray-900">{c.name}</span>
                  <span className="text-sm font-bold text-brand-600">{c.number}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Report CTA */}
          <div className="text-center glass-card rounded-2xl p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Something Doesn&apos;t Feel Right?</h3>
            <p className="text-sm text-gray-600 mb-4">If you encounter suspicious behavior, harassment, or safety concerns — report it immediately. We review all reports within 24 hours.</p>
            <Link href="/contact" className="inline-flex px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all">
              Report a Concern
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
