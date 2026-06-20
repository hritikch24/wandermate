import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { messageSchema } from '@/lib/validations';
import { getCurrentUserId } from '@/lib/session';

// GET /api/messages — get conversations for current user
export async function GET(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const withUserId = searchParams.get('with');

    if (withUserId) {
      // Get messages between two users
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: withUserId },
            { senderId: withUserId, receiverId: userId },
          ],
        },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true, content: true, createdAt: true, read: true, senderId: true, receiverId: true,
          sender: { select: { id: true, name: true, avatar: true } },
        },
      });

      // Mark received messages as read
      await prisma.message.updateMany({
        where: { senderId: withUserId, receiverId: userId, read: false },
        data: { read: true },
      });

      return NextResponse.json({ messages });
    }

    // Get all conversation partners with last message
    const conversations = await prisma.message.findMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        receiver: { select: { id: true, name: true, avatar: true } },
      },
    });

    // Group by conversation partner
    const seen = new Set<string>();
    const uniqueConversations = conversations.filter((msg: any) => {
      const partnerId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (seen.has(partnerId)) return false;
      seen.add(partnerId);
      return true;
    }).map((msg: any) => ({
      partner: msg.senderId === userId ? msg.receiver : msg.sender,
      lastMessage: msg.content,
      lastMessageAt: msg.createdAt,
      unread: msg.senderId !== userId && !msg.read,
    }));

    return NextResponse.json({ conversations: uniqueConversations });
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/messages — send a message
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = messageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (parsed.data.receiverId === userId) {
      return NextResponse.json({ error: "You can't message yourself" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        senderId: userId,
        receiverId: parsed.data.receiverId,
        content: parsed.data.content,
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
      },
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Messages POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
