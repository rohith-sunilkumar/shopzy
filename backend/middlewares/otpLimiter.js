/**
 * In-memory rate limiting and lockout logic (Redis-free).
 * Note: Data will reset on server restart.
 */
class OTPLimiter {
    constructor() {
        this.limits = new Map(); // phoneNumber -> { count, expires }
        this.blocks = new Map(); // phoneNumber -> expires
        this.cooldowns = new Map(); // phoneNumber -> expires
        this.fails = new Map(); // phoneNumber -> { count, expires }
    }

    /**
     * Limit OTP requests: Max 3 per 15 minutes.
     */
    async checkRateLimit(req, res, next) {
        const phoneNumber = req.normalizedPhoneNumber;
        const now = Date.now();
        const data = this.limits.get(phoneNumber);

        if (data && data.expires > now && data.count >= 3) {
            return res.status(429).json({
                message: "Maximum OTP requests exceeded. Please try again after 15 minutes.",
            });
        }

        next();
    }

    /**
     * Check if phone number is currently blocked due to multiple failed attempts.
     */
    async checkLockout(req, res, next) {
        const phoneNumber = req.normalizedPhoneNumber;
        const now = Date.now();
        const expires = this.blocks.get(phoneNumber);

        if (expires && expires > now) {
            return res.status(403).json({
                message: "This phone number is temporary blocked due to multiple failed attempts. Try again in 15 minutes.",
            });
        }

        next();
    }

    /**
     * Resend cooldown: 60 seconds.
     */
    async checkResendCooldown(req, res, next) {
        const phoneNumber = req.normalizedPhoneNumber;
        const now = Date.now();
        const expires = this.cooldowns.get(phoneNumber);

        if (expires && expires > now) {
            return res.status(429).json({
                message: "Please wait 60 seconds before requesting another OTP.",
            });
        }

        next();
    }

    /**
     * Increments the request count and sets/updates TTL.
     */
    async trackRequest(phoneNumber) {
        const now = Date.now();
        const data = this.limits.get(phoneNumber) || { count: 0, expires: now + 900000 };

        // Reset if expired
        if (data.expires < now) {
            data.count = 1;
            data.expires = now + 900000;
        } else {
            data.count += 1;
        }

        this.limits.set(phoneNumber, data);
        this.cooldowns.set(phoneNumber, now + 60000); // 60 seconds
    }

    /**
     * Tracks failed attempts and blocks if threshold is met.
     */
    async trackFailedAttempt(phoneNumber) {
        const now = Date.now();
        const data = this.fails.get(phoneNumber) || { count: 0, expires: now + 900000 };

        if (data.expires < now) {
            data.count = 1;
            data.expires = now + 900000;
        } else {
            data.count += 1;
        }

        this.fails.set(phoneNumber, data);

        if (data.count >= 5) {
            this.blocks.set(phoneNumber, now + 900000); // 15m block
            this.fails.delete(phoneNumber);
            return 0;
        }

        return 5 - data.count; // Remaining attempts
    }

    /**
     * Resets all trackers upon successful login.
     */
    async resetTrackers(phoneNumber) {
        this.limits.delete(phoneNumber);
        this.fails.delete(phoneNumber);
        this.cooldowns.delete(phoneNumber);
    }
}

export default new OTPLimiter();
