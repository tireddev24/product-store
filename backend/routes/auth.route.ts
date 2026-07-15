import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { loginLimit, signupLimit } from "../utils/limits.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = Router();

router.post("/signup", signupLimit, signup);

router.post("/login", loginLimit, login);

router.post("/logout", verifyJwt, logout);

export default router;
