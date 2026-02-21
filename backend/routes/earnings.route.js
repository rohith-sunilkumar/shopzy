import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getEarnings, requestWithdrawal } from "../controllers/earnings.controller.js";

const router = express.Router();

router.get("/", verifyToken, getEarnings);
router.post("/withdraw", verifyToken, requestWithdrawal);

export default router;
