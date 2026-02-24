import { useState, useEffect } from 'react';
import { useSellerAuth } from '../models/SellerAuthContext';
import toast from 'react-hot-toast';

const INITIAL_FORM_DATA = {
    name: '',
    description: '',
    category: 'Electronics',
    subCategory: '',
    price: '',
    discount: '',
    stock: '',
    sku: '',
    status: 'Active',
    images: []
};

const useProductController = () => {
    const { sellerApi } = useSellerAuth();
    const [products, setProducts] = useState([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price is required';
        if (!formData.stock || isNaN(formData.stock)) newErrors.stock = 'Stock is required';
        return newErrors;
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const uploadData = new FormData();
        files.forEach(file => {
            uploadData.append('images', file);
        });

        setIsUploading(true);
        try {
            const response = await sellerApi.post('/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data) {
                const newUrls = response.data.images.map(img => img.url);
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...newUrls]
                }));
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, images: error.response?.data?.message || 'Server error during upload' }));
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (urlToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter(url => url !== urlToRemove)
        }));
    };

    const handleSave = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
            };

            const response = await sellerApi.post("/products", payload);
            setProducts(prev => [response.data.product, ...prev]);
            setFormData(INITIAL_FORM_DATA);
            toast.success('Product created successfully! 🎉');
            return true;
        } catch (error) {
            console.error("Save product failed:", error);
            toast.error(error.response?.data?.message || 'Failed to save product');
            setErrors(prev => ({ ...prev, general: error.response?.data?.message || "Failed to save product" }));
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await sellerApi.get("/products/seller");
            setProducts(response.data);
        } catch (error) {
            console.error("Fetch products failed:", error);
        } finally {
            setIsInitialLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await sellerApi.delete(`/products/${productId}`);
            setProducts(prev => prev.filter(p => (p._id || p.id) !== productId));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error("Delete product failed:", error);
            toast.error(error.response?.data?.message || 'Failed to delete product');
        }
    };

    const editProduct = async (productId, updatedData) => {
        try {
            const payload = {
                ...updatedData,
                price: parseFloat(updatedData.price),
                stock: parseInt(updatedData.stock),
            };
            const response = await sellerApi.put(`/products/${productId}`, payload);
            setProducts(prev => prev.map(p =>
                (p._id || p.id) === productId ? response.data.product : p
            ));
            toast.success('Product updated successfully! ✏️');
            return true;
        } catch (error) {
            console.error("Edit product failed:", error);
            toast.error(error.response?.data?.message || 'Failed to update product');
            return false;
        }
    };

    const duplicateProduct = async (product) => {
        try {
            const payload = {
                name: `${product.name} (Copy)`,
                description: product.description || '',
                category: product.category || 'Electronics',
                subCategory: product.subCategory || '',
                price: product.price,
                discount: product.discount || 0,
                stock: product.stock,
                sku: '',
                status: 'Draft',
                images: product.images || [],
            };
            const response = await sellerApi.post("/products", payload);
            setProducts(prev => [response.data.product, ...prev]);
            toast.success('Product duplicated! 📋');
        } catch (error) {
            console.error("Duplicate product failed:", error);
            toast.error(error.response?.data?.message || 'Failed to duplicate product');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        isInitialLoading,
        isSaving,
        isUploading,
        formData,
        errors,
        setFormData,
        setErrors,
        handleInputChange,
        handleImageUpload,
        removeImage,
        handleSave,
        deleteProduct,
        editProduct,
        duplicateProduct,
        INITIAL_FORM_DATA,
    };
};

export default useProductController;
