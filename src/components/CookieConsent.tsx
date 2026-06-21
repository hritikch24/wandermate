'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('luventra_cookies')) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('luventra_cookies', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('luventra_cookies', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] bg-gray-900/95 backdrop-blur-xl text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          We use cookies to enhance your travel planning experience.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
