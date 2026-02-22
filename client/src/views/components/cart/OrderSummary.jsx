import React from 'react';
import { Tag, Truck, ShieldCheck } from 'lucide-react';

const OrderSummary = ({
    itemCount,
    subtotal,
    shipping,
    totalSaved,
    couponApplied,
    discount,
    couponCode,
    setCouponCode,
    applyCoupon,
    setCouponApplied,
    total
}) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                </div>
                {totalSaved > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Savings</span>
                        <span className="font-medium">−₹{totalSaved.toLocaleString('en-IN')}</span>
                    </div>
                )}
                {couponApplied && (
                    <div className="flex justify-between text-green-600">
                        <span>Coupon (SAVE10)</span>
                        <span className="font-medium">−₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                )}
            </div>

            <div className="border-t border-gray-100 my-5"></div>

            {/* Coupon Code */}
            {!couponApplied ? (
                <div className="flex gap-2 mb-5">
                    <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                    <button
                        onClick={applyCoupon}
                        className="px-4 h-10 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors active:scale-95"
                    >
                        Apply
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-5">
                    <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">SAVE10 applied</span>
                    </div>
                    <button onClick={() => { setCouponApplied(false); setCouponCode(''); }} className="text-xs text-red-500 font-medium hover:text-red-600">
                        Remove
                    </button>
                </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-baseline mb-6">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">₹{total.toLocaleString('en-IN')}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] text-sm">
                Proceed to Checkout
            </button>

            {/* Trust Badges */}
            <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Truck className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Free shipping over ₹999</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Secure checkout</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
