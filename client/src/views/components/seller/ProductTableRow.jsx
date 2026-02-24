import React from 'react';
import { MoreHorizontal, Edit, Trash, PackagePlus, Image as ImageIcon, ListFilter } from 'lucide-react';
import { DropdownMenu, Badge } from '@radix-ui/themes';

const ProductTableRow = ({ product, openEdit, onDuplicate, onDelete }) => {
    return (
        <tr className="hover:bg-blue-50/20 transition-all duration-300 group">
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
    );
};

export default ProductTableRow;
