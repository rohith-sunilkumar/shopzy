import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';

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
        linkUrl: '/products?category=Toys',
        title: 'Toys & Games - Fun for Everyone'
    },
];

const HeroCarousel = () => {
    const [banners, setBanners] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const navigate = useNavigate();

    // Fetch dynamic banners
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { data } = await axiosInstance.get('/banners/active');
                if (data && data.length > 0) {
                    setBanners(data);
                } else {
                    setBanners(slides); // Fallback to static
                }
            } catch (error) {
                console.error('Failed to fetch banners, using fallback.', error);
                setBanners(slides); // Fallback on error
            }
        };
        fetchBanners();
    }, []);

    const goTo = useCallback((index) => {
        if (isTransitioning || banners.length === 0) return;
        setIsTransitioning(true);
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning, banners.length]);

    const goNext = useCallback(() => {
        if (banners.length <= 1) return;
        goTo((current + 1) % banners.length);
    }, [current, goTo, banners.length]);

    const goPrev = useCallback(() => {
        if (banners.length <= 1) return;
        goTo((current - 1 + banners.length) % banners.length);
    }, [current, goTo, banners.length]);

    // Auto-play
    useEffect(() => {
        if (isPaused || banners.length <= 1) return;
        const timer = setInterval(goNext, 4000);
        return () => clearInterval(timer);
    }, [isPaused, goNext, banners.length]);

    const handleSlideClick = (linkUrl) => {
        if (!linkUrl) return;

        // Check if external or internal link
        if (linkUrl.startsWith('http')) {
            window.open(linkUrl, '_blank');
        } else {
            navigate(linkUrl);
        }
    };

    if (banners.length === 0) return null;

    return (
        <div
            className="relative w-full overflow-hidden group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ height: '450px' }}
        >
            {/* Slides */}
            <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {banners.map((slide, i) => (
                    <div key={i} className="w-full h-full flex-shrink-0 relative">
                        <img
                            src={slide.image}
                            alt={slide.title || slide.alt || 'Banner'}
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                        {/* Overlay and Button Layer */}
                        {slide.linkUrl && (
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => handleSlideClick(slide.linkUrl)}
                                    className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold shadow-2xl hover:bg-indigo-600 hover:text-white hover:scale-105 transition-all flex items-center gap-2 pointer-events-auto"
                                >
                                    Explore Collection <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        )}
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
        </div>
    );
};

export default HeroCarousel;
