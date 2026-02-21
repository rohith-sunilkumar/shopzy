import React, { useState } from 'react';
import { Plus, PackagePlus, X, Loader2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import ProductBasicInfo from './ProductBasicInfo';
import ProductPricing from './ProductPricing';
import ProductMediaUpload from './ProductMediaUpload';

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
                    {/* Header */}
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

                    {/* Body */}
                    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                        <div className="p-8 space-y-10">
                            <ProductBasicInfo formData={formData} errors={errors} handleInputChange={handleInputChange} />
                            <ProductPricing formData={formData} errors={errors} handleInputChange={handleInputChange} />
                            <ProductMediaUpload formData={formData} errors={errors} isUploading={isUploading} handleImageUpload={handleImageUpload} removeImage={removeImage} />
                        </div>
                    </div>

                    {/* Footer */}
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
        </Dialog.Root>
    );
};

export default CreateProductDialog;
