import React from 'react';
import { MessageSquare } from 'lucide-react';
import useMessagesController from '../../../controllers/useMessagesController';
import ConversationList from '../../components/seller/ConversationList';
import ChatArea from '../../components/seller/ChatArea';

const Messages = () => {
    const ctrl = useMessagesController();

    return (
        <div className="h-full flex animate-in fade-in duration-500 overflow-hidden">
            <div className="flex-1 bg-white overflow-hidden flex min-h-0">
                <ConversationList
                    filteredConversations={ctrl.filteredConversations}
                    activeChat={ctrl.activeChat}
                    setActiveChat={ctrl.setActiveChat}
                    searchQuery={ctrl.searchQuery}
                    setSearchQuery={ctrl.setSearchQuery}
                    loadingConversations={ctrl.loadingConversations}
                    formatTime={ctrl.formatTime}
                    getUserName={ctrl.getUserName}
                />

                {ctrl.activeChat ? (
                    <ChatArea
                        activeChat={ctrl.activeChat}
                        messages={ctrl.messages}
                        newMessage={ctrl.newMessage}
                        setNewMessage={ctrl.setNewMessage}
                        loadingMessages={ctrl.loadingMessages}
                        sending={ctrl.sending}
                        messagesEndRef={ctrl.messagesEndRef}
                        handleSendMessage={ctrl.handleSendMessage}
                        handleKeyDown={ctrl.handleKeyDown}
                        formatMessageTime={ctrl.formatMessageTime}
                        getUserName={ctrl.getUserName}
                        isSeller={ctrl.isSeller}
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50/30">
                        <div className="text-center">
                            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-1">Your Messages</h3>
                            <p className="text-sm text-gray-400">
                                {ctrl.loadingConversations ? 'Loading conversations...' : 'Select a conversation to get started'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
