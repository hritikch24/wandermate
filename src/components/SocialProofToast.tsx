'use client';

import { useState, useEffect, useCallback } from 'react';

const MESSAGES = [
  'Priya from Mumbai just found a travel partner for Goa!',
  'Rahul booked a trip to Ladakh with 2 companions!',
  '15 travelers are exploring Kerala trips right now!',
  'Ananya from Delhi matched with a travel group for Rajasthan!',
  'Vikram just planned a weekend getaway to Himachal!',
  'Sneha from Bangalore found 3 travel buddies for Northeast India!',
  '22 people are viewing Goa trips right now!',
  'Arjun from Hyderabad just booked a Kerala houseboat trip!',
  'Meera and her group are heading to Jaipur next week!',
  'Karthik from Chennai found a travel partner for Ladakh!',
  'Pooja just joined a group trip to Manali!',
  '8 new travelers signed up in the last hour!',
  'Rohit from Pune is exploring Meghalaya with 2 friends!',
];

export default function SocialProofToast() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [lastIndex, setLastIndex] = useState(-1);

  const showToast = useCallback(() => {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * MESSAGES.length);
    } while (idx === lastIndex);

    setLastIndex(idx);
    setCurrentMessage(MESSAGES[idx]);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 4000);
  }, [lastIndex]);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 10000; // 15-25 seconds
      return setTimeout(() => {
        showToast();
        timerRef = scheduleNext();
      }, delay);
    };

    let timerRef = scheduleNext();

    return () => clearTimeout(timerRef);
  }, [showToast]);

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <div
        className={`bg-white/90 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-xl border border-white/30 flex items-center gap-3 max-w-sm transition-all duration-300 ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Pulsing green dot */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>

        <p className="text-sm text-gray-700">{currentMessage}</p>
      </div>
    </div>
  );
}
