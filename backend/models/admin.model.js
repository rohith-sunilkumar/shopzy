import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
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

export default mongoose.model("Admin", adminSchema);
