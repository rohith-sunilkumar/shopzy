import express from "express";
import { googleLogin } from "../controllers/googleAuth.controller.js";

const router = express.Router();

/**
 * @route   POST /auth/google
 * @desc    Authenticate user using Google ID Token
 * @access  Public
 */
router.post("/login", googleLogin);

export default router;
