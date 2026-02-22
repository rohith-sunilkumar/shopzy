import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../models/AdminAuthContext';
import { Loader2, Trash2, Search, Store, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const Sellers = () => {
    const { adminApi } = useAdminAuth();
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const res = await adminApi.get('/sellers');
            setSellers(res.data);
        } catch (error) {
            toast.error("Failed to fetch sellers");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (sellerId, storeName) => {
        if (!window.confirm(`CRITICAL ACTION: Are you absolutely sure you want to permanently delete seller store: ${storeName}? All their products will be orphaned.`)) return;

        try {
            await adminApi.delete(`/sellers/${sellerId}`);
            toast.success("Seller deleted successfully");
            setSellers(sellers.filter(s => s._id !== sellerId));
        } catch (error) {
            toast.error("Failed to delete seller");
        }
    };

    const filteredSellers = sellers.filter(s =>
        (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (s.storeName || '').toLowerCase().includes(search.toLowerCase()) ||
        (s.email || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Seller Management</h1>
                    <p className="text-slate-400 font-medium">View and manage all registered merchant accounts</p>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search merchants..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full md:w-64 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium text-white shadow-sm"
                    />
                </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-bold">
                                <th className="p-4 pl-6">Store / Owner</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Registered On</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-500" />
                                        <p>Loading seller database...</p>
                                    </td>
                                </tr>
                            ) : filteredSellers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-slate-500">
                                        <ShieldAlert className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                                        <p className="text-lg font-medium text-slate-300">No sellers found</p>
                                        <p className="text-sm">Try adjusting your search criteria</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredSellers.map(seller => (
                                    <tr key={seller._id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold overflow-hidden">
                                                    {seller.logo ? (
                                                        <img src={seller.logo} alt="logo" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Store className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{seller.storeName}</div>
                                                    <div className="text-xs font-semibold text-slate-400">{seller.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm font-medium text-slate-300">{seller.email}</div>
                                            <div className="text-xs text-slate-500">{seller.phone || 'No phone'}</div>
                                        </td>
                                        <td className="p-4">
                                            {seller.category ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{seller.category}</span>
                                            ) : (
                                                <span className="text-xs text-slate-500 italic">Uncategorized</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm font-medium text-slate-400">
                                            {seller._id ? new Date(parseInt(seller._id.substring(0, 8), 16) * 1000).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button
                                                onClick={() => handleDelete(seller._id, seller.storeName)}
                                                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors inline-block"
                                                title="Delete Seller"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Sellers;
