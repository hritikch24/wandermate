import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { tripSchema } from '@/lib/validations';
import { getCurrentUserId } from '@/lib/session';

// GET /api/trips — list trips with optional filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get('destination');
    const sponsorType = searchParams.get('sponsorType');
    const status = searchParams.get('status') || 'open';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: Record<string, unknown> = { status };
    if (destination) where.destination = destination;
    if (sponsorType) where.sponsorType = sponsorType;

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        include: {
          user: {
            select: {
              id: true, name: true, avatar: true, age: true, bio: true,
              travelStyle: true, languages: true, verified: true, rating: true,
              tripsCount: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.trip.count({ where }),
    ]);

    // Parse JSON fields
    const formatted = trips.map((t: any) => ({
      ...t,
      interests: JSON.parse(t.interests),
      user: {
        ...t.user,
        languages: JSON.parse(t.user.languages),
      },
    }));

    return NextResponse.json({ trips: formatted, total, limit, offset });
  } catch (error) {
    console.error('Trips GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/trips — create a new trip (auth required)
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = tripSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const trip = await prisma.trip.create({
      data: {
        userId,
        destination: data.destination,
        title: data.title,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        sponsorType: data.sponsorType,
        budget: data.budget,
        groupSize: data.groupSize,
        accommodation: data.accommodation,
        interests: JSON.stringify(data.interests),
      },
      include: {
        user: {
          select: { id: true, name: true, avatar: true, verified: true },
        },
      },
    });

    return NextResponse.json({ trip }, { status: 201 });
  } catch (error) {
    console.error('Trips POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
