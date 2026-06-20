import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

// POST /api/profile/avatar — upload profile picture as base64
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { avatar } = await req.json();

    if (!avatar || typeof avatar !== 'string') {
      return NextResponse.json({ error: 'Avatar data required' }, { status: 400 });
    }

    // Validate it's a data URL (base64 image)
    if (!avatar.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }

    // Check size (max ~2MB base64 = ~2.7MB string)
    if (avatar.length > 3 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image too large. Max 2MB.' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { avatar },
    });

    return NextResponse.json({ success: true, avatar });
  } catch (error) {
    console.error('Avatar upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
