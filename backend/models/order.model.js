import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    shippingAddress: {
        type: String,
        default: "",
    },
}, { timestamps: true });

// Auto-generate orderId before saving
orderSchema.pre("save", async function (next) {
    if (!this.orderId) {
        const count = await mongoose.model("Order").countDocuments();
        this.orderId = `#ORD-${(7000 + count + 1).toString()}`;
    }
    next();
});

export default mongoose.model("Order", orderSchema);
