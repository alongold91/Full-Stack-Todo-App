import { Router } from 'express';
import { deleteUserTodo, getTodosByUserId, updateUserTodo } from '../controllers/todos';

const router = Router();

router.get('/get-user-todos', getTodosByUserId);
router.patch('/update', updateUserTodo);
router.delete('/delete', deleteUserTodo)


export default router;
