import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { loginLimit } from "../utils/limits.js";

const router = Router();

router.post("/signup", signup);

router.use(loginLimit);

router.post("/login", login);

export default router;
