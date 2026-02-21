import { useState, useEffect } from 'react';
import { useSellerAuth } from '../models/SellerAuthContext';
import { toast } from 'react-hot-toast';

const INITIAL_FORM = {
    name: '',
    type: 'discount',
    discountPercent: '',
    couponCode: '',
    discountValue: '',
    minOrderAmount: '',
    appliesTo: 'All Products',
    endDate: '',
};

const usePromotionsController = () => {
    const { sellerApi } = useSellerAuth();
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            const response = await sellerApi.get('/promotions');
            setPromotions(response.data);
        } catch (error) {
            console.error('Failed to fetch promotions:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => setForm(INITIAL_FORM);

    const handleCreate = async () => {
        if (!form.name.trim()) { toast.error('Promotion name is required'); return; }
        if (form.type === 'discount' && (!form.discountPercent || form.discountPercent <= 0)) {
            toast.error('Discount percentage is required'); return;
        }
        if (form.type === 'coupon' && !form.couponCode.trim()) {
            toast.error('Coupon code is required'); return;
        }

        try {
            setCreating(true);
            const payload = {
                ...form,
                discountPercent: Number(form.discountPercent) || 0,
                discountValue: Number(form.discountValue) || 0,
                minOrderAmount: Number(form.minOrderAmount) || 0,
                endDate: form.endDate || null,
            };
            const response = await sellerApi.post('/promotions', payload);
            setPromotions(prev => [response.data, ...prev]);
            toast.success('Promotion created!');
            setDialogOpen(false);
            resetForm();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create');
        } finally {
            setCreating(false);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        try {
            await sellerApi.patch(`/promotions/${id}/status`, { status: newStatus });
            setPromotions(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
            toast.success(`Promotion ${newStatus === 'Active' ? 'activated' : 'deactivated'}`);
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        try {
            await sellerApi.delete(`/promotions/${id}`);
            setPromotions(prev => prev.filter(p => p._id !== id));
            toast.success('Promotion deleted');
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const getDaysRemaining = (endDate) => {
        if (!endDate) return null;
        const diff = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
        if (diff < 0) return 'Expired';
        if (diff === 0) return 'Ends today';
        return `Ends in ${diff} day${diff > 1 ? 's' : ''}`;
    };

    const discounts = promotions.filter(p => p.type === 'discount');
    const coupons = promotions.filter(p => p.type === 'coupon');

    return {
        promotions,
        discounts,
        coupons,
        loading,
        dialogOpen,
        setDialogOpen,
        creating,
        form,
        setForm,
        handleCreate,
        handleToggleStatus,
        handleDelete,
        getDaysRemaining,
    };
};

export default usePromotionsController;
