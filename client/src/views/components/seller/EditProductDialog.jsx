import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Save } from 'lucide-react';

const EditProductDialog = ({ editOpen, setEditOpen, editData, handleEditChange, handleEditSave, saving }) => {
    return (
        <Dialog.Root open={editOpen} onOpenChange={setEditOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl rounded-2xl border border-gray-100 animate-in zoom-in-95 fade-in duration-200 max-h-[85vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 pb-0 sticky top-0 bg-white z-10">
                        <Dialog.Title className="text-xl font-bold text-gray-900">Edit Product</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    {editData && (
                        <div className="p-6 space-y-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-700">Product Name</label>
                                <input name="name" value={editData.name} onChange={handleEditChange}
                                    className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" value={editData.description} onChange={handleEditChange} rows="3"
                                    className="flex w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-shadow" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Category</label>
                                    <input name="category" value={editData.category} onChange={handleEditChange}
                                        className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">SKU</label>
                                    <input name="sku" value={editData.sku} onChange={handleEditChange}
                                        className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Price (₹)</label>
                                    <input type="number" name="price" value={editData.price} onChange={handleEditChange}
                                        className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Stock</label>
                                    <input type="number" name="stock" value={editData.stock} onChange={handleEditChange}
                                        className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Discount %</label>
                                    <input type="number" name="discount" value={editData.discount} onChange={handleEditChange}
                                        className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-700">Status</label>
                                <select name="status" value={editData.status} onChange={handleEditChange}
                                    className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white">
                                    <option value="Active">Active</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Low Stock">Low Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>

                            {/* Image preview */}
                            {editData.images.length > 0 && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Images</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {editData.images.map((img, i) => (
                                            <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-2">
                                <Dialog.Close asChild>
                                    <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                        Cancel
                                    </button>
                                </Dialog.Close>
                                <button
                                    onClick={handleEditSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default EditProductDialog;
