import { Router } from "express";
import { getTodosByUserId } from "../controllers/todos";

const router = Router();


router.get('/get-user-todos', getTodosByUserId)

export default router;