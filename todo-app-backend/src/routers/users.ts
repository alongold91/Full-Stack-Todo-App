import { Router } from 'express';
import {
  createUser,
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

export default router;
