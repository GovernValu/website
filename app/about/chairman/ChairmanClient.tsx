"use client";

import { useEffect } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ChairmanClient({ content }: { content: any }) {

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

    const { hero, message, quoteSection, cta } = content;

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] flex items-center justify-center bg-onyx">
                <div className="absolute inset-0 bg-gradient-to-br from-onyx via-onyx-800 to-onyx" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        {hero?.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {hero?.title}
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        {hero?.subtitle}
                    </p>
                </div>
            </header>

            {/* Chairman's Message Section */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-5 gap-16 items-start">
                        {/* Chairman Image */}
                        <div className="lg:col-span-2 reveal">
                            <div className="relative">
                                <div className="absolute top-4 -left-4 w-full h-full border border-brand/20 z-0" />
                                <div className="relative z-10 bg-gray-100 shadow-2xl overflow-hidden">
                                    <Image
                                        src="/board/chairman.jpg"
                                        alt={message?.signature?.name || "Chairman"}
                                        width={500}
                                        height={600}
                                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="mt-6 text-center">
                                    <h3 className="text-2xl font-serif text-onyx">{message?.signature?.name}</h3>
                                    <p className="text-brand text-sm font-bold tracking-widest uppercase mt-2">{message?.signature?.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Chairman's Message */}
                        <div className="lg:col-span-3 reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                                <p className="text-xl">{message?.intro}</p>

                                <blockquote className="border-l-4 border-brand pl-6 py-2 my-8 bg-gray-50">
                                    <p className="text-xl font-serif text-onyx italic">
                                        &ldquo;{message?.quote}&rdquo;
                                    </p>
                                </blockquote>

                                {message?.body?.map((paragraph: string, idx: number) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-1 bg-brand"></div>
                                    <div>
                                        <p className="font-serif text-onyx text-lg">{message?.signature?.name}</p>
                                        <p className="text-gray-500 text-sm">{message?.signature?.role}, GovernValu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-20 bg-onyx-800">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <svg className="w-10 h-10 text-brand mx-auto mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-2xl md:text-3xl font-serif text-white leading-relaxed italic mb-6">
                        &ldquo;{quoteSection?.text}&rdquo;
                    </blockquote>
                    <div className="text-brand text-sm font-bold tracking-widest uppercase">{quoteSection?.author}</div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-4xl md:text-5xl font-serif text-onyx mb-6">
                        {cta?.headline} <span className="text-brand">{cta?.headlineHighlight}</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-light mb-10">
                        {cta?.subtitle}
                    </p>
                    <a href={cta?.buttonLink || "/contact"} className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                        {cta?.buttonText}
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
