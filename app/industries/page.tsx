"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const industries = [
    {
        slug: "banking-finance",
        title: "Banking & Finance",
        description: "Navigating regulatory complexity and driving transformation in financial services.",
        image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=2574&auto=format&fit=crop",
        stats: { clients: "15+", assets: "$4B+" },
        services: ["Board Governance", "Risk Frameworks", "Regulatory Compliance", "M&A Advisory"]
    },
    {
        slug: "real-estate",
        title: "Real Estate & Development",
        description: "Strategic governance for property portfolios and development projects across the GCC.",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2670&auto=format&fit=crop",
        stats: { clients: "20+", assets: "$2B+" },
        services: ["Asset Governance", "Joint Venture Structuring", "Investment Strategy", "Family Office Real Estate"]
    },
    {
        slug: "energy-utilities",
        title: "Energy & Utilities",
        description: "Supporting the energy transition with robust governance and strategic investment frameworks.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop",
        stats: { clients: "8+", assets: "$1.5B+" },
        services: ["ESG Integration", "Regulatory Navigation", "Capital Allocation", "Board Effectiveness"]
    },
    {
        slug: "sovereign-wealth",
        title: "Sovereign Wealth Funds",
        description: "Advising state-owned investment entities on governance excellence and sustainable returns.",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbe462?q=80&w=2670&auto=format&fit=crop",
        stats: { clients: "5+", assets: "$8B+" },
        services: ["Investment Governance", "Strategic Planning", "Performance Oversight", "Stakeholder Management"]
    },
    {
        slug: "family-enterprises",
        title: "Family Enterprises",
        description: "Preserving legacy while professionalizing governance for multi-generational success.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
        stats: { clients: "25+", assets: "$3B+" },
        services: ["Family Constitution", "Succession Planning", "Wealth Structuring", "Next-Gen Development"]
    },
    {
        slug: "healthcare",
        title: "Healthcare & Life Sciences",
        description: "Governance frameworks for healthcare organizations navigating rapid innovation and regulation.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2653&auto=format&fit=crop",
        stats: { clients: "10+", assets: "$500M+" },
        services: ["Board Advisory", "Regulatory Strategy", "Partnership Structuring", "Risk Management"]
    },
    {
        slug: "technology",
        title: "Technology & Innovation",
        description: "Enabling tech enterprises to scale with governance that supports rapid growth.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        stats: { clients: "12+", assets: "$800M+" },
        services: ["Startup Governance", "Investor Relations", "Cyber Risk", "Exit Strategy"]
    },
    {
        slug: "hospitality-tourism",
        title: "Hospitality & Tourism",
        description: "Strategic advisory for Qatar's growing hospitality sector aligned with Vision 2030.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop",
        stats: { clients: "8+", assets: "$600M+" },
        services: ["Asset Management", "Brand Partnerships", "Expansion Strategy", "Stakeholder Governance"]
    }
];

export default function IndustriesPage() {
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

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-hero-pattern">
                <div className="absolute inset-0 bg-gradient-to-b from-onyx/90 to-onyx/70" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal">
                        Sector <br />
                        <span className="italic text-brand font-serif">Expertise.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "100ms" }}>
                        Deep industry knowledge combined with governance excellence. We understand the unique challenges of each sector across the GCC.
                    </p>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <div className="w-px h-12 bg-gradient-to-b from-brand to-transparent" />
                </div>
            </header>

            {/* Intro Section */}
            <section className="py-20 bg-white text-onyx">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-6">Industry Focus</h2>
                    <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-800">
                        Every industry operates within its own regulatory framework, market dynamics, and stakeholder expectations. Our sector-specific expertise ensures solutions that truly fit.
                    </p>
                </div>
            </section>

            {/* Industries Grid */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industries.map((industry, index) => (
                            <div
                                key={industry.slug}
                                className="group relative overflow-hidden bg-onyx h-[400px] reveal cursor-pointer"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={industry.image}
                                        alt={industry.title}
                                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/80 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-brand transition-colors">{industry.title}</h3>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{industry.description}</p>

                                    {/* Stats */}
                                    <div className="flex gap-6 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div>
                                            <span className="block text-brand font-serif text-lg">{industry.stats.clients}</span>
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500">Clients</span>
                                        </div>
                                        <div>
                                            <span className="block text-brand font-serif text-lg">{industry.stats.assets}</span>
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500">Assets Advised</span>
                                        </div>
                                    </div>

                                    <Link href={`/contact?industry=${industry.slug}`} className="inline-flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Inquire
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Industry: Banking & Finance */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand opacity-50"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2651&auto=format&fit=crop"
                                    alt="Banking District"
                                    className="w-full h-[500px] object-cover shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <span className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Featured Sector</span>
                            <h2 className="text-4xl font-serif text-onyx mb-6">Banking & Financial Services</h2>
                            <p className="text-gray-600 font-light leading-relaxed mb-8">
                                The financial services industry faces unprecedented transformation—from digital disruption to evolving regulatory frameworks. Our deep expertise in banking governance helps institutions navigate these challenges while maintaining stakeholder confidence and regulatory compliance.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-gray-50 border-l-2 border-brand">
                                    <h4 className="font-bold text-sm uppercase mb-1">Central Bank Compliance</h4>
                                    <p className="text-xs text-gray-500">QCB and regional regulatory alignment</p>
                                </div>
                                <div className="p-4 bg-gray-50 border-l-2 border-brand">
                                    <h4 className="font-bold text-sm uppercase mb-1">Risk Governance</h4>
                                    <p className="text-xs text-gray-500">Basel III/IV implementation frameworks</p>
                                </div>
                                <div className="p-4 bg-gray-50 border-l-2 border-brand">
                                    <h4 className="font-bold text-sm uppercase mb-1">Digital Transformation</h4>
                                    <p className="text-xs text-gray-500">Fintech integration & cyber governance</p>
                                </div>
                                <div className="p-4 bg-gray-50 border-l-2 border-brand">
                                    <h4 className="font-bold text-sm uppercase mb-1">Board Excellence</h4>
                                    <p className="text-xs text-gray-500">Director training & evaluation</p>
                                </div>
                            </div>
                            <Link href="/contact?industry=banking-finance" className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest font-bold hover:underline">
                                Discuss Your Needs
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Industry: Sovereign Wealth */}
            <section className="py-24 bg-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <span className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Premier Advisory</span>
                            <h2 className="text-4xl font-serif text-white mb-6">Sovereign Wealth Funds</h2>
                            <p className="text-gray-400 font-light leading-relaxed mb-8">
                                State-owned investment entities require governance frameworks that balance fiduciary duty, political accountability, and long-term value creation. We bring deep experience advising sovereign institutions on investment governance, strategic planning, and performance oversight.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 border-l border-brand/30 pl-4">
                                    <span className="text-white text-sm">Investment mandate development</span>
                                </li>
                                <li className="flex items-center gap-3 border-l border-brand/30 pl-4">
                                    <span className="text-white text-sm">Santiago Principles compliance</span>
                                </li>
                                <li className="flex items-center gap-3 border-l border-brand/30 pl-4">
                                    <span className="text-white text-sm">Stakeholder communication strategies</span>
                                </li>
                                <li className="flex items-center gap-3 border-l border-brand/30 pl-4">
                                    <span className="text-white text-sm">Performance benchmarking frameworks</span>
                                </li>
                            </ul>
                            <Link href="/contact?industry=sovereign-wealth" className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest font-bold hover:text-white transition-colors">
                                Request Consultation
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="relative">
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand opacity-50"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                                    alt="Investment Excellence"
                                    className="w-full h-[500px] object-cover shadow-2xl opacity-80 hover:opacity-100 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Industry: Family Enterprises */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 reveal">
                            <div className="relative">
                                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand opacity-50"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                                    alt="Family Business"
                                    className="w-full h-[500px] object-cover shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 reveal" style={{ transitionDelay: "100ms" }}>
                            <span className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Legacy & Continuity</span>
                            <h2 className="text-4xl font-serif text-onyx mb-6">Family Enterprises</h2>
                            <p className="text-gray-600 font-light leading-relaxed mb-8">
                                Gulf family businesses are the backbone of the regional economy. We help distinguished families professionalize their governance while preserving the values and relationships that made them successful across generations.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center shrink-0 text-brand">
                                        <span className="font-serif font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-onyx">Family Constitution</h4>
                                        <p className="text-sm text-gray-500">Documenting shared values, decision-making processes, and succession protocols</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center shrink-0 text-brand">
                                        <span className="font-serif font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-onyx">Governance Structures</h4>
                                        <p className="text-sm text-gray-500">Separating ownership, family, and business governance for clarity</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center shrink-0 text-brand">
                                        <span className="font-serif font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-onyx">Next Generation</h4>
                                        <p className="text-sm text-gray-500">Preparing successors through education, experience, and mentorship</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/contact?industry=family-enterprises" className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest font-bold hover:underline">
                                Learn More
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-onyx-800 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="reveal">
                            <p className="text-4xl font-serif text-brand mb-1">8+</p>
                            <p className="text-xs uppercase tracking-widest text-gray-500">Industries Served</p>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <p className="text-4xl font-serif text-brand mb-1">100+</p>
                            <p className="text-xs uppercase tracking-widest text-gray-500">Sector Engagements</p>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "200ms" }}>
                            <p className="text-4xl font-serif text-brand mb-1">$20B+</p>
                            <p className="text-xs uppercase tracking-widest text-gray-500">Sector Assets Advised</p>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "300ms" }}>
                            <p className="text-4xl font-serif text-brand mb-1">GCC</p>
                            <p className="text-xs uppercase tracking-widest text-gray-500">Regional Coverage</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-5xl font-serif text-onyx mb-8">
                        Which sector is <span className="text-brand">your focus?</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-light mb-10 max-w-2xl mx-auto">
                        Let us demonstrate how our industry expertise can address your specific governance and investment challenges.
                    </p>
                    <Link href="/contact" className="inline-block px-10 py-4 bg-onyx text-white text-sm uppercase tracking-widest font-bold hover:bg-brand transition-colors duration-300">
                        Start a Conversation
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
