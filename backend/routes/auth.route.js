import express from "express";
import {
  dashboard,
  login,
  logout,
  register,
  refresh,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/dashboard", verifyToken, dashboard);
router.post("/logout", logout);
router.get("/refresh", refresh);

export default router;
