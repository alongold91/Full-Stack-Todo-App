import { Router } from "express";
import { getAllUsers } from "../controllers/pgUsers";

const router = Router();

router.get('/get-all-users', getAllUsers)

export default router;