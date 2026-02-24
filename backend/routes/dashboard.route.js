import express from "express";
import { verifySeller } from "../middlewares/verifySeller.js";
import { getDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", verifySeller, getDashboard);

export default router;
