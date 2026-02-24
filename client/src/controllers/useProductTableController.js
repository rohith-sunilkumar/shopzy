import { useState } from 'react';

const useProductTableController = (onEdit) => {
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

    return {
        editOpen,
        setEditOpen,
        editData,
        saving,
        openEdit,
        handleEditChange,
        handleEditSave
    };
};

export default useProductTableController;
