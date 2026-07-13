import { Router } from "express";
import {
  AddCart,
  allCartedProducts,
  getCart,
  removeProduct,
} from "../controllers/cart.controller.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = Router();

router.use(verifyJwt as any);

router.get("/getcart", getCart as any);

router.get("/allcart", allCartedProducts as any);

router.post("/addtocart/:id", AddCart as any);

router.delete("/removefromcart/:id", removeProduct as any);

export default router;
