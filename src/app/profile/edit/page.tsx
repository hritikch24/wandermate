'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

const TRAVEL_STYLES = ['Backpacker', 'Budget Traveler', 'Explorer', 'Luxury', 'Wellness Traveler', 'Adventure Seeker', 'Cultural Explorer', 'Digital Nomad'];
const ALL_INTERESTS = ['Trekking', 'Photography', 'Food', 'Culture', 'Nightlife', 'Yoga', 'Wildlife', 'Water Sports', 'Camping', 'Shopping', 'History', 'Art', 'Music', 'Meditation', 'Scuba Diving', 'Surfing'];
const LANGUAGES = ['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Marathi', 'Gujarati', 'Punjabi', 'French', 'Spanish', 'German', 'Japanese'];

interface ProfileData {
  name: string;
  bio: string;
  age: string;
  phone: string;
  travelStyle: string;
  languages: string[];
  interests: string[];
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
}

export default function EditProfilePage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [form, setForm] = useState<ProfileData>({
    name: '', bio: '', age: '', phone: '', travelStyle: '',
    languages: [], interests: [],
    instagram: '', facebook: '', twitter: '', linkedin: '',
  });

  useEffect(() => {
    if (authStatus === 'unauthenticated') { router.push('/auth/signin'); return; }
    if (authStatus !== 'authenticated') return;
    fetch('/api/profile')
      .then(r => r.json())
      .then(data => {
        if (data.error) return;
        if (data.avatar) setAvatarPreview(data.avatar);
        setForm({
          name: data.name || '',
          bio: data.bio || '',
          age: data.age?.toString() || '',
          phone: data.phone || '',
          travelStyle: data.travelStyle || '',
          languages: data.languages || [],
          interests: data.interests || [],
          instagram: data.instagram || '',
          facebook: data.facebook || '',
          twitter: data.twitter || '',
          linkedin: data.linkedin || '',
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [authStatus, router]);

  const toggleItem = (key: 'languages' | 'interests', item: string) => {
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(item) ? prev[key].filter(i => i !== item) : [...prev[key], item],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          bio: form.bio,
          age: form.age ? parseInt(form.age) : undefined,
          phone: form.phone || undefined,
          travelStyle: form.travelStyle || undefined,
          languages: form.languages,
          interests: form.interests,
          instagram: form.instagram || undefined,
          facebook: form.facebook || undefined,
          twitter: form.twitter || undefined,
          linkedin: form.linkedin || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save');
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (authStatus === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
          <p className="text-gray-500 mb-8">Complete your profile to attract better travel partners</p>

          <div className="space-y-8">
            {/* Profile Picture */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="relative">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-400 to-romantic-400 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                      {form.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  )}
                  {avatarUploading && (
                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-brand-600 border border-brand-200 hover:bg-brand-50 cursor-pointer transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Upload Photo
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 2 * 1024 * 1024) { setError('Image too large. Max 2MB.'); return; }
                      setAvatarUploading(true);
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        const base64 = reader.result as string;
                        try {
                          const res = await fetch('/api/profile/avatar', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ avatar: base64 }),
                          });
                          if (res.ok) {
                            setAvatarPreview(base64);
                          } else {
                            const data = await res.json();
                            setError(data.error || 'Upload failed');
                          }
                        } catch { setError('Upload failed'); }
                        setAvatarUploading(false);
                      };
                      reader.readAsDataURL(file);
                    }} />
                  </label>
                  <p className="text-xs text-gray-400 mt-2">JPG, PNG, max 2MB</p>
                </div>
              </div>
            </section>

            {/* Basic Info */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Basic Info</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                  <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3}
                    placeholder="Tell travelers about yourself..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none text-sm resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                    <input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} min={18} max={100}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
                  </div>
                </div>
              </div>
            </section>

            {/* Travel Style */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Travel Style</h2>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_STYLES.map(style => (
                  <button key={style} onClick={() => setForm({ ...form, travelStyle: style })}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${form.travelStyle === style ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'}`}>
                    {style}
                  </button>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(lang => (
                  <button key={lang} onClick={() => toggleItem('languages', lang)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${form.languages.includes(lang) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                    {lang}
                  </button>
                ))}
              </div>
            </section>

            {/* Interests */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {ALL_INTERESTS.map(interest => (
                  <button key={interest} onClick={() => toggleItem('interests', interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${form.interests.includes(interest) ? 'bg-romantic-500 text-white border-romantic-500' : 'bg-white text-gray-600 border-gray-200 hover:border-romantic-300'}`}>
                    {interest}
                  </button>
                ))}
              </div>
            </section>

            {/* Social Media */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-gray-900 mb-1">Social Media</h2>
              <p className="text-sm text-gray-500 mb-4">Link your profiles so travel partners can verify you</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">IG</div>
                  <input type="text" value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })}
                    placeholder="instagram username (without @)"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">FB</div>
                  <input type="text" value={form.facebook} onChange={e => setForm({ ...form, facebook: e.target.value })}
                    placeholder="facebook profile URL or username"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white text-sm font-bold shrink-0">X</div>
                  <input type="text" value={form.twitter} onChange={e => setForm({ ...form, twitter: e.target.value })}
                    placeholder="twitter/X username (without @)"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white text-sm font-bold shrink-0">IN</div>
                  <input type="text" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })}
                    placeholder="linkedin profile URL"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
                </div>
              </div>
            </section>

            {/* Save */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>
            )}
            {saved && (
              <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-600">Profile saved successfully!</div>
            )}
            <button onClick={handleSave} disabled={saving}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-romantic-500 to-warm-500 hover:shadow-lg transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
