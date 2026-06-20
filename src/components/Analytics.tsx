'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function getSessionId(): string {
  const key = 'luv_sid';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

function getDevice(): string {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  return 'Other';
}

function getSubdomain(): string | null {
  const hostname = window.location.hostname;

  if (hostname.includes('.luventra.com')) {
    const sub = hostname.split('.luventra.com')[0];
    return sub && sub !== 'www' ? sub : null;
  }

  if (hostname.includes('.luventra.co')) {
    const sub = hostname.split('.luventra.co')[0];
    return sub && sub !== 'www' ? sub : null;
  }

  if (hostname.includes('.localhost')) {
    const sub = hostname.split('.localhost')[0];
    return sub && sub !== 'www' ? sub : null;
  }

  return null;
}

function sendTrackingPayload(url: string, payload: Record<string, unknown>): void {
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(url, blob);
  } else {
    fetch(url, {
      method: 'POST',
      body,
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {});
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef('');

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith('/metrics') || pathname.startsWith('/api')) return;

    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    if (fullPath === lastTracked.current) return;
    lastTracked.current = fullPath;

    const payload = {
      path: pathname,
      referrer: document.referrer || null,
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      device: getDevice(),
      browser: getBrowser(),
      sessionId: getSessionId(),
      subdomain: getSubdomain(),
    };

    sendTrackingPayload('/api/track', payload);
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest('[data-track]') as HTMLElement | null;
      if (!target) return;

      const action = target.getAttribute('data-track');
      if (!action) return;

      const targetId =
        target.getAttribute('data-track-id') ||
        target.id ||
        null;

      const payload = {
        action,
        page: pathname || window.location.pathname,
        targetId,
        referrer: document.referrer || null,
        utmSource: searchParams.get('utm_source'),
        utmMedium: searchParams.get('utm_medium'),
        utmCampaign: searchParams.get('utm_campaign'),
        device: getDevice(),
        browser: getBrowser(),
        sessionId: getSessionId(),
        subdomain: getSubdomain(),
      };

      sendTrackingPayload('/api/track-action', payload);
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname, searchParams]);

  return null;
}
