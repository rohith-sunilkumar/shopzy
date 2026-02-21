import React, { useState } from 'react';
import {
    Plus,
    PackagePlus,
    X,
    Info,
    AlertCircle,
    Loader2,
    Image as ImageIcon,
    IndianRupee,
    Tag,
    Trash,
    ChevronDown,
    ChevronUp,
    Check
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';

const CreateProductDialog = ({
    formData,
    errors,
    isSaving,
    isUploading,
    handleInputChange,
    handleImageUpload,
    removeImage,
    handleSave
}) => {
    const [open, setOpen] = useState(false);

    const onSave = async () => {
        const success = await handleSave();
        if (success) {
            setOpen(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-sm shadow-lg shadow-blue-100 active:scale-95">
                    <Plus className="w-4 h-4" />
                    Create Product
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
                <Dialog.Content
                    className="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl sm:rounded-3xl border border-gray-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
                    onWheel={(e) => e.stopPropagation()}
                >

                    {/* Modal Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10 sm:rounded-t-3xl" style={{ flexShrink: 0 }}>
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                <PackagePlus className="w-6 h-6" />
                            </div>
                            <div>
                                <Dialog.Title className="text-xl font-bold text-gray-900">Add New Product</Dialog.Title>
                                <Dialog.Description className="text-sm text-gray-500">List your merchandise on the marketplace.</Dialog.Description>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button className="p-2.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all outline-none">
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Modal Body - Scrollable */}
                    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                        <div className="p-8 space-y-10">
                            {/* Section 1: Basic Information */}
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
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-700">Category</label>
                                        <Select.Root
                                            value={formData.category}
                                            onValueChange={(value) => handleInputChange({ target: { id: 'category', value } })}
                                        >
                                            <Select.Trigger className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer font-medium flex items-center justify-between outline-none">
                                                <Select.Value />
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
                                                        {[
                                                            'Electronics',
                                                            'Clothing',
                                                            'Home & Garden',
                                                            'Sports',
                                                            'Books',
                                                            'Beauty & Personal Care',
                                                            'Health & Wellness',
                                                            'Toys & Games',
                                                            'Automotive',
                                                            'Groceries & Food',
                                                            'Furniture',
                                                            'Jewelry & Accessories',
                                                            'Baby & Kids',
                                                            'Pet Supplies',
                                                            'Office & Stationery',
                                                            'Musical Instruments',
                                                            'Art & Crafts',
                                                            'Travel & Luggage',
                                                            'Mobile & Tablets',
                                                            'Kitchen & Appliances'
                                                        ].map((cat) => (
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
                                </div>
                            </section>

                            {/* Section 2: Pricing & Inventory */}
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

                            {/* Section 3: Media */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
                                    <ImageIcon className="w-4 h-4 text-blue-500" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Product Media</h3>
                                </div>

                                <input
                                    type="file"
                                    id="imageInput"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                />

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {formData.images.map((url, index) => (
                                        <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                                            <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => removeImage(url)}
                                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                    title="Remove Image"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {index === 0 && (
                                                <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wider shadow-sm">
                                                    Main Photo
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {formData.images.length < 10 && (
                                        <div
                                            onClick={() => document.getElementById('imageInput').click()}
                                            className={`aspect-square border-2 border-dashed ${errors.images ? 'border-red-200 bg-red-50/5' : 'border-gray-200 bg-gray-50/50'} rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group`}
                                        >
                                            {isUploading ? (
                                                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                                            ) : (
                                                <>
                                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm text-gray-400 flex items-center justify-center mb-2 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                                                        <Plus className="w-5 h-5" />
                                                    </div>
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Add Photo</p>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {errors.images && <p className="text-xs text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.images}</p>}
                                <p className="text-[10px] text-gray-400 font-medium">You can upload up to 10 images. The first image will be your main product photo.</p>
                            </section>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end gap-3 z-10 sm:rounded-b-3xl" style={{ flexShrink: 0 }}>
                        <Dialog.Close asChild>
                            <button className="px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-2xl transition-all active:scale-95">Cancel</button>
                        </Dialog.Close>
                        <button
                            onClick={onSave}
                            disabled={isSaving}
                            className="min-w-[140px] px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold text-sm shadow-xl shadow-blue-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : 'Save Product'}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    );
};

export default CreateProductDialog;
