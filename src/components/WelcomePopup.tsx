'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DESTINATIONS = [
  { name: 'Rajasthan', slug: 'rajasthan' },
  { name: 'Kerala', slug: 'kerala' },
  { name: 'Goa', slug: 'goa' },
  { name: 'Himachal', slug: 'himachal' },
  { name: 'Ladakh', slug: 'ladakh' },
  { name: 'Northeast India', slug: 'northeast-india' },
];

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('luventra_welcomed')) return;
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDestinationClick = (slug: string) => {
    localStorage.setItem('luventra_welcomed', '1');
    setVisible(false);
    router.push(`/state/${slug}`);
  };

  const handleSkip = () => {
    localStorage.setItem('luventra_welcomed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="relative w-[90%] max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40"
        style={{
          animation: 'welcomeIn 0.4s ease-out',
          backgroundImage:
            'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4, #ec4899) border-box',
          backgroundClip: 'padding-box, border-box',
          borderColor: 'transparent',
          borderWidth: '2px',
          borderStyle: 'solid',
        }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">
            Welcome to Luventra!
          </h2>
          <p className="text-gray-600 text-sm">
            Where are you dreaming of traveling?
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.slug}
              onClick={() => handleDestinationClick(dest.slug)}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-sm hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 hover:text-white transition-all duration-200 border border-gray-200 hover:border-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ec4899, #8b5cf6) border-box',
                backgroundClip: 'padding-box, border-box',
                borderColor: 'transparent',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            >
              {dest.name}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            Skip &amp; Explore
          </button>
        </div>
      </div>

    </div>
  );
}
