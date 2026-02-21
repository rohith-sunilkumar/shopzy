import React from 'react';
import { Mail, Lock, User, ArrowRight, Store } from 'lucide-react';

const SellerRegisterForm = ({ regData, regLoading, handleRegChange, handleRegSubmit }) => {
    return (
        <form onSubmit={handleRegSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    Full Name
                </label>
                <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                    placeholder="Enter your name"
                    value={regData.name}
                    onChange={handleRegChange}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Store className="w-4 h-4 text-gray-400" />
                    Store Name
                </label>
                <input
                    name="storeName"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                    placeholder="Unique store name"
                    value={regData.storeName}
                    onChange={handleRegChange}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Business Email
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                    placeholder="business@example.com"
                    value={regData.email}
                    onChange={handleRegChange}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                    <input
                        name="password"
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm"
                        placeholder="••••••••"
                        value={regData.password}
                        onChange={handleRegChange}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Confirm</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm"
                        placeholder="••••••••"
                        value={regData.confirmPassword}
                        onChange={handleRegChange}
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={regLoading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all mt-4 disabled:opacity-70 flex items-center justify-center gap-2"
            >
                {regLoading ? "Registering..." : "Create Seller Account"}
                {!regLoading && <ArrowRight className="w-4 h-4" />}
            </button>
        </form>
    );
};

export default SellerRegisterForm;
