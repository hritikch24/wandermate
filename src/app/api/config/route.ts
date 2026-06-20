import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/config — public config flags
export async function GET() {
  return NextResponse.json({
    requirePhoneOtp: process.env.REQUIRE_PHONE_OTP === 'true',
    requireAadhaar: false, // Always optional
  });
}
