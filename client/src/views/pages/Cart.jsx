import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../features/cart/cartSlice';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalAmount, totalQuantity } = useSelector((state) => state.cart);

    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    const handleUpdateQuantity = (id, newQuantity) => {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    // Calculate dynamic savings and shipping
    const totalSaved = cartItems.reduce((sum, item) => {
        // Assume missing originalPrice means no discount for that item
        const original = item.originalPrice || item.price;
        return sum + (original - item.price) * item.quantity;
    }, 0);

    const subtotal = totalAmount;
    const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
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
                        <CartItem
                            key={item.id}
                            item={item}
                            handleUpdateQuantity={handleUpdateQuantity}
                            handleRemoveItem={handleRemoveItem}
                        />
                    ))}
                </div>

                {/* Order Summary Sidebar */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <OrderSummary
                        itemCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
                        subtotal={subtotal}
                        shipping={shipping}
                        totalSaved={totalSaved}
                        couponApplied={couponApplied}
                        discount={discount}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        applyCoupon={applyCoupon}
                        setCouponApplied={setCouponApplied}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
};

export default Cart;
