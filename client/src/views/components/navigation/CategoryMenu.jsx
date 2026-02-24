import React from "react";
import { Link } from "react-router-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, Sparkles, Flame } from "lucide-react";
import { dropdownData, simpleLinks } from "./categoryData";

const CategoryMenu = () => {
    return (
        <div className="hidden md:block bg-white border-b border-gray-200 relative z-[999]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NavigationMenu.Root className="relative flex w-full">

                    <NavigationMenu.List className="flex items-center gap-1 h-12 list-none">

                        {/* Dropdown Categories */}
                        {dropdownData.map((category) => (
                            <NavigationMenu.Item key={category.label} className="relative">

                                <NavigationMenu.Trigger
                                    className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-md transition-colors group whitespace-nowrap
                  ${category.highlight
                                            ? "font-bold text-red-600 hover:bg-red-50"
                                            : "font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                                        }`}
                                >
                                    {category.highlight && (
                                        <Flame className="w-4 h-4 fill-red-600" />
                                    )}

                                    {category.label}

                                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-data-[state=open]:-rotate-180" />
                                </NavigationMenu.Trigger>

                                <NavigationMenu.Content
                                    className="absolute top-full left-0 pt-3"
                                >
                                    <div
                                        className="min-w-[280px] p-3 flex flex-col gap-2 backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300"
                                    >
                                        {category.items.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <Link
                                                    key={item.title}
                                                    to={item.to}
                                                    className="flex items-center gap-3 p-3 rounded-xl
                          hover:bg-gray-50 hover:shadow-sm
                          transition-all duration-200"
                                                >
                                                    <div className="bg-indigo-50 p-2 rounded-md">
                                                        <Icon className="w-4 h-4 text-indigo-600" />
                                                    </div>

                                                    <div>
                                                        <div className="font-medium text-sm text-gray-900">
                                                            {item.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {item.desc}
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>
                        ))}

                        {/* Simple Links */}
                        {simpleLinks.map((link) => (
                            <NavigationMenu.Item key={link.label}>
                                <NavigationMenu.Link asChild>
                                    <Link
                                        to={link.to}
                                        className="px-3 py-2 text-sm font-medium text-gray-700
                    hover:text-indigo-600 hover:bg-indigo-50
                    rounded-md whitespace-nowrap transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </NavigationMenu.Link>
                            </NavigationMenu.Item>
                        ))}

                        {/* New Arrivals */}
                        <NavigationMenu.Item className="ml-auto">
                            <NavigationMenu.Link asChild>
                                <Link
                                    to="/new"
                                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold
                  text-indigo-600 hover:bg-indigo-50
                  rounded-md transition-colors"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    New Arrivals
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                    </NavigationMenu.List>
                </NavigationMenu.Root>
            </div>
        </div>
    );
};

export default CategoryMenu;