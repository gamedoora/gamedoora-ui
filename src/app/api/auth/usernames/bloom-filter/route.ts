import { NextResponse } from 'next/server';
import { BloomFilter } from '@/lib/bloomFilter';

// Initialize bloom filter with existing usernames
const existingUsernames = [
  'admin', 'john_doe', 'jane_smith', 'gamer123', 'developer', 'test_user',
  'example_user', 'demo_account', 'sample_user', 'game_dev', 'unity_dev',
  'pixel_art', 'code_master', 'game_maker', 'indie_dev', 'pro_gamer'
];

export async function GET() {
  try {
    // Create and populate bloom filter
    const bloomFilter = new BloomFilter(50000, 0.01);
    
    // Add all existing usernames to the bloom filter
    existingUsernames.forEach(username => {
      bloomFilter.add(username);
    });

    // Export the bloom filter state
    const bloomFilterData = bloomFilter.export();

    return NextResponse.json({
      bloomFilter: bloomFilterData,
      info: {
        totalUsernames: existingUsernames.length,
        falsePositiveRate: bloomFilter.getFalsePositiveProbability(),
        size: bloomFilterData.size,
        hashFunctions: bloomFilterData.hashFunctions
      }
    });

  } catch (error) {
    console.error('Bloom filter initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize bloom filter' },
      { status: 500 }
    );
  }
} 