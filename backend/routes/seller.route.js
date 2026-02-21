import express from "express";
import { register, login, logout, refresh, getProfile } from "../controllers/seller.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/profile", verifyToken, getProfile);

export default router;
