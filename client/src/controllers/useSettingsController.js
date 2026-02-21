import { useState, useEffect } from 'react';
import { useSellerAuth } from '../models/SellerAuthContext';
import { toast } from 'react-hot-toast';

const useSettingsController = () => {
    const { sellerApi, seller } = useSellerAuth();

    // Store form state
    const [storeForm, setStoreForm] = useState({
        storeName: '',
        description: '',
        email: '',
        phone: '',
        category: '',
        website: '',
        logo: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            pincode: '',
        },
    });
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    // Security state
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [changingPassword, setChangingPassword] = useState(false);
    const [showCurrentPw, setShowCurrentPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleting, setDeleting] = useState(false);

    // Populate form from seller data
    useEffect(() => {
        if (seller) {
            setStoreForm({
                storeName: seller.storeName || '',
                description: seller.description || '',
                email: seller.email || '',
                phone: seller.phone || '',
                category: seller.category || '',
                website: seller.website || '',
                logo: seller.logo || '',
                address: {
                    street: seller.address?.street || '',
                    city: seller.address?.city || '',
                    state: seller.address?.state || '',
                    country: seller.address?.country || '',
                    pincode: seller.address?.pincode || '',
                },
            });
            setLoading(false);
        }
    }, [seller]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setStoreForm(prev => ({
                ...prev,
                address: { ...prev.address, [field]: value }
            }));
        } else {
            setStoreForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveStore = async () => {
        if (!storeForm.storeName.trim()) {
            toast.error('Store name is required');
            return;
        }
        try {
            setSaving(true);
            await sellerApi.put('/profile', storeForm);
            toast.success('Store profile updated!');
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (!passwordForm.currentPassword || !passwordForm.newPassword) {
            toast.error('Please fill in all password fields'); return;
        }
        if (passwordForm.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters'); return;
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('Passwords do not match'); return;
        }
        try {
            setChangingPassword(true);
            await sellerApi.put('/change-password', {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });
            toast.success('Password changed successfully!');
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setChangingPassword(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!deletePassword) { toast.error('Password is required'); return; }
        try {
            setDeleting(true);
            await sellerApi.delete('/delete-account', { data: { password: deletePassword } });
            toast.success('Account deleted');
            setDeleteDialogOpen(false);
            window.location.href = '/';
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete account');
        } finally {
            setDeleting(false);
        }
    };

    return {
        seller,
        // Store
        storeForm,
        setStoreForm,
        saving,
        loading,
        handleChange,
        handleSaveStore,
        // Security
        passwordForm,
        setPasswordForm,
        changingPassword,
        showCurrentPw,
        setShowCurrentPw,
        showNewPw,
        setShowNewPw,
        deleteDialogOpen,
        setDeleteDialogOpen,
        deletePassword,
        setDeletePassword,
        deleting,
        handleChangePassword,
        handleDeleteAccount,
    };
};

export default useSettingsController;
