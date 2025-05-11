// import { PrismaClient, Todo } from '@prisma/client';
// import { Request, Response } from 'express-serve-static-core';
// import { StatusCodes } from 'http-status-codes';
// import { UpdateTodoRequest } from '../types/todo/todo-requests';

// const DUMMY_USER_ID = 46;

// const prisma = new PrismaClient();

// export async function getTodosByUserId(
//   request: Request,
//   response: Response<Todo[] | { error: string }>
// ) {
//   try {
//     const todos = await prisma.todo.findMany({
//       where: { userId: DUMMY_USER_ID },
//       include: {
//         user: {
//           select: {
//             firstName: true
//           }
//         }
//       }
//     });

//     response.status(StatusCodes.OK).json(todos);
//   } catch (error) {
//     response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: 'Failed to get the todos'
//     });
//   }
// }

// export async function updateUserTodo(
//   request: Request<null, null, UpdateTodoRequest>,
//   response: Response<{ message: string } | { error: string }>
// ) {
//   try {
//     const test = await prisma.todo.update({
//       where: { id: request.body.todoId, userId: DUMMY_USER_ID },
//       data: { content: request.body.newContent }
//     });

//     response
//       .status(StatusCodes.OK)
//       .json({ message: `Todo ${request.body.todoId} is updated successfully` });
//   } catch (error) {
//     response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: 'Failed to update the todo'
//     });
//   }
// }

// export async function deleteUserTodo(
//   request: Request<null, null, { todoId: number }>,
//   response: Response<{ message: string } | { error: string }>
// ) {
//   try {
//     const test = await prisma.todo.delete({
//       where: { id: request.body.todoId }
//     });

//     response
//       .status(StatusCodes.OK)
//       .json({ message: `Todo ${request.body.todoId} is deleted successfully` });
//   } catch (error) {
//     response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: 'Failed to delete the todo'
//     });
//   }
// }

import { PrismaClient, Todo } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express-serve-static-core';
import { CreateTodoRequest, UpdateTodoRequest } from '../types/todo/todo-requests';

const prisma = new PrismaClient();

const DUMMY_LIST_ID = 1;

export async function getListTodos(
  request: Request,
  response: Response<Todo[] | { error: string }>
) {
  try {
    const todos = await prisma.todo.findMany({
      where: { listId: DUMMY_LIST_ID }
    });
    response.status(StatusCodes.OK).json(todos);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to get the todos'
    });
  }
}

export async function createNewTodo(
  request: Request<{}, {}, CreateTodoRequest>,
  response: Response<Todo | { error: string }>
) {
  try {
    const todo = await prisma.todo.create({
      data: {listId: request.body.listId, header: request.body.header, content: request.body.content, isDone: false}
    })
    response.status(StatusCodes.OK).json(todo);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to create the todo'
    });
  }
}

export async function updateListTodos(
  request: Request<{}, {}, UpdateTodoRequest>,
  response: Response<Todo | { error: string }>
) {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: request.body.todoId, listId: DUMMY_LIST_ID },
      data: { content: request.body.newContent }
    });

    response.status(StatusCodes.OK).json(updatedTodo);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to update the todo'
    });
  }
}

export async function deleteListTodo(
  request: Request<{}, {}, { todoId: number }>,
  response: Response<{ message: string } | { error: string }>
) {
  try {
    await prisma.todo.delete({
      where: { id: request.body.todoId }
    });

    response
      .status(StatusCodes.OK)
      .json({ message: `Todo ${request.body.todoId} is deleted successfully` });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to delete the todo'
    });
  }
}
