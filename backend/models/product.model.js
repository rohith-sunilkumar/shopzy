import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
    },
    sku: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Active", "Draft", "Low Stock", "Out of Stock"],
        default: "Active",
    },
    images: {
        type: [String],
        default: [],
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
