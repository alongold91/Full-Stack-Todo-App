
import { z } from 'zod';
export const createUserSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    firstName: z.string().min(1, 'First Name is a mandatory field'),
    lastName: z.string().min(1, 'Last Name is a mandatory field'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export type CreateUserData = z.infer<typeof createUserSchema>;