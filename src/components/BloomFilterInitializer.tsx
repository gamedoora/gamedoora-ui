'use client';

import { useEffect } from 'react';
import { initializeUsernameBloomFilter } from '@/lib/usernameValidation';

export default function BloomFilterInitializer() {
  useEffect(() => {
    // Initialize bloom filter on app startup
    initializeUsernameBloomFilter();
  }, []);

  return null; // This component doesn't render anything
} 