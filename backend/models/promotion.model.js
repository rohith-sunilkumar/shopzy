import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["discount", "coupon"],
        required: true,
    },
    // For discounts: percentage off
    discountPercent: {
        type: Number,
        default: 0,
    },
    // For coupons: coupon code and flat/percent value
    couponCode: {
        type: String,
        default: "",
    },
    discountValue: {
        type: Number,
        default: 0,
    },
    minOrderAmount: {
        type: Number,
        default: 0,
    },
    // Which category/products it applies to
    appliesTo: {
        type: String,
        default: "All Products",
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Expired"],
        default: "Active",
    },
    usageCount: {
        type: Number,
        default: 0,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

export default mongoose.model("Promotion", promotionSchema);
