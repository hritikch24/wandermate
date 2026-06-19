import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { reviewSchema } from '@/lib/validations';
import { getCurrentUserId } from '@/lib/session';

// GET /api/reviews?userId=xxx — get reviews for a user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetId = searchParams.get('userId');

    if (!targetId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { targetId },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const avgRating = reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
      : 0;

    return NextResponse.json({ reviews, avgRating, total: reviews.length });
  } catch (error) {
    console.error('Reviews GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/reviews — leave a review
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (parsed.data.targetId === userId) {
      return NextResponse.json({ error: "You can't review yourself" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        authorId: userId,
        targetId: parsed.data.targetId,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
        tripCity: parsed.data.tripCity,
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
      },
    });

    // Update target user's average rating
    const allReviews = await prisma.review.findMany({ where: { targetId: parsed.data.targetId } });
    const avgRating = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length;
    await prisma.user.update({
      where: { id: parsed.data.targetId },
      data: { rating: Math.round(avgRating * 10) / 10 },
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error('Reviews POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
