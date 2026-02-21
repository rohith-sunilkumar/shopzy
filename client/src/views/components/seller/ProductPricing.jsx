import React from 'react';
import { Tag, AlertCircle, IndianRupee } from 'lucide-react';

const ProductPricing = ({ formData, errors, handleInputChange }) => {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
                <Tag className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Pricing & Inventory</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        Base Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none border-r border-gray-200 text-gray-400 group-focus-within:text-blue-500 group-focus-within:border-blue-500 transition-colors">
                            <IndianRupee className="w-4 h-4" />
                        </div>
                        <input
                            id="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            type="number"
                            className={`w-full bg-gray-50 border ${errors.price ? 'border-red-500 ring-1 ring-red-100' : 'border-gray-200'} rounded-2xl pl-14 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
                            placeholder="0.00"
                        />
                    </div>
                    {errors.price && <p className="text-xs text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.price}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Discount Percentage</label>
                    <div className="relative">
                        <input
                            id="discount"
                            value={formData.discount}
                            onChange={handleInputChange}
                            type="number"
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all pr-12"
                            placeholder="0"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 font-bold">%</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        type="number"
                        className={`w-full bg-gray-50 border ${errors.stock ? 'border-red-500 ring-1 ring-red-100' : 'border-gray-200'} rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
                        placeholder="0"
                    />
                    {errors.stock && <p className="text-xs text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.stock}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700 font-medium">SKU (Stock Keeping Unit)</label>
                    <input
                        id="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="e.g. WH-P100-BLUE"
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductPricing;
