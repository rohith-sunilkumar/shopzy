import express from "express";
import { verifySeller } from "../middlewares/verifySeller.js";
import {
    getPromotions,
    createPromotion,
    updatePromotionStatus,
    deletePromotion,
} from "../controllers/promotion.controller.js";

const router = express.Router();

router.get("/", verifySeller, getPromotions);
router.post("/", verifySeller, createPromotion);
router.patch("/:id/status", verifySeller, updatePromotionStatus);
router.delete("/:id", verifySeller, deletePromotion);

export default router;
