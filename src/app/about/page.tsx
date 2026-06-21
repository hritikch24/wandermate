import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About Luventra — India\'s Travel Partner Community',
  description: 'Luventra connects solo travelers across India with verified companions. Learn about our mission to make travel safer, more affordable, and more social.',
  keywords: ['about luventra', 'travel partner app india', 'travel community india', 'luventra team'],
};

const STATS = [
  { num: '10,000+', label: 'Travelers Connected' },
  { num: '29+', label: 'States Covered' },
  { num: '500+', label: 'Trips Planned Monthly' },
  { num: '4.8★', label: 'Community Rating' },
];

const VALUES = [
  { title: 'Safety First', desc: 'Every profile is verified. Our Aadhaar verification, review system, and community guidelines keep everyone safe.', icon: '🛡️' },
  { title: 'Inclusive Travel', desc: 'Whether you can sponsor a trip or need sponsorship — everyone deserves to explore. Our matching system connects complementary travelers.', icon: '🌏' },
  { title: 'Authentic Experiences', desc: 'Our local guide network and community-written content helps you go beyond tourist traps to find real India.', icon: '🎭' },
  { title: 'Community Driven', desc: 'Built by travelers, for travelers. Every feature comes from real feedback by our community.', icon: '❤️' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen animated-bg pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Travel Should Never Be Lonely</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Luventra was born from a simple truth: the best travel memories are made with the right people.
              We&apos;re building India&apos;s most trusted platform to connect solo travelers with verified companions
              who share their vibe, budget, and sense of adventure.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {STATS.map(s => (
              <div key={s.label} className="glass-card rounded-2xl p-6 text-center hover-lift">
                <p className="text-3xl font-bold gradient-text mb-1">{s.num}</p>
                <p className="text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Our Story */}
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-20">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
              <p>India has 1.4 billion people, yet millions of solo travelers struggle to find companions for their next adventure. Some want to explore Ladakh but can&apos;t afford it alone. Others have the budget but not the company. Many simply want someone to share chai with at a mountain viewpoint.</p>
              <p>Luventra bridges this gap. We created a platform where intent meets opportunity — whether you want to sponsor someone&apos;s dream trip, need financial support for your own, or simply want great company on the road.</p>
              <p>Our verification system, community reviews, and group planning tools make it safe and simple to go from strangers on the internet to travel companions sharing unforgettable experiences across India&apos;s incredible landscape.</p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">What We Stand For</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {VALUES.map(v => (
                <div key={v.title} className="glass-card rounded-2xl p-6 hover-lift">
                  <span className="text-3xl mb-3 block">{v.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center glass-card rounded-3xl p-12 neon-glow">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-4">Join the Movement</h2>
            <p className="text-gray-600 mb-8">Be part of India&apos;s fastest-growing travel community.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-romantic-500 text-white font-semibold hover:shadow-xl transition-all">
                Start Traveling Together
              </Link>
              <Link href="/how-it-works" className="px-8 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-white/80 transition-all">
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
