import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import ProductPreview from './ProductPreview';
import EditProductForm from './EditProductForm';
import { SUB_CATEGORIES } from './productCategoryData';

const EditProductDialog = ({ editOpen, setEditOpen, editData, handleEditChange, handleEditSave, saving }) => {

    // Derived subcategories based on current editData category
    const availableSubCategories = editData?.category && SUB_CATEGORIES[editData.category]
        ? SUB_CATEGORIES[editData.category]
        : ['General', 'Other'];

    const onCategoryChange = (e) => {
        handleEditChange(e);
        // Reset subCategory when category changes
        handleEditChange({ target: { name: 'subCategory', value: '' } });
    };

    return (
        <Dialog.Root open={editOpen} onOpenChange={setEditOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl rounded-2xl border border-gray-100 animate-in zoom-in-95 fade-in duration-200 max-h-[85vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 pb-0 sticky top-0 bg-white z-10">
                        <Dialog.Title className="text-xl font-bold text-gray-900">Edit Product</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    {editData && (
                        <div className="flex flex-col md:flex-row w-full">
                            <EditProductForm
                                editData={editData}
                                handleEditChange={handleEditChange}
                                handleEditSave={handleEditSave}
                                saving={saving}
                                availableSubCategories={availableSubCategories}
                                onCategoryChange={onCategoryChange}
                            />

                            {/* Live Preview Sidebar */}
                            <div className="hidden md:flex flex-col gap-4 w-72 shrink-0 border-l border-gray-100 pl-6 py-6 pr-6 bg-gray-50/30 rounded-r-2xl">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Preview</h4>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                </div>
                                <ProductPreview data={editData} />
                                <p className="text-xs text-gray-400 text-center px-4 leading-relaxed mt-2">
                                    This is how your product will appear to customers on the store.
                                </p>
                            </div>
                        </div>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default EditProductDialog;
