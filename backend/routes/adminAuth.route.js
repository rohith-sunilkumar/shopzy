import express from "express";
import { login, logout, refresh, seedAdmin } from "../controllers/adminAuth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/seed", seedAdmin); // Temporary route to create initial admin

export default router;
