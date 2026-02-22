import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    // Basic fallback for broken image links
    const imageUrl = product.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image';

    return (
        <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">

            {/* Image Container */}
            <Link to={`/products/${product._id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
                />

                {/* Sale Badge Mock */}
                {product.price > 1000 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm z-10">
                        SALE
                    </div>
                )}
            </Link>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-grow">

                {/* Category/Brand mock */}
                <div className="text-xs font-semibold text-indigo-600 mb-2 tracking-wider uppercase">
                    {product.category || 'Featured Collection'}
                </div>

                <Link to={`/products/${product._id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm">
                    <h3 className="text-gray-900 font-bold text-base mb-1 leading-tight line-clamp-2 hover:text-indigo-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating Mock */}
                <div className="flex items-center gap-1 mb-3 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                    <span className="text-xs text-gray-500 font-medium ml-1">(128)</span>
                </div>

                {/* Pricing & Spacer */}
                <div className="mt-auto flex items-end justify-between items-center pb-3">
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-gray-900">
                            ₹{(product.price || 0).toLocaleString('en-IN')}
                        </span>
                        {/* Mock Original Price */}
                        <span className="text-sm text-gray-400 line-through font-medium">
                            ₹{Math.round((product.price || 0) * 1.2).toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>

                {/* Add to Cart Actions */}
                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2 bg-gray-900 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
