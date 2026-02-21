import React from 'react';
import { Search, Loader2, MessageSquare } from 'lucide-react';

const ConversationList = ({
    filteredConversations,
    activeChat,
    setActiveChat,
    searchQuery,
    setSearchQuery,
    loadingConversations,
    formatTime,
    getUserName,
}) => {
    return (
        <div className="w-80 border-r border-gray-200 flex flex-col hidden sm:flex shrink-0">
            <div className="p-4 border-b border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {loadingConversations ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                    </div>
                ) : filteredConversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <MessageSquare className="w-10 h-10 text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500">
                            {searchQuery ? 'No matching conversations' : 'No conversations yet'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Messages from buyers will appear here
                        </p>
                    </div>
                ) : (
                    filteredConversations.map(chat => (
                        <button
                            key={chat._id}
                            onClick={() => setActiveChat(chat)}
                            className={`w-full flex items-start p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left ${activeChat?._id === chat._id ? 'bg-blue-50/50' : ''}`}
                        >
                            <div className="relative mr-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                                    {getUserName(chat).charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-gray-900 text-sm truncate">{getUserName(chat)}</h3>
                                    <span className="text-xs text-gray-500 shrink-0">{formatTime(chat.lastMessageAt)}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{chat.lastMessage || 'No messages yet'}</p>
                            </div>
                            {chat.unreadCount > 0 && (
                                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white ml-2 shrink-0">
                                    {chat.unreadCount}
                                </div>
                            )}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default ConversationList;
