import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ChevronDown } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/themes';
import useNavbarController from '../../../controllers/useNavbarController';
import AccountDropdown from './AccountDropdown';
import CartPopover from './CartPopover';

const DesktopNavbar = () => {
    const {
        accessToken,
        user,
        logout,
        openAuth,
        sellerToken,
        openSellerAuth,
        cartCount,
        cartTotal,
        cartItems,
        handleSellerNavigation
    } = useNavbarController();

    return (
        <div className="hidden md:block bg-white border-b border-gray-100 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl leading-none">S</span>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                            Shopzy
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl">
                        <div className="relative flex w-full h-11 bg-gray-50 border border-gray-200 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all shadow-sm">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <button className="h-full px-4 text-sm text-gray-600 bg-gray-100 border-r border-gray-200 outline-none cursor-pointer hover:bg-gray-200 transition-colors font-medium flex items-center gap-1">
                                        <div className="flex items-center gap-1">
                                            All Categories
                                            <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
                                        </div>
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content variant="soft">
                                    <DropdownMenu.Item>Electronics</DropdownMenu.Item>
                                    <DropdownMenu.Item>Fashion & Apparel</DropdownMenu.Item>
                                    <DropdownMenu.Item>Home & Kitchen</DropdownMenu.Item>
                                    <DropdownMenu.Item>Beauty & Personal Care</DropdownMenu.Item>
                                    <DropdownMenu.Item>Sports & Outdoors</DropdownMenu.Item>
                                    <DropdownMenu.Item>Books & Stationery</DropdownMenu.Item>
                                    <DropdownMenu.Item>Toys & Games</DropdownMenu.Item>
                                    <DropdownMenu.Item>Health & Wellness</DropdownMenu.Item>
                                    <DropdownMenu.Item>Automotive</DropdownMenu.Item>
                                    <DropdownMenu.Item>Groceries</DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            <input
                                type="text"
                                placeholder="Search for products, brands and more..."
                                className="flex-1 h-full px-4 text-sm bg-transparent outline-none placeholder:text-gray-400"
                            />
                            <button className="h-full px-6 bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center text-white">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-6 flex-shrink-0">
                        <AccountDropdown
                            accessToken={accessToken}
                            user={user}
                            logout={logout}
                            openAuth={openAuth}
                            sellerToken={sellerToken}
                            openSellerAuth={openSellerAuth}
                            handleSellerNavigation={handleSellerNavigation}
                        />

                        {/* Wishlist */}
                        <Link to="/saved" className="flex flex-col items-center gap-1 group relative">
                            <div className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                                <Heart className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-medium text-gray-500 group-hover:text-red-500">Saved</span>
                        </Link>

                        <CartPopover
                            cartCount={cartCount}
                            cartTotal={cartTotal}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopNavbar;
