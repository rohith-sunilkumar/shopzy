import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Register request received:", { name, email });

    const exist = await User.findOne({ email });
    console.log("User exists check:", exist);
    if (exist) return res.status(400).json({ message: "User already exists" });

    console.log("Hashing password...");
    const hashed = await bcrypt.hash(password, 10);
    console.log("Password hashed, creating user...");

    const newUser = await User.create({
      name,
      email,
      password: hashed,
    });
    console.log("User created:", newUser);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Password not matched" });
    user.lastLogin = new Date();
    await user.save();
    const payload = { id: user._id, role: 'user' };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.sendStatus(204);
};

export const dashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("email lastLogin");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      email: user.email,
      lastLogin: user.lastLogin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET
    );

    if (decoded.role && decoded.role !== 'user') return res.sendStatus(403);

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      res.clearCookie("refreshToken");
      return res.sendStatus(401);
    }

    const accessToken = generateAccessToken({ id: decoded.id, role: 'user' });
    res.json({ accessToken });
  } catch {
    return res.sendStatus(403);
  }
};