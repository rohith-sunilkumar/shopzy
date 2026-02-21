import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
    getPromotions,
    createPromotion,
    updatePromotionStatus,
    deletePromotion,
} from "../controllers/promotion.controller.js";

const router = express.Router();

router.get("/", verifyToken, getPromotions);
router.post("/", verifyToken, createPromotion);
router.patch("/:id/status", verifyToken, updatePromotionStatus);
router.delete("/:id", verifyToken, deletePromotion);

export default router;
