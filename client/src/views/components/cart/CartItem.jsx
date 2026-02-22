import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item, handleUpdateQuantity, handleRemoveItem }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex gap-5">
                {/* Product Image */}
                <div className="w-28 h-28 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.brand}</p>
                            <h3 className="text-base font-bold text-gray-900 mt-0.5">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">Color: {item.color}</p>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            title="Remove item"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                            {item.originalPrice > item.price && (
                                <>
                                    <span className="text-sm text-gray-400 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-0.5 bg-gray-50 rounded-xl border border-gray-200 p-0.5">
                            <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                            <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= 10}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
