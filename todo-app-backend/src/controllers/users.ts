import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import {
  CreateUserRequestBody,
  LoginUserRequestBody
} from '../types/user/user-requests';

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
  response: Response<{ id: number } | { error: string }>
) {
  try {
    const loggedInUser = await prisma.user.findUnique({
      where: { email: request.body.email }
    });
    if (loggedInUser) {
      response.status(StatusCodes.OK).json({
        id: loggedInUser.id
      });
    } else
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'The user was not found'
      });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Unexpected error'
    });
  }
}

// export async function createUserAndTodoAsSequentialTransaction(
//   request: Request,
//   response: Response
// ) {
//   try {
//     const [user, todo] = await prisma.$transaction([
//       prisma.user.create({
//         data: {
//           firstName: 'Julian',
//           lastName: 'The clown',
//           email: 'JulCr@gmail.com',
//           password: 'Hello easy password'
//         }
//       }),
//       prisma.todo.create({
//         data: {
//           header: 'Julians welcome todo',
//           content: 'Hello julians first todo content',
//           isDone: false,
//           userId: 59
//         }
//       })
//     ]);
//     console.log(user);
//     console.log(todo);
//     response.status(StatusCodes.OK).json({
//       ...user,
//       ...todo
//     });
//   } catch (error) {
//     response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: 'Unexpected error with transaction'
//     });
//   }
// }

// export async function createUserAndTodoAsInteractiveTransaction(
//   request: Request,
//   response: Response
// ) {
//   try {
//     const result = await prisma.$transaction(
//       async (tx) => {
//         const newUser = await tx.user.create({
//           data: {
//             firstName: 'Harold',
//             lastName: 'Roblust',
//             email: `JulCr_${Date.now()}@gmail.com`,
//             password: 'Hello easy password'
//           }
//         });
        
//         const newTodo = await tx.todo.create({
//           data: {
//             header: `${newUser.firstName} first post`,
//             content: `${newUser.firstName} ${newUser.lastName}'s first todo `,
//             isDone: false,
//             userId: newUser.id
//           }
//         });
        
//         return { user: newUser, todo: newTodo };
//       },
//       {
//         // Increase timeout to 15 seconds
//         timeout: 15000,
//       }
//     );
    
//     console.log(result);
//     response.status(StatusCodes.OK).json({
//       result
//     });
//   } catch (error) {
//     console.error("Transaction error:", error);
//     response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: error instanceof Error ? error.message : 'Unexpected error with transaction'
//     });
//   }
// }
