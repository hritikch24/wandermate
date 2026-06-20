'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

type Step = 'phone' | 'otp' | 'details';

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const [otpRequired, setOtpRequired] = useState<boolean | null>(null);
  const [step, setStep] = useState<Step>('phone');

  // Check if OTP is required
  useEffect(() => {
    fetch('/api/config').then(r => r.json()).then(data => {
      setOtpRequired(data.requirePhoneOtp);
      if (!data.requirePhoneOtp) setStep('details');
    }).catch(() => {
      setOtpRequired(false);
      setStep('details');
    });
  }, []);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', age: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoOtp, setDemoOtp] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, purpose: 'register' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to send OTP');
        setLoading(false);
        return;
      }
      setDemoOtp(data.demo);
      setStep('otp');
    } catch {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, purpose: 'register' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid OTP');
        setLoading(false);
        return;
      }
      setStep('details');
    } catch {
      setError('Verification failed');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone,
          age: formData.age ? parseInt(formData.age) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (result?.error) {
        setError('Account created but sign in failed. Please sign in manually.');
        setLoading(false);
      } else {
        router.push(role === 'guide' ? '/profile/edit' : '/');
        router.refresh();
      }
    } catch {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 focus:border-brand-400 outline-none transition-all text-sm';

  if (otpRequired === null) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 via-romantic-400 to-warm-400 flex items-center justify-center shadow-lg">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <path d="M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            </div>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-2">Join Luventra</h1>
          <p className="text-gray-600">
            {step === 'phone' && 'Enter your mobile number to get started'}
            {step === 'otp' && 'Enter the OTP sent to your phone'}
            {step === 'details' && 'Complete your profile to start connecting'}
          </p>
        </div>

        {/* Progress steps — only show when OTP is required */}
        {otpRequired && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {(['phone', 'otp', 'details'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s ? 'bg-gradient-to-r from-brand-500 to-romantic-500 text-white scale-110' :
                  (['phone', 'otp', 'details'].indexOf(step) > i) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {(['phone', 'otp', 'details'].indexOf(step) > i) ? '✓' : i + 1}
                </div>
                {i < 2 && <div className={`w-8 h-0.5 ${(['phone', 'otp', 'details'].indexOf(step) > i) ? 'bg-green-400' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="glass-card rounded-2xl p-8 shadow-xl">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 mb-5">
              {error}
            </div>
          )}

          {/* Step 1: Phone */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 font-medium">+91</div>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required pattern="[6-9]\d{9}" placeholder="Enter 10-digit number"
                    className={inputClass + ' flex-1'} />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Your number is your unique identity on Luventra</p>
              </div>
              <button type="submit" disabled={loading || phone.length !== 10}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 hover:shadow-lg transition-all disabled:opacity-50">
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {demoOtp && (
                <div className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-700">
                  Demo mode — use OTP: <span className="font-bold">123456</span>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Enter OTP</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required placeholder="6-digit OTP" maxLength={6}
                  className={inputClass + ' text-center text-lg tracking-[0.5em] font-mono'} />
                <p className="text-xs text-gray-400 mt-1.5">Sent to +91 {phone}</p>
              </div>
              <button type="submit" disabled={loading || otp.length !== 6}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 hover:shadow-lg transition-all disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button type="button" onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                className="w-full py-2 text-sm text-gray-500 hover:text-brand-600">
                Change number
              </button>
            </form>
          )}

          {/* Step 3: Account Details */}
          {step === 'details' && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Phone verified: +91 {phone}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required placeholder="Your full name" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required minLength={6} placeholder="At least 6 characters" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age <span className="text-gray-400">(optional)</span></label>
                <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Your age" min={18} max={100} className={inputClass} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 hover:shadow-lg transition-all disabled:opacity-50">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-semibold text-brand-600 hover:text-brand-700">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
