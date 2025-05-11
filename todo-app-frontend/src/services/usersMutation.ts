import { useMutation } from '@tanstack/react-query';
import { CreateUserData, LoginUserData } from '../types/user';
import { createNewUser, loginUser } from './usersApi';
import { ApiError } from '../types/errors';

export function useCreateNewUser() {
  return useMutation<unknown, ApiError, CreateUserData>({
    mutationFn: (data: CreateUserData) => createNewUser(data),
    onError: (error: ApiError) => {
      if (
        error.response.data.details.some(err => err.message === 'email: Email already in use')
      ) {
        error.response.message = 'Email is already in use';
      }
    }
  });
}
export function useLoginUser() {
  return useMutation<unknown, ApiError, LoginUserData>({
    mutationFn: (data: LoginUserData) => loginUser(data),
    onError: (error: ApiError) => {
      if (
        error.response.data.details.some(err => err.message === 'password: Password is incorrect')
      ) {
        error.response.message = 'Password is incorrect';
      }
      throw error;
    }
  });
}
