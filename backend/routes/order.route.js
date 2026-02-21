import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
    getOrders,
    getOrderById,
    updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.get("/:orderId", verifyToken, getOrderById);
router.patch("/:orderId/status", verifyToken, updateOrderStatus);

export default router;
