import React, { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import * as Switch from '@radix-ui/react-switch';
import { Plus, Image as ImageIcon, Link as LinkIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const BannerForm = ({ banners, uploadImage, createBanner }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [title, setTitle] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [isActive, setIsActive] = useState(true);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
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

            const success = await createBanner(payload);

            if (success) {
                // Reset form
                setImageFile(null);
                setImagePreview('');
                setTitle('');
                setLinkUrl('');
                setIsActive(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
                    <Label.Root className="block text-sm font-bold text-slate-300 mb-3">Banner Image <span className="text-rose-500">*</span></Label.Root>
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
                    <Label.Root htmlFor="title" className="block text-sm font-bold text-slate-300 mb-3">Banner Title <span className="text-slate-500 font-normal">(Optional)</span></Label.Root>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium placeholder-slate-500 shadow-inner"
                        placeholder="e.g. Summer Sale 50% Off"
                    />
                </div>

                {/* Link URL */}
                <div>
                    <Label.Root htmlFor="linkUrl" className="block text-sm font-bold text-slate-300 mb-3">Redirection Link</Label.Root>
                    <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <LinkIcon className="w-5 h-5 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                        </div>
                        <input
                            id="linkUrl"
                            type="text"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium placeholder-slate-500 shadow-inner"
                            placeholder="/products or /deals"
                        />
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Where should the user go when clicking this banner?</p>
                </div>

                {/* Active Switch */}
                <div className="pt-2">
                    <label className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                        <Switch.Root
                            checked={isActive}
                            onCheckedChange={setIsActive}
                            className="w-[42px] h-[25px] bg-slate-600 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-indigo-500 outline-none cursor-default"
                            id="active-banner"
                        >
                            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                        </Switch.Root>
                        <div className="flex flex-col">
                            <Label.Root htmlFor="active-banner" className="text-sm font-bold text-white cursor-pointer">Active Banner</Label.Root>
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
    );
};

export default BannerForm;
