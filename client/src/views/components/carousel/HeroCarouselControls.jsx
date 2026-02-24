import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarouselControls = ({ banners, current, goTo, goNext, goPrev }) => {
    return (
        <>
            {/* Gradient overlays for arrows */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Prev/Next Arrows */}
            <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            {banners.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${i === current
                                ? 'w-8 h-2.5 bg-white shadow-md'
                                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default HeroCarouselControls;
