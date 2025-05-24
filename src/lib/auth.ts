import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import prisma from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SALT_ROUNDS = 12;

// Password utilities
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// JWT utilities
export const generateToken = (userId: number, email: string): string => {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): { userId: number; email: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    return decoded;
  } catch (error) {
    return null;
  }
};

// Session management
export const createSession = async (userId: number, token: string) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

  return await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
};

export const deleteSession = async (token: string) => {
  try {
    await prisma.session.delete({
      where: { token },
    });
  } catch (error) {
    // Session might not exist, which is fine
  }
};

export const isValidSession = async (token: string): Promise<boolean> => {
  try {
    const session = await prisma.session.findUnique({
      where: { token },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await deleteSession(token);
      }
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

// Get user from request
export const getUserFromRequest = async (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  const isValid = await isValidSession(token);
  if (!isValid) {
    return null;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
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
    },
  });

  return user;
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    throw new Error('Email must be a valid string');
  }
  
  // More strict email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email) && !email.includes('..') && !email.includes(' ');
};

export const validateUsername = (username: string): { isValid: boolean; message?: string } => {
  if (!username || typeof username !== 'string') {
    return { isValid: false, message: 'Username is required' };
  }
  
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long' };
  }
  
  if (username.length > 20) {
    return { isValid: false, message: 'Username must be no more than 20 characters long' };
  }
  
  if (!/^[a-zA-Z]/.test(username)) {
    return { isValid: false, message: 'Username must start with a letter' };
  }
  
  if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(username)) {
    return { isValid: false, message: 'Username can only contain letters and numbers' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a valid string');
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
}; 