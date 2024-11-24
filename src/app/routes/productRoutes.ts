import express from "express";
import { productControllers } from "../controllers/productController";


const router = express.Router();

router.post("/create-bike", productControllers.createProduct);
router.get("/", productControllers.getAllBikes);
router.get("/:productId", productControllers.getProductById);
router.put("/:productId", productControllers.updateProduct);
router.delete("/:productId", productControllers.deleteProduct);

export const productRouter = router;
