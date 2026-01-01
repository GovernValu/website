"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContent } from "../hooks/useContent";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";

const ICONS: Record<string, React.ReactNode> = {
    building: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    chart: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    shield: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    bank: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
    ),
    globe: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    users: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    )
};

export default function ServicesPage() {
    const { content, loading } = useContent<any>('services');
    const { language } = useLanguage();
    const t = LABELS[language];

    useEffect(() => {
        if (loading || !content) return;

        // Small delay to ensure DOM is ready
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
            <header className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-hero-pattern">
                <div className="absolute inset-0 bg-gradient-to-b from-onyx/90 to-onyx/70" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal">
                        {content.hero.title} <br />
                        <span className="italic text-brand font-serif">{content.hero.titleHighlight}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "100ms" }}>
                        {content.hero.subtitle}
                    </p>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <div className="w-px h-12 bg-gradient-to-b from-brand to-transparent" />
                </div>
            </header>

            {/* All Services Grid - NOW FIRST */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{t.ourServices}</h2>
                        <h3 className="text-4xl font-serif text-onyx">{t.whatWeOffer}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {content.services?.map((service: any, index: number) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="group p-8 bg-gray-50 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 reveal"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <div className="w-12 h-12 bg-brand/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand transition-colors duration-300 text-brand group-hover:text-white">
                                    {ICONS[service.icon] || ICONS['building']}
                                </div>
                                <h4 className="text-xl font-serif mb-3 text-onyx">{service.title}</h4>
                                <p className="text-gray-600 text-sm font-light leading-relaxed mb-4 line-clamp-3">{service.shortDescription}</p>
                                <span className="inline-flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-widest group-hover:underline">
                                    {t.exploreService}
                                    <svg className="w-3 h-3 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intro Text / Philosophy */}
            <section className="py-20 bg-onyx text-white">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-6">{content.methodology.sectionTitle}</h2>
                    <p className="text-2xl md:text-3xl font-serif leading-relaxed">
                        &ldquo;{content.methodology.quote}&rdquo;
                    </p>
                </div>
            </section>

            {/* Service Detail 1: Corporate Governance */}
            {content.services && content.services.length > 0 && (
                <section className="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 reveal">
                                <div className="relative">
                                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand opacity-50"></div>
                                    <img
                                        src={content.services[0].image}
                                        alt={content.services[0].title}
                                        className="w-full h-[500px] object-cover shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 reveal" style={{ transitionDelay: "100ms" }}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-brand/10 rounded-full text-brand">
                                        {ICONS[content.services[0].icon] || ICONS['building']}
                                    </div>
                                    <h2 className="text-3xl font-serif text-onyx">{content.services[0].title}</h2>
                                </div>
                                <p className="text-gray-600 font-light leading-relaxed mb-8">
                                    {content.services[0].fullDescription}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {content.services[0].benefits?.map((benefit: any, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-brand shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <div>
                                                <h4 className="font-bold text-onyx text-sm uppercase tracking-wide">{benefit.title}</h4>
                                                <p className="text-sm text-gray-500 mt-1">{benefit.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={`/services/${content.services[0].slug}`} className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest font-bold hover:underline">
                                    {t.learnMore}
                                    <svg className="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Service Detail 2: Investment Advisory (Dark) */}
            {content.services && content.services.length > 1 && (
                <section className="py-24 bg-onyx relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="reveal">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-white/10 rounded-full text-brand">
                                        {ICONS[content.services[1].icon] || ICONS['chart']}
                                    </div>
                                    <h2 className="text-3xl font-serif text-white">{content.services[1].title}</h2>
                                </div>
                                <p className="text-gray-400 font-light leading-relaxed mb-8">
                                    {content.services[1].fullDescription}
                                </p>
                                <ul className="space-y-6 mb-8">
                                    {content.services[1].benefits?.map((benefit: any, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 border-l border-brand/30 pl-6">
                                            <div>
                                                <h4 className="font-bold text-white text-sm uppercase tracking-wide">{benefit.title}</h4>
                                                <p className="text-sm text-gray-500 mt-1">{benefit.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={`/services/${content.services[1].slug}`} className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest font-bold hover:text-white transition-colors">
                                    {t.learnMore}
                                    <svg className="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="reveal" style={{ transitionDelay: "100ms" }}>
                                <div className="relative">
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand opacity-50"></div>
                                    <img
                                        src={content.services[1].image}
                                        alt={content.services[1].title}
                                        className="w-full h-[500px] object-cover shadow-2xl opacity-80 hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Service Detail 3: Risk & Intelligence */}
            {content.services && content.services.length > 2 && (
                <section className="py-24 bg-white text-onyx relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 reveal">
                                <div className="relative">
                                    <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand opacity-50"></div>
                                    <img
                                        src={content.services[2].image}
                                        alt={content.services[2].title}
                                        className="w-full h-[500px] object-cover shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 reveal" style={{ transitionDelay: "100ms" }}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-brand/10 rounded-full text-brand">
                                        {ICONS[content.services[2].icon] || ICONS['shield']}
                                    </div>
                                    <h2 className="text-3xl font-serif text-onyx">{content.services[2].title}</h2>
                                </div>
                                <p className="text-gray-600 font-light leading-relaxed mb-8">
                                    {content.services[2].fullDescription}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {content.services[2].benefits?.map((benefit: any, idx: number) => (
                                        <div key={idx} className="p-5 border border-gray-100 bg-gray-50 hover:border-brand/30 transition-colors">
                                            <h4 className="font-bold text-sm uppercase mb-2">{benefit.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{benefit.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link href={`/services/${content.services[2].slug}`} className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest font-bold hover:underline">
                                    {t.learnMore}
                                    <svg className="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Engagement Process */}
            <section className="py-24 bg-onyx-800 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.engagement.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif">{content.engagement.headline}</h3>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {content.engagement.steps?.map((step: any, index: number) => (
                            <div
                                key={index}
                                className="relative p-8 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors reveal"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <span className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/5">{step.number}</span>
                                <div className="w-12 h-12 rounded-full border border-brand flex items-center justify-center mb-6 text-brand">
                                    {index === 0 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                                    {index === 1 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                                    {index === 2 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                                    {index === 3 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                </div>
                                <h4 className="text-lg font-serif mb-3">{step.title}</h4>
                                <p className="text-sm text-gray-400 font-light leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-5xl font-serif text-onyx mb-8">
                        {content.cta.headline} <span className="text-brand">{content.cta.headlineHighlight}</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-light mb-10 max-w-2xl mx-auto">
                        {content.cta.subtitle}
                    </p>
                    <Link href={content.cta.buttonLink} className="inline-block px-10 py-4 bg-onyx text-white text-sm uppercase tracking-widest font-bold hover:bg-brand transition-colors duration-300">
                        {content.cta.buttonText}
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
