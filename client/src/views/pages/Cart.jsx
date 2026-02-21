import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Truck, ShieldCheck } from 'lucide-react';

const initialCartItems = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        brand: 'SoundMax',
        price: 4999,
        originalPrice: 7999,
        quantity: 1,
        image: 'https://placehold.co/120x120/f0f4ff/4f46e5?text=🎧',
        color: 'Midnight Black',
        inStock: true
    },
    {
        id: 2,
        name: 'Classic Cotton T-Shirt',
        brand: 'UrbanWear',
        price: 899,
        originalPrice: 1499,
        quantity: 2,
        image: 'https://placehold.co/120x120/f0fdf4/16a34a?text=👕',
        color: 'Navy Blue',
        inStock: true
    },
    {
        id: 3,
        name: 'Smart Fitness Band Pro',
        brand: 'FitTech',
        price: 2499,
        originalPrice: 3999,
        quantity: 1,
        image: 'https://placehold.co/120x120/fef2f2/dc2626?text=⌚',
        color: 'Space Grey',
        inStock: true
    }
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    const updateQuantity = (id, delta) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, Math.min(10, item.quantity + delta)) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalSaved = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + shipping - discount;

    const applyCoupon = () => {
        if (couponCode.trim().toUpperCase() === 'SAVE10') {
            setCouponApplied(true);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 text-center max-w-md">
                    Looks like you haven't added anything to your cart yet. Start exploring and find something you love!
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-500 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
                </div>
                <Link to="/" className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 space-y-4">
                    {/* Savings Banner */}
                    {totalSaved > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                <Tag className="w-4 h-4 text-green-600" />
                            </div>
                            <p className="text-sm text-green-800 font-medium">
                                You're saving <span className="font-bold">₹{totalSaved.toLocaleString('en-IN')}</span> on this order!
                            </p>
                        </div>
                    )}

                    {/* Items */}
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="flex gap-5">
                                {/* Product Image */}
                                <div className="w-28 h-28 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.brand}</p>
                                            <h3 className="text-base font-bold text-gray-900 mt-0.5">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Color: {item.color}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            title="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-end justify-between mt-4">
                                        {/* Price */}
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                                            {item.originalPrice > item.price && (
                                                <>
                                                    <span className="text-sm text-gray-400 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-0.5 bg-gray-50 rounded-xl border border-gray-200 p-0.5">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                disabled={item.quantity >= 10}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Sidebar */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
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
                </div>
            </div>
        </div>
    );
};

export default Cart;
