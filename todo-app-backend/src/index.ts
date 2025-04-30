import express from 'express';
import usersRouter from './routers/users';

const app = express();
const PORT = 3000;

// Route prefix
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
