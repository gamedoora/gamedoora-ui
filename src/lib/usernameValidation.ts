import { usernameBloomFilter } from './bloomFilter';

/**
 * Username validation rules and utilities
 */

export interface UsernameValidationResult {
  isValid: boolean;
  error?: string;
  suggestions?: string[];
}

/**
 * Validate username format
 */
export const validateUsernameFormat = (username: string): UsernameValidationResult => {
  // Check if username is provided
  if (!username || username.trim().length === 0) {
    return { isValid: false, error: 'Username is required' };
  }

  // Check length (3-20 characters)
  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters long' };
  }

  if (username.length > 20) {
    return { isValid: false, error: 'Username must be no more than 20 characters long' };
  }

  // Check for spaces
  if (username.includes(' ')) {
    return { isValid: false, error: 'Username cannot contain spaces' };
  }

  // Check for valid characters (alphanumeric, underscore, hyphen)
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  if (!validPattern.test(username)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
  }

  // Check if it starts with a letter or number
  const startsWithAlphanumeric = /^[a-zA-Z0-9]/;
  if (!startsWithAlphanumeric.test(username)) {
    return { isValid: false, error: 'Username must start with a letter or number' };
  }

  // Check for consecutive special characters
  if (username.includes('__') || username.includes('--') || username.includes('_-') || username.includes('-_')) {
    return { isValid: false, error: 'Username cannot have consecutive special characters' };
  }

  // Check for reserved usernames
  const reservedUsernames = [
    'admin', 'administrator', 'root', 'api', 'www', 'mail', 'email', 'support',
    'help', 'info', 'contact', 'about', 'blog', 'news', 'terms', 'privacy',
    'login', 'signup', 'signin', 'register', 'auth', 'profile', 'user', 'users',
    'account', 'settings', 'dashboard', 'home', 'index', 'null', 'undefined',
    'true', 'false', 'test', 'demo', 'sample', 'example', 'temp', 'temporary',
    'anonymous', 'guest', 'public', 'private', 'system', 'official', 'verified'
  ];

  if (reservedUsernames.includes(username.toLowerCase())) {
    return { isValid: false, error: 'This username is reserved and cannot be used' };
  }

  return { isValid: true };
};

/**
 * Check username availability using bloom filter + database verification
 */
export const checkUsernameAvailability = async (username: string): Promise<UsernameValidationResult> => {
  // First check format
  const formatValidation = validateUsernameFormat(username);
  if (!formatValidation.isValid) {
    return formatValidation;
  }

  try {
    // Step 1: Quick bloom filter check
    const mightExist = usernameBloomFilter.mightExist(username);
    
    if (!mightExist) {
      // Bloom filter says it definitely doesn't exist - safe to use
      return { isValid: true };
    }

    // Step 2: Bloom filter says it might exist - check database
    const response = await fetch('/api/auth/check-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { isValid: false, error: 'Failed to check username availability' };
    }

    if (data.exists) {
      return { 
        isValid: false, 
        error: 'Username is already taken',
        suggestions: data.suggestions || generateUsernameSuggestions(username)
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Username availability check error:', error);
    return { isValid: false, error: 'Failed to check username availability' };
  }
};

/**
 * Generate username suggestions when username is taken
 */
export const generateUsernameSuggestions = (baseUsername: string): string[] => {
  const suggestions: string[] = [];
  const cleanBase = baseUsername.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  
  // Add numbers to the end
  for (let i = 1; i <= 99; i++) {
    suggestions.push(`${cleanBase}${i}`);
    if (suggestions.length >= 5) break;
  }

  // Add year to the end
  const currentYear = new Date().getFullYear();
  suggestions.push(`${cleanBase}${currentYear}`);

  // Add random suffixes
  const suffixes = ['_dev', '_gamer', '_pro', '_x', '_official'];
  suffixes.forEach(suffix => {
    if (suggestions.length < 10) {
      suggestions.push(`${cleanBase}${suffix}`);
    }
  });

  return suggestions.slice(0, 5);
};

/**
 * Real-time username validation for form input
 */
export const validateUsernameRealTime = (username: string): { isValid: boolean; error?: string } => {
  if (!username) {
    return { isValid: true }; // Don't show error for empty field
  }

  // Basic format validation only for real-time
  const formatResult = validateUsernameFormat(username);
  return {
    isValid: formatResult.isValid,
    error: formatResult.error
  };
};

/**
 * Initialize bloom filter with existing usernames (call this on app startup)
 */
export const initializeUsernameBloomFilter = async (): Promise<void> => {
  try {
    const response = await fetch('/api/auth/usernames/bloom-filter');
    const data = await response.json();
    
    if (data.bloomFilter) {
      usernameBloomFilter.import(data.bloomFilter);
    }
  } catch (error) {
    console.error('Failed to initialize bloom filter:', error);
  }
};

/**
 * Add username to bloom filter after successful registration
 */
export const addUsernameToBloomFilter = (username: string): void => {
  usernameBloomFilter.add(username);
}; 