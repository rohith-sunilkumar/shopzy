import React from 'react';
import { User, LogOut, Package, MapPin, Heart, ChevronDown, Store } from 'lucide-react';
import { DropdownMenu, Avatar } from '@radix-ui/themes';

const AccountDropdown = ({
    accessToken,
    user,
    logout,
    openAuth,
    sellerToken,
    openSellerAuth,
    handleSellerNavigation
}) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors outline-none cursor-pointer group">
                    {accessToken ? (
                        <Avatar
                            size="2"
                            radius="full"
                            fallback={user?.name?.charAt(0) || 'U'}
                            src={user?.avatar}
                            variant="soft"
                            color="indigo"
                        />
                    ) : (
                        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            <User className="w-5 h-5" />
                        </div>
                    )}
                    <div className="hidden lg:flex flex-col items-start leading-tight">
                        <span className="text-xs text-gray-500 font-medium">Hello, {accessToken ? (user?.name || 'User') : 'Sign In'}</span>
                        <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                            Account & Lists <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </span>
                    </div>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content color="indigo" variant="soft" highContrast className="min-w-[220px]">
                {!accessToken ? (
                    <>
                        <div className="p-3 text-center border-b border-gray-50 mb-2">
                            <button
                                onClick={() => openAuth('login')}
                                className="block w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors mb-2 text-sm cursor-pointer outline-none"
                            >
                                Sign In
                            </button>
                            <p className="text-xs text-gray-500">
                                New customer? <button
                                    onClick={() => openAuth('register')}
                                    className="text-indigo-600 hover:underline font-semibold cursor-pointer outline-none bg-transparent border-none p-0 inline"
                                >
                                    Start here.
                                </button>
                            </p>
                        </div>
                        <DropdownMenu.Item
                            onClick={() => openSellerAuth('login')}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center w-full">
                                <Store className="w-4 h-4 mr-2 text-indigo-500" />
                                <span className="font-semibold text-indigo-600">Become a Seller</span>
                            </div>
                        </DropdownMenu.Item>
                    </>
                ) : (
                    <>
                        <div className="px-3 py-3 border-b border-gray-50 bg-gray-50/50 mb-1">
                            <div className="flex items-center gap-3">
                                <Avatar
                                    size="2"
                                    radius="full"
                                    fallback={user?.name?.charAt(0) || 'U'}
                                    src={user?.avatar}
                                    variant="soft"
                                    color="indigo"
                                />
                                <div className="flex flex-col min-w-0">
                                    <p className="text-xs font-bold text-gray-900 truncate tracking-tight">{user?.name || 'User Profile'}</p>
                                    <p className="text-[10px] text-gray-500 truncate">{user?.email || 'Individual Member'}</p>
                                </div>
                            </div>
                        </div>

                        <DropdownMenu.Item shortcut="⌘ P">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-gray-400 group-hover:text-indigo-600" /> My Profile
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item shortcut="⌘ O">
                            <div className="flex items-center">
                                <Package className="w-4 h-4 mr-2 text-gray-400 group-hover:text-indigo-600" /> My Orders
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item shortcut="⌘ A">
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400 group-hover:text-indigo-600" /> Addresses
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item shortcut="⌘ W">
                            <div className="flex items-center">
                                <Heart className="w-4 h-4 mr-2 text-gray-400 group-hover:text-indigo-600" /> Wishlist
                            </div>
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator />

                        <DropdownMenu.Item
                            onClick={handleSellerNavigation}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center w-full">
                                <Store className="w-4 h-4 mr-2 text-indigo-500" />
                                <span className="font-semibold text-indigo-600">
                                    {sellerToken ? 'Seller Dashboard' : 'Become a Seller'}
                                </span>
                            </div>
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator />

                        <DropdownMenu.Item
                            color="red"
                            onClick={logout}
                            className="font-medium"
                        >
                            <div className="flex items-center">
                                <LogOut className="w-4 h-4 mr-2" /> Sign Out
                            </div>
                        </DropdownMenu.Item>
                    </>
                )}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default AccountDropdown;
