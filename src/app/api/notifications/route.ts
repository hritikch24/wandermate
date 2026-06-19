import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

// GET /api/notifications — get count of pending items for the logged-in user
export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Count pending trip requests received (for trips the user owns)
    const pendingRequests = await prisma.tripRequest.count({
      where: {
        trip: { userId },
        status: 'pending',
      },
    });

    // Count accepted requests the user sent (good news notifications)
    const acceptedSent = await prisma.tripRequest.count({
      where: {
        userId,
        status: 'accepted',
      },
    });

    // Count pending bookings for guides owned by this user
    let pendingBookings = 0;
    const guide = await prisma.guide.findUnique({ where: { userId } });
    if (guide) {
      pendingBookings = await prisma.booking.count({
        where: {
          guideId: guide.id,
          status: 'pending',
        },
      });
    }

    return NextResponse.json({
      pendingRequests,
      acceptedSent,
      pendingBookings,
      total: pendingRequests + pendingBookings,
    });
  } catch (error) {
    console.error('Notifications GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
