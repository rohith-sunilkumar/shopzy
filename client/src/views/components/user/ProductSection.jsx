import React from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { Sparkles, PackageX, ChevronRight } from 'lucide-react';

const ProductSection = ({
    products,
    loading,
    error,
    onAddToCart,
    title = "Featured Products",
    subtitle = "Handpicked For You",
    Icon = Sparkles,
    bgColor = "bg-white"
}) => {

    // 1. Loading State
    if (loading) {
        return (
            <section className={`${bgColor} py-8`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-pulse">
                        <div>
                            <div className="w-32 h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="w-64 h-10 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-48 h-10 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {[...Array(8)].map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // 2. Error State
    if (error) {
        return (
            <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center flex flex-col items-center justify-center ${bgColor}`}>
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PackageX className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong.</h3>
                <p className="text-gray-500 max-w-md mx-auto">{error}</p>
            </div>
        );
    }

    // 3. Empty State
    if (!products || products.length === 0) {
        return null;
    }

    // 4. Success Grid State
    return (
        <section className={`${bgColor} py-8 relative overflow-hidden group/section`}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Icon className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                            <span className="text-xs font-black text-indigo-600 tracking-[0.2em] uppercase">{subtitle}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                            {title}
                        </h2>
                    </div>

                    {/* View All Button */}
                    <button className="group flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors self-start md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md py-2">
                        View Collection
                        <span className="bg-gray-100 group-hover:bg-indigo-100 text-gray-500 group-hover:text-indigo-600 p-1.5 rounded-full transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </span>
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {/* Only taking 8 products to keep the grid neat for enterprise feel, usually a single row or two neat rows */}
                    {products.slice(0, 8).map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>

            </div>

            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none transition-opacity duration-700 group-hover/section:opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-50 rounded-full blur-3xl opacity-30 pointer-events-none hidden md:block transition-opacity duration-700 group-hover/section:opacity-50"></div>
        </section>
    );
};

export default ProductSection;
