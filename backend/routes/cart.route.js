import { Router } from "express";
import {
  AddCart,
  allCartedProducts,
  getCart,
  removeProduct,
} from "../controllers/cart.controller.js";
import { verifyJwt } from "../middlewares/jwtverify.js";

const router = Router();

router.use(verifyJwt);

router.get("/getcart", getCart);

router.get("/allcart", allCartedProducts);

router.post("/addtocart/:id", AddCart);

router.delete("/removefromcart/:id", removeProduct);

export default router;
