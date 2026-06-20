import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/otp/send — send OTP to phone number
export async function POST(req: NextRequest) {
  try {
    const { phone, purpose = 'register' } = await req.json();

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: 'Enter a valid 10-digit Indian mobile number' }, { status: 400 });
    }

    // For registration, check if phone already exists
    if (purpose === 'register') {
      const existing = await prisma.user.findFirst({ where: { phone } });
      if (existing) {
        return NextResponse.json({ error: 'Phone number already registered' }, { status: 409 });
      }
    }

    // Generate 6-digit OTP (in production, use Twilio/MSG91)
    // Demo mode: OTP is always 123456
    const otp = process.env.SMS_API_KEY ? Math.floor(100000 + Math.random() * 900000).toString() : '123456';
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete old OTPs for this phone+purpose
    await prisma.phoneOtp.deleteMany({ where: { phone, purpose } });

    // Save new OTP
    await prisma.phoneOtp.create({
      data: { phone, otp, purpose, expiresAt },
    });

    // In production, send SMS here via Twilio/MSG91
    // For demo, OTP is 123456

    return NextResponse.json({
      success: true,
      message: process.env.SMS_API_KEY ? 'OTP sent to your phone' : 'Demo mode: Use OTP 123456',
      demo: !process.env.SMS_API_KEY,
    });
  } catch (error) {
    console.error('OTP send error:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
