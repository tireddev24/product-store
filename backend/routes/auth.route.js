import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { loginLimit } from "../utils/limits.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = Router();

router.post("/signup", signup);

router.use(loginLimit);

router.post("/login", login);

router.post("/logout", verifyJwt, logout);

export default router;
