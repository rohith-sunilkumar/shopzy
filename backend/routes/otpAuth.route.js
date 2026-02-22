import express from "express";
import otpAuthController from "../controllers/otpAuth.controller.js";
import { validatePhoneNumber } from "../middlewares/phoneValidator.js";
import otpLimiter from "../middlewares/otpLimiter.js";

const router = express.Router();

/**
 * @route   POST /auth/otp/request
 * @desc    Request a 6-digit OTP
 * @access  Public
 */
router.post(
    "/request",
    validatePhoneNumber,
    otpLimiter.checkRateLimit.bind(otpLimiter),
    otpLimiter.checkResendCooldown.bind(otpLimiter),
    otpAuthController.requestOTP
);

/**
 * @route   POST /auth/otp/verify
 * @desc    Verify OTP and Login/Register
 * @access  Public
 */
router.post(
    "/verify",
    validatePhoneNumber,
    otpLimiter.checkLockout.bind(otpLimiter),
    otpAuthController.verifyOTP
);

export default router;
