import { Router } from "express";
import { verifyJwt } from "../middlewares/jwtverify.js";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSearchedProduct,
  profileProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/search/:id", getSearchedProduct);

router.use(verifyJwt);

router.get("/profile", profileProducts);

router.post("/create", createProduct);

router.put("/:id", updateProduct);

router.put("/profile/edit/:id", updateProduct);

router.delete("/profile/delete/:id", deleteProduct);

router.delete("/:id", deleteProduct);

export default router;
