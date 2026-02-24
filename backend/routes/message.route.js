import express from "express";
import { verifySeller } from "../middlewares/verifySeller.js";
import {
    getConversations,
    getMessages,
    sendMessage,
    startConversation,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/", verifySeller, getConversations);
router.post("/start", verifySeller, startConversation);
router.get("/:conversationId", verifySeller, getMessages);
router.post("/:conversationId", verifySeller, sendMessage);

export default router;
