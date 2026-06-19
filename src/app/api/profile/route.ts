import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { profileSchema } from '@/lib/validations';
import { getCurrentUserId } from '@/lib/session';

// GET /api/profile — get current user profile
export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, name: true, email: true, avatar: true, bio: true, age: true,
        phone: true, languages: true, interests: true, travelStyle: true,
        instagram: true, facebook: true, twitter: true, linkedin: true,
        verified: true, rating: true, tripsCount: true, createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...user,
      languages: JSON.parse(user.languages),
      interests: JSON.parse(user.interests),
    });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/profile — update profile
export async function PATCH(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    const data = parsed.data;

    if (data.name !== undefined) updateData.name = data.name;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.age !== undefined) updateData.age = data.age;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.travelStyle !== undefined) updateData.travelStyle = data.travelStyle;
    if (data.languages !== undefined) updateData.languages = JSON.stringify(data.languages);
    if (data.interests !== undefined) updateData.interests = JSON.stringify(data.interests);
    if (data.instagram !== undefined) updateData.instagram = data.instagram;
    if (data.facebook !== undefined) updateData.facebook = data.facebook;
    if (data.twitter !== undefined) updateData.twitter = data.twitter;
    if (data.linkedin !== undefined) updateData.linkedin = data.linkedin;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true, name: true, email: true, avatar: true, bio: true, age: true,
        travelStyle: true, languages: true, interests: true,
        instagram: true, facebook: true, twitter: true, linkedin: true,
        verified: true, rating: true, tripsCount: true,
      },
    });

    return NextResponse.json({
      ...user,
      languages: JSON.parse(user.languages),
      interests: JSON.parse(user.interests),
    });
  } catch (error) {
    console.error('Profile PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
