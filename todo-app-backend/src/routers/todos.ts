import { Router } from 'express';
import {
  getListTodos,
  updateListTodos,
  deleteListTodo,
  createNewTodo
} from '../controllers/todos';
import { validateData } from '../middleware/validationMiddleware';
import {
  getTodosSchema,
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema
} from '../middleware/shcemas/todosSchema';

const router = Router();

router.get('/get-list-todos', validateData(getTodosSchema), getListTodos);
router.get('/create', validateData(createTodoSchema), createNewTodo);
router.patch('/update', validateData(updateTodoSchema), updateListTodos);
router.delete('/delete', validateData(deleteTodoSchema), deleteListTodo);

export default router;
