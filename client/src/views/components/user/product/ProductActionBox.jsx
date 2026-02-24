import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductActionBox = ({ product, price, quantity, handleIncrement, handleDecrement, handleAddToCart }) => {
    return (
        <div className="w-full lg:w-[25%] xl:w-[20%] lg:sticky lg:top-24">
            <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
                {/* Action Box Price */}
                <div className="flex items-start mb-3">
                    <span className="text-sm font-medium mt-0.5 mr-0.5">₹</span>
                    <span className="text-2xl font-bold text-gray-900">{price.toLocaleString('en-IN')}</span>
                </div>

                {/* Delivery Estimate */}
                <div className="text-sm text-gray-900 mb-4 leading-snug">
                    <span className="text-blue-600 hover:underline cursor-pointer">FREE delivery</span>
                    <strong> Thursday, 28 March.</strong> Order within <span className="text-green-600">4 hrs 30 mins</span>.
                </div>

                {/* Stock Status */}
                {product.stock > 0 ? (
                    <div className="text-lg text-green-700 w-full mb-3">
                        In stock
                    </div>
                ) : (
                    <div className="text-lg text-red-600 font-medium mb-3">
                        Currently unavailable.
                    </div>
                )}

                {/* Sold By */}
                <div className="text-xs text-gray-500 mb-5 flex gap-1">
                    Ships from <span className="font-medium text-gray-900 ml-auto">Shopzy</span>
                    <br />
                    Sold by <Link to={`/seller/${product.seller?._id}`} className="text-blue-600 hover:underline ml-auto">{product.seller?.businessName || 'Seller'}</Link>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 mb-5 border border-gray-300 rounded-lg p-1 w-max shadow-sm">
                    <button
                        onClick={handleDecrement}
                        className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-600 font-medium transition-colors"
                        disabled={quantity <= 1 || product.stock === 0}
                    >
                        -
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-900">
                        {quantity}
                    </span>
                    <button
                        onClick={handleIncrement}
                        className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-600 font-medium transition-colors"
                        disabled={quantity >= (product.stock || 1) || product.stock === 0}
                    >
                        +
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 py-3 rounded-full text-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors focus:ring-2 focus:ring-[#f7ca00] focus:ring-offset-2 flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                    <button
                        disabled={product.stock === 0}
                        className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-gray-900 py-3 rounded-full text-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors focus:ring-2 focus:ring-[#fa8900] focus:ring-offset-2"
                    >
                        Buy Now
                    </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-center">
                    <button className="text-gray-500 hover:text-indigo-600 font-medium transition-colors flex items-center justify-center gap-2 w-full">
                        Add to Wish List
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductActionBox;
