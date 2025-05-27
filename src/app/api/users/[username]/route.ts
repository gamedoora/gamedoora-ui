import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    console.log('GET /api/users/[username] - username:', username);

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Find user by username
    console.log('Searching for user with username:', username);
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
        github: true,
        bio: true,
        userID: true,
        isVerified: true,
        created_at: true,
        // Don't expose password
        // password: false
      }
    });

    console.log('Found user:', user);

    if (!user) {
      console.log('User not found for username:', username);
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
      github: user.github || null,
      bio: user.bio || null,
      userID: user.userID,
      isVerified: user.isVerified,
      created_at: user.created_at.toISOString(),
      // Add some default/computed fields for now
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
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const body = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Find user to ensure they exist
    const existingUser = await prisma.user.findUnique({
      where: { username: username }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { username: username },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        bio: body.bio,
        avatar: body.avatar,
        github: body.github,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        avatar: true,
        github: true,
        bio: true,
        userID: true,
        isVerified: true,
        created_at: true,
      }
    });

    const profileData = {
      id: updatedUser.id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      avatar: updatedUser.avatar,
      github: updatedUser.github || null,
      bio: updatedUser.bio || null,
      userID: updatedUser.userID,
      isVerified: updatedUser.isVerified,
      created_at: updatedUser.created_at.toISOString(),
      skills: [],
      projectCount: 0
    };

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      user: profileData 
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 