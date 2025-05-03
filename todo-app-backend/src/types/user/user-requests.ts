import { z } from 'zod';
import {
  createUserSchema,
  loginUserSchema
} from '../../middleware/shcemas/usersSchema';

export type CreateUserRequestBody = z.infer<typeof createUserSchema>;
export type LoginUserRequestBody = z.infer<typeof loginUserSchema>;
