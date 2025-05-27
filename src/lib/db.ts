import { PrismaClient } from '@prisma/client';

declare global {
  // Prevent multiple instances during development
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  globalThis.prisma = prisma;
}

export default prisma; 