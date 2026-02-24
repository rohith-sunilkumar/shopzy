import express from "express";
import { verifySeller } from "../middlewares/verifySeller.js";
import { getEarnings, requestWithdrawal } from "../controllers/earnings.controller.js";

const router = express.Router();

router.get("/", verifySeller, getEarnings);
router.post("/withdraw", verifySeller, requestWithdrawal);

export default router;
