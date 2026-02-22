import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../models/AdminAuthContext';
import { Loader2, Users, Store, Activity, ArrowUpRight, User, DollarSign, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const { adminApi } = useAdminAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalSellers: 0,
        recentUsers: [],
        chartData: [],
        weeklyRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await adminApi.get('/stats');
                setStats(res.data);
            } catch (error) {
                toast.error("Failed to load dashboard statistics");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-black text-white mb-2">Control Dashboard</h1>
            <p className="text-slate-400 font-medium mb-8">Platform overview and general metrics</p>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm h-32 animate-pulse flex flex-col justify-between">
                            <div className="h-6 w-8 bg-slate-800 rounded-full"></div>
                            <div className="h-8 w-16 bg-slate-800 rounded-md"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* User Stats Card */}
                    <div className="bg-slate-900 rounded-2xl p-6 border border-sky-400/40 shadow-sm hover:border-sky-400/70 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-sky-500/20 transition-colors"></div>
                        <div className="relative">
                            <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center mb-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-slate-400 font-semibold mb-1">Total Users</h3>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-black text-white">{stats.totalUsers}</span>
                                <span className="flex items-center text-sm font-bold text-emerald-500 mb-1">
                                    <ArrowUpRight className="w-4 h-4" /> Active
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Seller Stats Card */}
                    <div className="bg-slate-900 rounded-2xl p-6 border border-sky-400/40 shadow-sm hover:border-sky-400/70 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-sky-500/20 transition-colors"></div>
                        <div className="relative">
                            <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center mb-4">
                                <Store className="w-6 h-6" />
                            </div>
                            <h3 className="text-slate-400 font-semibold mb-1">Total Sellers</h3>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-black text-white">{stats.totalSellers}</span>
                                <span className="flex items-center text-sm font-bold text-emerald-500 mb-1">
                                    <ArrowUpRight className="w-4 h-4" /> Active
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Revenue Stats Card */}
                    <div className="bg-slate-900 rounded-2xl p-6 border border-emerald-400/40 shadow-sm hover:border-emerald-400/70 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-colors"></div>
                        <div className="relative">
                            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <h3 className="text-slate-400 font-semibold mb-1">Weekly Revenue</h3>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-black text-white">
                                    ${(stats.weeklyRevenue || 0).toLocaleString()}
                                </span>
                                <span className="flex items-center text-sm font-bold text-emerald-500 mb-1">
                                    <TrendingUp className="w-4 h-4 mr-1" /> Live
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Detailed Analytics Grid */}
            <div className="grid grid-cols-1 gap-6">

                {/* Platform Analytics Chart */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col min-h-[400px]">
                    <h2 className="text-xl font-bold text-white mb-6">Sales & Revenue Analytics (7 Days)</h2>
                    <div className="flex-1 w-full relative">
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.chartData || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="left" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                                        itemStyle={{ color: '#f8fafc' }}
                                    />
                                    <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                                    <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" name="Orders" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Recent Registrations Feed */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Registrations</h2>

                    <div className="flex-1 overflow-y-auto pr-2">
                        {loading ? (
                            <div className="flex justify-center items-center h-full text-slate-500 py-10">
                                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                            </div>
                        ) : stats.recentUsers?.length === 0 ? (
                            <div className="text-center text-slate-500 py-10">
                                <p>No users registered yet</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {stats.recentUsers?.map((user) => (
                                    <div key={user._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email || user.phoneNumber}</p>
                                        </div>
                                        <div className="shrink-0 flex items-center">
                                            {user.googleId ? (
                                                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" title="Google Auth"></span>
                                            ) : user.phoneNumber ? (
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" title="OTP Auth"></span>
                                            ) : (
                                                <span className="w-2 h-2 rounded-full bg-slate-400" title="Email Auth"></span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* View All Button */}
                    {!loading && stats.recentUsers?.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-800">
                            <a href="/admin/users" className="block text-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                                View Full Directory
                            </a>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
