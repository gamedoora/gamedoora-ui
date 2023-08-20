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
    const { name, userID, email, password, phone, avatar } = req.body;
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isLength(name, {
          min: 1,
          max: 50,
        }),
        errorMessage: 'Name is too long/invalid',
      },
      {
        valid: validator.isLength(userID, {
          min: 1,
          max: 50,
        }),
        errorMessage: 'Name is too long/invalid',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Incorrect email',
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
        errorMessage: 'Email already exists',
      });
    }

    const userWithUserID = await prisma.user.findUnique({
      where: { userID },
    });
    if (userWithEmail) {
      return res.status(400).json({
        errorMessage: 'UserID taken',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        phone,
        email,
        userID,
        avatar,
      },
    });
    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({
      email: user.email,
      userID: user.userID,
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
      userID: user.userID,
      avatar: user.avatar,
    });
  }
}
