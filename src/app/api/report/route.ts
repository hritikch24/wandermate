export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

const VALID_REASONS = ['harassment', 'fake_profile', 'scam', 'inappropriate', 'safety_concern', 'other'];

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { reportedId, reason, details } = await req.json();

    if (!reportedId || !reason) return NextResponse.json({ error: 'reportedId and reason required' }, { status: 400 });
    if (!VALID_REASONS.includes(reason)) return NextResponse.json({ error: 'Invalid reason' }, { status: 400 });
    if (reportedId === userId) return NextResponse.json({ error: 'Cannot report yourself' }, { status: 400 });

    const existing = await (prisma as any).report.findFirst({
      where: { reporterId: userId, reportedId, status: 'pending' },
    });
    if (existing) return NextResponse.json({ error: 'You already have a pending report for this user' }, { status: 409 });

    const report = await (prisma as any).report.create({
      data: { reporterId: userId, reportedId, reason, details: details || null },
    });

    return NextResponse.json({ report, message: 'Report submitted. We will review it within 24 hours.' }, { status: 201 });
  } catch (error) {
    console.error('Report POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
