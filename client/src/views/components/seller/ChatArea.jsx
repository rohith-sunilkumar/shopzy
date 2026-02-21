import React from 'react';
import { Send, MoreVertical, Image as ImageIcon, Paperclip, Loader2, MessageSquare } from 'lucide-react';

const ChatArea = ({
    activeChat,
    messages,
    newMessage,
    setNewMessage,
    loadingMessages,
    sending,
    messagesEndRef,
    handleSendMessage,
    handleKeyDown,
    formatMessageTime,
    getUserName,
    isSeller,
}) => {
    return (
        <div className="flex-1 flex flex-col bg-gray-50/30 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold">
                        {getUserName(activeChat).charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">{getUserName(activeChat)}</h2>
                        <p className="text-xs text-gray-500">
                            {activeChat.participants?.user?.email || ''}
                        </p>
                    </div>
                </div>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {loadingMessages ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">No messages yet</p>
                            <p className="text-xs text-gray-400 mt-1">Send a message to start the conversation</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                                {new Date(messages[0]?.createdAt).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                        {messages.map(msg => (
                            <div key={msg._id} className={`flex ${isSeller(msg) ? 'justify-end' : 'justify-start'}`}>
                                <div className="max-w-[75%]">
                                    <div className={`p-3 rounded-2xl shadow-sm inline-block text-sm ${isSeller(msg)
                                        ? 'bg-blue-600 text-white rounded-tr-sm'
                                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <div className={`text-xs text-gray-500 mt-1 ${isSeller(msg) ? 'text-right mr-1' : 'ml-1'}`}>
                                        {formatMessageTime(msg.createdAt)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <div className="flex gap-1 mb-1">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 relative">
                        <textarea
                            rows="1"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || sending}
                            className="absolute right-2 bottom-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatArea;
