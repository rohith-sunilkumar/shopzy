import User from "../models/user.model.js";
import otpService from "../utils/otp.service.js";
import otpLimiter from "../middlewares/otpLimiter.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

/**
 * Controller for OTP-based Authentication.
 */
class OTPAuthController {
    /**
     * Generates and sends an OTP to the user's mobile number.
     */
    async requestOTP(req, res) {
        const phoneNumber = req.normalizedPhoneNumber;

        try {
            const otp = otpService.generateOTP();
            const hashedOtp = otpService.hashOTP(otp);

            // Store in Redis (5 min expiry)
            await otpService.storeOTP(phoneNumber, hashedOtp);

            // Send SMS via Twilio
            await otpService.sendSMS(phoneNumber, otp);

            // Track request for rate limiting
            await otpLimiter.trackRequest(phoneNumber);

            res.status(200).json({
                message: "OTP sent successfully. Valid for 5 minutes.",
            });
        } catch (error) {
            console.error("OTP REQUEST ERROR:", error);
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Verifies the OTP and issues a JWT if successful.
     */
    async verifyOTP(req, res) {
        const phoneNumber = req.normalizedPhoneNumber;
        const { otp } = req.body;

        if (!otp) {
            return res.status(400).json({ message: "OTP is required." });
        }

        try {
            const storedHashedOtp = await otpService.getStoredOTP(phoneNumber);

            if (!storedHashedOtp) {
                return res.status(400).json({ message: "OTP expired or not requested." });
            }

            const incomingHashedOtp = otpService.hashOTP(otp);

            // Secure constant-time comparison is handled by hashing, but we check equivalence
            if (storedHashedOtp !== incomingHashedOtp) {
                const remainingAttempts = await otpLimiter.trackFailedAttempt(phoneNumber);
                return res.status(401).json({
                    message: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
                });
            }

            // Success: Clear trackers and delete OTP
            await otpLimiter.resetTrackers(phoneNumber);
            await otpService.deleteOTP(phoneNumber);

            // Find or Create User
            let user = await User.findOne({ phoneNumber });
            if (!user) {
                // Create a basic account (assuming name is provided or default)
                user = await User.create({
                    phoneNumber,
                    name: `User_${phoneNumber.slice(-4)}`, // Placeholder name
                });
            }

            // Issue JWT
            const payload = { id: user._id, role: 'user' };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            user.refreshToken = refreshToken;
            user.lastLogin = new Date();
            await user.save();

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({
                message: "Login successful.",
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                },
            });
        } catch (error) {
            console.error("OTP VERIFY ERROR:", error);
            res.status(500).json({ message: "Internal server error during verification." });
        }
    }
}

export default new OTPAuthController();
