export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    const group: any = await (prisma as any).tripGroup.findUnique({
      where: { id },
      include: {
        trip: { select: { id: true, title: true, destination: true, startDate: true, endDate: true, budget: true, groupSize: true, userId: true, status: true } },
        members: {
          include: { user: { select: { id: true, name: true, avatar: true, bio: true, verified: true, rating: true, travelStyle: true } } },
          orderBy: { joinedAt: 'asc' },
        },
        _count: { select: { messages: true } },
      },
    });

    if (!group) return NextResponse.json({ error: 'Group not found' }, { status: 404 });

    const isMember = group.members.some((m: any) => m.userId === userId);
    if (!isMember) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    return NextResponse.json({ group });
  } catch (error) {
    console.error('Group GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    const { userId: newMemberId } = await req.json();
    if (!newMemberId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const group: any = await (prisma as any).tripGroup.findUnique({
      where: { id },
      include: { members: true, trip: true },
    });

    if (!group) return NextResponse.json({ error: 'Group not found' }, { status: 404 });

    const isOwner = group.members.some((m: any) => m.userId === userId && m.role === 'owner');
    if (!isOwner) return NextResponse.json({ error: 'Only group owner can add members' }, { status: 403 });

    const hasAcceptedRequest = await prisma.tripRequest.findFirst({
      where: { tripId: group.tripId, userId: newMemberId, status: 'accepted' },
    });
    if (!hasAcceptedRequest) return NextResponse.json({ error: 'User must have an accepted request' }, { status: 400 });

    const member = await (prisma as any).tripMember.upsert({
      where: { groupId_userId: { groupId: id, userId: newMemberId } },
      update: {},
      create: { groupId: id, userId: newMemberId, role: 'member' },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });

    return NextResponse.json({ member }, { status: 201 });
  } catch (error) {
    console.error('Group POST member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
