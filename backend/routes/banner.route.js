import express from "express";
import {
    getActiveBanners,
    getAllBanners,
    createBanner,
    updateBanner,
    deleteBanner
} from "../controllers/banner.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public route for fetching active banners
router.get("/active", getActiveBanners);

// Admin prefixed routes (attached to /admin/marketing/banners in server.js)
// But we can also keep them self-contained here and use verifyAdmin.

router.get("/all", verifyAdmin, getAllBanners);
router.post("/", verifyAdmin, createBanner);
router.put("/:id", verifyAdmin, updateBanner);
router.delete("/:id", verifyAdmin, deleteBanner);

export default router;
