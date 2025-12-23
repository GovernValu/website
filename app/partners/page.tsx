"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContent } from "../hooks/useContent";

export default function PartnersPage() {
    const { content, loading } = useContent<any>('partners');

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
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale" />
                <div className="absolute inset-0 bg-gradient-to-b from-onyx/90 via-onyx/50 to-onyx" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        {content.hero.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {content.hero.title} <br />
                        <span className="italic text-brand font-serif">{content.hero.titleHighlight}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        {content.hero.subtitle}
                    </p>
                </div>
            </header>

            {/* Intro Text */}
            <section className="py-20 bg-white text-onyx">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-6">{content.intro.sectionTitle}</h2>
                    <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-800">
                        &ldquo;{content.intro.quote}&rdquo;
                    </p>
                </div>
            </section>

            {/* Partners Grid */}
            <section className="py-24 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    {content.categories?.map((category: any, catIndex: number) => (
                        <div key={category.title} className="mb-24 last:mb-0 reveal" style={{ transitionDelay: `${catIndex * 100}ms` }}>
                            <div className="flex items-center gap-4 mb-10">
                                <h3 className="text-2xl font-serif text-onyx">{category.title}</h3>
                                <div className="h-px bg-gray-200 flex-grow" />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {category.partners?.map((partner: any, index: number) => (
                                    <div
                                        key={partner.name}
                                        className="group bg-white border border-gray-100 p-10 flex items-center justify-center hover:shadow-xl hover:border-brand/20 transition-all duration-500 cursor-pointer relative overflow-hidden h-40"
                                    >
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-gray-50 rounded-bl-3xl -mr-6 -mt-6 group-hover:bg-brand/10 transition-colors duration-500" />

                                        {/* Logo Placeholder */}
                                        <div className="text-center group-hover:scale-110 transition-transform duration-500">
                                            <div className="text-4xl font-serif font-bold text-gray-300 group-hover:text-brand transition-colors duration-500 mb-2">
                                                {partner.logo}
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-onyx transition-colors duration-500">
                                                {partner.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Become a Partner CTA */}
            <section className="py-24 bg-onyx text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
                    <h2 className="text-4xl font-serif mb-6">{content.cta.headline}</h2>
                    <p className="text-xl text-gray-400 font-light mb-10 max-w-2xl mx-auto">
                        {content.cta.subtitle}
                    </p>
                    <Link href={content.cta.buttonLink} className="inline-block px-10 py-4 bg-white text-onyx text-sm uppercase tracking-widest font-bold hover:bg-brand hover:text-white transition-colors duration-300">
                        {content.cta.buttonText}
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
