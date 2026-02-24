import React from 'react';
import { LogOut } from 'lucide-react';

const SidebarFooter = ({ isCollapsed, handleLogout }) => {
    return (
        <div className="p-3 border-t border-gray-100">
            <button
                onClick={handleLogout}
                className={`flex items-center w-full py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group relative ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'}`}
            >
                <LogOut className={`h-5 w-5 shrink-0 transition-transform ${isCollapsed ? '' : 'group-hover:-translate-x-1'}`} />
                {!isCollapsed && <span>Logout</span>}

                {isCollapsed && (
                    <div className="fixed left-20 ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                        Logout
                    </div>
                )}
            </button>
        </div>
    );
};

export default SidebarFooter;
