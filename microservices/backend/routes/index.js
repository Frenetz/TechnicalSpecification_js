import express from "express";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/products", productRoutes);

export default router;