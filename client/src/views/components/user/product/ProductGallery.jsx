import React from 'react';
import { Share } from 'lucide-react';

const ProductGallery = ({ images, selectedImage, setSelectedImage, productName }) => {
    return (
        <div className="w-full lg:w-[40%] xl:w-[45%] flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 items-start">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] pb-2 md:pb-0 scrollbar-hide shrink-0">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-indigo-600 shadow-md ring-2 ring-indigo-600/20' : 'border-gray-200 hover:border-indigo-400'
                            }`}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover bg-gray-50" />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-grow aspect-square rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden relative group cursor-zoom-in">
                <img
                    src={images[selectedImage]}
                    alt={productName}
                    className="w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white text-gray-600 hover:text-indigo-600 transition-colors">
                    <Share className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ProductGallery;
