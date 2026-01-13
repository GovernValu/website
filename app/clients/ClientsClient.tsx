"use client";

import React, { useEffect } from "react";
import Link from "next/link";
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

    const { hero, intro, clients, cta } = content;

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative min-h-[60vh] flex items-center justify-center bg-onyx text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-onyx to-onyx" />
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-brand/5 transform -skew-x-12"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-24">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        {hero?.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {hero?.title} <br />
                        <span className="italic text-brand font-serif">{hero?.titleHighlight}</span>
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        {hero?.subtitle}
                    </p>
                </div>
            </header>

            {/* Introduction Section */}
            <section className="py-20 bg-white text-onyx">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{intro?.sectionTitle}</h2>
                    <h3 className="text-3xl md:text-4xl font-serif text-onyx leading-tight">
                        {intro?.headline}
                    </h3>
                </div>
            </section>

            {/* Clients Grid */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {clients?.map((client: any, index: number) => (
                            <div
                                key={client.name}
                                className="group bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden reveal"
                                style={{ transitionDelay: `${Math.min(index * 30, 300)}ms` }}
                            >
                                {/* Logo Section */}
                                <div className="bg-gray-50 p-6 flex items-center justify-center h-48 group-hover:bg-brand/5 transition-colors duration-500">
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className="max-h-28 max-w-[180px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="p-5 border-t border-gray-100">
                                    <h3 className="font-serif text-lg text-onyx line-clamp-1">{client.name}</h3>
                                    <p className="text-brand font-bold text-sm mt-1 mb-3">{client.services}</p>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-gray-600">{client.country}</span>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span className="text-gray-600">{client.field}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-onyx text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">
                        {cta?.headline} <span className="text-brand">{cta?.headlineHighlight}</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-light mb-10">
                        {cta?.subtitle}
                    </p>
                    <Link href={cta?.buttonLink || "/contact"} className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                        {cta?.buttonText}
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
