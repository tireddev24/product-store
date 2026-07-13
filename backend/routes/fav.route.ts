import { Router } from "express";
import {
  AddToFavourites,
  removeFromFavourites,
  getFavourites,
} from "../controllers/fav.controller.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = Router();

router.use(verifyJwt as any);

router.get("/getfav", getFavourites as any);

router.post("/addtofav/:id", AddToFavourites as any);

router.delete("/removefromfav/:id", removeFromFavourites as any);

export default router;
