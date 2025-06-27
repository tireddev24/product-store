import express from "express";
import {getAllUsers, getUser, isUserNameAvailable} from "../controllers/user.controller.js";
import {verifyJwt} from "../middlewares/jwtverify.js";

const router = express.Router();

router.get("/getuser", verifyJwt, getUser);

router.get("/getallusers", getAllUsers);

router.get("/checkusername", isUserNameAvailable);

export default router;
