import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'How It Works — Find Travel Partners on Luventra',
  description: 'Learn how Luventra helps you find verified travel partners, form groups, plan trips together, and explore India safely with like-minded travelers.',
  keywords: ['how to find travel partner', 'travel companion app india', 'group travel planning', 'trip partner finder how it works'],
};

const STEPS = [
  { num: '01', title: 'Create Your Profile', desc: 'Sign up free, add your travel style, interests, languages, and verify your identity with Aadhaar for a blue tick.', icon: '👤', color: 'from-blue-400 to-indigo-500' },
  { num: '02', title: 'Post or Browse Trips', desc: 'Create a trip with your destination, dates, and budget — or browse hundreds of open trips from fellow travelers.', icon: '🗺️', color: 'from-brand-400 to-romantic-500' },
  { num: '03', title: 'Send Join Requests', desc: 'Found a trip you love? Send a join request with a personal message. Trip owners review your profile before accepting.', icon: '🤝', color: 'from-green-400 to-emerald-500' },
  { num: '04', title: 'Form Your Group', desc: 'Once accepted, you automatically join the trip group. See all members, their profiles, and connect instantly.', icon: '👥', color: 'from-purple-400 to-violet-500' },
  { num: '05', title: 'Plan Together via Group Chat', desc: 'Use the built-in group chat to plan itineraries, split costs, decide accommodations, and coordinate logistics.', icon: '💬', color: 'from-pink-400 to-rose-500' },
  { num: '06', title: 'Travel & Review', desc: 'Hit the road together! After your trip, leave reviews to build trust in the community for future travelers.', icon: '✈️', color: 'from-amber-400 to-orange-500' },
];

const FEATURES = [
  { title: 'Verified Profiles', desc: 'Aadhaar-verified travelers with blue ticks for trust', icon: '✓' },
  { title: 'Sponsor System', desc: 'Will Sponsor, Need Sponsor, or Just Join — find your match', icon: '💰' },
  { title: 'AI Travel Assistant', desc: 'Get instant recommendations from our Groq-powered chatbot', icon: '🤖' },
  { title: 'Local Guides', desc: 'Book verified local guides for authentic experiences', icon: '🧭' },
  { title: 'Safety First', desc: 'Report system, blocks, and community guidelines', icon: '🛡️' },
  { title: 'All India Coverage', desc: '29+ states, 50+ cities, 100+ destinations', icon: '🇮🇳' },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen animated-bg pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/60 text-brand-700 text-sm font-medium mb-6 border border-brand-200/40">
              Simple · Safe · Social
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">How Luventra Works</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From solo traveler to group adventurer in 6 simple steps. Find your tribe, plan together, explore India.
            </p>
          </div>

          {/* Steps */}
          <div className="relative mb-24">
            {/* Connection line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-300 via-romantic-300 to-warm-300 hidden md:block" />

            <div className="space-y-12 md:space-y-16">
              {STEPS.map((step, i) => (
                <div key={step.num} className={`flex flex-col md:flex-row items-start gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                    <div className="glass-card rounded-2xl p-6 hover-lift">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{step.icon}</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {step.num}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center shrink-0">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {step.num}
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>

          {/* Features grid */}
          <div className="mb-20">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">Why Travelers Love Luventra</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map(f => (
                <div key={f.title} className="glass-card rounded-2xl p-6 hover-lift">
                  <span className="text-2xl mb-3 block">{f.icon}</span>
                  <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card rounded-3xl p-12 text-center neon-glow">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-4">Ready to Find Your Travel Tribe?</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">Join thousands of Indian travelers who have found their perfect companions on Luventra.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all">
                Join Free — Takes 30 Seconds
              </Link>
              <Link href="/trips" className="px-8 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-white/80 transition-all">
                Browse Open Trips
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
