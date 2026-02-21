import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", verifyToken, getDashboard);

export default router;
