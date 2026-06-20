import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/otp/verify — verify OTP
export async function POST(req: NextRequest) {
  try {
    const { phone, otp, purpose = 'register' } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP required' }, { status: 400 });
    }

    const record = await prisma.phoneOtp.findFirst({
      where: { phone, purpose, verified: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) {
      return NextResponse.json({ error: 'No OTP found. Please request a new one.' }, { status: 404 });
    }

    if (new Date() > record.expiresAt) {
      return NextResponse.json({ error: 'OTP expired. Please request a new one.' }, { status: 410 });
    }

    if (record.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Mark as verified
    await prisma.phoneOtp.update({
      where: { id: record.id },
      data: { verified: true },
    });

    return NextResponse.json({ success: true, verified: true });
  } catch (error) {
    console.error('OTP verify error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
