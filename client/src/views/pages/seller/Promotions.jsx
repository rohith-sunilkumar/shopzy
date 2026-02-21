import React from 'react';
import { Tag, Plus, Percent, Zap, Ticket } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';

const Promotions = () => {
    return (
        <div className="p-6 md:p-10 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Promotions & Discounts</h1>
                    <p className="text-gray-500 mt-1">Manage sales, create coupons, and join flash sales.</p>
                </div>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm">
                            <Plus className="w-4 h-4" />
                            Create Promotion
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out z-50" />
                        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-xl sm:rounded-xl">
                            <Dialog.Title className="text-xl font-semibold text-gray-900">New Promotion</Dialog.Title>
                            <div className="py-4 space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Promotion Name</label>
                                    <input className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Summer Sale" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Discount Percentage</label>
                                    <input type="number" className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="20" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Dialog.Close asChild>
                                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Cancel</button>
                                </Dialog.Close>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Create</button>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>

            <Tabs.Root defaultValue="discounts" className="flex flex-col w-full">
                <Tabs.List className="flex shrink-0 border-b border-gray-200 gap-6 overflow-x-auto">
                    <Tabs.Trigger value="discounts" className="flex items-center gap-2 pb-3 pt-2 text-sm font-medium text-gray-500 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap">
                        <Percent className="w-4 h-4" />
                        Active Discounts
                    </Tabs.Trigger>
                    <Tabs.Trigger value="coupons" className="flex items-center gap-2 pb-3 pt-2 text-sm font-medium text-gray-500 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap">
                        <Ticket className="w-4 h-4" />
                        Coupons
                    </Tabs.Trigger>
                    <Tabs.Trigger value="flash-sales" className="flex items-center gap-2 pb-3 pt-2 text-sm font-medium text-gray-500 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap">
                        <Zap className="w-4 h-4" />
                        Flash Sales
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="discounts" className="py-6 outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Black Friday Early Access</h3>
                                    <p className="text-sm text-gray-500 mt-1">20% off all Electronics</p>
                                </div>
                                <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">Active</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                                <span>Ends in 12 days</span>
                                <button className="text-blue-600 hover:underline font-medium">Edit</button>
                            </div>
                        </div>
                    </div>
                </Tabs.Content>

                <Tabs.Content value="coupons" className="py-6 outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm border-l-4 border-l-purple-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-mono font-bold text-lg text-gray-900">WELCOME20</h3>
                                    <p className="text-sm text-gray-500 mt-1">₹20 off on orders over ₹100</p>
                                </div>
                                <span className="text-sm font-medium text-gray-900">142 Used</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                                <span className="text-gray-500">No expiry date</span>
                                <button className="text-red-600 hover:underline font-medium">Deactivate</button>
                            </div>
                        </div>
                    </div>
                </Tabs.Content>

                <Tabs.Content value="flash-sales" className="py-6 outline-none">
                    <div className="p-8 text-center bg-gray-50 border border-gray-200 border-dashed rounded-xl">
                        <Zap className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No Active Flash Sales</h3>
                        <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">You haven't joined any platform flash sales yet. Check back later for upcoming events to boost your sales.</p>
                        <button className="mt-4 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm shadow-sm">
                            Browse Upcoming Events
                        </button>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
};

export default Promotions;
