import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../models/AuthContext';
import { useSellerAuth } from '../../../models/SellerAuthContext';
import { Search, Heart, ShoppingCart, User, Home, Store } from 'lucide-react';

const MobileNavbar = () => {
    const { accessToken, openAuth } = useAuth();
    const { sellerToken, openSellerAuth } = useSellerAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Helper to check active state
    const isActive = (path) => location.pathname === path;

    return (
        <div className="md:hidden">
            {/* Top Bar Fix */}
            <div className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 z-50">
                <div className="flex items-center justify-between px-4 h-14">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl leading-none">S</span>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                            Shopzy
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => sellerToken ? navigate('/seller/overview') : openSellerAuth('login')}
                            className="p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                        >
                            <Store className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                            <Search className="w-6 h-6" />
                        </button>
                        <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white flex items-center justify-center text-[10px] font-bold rounded-full border border-white">
                                2
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Fixed Navigation */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 pb-safe">
                <div className="flex justify-around items-center h-16 px-2">
                    <Link to="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-gray-500'}`}>
                        <Home className={`w-6 h-6 ${isActive('/') ? 'fill-indigo-100' : ''}`} />
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>

                    <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 transition-colors focus:outline-none hover:text-indigo-600">
                        <Search className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Search</span>
                    </button>

                    <Link to="/saved" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive('/saved') ? 'text-indigo-600' : 'text-gray-500'}`}>
                        <Heart className={`w-6 h-6 ${isActive('/saved') ? 'fill-indigo-100' : ''}`} />
                        <span className="text-[10px] font-medium">Wishlist</span>
                    </Link>

                    <Link to="/cart" className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive('/cart') ? 'text-indigo-600' : 'text-gray-500'}`}>
                        <ShoppingCart className={`w-6 h-6 ${isActive('/cart') ? 'fill-indigo-100' : ''}`} />
                        <span className="text-[10px] font-medium">Cart</span>
                        <span className="absolute top-2 right-4 w-4 h-4 bg-red-500 text-white flex items-center justify-center text-[10px] font-bold rounded-full border-2 border-white">
                            2
                        </span>
                    </Link>

                    {accessToken ? (
                        <Link to="/dashboard" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-500'}`}>
                            <User className={`w-6 h-6 ${isActive('/dashboard') ? 'fill-indigo-100' : ''}`} />
                            <span className="text-[10px] font-medium">Account</span>
                        </Link>
                    ) : (
                        <button
                            onClick={() => openAuth('login')}
                            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 transition-colors focus:outline-none hover:text-indigo-600 cursor-pointer"
                        >
                            <User className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Sign In</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileNavbar;
