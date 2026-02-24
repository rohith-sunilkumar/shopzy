import React from 'react';
import { NavLink } from 'react-router-dom';
import { Settings, ChevronDown } from 'lucide-react';
import { links, settingsSubLinks } from './sidebarData';

const SidebarNav = ({ isCollapsed, isSettingsActive, settingsOpen, handleSettingsClick }) => {
    return (
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {links.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                        `group relative flex items-center py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                            ? "bg-gradient-to-r from-blue-50 to-transparent text-blue-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        } ${isCollapsed ? 'justify-center px-0' : 'px-3'}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {isActive && (
                                <div className="absolute left-0 top-1 bottom-1 w-1 bg-blue-600 rounded-r-full" />
                            )}
                            <link.icon className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                            {!isCollapsed && <span className="truncate">{link.name}</span>}
                            {isCollapsed && (
                                <div className="fixed left-20 ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                    {link.name}
                                </div>
                            )}
                        </>
                    )}
                </NavLink>
            ))}

            {/* Settings with dropdown */}
            <div>
                <button
                    onClick={handleSettingsClick}
                    className={`group relative flex items-center w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isSettingsActive
                        ? "bg-gradient-to-r from-blue-50 to-transparent text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        } ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
                >
                    {isSettingsActive && (
                        <div className="absolute left-0 top-1 bottom-1 w-1 bg-blue-600 rounded-r-full" />
                    )}
                    <Settings className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isCollapsed ? '' : 'mr-3'} ${isSettingsActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    {!isCollapsed && (
                        <>
                            <span className="truncate flex-1 text-left">Settings</span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`} />
                        </>
                    )}
                    {isCollapsed && (
                        <div className="fixed left-20 ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                            Settings
                        </div>
                    )}
                </button>

                {/* Sub-links */}
                {settingsOpen && !isCollapsed && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-gray-100 pl-3 animate-in slide-in-from-top-2 duration-200">
                        {settingsSubLinks.map((sub) => (
                            <NavLink
                                key={sub.name}
                                to={sub.path}
                                className={({ isActive }) =>
                                    `group flex items-center py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200 ${isActive
                                        ? "text-blue-700 bg-blue-50/60"
                                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                                    }`
                                }
                            >
                                <sub.icon className="w-4 h-4 mr-2.5 shrink-0" />
                                <span className="truncate">{sub.name}</span>
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default SidebarNav;
