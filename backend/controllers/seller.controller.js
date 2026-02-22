import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Seller from "../models/seller.model.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, storeName } = req.body;

        const emailExist = await Seller.findOne({ email });
        if (emailExist) return res.status(400).json({ message: "Email already registered as a seller" });

        const storeExist = await Seller.findOne({ storeName });
        if (storeExist) return res.status(400).json({ message: "Store name already taken" });

        const hashed = await bcrypt.hash(password, 10);

        const newSeller = await Seller.create({
            name,
            email,
            password: hashed,
            storeName
        });

        res.status(201).json({ message: "Seller account created successfully" });
    } catch (error) {
        console.error("Seller Register error:", error);
        res.status(500).json({ message: "Server error during seller registration" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const seller = await Seller.findOne({ email });
        if (!seller) return res.status(404).json({ message: "Seller account not found" });

        const match = await bcrypt.compare(password, seller.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        seller.lastLogin = new Date();

        const payload = { id: seller._id, role: 'seller' };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        seller.refreshToken = refreshToken;
        await seller.save();

        res.cookie("sellerRefreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            accessToken,
            seller: {
                id: seller._id,
                name: seller.name,
                email: seller.email,
                storeName: seller.storeName
            }
        });

    } catch (error) {
        console.error("Seller Login error:", error);
        res.status(500).json({ message: "Server error during seller login" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("sellerRefreshToken");
    res.sendStatus(204);
};

export const refresh = (req, res) => {
    const token = req.cookies.sellerRefreshToken;
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );

        if (decoded.role !== 'seller') return res.sendStatus(403);

        const accessToken = generateAccessToken({ id: decoded.id, role: 'seller' });

        res.json({ accessToken });
    } catch {
        return res.sendStatus(403);
    }
};

export const getProfile = async (req, res) => {
    try {
        const seller = await Seller.findById(req.user.id).select("-password -refreshToken");
        if (!seller) return res.status(404).json({ message: "Seller not found" });
        res.json(seller);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { storeName, description, email, phone, logo, category, website, address } = req.body;

        const updateData = {};
        if (storeName !== undefined) updateData.storeName = storeName;
        if (description !== undefined) updateData.description = description;
        if (email !== undefined) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;
        if (logo !== undefined) updateData.logo = logo;
        if (category !== undefined) updateData.category = category;
        if (website !== undefined) updateData.website = website;
        if (address !== undefined) updateData.address = address;

        const seller = await Seller.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        ).select("-password -refreshToken");

        if (!seller) return res.status(404).json({ message: "Seller not found" });

        res.json(seller);
    } catch (error) {
        console.error("updateProfile error:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Both current and new password are required" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters" });
        }

        const seller = await Seller.findById(req.user.id);
        if (!seller) return res.status(404).json({ message: "Seller not found" });

        const isMatch = await bcrypt.compare(currentPassword, seller.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        seller.password = await bcrypt.hash(newPassword, salt);
        await seller.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("changePassword error:", error);
        res.status(500).json({ message: "Failed to change password" });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required to delete account" });
        }

        const seller = await Seller.findById(req.user.id);
        if (!seller) return res.status(404).json({ message: "Seller not found" });

        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        await Seller.findByIdAndDelete(req.user.id);

        res.clearCookie("sellerRefreshToken");
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("deleteAccount error:", error);
        res.status(500).json({ message: "Failed to delete account" });
    }
};
