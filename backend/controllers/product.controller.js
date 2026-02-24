import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            price,
            discount,
            stock,
            sku,
            status,
            images
        } = req.body;

        const product = await Product.create({
            name,
            description,
            category,
            price,
            discount: discount || 0,
            stock,
            sku,
            status,
            images,
            seller: req.user.id
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        console.error("Create Product error:", error);
        res.status(500).json({ message: "Server error during product creation" });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: 'Active' }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Get All Products error:", error);
        res.status(500).json({ message: "Server error while fetching products" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('seller', 'businessName logo');

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Get Product By ID error:", error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(500).json({ message: "Server error while fetching product" });
    }
};

export const getSellerProducts = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Get Seller Products error:", error);
        res.status(500).json({ message: "Server error while fetching products" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const product = await Product.findOneAndUpdate(
            { _id: id, seller: req.user.id },
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.error("Update Product error:", error);
        res.status(500).json({ message: "Server error during product update" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({ _id: id, seller: req.user.id });

        if (!product) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }

        // Delete images from Cloudinary
        if (product.images && product.images.length > 0) {
            const deletePromises = product.images.map(url => {
                // Extract public_id from Cloudinary URL
                // URL format: https://res.cloudinary.com/<cloud>/image/upload/v123/products/filename.ext
                const parts = url.split('/');
                const folderAndFile = parts.slice(parts.indexOf('upload') + 1).join('/');
                // Remove version prefix (v123456789/) and file extension
                const publicId = folderAndFile
                    .replace(/^v\d+\//, '')
                    .replace(/\.[^.]+$/, '');
                return cloudinary.uploader.destroy(publicId).catch(err => {
                    console.error(`Failed to delete image ${publicId} from Cloudinary:`, err);
                });
            });
            await Promise.all(deletePromises);
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete Product error:", error);
        res.status(500).json({ message: "Server error during product deletion" });
    }
};
