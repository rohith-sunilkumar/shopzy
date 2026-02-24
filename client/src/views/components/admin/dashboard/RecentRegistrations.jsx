import React from 'react';
import { User, Loader2 } from 'lucide-react';

const RecentRegistrations = ({ stats, loading }) => {
    return (
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
    );
};

export default RecentRegistrations;
