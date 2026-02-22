import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../models/AdminAuthContext';
import { Loader2, Trash2, Search, User, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const Users = () => {
    const { adminApi } = useAdminAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await adminApi.get('/users');
            setUsers(res.data);
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId, userName) => {
        if (!window.confirm(`Are you absolutely sure you want to permanently delete user: ${userName}?`)) return;

        try {
            await adminApi.delete(`/users/${userId}`);
            toast.success("User deleted successfully");
            setUsers(users.filter(u => u._id !== userId));
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    const filteredUsers = users.filter(u =>
        (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.phoneNumber || '').includes(search)
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">User Management</h1>
                    <p className="text-slate-400 font-medium">View and manage all registered consumer accounts</p>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full md:w-64 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium text-white shadow-sm"
                    />
                </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-bold">
                                <th className="p-4 pl-6">Consumer</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">Authentication</th>
                                <th className="p-4">Joined On</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-500" />
                                        <p>Loading user database...</p>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-slate-500">
                                        <ShieldAlert className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                                        <p className="text-lg font-medium text-slate-300">No users found</p>
                                        <p className="text-sm text-slate-500">Try adjusting your search criteria</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user._id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold overflow-hidden">
                                                    {user.avatar ? (
                                                        <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{user.name}</div>
                                                    <div className="text-xs text-slate-500">ID: {user._id.slice(-6)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm font-medium text-slate-300">{user.email || 'No email provided'}</div>
                                            <div className="text-xs text-slate-500">{user.phoneNumber || 'No phone provided'}</div>
                                        </td>
                                        <td className="p-4">
                                            {user.googleId ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">Google OAuth</span>
                                            ) : user.phoneNumber ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">OTP Verified</span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">Email/Password</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm font-medium text-slate-400">
                                            {user._id ? new Date(parseInt(user._id.substring(0, 8), 16) * 1000).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button
                                                onClick={() => handleDelete(user._id, user.name)}
                                                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors inline-block"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
