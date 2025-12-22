"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PhilosophyPage() {
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

    const coreBeliefs = [
        {
            title: "Sound Governance",
            description: "We believe that sustainable value creation is achieved through sound governance. Governance is not a constraint—it is the foundation of institutional freedom and long-term success.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "Disciplined Strategy",
            description: "Our strategies are built on rigorous analysis and disciplined methodologies. We combine international frameworks (OECD, ISO, COSO, IFC) with data-driven insights to deliver measurable outcomes.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: "Intelligent Capital Deployment",
            description: "We guide institutions toward intelligent capital deployment, balancing growth objectives with risk management and ensuring investment readiness that attracts investor confidence.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    const commitments = [
        { number: "01", title: "Independence", description: "Our advice is free from conflicts of interest. We provide objective counsel aligned solely with your institutional success." },
        { number: "02", title: "Transparency", description: "We uphold ethical conduct in all our advisory work. Our clients know exactly how we arrive at our recommendations." },
        { number: "03", title: "Accountability", description: "Measurable impact and responsibility. We stand behind our recommendations with clear outcomes and ongoing partnership." },
        { number: "04", title: "Excellence", description: "We pursue the highest standards of professional rigor in every analysis, every recommendation, every interaction." }
    ];

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] flex items-center justify-center bg-onyx">
                <div className="absolute inset-0 bg-gradient-to-br from-onyx via-onyx-800 to-onyx" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        Our Philosophy
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        Strategic Governance for <br />
                        <span className="italic text-brand font-serif">Sustainable Value.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        Our principles guide every decision, every recommendation, every relationship we build.
                    </p>
                </div>
            </header>

            {/* Core Philosophy */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Core Beliefs</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-onyx mb-6 leading-tight">
                            Sustainable value creation through sound governance, disciplined strategy, and intelligent capital deployment.
                        </h3>
                        <div className="w-24 h-1 bg-brand" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {coreBeliefs.map((belief, index) => (
                            <div key={index} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="w-16 h-16 bg-brand/5 rounded-full flex items-center justify-center mb-6 text-brand">
                                    {belief.icon}
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
                        &ldquo;Governance is the backbone of all our advisory work—the foundation upon which institutional resilience and sustainable growth are built.&rdquo;
                    </blockquote>
                    <div className="text-brand text-sm font-bold tracking-widest uppercase">GovernValu Core Principle</div>
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
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Approach</h2>
                            <h3 className="text-4xl font-serif text-onyx mb-8 leading-tight">
                                Integrated Advisory Model
                            </h3>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                                <p>
                                    Our concept integrates governance, risk, compliance, valuation, investment relations, and performance optimization into one coherent advisory model.
                                </p>
                                <p>
                                    We serve governments, corporates, financial institutions, NGOs, and international organizations with services delivered in alignment with international standards.
                                </p>
                                <p>
                                    Our methodologies are tailored to the regulatory, cultural, and economic context of each market we serve, ensuring relevant and actionable recommendations.
                                </p>
                            </div>
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-brand rounded-full"></div>
                                    <span className="text-gray-700">OECD Governance Standards</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-brand rounded-full"></div>
                                    <span className="text-gray-700">ISO Management Systems</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-brand rounded-full"></div>
                                    <span className="text-gray-700">COSO Internal Control Framework</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-brand rounded-full"></div>
                                    <span className="text-gray-700">IFC Corporate Governance Methodology</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitments Grid */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Commitments</h2>
                        <h3 className="text-4xl font-serif text-onyx">What We Promise</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {commitments.map((commitment, index) => (
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
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Client Partnership</h2>
                            <h3 className="text-4xl font-serif text-white mb-8 leading-tight">
                                Long-term Value Over Short-term Gains
                            </h3>
                            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
                                <p>
                                    We believe in long-term partnership with clients rather than transactional consulting. Our success is measured by the lasting impact we create for the institutions we serve.
                                </p>
                                <p>
                                    We are committed to regional leadership with global standards, combining deep understanding of the MENA market with international best practices.
                                </p>
                                <p>
                                    By 2030, we aim to be among the most trusted consulting houses in the MENA region, delivering advisory solutions that enhance institutional resilience, investor confidence, and sustainable growth.
                                </p>
                            </div>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="bg-onyx-800 p-10 border-l-4 border-brand">
                                <h4 className="text-xl font-serif text-white mb-6">Our Core Values</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-brand shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-300"><strong className="text-white">Integrity</strong> – Independence, transparency, ethical conduct</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-brand shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-300"><strong className="text-white">Governance Excellence</strong> – The backbone of all advisory work</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-brand shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-300"><strong className="text-white">Professional Rigor</strong> – Evidence-based, disciplined methodologies</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-brand shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-300"><strong className="text-white">Accountability</strong> – Measurable impact and responsibility</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-brand shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-300"><strong className="text-white">Continuous Innovation</strong> – Adaptive thinking in a changing world</span>
                                    </li>
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
                        Experience our philosophy <span className="text-brand">firsthand.</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-light mb-10">
                        Schedule a consultation to discuss how our principles can guide your success.
                    </p>
                    <a href="/contact" className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                        Get in Touch
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
