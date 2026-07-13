import { Router } from "express";
import { verifyJwt } from "../middlewares/jwtverify.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSearchedProduct,
  profileProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts as any);

router.get("/search/:id", getSearchedProduct as any);

router.use(verifyJwt as any);

router.get("/profile", profileProducts as any);

router.post("/create", createProduct as any);

router.put("/profile/edit/:id", updateProduct as any);

router.delete("/profile/delete/:id", deleteProduct as any);

export default router;
