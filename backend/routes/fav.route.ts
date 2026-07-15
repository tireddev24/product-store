import { Router } from "express";
import {
  AddToFavourites,
  removeFromFavourites,
  getFavourites,
} from "../controllers/fav.controller.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = Router();

router.use(verifyJwt);

router.get("/getfav", getFavourites);

router.post("/addtofav/:id", AddToFavourites);

router.delete("/removefromfav/:id", removeFromFavourites);

export default router;
