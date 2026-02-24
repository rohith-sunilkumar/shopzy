import express from "express";
import {
  dashboard,
  login,
  logout,
  register,
  refresh,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/dashboard", verifyUser, dashboard);
router.post("/logout", logout);
router.get("/refresh", refresh);

export default router;
