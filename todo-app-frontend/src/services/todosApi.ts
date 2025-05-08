import axios from 'axios';
import { Todo } from '../types/todo';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

export async function getAllTodos() {
  return (await axiosInstance.get<Todo[]>('api/todos/get-user-todos')).data;
}
