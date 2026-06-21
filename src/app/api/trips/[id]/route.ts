export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const userId = await getCurrentUserId().catch(() => null);

    const trip: any = await prisma.trip.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true, bio: true, age: true, verified: true, rating: true, tripsCount: true, travelStyle: true, languages: true } },
        requests: userId ? {
          where: { userId },
          select: { id: true, status: true, message: true, createdAt: true },
        } : false,
      },
    });

    if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });

    const group: any = await (prisma as any).tripGroup.findUnique({
      where: { tripId: id },
      include: {
        members: { include: { user: { select: { id: true, name: true, avatar: true, verified: true, rating: true } } } },
        _count: { select: { messages: true } },
      },
    });

    const formatted = {
      ...trip,
      interests: JSON.parse(trip.interests || '[]'),
      user: { ...trip.user, languages: JSON.parse(trip.user.languages || '[]') },
      group: group ? {
        id: group.id,
        name: group.name,
        members: group.members.map((m: any) => ({ ...m.user, role: m.role })),
        messageCount: group._count.messages,
      } : null,
      myRequest: trip.requests?.[0] || null,
      isOwner: userId === trip.userId,
    };

    return NextResponse.json({ trip: formatted });
  } catch (error) {
    console.error('Trip GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
