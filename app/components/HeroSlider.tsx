"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Slide {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    image: string;
}

interface HeroSliderProps {
    slides: Slide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning || index === currentSlide) return;
        setIsTransitioning(true);
        setCurrentSlide(index);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [currentSlide, isTransitioning]);

    const nextSlide = useCallback(() => {
        goToSlide((currentSlide + 1) % slides.length);
    }, [currentSlide, slides.length, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }, [currentSlide, slides.length, goToSlide]);

    // Auto-advance slides
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [nextSlide, slides.length]);

    if (!slides || slides.length === 0) {
        return (
            <header className="relative h-screen min-h-[800px] flex items-center justify-center bg-hero-pattern">
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white mb-8 leading-tight tracking-tight">
                        Precision in <br />
                        <span className="italic text-brand font-serif">Governance.</span>
                    </h1>
                </div>
            </header>
        );
    }

    return (
        <header className="relative h-screen min-h-[800px] overflow-hidden">
            {/* Vertical Line Decor */}
            <div className="absolute left-10 md:left-24 top-0 bottom-0 w-px bg-white/10 hidden md:block z-20" />
            <div className="absolute right-10 md:right-24 top-0 bottom-0 w-px bg-white/10 hidden md:block z-20" />

            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Background Image with Ken Burns Effect */}
                    <div
                        className={`absolute inset-0 ${index === currentSlide ? "hero-ken-burns" : ""
                            }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-onyx/80 via-onyx/60 to-onyx/90" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center justify-center">
                        <div className="max-w-5xl mx-auto px-6 text-center">
                            {slide.subtitle && (
                                <span
                                    className={`inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 transition-all duration-700 delay-100 ${index === currentSlide
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                        }`}
                                >
                                    {slide.subtitle}
                                </span>
                            )}
                            <h1
                                className={`text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white mb-8 leading-tight tracking-tight transition-all duration-700 delay-200 ${index === currentSlide
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                    }`}
                                dangerouslySetInnerHTML={{ __html: slide.title }}
                            />
                            {slide.description && (
                                <p
                                    className={`mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 font-light leading-relaxed transition-all duration-700 delay-300 ${index === currentSlide
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                        }`}
                                >
                                    {slide.description}
                                </p>
                            )}
                            {slide.buttonText && slide.buttonLink && (
                                <div
                                    className={`mt-12 flex flex-col md:flex-row gap-6 justify-center items-center transition-all duration-700 delay-[400ms] ${index === currentSlide
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                        }`}
                                >
                                    <a
                                        href={slide.buttonLink}
                                        className="group relative px-8 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold overflow-hidden"
                                    >
                                        <span className="relative z-10 group-hover:text-white transition-colors">
                                            {slide.buttonText}
                                        </span>
                                        <div className="absolute inset-0 h-full w-full bg-brand-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </a>
                                    <a
                                        href="/about/expertise"
                                        className="flex items-center gap-2 text-white text-sm uppercase tracking-widest hover:text-brand transition-colors"
                                    >
                                        Explore Our Expertise
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-brand/80 text-white transition-all duration-300 backdrop-blur-sm group"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-brand/80 text-white transition-all duration-300 backdrop-blur-sm group"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Navigation Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`group relative h-3 transition-all duration-300 ${index === currentSlide ? "w-10" : "w-3 hover:w-6"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <span
                                className={`absolute inset-0 rounded-full transition-all duration-300 ${index === currentSlide
                                        ? "bg-brand"
                                        : "bg-white/30 group-hover:bg-white/60"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce z-20">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-brand to-transparent" />
            </div>
        </header>
    );
}
