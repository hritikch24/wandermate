import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Luventra',
  description: 'How Luventra collects, uses, and protects your personal data. Our commitment to your privacy.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen animated-bg pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-bold mb-8"><span className="gradient-text">Privacy Policy</span></h1>
          <div className="glass-card rounded-2xl p-8 prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-6">Last updated: June 2026</p>
            <h2>1. Information We Collect</h2>
            <p><strong>Account Information:</strong> Name, email, phone number, age, profile photo, travel preferences, languages spoken, social media links.</p>
            <p><strong>Verification Data:</strong> Aadhaar number (hashed, never stored in plain text) for identity verification only.</p>
            <p><strong>Usage Data:</strong> Pages visited, features used, device information, IP address, browser type.</p>
            <p><strong>Communications:</strong> Messages sent through the platform, trip requests, reviews.</p>
            <h2>2. How We Use Your Information</h2>
            <p>We use your information to: provide and improve the platform; match you with compatible travel partners; verify your identity; send relevant notifications; analyze usage patterns to improve features; respond to support requests.</p>
            <h2>3. Information Sharing</h2>
            <p>We share your profile information with other users as part of the platform experience. We do NOT sell your personal data to third parties. We may share data with law enforcement if required by law or to protect user safety.</p>
            <h2>4. Data Security</h2>
            <p>We use industry-standard encryption (HTTPS, bcrypt for passwords) to protect your data. Aadhaar numbers are never stored in plain text. However, no system is 100% secure — use strong passwords and enable phone verification.</p>
            <h2>5. Your Rights</h2>
            <p>You can: access your personal data via your profile; correct inaccurate information; delete your account and all associated data; opt out of non-essential communications.</p>
            <h2>6. Cookies</h2>
            <p>We use essential cookies for authentication and session management. Analytics cookies help us understand usage patterns. You can manage cookie preferences via the consent banner.</p>
            <h2>7. Data Retention</h2>
            <p>We retain your data while your account is active. Upon account deletion, personal data is permanently removed within 30 days. Anonymized analytics data may be retained longer.</p>
            <h2>8. Children</h2>
            <p>Luventra is not intended for users under 18. We do not knowingly collect data from minors. If you believe a minor has registered, contact us immediately.</p>
            <h2>9. Changes</h2>
            <p>We may update this policy periodically. Material changes will be communicated via email or in-app notification.</p>
            <h2>10. Contact</h2>
            <p>Privacy questions? Email <a href="mailto:hritik242000@gmail.com">hritik242000@gmail.com</a> or call +91 8859820935.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
