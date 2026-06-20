'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function VerifyPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<'input' | 'otp' | 'done'>('input');
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState(false);
  const [alreadyVerified, setAlreadyVerified] = useState(false);

  useEffect(() => {
    if (authStatus === 'unauthenticated') router.push('/auth/signin');
  }, [authStatus, router]);

  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    fetch('/api/profile').then(r => r.json()).then(data => {
      if (data.aadhaarVerified) {
        setAlreadyVerified(true);
        setStep('done');
      }
    }).catch(() => {});
  }, [authStatus]);

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/verify/aadhaar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send-otp', aadhaarNumber: aadhaar }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      setDemo(data.demo);
      setStep('otp');
    } catch { setError('Failed'); }
    setLoading(false);
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/verify/aadhaar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify-otp', aadhaarNumber: aadhaar, otp }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      setStep('done');
    } catch { setError('Verification failed'); }
    setLoading(false);
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 focus:border-brand-400 outline-none transition-all text-sm';

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 flex items-start justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold text-gray-900 mb-2">
              Get Verified
            </h1>
            <p className="text-gray-500 text-sm">Verify with Aadhaar to get a blue tick on your profile</p>
          </div>

          <div className="glass-card rounded-2xl p-8 shadow-xl">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 mb-5">{error}</div>
            )}

            {step === 'done' && (
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {alreadyVerified ? 'Already Verified!' : 'Verification Complete!'}
                </h2>
                <p className="text-gray-500 mb-2">Your profile now has a blue verification badge.</p>
                <div className="flex items-center justify-center gap-1 mb-6">
                  <span className="font-semibold text-gray-800">{session?.user?.name}</span>
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <Link href="/dashboard" className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-romantic-500">
                  Go to Dashboard
                </Link>
              </div>
            )}

            {step === 'input' && (
              <form onSubmit={sendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Aadhaar Number</label>
                  <input type="text" value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    required placeholder="Enter 12-digit Aadhaar number"
                    className={inputClass + ' tracking-widest font-mono'} />
                  <p className="text-xs text-gray-400 mt-1.5">OTP will be sent to your Aadhaar-linked mobile number</p>
                </div>
                <button type="submit" disabled={loading || aadhaar.length !== 12}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg transition-all disabled:opacity-50">
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
                <p className="text-xs text-center text-gray-400">This is optional. Your data is secure and only used for verification.</p>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={verifyOtp} className="space-y-5">
                {demo && (
                  <div className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-700">
                    Demo mode — use OTP: <span className="font-bold">123456</span>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Enter OTP</label>
                  <input type="text" value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required placeholder="6-digit OTP" maxLength={6}
                    className={inputClass + ' text-center text-lg tracking-[0.5em] font-mono'} />
                  <p className="text-xs text-gray-400 mt-1.5">Sent to Aadhaar-linked mobile number</p>
                </div>
                <button type="submit" disabled={loading || otp.length !== 6}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg transition-all disabled:opacity-50">
                  {loading ? 'Verifying...' : 'Verify & Get Blue Tick'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
