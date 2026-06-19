'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

interface Conversation {
  partner: { id: string; name: string; avatar: string | null };
  lastMessage: string;
  lastMessageAt: string;
  unread: boolean;
}

const AVATAR_COLORS = ['from-brand-400 to-romantic-400', 'from-forest-400 to-teal-400', 'from-warm-400 to-brand-400', 'from-romantic-400 to-purple-400'];

export default function ChatListPage() {
  const { status: authStatus } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStatus === 'unauthenticated') router.push('/auth/signin');
  }, [authStatus, router]);

  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    fetch('/api/messages')
      .then(r => r.json())
      .then(data => setConversations(data.conversations || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [authStatus]);

  if (loading) {
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
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-500 mb-8">Your conversations with travel partners</p>

          {conversations.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <p className="text-gray-500 mb-1">No conversations yet</p>
              <p className="text-sm text-gray-400 mb-6">Connect with a traveler first, then start chatting!</p>
              <Link href="/" className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-romantic-500">
                Find Travel Partners
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map(conv => {
                const initials = conv.partner.name.split(' ').map(n => n[0]).join('');
                const colorClass = AVATAR_COLORS[conv.partner.name.length % AVATAR_COLORS.length];
                const timeAgo = getTimeAgo(conv.lastMessageAt);
                return (
                  <Link key={conv.partner.id} href={`/chat/${conv.partner.id}`}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all hover:shadow-md ${conv.unread ? 'glass-card border-2 border-brand-200' : 'glass-card'}`}>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold shrink-0`}>
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`font-semibold text-sm ${conv.unread ? 'text-gray-900' : 'text-gray-700'}`}>{conv.partner.name}</span>
                        <span className="text-xs text-gray-400 shrink-0">{timeAgo}</span>
                      </div>
                      <p className={`text-sm truncate ${conv.unread ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread && <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0" />}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
