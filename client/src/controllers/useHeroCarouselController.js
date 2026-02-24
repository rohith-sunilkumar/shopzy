import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { slides } from '../views/components/carousel/heroCarouselData';

const useHeroCarouselController = () => {
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

    return {
        banners,
        current,
        isPaused,
        setIsPaused,
        goTo,
        goNext,
        goPrev,
        handleSlideClick
    };
};

export default useHeroCarouselController;
