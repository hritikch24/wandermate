'use client';

import Link from 'next/link';
import { CITIES } from '@/data/cities';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 via-romantic-400 to-warm-400 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <path d="M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold">
                <span className="text-brand-400">Wander</span>Mate
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Find your perfect travel partner. Whether you want to sponsor an adventure, need a sponsor, or just want great company — we connect souls who wander.
            </p>
            <div className="flex gap-3">
              {['twitter', 'instagram', 'facebook', 'youtube'].map((social) => (
                <a key={social} href={`https://${social}.com/wandermate`} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-600 flex items-center justify-center transition-colors" aria-label={social}>
                  <span className="text-xs uppercase font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Destinations</h3>
            <ul className="space-y-2">
              {Object.values(CITIES).map((city) => (
                <li key={city.slug}>
                  <Link href={`/city/${city.slug}`} className="text-sm text-gray-300 hover:text-brand-400 transition-colors">
                    {city.name} {city.state && `(${city.state})`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'How It Works', 'Safety Guidelines', 'Community Rules', 'Blog', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Support</h3>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Report a Concern', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} WanderMate. All rights reserved. Made with love for wanderers.</p>
          <p className="text-sm text-gray-500">
            Available in: {Object.values(CITIES).map((c) => c.name).join(' · ')}
          </p>
        </div>
      </div>
    </footer>
  );
}
