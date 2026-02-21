import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSellerAuth } from "../../../models/SellerAuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  IndianRupee,
  Tag,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BadgeCheck
} from "lucide-react";

const links = [
  { name: "Overview", icon: LayoutDashboard, path: "/seller/overview" },
  { name: "Products", icon: Package, path: "/seller/products" },
  { name: "Orders", icon: ShoppingCart, path: "/seller/orders" },
  { name: "Earnings", icon: IndianRupee, path: "/seller/earnings" },
  { name: "Promotions", icon: Tag, path: "/seller/promotions" },
  { name: "Messages", icon: MessageSquare, path: "/seller/messages" },
  { name: "Reviews", icon: Star, path: "/seller/reviews" },
  { name: "Settings", icon: Settings, path: "/seller/settings" },
];

const SellerSidebar = () => {
  const { sellerLogout } = useSellerAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto collapse on tablet/smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await sellerLogout();
    navigate('/');
  };

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col h-full shadow-sm hidden md:flex transition-all duration-300 z-20 ${isCollapsed ? 'w-20' : 'w-64'}`}>

      {/* Top Header / Profile Block */}
      <div className={`p-4 border-b border-gray-100 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3 animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              R
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                Rohith Store <BadgeCheck className="w-4 h-4 text-blue-500" />
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

      {/* Navigation Links */}
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
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-1 bottom-1 w-1 bg-blue-600 rounded-r-full" />
                )}

                <link.icon className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />

                {!isCollapsed && <span className="truncate">{link.name}</span>}

                {/* Hover Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="fixed left-20 ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {link.name}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
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
    </aside>
  );
};

export default SellerSidebar;
