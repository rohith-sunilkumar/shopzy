import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";
import Order from "../models/order.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -refreshToken").sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

export const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find().select("-password -refreshToken").sort({ createdAt: -1 });
        res.status(200).json(sellers);
    } catch (error) {
        console.error("Error fetching sellers:", error);
        res.status(500).json({ message: "Failed to fetch sellers" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
};

export const deleteSeller = async (req, res) => {
    try {
        const { id } = req.params;
        await Seller.findByIdAndDelete(id);
        res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error) {
        console.error("Error deleting seller:", error);
        res.status(500).json({ message: "Failed to delete seller" });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const sellerCount = await Seller.countDocuments();

        const recentUsers = await User.find()
            .select("name email googleId phoneNumber _id")
            .sort({ _id: -1 })
            .limit(5);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const orders = await Order.find({
            createdAt: { $gte: sevenDaysAgo }
        });

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const chartData = [];
        const dateMap = {};

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = days[d.getDay()];
            dateMap[dateStr] = { name: dayName, revenue: 0, orders: 0 };
            chartData.push(dateMap[dateStr]);
        }

        let weeklyRevenue = 0;

        orders.forEach(order => {
            const dateStr = new Date(order.createdAt).toISOString().split('T')[0];
            if (dateMap[dateStr]) {
                dateMap[dateStr].revenue += order.total || 0;
                dateMap[dateStr].orders += 1;
                weeklyRevenue += order.total || 0;
            }
        });

        res.status(200).json({
            totalUsers: userCount,
            totalSellers: sellerCount,
            recentUsers,
            chartData,
            weeklyRevenue
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
