import express from "express";
import { login, logout, refresh, seedAdmin, createAdmin } from "../controllers/adminAuth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/seed", seedAdmin); // Creates default admin: admin@shopzy.com / admin123
router.post("/create", createAdmin); // Creates admin with custom email & password

export default router;
