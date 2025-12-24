"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContent } from "../hooks/useContent";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";

export default function NewsPage() {
    const { content, loading } = useContent<any>('news');
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
            <header className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-onyx text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30 filter grayscale" />
                <div className="absolute inset-0 bg-gradient-to-b from-onyx/90 via-onyx/50 to-onyx" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        {content.hero.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {content.hero.title} <br />
                        <span className="italic text-brand font-serif">{content.hero.titleHighlight}</span>
                    </h1>
                </div>
            </header>

            {/* Featured Article */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center reveal">
                        <div className="relative aspect-[16/9] lg:aspect-auto lg:h-[500px] bg-gray-100 overflow-hidden">
                            <div className="absolute inset-0 bg-brand/10 z-10 hover:bg-transparent transition-colors duration-500" />
                            <img
                                src={content.featured.image}
                                alt="Featured"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-brand text-xs font-bold tracking-[0.2em] uppercase mb-4">{content.featured.badge}</span>
                            <h2 className="text-4xl font-serif text-onyx mb-6 leading-tight hover:text-brand transition-colors cursor-pointer">
                                {content.featured.title}
                            </h2>
                            <p className="text-gray-500 font-light leading-relaxed mb-8">
                                {content.featured.description}
                            </p>
                            <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-onyx hover:text-brand transition-colors">
                                {content.featured.linkText}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* News Grip */}
            <section className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-12 reveal">
                        <h2 className="text-3xl font-serif text-onyx">{content.updates.title}</h2>
                        <div className="hidden md:flex gap-4">
                            {content.updates.filters?.map((filter: any) => (
                                <button key={filter.value} className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${filter.value === 'all' ? 'text-white bg-onyx' : 'text-gray-500 hover:text-onyx'}`}>
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {content.newsItems?.map((item: any, index: number) => (
                            <div
                                key={item.id}
                                className="group bg-white border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col reveal"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-onyx/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <span className="absolute top-4 left-4 z-20 bg-white text-onyx px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <span className="text-xs text-gray-400 font-medium mb-3 block">{item.date}</span>
                                    <h3 className="text-xl font-serif text-onyx mb-3 group-hover:text-brand transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                                        {item.excerpt}
                                    </p>
                                    <div className="mt-auto">
                                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand group-hover:underline">
                                            {t.readMore}
                                            <svg className="w-3 h-3 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16 reveal">
                        <button className="px-8 py-3 border border-onyx text-onyx text-sm uppercase tracking-widest font-bold hover:bg-onyx hover:text-white transition-colors duration-300">
                            {content.updates.loadMore}
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 bg-onyx text-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
                    <h2 className="text-3xl font-serif mb-4">{content.newsletter.title}</h2>
                    <p className="text-gray-400 font-light mb-8 max-w-xl mx-auto">
                        {content.newsletter.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder={content.newsletter.placeholder}
                            className="flex-grow bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand transition-colors"
                        />
                        <button className="px-8 py-3 bg-brand text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-colors">
                            {content.newsletter.buttonText}
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
