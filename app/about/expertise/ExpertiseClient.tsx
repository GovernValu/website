"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ExpertiseClient({ content }: { content: any }) {

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

            {/* Client Types */}
            <section className="py-12 bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 reveal">
                        <span className="text-sm font-bold tracking-widest uppercase text-gray-400">{content.clientTypes?.label}</span>
                        <div className="flex flex-wrapjustify-center gap-8 md:gap-12">
                            {content.clientTypes?.items?.map((client: any, index: number) => (
                                <div key={index} className="flex items-center gap-3 text-gray-600">
                                    <span className="text-2xl">{client.icon}</span>
                                    <span className="font-serif italic">{client.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise Areas */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.expertiseAreas?.sectionTitle}</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-onyx">{content.expertiseAreas?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {content.expertiseAreas?.items?.map((area: any, index: number) => (
                            <div key={index} className="group relative bg-white border border-gray-100 p-8 hover:shadow-2xl hover:border-brand/20 transition-all duration-300 reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                <h4 className="text-2xl font-serif text-onyx mb-4 group-hover:text-brand transition-colors">{area.title}</h4>
                                <p className="text-gray-600 font-light text-sm mb-6 leading-relaxed">
                                    {area.description}
                                </p>
                                <ul className="space-y-3">
                                    {area.features?.map((feature: string, fIndex: number) => (
                                        <li key={fIndex} className="flex items-center gap-3 text-sm text-gray-500">
                                            <div className="w-1.5 h-1.5 bg-brand/50 rounded-full"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* International Standards */}
            <section className="py-24 bg-onyx text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.standards?.sectionTitle}</h2>
                            <h3 className="text-4xl font-serif mb-8 leading-tight">
                                {content.standards?.headline}
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                {content.standards?.items?.map((standard: any, index: number) => (
                                    <div key={index} className="border border-white/10 p-6 hover:bg-white/5 transition-colors">
                                        <div className="text-3xl font-bold text-brand mb-2">{standard.name}</div>
                                        <div className="text-sm text-gray-400 font-light">{standard.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="reveal relative">
                            <div className="absolute -inset-4 border border-brand/20 z-0"></div>
                            <img
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
                                alt="International Standards"
                                className="relative z-10 w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.process?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-onyx">{content.process?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {content.process?.steps?.map((step: any, index: number) => (
                            <div key={index} className="relative reveal" style={{ transitionDelay: `${index * 150}ms` }}>
                                <div className="text-8xl font-serif text-gray-100 absolute -top-10 -left-6 z-0 select-none">{step.number}</div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold text-onyx mb-4 pt-8 border-t-2 border-brand inline-block">{step.title}</h4>
                                    <p className="text-gray-600 font-light text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gray-50">
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
