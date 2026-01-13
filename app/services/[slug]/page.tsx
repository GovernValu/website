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
    const details = service.details || {};
    const keyPoints = details.keyPoints || [];
    const process = details.process || [];
    const whyChooseUs = details.whyChooseUs || [];

    return (
        <>
            <Header />

            {/* Hero Section - Premium Landing Style */}
            <header className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-onyx via-gray-900 to-onyx overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-brand/5 transform skew-x-12"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-20 right-20 w-64 h-64 bg-brand/5 rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Content */}
                        <div className="reveal space-y-8">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-2 text-gray-400 text-sm">
                                <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <Link href="/services" className="hover:text-brand transition-colors">{t.ourServices}</Link>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="text-brand font-medium">{service.title}</span>
                            </nav>

                            {/* Icon Badge */}
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand/20 to-brand/5 rounded-3xl border border-brand/20 text-brand shadow-xl">
                                {ICONS[service.icon] || ICONS['building']}
                            </div>

                            {/* Title */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
                                {service.title}
                            </h1>

                            {/* Short Description */}
                            <p className="text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
                                {service.shortDescription}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-6 pt-4">
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center gap-3 px-10 py-5 bg-brand text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-all duration-300 shadow-2xl hover:shadow-brand/50"
                                >
                                    {t.getStarted || "Get Started"}
                                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link
                                    href="#details"
                                    className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/30 backdrop-blur-sm text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:border-white transition-all duration-300"
                                >
                                    {t.learnMore || "Learn More"}
                                </Link>
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="reveal hidden lg:block" style={{ transitionDelay: "200ms" }}>
                            <div className="relative">
                                <div className="absolute -inset-6 bg-gradient-to-r from-brand/30 to-brand/10 rounded-3xl transform rotate-3 blur-xl"></div>
                                <div className="absolute -inset-4 bg-brand/20 rounded-3xl transform -rotate-2"></div>
                                <img
                                    src={service.image || "/services/default.jpg"}
                                    alt={service.title}
                                    className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl border border-white/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Trust Bar */}
            <section className="py-12 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="reveal">
                            <div className="text-4xl font-bold text-brand mb-2">200+</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">{language === 'ar' ? 'عميل راضٍ' : 'Happy Clients'}</div>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="text-4xl font-bold text-brand mb-2">500+</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">{language === 'ar' ? 'مشروع مُنجز' : 'Projects Completed'}</div>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "200ms" }}>
                            <div className="text-4xl font-bold text-brand mb-2">15+</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">{language === 'ar' ? 'سنة خبرة' : 'Years Experience'}</div>
                        </div>
                        <div className="reveal" style={{ transitionDelay: "300ms" }}>
                            <div className="text-4xl font-bold text-brand mb-2">98%</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">{language === 'ar' ? 'معدل النجاح' : 'Success Rate'}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section with Sidebar */}
            <section id="details" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-16">
                        {/* Main Content - 2/3 */}
                        <div className="lg:col-span-2 space-y-16">
                            {/* Section Header */}
                            <div className="reveal space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-1 bg-brand"></div>
                                    <span className="text-brand text-sm font-bold tracking-[0.3em] uppercase">{t.overview}</span>
                                </div>
                                <h2 className="text-5xl font-serif font-bold text-onyx leading-tight">
                                    {language === 'ar' ? 'خدمات متكاملة ومتخصصة' : 'Comprehensive & Specialized Services'}
                                </h2>
                                <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed space-y-6">
                                    <p className="text-2xl font-light text-gray-800 leading-relaxed">
                                        {description}
                                    </p>
                                    <p className="text-lg text-gray-600">
                                        {language === 'ar'
                                            ? 'نقدم حلولاً شاملة تجمع بين الخبرة العميقة والمنهجيات المثبتة لتحقيق نتائج استثنائية. فريقنا من الخبراء يعمل معك جنباً إلى جنب لضمان تحقيق أهدافك الاستراتيجية.'
                                            : 'We deliver comprehensive solutions that combine deep expertise with proven methodologies to achieve exceptional results. Our team of experts works alongside you to ensure your strategic objectives are met.'}
                                    </p>
                                </div>
                            </div>

                            {/* Highlight Cards */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="reveal group p-8 bg-gradient-to-br from-gray-50 to-white border-l-4 border-brand rounded-r-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-onyx mb-3">{details.featureCard1?.title || "Professional Expertise"}</h3>
                                            <p className="text-gray-600 leading-relaxed">{details.featureCard1?.description || "Delivered by industry-leading professionals with deep domain knowledge."}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="reveal group p-8 bg-gradient-to-br from-gray-50 to-white border-l-4 border-brand rounded-r-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" style={{ transitionDelay: "100ms" }}>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-onyx mb-3">{details.featureCard2?.title || "Tailored Solutions"}</h3>
                                            <p className="text-gray-600 leading-relaxed">{details.featureCard2?.description || "Customized approaches designed to fit your unique organizational needs."}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - 1/3 */}
                        <div className="reveal space-y-8" style={{ transitionDelay: "200ms" }}>
                            {/* Contact Card */}
                            <div className="sticky top-24 space-y-8">
                                <div className="bg-onyx text-white p-10 rounded-2xl shadow-2xl">
                                    <h3 className="text-2xl font-serif font-bold mb-4">{details.sidebar?.title || "Need Expert Guidance?"}</h3>
                                    <p className="text-gray-300 mb-8 leading-relaxed">{details.sidebar?.description || "Contact us to learn more about how we can help your organization achieve excellence."}</p>

                                    <Link
                                        href="/contact"
                                        className="block w-full py-4 bg-brand text-center text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-colors mb-4 shadow-lg"
                                    >
                                        {t.contactUs}
                                    </Link>

                                    <Link
                                        href="/services"
                                        className="block w-full py-4 border-2 border-white/20 text-center text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:border-white transition-colors"
                                    >
                                        {t.exploreAllServices}
                                    </Link>
                                </div>

                                {/* Quick Info */}
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                                    <h4 className="font-bold text-onyx mb-6 text-lg">{language === 'ar' ? 'معلومات سريعة' : 'Quick Info'}</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-brand flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold text-gray-900">{language === 'ar' ? 'وقت التسليم' : 'Delivery Time'}</div>
                                                <div className="text-sm text-gray-600">{language === 'ar' ? '2-4 أسابيع' : '2-4 weeks'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-brand flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold text-gray-900">{language === 'ar' ? 'فريق الخبراء' : 'Expert Team'}</div>
                                                <div className="text-sm text-gray-600">{language === 'ar' ? 'متخصصون معتمدون' : 'Certified Specialists'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-brand flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold text-gray-900">{language === 'ar' ? 'الدعم' : 'Support'}</div>
                                                <div className="text-sm text-gray-600">{language === 'ar' ? 'دعم مستمر' : 'Ongoing Support'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Services/Points Section */}
            {keyPoints.length > 0 && (
                <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20 reveal">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="w-16 h-1 bg-brand"></div>
                                <span className="text-brand text-sm font-bold tracking-[0.3em] uppercase">{details.keyPointsTitle || "What We Offer"}</span>
                                <div className="w-16 h-1 bg-brand"></div>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-onyx mb-6">
                                {details.keyPointsHeadline || "Key Services"}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                {language === 'ar'
                                    ? 'نقدم مجموعة شاملة من الخدمات المتخصصة المصممة لتلبية احتياجاتك الفريدة'
                                    : 'We offer a comprehensive suite of specialized services designed to meet your unique needs'}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {keyPoints.map((point: any, index: number) => (
                                <div
                                    key={index}
                                    className="reveal group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-brand/20 hover:-translate-y-2"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand/20 to-brand/5 rounded-2xl flex items-center justify-center text-brand group-hover:from-brand group-hover:to-brand-dark group-hover:text-white transition-all duration-300 shadow-lg">
                                            <span className="text-2xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-onyx mb-4 group-hover:text-brand transition-colors">{point.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{point.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Process/Methodology Section */}
            {process.length > 0 && (
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20 reveal">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="w-16 h-1 bg-brand"></div>
                                <span className="text-brand text-sm font-bold tracking-[0.3em] uppercase">{details.processTitle || "Our Approach"}</span>
                                <div className="w-16 h-1 bg-brand"></div>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-onyx mb-6">
                                {details.processHeadline || "How We Deliver Results"}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                {language === 'ar'
                                    ? 'منهجية مُجرّبة ومثبتة لضمان نجاح مشروعك'
                                    : 'A proven, systematic methodology to ensure your project success'}
                            </p>
                        </div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand/30 via-brand/50 to-brand/30"></div>

                            <div className="space-y-20">
                                {process.map((step: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`reveal flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                                        style={{ transitionDelay: `${index * 150}ms` }}
                                    >
                                        <div className={`flex-1 ${index % 2 === 1 ? 'lg:text-left' : 'lg:text-right'}`}>
                                            <div className={`bg-gradient-to-br from-gray-50 to-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-l-4 border-brand ${index % 2 === 1 ? '' : 'lg:ml-auto'} max-w-xl group hover:-translate-y-2`}>
                                                <div className={`flex items-center gap-3 mb-4 ${index % 2 === 1 ? '' : 'lg:flex-row-reverse'}`}>
                                                    <div className="px-5 py-2 bg-brand/10 rounded-full">
                                                        <span className="text-brand font-bold text-sm tracking-widest uppercase">{t.step} {index + 1}</span>
                                                    </div>
                                                </div>
                                                <h3 className="text-3xl font-bold text-onyx mb-5 group-hover:text-brand transition-colors">{step.title}</h3>
                                                <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>

                                        {/* Center Circle */}
                                        <div className="hidden lg:flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand to-brand-dark text-white rounded-full font-bold text-2xl shadow-2xl z-10 border-4 border-white">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        <div className="flex-1 hidden lg:block"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Us Section */}
            {whyChooseUs.length > 0 && (
                <section className="py-32 bg-gradient-to-br from-onyx via-gray-900 to-onyx text-white overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-20 reveal">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="w-16 h-1 bg-brand"></div>
                                <span className="text-brand text-sm font-bold tracking-[0.3em] uppercase">{details.whyChooseUsTitle || "Why GovernValu"}</span>
                                <div className="w-16 h-1 bg-brand"></div>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                                {details.whyChooseUsHeadline || "Why Choose Us"}
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                {language === 'ar'
                                    ? 'نتميز بخبرتنا العميقة والتزامنا بتحقيق التميز في كل مشروع'
                                    : 'We stand out through our deep expertise and commitment to excellence in every project'}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {whyChooseUs.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="reveal text-center group"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:border-brand hover:bg-brand/10 transition-all duration-500 h-full hover:-translate-y-2">
                                        <div className="w-24 h-24 bg-gradient-to-br from-brand/30 to-brand/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:from-brand group-hover:to-brand-dark transition-all duration-500 shadow-2xl">
                                            <svg className="w-12 h-12 text-brand group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 group-hover:text-brand transition-colors">{item.title}</h3>
                                        <p className="text-gray-300 leading-relaxed text-lg">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Banner */}
            <section className="py-32 bg-gradient-to-r from-brand via-brand-dark to-brand relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
                </div>

                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 reveal">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                        {details.ctaBanner?.headline || "Ready to Transform Your Organization?"}
                    </h2>
                    <p className="text-2xl text-white/90 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                        {details.ctaBanner?.subtext || `Let us help you achieve excellence in ${service.title.toLowerCase()}.`}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href="/contact"
                            className="inline-block px-14 py-6 bg-white text-brand text-sm uppercase tracking-widest font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
                        >
                            {details.ctaBanner?.button1Text || "Schedule a Call"}
                        </Link>
                        <Link
                            href="/about/expertise"
                            className="inline-block px-14 py-6 border-2 border-white text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        >
                            {details.ctaBanner?.button2Text || "Learn About Us"}
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
