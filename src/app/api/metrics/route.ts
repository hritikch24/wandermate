import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;

  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const [scheme, token] = authHeader.split(' ');
    if (scheme === 'Bearer' && token === adminKey) return true;
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') === adminKey) return true;

  return false;
}

function serialize<T extends Record<string, unknown>>(arr: T[]): Record<string, unknown>[] {
  return arr.map((row) => {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(row)) {
      out[k] = typeof v === 'bigint' ? Number(v) : v;
    }
    return out;
  });
}

const TRACKED_ACTIONS = [
  'connect_request',
  'book_guide',
  'chat_start',
  'signup',
  'trip_create',
  'profile_view',
] as const;

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const hoursParam = searchParams.get('hours');
  const daysParam = parseInt(searchParams.get('days') || '30', 10);
  const totalHours = hoursParam
    ? Math.min(Math.max(1, parseInt(hoursParam, 10)), 8760)
    : Math.min(Math.max(1, daysParam), 365) * 24;
  const days = totalHours / 24;

  const since = new Date(Date.now() - totalHours * 60 * 60 * 1000);

  try {
    const [
      totalViews,
      uniqueSessionsResult,
      topPages,
      topReferrers,
      deviceBreakdown,
      browserBreakdown,
      countryBreakdown,
      topSubdomains,
      utmSources,
      dailyViews,

      totalActions,
      actionBreakdown,
      dailyActions,
      signupActionCount,

      totalUsers,
      newUsers,
      totalTrips,
      totalMessages,
      tripRequestsByStatus,
      topDestinations,
    ] = await Promise.all([
      // Traffic
      prisma.pageView.count({ where: { createdAt: { gte: since } } }),

      prisma.pageView.groupBy({
        by: ['sessionId'],
        where: { createdAt: { gte: since } },
      }),

      prisma.$queryRawUnsafe<{ path: string; views: bigint }[]>(
        `SELECT path, COUNT(*)::bigint as views FROM page_views WHERE "createdAt" >= $1 GROUP BY path ORDER BY views DESC LIMIT 20`,
        since
      ),

      prisma.$queryRawUnsafe<{ referrer: string; views: bigint }[]>(
        `SELECT referrer, COUNT(*)::bigint as views FROM page_views WHERE "createdAt" >= $1 AND referrer IS NOT NULL AND referrer != '' GROUP BY referrer ORDER BY views DESC LIMIT 15`,
        since
      ),

      prisma.$queryRawUnsafe<{ device: string; count: bigint }[]>(
        `SELECT COALESCE(device, 'unknown') as device, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 GROUP BY device ORDER BY count DESC`,
        since
      ),

      prisma.$queryRawUnsafe<{ browser: string; count: bigint }[]>(
        `SELECT COALESCE(browser, 'unknown') as browser, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 GROUP BY browser ORDER BY count DESC`,
        since
      ),

      prisma.$queryRawUnsafe<{ country: string; count: bigint }[]>(
        `SELECT COALESCE(country, 'unknown') as country, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 GROUP BY country ORDER BY count DESC LIMIT 15`,
        since
      ),

      prisma.$queryRawUnsafe<{ subdomain: string; count: bigint }[]>(
        `SELECT COALESCE(subdomain, 'main') as subdomain, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 GROUP BY subdomain ORDER BY count DESC LIMIT 15`,
        since
      ),

      prisma.$queryRawUnsafe<{ utm_source: string; count: bigint }[]>(
        `SELECT utm_source, COUNT(*)::bigint as count FROM page_views WHERE "createdAt" >= $1 AND utm_source IS NOT NULL GROUP BY utm_source ORDER BY count DESC LIMIT 10`,
        since
      ),

      prisma.$queryRawUnsafe<{ date: string; views: bigint }[]>(
        `SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') as date, COUNT(*)::bigint as views FROM page_views WHERE "createdAt" >= $1 GROUP BY date ORDER BY date ASC`,
        since
      ),

      // Engagement
      prisma.buttonClick.count({ where: { createdAt: { gte: since } } }),

      prisma.$queryRawUnsafe<{ action: string; count: bigint }[]>(
        `SELECT action, COUNT(*)::bigint as count FROM button_clicks WHERE "createdAt" >= $1 GROUP BY action ORDER BY count DESC`,
        since
      ),

      prisma.$queryRawUnsafe<{ date: string; count: bigint }[]>(
        `SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') as date, COUNT(*)::bigint as count FROM button_clicks WHERE "createdAt" >= $1 GROUP BY date ORDER BY date ASC`,
        since
      ),

      prisma.buttonClick.count({ where: { createdAt: { gte: since }, action: 'signup' } }),

      // Users / trips / messages / requests
      prisma.user.count(),

      prisma.user.count({ where: { createdAt: { gte: since } } }),

      prisma.trip.count(),

      prisma.message.count(),

      prisma.tripRequest.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),

      prisma.trip.groupBy({
        by: ['destination'],
        _count: { _all: true },
        orderBy: { _count: { destination: 'desc' } },
        take: 10,
      }),
    ]);

    const uniqueSessions = uniqueSessionsResult.length;

    const byAction = TRACKED_ACTIONS.map((action) => {
      const row = actionBreakdown.find((r: { action: string; count: unknown }) => r.action === action);
      return { action, count: row ? Number(row.count) : 0 };
    });

    const conversionRate = uniqueSessions > 0
      ? Number(((signupActionCount / uniqueSessions) * 100).toFixed(2))
      : 0;

    const requestStatusCounts = { pending: 0, accepted: 0, rejected: 0 };
    for (const row of tripRequestsByStatus) {
      const status = row.status as keyof typeof requestStatusCounts;
      if (status in requestStatusCounts) {
        requestStatusCounts[status] = row._count._all;
      }
    }
    const totalTripRequests = tripRequestsByStatus.reduce((sum: number, r: { _count: { _all: number } }) => sum + r._count._all, 0);

    return NextResponse.json({
      period: { days, since: since.toISOString() },
      traffic: {
        totalViews,
        uniqueSessions,
        topPages: serialize(topPages),
        topReferrers: serialize(topReferrers),
        devices: serialize(deviceBreakdown),
        browsers: serialize(browserBreakdown),
        countries: serialize(countryBreakdown),
        topSubdomains: serialize(topSubdomains),
        utmSources: serialize(utmSources),
        daily: serialize(dailyViews),
      },
      engagement: {
        totalActions,
        byAction,
        conversionRate,
        dailyActions: serialize(dailyActions),
      },
      users: {
        totalUsers,
        newUsers,
        totalTrips,
        totalMessages,
        totalTripRequests: {
          total: totalTripRequests,
          accepted: requestStatusCounts.accepted,
          pending: requestStatusCounts.pending,
          rejected: requestStatusCounts.rejected,
        },
        topDestinations: topDestinations.map((d: { destination: string; _count: { _all: number } }) => ({
          destination: d.destination,
          count: d._count._all,
        })),
      },
    });
  } catch (err) {
    console.error('[metrics] Error fetching metrics:', err);
    return NextResponse.json({ error: 'Failed to fetch metrics.' }, { status: 500 });
  }
}
