import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const {
      action,
      page,
      targetId,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      device,
      browser,
      sessionId,
      subdomain,
    } = body;

    if (!action || !page || !sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const country = request.headers.get('x-vercel-ip-country') || null;
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || null;

    await prisma.buttonClick.create({
      data: {
        action: String(action).slice(0, 100),
        page: String(page).slice(0, 500),
        targetId: targetId ? String(targetId).slice(0, 200) : null,
        referrer: referrer ? String(referrer).slice(0, 1000) : null,
        utmSource: utmSource ? String(utmSource).slice(0, 200) : null,
        utmMedium: utmMedium ? String(utmMedium).slice(0, 200) : null,
        utmCampaign: utmCampaign ? String(utmCampaign).slice(0, 200) : null,
        device: device ? String(device).slice(0, 50) : null,
        browser: browser ? String(browser).slice(0, 50) : null,
        country,
        ip: ip ? String(ip).slice(0, 45) : null,
        sessionId: String(sessionId).slice(0, 100),
        subdomain: subdomain ? String(subdomain).slice(0, 100) : null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[track-action] Error recording button click:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
