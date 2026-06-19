import type { Metadata } from 'next';
import AuthProvider from '@/components/providers/AuthProvider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Luventra — Find Your Perfect Travel Partner',
    template: '%s | Luventra',
  },
  description: 'Discover travel companions who match your vibe, budget, and adventure style. Plan trips together, split costs, or sponsor someone\'s journey. Join thousands of travelers connecting across India and Nepal.',
  keywords: ['travel partner', 'travel buddy', 'find travel companion', 'group travel India', 'backpacking partner', 'travel sponsorship', 'co-travel', 'trip planning'],
  authors: [{ name: 'Luventra' }],
  creator: 'Luventra',
  publisher: 'Luventra',
  metadataBase: new URL('https://luventra.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://luventra.com',
    siteName: 'Luventra',
    title: 'Luventra — Find Your Perfect Travel Partner',
    description: 'Connect with travelers who match your vibe. Sponsor trips, find sponsors, or just join the adventure.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Luventra - Travel Together' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luventra — Find Your Perfect Travel Partner',
    description: 'Connect with travelers who match your vibe. Sponsor trips, find sponsors, or just join the adventure.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Luventra',
  description: 'Find your perfect travel partner. Plan trips together, split costs, or sponsor someone\'s journey.',
  url: 'https://luventra.com',
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
      </body>
    </html>
  );
}
