import React from 'react';
import { ExternalLink } from 'lucide-react';

const HeroCarouselSlide = ({ slide, handleSlideClick }) => {
    return (
        <div className="w-full h-full flex-shrink-0 relative">
            <img
                src={slide.image}
                alt={slide.title || slide.alt || 'Banner'}
                className="w-full h-full object-cover"
                draggable={false}
            />

            {/* Always visible gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Text Overlay */}
            <div className="absolute bottom-16 left-0 right-0 px-12 md:px-24 flex flex-col items-center justify-end text-center pointer-events-none">
                <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mb-6 animate-in slide-in-from-bottom-4 duration-700">
                    {slide.title || slide.alt}
                </h2>
                {slide.linkUrl && (
                    <div className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <button
                            onClick={() => handleSlideClick(slide.linkUrl)}
                            className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold shadow-2xl hover:bg-indigo-600 hover:text-white hover:scale-105 transition-all flex items-center gap-2"
                        >
                            Explore Collection <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroCarouselSlide;
