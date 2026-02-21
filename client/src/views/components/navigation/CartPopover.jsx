import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const CartButton = ({ cartCount, cartTotal }) => {
    return (
        <Link
            to="/cart"
            className="flex items-center gap-2 group outline-none bg-indigo-50/50 hover:bg-indigo-50 px-3 py-2 rounded-xl border border-indigo-100 transition-colors cursor-pointer"
        >
            <div className="flex items-center gap-2">
                <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-indigo-600" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white flex items-center justify-center text-[10px] font-bold rounded-full border border-white">
                            {cartCount}
                        </span>
                    )}
                </div>
                <div className="flex flex-col items-start leading-tight">
                    <span className="text-xs text-gray-500 font-medium">My Cart</span>
                    <span className="text-sm font-bold text-gray-900">{cartTotal}</span>
                </div>
            </div>
        </Link>
    );
};

export default CartButton;
