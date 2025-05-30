"use strict";
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
//# sourceMappingURL=todos.js.map