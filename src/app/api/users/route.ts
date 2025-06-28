import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { prisma as db } from '@lib/prisma';

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            'Email and password are required',
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error:
            'Password must be at least 8 characters long',
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      SALT_ROUNDS
    );

    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    const {
      hashedPassword: _,
      ...userWithoutPassword
    } = user;

    return NextResponse.json(
      userWithoutPassword,
      { status: 201 }
    );
  } catch (error) {
    console.error(
      'Failed to create user:',
      error
    );

    if (
      error instanceof
      Prisma.PrismaClientKnownRequestError
    ) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            error:
              'A user with this email already exists',
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          'Failed to create user. Please try again later.',
      },
      { status: 500 }
    );
  }
}
