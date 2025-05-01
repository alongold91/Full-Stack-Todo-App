import { useMutation } from '@tanstack/react-query';
import { CreateUserData } from '../types/user';
import { createNewUser } from './api';

export function useCreateNewUser() {
  return useMutation({
    mutationFn: (data: CreateUserData) => createNewUser(data)
    /*If we somehow plan in the future to fetch users then we would need to use queryClient.invalidateQueries inside onSuccess*/
  });
}
