import { Router } from "express";
import { registerUser, login } from "../controllers/user.controller";
const router = Router();

router.post('/createuser', registerUser);
router.post('/login', login);

export default router