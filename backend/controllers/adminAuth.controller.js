import bcrypt from "bcrypt";
import Admin from "../models/admin.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        admin.lastLogin = new Date();
        await admin.save();

        const payload = { id: admin._id, role: 'admin' };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        admin.refreshToken = refreshToken;
        await admin.save();

        res.cookie("adminRefreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // In production, this should be true if using HTTPS
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });

    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("adminRefreshToken");
    res.sendStatus(204);
};

export const refresh = async (req, res) => {
    const token = req.cookies.adminRefreshToken;
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        if (decoded.role !== 'admin') return res.sendStatus(403);

        const admin = await Admin.findById(decoded.id);
        if (!admin || admin.refreshToken !== token) return res.sendStatus(403);

        const accessToken = generateAccessToken({ id: decoded.id, role: 'admin' });
        res.json({ accessToken });
    } catch (error) {
        return res.sendStatus(403);
    }
};

export const seedAdmin = async (req, res) => {
    try {
        const exist = await Admin.findOne({ email: "admin@shopzy.com" });
        if (exist) return res.status(400).json({ message: "Admin already seeded" });

        const hashed = await bcrypt.hash("admin123", 10);
        const admin = await Admin.create({
            email: "admin@shopzy.com",
            password: hashed,
        });

        res.status(201).json({ message: "Admin seeded successfully", email: admin.email });
    } catch (error) {
        console.error("Seed error:", error);
        res.status(500).json({ message: "Server error during seed" });
    }
};
