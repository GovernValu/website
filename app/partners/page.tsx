"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContent } from "../hooks/useContent";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";

export default function PartnersPage() {
    const { content, loading } = useContent<any>('partners');
    const { language } = useLanguage();
    const t = LABELS[language];

    useEffect(() => {
        if (loading || !content) return;

        setTimeout(() => {
            const reveals = document.querySelectorAll(".reveal");
            const revealOnScroll = () => {
                reveals.forEach((element) => {
                    const windowHeight = window.innerHeight;
                    const elementTop = element.getBoundingClientRect().top;
                    if (elementTop < windowHeight - 150) {
                        element.classList.add("active");
                    }
                });
            };
            window.addEventListener("scroll", revealOnScroll);
            revealOnScroll();
            return () => window.removeEventListener("scroll", revealOnScroll);
        }, 100);
    }, [loading, content]);

    if (loading) {
        return (
            <div className="min-h-screen bg-onyx flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!content) return null;

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-onyx text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-onyx to-onyx" />
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/5 transform skew-x-12"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        {content.hero?.badge || t.partnerships}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {content.hero?.title} <br />
                        <span className="italic text-brand font-serif">{content.hero?.titleHighlight}</span>
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        {content.hero?.subtitle}
                    </p>
                </div>
            </header>

            {/* Intro Section */}
            <section className="py-20 bg-white text-onyx">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-6">{content.intro?.sectionTitle}</h2>
                    <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-800">
                        &ldquo;{content.intro?.quote}&rdquo;
                    </p>
                </div>
            </section>

            {/* Partnerships Grid */}
            <section className="py-24 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {content.partnerships?.map((partnership: any, index: number) => (
                            <div
                                key={partnership.country}
                                className="group bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden reveal"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Logo Section */}
                                <div className="bg-gray-50 p-10 flex items-center justify-center min-h-[280px] group-hover:bg-brand/5 transition-colors duration-500">
                                    <img
                                        src={partnership.logo}
                                        alt={partnership.country}
                                        className="max-h-48 max-w-[320px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="p-8 border-t border-gray-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h3 className="text-xl font-serif text-onyx">{partnership.country}</h3>
                                    </div>
                                    <p className="text-gray-600 font-light leading-relaxed">{partnership.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Become a Partner CTA */}
            <section className="py-24 bg-onyx text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
                    <h2 className="text-4xl font-serif mb-6">{content.cta?.headline}</h2>
                    <p className="text-xl text-gray-400 font-light mb-10 max-w-2xl mx-auto">
                        {content.cta?.subtitle}
                    </p>
                    <Link href={content.cta?.buttonLink || "/contact"} className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-colors duration-300">
                        {content.cta?.buttonText}
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
