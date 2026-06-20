import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

export const dynamic = 'force-dynamic';

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

    // Count unread messages
    const unreadMessages = await prisma.message.count({
      where: {
        receiverId: userId,
        read: false,
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
      unreadMessages,
      pendingBookings,
      total: pendingRequests + unreadMessages + pendingBookings,
    });
  } catch (error) {
    console.error('Notifications GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
