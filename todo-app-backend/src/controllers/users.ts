import { Request, Response } from 'express-serve-static-core';
import { createUserDto } from '../dtos/CreateUser.dto';
import { createUserQueryParams } from '../types/query-params';
import { User } from '../types/response';

export function getUsers(request: Request, response: Response) {
  
}

export function getUserById(request: Request, response: Response) {
  response.send({});
}

export function createUser(
  request: Request<{ id: string }, {}, createUserDto, createUserQueryParams>,
  response: Response<User>
) {
  response.status(201).send({id: 1, username:'a', email: 'b'})
}
