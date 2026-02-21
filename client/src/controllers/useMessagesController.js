import { useState, useEffect, useRef } from 'react';
import { useSellerAuth } from '../models/SellerAuthContext';

const useMessagesController = () => {
    const { sellerApi, seller } = useSellerAuth();
    const [conversations, setConversations] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingConversations, setLoadingConversations] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    // Fetch conversations on mount
    useEffect(() => {
        fetchConversations();
    }, []);

    // Fetch messages when active chat changes
    useEffect(() => {
        if (activeChat) {
            fetchMessages(activeChat._id);
        }
    }, [activeChat?._id]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversations = async () => {
        try {
            setLoadingConversations(true);
            const response = await sellerApi.get('/messages');
            setConversations(response.data);
            if (response.data.length > 0 && !activeChat) {
                setActiveChat(response.data[0]);
            }
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        } finally {
            setLoadingConversations(false);
        }
    };

    const fetchMessages = async (conversationId) => {
        try {
            setLoadingMessages(true);
            const response = await sellerApi.get(`/messages/${conversationId}`);
            setMessages(response.data);
            setConversations(prev =>
                prev.map(c => c._id === conversationId ? { ...c, unreadCount: 0 } : c)
            );
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoadingMessages(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat || sending) return;

        const textToSend = newMessage.trim();
        setNewMessage('');

        const optimisticMsg = {
            _id: `temp-${Date.now()}`,
            sender: seller?._id || seller?.id,
            senderModel: 'Seller',
            text: textToSend,
            createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, optimisticMsg]);

        setConversations(prev =>
            prev.map(c =>
                c._id === activeChat._id
                    ? { ...c, lastMessage: textToSend, lastMessageAt: new Date().toISOString() }
                    : c
            )
        );

        try {
            setSending(true);
            const response = await sellerApi.post(`/messages/${activeChat._id}`, { text: textToSend });
            setMessages(prev =>
                prev.map(m => m._id === optimisticMsg._id ? response.data : m)
            );
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessages(prev => prev.filter(m => m._id !== optimisticMsg._id));
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    const formatTime = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return date.toLocaleDateString([], { weekday: 'short' });
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    const formatMessageTime = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getUserName = (conv) => conv.participants?.user?.name || 'Unknown User';
    const isSeller = (msg) => msg.senderModel === 'Seller';

    const filteredConversations = conversations.filter(conv =>
        getUserName(conv).toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
        activeChat,
        setActiveChat,
        messages,
        newMessage,
        setNewMessage,
        searchQuery,
        setSearchQuery,
        loadingConversations,
        loadingMessages,
        sending,
        messagesEndRef,
        filteredConversations,
        handleSendMessage,
        handleKeyDown,
        formatTime,
        formatMessageTime,
        getUserName,
        isSeller,
    };
};

export default useMessagesController;
