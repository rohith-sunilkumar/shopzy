import Promotion from "../models/promotion.model.js";

// GET / — list all promotions for the logged-in seller
export const getPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find({ seller: req.user.id })
            .sort({ createdAt: -1 })
            .lean();
        res.json(promotions);
    } catch (error) {
        console.error("getPromotions error:", error);
        res.status(500).json({ message: "Failed to fetch promotions" });
    }
};

// POST / — create a new promotion
export const createPromotion = async (req, res) => {
    try {
        const { name, type, discountPercent, couponCode, discountValue, minOrderAmount, appliesTo, endDate } = req.body;

        if (!name || !type) {
            return res.status(400).json({ message: "Name and type are required" });
        }

        const promotion = new Promotion({
            seller: req.user.id,
            name,
            type,
            discountPercent: discountPercent || 0,
            couponCode: couponCode || "",
            discountValue: discountValue || 0,
            minOrderAmount: minOrderAmount || 0,
            appliesTo: appliesTo || "All Products",
            endDate: endDate || null,
        });

        await promotion.save();
        res.status(201).json(promotion);
    } catch (error) {
        console.error("createPromotion error:", error);
        res.status(500).json({ message: "Failed to create promotion" });
    }
};

// PATCH /:id/status — toggle status
export const updatePromotionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const promotion = await Promotion.findOneAndUpdate(
            { _id: req.params.id, seller: req.user.id },
            { status },
            { new: true }
        );
        if (!promotion) return res.status(404).json({ message: "Promotion not found" });
        res.json(promotion);
    } catch (error) {
        console.error("updatePromotionStatus error:", error);
        res.status(500).json({ message: "Failed to update promotion" });
    }
};

// DELETE /:id — delete a promotion
export const deletePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findOneAndDelete({ _id: req.params.id, seller: req.user.id });
        if (!promotion) return res.status(404).json({ message: "Promotion not found" });
        res.json({ message: "Promotion deleted" });
    } catch (error) {
        console.error("deletePromotion error:", error);
        res.status(500).json({ message: "Failed to delete promotion" });
    }
};
