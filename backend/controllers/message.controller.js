import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// GET /  — list all conversations for the logged-in seller
export const getConversations = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const conversations = await Conversation.find({ "participants.seller": sellerId })
            .populate("participants.user", "name email")
            .sort({ lastMessageAt: -1 })
            .lean();

        // Attach unread count for each conversation
        const withUnread = await Promise.all(
            conversations.map(async (conv) => {
                const unreadCount = await Message.countDocuments({
                    conversation: conv._id,
                    senderModel: "User",
                    read: false,
                });
                return { ...conv, unreadCount };
            })
        );

        res.json(withUnread);
    } catch (error) {
        console.error("getConversations error:", error);
        res.status(500).json({ message: "Failed to fetch conversations" });
    }
};

// GET /:conversationId  — get messages for a conversation
export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 50;

        const messages = await Message.find({ conversation: conversationId })
            .sort({ createdAt: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        // Mark unread messages from the user as read (seller is viewing them)
        await Message.updateMany(
            { conversation: conversationId, senderModel: "User", read: false },
            { $set: { read: true } }
        );

        res.json(messages);
    } catch (error) {
        console.error("getMessages error:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
    }
};

// POST /:conversationId  — send a message from the seller
export const sendMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { text } = req.body;
        const sellerId = req.user.id;

        if (!text || !text.trim()) {
            return res.status(400).json({ message: "Message text is required" });
        }

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const message = await Message.create({
            conversation: conversationId,
            sender: sellerId,
            senderModel: "Seller",
            text: text.trim(),
        });

        // Update conversation's last message
        conversation.lastMessage = text.trim();
        conversation.lastMessageAt = new Date();
        await conversation.save();

        res.status(201).json(message);
    } catch (error) {
        console.error("sendMessage error:", error);
        res.status(500).json({ message: "Failed to send message" });
    }
};

// POST /start  — create or return an existing conversation
export const startConversation = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            "participants.seller": sellerId,
            "participants.user": userId,
        }).populate("participants.user", "name email");

        if (!conversation) {
            conversation = await Conversation.create({
                participants: { seller: sellerId, user: userId },
            });
            conversation = await Conversation.findById(conversation._id)
                .populate("participants.user", "name email");
        }

        res.status(201).json(conversation);
    } catch (error) {
        console.error("startConversation error:", error);
        res.status(500).json({ message: "Failed to start conversation" });
    }
};
