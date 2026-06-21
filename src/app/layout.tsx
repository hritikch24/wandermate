import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import AuthProvider from '@/components/providers/AuthProvider';
import Analytics from '@/components/Analytics';
import AIChatbot from '@/components/AIChatbot';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import WelcomePopup from '@/components/WelcomePopup';
import SocialShareWidget from '@/components/SocialShareWidget';
import SocialProofToast from '@/components/SocialProofToast';
import CookieConsent from '@/components/CookieConsent';
import ReadingProgress from '@/components/ReadingProgress';
import '@/styles/globals.css';

const RAW_SEO_KEYWORDS = [
  // Core
  'travel partner india', 'travel companion', 'trip partner finder', 'solo travel india',
  'group travel', 'backpacking india', 'travel buddy', 'wanderlust', 'explore india',
  'travel mate', 'find travel companion', 'travel sponsorship', 'co-travel', 'trip planning india',
  'travel partner finder app', 'find a travel buddy online', 'travel companion app india',
  'solo female travel india', 'group trip planning india', 'india travel community',
  'meet travelers india', 'travel matching app', 'india backpacking community',
  'verified travel partners', 'split travel costs', 'travel sponsor app',
  'find someone to travel with', 'travel partner app india', 'india travel guide 2026',
  'best travel destinations india', 'india tourism guide',

  // States & Union Territories (all 29+)
  'Rajasthan tourism', 'Punjab travel', 'Haryana tourism', 'Uttarakhand travel',
  'Delhi tourism', 'Ladakh travel', 'Chandigarh travel', 'Goa beaches',
  'Gujarat tourism', 'Maharashtra travel', 'Kerala backwaters', 'Karnataka tourism',
  'Telangana tourism', 'Puducherry travel', 'Lakshadweep tourism', 'Odisha tourism',
  'Bihar tourism', 'Jharkhand tourism', 'Chhattisgarh tourism', 'Assam tourism',
  'Meghalaya tourism', 'Manipur tourism', 'Mizoram tourism', 'Nagaland tourism',
  'Tripura tourism', 'Sikkim tourism', 'Uttar Pradesh travel', 'Himachal Pradesh trip',
  'Jammu and Kashmir tourism', 'Kashmir tourism', 'Tamil Nadu temples', 'Andhra Pradesh tourism',
  'Andaman Nicobar tourism', 'West Bengal travel', 'Madhya Pradesh tourism', 'Arunachal Pradesh tourism',
  'Northeast India travel',

  // Major cities
  'Jaipur travel guide', 'Udaipur tourism', 'Mumbai travel guide', 'Delhi travel guide',
  'Bangalore weekend trips', 'Chennai tourism', 'Kolkata travel guide', 'Hyderabad tourism',
  'Manali travel guide', 'Shimla tourism', 'Rishikesh travel', 'Varanasi tourism',
  'Agra Taj Mahal travel', 'Leh Ladakh travel', 'Pune weekend trips', 'Mysore tourism',

  // Travel activities
  'trekking india', 'backpacking trip india', 'road trip india', 'adventure sports india',
  'spiritual tourism india', 'beach holiday india', 'mountain trek partner',
  'desert safari rajasthan', 'monsoon travel destinations india', 'digital nomad india',
  'festival travel india', 'temple tour india', 'wildlife safari india', 'honeymoon destinations india',
  'budget travel india', 'luxury travel india', 'cultural tourism india', 'eco tourism india',
  'scuba diving india', 'surfing india', 'paragliding india', 'camping india',
  'river rafting india', 'skiing india', 'hot air ballooning india', 'wildlife safari tiger reserve',
  'houseboat kerala', 'snorkeling andaman', 'rock climbing india', 'cycling tours india',
  'motorcycle road trip india', 'tiger safari india', 'hill station travel india',
  'heritage travel india', 'food tourism india', 'winter destinations india', 'summer destinations india',

  // Travel styles
  'solo travel', 'couple travel india', 'group travel india', 'family travel india',
  'adventure travel india', 'luxury travel companion', 'budget backpacking india',
  'digital nomad travel india', 'slow travel india', 'backpacker community india',

  // Long-tail buddy/partner-finder phrases
  'how to find a travel partner', 'travel buddy for solo trip', 'find travel companion for vacation',
  'app to find travel partners india', 'trustworthy travel companion india', 'travel partner for women india',
  'find someone to travel with india', 'group trip with strangers india', 'travel partner for backpacking trip',
  'meet travel buddy online india',
];

const SEO_KEYWORDS = Array.from(new Set(RAW_SEO_KEYWORDS));

export const metadata: Metadata = {
  title: {
    default: 'Luventra — Find Travel Partners & Companions for Trips Across India',
    template: '%s | Luventra — Find Travel Partners in India',
  },
  description:
    'Luventra connects you with verified travel partners and companions across India. Find a travel buddy for solo trips, group travel, backpacking adventures, or sponsored journeys. Discover state-level travel communities — from Rajasthan\'s deserts to Kerala\'s backwaters, Himachal\'s mountains to Goa\'s beaches. Plan trips together, split costs, and explore India safely with like-minded travelers.',
  keywords: SEO_KEYWORDS,
  authors: [{ name: 'Luventra' }],
  creator: 'Luventra',
  publisher: 'Luventra',
  metadataBase: new URL('https://luventra.co'),
  alternates: {
    canonical: 'https://luventra.co',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://luventra.co',
    siteName: 'Luventra',
    title: 'Luventra — Find Travel Partners & Companions for Trips Across India',
    description: 'Discover travel companions who match your vibe, budget, and adventure style. Plan trips together, split costs, or sponsor someone\'s journey across India.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Luventra - Travel Together Across India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luventra — Find Travel Partners & Companions for Trips Across India',
    description: 'Discover travel companions who match your vibe, budget, and adventure style. Plan trips together, split costs, or sponsor someone\'s journey across India.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#dd7a3e',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Luventra',
  description: 'Find your perfect travel partner. Plan trips together, split costs, or sponsor someone\'s journey.',
  url: 'https://luventra.co',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '2450' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#dd7a3e" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen animated-bg antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <ReadingProgress />
        <AIChatbot />
        <SocialShareWidget />
        <SocialProofToast />
        <ExitIntentPopup />
        <WelcomePopup />
        <CookieConsent />
      </body>
    </html>
  );
}
