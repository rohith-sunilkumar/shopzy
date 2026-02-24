import React from 'react';
import useHeroCarouselController from '../../controllers/useHeroCarouselController';
import HeroCarouselSlide from './carousel/HeroCarouselSlide';
import HeroCarouselControls from './carousel/HeroCarouselControls';

const HeroCarousel = () => {
    const {
        banners,
        current,
        setIsPaused,
        goTo,
        goNext,
        goPrev,
        handleSlideClick
    } = useHeroCarouselController();

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
                    <HeroCarouselSlide key={i} slide={slide} handleSlideClick={handleSlideClick} />
                ))}
            </div>

            <HeroCarouselControls
                banners={banners}
                current={current}
                goTo={goTo}
                goNext={goNext}
                goPrev={goPrev}
            />
        </div>
    );
};

export default HeroCarousel;
