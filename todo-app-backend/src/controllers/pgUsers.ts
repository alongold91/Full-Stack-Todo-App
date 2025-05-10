import { Request, Response } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { getAllUsersService } from '../models/userModel';

export async function getAllUsers(request: Request, response: Response) {
  try {
    const allUsers = await getAllUsersService();
    console.log(allUsers);
    response.status(StatusCodes.OK).json(allUsers);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to delete the todo'
    });
  }
}
