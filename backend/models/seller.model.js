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
    phone: {
        type: String,
        default: "",
    },
    logo: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        default: "",
    },
    website: {
        type: String,
        default: "",
    },
    address: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" },
        pincode: { type: String, default: "" },
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

