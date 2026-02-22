import crypto from "crypto";
import twilio from "twilio";
import dotenv from "dotenv";
import Otp from "../models/otp.model.js";

dotenv.config();

/**
 * Service to handle OTP lifecycle using MongoDB for storage.
 */
class OTPService {
    /**
     * Generates a cryptographically secure 6-digit OTP.
     */
    generateOTP() {
        return Math.floor(100000 + crypto.randomInt(900000)).toString();
    }

    /**
     * Hashes OTP using SHA-256 for secure storage.
     */
    hashOTP(otp) {
        return crypto.createHash("sha256").update(otp).digest("hex");
    }

    /**
     * Sends OTP via Twilio SMS.
     */
    async sendSMS(phoneNumber, otp) {
        try {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;

            if (!accountSid || !accountSid.startsWith("AC")) {
                console.log(`[DEV MODE] OTP for ${phoneNumber}: ${otp}`);
                return true;
            }

            const client = twilio(accountSid, authToken);

            await client.messages.create({
                body: `Your Shopzy verification code is: ${otp}. Valid for 5 minutes.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber,
            });
            return true;
        } catch (error) {
            console.error("❌ Twilio Error:", error);
            throw new Error("Failed to send SMS. Please try again later.");
        }
    }

    /**
     * Stores hashed OTP in MongoDB.
     */
    async storeOTP(phoneNumber, hashedOtp) {
        await Otp.findOneAndUpdate(
            { phoneNumber },
            { hashedOtp, createdAt: new Date() },
            { upsert: true, new: true }
        );
    }

    /**
     * Retrieves hashed OTP from MongoDB.
     */
    async getStoredOTP(phoneNumber) {
        const record = await Otp.findOne({ phoneNumber });
        return record ? record.hashedOtp : null;
    }

    /**
     * Deletes OTP from MongoDB after successful verification.
     */
    async deleteOTP(phoneNumber) {
        await Otp.deleteOne({ phoneNumber });
    }
}

export default new OTPService();
