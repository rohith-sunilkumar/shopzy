import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginForm = ({ loginData, loginLoading, loginError, loginSuccess, handleLoginChange, handleLoginSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={handleLoginSubmit} className={`space-y-4 ${loginError ? 'animate-shake' : ''}`} noValidate>

            {/* Inline Error Display */}
            {loginError && (
                <div
                    id="login-error-message"
                    role="alert"
                    aria-live="assertive"
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3 text-sm animate-in fade-in zoom-in-95 duration-200"
                >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="font-medium">{loginError}</p>
                </div>
            )}

            <div className="space-y-1.5">
                <label htmlFor="login-email" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                    Email Address
                </label>
                <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    aria-invalid={!!loginError}
                    aria-describedby={loginError ? "login-error-message" : undefined}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none text-sm transition-all ${loginError
                            ? 'border-red-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:border-red-500'
                            : 'border-gray-200 hover:border-gray-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-500'
                        }`}
                    value={loginData.email}
                    onChange={handleLoginChange}
                />
            </div>
            <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                    <label htmlFor="login-password" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                        Password
                    </label>
                    <button
                        type="button"
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm"
                    >
                        Forgot?
                    </button>
                </div>
                <div className="relative">
                    <input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        aria-invalid={!!loginError}
                        aria-describedby={loginError ? "login-error-message" : undefined}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none text-sm pr-12 transition-all ${loginError
                                ? 'border-red-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:border-red-500'
                                : 'border-gray-200 hover:border-gray-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-500'
                            }`}
                        value={loginData.password}
                        onChange={handleLoginChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full p-1"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                    </button>
                </div>
            </div>
            <button
                type="submit"
                disabled={loginLoading || loginSuccess}
                className={`w-full py-3.5 text-white font-bold rounded-xl shadow-lg transition-all mt-4 flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${loginSuccess
                        ? 'bg-green-600 shadow-green-100'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 disabled:opacity-70'
                    }`}
            >
                {loginLoading ? "Verifying..." : loginSuccess ? "Success!" : "Sign In"}
                {!loginLoading && !loginSuccess && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />}
            </button>
        </form>
    );
};

export default LoginForm;
