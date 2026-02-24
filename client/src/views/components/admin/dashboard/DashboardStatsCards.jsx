import React from 'react';
import { Users, Store, ArrowUpRight, DollarSign, TrendingUp } from 'lucide-react';

const DashboardStatsCards = ({ stats, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm h-32 animate-pulse flex flex-col justify-between">
                        <div className="h-6 w-8 bg-slate-800 rounded-full"></div>
                        <div className="h-8 w-16 bg-slate-800 rounded-md"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
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
    );
};

export default DashboardStatsCards;
