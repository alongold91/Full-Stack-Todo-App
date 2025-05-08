import { Router } from 'express';
import { getTodosByUserId, updateUserTodo } from '../controllers/todos';

const router = Router();

router.get('/get-user-todos', getTodosByUserId);
router.patch('/update', updateUserTodo);


export default router;
