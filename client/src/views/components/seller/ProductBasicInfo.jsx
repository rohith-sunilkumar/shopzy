import React from 'react';
import { Info, AlertCircle, ChevronDown, ChevronUp, Check } from 'lucide-react';
import * as Select from '@radix-ui/react-select';

const PRODUCT_CATEGORIES = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books',
    'Beauty & Personal Care', 'Health & Wellness', 'Toys & Games',
    'Automotive', 'Groceries & Food', 'Furniture', 'Jewelry & Accessories',
    'Baby & Kids', 'Pet Supplies', 'Office & Stationery', 'Musical Instruments',
    'Art & Crafts', 'Travel & Luggage', 'Mobile & Tablets', 'Kitchen & Appliances'
];

const SUB_CATEGORIES = {
    'Electronics': ['Smartphones', 'Laptops & PCs', 'Audio', 'Wearables', 'Cameras', 'Accessories'],
    'Clothing': ['Men\'s Fashion', 'Women\'s Fashion', 'Kids\' Clothing', 'Shoes', 'Activewear'],
    'Home & Garden': ['Furniture', 'Decor', 'Bedding', 'Gardening Tools', 'Outdoor Decor'],
    'Sports': ['Fitness & Exercise', 'Outdoor Recreation', 'Team Sports', 'Cycling', 'Water Sports'],
    'Books': ['Fiction', 'Non-Fiction', 'Educational', 'Children\'s Books', 'Comics'],
    'Beauty & Personal Care': ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Bath & Body'],
    'Health & Wellness': ['Vitamins & Supplements', 'Personal Care', 'Medical Supplies', 'Fitness Tech'],
    'Toys & Games': ['Action Figures', 'Board Games', 'Educational Toys', 'Video Games', 'Outdoor Play'],
    'Automotive': ['Car Parts', 'Accessories', 'Tools & Equipment', 'Motorcycle Parts', 'Car Care'],
    'Groceries & Food': ['Fresh Produce', 'Pantry Staples', 'Snacks', 'Beverages', 'Organic'],
};

const ProductBasicInfo = ({ formData, errors, handleInputChange }) => {

    // Default subcategories if none defined for the selected category
    const availableSubCategories = formData.category && SUB_CATEGORIES[formData.category]
        ? SUB_CATEGORIES[formData.category]
        : ['General', 'Other'];

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
                <Info className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Basic Information</h3>
            </div>
            <div className="grid gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500 ring-1 ring-red-100' : 'border-gray-200'} rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
                        placeholder="e.g. Premium Wireless Headphones"
                    />
                    {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                        placeholder="Tell customers what makes your product special..."
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Category</label>
                        <Select.Root
                            value={formData.category}
                            onValueChange={(value) => {
                                handleInputChange({ target: { id: 'category', value } });
                                // Reset subcategory when category changes
                                handleInputChange({ target: { id: 'subCategory', value: '' } });
                            }}
                        >
                            <Select.Trigger className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer font-medium flex items-center justify-between outline-none">
                                <Select.Value placeholder="Select Category" />
                                <Select.Icon>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content
                                    className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden z-[100]"
                                    position="popper"
                                    sideOffset={4}
                                    style={{ maxHeight: 'min(300px, var(--radix-select-content-available-height))' }}
                                >
                                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                                        <ChevronUp className="w-4 h-4 text-gray-400" />
                                    </Select.ScrollUpButton>
                                    <Select.Viewport className="p-1.5">
                                        {PRODUCT_CATEGORIES.map((cat) => (
                                            <Select.Item
                                                key={cat}
                                                value={cat}
                                                className="relative flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 rounded-xl cursor-pointer outline-none hover:bg-blue-50 hover:text-blue-600 data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 transition-colors select-none"
                                            >
                                                <Select.ItemText>{cat}</Select.ItemText>
                                                <Select.ItemIndicator className="ml-auto">
                                                    <Check className="w-4 h-4 text-blue-500" />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                        ))}
                                    </Select.Viewport>
                                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </Select.ScrollDownButton>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Sub-Category</label>
                        <Select.Root
                            value={formData.subCategory || ''}
                            onValueChange={(value) => handleInputChange({ target: { id: 'subCategory', value } })}
                            disabled={!formData.category} // Disable if no main category selected
                        >
                            <Select.Trigger className={`w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer font-medium flex items-center justify-between outline-none ${!formData.category ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <Select.Value placeholder={formData.category ? "Select Sub-Category" : "Select a Category first"} />
                                <Select.Icon>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content
                                    className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden z-[100]"
                                    position="popper"
                                    sideOffset={4}
                                    style={{ maxHeight: 'min(300px, var(--radix-select-content-available-height))' }}
                                >
                                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                                        <ChevronUp className="w-4 h-4 text-gray-400" />
                                    </Select.ScrollUpButton>
                                    <Select.Viewport className="p-1.5">
                                        {availableSubCategories.map((sub) => (
                                            <Select.Item
                                                key={sub}
                                                value={sub}
                                                className="relative flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 rounded-xl cursor-pointer outline-none hover:bg-blue-50 hover:text-blue-600 data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 transition-colors select-none"
                                            >
                                                <Select.ItemText>{sub}</Select.ItemText>
                                                <Select.ItemIndicator className="ml-auto">
                                                    <Check className="w-4 h-4 text-blue-500" />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                        ))}
                                    </Select.Viewport>
                                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </Select.ScrollDownButton>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductBasicInfo;
