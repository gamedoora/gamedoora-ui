import bcrypt from 'bcrypt'
import { hashPassword, validateEmail, validatePassword } from '../auth'

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}))

describe('Auth Utilities', () => {
  describe('validateEmail', () => {
    it('returns true for valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'email+tag@example.org',
        'firstname.lastname@example.com',
        'user123@example.com',
      ]

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true)
      })
    })

    it('returns false for invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user..name@example.com',
        'user@.com',
        'user name@example.com',
        'user@example',
        'user@exam ple.com',
      ]

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false)
      })
    })

    it('throws for empty or null email addresses', () => {
      expect(() => validateEmail('')).toThrow('Email must be a valid string')
      expect(() => validateEmail(null as any)).toThrow('Email must be a valid string')
      expect(() => validateEmail(undefined as any)).toThrow('Email must be a valid string')
    })
  })

  describe('validatePassword', () => {
    it('returns valid for strong passwords', () => {
      const strongPasswords = [
        'Password123',
        'StrongPass1',
        'MySecure1Password',
        'Valid123Pass',
        'Test1234',
      ]

      strongPasswords.forEach(password => {
        const result = validatePassword(password)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('returns invalid for passwords too short', () => {
      const shortPasswords = ['short', 'Pass1', '123', 'Ab1']

      shortPasswords.forEach(password => {
        const result = validatePassword(password)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Password must be at least 8 characters long')
      })
    })

    it('returns invalid for passwords without lowercase letters', () => {
      const passwords = ['PASSWORD123', 'NOLOWER123', 'UPPER123CASE']

      passwords.forEach(password => {
        const result = validatePassword(password)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Password must contain at least one lowercase letter')
      })
    })

    it('returns invalid for passwords without uppercase letters', () => {
      const passwords = ['password123', 'noupper1', 'lower123case']

      passwords.forEach(password => {
        const result = validatePassword(password)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Password must contain at least one uppercase letter')
      })
    })

    it('returns invalid for passwords without numbers', () => {
      const passwords = ['PasswordNoNumber', 'NoDigits', 'OnlyLetters']

      passwords.forEach(password => {
        const result = validatePassword(password)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Password must contain at least one number')
      })
    })

    it('returns the first validation error encountered', () => {
      // Test order of validation (length first, then lowercase, uppercase, number)
      const result = validatePassword('SHORT')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Password must be at least 8 characters long')
    })
  })

  describe('hashPassword', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('hashes password using bcrypt', async () => {
      const mockHashedPassword = 'hashed-password-string'
      ;(bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword)

      const password = 'Password123'
      const result = await hashPassword(password)

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 12)
      expect(result).toBe(mockHashedPassword)
    })

    it('handles bcrypt errors', async () => {
      const error = new Error('Bcrypt error')
      ;(bcrypt.hash as jest.Mock).mockRejectedValue(error)

      await expect(hashPassword('password')).rejects.toThrow('Bcrypt error')
    })

    it('uses salt rounds of 12', async () => {
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed')

      await hashPassword('password')

      expect(bcrypt.hash).toHaveBeenCalledWith('password', 12)
    })
  })

  describe('Edge Cases', () => {
    it('throws for empty strings in validateEmail', () => {
      expect(() => validateEmail('')).toThrow('Email must be a valid string')
    })

    it('throws for empty strings in validatePassword', () => {
      expect(() => validatePassword('')).toThrow('Password must be a valid string')
    })

    it('handles special characters in email validation', () => {
      expect(validateEmail('user+tag@example.com')).toBe(true)
      expect(validateEmail('user.name@example.com')).toBe(true)
      expect(validateEmail('user-name@example.com')).toBe(true)
    })

    it('handles special characters in password validation', () => {
      const passwordsWithSpecialChars = [
        'Password123!',
        'Strong@Pass1',
        'Valid#123$',
        'Test&Pass1*',
      ]

      passwordsWithSpecialChars.forEach(password => {
        const result = validatePassword(password)
        expect(result.isValid).toBe(true)
      })
    })

    it('handles unicode characters in email validation', () => {
      // Note: Basic regex may not handle unicode properly
      expect(validateEmail('tëst@example.com')).toBe(false) // Depending on regex implementation
    })

    it('handles very long passwords', () => {
      const longPassword = 'A'.repeat(100) + 'a1' // 102 characters
      const result = validatePassword(longPassword)
      expect(result.isValid).toBe(true)
    })

    it('handles null and undefined inputs gracefully', () => {
      // These throw in our implementation for proper error handling
      expect(() => validateEmail(null as any)).toThrow('Email must be a valid string')
      expect(() => validateEmail(undefined as any)).toThrow('Email must be a valid string')
      expect(() => validatePassword(null as any)).toThrow('Password must be a valid string')
      expect(() => validatePassword(undefined as any)).toThrow('Password must be a valid string')
    })
  })
}) 