import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const LoginForm = ({ loginData, loginLoading, handleLoginChange, handleLoginSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    Email Address
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm"
                    value={loginData.email}
                    onChange={handleLoginChange}
                />
            </div>
            <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                        Password
                    </label>
                    <button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                        Forgot?
                    </button>
                </div>
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm"
                        value={loginData.password}
                        onChange={handleLoginChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
            </div>
            <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all mt-4 disabled:opacity-70 flex items-center justify-center gap-2 group"
            >
                {loginLoading ? "Verifying..." : "Sign In"}
                {!loginLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
        </form>
    );
};

export default LoginForm;
