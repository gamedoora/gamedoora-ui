import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { setCookie } from 'cookies-next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password, phone } = req.body;
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isLength(name, {
          min: 1,
          max: 20,
        }),
        errorMessage: 'First name is too long/invalid',
      },

      {
        valid: validator.isEmail(email),
        errorMessage: 'First name is too long/invalid',
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'Phone number is invalid',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'Password is not strong',
      },
    ];
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });
    if (errors.length > 0) {
      return res.status(400).json({
        errorMessage: errors[0],
      });
    }
    const userWithEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (userWithEmail) {
      return res.status(400).json({
        errorMessage: 'Email is already exists',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        phone,
        email,
      },
    });
    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secret);
    setCookie('jwt', token, {
      req,
      res,
      maxAge: 60 * 6 * 24,
    });
    return res.status(200).json({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }
}
