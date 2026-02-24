import express from "express";
import { verifySeller } from "../middlewares/verifySeller.js";
import {
    getOrders,
    getOrderById,
    updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", verifySeller, getOrders);
router.get("/:orderId", verifySeller, getOrderById);
router.patch("/:orderId/status", verifySeller, updateOrderStatus);

export default router;
