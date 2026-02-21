import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    storeName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: "",
    },
    lastLogin: {
        type: Date,
        default: null,
    },
    refreshToken: {
        type: String,
        default: null,
    }
}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);
