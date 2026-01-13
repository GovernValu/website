"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";
import { useContent } from "@/app/hooks/useContent";

interface Service {
    slug: string;
    title: string;
    shortDescription: string;
    icon: string;
}

// Icon mapping
const ICONS: Record<string, React.ReactNode> = {
    building: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    bank: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />,
    globe: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
};

interface ServicesCarouselProps {
    sectionTitle?: string;
    headline?: string;
}

export default function ServicesCarousel({ sectionTitle, headline }: ServicesCarouselProps) {
    const { content, loading } = useContent<any>('services');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const carouselRef = useRef<HTMLDivElement>(null);
    const { language } = useLanguage();
    const t = LABELS[language];

    // Get services from content
    const services: Service[] = content?.services || [];

    // Auto-scroll every 4 seconds
    useEffect(() => {
        if (!isAutoPlaying || services.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % services.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, services.length]);

    const scrollToIndex = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % services.length);
    };

    if (loading) {
        return (
            <section id="expertise" className="py-24 bg-white text-onyx relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    if (services.length === 0) {
        return null;
    }

    // Calculate visible cards (show 4 on desktop, 2 on tablet, 1 on mobile)
    const getVisibleServices = () => {
        const result = [];
        const visibleCount = Math.min(4, services.length);
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % services.length;
            result.push({ ...services[index], displayIndex: i });
        }
        return result;
    };

    const visibleServices = getVisibleServices();

    return (
        <section id="expertise" className="py-24 bg-white text-onyx relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex items-end justify-between mb-16">
                    <div className="max-w-3xl">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">
                            {sectionTitle || t.ourExpertise}
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-onyx leading-tight">
                            {headline || t.expertiseHeadline}
                        </h3>
                        <div className="w-24 h-1 bg-brand mt-6" />
                    </div>

                    {/* Navigation Arrows */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-all duration-300 group"
                            aria-label="Previous"
                        >
                            <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-all duration-300 group"
                            aria-label="Next"
                        >
                            <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative overflow-hidden" ref={carouselRef}>
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500"
                    >
                        {visibleServices.map((service, index) => (
                            <Link
                                key={`${service.slug}-${currentIndex}-${index}`}
                                href={`/services/${service.slug}`}
                                className="group p-8 border border-gray-100 bg-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 reveal block"
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                <div className="w-12 h-12 bg-brand/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand transition-colors duration-300">
                                    <svg className="text-brand w-6 h-6 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {ICONS[service.icon] || ICONS.building}
                                    </svg>
                                </div>
                                <h4 className="text-xl font-serif mb-4 line-clamp-2 min-h-[56px]">{service.title}</h4>
                                <p className="text-gray-600 leading-relaxed mb-6 font-light line-clamp-3 min-h-[72px]">
                                    {service.shortDescription}
                                </p>
                                <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand group-hover:underline">
                                    {t.learnMore}
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex items-center justify-center gap-2 mt-10">
                    {services.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsAutoPlaying(false);
                                scrollToIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-brand w-8"
                                    : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* View All Services Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand text-brand text-sm uppercase tracking-widest font-bold hover:bg-brand hover:text-white transition-all duration-300"
                    >
                        {t.viewAllServices || "View All Services"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
