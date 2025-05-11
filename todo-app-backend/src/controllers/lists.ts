import { List, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { UpdateListRequest } from './../types/list/list-requests';

const DUMMY_USER_ID = 46;

const prisma = new PrismaClient();

export async function getUserLists(
  // NO TYPES TO Request interface because we are currently using a dummy id
  request: Request,
  response: Response<List[] | { error: string }>
) {
  try {
    const lists = await prisma.list.findMany({
      where: { userId: DUMMY_USER_ID }
    });

    response.status(StatusCodes.OK).json(lists);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to get the lists'
    });
  }
}

export async function createNewList(
  request: Request<{}, {}, List>,
  response: Response<List | { error: string }>
) {
  try {
    const newList = await prisma.list.create({
      data: {
        userId: DUMMY_USER_ID,
        name: request.body.name
      }
    });

    response.status(StatusCodes.OK).json(newList);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to create the list'
    });
  }
}

export async function updateList(
  request: Request<{}, {}, UpdateListRequest>,
  response: Response<List | { error: string }>
) {
  try {
    const updatedList = await prisma.list.update({
      where: { id: request.body.listId, userId: DUMMY_USER_ID },
      data: { name: request.body.newName }
    });

    response
      .status(StatusCodes.OK)
      .json(updatedList);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to update the todo'
    });
  }
}

export async function deleteUserList(
  request: Request<{}, {}, { listId: number }>,
  response: Response<{ message: string } | { error: string }>
) {
  try {
    // TODO: CHECK IF THERE IS AUTOMATIC CONFIGURATION
    await prisma.todo.deleteMany({
      where: { listId: request.body.listId }
    });

    await prisma.list.delete({
      where: { id: request.body.listId }
    });

    response
      .status(StatusCodes.OK)
      .json({ message: `Todo ${request.body.listId} is deleted successfully` });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to delete the todo'
    });
  }
}
