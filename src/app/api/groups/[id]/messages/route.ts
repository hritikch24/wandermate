export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const before = searchParams.get('before');

    const member = await (prisma as any).tripMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });
    if (!member) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    const where: any = { groupId: id };
    if (before) where.id = { lt: before };

    const messages = await (prisma as any).groupMessage.findMany({
      where,
      include: { sender: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Group messages GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    const { content } = await req.json();

    if (!content || content.length < 1 || content.length > 2000) {
      return NextResponse.json({ error: 'Content must be 1-2000 characters' }, { status: 400 });
    }

    const member = await (prisma as any).tripMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });
    if (!member) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    const message = await (prisma as any).groupMessage.create({
      data: { groupId: id, senderId: userId, content },
      include: { sender: { select: { id: true, name: true, avatar: true } } },
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Group messages POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
