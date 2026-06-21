import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — Luventra',
  description: 'Luventra terms of service. Read our rules for using the travel partner finding platform.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen animated-bg pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-bold mb-8"><span className="gradient-text">Terms of Service</span></h1>
          <div className="glass-card rounded-2xl p-8 prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-6">Last updated: June 2026</p>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using Luventra ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.</p>
            <h2>2. Eligibility</h2>
            <p>You must be at least 18 years old to use Luventra. By registering, you represent that you are at least 18 years of age and have the legal capacity to enter into agreements.</p>
            <h2>3. Account Registration</h2>
            <p>You must provide accurate, current information during registration. You are responsible for maintaining the confidentiality of your password. You are responsible for all activities under your account.</p>
            <h2>4. User Conduct</h2>
            <p>You agree not to: post false or misleading information; harass, threaten, or intimidate other users; use the platform for illegal activities; create fake profiles; spam other users; attempt to scam or defraud others; share explicit or inappropriate content.</p>
            <h2>5. Travel Arrangements</h2>
            <p>Luventra is a platform for connecting travelers. We do not organize, manage, or guarantee any travel arrangements. All trip planning, cost splitting, and logistics are the sole responsibility of the users involved. Luventra is not liable for any issues arising during travel.</p>
            <h2>6. Sponsorship</h2>
            <p>The sponsor/need-sponsor system is voluntary. Luventra does not guarantee sponsorship outcomes. All financial arrangements between users are their private matter. Luventra is not responsible for disputes regarding sponsorship.</p>
            <h2>7. Verification</h2>
            <p>Aadhaar verification confirms identity only. It does not guarantee behavior, trustworthiness, or safety. Always exercise personal judgment when meeting new people.</p>
            <h2>8. Content</h2>
            <p>You retain ownership of content you post. By posting, you grant Luventra a non-exclusive, royalty-free license to use, display, and distribute your content on the platform.</p>
            <h2>9. Termination</h2>
            <p>Luventra reserves the right to suspend or terminate accounts that violate these terms, engage in harmful behavior, or are reported by other users.</p>
            <h2>10. Limitation of Liability</h2>
            <p>Luventra is provided "as is." We are not liable for any damages arising from your use of the platform, interactions with other users, or travel arrangements made through the platform.</p>
            <h2>11. Changes</h2>
            <p>We may update these terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>
            <h2>12. Contact</h2>
            <p>Questions about these terms? Contact us at <a href="mailto:hritik242000@gmail.com">hritik242000@gmail.com</a> or call +91 8859820935.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
