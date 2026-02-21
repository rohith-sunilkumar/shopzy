import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: null,
    },
    type: {
        type: String,
        enum: ["Sale", "Withdrawal", "Refund"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    platformFee: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["Completed", "Pending", "Failed"],
        default: "Pending",
    },
}, { timestamps: true });

// Auto-generate transactionId before saving
transactionSchema.pre("save", async function (next) {
    if (!this.transactionId) {
        const count = await mongoose.model("Transaction").countDocuments();
        this.transactionId = `#TRX-${(1000 + count + 1).toString()}`;
    }
    next();
});

export default mongoose.model("Transaction", transactionSchema);
