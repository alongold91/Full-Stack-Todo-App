import { Router } from 'express';
import {
  createUser,
  createUserAndTodoAsInteractiveTransaction,
  createUserAndTodoAsSequentialTransaction,
  loginUser
} from '../controllers/users';
import {
  createUserSchema,
  loginUserSchema
} from '../middleware/shcemas/usersSchema';
import { validateData } from '../middleware/validationMiddleware';

const router = Router();

router.post('/create', validateData(createUserSchema), createUser);
router.post('/login', validateData(loginUserSchema), loginUser);
router.post(
  '/create-user-and-todo-sequential-transaction',
  createUserAndTodoAsSequentialTransaction
);
router.post(
  '/create-user-and-todo-interactive-transaction',
  createUserAndTodoAsInteractiveTransaction
);

export default router;
