import React from 'react';
import { Loader2, Box } from 'lucide-react';
import EditProductDialog from './EditProductDialog';
import ProductTableRow from './ProductTableRow';
import useProductTableController from '../../../controllers/useProductTableController';

const ProductTable = ({ products, isInitialLoading, onDelete, onEdit, onDuplicate }) => {
    const {
        editOpen,
        setEditOpen,
        editData,
        saving,
        openEdit,
        handleEditChange,
        handleEditSave
    } = useProductTableController(onEdit);

    return (
        <>
            <div className="bg-white rounded-[2.5rem] border border-black shadow-xl shadow-gray-200/40 overflow-hidden animate-in slide-in-from-bottom-6 duration-700 delay-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-100">
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
                                    <ProductTableRow
                                        key={product._id || product.id}
                                        product={product}
                                        openEdit={openEdit}
                                        onDuplicate={onDuplicate}
                                        onDelete={onDelete}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Product Dialog */}
            <EditProductDialog
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                editData={editData}
                handleEditChange={handleEditChange}
                handleEditSave={handleEditSave}
                saving={saving}
            />
        </>
    );
};

export default ProductTable;
