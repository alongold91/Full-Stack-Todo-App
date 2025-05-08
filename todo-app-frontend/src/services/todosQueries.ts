import { useQuery } from '@tanstack/react-query';
import { getAllTodos } from './todosApi';

export function useGetAllTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodos
  });
}
