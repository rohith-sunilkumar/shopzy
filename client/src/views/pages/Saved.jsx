import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

const Saved = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-red-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your saved items</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">
                Items you save for later will appear here. Start exploring and save products you love!
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
            >
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
            </Link>
        </div>
    );
};

export default Saved;
