export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

export async function GET(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get('tripId');

    if (tripId) {
      const group = await (prisma as any).tripGroup.findUnique({
        where: { tripId },
        include: {
          members: { include: { user: { select: { id: true, name: true, avatar: true, verified: true, rating: true } } } },
          trip: { select: { id: true, title: true, destination: true, userId: true } },
        },
      });
      return NextResponse.json({ group });
    }

    const memberships = await (prisma as any).tripMember.findMany({
      where: { userId },
      include: {
        group: {
          include: {
            trip: { select: { id: true, title: true, destination: true, startDate: true, endDate: true, status: true } },
            members: { include: { user: { select: { id: true, name: true, avatar: true } } } },
            messages: { orderBy: { createdAt: 'desc' }, take: 1, include: { sender: { select: { id: true, name: true } } } },
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    const groups = (memberships as any[]).map((m: any) => ({
      ...m.group,
      myRole: m.role,
      memberCount: m.group.members.length,
      lastMessage: m.group.messages[0] || null,
    }));

    return NextResponse.json({ groups });
  } catch (error) {
    console.error('Groups GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { tripId } = await req.json();
    if (!tripId) return NextResponse.json({ error: 'tripId required' }, { status: 400 });

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    if (trip.userId !== userId) return NextResponse.json({ error: 'Only trip owner can create group' }, { status: 403 });

    const existing = await (prisma as any).tripGroup.findUnique({ where: { tripId } });
    if (existing) return NextResponse.json({ group: existing });

    const group = await (prisma as any).tripGroup.create({
      data: {
        tripId,
        name: trip.title,
        members: { create: { userId, role: 'owner' } },
      },
      include: { members: { include: { user: { select: { id: true, name: true, avatar: true } } } } },
    });

    return NextResponse.json({ group }, { status: 201 });
  } catch (error) {
    console.error('Groups POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
