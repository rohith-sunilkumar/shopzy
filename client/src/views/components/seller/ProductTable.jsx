import React, { useState } from 'react';
import {
    MoreHorizontal,
    Edit,
    Trash,
    PackagePlus,
    Loader2,
    Image as ImageIcon,
    Box,
    ListFilter,
    X,
    Save
} from 'lucide-react';
import { DropdownMenu, Badge } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';

const ProductTable = ({ products, isInitialLoading, onDelete, onEdit, onDuplicate }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [saving, setSaving] = useState(false);

    const openEdit = (product) => {
        setEditData({
            _id: product._id || product.id,
            name: product.name || '',
            description: product.description || '',
            category: product.category || '',
            price: product.price?.toString() || '',
            discount: product.discount?.toString() || '0',
            stock: product.stock?.toString() || '',
            sku: product.sku || '',
            status: product.status || 'Active',
            images: product.images || [],
        });
        setEditOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSave = async () => {
        if (!editData.name.trim() || !editData.price) return;
        setSaving(true);
        const success = await onEdit(editData._id, editData);
        setSaving(false);
        if (success) setEditOpen(false);
    };

    return (
        <>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden animate-in slide-in-from-bottom-6 duration-700 delay-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Product</th>
                                <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Inventory</th>
                                <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Pricing</th>
                                <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-6 text-right text-xs font-bold uppercase tracking-widest text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isInitialLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                                            <p className="text-gray-500 font-medium">Loading your products...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Box className="w-12 h-12 text-gray-300" />
                                            <p className="text-gray-500 font-medium">No products found. Start by creating one!</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id || product.id} className="hover:bg-blue-50/20 transition-all duration-300 group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 shrink-0 group-hover:scale-105 transition-transform shadow-sm overflow-hidden border border-gray-100">
                                                    {product.images && product.images.length > 0 ? (
                                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="w-7 h-7" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors uppercase tracking-tight">{product.name}</div>
                                                    <div className="text-xs text-gray-500 font-bold flex items-center gap-1.5 mt-1">
                                                        <ListFilter className="w-3 h-3 text-blue-400" />
                                                        {product.category}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-medium">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-gray-900 font-black tracking-tight">{product.stock} units</span>
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">SKU: {product.sku || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="text-gray-900 font-black text-lg tracking-tighter">
                                                ₹{product.price?.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <Badge
                                                variant="surface"
                                                color={
                                                    product.status === 'Active' ? 'green' :
                                                        product.status === 'Low Stock' ? 'orange' :
                                                            product.status === 'Draft' ? 'amber' : 'red'
                                                }
                                                className="px-3 py-1 font-black rounded-lg uppercase text-[10px] tracking-widest shadow-sm"
                                            >
                                                {product.status}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <DropdownMenu.Root>
                                                <DropdownMenu.Trigger asChild>
                                                    <button className="p-3 hover:bg-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 transition-all cursor-pointer outline-none active:scale-90">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </button>
                                                </DropdownMenu.Trigger>
                                                <DropdownMenu.Content variant="soft" highContrast className="z-40">
                                                    <DropdownMenu.Item shortcut="⌘ E" onClick={() => openEdit(product)}>
                                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Item shortcut="⌘ D" onClick={() => onDuplicate(product)}>
                                                        <PackagePlus className="mr-2 h-4 w-4" /> Duplicate
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Separator />
                                                    <DropdownMenu.Item color="red" shortcut="⌘ ⌫" onClick={() => onDelete(product._id || product.id)}>
                                                        <Trash className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenu.Item>
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Root>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Product Dialog */}
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
        </>
    );
};

export default ProductTable;
