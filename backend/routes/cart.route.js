import { Router } from "express";
import { verifyJwt } from "../middlewares/jwtverify.js";
import {
  AddCart,
  getCart,
  removeProduct,
  allCartedProducts,
} from "../controllers/cart.controller.js";

const router = Router();

router.use(verifyJwt);

router.delete("/removefromcart/:id", removeProduct);

router.get("/getcart", getCart);

router.post("/addtocart/:id", AddCart);

router.get("/allcart", allCartedProducts);

export default router;
