import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Find user by username
    const user = await prisma.user.findUnique({
      where: {
        username: username
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        avatar: true,
        userID: true,
        isVerified: true,
        created_at: true,
        // Don't expose password
        // password: false
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user profile data
    const profileData = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      userID: user.userID,
      isVerified: user.isVerified,
      created_at: user.created_at.toISOString(),
      // Add some default/computed fields for now
      bio: null,
      skills: [],
      projectCount: 0
    };

    return NextResponse.json({ user: profileData });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 