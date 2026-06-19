import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen animated-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-8xl font-bold gradient-text mb-4">404</h1>
        <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-2">Lost on the trail?</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          This path doesn&apos;t lead anywhere yet. Let&apos;s get you back to the main route and find your next adventure.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
          Back to Home
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </Link>
      </div>
    </div>
  );
}
