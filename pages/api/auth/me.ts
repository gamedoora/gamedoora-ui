import { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers['authorization'] as string;
  const token = bearerToken.split(' ')[1];

  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).send({
      errorMessage: 'Unauthorized request',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      phone: true,
      userID: true,
    },
  });

  if (!user) {
    return res.status(401).json({
      errorMessage: 'User not found',
    });
  }

  return res.json({
    me: user,
  });
}
