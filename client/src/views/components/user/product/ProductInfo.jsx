import React from 'react';
import { Link } from 'react-router-dom';
import { Star, RefreshCcw, Truck, ShieldCheck } from 'lucide-react';

const ProductInfo = ({ product, discount, originalPrice, price }) => {
    return (
        <div className="w-full lg:w-[35%] xl:w-[35%] flex flex-col gap-6">
            {/* Title & Brand */}
            <div className="border-b border-gray-100 pb-5">
                <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight mb-2">
                    {product.name}
                </h1>
                <div className="flex items-center gap-4 text-sm mt-3">
                    <Link to={`/seller/${product.seller?._id}`} className="text-indigo-600 hover:underline font-medium">
                        Visit the {product.seller?.businessName || 'Seller'} Store
                    </Link>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current text-gray-300" />
                        <span className="text-indigo-600 hover:underline ml-1">(128 ratings)</span>
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <div className="border-b border-gray-100 pb-5">
                {discount > 0 && (
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-red-500 text-2xl font-light">-{discount}%</span>
                        <span className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                )}
                <div className="flex items-start">
                    <span className="text-sm font-medium mt-1 mr-0.5">₹</span>
                    <span className="text-4xl font-semibold text-gray-900">{price.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                <p className="text-sm font-bold mt-2">
                    EMI <span className="font-normal">starts at ₹{Math.round(price / 12).toLocaleString('en-IN')}. No Cost EMI available</span>
                </p>
            </div>

            {/* Offers/Icons section (Amazon style "Returns/Delivery" widgets) */}
            <div className="flex justify-between items-start gap-2 py-4 border-b border-gray-100 overflow-x-auto scrollbar-hide">
                <div className="flex flex-col items-center text-center gap-2 min-w-[80px]">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <RefreshCcw className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] text-blue-600 font-medium leading-tight">7 days<br />Replacement</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 min-w-[80px]">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Truck className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] text-blue-600 font-medium leading-tight">Free<br />Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 min-w-[80px]">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] text-blue-600 font-medium leading-tight">1 Year<br />Warranty</span>
                </div>
            </div>

            {/* Description / About */}
            <div className="pt-2">
                <h3 className="text-lg font-bold text-gray-900 mb-3">About this item</h3>
                <div className="text-sm text-gray-800 space-y-2 whitespace-pre-wrap leading-relaxed">
                    {product.description}
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
