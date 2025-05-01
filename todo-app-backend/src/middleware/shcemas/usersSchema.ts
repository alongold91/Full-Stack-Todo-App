import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserSchema = z
  .object({
    firstName: z.string().min(1, 'First Name is a mandatory field'),
    lastName: z.string().min(1, 'Last Name is a mandatory field'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format')
      .refine(
        async (email) => {
          // Check if email exists in database
          const existingUser = await prisma.user.findUnique({
            where: { email: email }
          });
          // Return true if email doesn't exist (is unique)
          return !existingUser;
        },
        {
          message: 'Email already in use'
        }
      ),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match"
  });
