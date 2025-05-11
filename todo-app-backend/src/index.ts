import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import pgUsersRouter from './routers/pgUsers';
import todosRouter from './routers/todos';
import usersRouter from './routers/users';
import listsRouter from './routers/lists'
const app = express();
const PORT = 3000;

dotenv.config();

// Enable CORS for all routes
app.use(
  cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], // Allow both
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Add this for session cookies to work cross-origin
  })
);

// localhost:4444/lists/4/todos/7

// Parse JSON request bodies
app.use(express.json());

// Route prefix
app.use('/api/users', usersRouter);
app.use('/api/lists', listsRouter)
app.use('/api/todos', todosRouter);
// app.use('/pg/users', pgUsersRouter)


app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
