import React from 'react';
import { Star } from 'lucide-react';

const ProductPreview = ({ data }) => {
    // Basic fallback for broken image links
    const imageUrl = data?.images?.[0] || 'https://via.placeholder.com/300x300?text=Preview+Image';
    const price = Number(data?.price) || 0;
    const discount = Number(data?.discount) || 0;

    // Original price calculation
    const originalPrice = discount > 0
        ? Math.round(price / (1 - discount / 100))
        : Math.round(price * 1.2);

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full relative" style={{ minWidth: '240px', maxWidth: '300px' }}>
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
                <img
                    src={imageUrl}
                    alt={data?.name || 'Preview'}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
                />

                {/* Sale Badge */}
                {price > 1000 && (
                    <div className="absolute top-4 left-0 bg-red-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 uppercase shadow-md z-10 rounded-r-md">
                        SALE
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-grow bg-white z-20 relative">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                    <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase truncate max-w-[70%]">
                        {data?.category || 'CATEGORY'}
                    </div>
                    {/* Rating Stars */}
                    <div className="flex items-center gap-0.5 shrink-0">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[11px] text-gray-500 font-medium ml-1">4.8</span>
                    </div>
                </div>

                {/* Product Name */}
                <div className="block mb-2">
                    <h3 className="text-gray-900 font-semibold text-base leading-snug line-clamp-2">
                        {data?.name || 'Product Title'}
                    </h3>
                </div>

                {/* Pricing & Spacer */}
                <div className="mt-auto flex items-end justify-between pt-1">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-gray-900 tracking-tight">
                                ₹{price.toLocaleString('en-IN')}
                            </span>
                            {/* Original Price */}
                            {originalPrice > price && (
                                <span className="text-sm text-gray-400 line-through font-medium">
                                    ₹{originalPrice.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPreview;
