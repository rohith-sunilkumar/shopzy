import React from 'react';
import { Store, CreditCard, Truck, Receipt, Shield, Save } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';

const Settings = () => {
    return (
        <div className="h-full flex animate-in fade-in duration-500">
            <div className="bg-white overflow-hidden flex flex-col md:flex-row w-full">
                <Tabs.Root defaultValue="store" className="flex flex-col md:flex-row w-full" orientation="vertical">
                    <Tabs.List className="flex md:flex-col shrink-0 border-b md:border-b-0 md:border-r border-gray-200 md:w-64 bg-gray-50/50 overflow-x-auto md:overflow-visible">
                        <Tabs.Trigger value="store" className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:text-blue-700 data-[state=active]:bg-blue-50 data-[state=active]:border-b-2 md:data-[state=active]:border-b-0 md:data-[state=active]:border-r-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap text-left">
                            <Store className="w-5 h-5 shrink-0" />
                            Store Info
                        </Tabs.Trigger>
                        <Tabs.Trigger value="bank" className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:text-blue-700 data-[state=active]:bg-blue-50 data-[state=active]:border-b-2 md:data-[state=active]:border-b-0 md:data-[state=active]:border-r-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap text-left">
                            <CreditCard className="w-5 h-5 shrink-0" />
                            Bank Details
                        </Tabs.Trigger>
                        <Tabs.Trigger value="shipping" className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:text-blue-700 data-[state=active]:bg-blue-50 data-[state=active]:border-b-2 md:data-[state=active]:border-b-0 md:data-[state=active]:border-r-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap text-left">
                            <Truck className="w-5 h-5 shrink-0" />
                            Shipping
                        </Tabs.Trigger>
                        <Tabs.Trigger value="tax" className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:text-blue-700 data-[state=active]:bg-blue-50 data-[state=active]:border-b-2 md:data-[state=active]:border-b-0 md:data-[state=active]:border-r-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap text-left">
                            <Receipt className="w-5 h-5 shrink-0" />
                            Tax Info
                        </Tabs.Trigger>
                        <Tabs.Trigger value="security" className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:text-blue-700 data-[state=active]:bg-blue-50 data-[state=active]:border-b-2 md:data-[state=active]:border-b-0 md:data-[state=active]:border-r-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap text-left">
                            <Shield className="w-5 h-5 shrink-0" />
                            Security
                        </Tabs.Trigger>
                    </Tabs.List>

                    <div className="flex-1 p-6 md:p-8 bg-white outline-none">
                        <Tabs.Content value="store" className="outline-none space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Store Profile</h2>
                                <p className="text-sm text-gray-500 mt-1">Update your store's public information and appearance.</p>
                            </div>
                            <div className="grid gap-6 max-w-2xl">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Store Name</label>
                                    <input type="text" defaultValue="Tech Haven Electronics" className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Store Description</label>
                                    <textarea rows="4" defaultValue="Premium electronics and gadgets for tech enthusiasts." className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Contact Email</label>
                                    <input type="email" defaultValue="support@techhaven.com" className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm">
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="bank" className="outline-none space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Bank Details</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage where your payouts are sent.</p>
                            </div>
                            <div className="grid gap-6 max-w-2xl">
                                {/* Bank Content */}
                                <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Store className="w-6 h-6 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Chase Bank **** 4392</p>
                                            <p className="text-sm text-gray-500">Checking Account</p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">Active</span>
                                </div>
                                <button className="w-full py-2.5 border border-dashed border-gray-300 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
                                    + Add New Bank Account
                                </button>
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="shipping" className="outline-none space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Shipping Configurations</h2>
                                <p className="text-sm text-gray-500 mt-1">Set up your shipping zones and rates.</p>
                            </div>
                            <div className="grid gap-6 max-w-2xl">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Default Shipping Origin</label>
                                    <input type="text" defaultValue="123 Commerce St, New York, NY 10001" className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="tax" className="outline-none space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Tax Information</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage your tax IDs and collection settings.</p>
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="security" className="outline-none space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Security & Password</h2>
                                <p className="text-sm text-gray-500 mt-1">Keep your seller account secure.</p>
                            </div>
                        </Tabs.Content>
                    </div>
                </Tabs.Root>
            </div>
        </div>
    );
};

export default Settings;
