"use client";

import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ClientsPageClient({ content }: { content: any }) {

    useEffect(() => {
        if (!content) return;
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
        setTimeout(revealOnScroll, 100);
        return () => window.removeEventListener("scroll", revealOnScroll);
    }, [content]);

    if (!content) {
        return (
            <div className="min-h-screen bg-onyx flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const { hero, intro, clientTypes, testimonials, cta } = content;

    // Icon mapping for client types
    const getIcon = (iconType: string): React.ReactNode => {
        const icons: Record<string, React.ReactNode> = {
            government: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            corporate: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            finance: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            nonprofit: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            international: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            family: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        };
        return icons[iconType] || icons.corporate;
    };

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[70vh] flex items-center justify-center bg-hero-pattern">
                <div className="absolute inset-0 bg-gradient-to-b from-onyx/80 to-onyx/60" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        {hero?.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {hero?.title} <br />
                        <span className="italic text-brand font-serif">{hero?.titleHighlight}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        {hero?.subtitle}
                    </p>
                </div>
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <div className="w-px h-12 bg-gradient-to-b from-brand to-transparent" />
                </div>
            </header>

            {/* Introduction Section */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{intro?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-onyx mb-8 leading-tight">
                            {intro?.headline}
                        </h3>
                        <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                            {intro?.paragraphs?.map((p: string, i: number) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Types Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{clientTypes?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-onyx">{clientTypes?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {clientTypes?.items?.map((item: any, index: number) => (
                            <div key={index} className="bg-white p-8 border-t-4 border-brand shadow-lg hover:shadow-xl transition-shadow reveal" style={{ transitionDelay: `${index * 50}ms` }}>
                                <div className="w-16 h-16 bg-brand/5 rounded-full flex items-center justify-center mb-6 text-brand">
                                    {getIcon(item.icon)}
                                </div>
                                <h4 className="text-xl font-serif text-onyx mb-4">{item.title}</h4>
                                <p className="text-gray-600 font-light leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{testimonials?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-white">{testimonials?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials?.items?.map((item: any, index: number) => (
                            <div key={index} className="bg-onyx-800 p-8 border-l-4 border-brand reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                <svg className="w-8 h-8 text-brand opacity-50 mb-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-gray-300 font-light leading-relaxed mb-6 italic">
                                    &ldquo;{item.quote}&rdquo;
                                </p>
                                <div className="border-t border-gray-700 pt-4">
                                    <p className="text-white font-medium">{item.author}</p>
                                    <p className="text-brand text-sm">{item.company}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-4xl md:text-5xl font-serif text-onyx mb-6">
                        {cta?.headline} <span className="text-brand">{cta?.headlineHighlight}</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-light mb-10">
                        {cta?.subtitle}
                    </p>
                    <a href={cta?.buttonLink} className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                        {cta?.buttonText}
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
