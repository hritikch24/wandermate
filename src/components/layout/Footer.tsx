'use client';

import Link from 'next/link';
import { CITIES } from '@/data/cities';
import { getStateBySlug } from '@/data/states';

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
                <span className="text-brand-400">Luv</span>entra
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Find your perfect travel partner. Whether you want to sponsor an adventure, need a sponsor, or just want great company — we connect souls who wander.
            </p>
            <div className="flex gap-3">
              {['twitter', 'instagram', 'facebook', 'youtube'].map((social) => (
                <a key={social} href={`https://${social}.com/luventra`} target="_blank" rel="noopener noreferrer"
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
                    {city.name} {city.state && getStateBySlug(city.state) && `(${getStateBySlug(city.state)!.name})`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">Blog</Link></li>
              <li><Link href="/travel-guide" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">Travel Guides</Link></li>
              <li><Link href="/destinations" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">Destinations</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/auth/register" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">Join Luventra</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+918859820935" className="text-sm text-gray-300 hover:text-brand-400 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +91 8859820935
                </a>
              </li>
              <li>
                <a href="mailto:hritik242000@gmail.com" className="text-sm text-gray-300 hover:text-brand-400 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  hritik242000@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <Link href="/contact" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
                  Contact Form &rarr;
                </Link>
              </li>
            </ul>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4 mt-6">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">Help Center</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">Travel Blog</Link></li>
              <li><Link href="/travel-guide" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">Travel Guides</Link></li>
              <li><Link href="/destinations" className="text-sm text-gray-300 hover:text-brand-400 transition-colors">All Destinations</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Luventra. All rights reserved. Made with love for wanderers.</p>
          <p className="text-sm text-gray-500">
            Available in: {Object.values(CITIES).map((c) => c.name).join(' · ')}
          </p>
        </div>
      </div>
    </footer>
  );
}
