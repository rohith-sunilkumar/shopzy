import React from 'react';
import { ShoppingCart, Star, Heart, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    // Basic fallback for broken image links
    const imageUrl = product.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image';

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full relative">

            {/* Image Container - Square Aspect Ratio */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
                <Link to={`/products/${product._id}`} className="block h-full w-full">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
                        loading="lazy"
                    />
                </Link>

                {/* Overlay UI elements on hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top Action Buttons (Wishlist, Quick View) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-10">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <ZoomIn className="w-4 h-4" />
                    </button>
                </div>

                {/* Sale Badge */}
                {product.price > 1000 && (
                    <div className="absolute top-4 left-0 bg-red-600 text-white text-[10px] font-black tracking-widest px-3 py-1.5 uppercase shadow-md z-10 rounded-r-md">
                        SALE
                    </div>
                )}

                {/* Quick Add to Cart - Slide up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <button
                        onClick={(e) => { e.preventDefault(); onAddToCart(product); }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Quick Add
                    </button>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow bg-white z-20 relative">

                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                    <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                        {product.category || 'Collection'}
                    </div>
                    {/* Rating Stars */}
                    <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[11px] text-gray-500 font-medium ml-1">4.8</span>
                    </div>
                </div>

                {/* Product Name */}
                <Link to={`/products/${product._id}`} className="block mb-3 focus:outline-none z-0">
                    <h3 className="text-gray-900 font-semibold text-base leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Pricing & Spacer */}
                <div className="mt-auto flex items-end justify-between items-center pt-2">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black text-gray-900 tracking-tight">
                                ₹{(product.price || 0).toLocaleString('en-IN')}
                            </span>
                            {/* Original Price */}
                            {product.price > 1000 && (
                                <span className="text-sm text-gray-400 line-through font-medium">
                                    ₹{Math.round((product.price || 0) * 1.2).toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;
