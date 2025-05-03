import express from 'express';
import cors from 'cors';
import usersRouter from './routers/users';
import session from 'express-session';

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: 'test',
  saveUninitialized: false,
  resave: false
}))

// Parse JSON request bodies
app.use(express.json());

// Route prefix
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});