import express from "express";
import { register, login, logout, refresh, getProfile, updateProfile, changePassword, deleteAccount } from "../controllers/seller.controller.js";
import { verifySeller } from "../middlewares/verifySeller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/profile", verifySeller, getProfile);
router.put("/profile", verifySeller, updateProfile);
router.put("/change-password", verifySeller, changePassword);
router.delete("/delete-account", verifySeller, deleteAccount);

export default router;
