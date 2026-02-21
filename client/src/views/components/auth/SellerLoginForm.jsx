import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const SellerLoginForm = ({ loginData, loginLoading, handleLoginChange, handleLoginSubmit }) => {
    return (
        <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Seller Email
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                    placeholder="seller@example.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-400" />
                        Password
                    </label>
                </div>
                <input
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleLoginChange}
                />
            </div>
            <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
                {loginLoading ? "Authenticating..." : "Login to Seller Dashboard"}
                {!loginLoading && <ArrowRight className="w-4 h-4" />}
            </button>
        </form>
    );
};

export default SellerLoginForm;
