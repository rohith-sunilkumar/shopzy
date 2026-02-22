import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full animate-pulse">

            {/* Image Skeleton */}
            <div className="aspect-square bg-gray-200"></div>

            {/* Content Skeleton */}
            <div className="p-4 flex flex-col flex-grow">

                {/* Category Skeleton */}
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>

                {/* Title Skeleton */}
                <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>

                {/* Rating Skeleton */}
                <div className="flex items-center gap-1 mb-3 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    ))}
                    <div className="w-8 h-3 bg-gray-200 rounded ml-1"></div>
                </div>

                {/* Price Skeleton */}
                <div className="mt-auto pb-3">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>

                {/* Button Skeleton */}
                <div className="w-full h-10 bg-gray-200 rounded-xl mt-2"></div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
