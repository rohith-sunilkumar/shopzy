import React from 'react';
import { Mail, User, ArrowRight } from 'lucide-react';

const RegisterForm = ({ regData, regLoading, handleRegChange, handleRegSubmit }) => {
    return (
        <form onSubmit={handleRegSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    Full Name
                </label>
                <input
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm"
                    value={regData.name}
                    onChange={handleRegChange}
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    Email Address
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm"
                    value={regData.email}
                    onChange={handleRegChange}
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm"
                        value={regData.password}
                        onChange={handleRegChange}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 ml-1">Confirm</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm"
                        value={regData.confirmPassword}
                        onChange={handleRegChange}
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={regLoading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all mt-6 disabled:opacity-70 flex items-center justify-center gap-2 group"
            >
                {regLoading ? "Creating Account..." : "Create Account"}
                {!regLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
        </form>
    );
};

export default RegisterForm;
