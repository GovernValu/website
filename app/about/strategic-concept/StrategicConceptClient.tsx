"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function StrategicConceptClient({ content }: { content: any }) {

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

    const { hero, concept, strategy, vision, mission, values, objectives, cta } = content;

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
                        {hero?.title}
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

            {/* Company Concept Section */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{concept?.sectionTitle}</h2>
                            <h3 className="text-4xl font-serif text-onyx mb-8 leading-tight">
                                {concept?.headline}
                            </h3>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                                {concept?.paragraphs?.map((p: string, i: number) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <h4 className="text-xl font-serif text-onyx mb-6">{strategy?.headline}</h4>
                            <ul className="space-y-4">
                                {strategy?.items?.map((item: string, index: number) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <svg className="w-6 h-6 text-brand shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-6 bg-brand/5 border-l-4 border-brand">
                                <p className="text-gray-700 italic">
                                    {strategy?.vision2030}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="py-24 bg-onyx relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Vision */}
                        <div className="reveal">
                            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{vision?.sectionTitle}</h2>
                            <h3 className="text-3xl font-serif text-white mb-6">{vision?.headline}</h3>
                            <p className="text-gray-400 font-light leading-relaxed text-lg">
                                {vision?.content}
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{mission?.sectionTitle}</h2>
                            <h3 className="text-3xl font-serif text-white mb-6">{mission?.headline}</h3>
                            <p className="text-gray-400 font-light leading-relaxed text-lg">
                                {mission?.content}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{values?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-onyx">{values?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values?.items?.map((value: any, index: number) => (
                            <div key={index} className="bg-gray-50 p-8 border-t-4 border-brand reveal" style={{ transitionDelay: `${index * 50}ms` }}>
                                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-onyx mb-3">{value.title}</h4>
                                <p className="text-gray-600 font-light">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Objectives Section */}
            <section className="py-24 bg-onyx-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{objectives?.sectionTitle}</h2>
                            <h3 className="text-4xl font-serif text-white mb-8 leading-tight">
                                {objectives?.headline}
                            </h3>
                            <ul className="space-y-4">
                                {objectives?.items?.map((objective: string, index: number) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-brand/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-brand font-bold text-sm">{index + 1}</span>
                                        </div>
                                        <span className="text-gray-300 font-light">{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <img
                                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                                alt="Strategic Planning"
                                className="w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
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
