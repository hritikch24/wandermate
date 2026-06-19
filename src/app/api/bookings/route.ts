import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { bookingSchema } from '@/lib/validations';
import { getCurrentUserId } from '@/lib/session';

// GET /api/bookings — get user's bookings
export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        guide: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Bookings GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/bookings — book a guide
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const guide = await prisma.guide.findUnique({ where: { id: parsed.data.guideId } });
    if (!guide || !guide.active) {
      return NextResponse.json({ error: 'Guide not found or inactive' }, { status: 404 });
    }

    if (guide.userId === userId) {
      return NextResponse.json({ error: "You can't book yourself" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        guideId: parsed.data.guideId,
        startDate: new Date(parsed.data.startDate),
        endDate: new Date(parsed.data.endDate),
        notes: parsed.data.notes,
      },
      include: {
        guide: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Bookings POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
