import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: "", // Optional text overlay
        },
        linkUrl: {
            type: String,
            default: "", // Where the button redirects
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
