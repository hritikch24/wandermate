'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

interface Member { id: string; name: string; avatar: string | null; verified: boolean; role: string }
interface Message { id: string; content: string; createdAt: string; sender: { id: string; name: string; avatar: string | null } }

export default function GroupChatPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [groupId, setGroupId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [notMember, setNotMember] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = (session?.user as any)?.id;

  useEffect(() => {
    if (authStatus === 'unauthenticated') router.push('/auth/signin');
  }, [authStatus, router]);

  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    fetch(`/api/groups?tripId=${id}`).then(r => r.json()).then(d => {
      if (!d.group) { setNotMember(true); setLoading(false); return; }
      setGroupId(d.group.id);
      setGroupName(d.group.trip?.title || d.group.name || 'Group Chat');
      setMembers(d.group.members?.map((m: any) => ({ ...m.user, role: m.role })) || []);
      return fetch(`/api/groups/${d.group.id}/messages`).then(r => r.json());
    }).then(d => { if (d) setMessages(d.messages || []); }).catch(() => setNotMember(true)).finally(() => setLoading(false));
  }, [authStatus, id]);

  // Poll for new messages
  useEffect(() => {
    if (!groupId) return;
    const interval = setInterval(() => {
      fetch(`/api/groups/${groupId}/messages`).then(r => r.json()).then(d => { if (d.messages) setMessages(d.messages); }).catch(() => {});
    }, 3000);
    return () => clearInterval(interval);
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !groupId || sending) return;
    setSending(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input.trim() }),
      });
      if (res.ok) {
        const { message } = await res.json();
        setMessages(prev => [...prev, message]);
        setInput('');
      }
    } catch {} finally { setSending(false); }
  };

  if (loading) return (
    <><Navbar /><div className="min-h-screen flex items-center justify-center pt-16"><div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" /></div></>
  );

  if (notMember) return (
    <><Navbar /><div className="min-h-screen flex items-center justify-center pt-16"><div className="text-center glass-card rounded-2xl p-8 max-w-md mx-4"><h1 className="text-xl font-bold text-gray-900 mb-2">Not a Member</h1><p className="text-gray-600 text-sm mb-4">You need to be an accepted member of this trip to access the group chat.</p><Link href={`/trip/${id}`} className="text-brand-600 hover:underline font-medium">Back to Trip</Link></div></div></>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 flex">
        {/* Members sidebar - desktop */}
        <aside className={`${showMembers ? 'block' : 'hidden'} md:block w-72 border-r border-gray-200/50 bg-white/50 backdrop-blur-xl p-4 pt-20 fixed md:sticky top-0 h-screen z-30 md:z-auto`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-sm">Members ({members.length})</h3>
            <button onClick={() => setShowMembers(false)} className="md:hidden text-gray-500">&times;</button>
          </div>
          <div className="space-y-2">
            {members.map(m => (
              <Link key={m.id} href={`/profile/${m.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/80 transition-all">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-romantic-400 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {m.name?.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{m.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{m.role}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200/50">
            <Link href={`/trip/${id}`} className="text-sm text-brand-600 hover:underline font-medium">← Back to Trip</Link>
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col h-[calc(100vh-64px)]">
          {/* Header */}
          <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMembers(!showMembers)} className="md:hidden w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">{groupName}</h2>
                <p className="text-xs text-gray-500">{members.length} members</p>
              </div>
            </div>
            <Link href={`/trip/${id}`} className="text-sm text-brand-600 hover:underline font-medium hidden sm:block">View Trip</Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">No messages yet. Start planning your trip together!</p>
              </div>
            )}
            {messages.map(msg => {
              const isMine = msg.sender.id === currentUserId;
              return (
                <div key={msg.id} className={`flex gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
                  {!isMine && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-romantic-400 flex items-center justify-center text-white font-bold text-xs shrink-0 self-end">
                      {msg.sender.name?.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className={`max-w-[70%] ${isMine ? 'order-first' : ''}`}>
                    {!isMine && <p className="text-xs text-gray-500 mb-0.5 ml-1">{msg.sender.name}</p>}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${isMine ? 'bg-gradient-to-r from-brand-500 to-romantic-500 text-white rounded-br-sm' : 'bg-white/70 backdrop-blur-sm border border-white/40 text-gray-800 rounded-bl-sm'}`}>
                      {msg.content}
                    </div>
                    <p className={`text-xs text-gray-400 mt-0.5 ${isMine ? 'text-right mr-1' : 'ml-1'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="px-4 py-3 border-t border-gray-200/50 bg-white/50 backdrop-blur-xl shrink-0">
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40 focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
              <button type="submit" disabled={!input.trim() || sending}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-500 to-romantic-500 flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-50 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
