"use client";

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useContent } from "../../hooks/useContent";

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Services
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
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-6">Overview</h2>
                        <p className="text-2xl font-serif leading-relaxed text-gray-800 mb-8">{service.description || service.fullDescription}</p>
                        <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                            {longDescription.map((paragraph: string, index: number) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            {capabilities.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16 reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">What We Deliver</h2>
                            <h3 className="text-4xl font-serif text-onyx">Our Capabilities</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {capabilities.map((capability: any, index: number) => (
                                <div key={index} className="p-8 bg-white border border-gray-100 shadow-lg reveal" style={{ transitionDelay: `${index * 50}ms` }}>
                                    <h4 className="text-lg font-bold text-onyx mb-3">{capability.title}</h4>
                                    <p className="text-gray-600 text-sm font-light leading-relaxed">{capability.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
                <section className="py-24 bg-onyx text-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="reveal">
                                <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">The Value</h2>
                                <h3 className="text-4xl font-serif mb-8">Benefits to Your Organization</h3>
                                <ul className="space-y-4">
                                    {benefits.map((benefit: any, index: number) => (
                                        <li key={index} className="flex items-center gap-4">
                                            <div className="w-2 h-2 bg-brand rounded-full shrink-0" />
                                            <span className="text-gray-300 font-light">{typeof benefit === 'string' ? benefit : benefit.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {service.caseStudyQuote && (
                                <div className="p-10 bg-white/5 border border-white/10 reveal">
                                    <svg className="w-10 h-10 text-brand mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                    <blockquote className="text-xl font-serif italic text-white leading-relaxed mb-6">
                                        &ldquo;{service.caseStudyQuote.text}&rdquo;
                                    </blockquote>
                                    <div>
                                        <div className="text-brand text-sm font-bold">{service.caseStudyQuote.author}</div>
                                        <div className="text-gray-500 text-sm">{service.caseStudyQuote.role}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Process */}
            {process.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16 reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Approach</h2>
                            <h3 className="text-4xl font-serif text-onyx">How We Work</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {process.map((step: any, index: number) => (
                                <div key={index} className="relative reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <div className="text-6xl font-serif text-brand/10 font-bold mb-4">{step.step}</div>
                                    <h4 className="text-xl font-bold text-onyx mb-2">{step.title}</h4>
                                    <p className="text-gray-600 text-sm font-light leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-24 bg-onyx-800">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Ready to discuss <span className="text-brand">{service.title.toLowerCase()}</span>?
                    </h2>
                    <p className="text-xl text-gray-400 font-light mb-10">
                        Schedule a confidential consultation with our senior partners.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-colors">
                            Contact Us
                        </Link>
                        <Link href="/services" className="inline-block px-10 py-4 border border-white/20 text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-colors">
                            Explore All Services
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
