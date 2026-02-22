import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Service for JWT management.
 */
class JWTService {
    /**
     * Generates a signed JWT for a user.
     */
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION || "7d",
        });
    }

    /**
     * Sets the JWT as a secure, HTTP-only cookie.
     */
    setAuthCookie(res, token) {
        const cookieOptions = {
            httpOnly: true, // Prevents XSS
            secure: process.env.NODE_ENV === "production", // HTTPS only in prod
            sameSite: "strict", // Prevents CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };

        res.cookie("token", token, cookieOptions);
    }
}

export default new JWTService();
