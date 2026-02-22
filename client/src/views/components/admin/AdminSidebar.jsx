import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Store, LogOut, Megaphone } from "lucide-react";
import { useAdminAuth } from "../../../models/AdminAuthContext";

const AdminSidebar = () => {
    const { adminLogout } = useAdminAuth();

    return (
        <div className="w-64 bg-slate-800 border-r border-slate-700 text-white h-full flex flex-col hidden lg:flex rounded-none shadow-xl shadow-slate-900">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-2xl font-black tracking-tight text-white mb-2">Admin Panel</h1>
                <p className="text-sm font-medium text-indigo-400">Shopzy Control Center</p>
            </div>
            <div className="p-4 flex-1">
                <nav className="space-y-1">
                    <NavLink to="/admin" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <Users className="w-5 h-5" /> Managed Users
                    </NavLink>
                    <NavLink to="/admin/sellers" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <Store className="w-5 h-5" /> Managed Sellers
                    </NavLink>
                    <NavLink to="/admin/marketing" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <Megaphone className="w-5 h-5" /> Marketing
                    </NavLink>
                </nav>
            </div>
            <div className="p-4 mt-auto border-t border-slate-800">
                <button
                    onClick={adminLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all text-left"
                >
                    <LogOut className="w-5 h-5" />
                    Secure Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
