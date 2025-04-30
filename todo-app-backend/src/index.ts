import express from 'express';
import cors from 'cors';
import usersRouter from './routers/users';

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json());

// Route prefix
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});