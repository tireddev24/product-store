import {Router} from "express";
import {verifyJwt} from "../middlewares/jwtverify.js";

import {createProduct, deleteProduct, getProducts, getSearchedProduct, profileProducts, updateProduct} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/search/:id", getSearchedProduct);

router.use(verifyJwt);

router.get("/profile", profileProducts);

router.post("/create", createProduct);

router.put("/profile/edit/:id", updateProduct);

router.delete("/profile/delete/:id", deleteProduct);

export default router;
