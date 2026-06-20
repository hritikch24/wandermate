import { Metadata } from 'next';
import Link from 'next/link';
import { STATES, STATE_SLUGS } from '@/data/states';
import { TRAVEL_TOPICS, TOPIC_SLUGS } from '@/data/travelTopics';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const title = 'India Travel Guide 2025/2026 — Best Destinations, Tips & Itineraries | Luventra';
  const description = 'The complete India travel guide for 2025/2026 — best destinations by month, budget tips, solo travel advice, safety guidance, visa info, transportation, food, festivals, and packing checklists. Plan your India trip and find verified travel partners on Luventra.';

  return {
    title,
    description,
    alternates: { canonical: 'https://luventra.co/travel-guide' },
    openGraph: {
      title,
      description,
      url: 'https://luventra.co/travel-guide',
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const MONTH_GROUPS: Array<{ month: string; note: string }> = [
  { month: 'January', note: 'Peak winter — ideal for Rajasthan, Gujarat, South India, and wildlife safaris.' },
  { month: 'March', note: 'Pleasant shoulder season for North India before the heat sets in; great for hill stations starting to bloom.' },
  { month: 'May', note: 'Time to head for the hills — Himachal, Uttarakhand, and Ladakh (opening up) are at their best.' },
  { month: 'July', note: 'Monsoon season — Meghalaya, Goa\'s quiet off-season, and Kerala\'s Ayurveda season shine.' },
  { month: 'October', note: 'One of the best all-round months — post-monsoon clarity across most of the country.' },
  { month: 'December', note: 'Festive peak season — Goa, Rajasthan\'s desert camps, and Kerala backwaters are in full swing.' },
];

function statesForMonth(month: string): typeof STATES[string][] {
  const monthMap: Record<string, string[]> = {
    January: ['rajasthan', 'gujarat', 'tamil-nadu', 'madhya-pradesh', 'goa'],
    March: ['uttarakhand', 'himachal-pradesh', 'west-bengal', 'sikkim'],
    May: ['himachal-pradesh', 'uttarakhand', 'ladakh', 'jammu-and-kashmir'],
    July: ['meghalaya', 'goa', 'kerala', 'karnataka'],
    October: ['rajasthan', 'kerala', 'uttar-pradesh', 'maharashtra', 'karnataka'],
    December: ['goa', 'rajasthan', 'kerala', 'andaman-and-nicobar-islands'],
  };
  return (monthMap[month] || []).map((s) => STATES[s]).filter(Boolean);
}

const PACKING_CHECKLISTS: Array<{ title: string; items: string[] }> = [
  {
    title: 'Universal Essentials',
    items: ['Passport/ID + printed copies', 'Power bank and universal adapter', 'Reusable water bottle', 'Basic first-aid kit with rehydration salts', 'Sunscreen, sunglasses, hat', 'Comfortable walking shoes'],
  },
  {
    title: 'Desert & Plains (Rajasthan, Gujarat)',
    items: ['Light cotton layers for the day', 'A warm layer for surprisingly cold desert nights', 'Dust-resistant scarf or bandana', 'Strong sunscreen'],
  },
  {
    title: 'Himalayan & Hill Regions',
    items: ['Thermal base layers', 'Insulated jacket', 'Waterproof trekking shoes', 'Lip balm and moisturizer for dry mountain air', 'Altitude sickness medication (consult a doctor)'],
  },
  {
    title: 'Monsoon Travel',
    items: ['Rain jacket or poncho', 'Waterproof bag for electronics', 'Quick-dry clothing', 'Grippy footwear for wet surfaces'],
  },
];

export default function TravelGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'India Travel Guide 2025/2026 — Best Destinations, Tips & Itineraries',
    description: 'The complete India travel guide covering best destinations by month, budget tips, solo travel advice, safety, visas, transportation, food, festivals, and packing.',
    articleSection: ['Best Destinations by Month', 'Budget Travel Tips', 'Solo Travel Guide', 'Safety Tips', 'Visa & Entry', 'Transportation Guide', 'Food Guide', 'Festival Calendar', 'Packing Checklists'],
    author: { '@type': 'Organization', name: 'Luventra' },
    publisher: { '@type': 'Organization', name: 'Luventra' },
    datePublished: '2025-01-01',
    dateModified: '2026-06-01',
    url: 'https://luventra.co/travel-guide',
    inLanguage: 'en-IN',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://luventra.co' },
      { '@type': 'ListItem', position: 2, name: 'Travel Guide', item: 'https://luventra.co/travel-guide' },
    ],
  };

  const festivalSpread = STATE_SLUGS.slice(0, 12)
    .map((slug) => STATES[slug])
    .filter((s) => s.festivals.length > 0)
    .slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-romantic-200/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800">Travel Guide</span>
          </nav>
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            India Travel Guide <span className="gradient-text">2025/2026</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to plan a trip across India — best destinations by month, honest budget numbers, solo travel
            advice, safety tips, visa basics, transportation know-how, food guidance, festival timing, and packing checklists.
            Then find a verified travel partner on Luventra to share the journey.
          </p>
        </div>
      </section>

      {/* ============ BEST DESTINATIONS BY MONTH ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Best Destinations by Month
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MONTH_GROUPS.map((mg) => (
              <div key={mg.month} className="glass-card rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{mg.month}</h3>
                <p className="text-sm text-gray-600 mb-4">{mg.note}</p>
                <div className="flex flex-wrap gap-2">
                  {statesForMonth(mg.month).map((s) => (
                    <Link key={s.slug} href={`/state/${s.slug}`} className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-medium hover:bg-brand-100 transition-colors">
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BUDGET TRAVEL TIPS ============ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Budget Travel Tips
          </h2>
          <div className="glass-card rounded-2xl p-8 space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>India is one of the most affordable countries in the world to travel through. A frugal traveler can manage on ₹800–1,500/day covering hostel dorms, local food, and public transport, while a mid-range trip with 3-star hotels and private cabs runs ₹2,500–5,000/day. Trains remain the backbone of budget travel — sleeper class fares for a 500km journey often cost under ₹300, and booking through the IRCTC app a few days ahead avoids tatkal premiums.</p>
            <p>Street food and local thali restaurants offer the best value and often the most authentic flavors — a filling vegetarian thali typically costs ₹80–150. Traveling during shoulder season (just before or after peak months) can cut accommodation rates by 20–40%. And one of the most effective budget levers is splitting per-room and per-vehicle costs with a travel partner — a private cab or houseboat priced per vehicle costs half as much per person when shared.</p>
          </div>
        </div>
      </section>

      {/* ============ SOLO TRAVEL GUIDE ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Solo Travel Guide
          </h2>
          <div className="glass-card rounded-2xl p-8 space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>India is one of the most rewarding countries for solo travel thanks to its dense network of trains, hostels, and a built-in community of fellow independent travelers. Rishikesh, Goa, and Jaipur are ideal first stops, with strong hostel culture that makes it easy to meet people even if you arrive completely alone. Most solo trips through the well-established tourist circuit go smoothly with basic precautions — sharing your live location with someone you trust, using verified transport, and choosing well-reviewed accommodation.</p>
            <p>Going solo does not mean traveling alone the entire time. Many travelers pair up for specific legs of a journey — splitting a private cab, sharing a houseboat, or simply wanting company for an overnight train. <Link href="/travel-guide/solo-travel-india" className="text-brand-600 font-medium hover:underline">Read our full Solo Travel in India guide</Link> for destination-specific advice, or browse verified travelers on Luventra heading to the same place as you.</p>
          </div>
        </div>
      </section>

      {/* ============ SAFETY TIPS ============ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Safety Tips
          </h2>
          <div className="glass-card rounded-2xl p-8 space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>Save India&apos;s national emergency number (112), the Women Helpline (1091), and the 24/7 multilingual Tourist Helpline (1363) before you depart. Share your live location and itinerary with someone you trust, use registered taxi apps or pre-paid counters rather than unmarked vehicles at night, and choose accommodation with strong, recent reviews. Avoid displaying expensive jewelry or large amounts of cash in crowded markets, and dress modestly at religious sites — covering shoulders and knees is expected almost everywhere.</p>
            <p>Connecting with a verified travel partner through Luventra before a trip can add an extra layer of comfort, particularly for solo women travelers or anyone tackling a remote or high-altitude route for the first time.</p>
          </div>
        </div>
      </section>

      {/* ============ VISA & ENTRY ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Visa & Entry (For Foreign Tourists)
          </h2>
          <div className="glass-card rounded-2xl p-8 space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>Most international travelers need a visa to enter India, and the e-Visa is the simplest route for tourism, with options typically including 30-day, 1-year, and 5-year validity depending on nationality. Applications are submitted online ahead of travel and are usually processed within a few business days — applying at least a week before departure is a safe buffer. Carry both a digital and a printed copy of your e-Visa approval, since some airports still expect a paper copy at immigration.</p>
            <p className="text-xs text-gray-500 italic">This is general, factual information only and not legal or immigration advice. Visa rules, eligible countries, and validity periods change periodically — always confirm current requirements on the official Indian government e-Visa portal before booking travel.</p>
          </div>
        </div>
      </section>

      {/* ============ TRANSPORTATION GUIDE ============ */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Transportation Guide
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Trains & IRCTC</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Indian Railways covers over 7,300 stations and is the backbone of long-distance budget travel. Book through the official IRCTC app or website — sleeper class for a 500km trip often costs under ₹300, while AC 3-tier rarely exceeds ₹1,200. Book a few days ahead for popular routes; last-minute tatkal tickets carry a premium and sell out fast.</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Domestic Flights</h3>
              <p className="text-sm text-gray-600 leading-relaxed">India has one of the world&apos;s fastest-growing domestic aviation markets, with frequent budget carriers connecting all major cities. Booking 3-4 weeks ahead typically secures the best fares, and flying is often the most practical option for covering long north-south or east-west distances within limited time.</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Buses</h3>
              <p className="text-sm text-gray-600 leading-relaxed">State transport buses and private overnight sleeper buses fill the gaps where trains don&apos;t reach. Overnight sleeper buses (₹600–1,500 depending on distance) double as accommodation for a night, which is a popular budget-travel trick.</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Intercity Cabs</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Private cabs are the most flexible way to cover shorter intercity distances or reach remote hill and desert towns not well served by rail. Splitting the cost with a travel partner found through Luventra cuts the per-person price significantly, since cabs are priced per vehicle rather than per passenger.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOD GUIDE ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Food Guide
          </h2>
          <div className="glass-card rounded-2xl p-8 space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>India&apos;s regional cuisines vary as dramatically as its geography — Punjab&apos;s tandoor dishes, Lucknow&apos;s Awadhi kebabs, Kerala&apos;s coconut-based curries, Bengal&apos;s fish and milk sweets, and Hyderabad&apos;s dum biryani are all distinct culinary traditions worth seeking out by region rather than expecting one uniform &quot;Indian food.&quot; Street food is both the cheapest and often most authentic way to eat — a filling thali costs ₹80–150, and street snacks like vada pav or chaat run ₹20–60.</p>
            <p>Choose busy stalls with visible local queues for the freshest food, stick to fully cooked hot dishes, and use bottled or filtered water as a safe default. See our dedicated <Link href="/travel-guide/food-tourism-india" className="text-brand-600 font-medium hover:underline">Food Tourism in India guide</Link> for city-by-city recommendations.</p>
          </div>
        </div>
      </section>

      {/* ============ FESTIVAL CALENDAR ============ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Festival Calendar
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {festivalSpread.map((s) => (
              <div key={s.slug} className="glass-card rounded-xl p-5">
                <Link href={`/state/${s.slug}`} className="font-semibold text-gray-900 hover:text-brand-600 transition-colors text-sm mb-2 block">
                  {s.name}
                </Link>
                <ul className="space-y-1">
                  {s.festivals.slice(0, 3).map((f) => (
                    <li key={f} className="text-xs text-gray-600">{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PACKING CHECKLISTS ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Packing Checklists
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {PACKING_CHECKLISTS.map((pc) => (
              <div key={pc.title} className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{pc.title}</h3>
                <ul className="space-y-2">
                  {pc.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-forest-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TOPIC GUIDES ============ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Deep-Dive Travel Guides
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPIC_SLUGS.map((slug) => (
              <Link key={slug} href={`/travel-guide/${slug}`} className="glass-card rounded-xl p-5 trip-card group block">
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors text-sm mb-1">
                  {TRAVEL_TOPICS[slug].title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{TRAVEL_TOPICS[slug].metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ALL STATES ============ */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore Every State
          </h2>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {STATE_SLUGS.map((slug) => (
              <Link key={slug} href={`/state/${slug}`} className="glass-card rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-700 hover:text-brand-600 hover:border-brand-300 border border-transparent transition-all">
                {STATES[slug].name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card romantic-glow rounded-3xl p-10 sm:p-14 text-center">
            <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Find a Travel Partner for <span className="gradient-text">Your India Trip</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Now that you&apos;ve got the full picture, connect with verified travelers heading the same way. Split costs, share the planning, travel together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Find a Travel Partner
              </Link>
              <Link href="/destinations" className="px-8 py-4 rounded-xl text-sm font-semibold text-gray-700 bg-white/60 border border-white/40 hover:bg-white transition-all">
                Browse Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
