import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { loginLimit, signupLimit } from "../utils/limits.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = Router();

router.post("/signup", signupLimit, signup as any);

router.post("/login", loginLimit, login as any);

router.post("/logout", verifyJwt as any, logout as any);

export default router;
