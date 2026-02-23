import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../models/AdminAuthContext';
import { Plus, Trash2, Image as ImageIcon, Link as LinkIcon, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const Marketing = () => {
    const { adminApi } = useAdminAuth();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Dialog state
    const [bannerToDelete, setBannerToDelete] = useState(null);

    // Form state
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [title, setTitle] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const { data } = await adminApi.get(`${API_URL}/banners/all`);
            setBanners(data);
        } catch (error) {
            toast.error('Failed to load banners');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('images', file);

        // We use the existing upload route which accepts 'images' array
        const { data } = await adminApi.post(`${API_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return data.images[0].url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile && banners.length === 0) {
            toast.error('Please select an image for the banner');
            return;
        }

        try {
            setIsSubmitting(true);
            let uploadedImageUrl = '';

            if (imageFile) {
                uploadedImageUrl = await uploadImage(imageFile);
            }

            if (!uploadedImageUrl) {
                toast.error('Failed to upload image. Please try again.');
                return;
            }

            const payload = {
                image: uploadedImageUrl,
                title,
                linkUrl,
                isActive
            };

            await adminApi.post(`${API_URL}/banners`, payload);
            toast.success('Banner created successfully!');

            // Reset form
            setImageFile(null);
            setImagePreview('');
            setTitle('');
            setLinkUrl('');
            setIsActive(true);

            fetchBanners();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create banner');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmDelete = async () => {
        if (!bannerToDelete) return;

        try {
            await adminApi.delete(`${API_URL}/banners/${bannerToDelete}`);
            toast.success('Banner deleted');
            fetchBanners();
        } catch (error) {
            toast.error('Failed to delete banner');
            console.error(error);
        } finally {
            setBannerToDelete(null);
        }
    };

    const handleDeleteClick = (id) => {
        setBannerToDelete(id);
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            await adminApi.put(`${API_URL}/banners/${id}`, { isActive: !currentStatus });
            toast.success(`Banner ${!currentStatus ? 'activated' : 'deactivated'}`);
            fetchBanners();
        } catch (error) {
            toast.error('Failed to update status');
            console.error(error);
        }
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

                {/* Form Section */}
                <div className="xl:col-span-1 bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-sm self-start">
                    <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                            <Plus className="w-5 h-5 text-indigo-400" />
                        </div>
                        Add New Banner
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3">Banner Image <span className="text-rose-500">*</span></label>
                            <div className="group relative border-2 border-dashed border-slate-700 rounded-2xl p-2 text-center hover:border-indigo-500 hover:bg-slate-800/30 transition-all cursor-pointer overflow-hidden">
                                {imagePreview ? (
                                    <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden shadow-inner">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                            <ImageIcon className="w-8 h-8 text-white mb-2" />
                                            <span className="text-white font-bold">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-10 flex flex-col items-center">
                                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                            <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                        <span className="text-slate-300 font-bold mb-1">Click to upload banner</span>
                                        <span className="text-sm text-slate-500 font-medium">PNG, JPG, WEBP (Max 5MB)</span>
                                        <span className="text-xs text-indigo-400 mt-4 font-bold px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">Recommended: 1920x600px</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3">Banner Title <span className="text-slate-500 font-normal">(Optional)</span></label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium placeholder-slate-500 shadow-inner"
                                placeholder="e.g. Summer Sale 50% Off"
                            />
                        </div>

                        {/* Link URL */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3">Redirection Link</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LinkIcon className="w-5 h-5 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium placeholder-slate-500 shadow-inner"
                                    placeholder="/products or /deals"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2 font-medium">Where should the user go when clicking this banner?</p>
                        </div>

                        {/* Active Checkbox */}
                        <div className="pt-2">
                            <label className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-6 h-6 rounded-md border-2 border-slate-600 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white">Active Banner</span>
                                    <span className="text-xs font-medium text-slate-400">Make this banner visible on the homepage</span>
                                </div>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !imageFile}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white py-4 rounded-xl font-black text-lg transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Publish Banner'
                            )}
                        </button>
                    </form>
                </div>

                {/* List Section */}
                <div className="xl:col-span-2">
                    {banners.length === 0 ? (
                        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-16 text-center h-full flex flex-col items-center justify-center shadow-sm">
                            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner text-indigo-500">
                                <ImageIcon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight">No Banners Found</h3>
                            <p className="text-slate-400 max-w-md mx-auto text-lg font-medium leading-relaxed">
                                You haven't uploaded any custom banners yet. The homepage will display default placeholders.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {banners.map(banner => (
                                <div key={banner._id} className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-700 transition-all group flex flex-col pt-1 pl-1 pr-1">
                                    {/* Image Header */}
                                    <div className="relative aspect-[21/9] bg-slate-800 overflow-hidden rounded-[20px] m-1">
                                        <img src={banner.image} alt={banner.title || 'Banner'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />

                                        {/* Status Badge */}
                                        <div className="absolute top-3 left-3">
                                            {banner.isActive ? (
                                                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/90 text-white text-xs font-black tracking-wide backdrop-blur-md shadow-lg border border-white/20 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" /> ACTIVE
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 text-xs font-black tracking-wide backdrop-blur-md shadow-lg border border-slate-700/50 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-slate-500" /> INACTIVE
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h4 className="text-xl font-black text-white mb-3 line-clamp-1 truncate" title={banner.title}>{banner.title || 'Untitled Banner'}</h4>

                                        <div className="flex items-center gap-3 text-slate-400 text-sm mb-6 bg-slate-800/50 p-3 rounded-xl border border-slate-800/50">
                                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-500">
                                                <LinkIcon className="w-4 h-4" />
                                            </div>
                                            <span className="truncate font-medium">{banner.linkUrl || 'No redirection link set'}</span>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Uploaded On</span>
                                                <span className="text-sm font-bold text-slate-300">
                                                    {new Date(banner.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleStatus(banner._id, banner.isActive)}
                                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${banner.isActive ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 hover:border-emerald-500'}`}
                                                >
                                                    {banner.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(banner._id)}
                                                    className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/25 transition-all group/btn border border-transparent hover:border-rose-400"
                                                    title="Delete Banner"
                                                >
                                                    <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Radix UI Alert Dialog */}
            <AlertDialog.Root open={!!bannerToDelete} onOpenChange={(open) => !open && setBannerToDelete(null)}>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                    <AlertDialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-800 bg-slate-900 p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl">
                        <div className="flex flex-col gap-2 text-center sm:text-left">
                            <AlertDialog.Title className="text-xl font-bold text-white flex items-center gap-2">
                                <AlertCircle className="w-6 h-6 text-rose-500" />
                                Delete Banner
                            </AlertDialog.Title>
                            <AlertDialog.Description className="text-slate-400 font-medium">
                                Are you sure you want to delete this banner? This action cannot be undone and it will be permanently removed from the homepage carousel.
                            </AlertDialog.Description>
                        </div>
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
                            <AlertDialog.Cancel asChild>
                                <button className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors">
                                    Cancel
                                </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <button
                                    onClick={confirmDelete}
                                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20 transition-all active:scale-[0.98]"
                                >
                                    Yes, Delete Banner
                                </button>
                            </AlertDialog.Action>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    );
};

export default Marketing;
