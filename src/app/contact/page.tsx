'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to backend
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen animated-bg pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/60 backdrop-blur-sm text-brand-700 text-sm font-medium mb-6 border border-brand-200/40">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              We typically respond within 2 hours
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Get in Touch</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about finding a travel partner, need help planning your trip, or want to partner with us? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Phone */}
              <div className="glass-card rounded-2xl p-6 group hover:border-brand-300/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                <a href="tel:+918859820935" className="text-brand-600 hover:text-brand-700 font-medium text-lg">
                  +91 8859820935
                </a>
                <p className="text-sm text-gray-500 mt-1">Mon-Sat, 9 AM - 8 PM IST</p>
              </div>

              {/* Email */}
              <div className="glass-card rounded-2xl p-6 group hover:border-brand-300/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-romantic-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                <a href="mailto:hritik242000@gmail.com" className="text-brand-600 hover:text-brand-700 font-medium">
                  hritik242000@gmail.com
                </a>
                <p className="text-sm text-gray-500 mt-1">We reply within 2 hours</p>
              </div>

              {/* Office */}
              <div className="glass-card rounded-2xl p-6 group hover:border-brand-300/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Our Office</h3>
                <p className="text-gray-600 text-sm">India</p>
                <p className="text-sm text-gray-500 mt-1">Building something amazing for travelers</p>
              </div>

              {/* Social Links */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { name: 'Twitter', color: 'bg-black', letter: 'X' },
                    { name: 'Instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500', letter: 'I' },
                    { name: 'Facebook', color: 'bg-blue-600', letter: 'F' },
                    { name: 'YouTube', color: 'bg-red-600', letter: 'Y' },
                  ].map((s) => (
                    <a key={s.name} href={`https://${s.name.toLowerCase()}.com/luventra`} target="_blank" rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-white font-bold text-sm hover:scale-110 transition-transform shadow-lg`}>
                      {s.letter}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-200/30 via-romantic-200/20 to-transparent rounded-bl-full pointer-events-none" />

                {sent ? (
                  <div className="text-center py-16 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                    <p className="text-gray-600 mb-6">We&apos;ll get back to you within 2 hours. Happy traveling!</p>
                    <Link href="/" className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-romantic-500 text-white font-semibold hover:shadow-lg transition-all">
                      Explore Destinations
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative">
                    <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                    <p className="text-gray-600 text-sm mb-6">Fill out the form and we&apos;ll get back to you shortly.</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 focus:ring-2 focus:ring-brand-300 focus:border-brand-400 outline-none transition-all text-sm"
                          placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 focus:ring-2 focus:ring-brand-300 focus:border-brand-400 outline-none transition-all text-sm"
                          placeholder="you@example.com" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 focus:ring-2 focus:ring-brand-300 focus:border-brand-400 outline-none transition-all text-sm">
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="partner">Finding a Travel Partner</option>
                        <option value="guide">Becoming a Local Guide</option>
                        <option value="safety">Safety Concern</option>
                        <option value="business">Business Partnership</option>
                        <option value="bug">Report a Bug</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 focus:ring-2 focus:ring-brand-300 focus:border-brand-400 outline-none transition-all text-sm resize-none"
                        placeholder="Tell us how we can help you..." />
                    </div>

                    <button type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 text-white font-semibold text-sm hover:shadow-xl hover:scale-[1.02] transition-all">
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* FAQ */}
              <div className="mt-8 glass-card rounded-2xl p-8">
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    { q: 'Is Luventra free to use?', a: 'Yes! Creating a profile, browsing travelers, and connecting with potential travel partners is completely free.' },
                    { q: 'How do I find a travel partner?', a: 'Sign up, create your trip or browse existing trips, and connect with travelers heading to the same destination. Our matching system helps you find compatible companions.' },
                    { q: 'Is it safe to travel with strangers?', a: 'Every traveler on Luventra goes through verification. We recommend chatting and video calling before meeting in person. Our trust score system helps you make informed decisions.' },
                    { q: 'Can I be a local guide on Luventra?', a: 'Absolutely! Register as a guide, set your availability and rates, and start connecting with travelers who need local expertise in your city.' },
                  ].map((faq) => (
                    <details key={faq.q} className="group">
                      <summary className="flex items-center justify-between cursor-pointer py-3 text-sm font-medium text-gray-900 hover:text-brand-600 transition-colors">
                        {faq.q}
                        <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="text-sm text-gray-600 pb-3 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
