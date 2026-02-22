import React from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { Sparkles, PackageX } from 'lucide-react';

const ProductSection = ({
    products,
    loading,
    error,
    onAddToCart,
    title = "Featured Products",
    subtitle = "Handpicked For You",
    Icon = Sparkles,
    bgColor = "bg-gray-50/50"
}) => {

    // 1. Loading State
    if (loading) {
        return (
            <section className={`${bgColor} py-16 sm:py-24`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-pulse">
                        <div className="w-64 h-12 bg-gray-200 rounded"></div>
                        <div className="w-48 h-10 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-10">
                        {[...Array(10)].map((_, i) => (
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
            <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center min-h-[400px] flex flex-col items-center justify-center ${bgColor}`}>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PackageX className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Oops! We encountered a snag.</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">{error}</p>
            </div>
        );
    }

    // 3. Empty State
    if (!products || products.length === 0) {
        return null;
    }

    // 4. Success Grid State
    return (
        <section className={`${bgColor} py-16 sm:py-24`}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Icon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">{subtitle}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            {title}
                        </h2>
                    </div>
                    {/* View All Button Mock */}
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-5 py-2.5 rounded-full transition-colors self-start md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                        View Complete Collection →
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-10">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ProductSection;
