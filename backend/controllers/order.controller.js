import Order from "../models/order.model.js";

// GET / — list all orders for the logged-in seller
export const getOrders = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const orders = await Order.find({ seller: sellerId })
            .populate("customer", "name email")
            .populate("product", "name price images")
            .sort({ createdAt: -1 })
            .lean();

        res.json(orders);
    } catch (error) {
        console.error("getOrders error:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// GET /:orderId — get single order details
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .populate("customer", "name email")
            .populate("product", "name price images")
            .lean();

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error("getOrderById error:", error);
        res.status(500).json({ message: "Failed to fetch order" });
    }
};

// PATCH /:orderId/status — update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findOneAndUpdate(
            { _id: req.params.orderId, seller: req.user.id },
            { status },
            { new: true }
        )
            .populate("customer", "name email")
            .populate("product", "name price images");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error("updateOrderStatus error:", error);
        res.status(500).json({ message: "Failed to update order status" });
    }
};
