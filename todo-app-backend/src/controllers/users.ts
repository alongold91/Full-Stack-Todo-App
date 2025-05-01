import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { CreateUserRequestBody } from '../types/user/user-requests';

const prisma = new PrismaClient();

export async function createUser(
  request: Request<{}, {}, CreateUserRequestBody>,
  response: Response<{ message: string } | { error: string }>
) {
  try {
    const {
      body: { firstName, lastName, email, password }
    } = request;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword }
    });

    response
      .status(StatusCodes.CREATED)
      .json({ message: 'User created successfully' });
    /*If we catch an unknown error that is not related to validation */
  } catch (error) {
    console.error('Error creating user:', error);

    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to create user'
    });
  }
}
