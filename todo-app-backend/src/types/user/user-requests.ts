import { z } from 'zod';
import { createUserSchema } from '../../middleware/shcemas/usersSchema';

export type CreateUserRequestBody = z.infer<typeof createUserSchema>