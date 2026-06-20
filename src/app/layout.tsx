import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import AuthProvider from '@/components/providers/AuthProvider';
import Analytics from '@/components/Analytics';
import '@/styles/globals.css';

const SEO_KEYWORDS = [
  // Core
  'travel partner india', 'travel companion', 'trip partner finder', 'solo travel india',
  'group travel', 'backpacking india', 'travel buddy', 'wanderlust', 'explore india',
  'travel mate', 'find travel companion', 'travel sponsorship', 'co-travel', 'trip planning india',
  'travel partner finder app', 'find a travel buddy online', 'travel companion app india',
  'solo female travel india', 'group trip planning india', 'india travel community',
  'meet travelers india', 'travel matching app', 'india backpacking community',
  'verified travel partners', 'split travel costs', 'travel sponsor app',
  // States
  'Rajasthan tourism', 'Kerala backwaters', 'Goa beaches', 'Himachal Pradesh trip',
  'Uttarakhand travel', 'Ladakh travel', 'Kashmir tourism', 'Tamil Nadu temples',
  'Karnataka tourism', 'Maharashtra travel', 'Northeast India travel', 'Sikkim tourism',
  'Andaman Nicobar tourism', 'Punjab travel', 'Gujarat tourism', 'Madhya Pradesh tourism',
  'West Bengal travel', 'Odisha tourism', 'Uttar Pradesh travel',
  // Activities
  'trekking india', 'backpacking trip india', 'road trip india', 'adventure sports india',
  'spiritual tourism india', 'beach holiday india', 'mountain trek partner',
  'desert safari rajasthan', 'monsoon travel destinations india', 'digital nomad india',
  'festival travel india', 'temple tour india', 'wildlife safari india', 'honeymoon destinations india',
  'budget travel india', 'luxury travel india', 'cultural tourism india', 'eco tourism india',
];

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
      </body>
    </html>
  );
}
