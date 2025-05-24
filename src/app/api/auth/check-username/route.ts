import { NextRequest, NextResponse } from 'next/server';
import { generateUsernameSuggestions } from '@/lib/usernameValidation';

// Mock database - in a real app, this would be your actual database
const existingUsernames = new Set([
  'admin', 'john_doe', 'jane_smith', 'gamer123', 'developer', 'test_user',
  'example_user', 'demo_account', 'sample_user', 'game_dev', 'unity_dev'
]);

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Check if username exists (case-insensitive)
    const exists = existingUsernames.has(username.toLowerCase());

    if (exists) {
      // Generate suggestions if username is taken
      const suggestions = generateUsernameSuggestions(username);
      
      return NextResponse.json({
        exists: true,
        suggestions: suggestions
      });
    }

    return NextResponse.json({
      exists: false,
      available: true
    });

  } catch (error) {
    console.error('Username check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to add username to mock database (for testing)
export async function PUT(request: NextRequest) {
  try {
    const { username } = await request.json();
    
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    existingUsernames.add(username.toLowerCase());
    
    return NextResponse.json({
      success: true,
      message: 'Username added successfully'
    });

  } catch (error) {
    console.error('Username add error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 