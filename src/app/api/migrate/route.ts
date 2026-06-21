export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/migrate — run schema migrations via raw SQL
// Protected by a secret key to prevent unauthorized access
export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json();

    const expectedSecret = process.env.MIGRATE_SECRET || 'luventra-migrate-2026';
    if (secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results: string[] = [];

    // Create TripGroup table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "trip_groups" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "tripId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "trip_groups_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "trip_groups_tripId_key" UNIQUE ("tripId"),
        CONSTRAINT "trip_groups_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
    results.push('trip_groups created');

    // Create TripMember table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "trip_members" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "groupId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'member',
        "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "trip_members_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "trip_members_groupId_userId_key" UNIQUE ("groupId", "userId"),
        CONSTRAINT "trip_members_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "trip_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "trip_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
    results.push('trip_members created');

    // Create GroupMessage table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "group_messages" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "groupId" TEXT NOT NULL,
        "senderId" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "group_messages_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "group_messages_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "trip_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "group_messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
    results.push('group_messages created');

    // Create Report table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "reports" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "reporterId" TEXT NOT NULL,
        "reportedId" TEXT NOT NULL,
        "reason" TEXT NOT NULL,
        "details" TEXT,
        "status" TEXT NOT NULL DEFAULT 'pending',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "reports_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "reports_reportedId_fkey" FOREIGN KEY ("reportedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
    results.push('reports created');

    // Create Block table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "blocks" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "blockerId" TEXT NOT NULL,
        "blockedId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "blocks_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "blocks_blockerId_blockedId_key" UNIQUE ("blockerId", "blockedId"),
        CONSTRAINT "blocks_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
    results.push('blocks created');

    // Create indexes
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "trip_groups_tripId_idx" ON "trip_groups"("tripId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "trip_members_groupId_idx" ON "trip_members"("groupId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "trip_members_userId_idx" ON "trip_members"("userId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "group_messages_groupId_idx" ON "group_messages"("groupId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "group_messages_senderId_idx" ON "group_messages"("senderId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "group_messages_createdAt_idx" ON "group_messages"("createdAt")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "reports_reporterId_idx" ON "reports"("reporterId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "reports_reportedId_idx" ON "reports"("reportedId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "reports_status_idx" ON "reports"("status")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "blocks_blockerId_idx" ON "blocks"("blockerId")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "blocks_blockedId_idx" ON "blocks"("blockedId")`);
    results.push('All indexes created');

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: error.message || 'Migration failed' }, { status: 500 });
  }
}
