import express from "express";
import {
    createProduct,
    getAllProducts,
    getSellerProducts,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Public route for all shoppers
router.get("/", getAllProducts);

// All product routes for sellers are protected
router.use(verifyToken);

router.post("/", createProduct);
router.get("/seller", getSellerProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
