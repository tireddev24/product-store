import express from "express";
import {
  getAllUsers,
  getUser,
  isUserNameAvailable,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = express.Router();

router.get("/getuser", verifyJwt, getUser);

router.get("/getallusers", verifyJwt, getAllUsers);

router.post("/checkusername", isUserNameAvailable);

router.patch("/update", verifyJwt, updateUser);

export default router;
