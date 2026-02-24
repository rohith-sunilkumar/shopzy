import express from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    getSellerProducts,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import { verifySeller } from "../middlewares/verifySeller.js";

const router = express.Router();

// Seller products (MUST be above /:id to prevent conflict)
router.get("/seller", verifySeller, getSellerProducts);

// Public routes for shoppers
router.get("/", getAllProducts);
router.get("/:id", getProductById);


// Other protected seller routes
router.use(verifySeller);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
