import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/session';

// POST /api/verify/aadhaar — initiate or complete Aadhaar verification
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { action, aadhaarNumber, otp } = await req.json();

    if (action === 'send-otp') {
      // Validate Aadhaar format (12 digits)
      if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
        return NextResponse.json({ error: 'Enter a valid 12-digit Aadhaar number' }, { status: 400 });
      }

      // In production: call UIDAI/DigiLocker API to send OTP
      // Demo mode: OTP is always 123456
      const otpCode = process.env.AADHAAR_API_KEY ? Math.floor(100000 + Math.random() * 900000).toString() : '123456';
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await prisma.phoneOtp.deleteMany({ where: { phone: aadhaarNumber, purpose: 'aadhaar' } });
      await prisma.phoneOtp.create({
        data: { phone: aadhaarNumber, otp: otpCode, purpose: 'aadhaar', expiresAt },
      });

      return NextResponse.json({
        success: true,
        message: process.env.AADHAAR_API_KEY ? 'OTP sent to Aadhaar-linked mobile' : 'Demo mode: Use OTP 123456',
        demo: !process.env.AADHAAR_API_KEY,
      });
    }

    if (action === 'verify-otp') {
      if (!aadhaarNumber || !otp) {
        return NextResponse.json({ error: 'Aadhaar number and OTP required' }, { status: 400 });
      }

      const record = await prisma.phoneOtp.findFirst({
        where: { phone: aadhaarNumber, purpose: 'aadhaar', verified: false },
        orderBy: { createdAt: 'desc' },
      });

      if (!record) return NextResponse.json({ error: 'No OTP found' }, { status: 404 });
      if (new Date() > record.expiresAt) return NextResponse.json({ error: 'OTP expired' }, { status: 410 });
      if (record.otp !== otp) return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });

      // Mark OTP verified
      await prisma.phoneOtp.update({ where: { id: record.id }, data: { verified: true } });

      // Mark user as Aadhaar verified + give blue tick
      await prisma.user.update({
        where: { id: userId },
        data: { aadhaarVerified: true, verified: true },
      });

      // Clean up
      await prisma.phoneOtp.deleteMany({ where: { phone: aadhaarNumber, purpose: 'aadhaar' } });

      return NextResponse.json({ success: true, verified: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Aadhaar verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
