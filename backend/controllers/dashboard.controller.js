import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Transaction from "../models/transaction.model.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

// GET / — aggregated dashboard stats for the logged-in seller
export const getDashboard = async (req, res) => {
    try {
        const sellerId = req.user.id;

        // ---- Core Metrics ----
        const totalOrders = await Order.countDocuments({ seller: sellerId });
        const pendingShipments = await Order.countDocuments({ seller: sellerId, status: { $in: ["Pending", "Processing"] } });

        const orders = await Order.find({ seller: sellerId }).lean();
        const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        const totalSales = orders.filter(o => o.status === "Delivered").length;

        // ---- Alerts ----
        const lowStockProducts = await Product.countDocuments({ seller: sellerId, stock: { $lte: 5 }, status: { $ne: "Out of Stock" } });
        const unreadMessages = await Message.countDocuments({
            senderModel: "User",
            read: false,
        });

        // get conversations for this seller to filter unread
        const sellerConvos = await Conversation.find({ "participants.seller": sellerId }).select("_id").lean();
        const convoIds = sellerConvos.map(c => c._id);
        const unreadForSeller = convoIds.length > 0
            ? await Message.countDocuments({ conversation: { $in: convoIds }, senderModel: "User", read: false })
            : 0;

        // ---- Earnings ----
        const transactions = await Transaction.find({ seller: sellerId }).lean();
        let totalEarnings = 0;
        let totalFees = 0;
        let pendingClearance = 0;
        let totalWithdrawn = 0;

        transactions.forEach((trx) => {
            if (trx.type === "Sale" && trx.status === "Completed") {
                totalEarnings += trx.amount;
                totalFees += trx.platformFee;
            } else if (trx.type === "Sale" && trx.status === "Pending") {
                pendingClearance += trx.amount - trx.platformFee;
            } else if (trx.type === "Withdrawal") {
                totalWithdrawn += trx.amount;
            }
        });
        const availableBalance = Math.max(0, totalEarnings - totalFees - totalWithdrawn - pendingClearance);

        // ---- Chart Data (last 7 days) ----
        const now = new Date();
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const recentOrders = await Order.find({
            seller: sellerId,
            createdAt: { $gte: sevenDaysAgo },
        }).lean();

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const revenueByDay = {};
        const ordersByDay = {};

        // Initialize all 7 days
        for (let i = 0; i < 7; i++) {
            const d = new Date(sevenDaysAgo);
            d.setDate(sevenDaysAgo.getDate() + i);
            const dayName = dayNames[d.getDay()];
            revenueByDay[dayName] = 0;
            ordersByDay[dayName] = 0;
        }

        recentOrders.forEach((o) => {
            const dayName = dayNames[new Date(o.createdAt).getDay()];
            revenueByDay[dayName] = (revenueByDay[dayName] || 0) + (o.total || 0);
            ordersByDay[dayName] = (ordersByDay[dayName] || 0) + 1;
        });

        const chartRevenue = Object.entries(revenueByDay).map(([name, value]) => ({ name, value }));
        const chartOrders = Object.entries(ordersByDay).map(([name, value]) => ({ name, value }));

        // ---- Top Products (by order count) ----
        const productSales = {};
        orders.forEach((o) => {
            const pid = o.product?.toString();
            if (!pid) return;
            if (!productSales[pid]) productSales[pid] = { count: 0, revenue: 0 };
            productSales[pid].count += o.quantity || 1;
            productSales[pid].revenue += o.total || 0;
        });

        const topProductIds = Object.entries(productSales)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 4)
            .map(([id]) => id);

        const topProductDocs = await Product.find({ _id: { $in: topProductIds } })
            .select("name images price")
            .lean();

        const topProducts = topProductDocs.map((p) => ({
            _id: p._id,
            name: p.name,
            image: p.images?.[0] || null,
            sales: productSales[p._id.toString()]?.count || 0,
            revenue: productSales[p._id.toString()]?.revenue || 0,
        })).sort((a, b) => b.sales - a.sales);

        res.json({
            stats: {
                totalRevenue,
                totalSales,
                totalOrders,
                pendingShipments,
            },
            alerts: {
                lowStockProducts,
                pendingShipments,
                unreadMessages: unreadForSeller,
            },
            earnings: {
                availableBalance,
                pendingClearance,
            },
            chart: {
                revenue: chartRevenue,
                orders: chartOrders,
            },
            topProducts,
        });
    } catch (error) {
        console.error("getDashboard error:", error);
        res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
};
