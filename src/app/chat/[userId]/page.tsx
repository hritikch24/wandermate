'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; name: string; avatar: string | null };
}

interface PartnerInfo {
  id: string;
  name: string;
  avatar: string | null;
  bio: string | null;
  travelStyle: string | null;
  isConnected: boolean;
  phone?: string;
  email?: string;
  instagram?: string;
}

const AVATAR_COLORS = ['from-brand-400 to-romantic-400', 'from-forest-400 to-teal-400', 'from-warm-400 to-brand-400', 'from-romantic-400 to-purple-400'];

export default function ChatPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const params = useParams();
  const partnerId = params.userId as string;
  const currentUserId = (session?.user as { id?: string })?.id;

  const [messages, setMessages] = useState<Message[]>([]);
  const [partner, setPartner] = useState<PartnerInfo | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authStatus === 'unauthenticated') router.push('/auth/signin');
  }, [authStatus, router]);

  // Fetch partner info
  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    fetch(`/api/users/${partnerId}`)
      .then(r => r.json())
      .then(data => {
        if (!data.error) setPartner(data);
      })
      .catch(() => {});
  }, [partnerId, authStatus]);

  // Fetch messages and poll every 5s
  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    const fetchMessages = () => {
      fetch(`/api/messages?with=${partnerId}`)
        .then(r => r.json())
        .then(data => {
          if (data.messages) setMessages(data.messages);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [partnerId, authStatus]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: partnerId, content: newMessage.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, data.message]);
        setNewMessage('');
      }
    } catch {} finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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

  const partnerInitials = partner?.name?.split(' ').map(n => n[0]).join('') || '?';
  const colorClass = AVATAR_COLORS[(partner?.name?.length || 0) % AVATAR_COLORS.length];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 flex flex-col">
        {/* Chat Header */}
        <div className="sticky top-16 z-40 glass-card border-b border-white/20 px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => router.push('/dashboard')} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <Link href={`/profile/${partnerId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-sm font-bold`}>
                  {partnerInitials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{partner?.name || 'Loading...'}</div>
                  {partner?.travelStyle && <div className="text-xs text-gray-500">{partner.travelStyle}</div>}
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {partner?.isConnected && (
                <button onClick={() => setShowContact(!showContact)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors" title="Contact Info">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
              )}
              <Link href={`/profile/${partnerId}`} className="p-2 rounded-xl hover:bg-gray-100 transition-colors" title="View Profile">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info Dropdown */}
        {showContact && partner?.isConnected && (
          <div className="max-w-3xl mx-auto w-full px-4">
            <div className="glass-card rounded-2xl p-4 mt-2 mb-2 border border-green-200 bg-green-50/50">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm font-medium text-green-700">Contact Details</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {partner.email && (
                  <a href={`mailto:${partner.email}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {partner.email}
                  </a>
                )}
                {partner.phone && (
                  <a href={`tel:${partner.phone}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {partner.phone}
                  </a>
                )}
                {partner.instagram && (
                  <a href={`https://instagram.com/${partner.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <span className="w-4 h-4 rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white text-[8px] font-bold flex items-center justify-center">IG</span>
                    @{partner.instagram}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <p className="text-gray-500 mb-1">No messages yet</p>
                <p className="text-sm text-gray-400">Say hello to start the conversation!</p>
              </div>
            )}
            {messages.map(msg => {
              const isMe = msg.sender.id === currentUserId;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                    isMe
                      ? 'bg-gradient-to-r from-brand-500 to-romantic-500 text-white rounded-br-md'
                      : 'glass-card text-gray-800 rounded-bl-md'
                  }`}>
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    <p className={`text-[10px] mt-1 ${isMe ? 'text-white/60' : 'text-gray-400'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="sticky bottom-0 glass-card border-t border-white/20 px-4 py-3">
          <div className="max-w-3xl mx-auto flex gap-3">
            <textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-300 outline-none text-sm resize-none"
            />
            <button onClick={handleSend} disabled={!newMessage.trim() || sending}
              className="px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-romantic-500 hover:shadow-lg transition-all disabled:opacity-50 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
