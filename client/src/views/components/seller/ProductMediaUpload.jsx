import React from 'react';
import { Plus, Loader2, Image as ImageIcon, AlertCircle, Trash } from 'lucide-react';

const ProductMediaUpload = ({ formData, errors, isUploading, handleImageUpload, removeImage }) => {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Product Media</h3>
            </div>

            <input
                type="file"
                id="imageInput"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {formData.images.map((url, index) => (
                    <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                        <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                onClick={() => removeImage(url)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                title="Remove Image"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                        {index === 0 && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wider shadow-sm">
                                Main Photo
                            </div>
                        )}
                    </div>
                ))}

                {formData.images.length < 10 && (
                    <div
                        onClick={() => document.getElementById('imageInput').click()}
                        className={`aspect-square border-2 border-dashed ${errors.images ? 'border-red-200 bg-red-50/5' : 'border-gray-200 bg-gray-50/50'} rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group`}
                    >
                        {isUploading ? (
                            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                        ) : (
                            <>
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm text-gray-400 flex items-center justify-center mb-2 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Add Photo</p>
                            </>
                        )}
                    </div>
                )}
            </div>
            {errors.images && <p className="text-xs text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.images}</p>}
            <p className="text-[10px] text-gray-400 font-medium">You can upload up to 10 images. The first image will be your main product photo.</p>
        </section>
    );
};

export default ProductMediaUpload;
