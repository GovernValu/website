"use client";

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useContent } from "../../hooks/useContent";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";

const ICONS: Record<string, React.ReactNode> = {
    building: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    chart: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    shield: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    globe: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    users: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    )
};

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { language } = useLanguage();
    const t = LABELS[language];

    const { content, loading } = useContent<any>('services');
    const service = content?.services?.find((s: any) => s.slug === slug);

    useEffect(() => {
        if (!loading && service) {
            setTimeout(() => {
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
                reveals.forEach((element) => {
                    const rect = element.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        element.classList.add("active");
                    }
                });
            }, 100);
        }
    }, [loading, service]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
                </div>
            </>
        );
    }

    if (!content) return null;
    if (!service) return notFound();

    const description = service.fullDescription || service.shortDescription || "";

    return (
        <>
            <Header />

            {/* Hero Section - Clean Landing Style */}
            <header className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-onyx via-onyx to-onyx-800">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/5 transform skew-x-12"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Content */}
                        <div className="reveal">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                                <Link href="/services" className="hover:text-brand transition-colors">{t.ourServices}</Link>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="text-brand">{service.title}</span>
                            </div>

                            {/* Icon Badge */}
                            <div className="w-16 h-16 bg-brand/20 rounded-2xl flex items-center justify-center mb-6 text-brand">
                                {ICONS[service.icon] || ICONS['building']}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 leading-tight">
                                {service.title}
                            </h1>

                            {/* Short Description */}
                            <p className="text-xl text-gray-300 font-light leading-relaxed mb-8 max-w-xl">
                                {service.shortDescription}
                            </p>

                            {/* CTA Button */}
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-all duration-300 group"
                            >
                                {t.contactUs}
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Right: Image */}
                        <div className="reveal hidden lg:block" style={{ transitionDelay: "200ms" }}>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-brand/20 rounded-2xl transform rotate-3"></div>
                                <img
                                    src={service.image || "/services/default.jpg"}
                                    alt={service.title}
                                    className="relative w-full h-[400px] object-cover rounded-xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-16">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 reveal">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-1 bg-brand"></div>
                                <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase">{t.overview}</h2>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <p className="text-2xl font-serif text-onyx leading-relaxed mb-8">
                                    {description}
                                </p>
                            </div>

                            {/* Feature Cards */}
                            <div className="grid md:grid-cols-2 gap-6 mt-12">
                                <div className="p-6 bg-gray-50 border-l-4 border-brand">
                                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center mb-4 text-brand">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-onyx mb-2">Professional Expertise</h3>
                                    <p className="text-gray-600 text-sm">Delivered by industry-leading professionals with deep domain knowledge.</p>
                                </div>
                                <div className="p-6 bg-gray-50 border-l-4 border-brand">
                                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center mb-4 text-brand">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-onyx mb-2">Tailored Solutions</h3>
                                    <p className="text-gray-600 text-sm">Customized approaches designed to fit your unique organizational needs.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            {/* Quick Contact Card */}
                            <div className="bg-onyx text-white p-8 rounded-xl sticky top-24">
                                <h3 className="text-xl font-serif mb-4">Need Help?</h3>
                                <p className="text-gray-400 text-sm mb-6">Contact us to learn more about how we can help your organization.</p>

                                <Link
                                    href="/contact"
                                    className="block w-full py-3 bg-brand text-center text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-colors mb-4"
                                >
                                    {t.contactUs}
                                </Link>

                                <Link
                                    href="/services"
                                    className="block w-full py-3 border border-white/20 text-center text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-colors"
                                >
                                    {t.exploreAllServices}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 bg-brand">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                        Ready to Transform Your Organization?
                    </h2>
                    <p className="text-xl text-white/80 font-light mb-8">
                        Let us help you achieve excellence in {service.title.toLowerCase()}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-block px-10 py-4 bg-white text-brand text-sm uppercase tracking-widest font-bold hover:bg-gray-100 transition-colors"
                        >
                            Schedule a Call
                        </Link>
                        <Link
                            href="/about/expertise"
                            className="inline-block px-10 py-4 border-2 border-white text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-colors"
                        >
                            Learn About Us
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
