"use client";

import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
    useEffect(() => {
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
    }, []);

    const coreValues = [
        { title: "Integrity", description: "We uphold independence, transparency, and ethical conduct." },
        { title: "Governance Excellence", description: "Governance is the backbone of all our advisory work." },
        { title: "Professional Rigor", description: "Evidence-based analysis and disciplined methodologies." },
        { title: "Client Partnership", description: "Long-term value over short-term gains." },
        { title: "Accountability", description: "Measurable impact and responsibility." },
        { title: "Continuous Innovation", description: "Adaptive thinking in a changing global environment." }
    ];

    const strategicObjectives = [
        "Enable institutions to design, implement, and institutionalize governance frameworks.",
        "Enhance investment readiness and investor confidence.",
        "Deliver independent corporate and brand valuation services.",
        "Support cost optimization and operational efficiency.",
        "Strengthen risk management, compliance, and internal control systems.",
        "Build leadership and institutional capabilities through training and change management.",
        "Support digital transformation and quality accreditation initiatives."
    ];

    const strategyItems = [
        "International governance frameworks (OECD, ISO, COSO, IFC)",
        "Data-driven advisory and valuation methodologies",
        "Long-term partnership with clients rather than transactional consulting",
        "Regional leadership with global standards"
    ];

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[70vh] flex items-center justify-center bg-hero-pattern">
                <div className="absolute inset-0 bg-gradient-to-b from-onyx/80 to-onyx/60" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        Est. 2016
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        Strategic Governance for <br />
                        <span className="italic text-brand font-serif">Sustainable Investments.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        A Türkiye-based governance-driven consulting and investment advisory firm with a regional and global outlook, serving the MENA region.
                    </p>
                </div>
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <div className="w-px h-12 bg-gradient-to-b from-brand to-transparent" />
                </div>
            </header>

            {/* Introduction Section */}
            <section className="py-24 bg-white text-onyx relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Who We Are</h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-onyx mb-8 leading-tight">
                                GovernValu Investment and Consulting Company Limited
                            </h3>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                                <p>
                                    GovernValu Investment and Consulting Company Limited is established in 2016 as a Türkiye-based consulting firm with a regional and global outlook.
                                </p>
                                <p>
                                    We provide integrated advisory services across governance, investment relations, valuation, risk management, compliance, cost optimization, and institutional development.
                                </p>
                                <p>
                                    Our services are delivered in alignment with international standards and tailored to the regulatory, cultural, and economic context of each market we serve.
                                </p>
                            </div>
                            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                                <div>
                                    <span className="block text-3xl font-serif text-brand mb-1">2016</span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">Founded</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-serif text-brand mb-1">MENA</span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">Regional Focus</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative reveal" style={{ transitionDelay: "200ms" }}>
                            <div className="absolute top-4 -left-4 w-full h-full border border-brand/20 z-0" />
                            <img
                                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
                                alt="Governance Excellence"
                                className="relative z-10 w-full h-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Concept & Strategy Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Company Concept & Strategy</h2>
                            <h3 className="text-4xl font-serif text-onyx mb-8 leading-tight">
                                Governance-Driven Advisory
                            </h3>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                                <p>
                                    GovernValu Investment and Consulting Company Limited is a governance-driven advisory firm built on the conviction that sustainable value creation is achieved through sound governance, disciplined strategy, and intelligent capital deployment.
                                </p>
                                <p>
                                    Our concept integrates governance, risk, compliance, valuation, investment relations, and performance optimization into one coherent advisory model serving governments, corporates, financial institutions, NGOs, and international organizations.
                                </p>
                            </div>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <h4 className="text-xl font-serif text-onyx mb-6">Our Strategy is Anchored In:</h4>
                            <ul className="space-y-4">
                                {strategyItems.map((item, index) => (
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
                                    By 2030, GovernValu aims to be among the most trusted consulting houses in the MENA region, delivering advisory solutions that enhance institutional resilience, investor confidence, and sustainable growth.
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
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Vision</h2>
                            <h3 className="text-3xl font-serif text-white mb-6">Our Vision</h3>
                            <p className="text-gray-400 font-light leading-relaxed text-lg">
                                To be a leading governance-driven consulting and investment advisory firm in the MENA region, recognized for creating sustainable value, strengthening institutions, and shaping resilient economies by 2030.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Mission</h2>
                            <h3 className="text-3xl font-serif text-white mb-6">Our Mission</h3>
                            <p className="text-gray-400 font-light leading-relaxed text-lg">
                                Our mission is to support institutions in achieving governance excellence, strategic clarity, financial resilience, and investment readiness through integrated advisory services grounded in international standards and professional integrity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Core Values</h2>
                        <h3 className="text-4xl font-serif text-onyx">What We Stand For</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, index) => (
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
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Strategic Objectives</h2>
                            <h3 className="text-4xl font-serif text-white mb-8 leading-tight">
                                Our Strategic Focus
                            </h3>
                            <ul className="space-y-4">
                                {strategicObjectives.map((objective, index) => (
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
                        Ready to achieve governance <span className="text-brand">excellence</span>?
                    </h2>
                    <p className="text-xl text-gray-600 font-light mb-10">
                        Schedule a consultation with our expert advisors.
                    </p>
                    <a href="/contact" className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                        Contact Us
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
