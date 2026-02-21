import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
    getConversations,
    getMessages,
    sendMessage,
    startConversation,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/start", verifyToken, startConversation);
router.get("/:conversationId", verifyToken, getMessages);
router.post("/:conversationId", verifyToken, sendMessage);

export default router;
