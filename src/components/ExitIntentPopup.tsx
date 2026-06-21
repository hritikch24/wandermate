'use client';

import { useState, useEffect, useCallback } from 'react';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const show = useCallback(() => {
    if (sessionStorage.getItem('luventra_exit_shown')) return;
    sessionStorage.setItem('luventra_exit_shown', '1');
    setVisible(true);
  }, []);

  useEffect(() => {
    let timeOnPage = 0;
    const ticker = setInterval(() => {
      timeOnPage += 1;
    }, 1000);

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      let inactivityTimer: ReturnType<typeof setTimeout>;

      const resetInactivity = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          if (timeOnPage >= 5) show();
        }, 30000);
      };

      resetInactivity();
      const events = ['touchstart', 'scroll', 'click'] as const;
      events.forEach((e) => document.addEventListener(e, resetInactivity, { passive: true }));

      return () => {
        clearInterval(ticker);
        clearTimeout(inactivityTimer);
        events.forEach((e) => document.removeEventListener(e, resetInactivity));
      };
    } else {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && timeOnPage >= 5) {
          show();
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        clearInterval(ticker);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="w-[90%] max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 animate-[popIn_0.3s_ease-out]"
        style={{
          animation: 'popIn 0.3s ease-out',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors text-lg"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="relative">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold gradient-text mb-2">
                Wait! Before you go...
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Get personalized travel recommendations &amp; find your perfect travel partner
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Get My Free Travel Guide
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Join 10,000+ Indian travelers
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">✈️</div>
              <h3 className="text-xl font-bold gradient-text mb-1">Thank you!</h3>
              <p className="text-gray-600 text-sm">Check your inbox for your free travel guide.</p>
              <button
                onClick={() => setVisible(false)}
                className="mt-4 px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
