"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContent } from "../hooks/useContent";

export default function IndustriesPage() {
    const { content, loading } = useContent<any>('industries');
    const [scrolled, setScrolled] = useState(false);

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

    const banking = content.industries?.find((i: any) => i.slug === 'banking-finance');
    const sovereign = content.industries?.find((i: any) => i.slug === 'sovereign-wealth');
    const family = content.industries?.find((i: any) => i.slug === 'family-enterprises');

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

            {/* Intro Section */}
            <section className="py-20 bg-white text-onyx">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-6">{content.intro.sectionTitle}</h2>
                    <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-800">
                        {content.intro.description}
                    </p>
                </div>
            </section>

            {/* Industries Grid */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.industries?.map((industry: any, index: number) => (
                            <div
                                key={industry.slug}
                                className="group relative overflow-hidden bg-onyx h-[400px] reveal cursor-pointer"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={industry.image}
                                        alt={industry.title}
                                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/80 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-brand transition-colors">{industry.title}</h3>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{industry.description}</p>

                                    {/* Stats */}
                                    <div className="flex gap-6 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div>
                                            <span className="block text-brand font-serif text-lg">{industry.stats.clients}</span>
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500">Clients</span>
                                        </div>
                                        <div>
                                            <span className="block text-brand font-serif text-lg">{industry.stats.assets}</span>
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500">Assets Advised</span>
                                        </div>
                                    </div>

                                    <Link href={`/contact?industry=${industry.slug}`} className="inline-flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Inquire
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Industry: Banking & Finance */}
            {banking && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="reveal">
                                <div className="relative">
                                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand opacity-50"></div>
                                    <img
                                        src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2651&auto=format&fit=crop"
                                        alt="Banking District"
                                        className="w-full h-[500px] object-cover shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>
                            <div className="reveal" style={{ transitionDelay: "100ms" }}>
                                <span className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Featured Sector</span>
                                <h2 className="text-4xl font-serif text-onyx mb-6">{banking.title}</h2>
                                <p className="text-gray-600 font-light leading-relaxed mb-8">
                                    {banking.fullDescription || banking.description}
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {banking.detailedFeatures?.map((feature: any, idx: number) => (
                                        <div key={idx} className="p-4 bg-gray-50 border-l-2 border-brand">
                                            <h4 className="font-bold text-sm uppercase mb-1">{feature.title}</h4>
                                            <p className="text-xs text-gray-500">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact?industry=banking-finance" className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest font-bold hover:underline">
                                    Discuss Your Needs
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Industry: Sovereign Wealth */}
            {sovereign && (
                <section className="py-24 bg-onyx">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="reveal">
                                <span className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Premier Advisory</span>
                                <h2 className="text-4xl font-serif text-white mb-6">{sovereign.title}</h2>
                                <p className="text-gray-400 font-light leading-relaxed mb-8">
                                    {sovereign.fullDescription || sovereign.description}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {sovereign.detailedFeatures?.map((feature: any, idx: number) => (
                                        <li key={idx} className="flex items-center gap-3 border-l border-brand/30 pl-4">
                                            <span className="text-white text-sm">{feature.title}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact?industry=sovereign-wealth" className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest font-bold hover:text-white transition-colors">
                                    Request Consultation
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="reveal" style={{ transitionDelay: "100ms" }}>
                                <div className="relative">
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand opacity-50"></div>
                                    <img
                                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                                        alt="Investment Excellence"
                                        className="w-full h-[500px] object-cover shadow-2xl opacity-80 hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Industry: Family Enterprises */}
            {family && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 reveal">
                                <div className="relative">
                                    <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand opacity-50"></div>
                                    <img
                                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                                        alt="Family Business"
                                        className="w-full h-[500px] object-cover shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 reveal" style={{ transitionDelay: "100ms" }}>
                                <span className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Legacy & Continuity</span>
                                <h2 className="text-4xl font-serif text-onyx mb-6">{family.title}</h2>
                                <p className="text-gray-600 font-light leading-relaxed mb-8">
                                    {family.fullDescription || family.description}
                                </p>
                                <div className="space-y-4 mb-8">
                                    {family.detailedFeatures?.map((feature: any, idx: number) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center shrink-0 text-brand">
                                                <span className="font-serif font-bold">{idx + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-onyx">{feature.title}</h4>
                                                <p className="text-sm text-gray-500">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact?industry=family-enterprises" className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest font-bold hover:underline">
                                    Learn More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Stats Section */}
            <section className="py-16 bg-onyx-800 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {content.stats?.map((stat: any, index: number) => (
                            <div key={index} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                <p className="text-4xl font-serif text-brand mb-1">{stat.value}</p>
                                <p className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</p>
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
