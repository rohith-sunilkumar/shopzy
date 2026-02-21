import React, { useState } from 'react';
import { Search, Send, Check, CheckCheck, MoreVertical, Image as ImageIcon, Paperclip } from 'lucide-react';

const conversations = [
    { id: 1, name: 'Alice Smith', lastMessage: 'Is this item still available?', time: '10:42 AM', unread: 2, online: true },
    { id: 2, name: 'Bob Johnson', lastMessage: 'Thanks for the quick shipping!', time: 'Yesterday', unread: 0, online: false },
    { id: 3, name: 'Charlie Brown', lastMessage: 'Do you have this in size M?', time: 'Oct 22', unread: 0, online: true },
    { id: 4, name: 'Diana Clark', lastMessage: 'Can you provide the dimensions?', time: 'Oct 20', unread: 1, online: false },
];

const messages = [
    { id: 1, sender: 'user', text: 'Hi, I saw your listing for the vintage lamp.', time: '10:30 AM' },
    { id: 2, sender: 'user', text: 'Is this item still available?', time: '10:42 AM' },
];

const Messages = () => {
    const [activeChat, setActiveChat] = useState(conversations[0]);

    return (
        <div className="h-full flex animate-in fade-in duration-500 overflow-hidden">
            <div className="flex-1 bg-white overflow-hidden flex min-h-0">
                {/* Chat List Sidebar */}
                <div className="w-80 border-r border-gray-200 flex flex-col hidden sm:flex shrink-0">
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(chat => (
                            <button
                                key={chat.id}
                                onClick={() => setActiveChat(chat)}
                                className={`w-full flex items-start p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left ${activeChat.id === chat.id ? 'bg-blue-50/50' : ''}`}
                            >
                                <div className="relative mr-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                                        {chat.name.charAt(0)}
                                    </div>
                                    {chat.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-gray-900 text-sm truncate">{chat.name}</h3>
                                        <span className="text-xs text-gray-500 shrink-0">{chat.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                </div>
                                {chat.unread > 0 && (
                                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white ml-2 shrink-0">
                                        {chat.unread}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-gray-50/30 overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold">
                                {activeChat.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
                                </p>
                            </div>
                        </div>
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        <div className="text-center">
                            <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                                Today
                            </span>
                        </div>
                        {messages.map(msg => (
                            <div key={msg.id} className="flex justify-start">
                                <div className="max-w-[75%]">
                                    <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-sm shadow-sm inline-block text-sm">
                                        {msg.text}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 ml-1">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                        <div className="flex items-end gap-2">
                            <div className="flex gap-1 mb-1">
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 relative">
                                <textarea
                                    rows="1"
                                    placeholder="Type your message..."
                                    className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                                ></textarea>
                                <button className="absolute right-2 bottom-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
