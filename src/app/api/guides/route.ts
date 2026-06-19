import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { guideSchema } from '@/lib/validations';
import { getCurrentUserId } from '@/lib/session';

// GET /api/guides — list guides with optional city filter
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: Record<string, unknown> = { active: true };
    if (city) where.city = city;

    const [guides, total] = await Promise.all([
      prisma.guide.findMany({
        where,
        include: {
          user: {
            select: {
              id: true, name: true, avatar: true, age: true, bio: true,
              languages: true, verified: true, rating: true,
            },
          },
        },
        orderBy: { toursCompleted: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.guide.count({ where }),
    ]);

    const formatted = guides.map((g: any) => ({
      ...g,
      expertise: JSON.parse(g.expertise),
      user: { ...g.user, languages: JSON.parse(g.user.languages) },
    }));

    return NextResponse.json({ guides: formatted, total, limit, offset });
  } catch (error) {
    console.error('Guides GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/guides — register as a guide (auth required)
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await prisma.guide.findUnique({ where: { userId } });
    if (existing) {
      return NextResponse.json({ error: 'You already have a guide profile' }, { status: 409 });
    }

    const body = await req.json();
    const parsed = guideSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const guide = await prisma.guide.create({
      data: {
        userId,
        speciality: data.speciality,
        city: data.city,
        pricePerDay: data.pricePerDay,
        expertise: JSON.stringify(data.expertise),
        localSince: data.localSince,
        availability: data.availability,
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
    });

    return NextResponse.json({ guide }, { status: 201 });
  } catch (error) {
    console.error('Guides POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
