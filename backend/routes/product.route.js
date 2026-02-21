import express from "express";
import {
    createProduct,
    getSellerProducts,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// All product routes for sellers are protected
router.use(verifyToken);

router.post("/", createProduct);
router.get("/seller", getSellerProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
