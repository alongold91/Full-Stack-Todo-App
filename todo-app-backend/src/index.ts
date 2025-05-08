import cors from 'cors';
import express from 'express';
import todosRouter from './routers/todos';
import usersRouter from './routers/users';
const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(
  cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], // Allow both
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Add this for session cookies to work cross-origin
  })
);


// Parse JSON request bodies
app.use(express.json());

// Route prefix
app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
