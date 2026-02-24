import React, { useState } from 'react';
import { useAdminAuth } from '../../../models/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import * as Label from '@radix-ui/react-label';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { adminApi, adminLogin } = useAdminAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await adminApi.post('/auth/login', { email, password });
            adminLogin(res.data.accessToken);
            toast.success("Welcome to Admin Control Center");
            navigate('/admin');
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="max-w-md w-full bg-gray-800 rounded-3xl p-8 shadow-[0_0_15px_rgba(56,189,248,0.2)] border border-sky-400">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-sky-500/20 text-sky-400 rounded-2xl flex items-center justify-center mb-4">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Admin Login</h2>
                    <p className="text-gray-300 mt-2">Sign in to the Control Center</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label.Root htmlFor="email" className="text-xs font-bold text-gray-200 uppercase tracking-wider ml-1">
                            Email Identity
                        </Label.Root>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full h-12 bg-gray-900 border border-gray-700 rounded-xl px-4 text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-medium"
                            placeholder="admin@shopzy.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label.Root htmlFor="password" className="text-xs font-bold text-gray-200 uppercase tracking-wider ml-1">
                            Secure Passkey
                        </Label.Root>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full h-12 bg-gray-900 border border-gray-700 rounded-xl px-4 text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authenticate"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
