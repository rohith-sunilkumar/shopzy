import React from 'react';
import { BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const SidebarHeader = ({ isCollapsed, setIsCollapsed, seller }) => {
    const storeInitial = (seller?.storeName || seller?.name || 'S').charAt(0).toUpperCase();
    const storeName = seller?.storeName || 'My Store';

    return (
        <div className={`p-4 border-b border-gray-100 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
                <div className="flex items-center gap-3 animate-in fade-in duration-300">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {storeInitial}
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                            {storeName} <BadgeCheck className="w-4 h-4 text-blue-500" />
                        </h2>
                        <p className="text-xs text-gray-500 font-medium tracking-wide">Verified Seller</p>
                    </div>
                </div>
            )}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors shrink-0"
            >
                {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
        </div>
    );
};

export default SidebarHeader;
