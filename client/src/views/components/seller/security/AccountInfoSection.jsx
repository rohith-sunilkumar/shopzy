import React from 'react';
import { Clock } from 'lucide-react';

const AccountInfoSection = ({ seller }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-emerald-50 rounded-lg">
                    <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900">Account Information</h3>
                    <p className="text-xs text-gray-500">Key details about your seller account.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">Account Created</p>
                    <p className="text-sm font-semibold text-gray-900">
                        {seller?.createdAt ? new Date(seller.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'}
                    </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">Last Login</p>
                    <p className="text-sm font-semibold text-gray-900">
                        {seller?.lastLogin ? new Date(seller.lastLogin).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'First session'}
                    </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{seller?.email || 'N/A'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">Store Name</p>
                    <p className="text-sm font-semibold text-gray-900">{seller?.storeName || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default AccountInfoSection;
