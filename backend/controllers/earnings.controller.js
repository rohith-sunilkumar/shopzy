import Transaction from "../models/transaction.model.js";

// GET / — get earnings summary + transactions for the logged-in seller
export const getEarnings = async (req, res) => {
    try {
        const sellerId = req.user.id;

        // Fetch all transactions for this seller
        const transactions = await Transaction.find({ seller: sellerId })
            .sort({ createdAt: -1 })
            .lean();

        // Compute aggregates
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
            } else if (trx.type === "Withdrawal" && trx.status === "Completed") {
                totalWithdrawn += trx.amount;
            } else if (trx.type === "Withdrawal" && trx.status === "Pending") {
                totalWithdrawn += trx.amount;
            }
        });

        const availableToWithdraw = totalEarnings - totalFees - totalWithdrawn - pendingClearance;

        res.json({
            summary: {
                totalEarnings: totalEarnings - totalFees,
                availableToWithdraw: Math.max(0, availableToWithdraw),
                pendingClearance,
            },
            transactions,
        });
    } catch (error) {
        console.error("getEarnings error:", error);
        res.status(500).json({ message: "Failed to fetch earnings" });
    }
};

// POST /withdraw — request a withdrawal
export const requestWithdrawal = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid withdrawal amount" });
        }

        const transaction = await Transaction.create({
            seller: sellerId,
            type: "Withdrawal",
            amount,
            platformFee: 0,
            status: "Pending",
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error("requestWithdrawal error:", error);
        res.status(500).json({ message: "Failed to request withdrawal" });
    }
};
