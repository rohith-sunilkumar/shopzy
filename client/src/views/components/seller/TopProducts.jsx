import React from 'react';
import { Package, Flame, ArrowRight } from 'lucide-react';

const TopProducts = ({ topProducts, formatCurrency }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                    Top Products
                </h2>
            </div>

            <div className="flex-1 space-y-4 flex flex-col">
                {topProducts.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-sm text-gray-400">No product sales yet.</p>
                    </div>
                ) : (
                    topProducts.map((product, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <Package className="w-6 h-6 text-gray-500" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{product.name}</h3>
                                <p className="text-xs text-gray-500 mt-0.5 font-medium">{product.sales} sales • {formatCurrency(product.revenue)}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 w-full">
                    Report Details <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default TopProducts;
