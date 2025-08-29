import express from "express";
import productController from "../controllers/ProductController.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get("/", authMiddleware, productController.getAllProducts);

router.get("/mine", authMiddleware, productController.getMyProducts);

router.get("/:id", authMiddleware, productController.getProductById);

router.post("/", authMiddleware, upload.single("excel_file"), productController.addProducts);

export default router;