import { Router } from "express";
import productRoutes from "./product.route.js";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import cartRoutes from "./cart.route.js";
import favRoutes from "./fav.route.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/fav", favRoutes);

export default router;
