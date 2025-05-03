import { z } from 'zod';
import { createUserSchema } from "../screens/login-and-register/login/register/Register";
import { loginUserSchema } from '../screens/login-and-register/login/Login';
export type CreateUserData = z.infer<typeof createUserSchema>;
export type LoginUserData = z.infer<typeof loginUserSchema>