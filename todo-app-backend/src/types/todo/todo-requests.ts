export interface CreateTodoRequest {
  header: string;
  content: string;
  listId: number;
}
export interface UpdateTodoRequest {
  todoId: number;
  newContent: string;
}
