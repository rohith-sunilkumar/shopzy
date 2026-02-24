import React, { useState } from 'react';
import { useAdminAuth } from '../../../models/AdminAuthContext';
import { Loader2 } from 'lucide-react';
import { useMarketingController } from '../../../controllers/useMarketingController';
import BannerForm from '../../components/admin/marketing/BannerForm';
import BannerList from '../../components/admin/marketing/BannerList';
import BannerDeleteDialog from '../../components/admin/marketing/BannerDeleteDialog';

const Marketing = () => {
    const { adminApi } = useAdminAuth();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const {
        banners,
        loading,
        uploadImage,
        createBanner,
        deleteBanner,
        toggleStatus
    } = useMarketingController(adminApi, API_URL);

    const [bannerToDelete, setBannerToDelete] = useState(null);

    const confirmDelete = async () => {
        if (!bannerToDelete) return;
        const success = await deleteBanner(bannerToDelete);
        if (success) {
            setBannerToDelete(null);
        }
    };

    const handleDeleteClick = (id) => {
        setBannerToDelete(id);
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
                <p className="text-slate-400 font-medium">Loading banners...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Marketing & Banners</h1>
                    <p className="text-slate-400 font-medium">Manage your homepage hero carousel banners</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <BannerForm
                    banners={banners}
                    uploadImage={uploadImage}
                    createBanner={createBanner}
                />

                <BannerList
                    banners={banners}
                    toggleStatus={toggleStatus}
                    handleDeleteClick={handleDeleteClick}
                />
            </div>

            <BannerDeleteDialog
                bannerToDelete={bannerToDelete}
                setBannerToDelete={setBannerToDelete}
                confirmDelete={confirmDelete}
            />
        </div>
    );
};

export default Marketing;
