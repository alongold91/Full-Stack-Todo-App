import { z } from 'zod';

export const createListSchema = z
  .object({
    name: z.string().min(1, 'First Name is a mandatory field'),
    userId: z.number().min(1, 'User id is a mandatory field')
  })

  export const updaterListSchema = z
  .object({
    name: z.string().min(1, 'First Name is a mandatory field'),
    userId: z.number().min(1, 'User id is a mandatory field'),
    newName: z.string().min(1, 'New name is a mandatory field'),
  })

  export const deleteListSchema = z
  .object({
    listId: z.number().min(1, 'List id is a mandatory field'),
  })