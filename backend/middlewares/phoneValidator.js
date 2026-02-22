import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Middleware to strictly validate phone numbers using libphonenumber-js.
 * Ensures the number is valid and in E.164 format.
 */
export const validatePhoneNumber = (req, res, next) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required." });
    }

    const parsedNumber = parsePhoneNumberFromString(phoneNumber);

    if (!parsedNumber || !parsedNumber.isValid()) {
        return res.status(400).json({
            message: "Invalid phone number or missing country code (e.g., +91...)",
        });
    }

    // Normalize to E.164 format
    req.normalizedPhoneNumber = parsedNumber.format("E.164");
    next();
};
