import { User } from '@prisma/client'
import pool from '../config/db'

export async function getAllUsersService(): Promise<User[]> {
    // Don't call pool.connect() when using pool.query()
    const users = await pool.query('SELECT * FROM "User"');
    
    // You might need to transform the data to match Prisma's User type
    return users.rows as User[];
}