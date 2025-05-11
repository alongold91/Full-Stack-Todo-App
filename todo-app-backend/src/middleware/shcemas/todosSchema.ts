import { z } from 'zod';

export const getTodosSchema = z.object({
  listId: z.number().min(1, 'List id is a mandatory field')
});

export const createTodoSchema = z.object({
  header: z.string().min(1, 'Header is a mandatory field'),
  content: z.string().min(1, 'Content is a mandatory field'),
  listId: z.number().min(1, 'List id a mandatory field')
});
// TODO: Explain that we can update only some of the properties
export const updateTodoSchema = z.object({
  todoId: z.number().min(1, 'Todo id is a mandatory field'),
  newHeader: z.string().min(1, 'New Header is a mandatory field').optional(),
  newContent: z.string().min(1, 'New Content is a mandatory field').optional(),
  isDone: z.boolean().optional()
});

export const deleteTodoSchema = z.object({
  todoId: z.number().min(1, 'Todo id is a mandatory field')
});
