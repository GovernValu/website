"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TeamsClient({ content }: { content: any }) {

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
                        {content.hero?.title}<br />
                        <span className="italic text-brand font-serif">{content.hero?.titleHighlight}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        {content.hero?.subtitle}
                    </p>
                </div>
            </header>

            {/* Culture Section */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.culture?.sectionTitle}</h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-onyx mb-8 leading-tight">
                                {content.culture?.headline}
                            </h3>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                                {content.culture?.paragraphs?.map((p: string, i: number) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </div>
                        <div className="relative reveal" style={{ transitionDelay: "200ms" }}>
                            <div className="absolute top-4 -left-4 w-full h-full border border-brand/20 z-0" />
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                alt="Team Collaboration"
                                className="relative z-10 w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-onyx-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.coreValues?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-white">{content.coreValues?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {content.coreValues?.items?.map((value: any, index: number) => (
                            <div key={index} className="bg-onyx p-8 border-l-4 border-brand reveal" style={{ transitionDelay: `${index * 50}ms` }}>
                                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                                <p className="text-gray-400 font-light">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Areas */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.capabilities?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-onyx">{content.capabilities?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {content.capabilities?.items?.map((item: any, index: number) => (
                            <div key={index} className="bg-white p-8 shadow-lg reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-onyx mb-3">{item.title}</h4>
                                <p className="text-gray-600 font-light text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Focus */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                                alt="Strategic Planning"
                                className="w-full h-[400px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.regionalFocus?.sectionTitle}</h2>
                            <h3 className="text-4xl font-serif text-onyx mb-8 leading-tight">
                                {content.regionalFocus?.headline}
                            </h3>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                                {content.regionalFocus?.paragraphs?.map((p: string, i: number) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-6">
                                {content.regionalFocus?.stats?.map((stat: any, i: number) => (
                                    <div key={i} className="border-l-2 border-brand pl-4">
                                        <div className="text-2xl font-serif text-brand mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Us */}
            <section className="py-24 bg-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.careers?.sectionTitle}</h2>
                            <h3 className="text-4xl font-serif text-white mb-6 leading-tight">
                                {content.careers?.headline}
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed mb-8">
                                {content.careers?.description}
                            </p>
                            <a href="/contact" className="inline-block px-8 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                                {content.careers?.buttonText}
                            </a>
                        </div>
                        <div className="bg-onyx-800 p-10 border-l-4 border-brand reveal">
                            <h4 className="text-xl font-serif text-white mb-6">{content.careers?.qualificationsTitle}</h4>
                            <ul className="space-y-4">
                                {content.careers?.qualifications?.map((qual: string, index: number) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-brand shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-300">{qual}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
