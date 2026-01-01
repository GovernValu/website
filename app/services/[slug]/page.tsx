"use client";

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useContent } from "../../hooks/useContent";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { language } = useLanguage();
    const t = LABELS[language];

    // Fetch 'services' page content which contains the list of all services
    const { content, loading } = useContent<any>('services');

    const service = content?.services?.find((s: any) => s.slug === slug);

    useEffect(() => {
        if (!loading && service) {
            // Re-run reveal animations when content loads
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
                revealOnScroll(); // Initial check

                // Add active class manually to things that should be visible
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

    if (!content) {
        return null; // or loading
    }

    if (!service) {
        return notFound();
    }

    // Safely access properties with fallbacks
    const longDescription = service.longDescription || [service.description || ""];
    const capabilities = service.capabilities || [];
    const benefits = service.benefits || [];
    const process = service.process || [];
    const tagline = service.tagline || service.shortDescription || "";

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[70vh] min-h-[600px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src={service.heroImage || service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/80 to-onyx/60" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <Link href="/services" className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest mb-6 hover:text-white transition-colors reveal">
                        <svg className="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t.backToServices}
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {service.title}
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        {tagline}
                    </p>
                </div>
            </header>

            {/* Overview */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-6">{t.overview}</h2>
                        <p className="text-2xl font-serif leading-relaxed text-gray-800 mb-8">{service.description || service.fullDescription}</p>
                        <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                            {longDescription.map((paragraph: string, index: number) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            {/* CTA */}
            <section className="py-24 bg-onyx-800">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        {t.readyToDiscuss} <span className="text-brand">{service.title.toLowerCase()}</span>?
                    </h2>
                    <p className="text-xl text-gray-400 font-light mb-10">
                        {t.scheduleConsultation}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-colors">
                            {t.contactUs}
                        </Link>
                        <Link href="/services" className="inline-block px-10 py-4 border border-white/20 text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-colors">
                            {t.exploreAllServices}
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
