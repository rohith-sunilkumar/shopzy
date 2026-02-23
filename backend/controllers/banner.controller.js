import Banner from "../models/banner.model.js";

// @desc    Get all active banners (for consumer frontend)
// @route   GET /api/banners/active
// @access  Public
export const getActiveBanners = async (req, res) => {
    try {
        const banners = await Banner.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch active banners", error: error.message });
    }
};

// @desc    Get all banners (for admin panel)
// @route   GET /admin/marketing/banners
// @access  Private (Admin only)
export const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find({}).sort({ createdAt: -1 });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch banners", error: error.message });
    }
};

// @desc    Create a new banner
// @route   POST /admin/marketing/banners
// @access  Private (Admin only)
export const createBanner = async (req, res) => {
    try {
        const { image, title, linkUrl, isActive } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Image is required for a banner" });
        }

        const newBanner = new Banner({
            image,
            title,
            linkUrl,
            isActive: isActive !== undefined ? isActive : true,
        });

        const savedBanner = await newBanner.save();
        res.status(201).json(savedBanner);
    } catch (error) {
        res.status(500).json({ message: "Failed to create banner", error: error.message });
    }
};

// @desc    Update a banner
// @route   PUT /admin/marketing/banners/:id
// @access  Private (Admin only)
export const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const banner = await Banner.findByIdAndUpdate(id, updates, { new: true });

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ message: "Failed to update banner", error: error.message });
    }
};

// @desc    Delete a banner
// @route   DELETE /admin/marketing/banners/:id
// @access  Private (Admin only)
export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByIdAndDelete(id);

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.status(200).json({ message: "Banner deleted successfully", id });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete banner", error: error.message });
    }
};
