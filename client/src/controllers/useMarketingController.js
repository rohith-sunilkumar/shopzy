import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useMarketingController = (adminApi, API_URL) => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBanners = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await adminApi.get(`${API_URL}/banners/all`);
            setBanners(data);
        } catch (error) {
            toast.error('Failed to load banners');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [adminApi, API_URL]);

    useEffect(() => {
        fetchBanners();
    }, [fetchBanners]);

    const deleteBanner = async (id) => {
        try {
            await adminApi.delete(`${API_URL}/banners/${id}`);
            toast.success('Banner deleted');
            fetchBanners();
            return true;
        } catch (error) {
            toast.error('Failed to delete banner');
            console.error(error);
            return false;
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            await adminApi.put(`${API_URL}/banners/${id}`, { isActive: !currentStatus });
            toast.success(`Banner ${!currentStatus ? 'activated' : 'deactivated'}`);
            fetchBanners();
            return true;
        } catch (error) {
            toast.error('Failed to update status');
            console.error(error);
            return false;
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('images', file);
        const { data } = await adminApi.post(`${API_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data.images[0].url;
    };

    const createBanner = async (payload) => {
        try {
            await adminApi.post(`${API_URL}/banners`, payload);
            toast.success('Banner created successfully!');
            fetchBanners();
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create banner');
            console.error(error);
            return false;
        }
    };

    return {
        banners,
        loading,
        fetchBanners,
        deleteBanner,
        toggleStatus,
        uploadImage,
        createBanner
    };
};
