import React from 'react';
import { Save, Upload, ChevronDown, Check } from 'lucide-react';
import * as Select from '@radix-ui/react-select';

const storeCategories = [
    'Electronics', 'Fashion & Apparel', 'Home & Garden', 'Health & Beauty',
    'Sports & Outdoors', 'Books & Media', 'Toys & Games', 'Food & Grocery',
    'Automotive', 'Jewelry & Accessories', 'Art & Crafts', 'Pet Supplies', 'Other'
];

const InputField = ({ label, name, type = 'text', placeholder = '', value, onChange }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            placeholder={placeholder}
            className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white"
        />
    </div>
);

const StoreInfoTab = ({ storeForm, setStoreForm, handleChange, handleSaveStore, saving }) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div>
                <h2 className="text-lg font-bold text-gray-900">Store Profile</h2>
                <p className="text-sm text-gray-500 mt-1">Update your store's public information and appearance.</p>
            </div>

            <div className="max-w-3xl space-y-8">
                {/* Store Logo */}
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                        {storeForm.logo ? (
                            <img src={storeForm.logo} alt="Store logo" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            <Upload className="w-6 h-6 text-gray-400" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Store Logo</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Paste a URL for your store logo</p>
                        <input
                            type="text"
                            name="logo"
                            value={storeForm.logo}
                            onChange={handleChange}
                            placeholder="https://example.com/logo.png"
                            className="mt-2 h-9 w-72 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        />
                    </div>
                </div>

                {/* Basic Info */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Store Name" name="storeName" placeholder="My Awesome Store" value={storeForm.storeName} onChange={handleChange} />
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Store Category</label>
                            <Select.Root value={storeForm.category} onValueChange={(val) => setStoreForm(prev => ({ ...prev, category: val }))}>
                                <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow data-[placeholder]:text-gray-400">
                                    <Select.Value placeholder="Select a category" />
                                    <Select.Icon>
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content
                                        className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
                                        position="popper"
                                        sideOffset={4}
                                    >
                                        <Select.Viewport className="p-1.5 max-h-[260px]">
                                            {storeCategories.map(cat => (
                                                <Select.Item
                                                    key={cat}
                                                    value={cat}
                                                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 rounded-lg cursor-pointer outline-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700 data-[state=checked]:font-semibold transition-colors"
                                                >
                                                    <Select.ItemIndicator className="w-4">
                                                        <Check className="w-4 h-4 text-blue-600" />
                                                    </Select.ItemIndicator>
                                                    <Select.ItemText>{cat}</Select.ItemText>
                                                </Select.Item>
                                            ))}
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Store Description</label>
                            <textarea
                                rows="3"
                                name="description"
                                value={storeForm.description}
                                onChange={handleChange}
                                placeholder="Tell customers about your store..."
                                className="flex w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-shadow bg-white"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Contact Email" name="email" type="email" placeholder="you@example.com" value={storeForm.email} onChange={handleChange} />
                        <InputField label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" value={storeForm.phone} onChange={handleChange} />
                        <InputField label="Website" name="website" type="url" placeholder="https://yourstore.com" value={storeForm.website} onChange={handleChange} />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Store Address</h3>
                    <div className="grid grid-cols-1 gap-5">
                        <InputField label="Street Address" name="address.street" placeholder="123 Commerce Street" value={storeForm.address.street} onChange={handleChange} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputField label="City" name="address.city" placeholder="Mumbai" value={storeForm.address.city} onChange={handleChange} />
                            <InputField label="State / Province" name="address.state" placeholder="Maharashtra" value={storeForm.address.state} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputField label="Country" name="address.country" placeholder="India" value={storeForm.address.country} onChange={handleChange} />
                            <InputField label="PIN Code" name="address.pincode" placeholder="400001" value={storeForm.address.pincode} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end border-t border-gray-100">
                    <button
                        onClick={handleSaveStore}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoreInfoTab;
