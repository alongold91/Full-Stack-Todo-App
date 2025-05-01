import { Router } from "express";
import { createUser } from "../controllers/users";
import { createUserSchema } from "../middleware/shcemas/usersSchema";
import { validateData } from "../middleware/validationMiddleware";

const router = Router();

router.post('/create', validateData(createUserSchema), createUser)

export default router;