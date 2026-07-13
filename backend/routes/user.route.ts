import express from "express";
import {
  getAllUsers,
  getUser,
  isUserNameAvailable,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = express.Router();

router.get("/getuser", verifyJwt as any, getUser as any);

router.get("/getallusers", getAllUsers as any);

router.post("/checkusername", isUserNameAvailable as any);

router.patch("/update", verifyJwt as any, updateUser as any);

export default router;
