import React from 'react';
import { Upload, Box } from 'lucide-react';
import useProductController from '../../../controllers/useProductController';
import CreateProductDialog from '../../components/seller/CreateProductDialog';
import ProductTable from '../../components/seller/ProductTable';

const Products = () => {
    const {
        products,
        isInitialLoading,
        isSaving,
        isUploading,
        formData,
        errors,
        handleInputChange,
        handleImageUpload,
        removeImage,
        handleSave,
        deleteProduct,
        editProduct,
        duplicateProduct,
    } = useProductController();

    return (
        <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products Management</h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        <Box className="w-4 h-4" />
                        Manage your inventory, pricing, and product listings.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm shadow-sm active:scale-95">
                        <Upload className="w-4 h-4" />
                        Bulk Import
                    </button>
                    <CreateProductDialog
                        formData={formData}
                        errors={errors}
                        isSaving={isSaving}
                        isUploading={isUploading}
                        handleInputChange={handleInputChange}
                        handleImageUpload={handleImageUpload}
                        removeImage={removeImage}
                        handleSave={handleSave}
                    />
                </div>
            </div>

            {/* Product Table */}
            <ProductTable
                products={products}
                isInitialLoading={isInitialLoading}
                onDelete={deleteProduct}
                onEdit={editProduct}
                onDuplicate={duplicateProduct}
            />
        </div>
    );
};

export default Products;
