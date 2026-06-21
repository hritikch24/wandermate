export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const blocks = await (prisma as any).block.findMany({
      where: { blockerId: userId },
      include: { blocked: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ blocks });
  } catch (error) {
    console.error('Block GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { blockedId } = await req.json();
    if (!blockedId) return NextResponse.json({ error: 'blockedId required' }, { status: 400 });
    if (blockedId === userId) return NextResponse.json({ error: 'Cannot block yourself' }, { status: 400 });

    const existing = await (prisma as any).block.findUnique({
      where: { blockerId_blockedId: { blockerId: userId, blockedId } },
    });
    if (existing) return NextResponse.json({ message: 'Already blocked' });

    await (prisma as any).block.create({ data: { blockerId: userId, blockedId } });
    return NextResponse.json({ message: 'User blocked' }, { status: 201 });
  } catch (error) {
    console.error('Block POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { blockedId } = await req.json();
    if (!blockedId) return NextResponse.json({ error: 'blockedId required' }, { status: 400 });

    await (prisma as any).block.deleteMany({ where: { blockerId: userId, blockedId } });
    return NextResponse.json({ message: 'User unblocked' });
  } catch (error) {
    console.error('Block DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
