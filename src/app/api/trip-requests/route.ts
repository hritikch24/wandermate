import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

export const dynamic = 'force-dynamic';

// GET /api/trip-requests — get requests for current user's trips or sent by current user
export async function GET(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'received'; // received | sent

    if (type === 'sent') {
      const requests = await prisma.tripRequest.findMany({
        where: { userId },
        include: {
          trip: {
            include: {
              user: { select: { id: true, name: true, avatar: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ requests });
    }

    // Get requests for trips owned by current user
    const requests = await prisma.tripRequest.findMany({
      where: { trip: { userId } },
      include: {
        user: { select: { id: true, name: true, avatar: true, bio: true, age: true, rating: true, verified: true, languages: true, tripsCount: true } },
        trip: { select: { id: true, title: true, destination: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('TripRequests GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/trip-requests — send a join request for a trip
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { tripId, message } = body;

    if (!tripId) {
      return NextResponse.json({ error: 'tripId is required' }, { status: 400 });
    }

    // Check trip exists and is open
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.status !== 'open') {
      return NextResponse.json({ error: 'Trip not found or not open' }, { status: 404 });
    }

    // Can't request your own trip
    if (trip.userId === userId) {
      return NextResponse.json({ error: "You can't request to join your own trip" }, { status: 400 });
    }

    // Check for existing request
    const existing = await prisma.tripRequest.findUnique({
      where: { tripId_userId: { tripId, userId } },
    });
    if (existing) {
      return NextResponse.json({ error: 'You already sent a request for this trip', status: existing.status }, { status: 409 });
    }

    const request = await prisma.tripRequest.create({
      data: { tripId, userId, message: message || null },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        trip: { select: { id: true, title: true, destination: true } },
      },
    });

    return NextResponse.json({ request }, { status: 201 });
  } catch (error) {
    console.error('TripRequests POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/trip-requests — accept or reject a request (trip owner only)
export async function PATCH(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { requestId, status } = body;

    if (!requestId || !['accepted', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'requestId and status (accepted/rejected) required' }, { status: 400 });
    }

    // Verify the current user owns the trip
    const tripRequest = await prisma.tripRequest.findUnique({
      where: { id: requestId },
      include: { trip: true },
    });

    if (!tripRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (tripRequest.trip.userId !== userId) {
      return NextResponse.json({ error: 'Only the trip owner can accept/reject requests' }, { status: 403 });
    }

    const updated = await prisma.tripRequest.update({
      where: { id: requestId },
      data: { status },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        trip: { select: { id: true, title: true, destination: true } },
      },
    });

    // Auto-manage group membership when a request is accepted
    if (status === 'accepted') {
      try {
        let group: any = await prisma.tripGroup.findUnique({
          where: { tripId: tripRequest.tripId },
        });

        if (!group) {
          // Create group with trip title and add trip owner as owner member
          group = await prisma.tripGroup.create({
            data: {
              tripId: tripRequest.tripId,
              name: tripRequest.trip.title,
              members: {
                create: { userId: tripRequest.trip.userId, role: 'owner' },
              },
            },
          });
        }

        // Add the accepted user as a member (ignore if already exists)
        await prisma.tripMember.upsert({
          where: {
            groupId_userId: { groupId: group.id, userId: tripRequest.userId },
          },
          update: {},
          create: {
            groupId: group.id,
            userId: tripRequest.userId,
            role: 'member',
          },
        });
      } catch (groupError) {
        // Log but don't fail the request acceptance
        console.error('Auto-group creation error:', groupError);
      }
    }

    return NextResponse.json({ request: updated });
  } catch (error) {
    console.error('TripRequests PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
