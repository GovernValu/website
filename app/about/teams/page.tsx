"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";

export default function TeamsPage() {
    const { language } = useLanguage();
    const t = LABELS[language];
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

    const qualifications = [
        "Expertise in governance, compliance, risk management, or valuation",
        "Understanding of international standards (OECD, ISO, COSO, IFC)",
        "Experience in the MENA region regulatory and business environment",
        "Commitment to professional integrity and ethical conduct",
        "Data-driven and analytical mindset"
    ];

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] flex items-center justify-center bg-onyx">
                <div className="absolute inset-0 bg-gradient-to-br from-onyx via-onyx-800 to-onyx" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        {t.ourTeam}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        Expert<br />
                        <span className="italic text-brand font-serif">Advisors.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        Our team combines deep expertise in governance, investment, and institutional development with a commitment to professional integrity.
                    </p>
                </div>
            </header>

            {/* Culture Section */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{t.ourCulture}</h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-onyx mb-8 leading-tight">
                                {t.cultureHeadline}
                            </h3>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                                <p>
                                    At GovernValu, we believe that exceptional outcomes require exceptional people. Our team is united by a shared commitment to integrity, professional rigor, and client success.
                                </p>
                                <p>
                                    We foster an environment where diverse perspectives are valued, continuous learning is encouraged, and collaboration is the norm. Each member of our team brings unique expertise that strengthens our collective capability.
                                </p>
                                <p>
                                    Our advisors combine international expertise with deep understanding of the MENA region's regulatory, cultural, and economic context.
                                </p>
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
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{t.ourValues}</h2>
                        <h3 className="text-4xl font-serif text-white">{t.whatGuidesUs}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, index) => (
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
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{t.expertiseAreas}</h2>
                        <h3 className="text-4xl font-serif text-onyx">{t.teamCapabilities}</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 shadow-lg reveal">
                            <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-onyx mb-3">Governance & Compliance</h4>
                            <p className="text-gray-600 font-light text-sm">Experts in corporate governance, risk management, and regulatory compliance frameworks.</p>
                        </div>
                        <div className="bg-white p-8 shadow-lg reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-onyx mb-3">Investment & Valuation</h4>
                            <p className="text-gray-600 font-light text-sm">Specialists in investment relations, corporate valuation, and capital markets advisory.</p>
                        </div>
                        <div className="bg-white p-8 shadow-lg reveal" style={{ transitionDelay: "200ms" }}>
                            <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-onyx mb-3">Institutional Development</h4>
                            <p className="text-gray-600 font-light text-sm">Professionals in leadership development, change management, and organizational transformation.</p>
                        </div>
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
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{t.regionalLeadership}</h2>
                            <h3 className="text-4xl font-serif text-onyx mb-8 leading-tight">
                                {t.globalStandards}
                            </h3>
                            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                                <p>
                                    Our team combines international best practices with deep understanding of the MENA region's unique regulatory, cultural, and economic landscape.
                                </p>
                                <p>
                                    We serve governments, corporates, financial institutions, NGOs, and international organizations with advisory services tailored to each market context.
                                </p>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-6">
                                <div className="border-l-2 border-brand pl-4">
                                    <div className="text-2xl font-serif text-brand mb-1">2016</div>
                                    <div className="text-sm text-gray-500">Founded in Türkiye</div>
                                </div>
                                <div className="border-l-2 border-brand pl-4">
                                    <div className="text-2xl font-serif text-brand mb-1">MENA</div>
                                    <div className="text-sm text-gray-500">Regional Focus</div>
                                </div>
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
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{t.careers}</h2>
                            <h3 className="text-4xl font-serif text-white mb-6 leading-tight">
                                {t.joinOurTeam}
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed mb-8">
                                We are always looking for exceptional individuals who share our commitment to governance excellence and professional integrity. If you are passionate about making a meaningful impact on institutional development, we would love to hear from you.
                            </p>
                            <a href="/contact" className="inline-block px-8 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                                {t.exploreOpportunities}
                            </a>
                        </div>
                        <div className="bg-onyx-800 p-10 border-l-4 border-brand reveal">
                            <h4 className="text-xl font-serif text-white mb-6">{t.whatWeLookFor}</h4>
                            <ul className="space-y-4">
                                {qualifications.map((qual, index) => (
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
