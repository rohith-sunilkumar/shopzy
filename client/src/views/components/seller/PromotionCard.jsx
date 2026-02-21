import React from 'react';
import { Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const PromotionCard = ({ promo, type, getDaysRemaining, onToggle, onDelete }) => {
    if (type === 'coupon') {
        return (
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-mono font-bold text-lg text-gray-900">{promo.couponCode}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            ₹{promo.discountValue} off
                            {promo.minOrderAmount > 0 && ` on orders over ₹${promo.minOrderAmount}`}
                        </p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{promo.usageCount} Used</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                    <span className="text-gray-500">{getDaysRemaining(promo.endDate) || 'No expiry date'}</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onToggle(promo._id, promo.status)}
                            className={`text-xs font-medium transition-colors ${promo.status === 'Active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                        >
                            {promo.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button onClick={() => onDelete(promo._id)} className="text-red-500 hover:text-red-700 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Discount card
    return (
        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-900">{promo.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{promo.discountPercent}% off {promo.appliesTo}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${promo.status === 'Active'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                    {promo.status}
                </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                <span className="text-gray-500">{getDaysRemaining(promo.endDate) || 'No expiry'}</span>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onToggle(promo._id, promo.status)}
                        className={`flex items-center gap-1 text-xs font-medium transition-colors ${promo.status === 'Active' ? 'text-amber-600 hover:text-amber-700' : 'text-green-600 hover:text-green-700'}`}
                    >
                        {promo.status === 'Active' ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {promo.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => onDelete(promo._id)} className="text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromotionCard;
