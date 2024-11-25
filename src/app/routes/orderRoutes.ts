import express from "express";
import { orderControllers } from "../controllers/orderController";

const router = express.Router();

router.post("/", orderControllers.orderBike);
router.get('/revenue', orderControllers.calculateRevenue)

export const OrderRouter = router;
