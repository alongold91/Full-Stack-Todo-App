import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import {
  CreateUserRequestBody,
  LoginUserRequestBody
} from '../types/user/user-requests';
import { Session } from 'express-session';
declare module 'express-session' {
  interface Session {
    userId?: number;
  }
}

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

export async function loginUser(
  request: Request<{}, {}, LoginUserRequestBody>,
  response: Response<{ message: string } | { error: string }>
) {
  try {
    const loggedInUser = await prisma.user.findUnique({
      where: { email: request.body.email }
    });
    if (loggedInUser && request.session) {
      request.session.userId = loggedInUser.id;
      response.status(StatusCodes.OK).json({
        message: 'The user logged in successfully'
      });
    } else
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Session service failed'
      });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Unexpected error'
    });
  }
}
