import React from 'react';
import { Mail, User, ArrowRight } from 'lucide-react';

const RegisterForm = ({ regData, regLoading, handleRegChange, handleRegSubmit }) => {
    return (
        <form onSubmit={handleRegSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
                <label htmlFor="register-name" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                    Full Name
                </label>
                <input
                    id="register-name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm transition-all hover:border-gray-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-500"
                    value={regData.name}
                    onChange={handleRegChange}
                />
            </div>
            <div className="space-y-1.5">
                <label htmlFor="register-email" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                    Email Address
                </label>
                <input
                    id="register-email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm transition-all hover:border-gray-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-500"
                    value={regData.email}
                    onChange={handleRegChange}
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label htmlFor="register-password" className="text-sm font-bold text-gray-700 ml-1">Password</label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm transition-all hover:border-gray-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-500"
                        value={regData.password}
                        onChange={handleRegChange}
                    />
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="register-confirm" className="text-sm font-bold text-gray-700 ml-1">Confirm</label>
                    <input
                        id="register-confirm"
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm transition-all hover:border-gray-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-500"
                        value={regData.confirmPassword}
                        onChange={handleRegChange}
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={regLoading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all mt-6 disabled:opacity-70 flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
                {regLoading ? "Creating Account..." : "Create Account"}
                {!regLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />}
            </button>
        </form>
    );
};

export default RegisterForm;
