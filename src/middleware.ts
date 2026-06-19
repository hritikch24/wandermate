import { NextRequest, NextResponse } from 'next/server';
import { CITY_SLUGS } from './data/cities';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Extract subdomain: e.g. "mussoorie.wandermate.com" → "mussoorie"
  // Also handles local dev: "mussoorie.localhost:3000" → "mussoorie"
  let subdomain: string | null = null;

  if (hostname.includes('.wandermate.com')) {
    subdomain = hostname.split('.wandermate.com')[0];
  } else if (hostname.includes('.localhost')) {
    subdomain = hostname.split('.localhost')[0];
  }

  // Validate subdomain is a known city
  if (subdomain && CITY_SLUGS.includes(subdomain)) {
    // Rewrite to city page
    url.pathname = `/city/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
