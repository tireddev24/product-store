import express from "express";
import {
  createUser,
  loginUser,
  isUserNameAvailable,
  getUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = express.Router();

router.get("/getuser", verifyJwt, getUser);

router.get("/getallusers", getAllUsers);

router.post("/login", loginUser);

router.post("/signup", createUser);

router.post("/checkusername", isUserNameAvailable);

export default router;
