import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { registerSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password, age, phone } = parsed.data;

    const requirePhoneOtp = process.env.REQUIRE_PHONE_OTP === 'true';

    if (requirePhoneOtp) {
      if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
        return NextResponse.json({ error: 'Valid 10-digit mobile number is required' }, { status: 400 });
      }

      // Check phone OTP was verified
      const otpRecord = await prisma.phoneOtp.findFirst({
        where: { phone, purpose: 'register', verified: true },
        orderBy: { createdAt: 'desc' },
      });
      if (!otpRecord) {
        return NextResponse.json({ error: 'Phone number not verified. Please verify OTP first.' }, { status: 400 });
      }
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    if (requirePhoneOtp && phone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone } });
      if (existingPhone) {
        return NextResponse.json({ error: 'Phone number already registered' }, { status: 409 });
      }
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name, email, passwordHash, age,
        phone: phone || `unset-${Date.now()}`,
        phoneVerified: requirePhoneOtp,
      },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    // Clean up used OTP
    if (requirePhoneOtp && phone) {
      await prisma.phoneOtp.deleteMany({ where: { phone, purpose: 'register' } });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
