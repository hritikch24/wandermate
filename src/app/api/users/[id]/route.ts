import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

// GET /api/users/[id] — get public profile of a user
// If the viewer is "connected" (accepted request), show contact details
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true, name: true, avatar: true, bio: true, age: true,
        travelStyle: true, languages: true, interests: true,
        instagram: true, facebook: true, twitter: true, linkedin: true,
        verified: true, rating: true, tripsCount: true, createdAt: true,
        // Don't expose email/phone by default
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const profile: Record<string, unknown> = {
      ...user,
      languages: JSON.parse(user.languages),
      interests: JSON.parse(user.interests),
    };

    // Check if current viewer is "connected" to this user
    const viewerId = await getCurrentUserId();
    let isConnected = false;

    if (viewerId && viewerId !== params.id) {
      // Connected = there's an accepted trip request between them
      const connection = await prisma.tripRequest.findFirst({
        where: {
          status: 'accepted',
          OR: [
            // Viewer sent request to a trip owned by this user
            { userId: viewerId, trip: { userId: params.id } },
            // This user sent request to a trip owned by viewer
            { userId: params.id, trip: { userId: viewerId } },
          ],
        },
      });
      isConnected = !!connection;
    }

    if (isConnected) {
      // Reveal contact details for connected users
      const fullUser = await prisma.user.findUnique({
        where: { id: params.id },
        select: { email: true, phone: true },
      });
      profile.email = fullUser?.email;
      profile.phone = fullUser?.phone;
      profile.isConnected = true;
    } else {
      profile.isConnected = false;
    }

    // Get user's active trips
    const trips = await prisma.trip.findMany({
      where: { userId: params.id, status: 'open' },
      select: { id: true, title: true, destination: true, startDate: true, endDate: true, sponsorType: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    profile.trips = trips;

    // Get reviews received
    const reviews = await prisma.review.findMany({
      where: { targetId: params.id },
      include: { author: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    profile.reviews = reviews;

    return NextResponse.json(profile);
  } catch (error) {
    console.error('User profile GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
