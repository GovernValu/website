"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PhilosophyClient({ content }: { content: any }) {

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

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] flex items-center justify-center bg-onyx">
                <div className="absolute inset-0 bg-gradient-to-br from-onyx via-onyx-800 to-onyx" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        {content.hero?.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {content.hero?.title} <br />
                        <span className="italic text-brand font-serif">{content.hero?.titleHighlight}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        {content.hero?.subtitle}
                    </p>
                </div>
            </header>

            {/* Core Philosophy */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.coreBeliefs?.sectionTitle}</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-onyx mb-6 leading-tight">
                            {content.coreBeliefs?.headline}
                        </h3>
                        <div className="w-24 h-1 bg-brand" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {content.coreBeliefs?.items?.map((belief: any, index: number) => (
                            <div key={index} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="w-16 h-16 bg-brand/5 rounded-full flex items-center justify-center mb-6 text-brand">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-serif mb-4">{belief.title}</h4>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    {belief.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-24 bg-onyx-800">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <svg className="w-12 h-12 text-brand mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-3xl md:text-4xl font-serif text-white leading-relaxed italic mb-8">
                        &ldquo;{content.quote?.text}&rdquo;
                    </blockquote>
                    <div className="text-brand text-sm font-bold tracking-widest uppercase">{content.quote?.source}</div>
                </div>
            </section>

            {/* Integrated Approach Section */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="reveal">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                                alt="Strategic Planning"
                                className="w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.approach?.sectionTitle}</h2>
                            <h3 className="text-4xl font-serif text-onyx mb-8 leading-tight">
                                {content.approach?.headline}
                            </h3>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                                {content.approach?.paragraphs?.map((p: string, i: number) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            <div className="mt-8 space-y-4">
                                {content.approach?.standards?.map((standard: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-brand rounded-full"></div>
                                        <span className="text-gray-700">{standard}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitments Grid */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.commitments?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-onyx">{content.commitments?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {content.commitments?.items?.map((commitment: any, index: number) => (
                            <div key={index} className="bg-white p-8 border-t-4 border-brand shadow-lg reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="text-4xl font-serif text-brand mb-4">{commitment.number}</div>
                                <h4 className="text-lg font-bold text-onyx mb-3">{commitment.title}</h4>
                                <p className="text-gray-600 text-sm font-light">{commitment.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partnership Philosophy */}
            <section className="py-24 bg-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.partnership?.sectionTitle}</h2>
                            <h3 className="text-4xl font-serif text-white mb-8 leading-tight">
                                {content.partnership?.headline}
                            </h3>
                            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
                                {content.partnership?.paragraphs?.map((p: string, i: number) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="bg-onyx-800 p-10 border-l-4 border-brand">
                                <h4 className="text-xl font-serif text-white mb-6">{content.partnership?.coreValues ? "Core Values" : ""}</h4>
                                <ul className="space-y-4">
                                    {content.partnership?.coreValues?.map((value: any, i: number) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-brand shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-300"><strong className="text-white">{value.title}</strong> – {value.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-4xl md:text-5xl font-serif text-onyx mb-6">
                        {content.cta?.headline} <span className="text-brand">{content.cta?.headlineHighlight}</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-light mb-10">
                        {content.cta?.subtitle}
                    </p>
                    <a href="/contact" className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                        {content.cta?.buttonText}
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
