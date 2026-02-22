import express from "express";
import { getAllUsers, getAllSellers, deleteUser, deleteSeller, getDashboardStats } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.use(verifyAdmin); // Protect all routes below

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/sellers", getAllSellers);
router.delete("/sellers/:id", deleteSeller);

export default router;
