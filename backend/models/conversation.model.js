import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: {
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    lastMessage: {
        type: String,
        default: "",
    },
    lastMessageAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Ensure one conversation per seller-user pair
conversationSchema.index(
    { "participants.seller": 1, "participants.user": 1 },
    { unique: true }
);

export default mongoose.model("Conversation", conversationSchema);
