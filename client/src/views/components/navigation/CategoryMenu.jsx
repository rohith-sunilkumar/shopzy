import React from 'react';
import { Link } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown, Sparkles, Flame, Tag } from 'lucide-react';

const CategoryMenu = () => {
    return (
        <div className="hidden md:block bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NavigationMenu.Root className="relative flex justify-start w-full z-40">
                    <NavigationMenu.List className="flex items-center gap-1 h-12 m-0 p-0 list-none overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                        {/* Deals Dropdown */}
                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger className="whitespace-nowrap flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-md transition-colors outline-none group">
                                <span className="flex items-center gap-1.5">
                                    <Flame className="w-4 h-4 fill-red-600" />
                                    Hot Deals
                                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-data-[state=open]:-rotate-180" aria-hidden />
                                </span>
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content className="absolute top-full left-0 w-full sm:w-auto mt-1 data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight">
                                <div className="p-4 bg-white rounded-xl shadow-xl border border-gray-100 min-w-[300px] grid gap-3">
                                    <Link to="/deals" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-2 font-medium text-gray-900"><Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Flash Sales</div>
                                        <p className="text-sm text-gray-500 mt-1">Limited time offers ending soon</p>
                                    </Link>
                                    <Link to="/clearance" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-2 font-medium text-gray-900"><Tag className="w-4 h-4 text-green-500" /> Clearance</div>
                                        <p className="text-sm text-gray-500 mt-1">Up to 70% off selected items</p>
                                    </Link>
                                </div>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>

                        {/* Standard Links */}
                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/electronics" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Electronics
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/fashion" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Fashion
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/home" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Home & Kitchen
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/beauty" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Beauty
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/sports" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Sports & Outdoors
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/books" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Books
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/toys" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Toys
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/automotive" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Automotive
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/health" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Health & Wellness
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link to="/category/groceries" className="block px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    Groceries
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item className="ml-auto">
                            <NavigationMenu.Link asChild>
                                <Link to="/new" className="whitespace-nowrap flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors outline-none">
                                    <Sparkles className="w-4 h-4" />
                                    New Arrivals
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                            <div className="relative top-[70%] h-2 w-2 rotate-45 rounded-tl-sm bg-white border-t border-l border-gray-100" />
                        </NavigationMenu.Indicator>
                    </NavigationMenu.List>

                    <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
                        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-2 w-full origin-[center_top] overflow-hidden rounded-xl bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)] shadow-xl border border-gray-100" />
                    </div>
                </NavigationMenu.Root>
            </div>
        </div >
    );
};

// Missing Zap import fix
import { Zap } from 'lucide-react';

export default CategoryMenu;
