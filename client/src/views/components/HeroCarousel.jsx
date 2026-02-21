import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        image: '/banners/electronics.png',
        alt: 'Up to 50% Off Electronics',
    },
    {
        image: '/banners/fashion.png',
        alt: 'New Season Fashion Collection',
    },
    {
        image: '/banners/deals.png',
        alt: 'Mega Deals Festival',
    },
    {
        image: '/banners/home_kitchen.png',
        alt: 'Home & Kitchen Essentials - Up to 40% Off',
    },
    {
        image: '/banners/beauty.png',
        alt: 'Luxury Beauty Collection',
    },
    {
        image: '/banners/sports.png',
        alt: 'Gear Up - Sports & Outdoors Sale',
    },
    {
        image: '/banners/toys.png',
        alt: 'Toys & Games - Fun for Everyone',
    },
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goTo = useCallback((index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning]);

    const goNext = useCallback(() => {
        goTo((current + 1) % slides.length);
    }, [current, goTo]);

    const goPrev = useCallback(() => {
        goTo((current - 1 + slides.length) % slides.length);
    }, [current, goTo]);

    // Auto-play
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(goNext, 4000);
        return () => clearInterval(timer);
    }, [isPaused, goNext]);

    return (
        <div
            className="relative w-full overflow-hidden group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ height: '350px' }}
        >
            {/* Slides */}
            <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, i) => (
                    <div key={i} className="w-full h-full flex-shrink-0">
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

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
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {slides.map((_, i) => (
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
        </div>
    );
};

export default HeroCarousel;
