import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import googleAuthRoutes from "./routes/googleAuth.route.js";
import uploadRoutes from "./routes/upload.route.js";
import sellerRoutes from "./routes/seller.route.js";
import productRoutes from "./routes/product.route.js";
import messageRoutes from "./routes/message.route.js";
import orderRoutes from "./routes/order.route.js";
import earningsRoutes from "./routes/earnings.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import promotionRoutes from "./routes/promotion.route.js";
import otpAuthRoutes from "./routes/otpAuth.route.js";
import cors from "cors";
import connection from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/auth/otp", otpAuthRoutes);
app.use("/auth/google", googleAuthRoutes);
app.use("/seller/auth", sellerRoutes);
app.use("/seller/auth/upload", uploadRoutes);
app.use("/seller/auth/products", productRoutes);
app.use("/seller/auth/messages", messageRoutes);
app.use("/seller/auth/orders", orderRoutes);
app.use("/seller/auth/earnings", earningsRoutes);
app.use("/seller/auth/dashboard", dashboardRoutes);
app.use("/seller/auth/promotions", promotionRoutes);
app.use("/products", productRoutes);
app.use("/upload", uploadRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: err
  });
});

connection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`)
  });
});
