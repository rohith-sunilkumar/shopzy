import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Verifies Google ID Token and authenticates the user.
 */
export const googleLogin = async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ message: "Google ID Token is required." });
    }

    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId, picture } = payload;

        // Find or Create User
        let user = await User.findOne({
            $or: [
                { googleId },
                { email }
            ]
        });

        if (!user) {
            user = await User.create({
                name,
                email,
                googleId,
                avatar: picture, // Ensure avatar field exists in User model or just ignore
            });
        } else if (!user.googleId) {
            // Link googleId to existing email account
            user.googleId = googleId;
            await user.save();
        }

        user.lastLogin = new Date();
        await user.save();

        const tokenPayload = { id: user._id, role: 'user' };
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error("GOOGLE AUTH ERROR:", error);
        res.status(401).json({ message: "Invalid Google ID Token." });
    }
};
