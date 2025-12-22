"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ExpertisePage() {
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

    const expertiseAreas = [
        {
            title: "Corporate Governance",
            description: "Enable institutions to design, implement, and institutionalize governance frameworks. We provide comprehensive governance advisory aligned with OECD, ISO, COSO, and IFC standards.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            features: ["Governance Framework Design", "Board Structure & Effectiveness", "Policy Development", "Regulatory Compliance"]
        },
        {
            title: "Investment Relations",
            description: "Enhance investment readiness and investor confidence through strategic investor communication, ESG integration, and capital markets positioning.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            features: ["Investor Relations Strategy", "ESG Integration", "Capital Markets Advisory", "Stakeholder Engagement"]
        },
        {
            title: "Valuation Services",
            description: "Deliver independent corporate and brand valuation services using data-driven methodologies. We provide objective valuations for transactions, reporting, and strategic planning.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            features: ["Corporate Valuation", "Brand Valuation", "Transaction Support", "Fair Value Assessment"]
        },
        {
            title: "Risk Management & Compliance",
            description: "Strengthen risk management, compliance, and internal control systems. We help institutions build resilient frameworks that protect against operational and regulatory risks.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            features: ["Enterprise Risk Management", "Compliance Programs", "Internal Control Systems", "Regulatory Advisory"]
        },
        {
            title: "Cost Optimization",
            description: "Support cost optimization and operational efficiency through systematic analysis and implementation of sustainable cost reduction strategies.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            features: ["Cost Structure Analysis", "Operational Efficiency", "Process Optimization", "Performance Management"]
        },
        {
            title: "Institutional Development",
            description: "Build leadership and institutional capabilities through training and change management. We support digital transformation and quality accreditation initiatives.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            features: ["Leadership Development", "Change Management", "Digital Transformation", "Quality Accreditation"]
        }
    ];

    const clientTypes = [
        { name: "Governments", icon: "🏛️" },
        { name: "Corporates", icon: "🏢" },
        { name: "Financial Institutions", icon: "🏦" },
        { name: "NGOs", icon: "🤝" },
        { name: "International Organizations", icon: "🌍" }
    ];

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] flex items-center justify-center bg-hero-pattern">
                <div className="absolute inset-0 bg-gradient-to-b from-onyx/90 to-onyx/70" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        Our Expertise
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        Integrated Advisory<br />
                        <span className="italic text-brand font-serif">Services.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        Comprehensive advisory services across governance, investment relations, valuation, risk management, compliance, cost optimization, and institutional development.
                    </p>
                </div>
            </header>

            {/* Client Types */}
            <section className="py-12 bg-white border-b">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-8 items-center">
                        <span className="text-sm text-gray-500 uppercase tracking-widest">We Serve:</span>
                        {clientTypes.map((client, index) => (
                            <div key={index} className="flex items-center gap-2 text-onyx">
                                <span className="text-2xl">{client.icon}</span>
                                <span className="font-medium">{client.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Grid */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Areas of Focus</h2>
                        <h3 className="text-4xl font-serif text-onyx mb-6">Our Service Areas</h3>
                        <div className="w-24 h-1 bg-brand" />
                    </div>

                    <div className="space-y-16">
                        {expertiseAreas.map((area, index) => (
                            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center reveal ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`} style={{ transitionDelay: `${index * 50}ms` }}>
                                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <div className="w-16 h-16 bg-brand/5 rounded-full flex items-center justify-center mb-6 text-brand">
                                        {area.icon}
                                    </div>
                                    <h4 className="text-3xl font-serif mb-4">{area.title}</h4>
                                    <p className="text-gray-600 leading-relaxed font-light mb-6">{area.description}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {area.features.map((feature, fIndex) => (
                                            <div key={fIndex} className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`bg-gray-100 h-80 flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                    <div className="text-brand opacity-10">
                                        <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {area.icon.props.children}
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* International Standards */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">International Standards</h2>
                        <h3 className="text-4xl font-serif text-onyx">Our Framework Alignment</h3>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="bg-white p-8 text-center shadow-lg reveal">
                            <div className="text-4xl font-serif text-brand mb-4">OECD</div>
                            <p className="text-gray-600 text-sm font-light">Corporate Governance Principles</p>
                        </div>
                        <div className="bg-white p-8 text-center shadow-lg reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="text-4xl font-serif text-brand mb-4">ISO</div>
                            <p className="text-gray-600 text-sm font-light">Management System Standards</p>
                        </div>
                        <div className="bg-white p-8 text-center shadow-lg reveal" style={{ transitionDelay: "200ms" }}>
                            <div className="text-4xl font-serif text-brand mb-4">COSO</div>
                            <p className="text-gray-600 text-sm font-light">Internal Control Framework</p>
                        </div>
                        <div className="bg-white p-8 text-center shadow-lg reveal" style={{ transitionDelay: "300ms" }}>
                            <div className="text-4xl font-serif text-brand mb-4">IFC</div>
                            <p className="text-gray-600 text-sm font-light">Corporate Governance Methodology</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="py-24 bg-onyx-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Process</h2>
                        <h3 className="text-4xl font-serif text-white">How We Work</h3>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center reveal">
                            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-6 text-white font-serif text-2xl">1</div>
                            <h4 className="text-xl text-white font-bold mb-3">Discovery</h4>
                            <p className="text-gray-400 font-light text-sm">Deep understanding of your objectives, regulatory context, and institutional challenges.</p>
                        </div>
                        <div className="text-center reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-6 text-white font-serif text-2xl">2</div>
                            <h4 className="text-xl text-white font-bold mb-3">Analysis</h4>
                            <p className="text-gray-400 font-light text-sm">Rigorous assessment using data-driven methodologies and international benchmarks.</p>
                        </div>
                        <div className="text-center reveal" style={{ transitionDelay: "200ms" }}>
                            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-6 text-white font-serif text-2xl">3</div>
                            <h4 className="text-xl text-white font-bold mb-3">Strategy</h4>
                            <p className="text-gray-400 font-light text-sm">Development of tailored recommendations aligned with international standards.</p>
                        </div>
                        <div className="text-center reveal" style={{ transitionDelay: "300ms" }}>
                            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-6 text-white font-serif text-2xl">4</div>
                            <h4 className="text-xl text-white font-bold mb-3">Partnership</h4>
                            <p className="text-gray-400 font-light text-sm">Long-term partnership through implementation, monitoring, and continuous improvement.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-4xl md:text-5xl font-serif text-onyx mb-6">
                        Ready to leverage our <span className="text-brand">expertise</span>?
                    </h2>
                    <p className="text-xl text-gray-600 font-light mb-10">
                        Let us demonstrate how our capabilities can address your specific institutional challenges.
                    </p>
                    <a href="/contact" className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                        Start a Conversation
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
